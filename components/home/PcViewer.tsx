'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const PALETTE = ['#8b5cf6', '#ec4899', '#f59e0b'].map((c) => new THREE.Color(c));

// Loops smoothly through violet -> pink -> amber
function palette(x: number, out: THREE.Color) {
  const n = PALETTE.length;
  const p = (((x % 1) + 1) % 1) * n;
  const i = Math.floor(p);
  return out.lerpColors(PALETTE[i % n], PALETTE[(i + 1) % n], p - i);
}

type Glow = { mat: THREE.MeshBasicMaterial; phase: number };

const W = 2.2;
const H = 3.6;
const D = 3.0;

function labelTexture(draw: (g: CanvasRenderingContext2D, w: number, h: number) => void, w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d')!, w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function buildPc() {
  const root = new THREE.Group();
  const disposables: { dispose: () => void }[] = [];
  const glows: Glow[] = [];
  const rotors: { g: THREE.Group; speed: number }[] = [];
  const keep = <T extends { dispose: () => void }>(o: T) => {
    disposables.push(o);
    return o;
  };

  const matte = keep(new THREE.MeshStandardMaterial({ color: '#0d0d10', roughness: 0.5, metalness: 0.55 }));
  const metal = keep(new THREE.MeshStandardMaterial({ color: '#1c1d22', roughness: 0.32, metalness: 0.85 }));
  const pcb = keep(new THREE.MeshStandardMaterial({ color: '#101218', roughness: 0.6, metalness: 0.2 }));
  const blade = keep(new THREE.MeshStandardMaterial({ color: '#d9dae0', roughness: 0.4, metalness: 0.1, side: THREE.DoubleSide }));
  const glass = keep(
    new THREE.MeshPhysicalMaterial({
      color: '#c9d0ff',
      transparent: true,
      opacity: 0.1,
      roughness: 0.04,
      metalness: 0,
      clearcoat: 1,
      envMapIntensity: 1.6,
      side: THREE.DoubleSide,
      depthWrite: false,
    }),
  );

  const box = (w: number, h: number, d: number, mat: THREE.Material, x: number, y: number, z: number) => {
    const m = new THREE.Mesh(keep(new THREE.BoxGeometry(w, h, d)), mat);
    m.position.set(x, y, z);
    root.add(m);
    return m;
  };
  const glowMat = (phase: number) => {
    const mat = keep(new THREE.MeshBasicMaterial({ color: '#ffffff' }));
    glows.push({ mat, phase });
    return mat;
  };

  // --- Shell ---------------------------------------------------------------
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      box(0.1, H, 0.1, metal, sx * (W / 2 - 0.05), 0, sz * (D / 2 - 0.05));
    }
  }
  box(W, 0.12, D, matte, 0, -H / 2 + 0.06, 0); // floor
  box(W, 0.1, D, matte, 0, H / 2 - 0.05, 0); // roof
  box(0.06, H, D, matte, -W / 2 + 0.03, 0, 0); // motherboard tray wall
  box(W, H, 0.05, matte, 0, 0, -D / 2 + 0.025); // back
  const footGeo = keep(new THREE.CylinderGeometry(0.09, 0.11, 0.1, 20));
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const foot = new THREE.Mesh(footGeo, metal);
      foot.position.set(sx * 0.85, -H / 2 - 0.05, sz * 1.15);
      root.add(foot);
    }
  }

  // --- Fan -----------------------------------------------------------------
  const fanFrameGeo = keep(new THREE.BoxGeometry(1, 1, 0.06));
  const bladeGeo = keep(new THREE.BoxGeometry(0.3, 0.11, 0.012));
  const hubGeo = keep(new THREE.CylinderGeometry(0.1, 0.1, 0.05, 28));
  hubGeo.rotateX(Math.PI / 2);
  const ringGeoBig = keep(new THREE.TorusGeometry(0.44, 0.012, 8, 72));
  const ringGeoSmall = keep(new THREE.TorusGeometry(0.15, 0.01, 8, 48));

  const fan = (size: number, phase: number, speed: number) => {
    const g = new THREE.Group();
    const frame = new THREE.Mesh(fanFrameGeo, matte);
    frame.scale.set(size, size, 1);
    g.add(frame);

    const mat = glowMat(phase);
    const outer = new THREE.Mesh(ringGeoBig, mat);
    outer.scale.setScalar(size);
    outer.position.z = 0.034;
    const inner = new THREE.Mesh(ringGeoSmall, mat);
    inner.scale.setScalar(size);
    inner.position.z = 0.034;
    g.add(outer, inner);

    const rotor = new THREE.Group();
    rotor.position.z = 0.07;
    const count = 9;
    for (let i = 0; i < count; i++) {
      const pivot = new THREE.Group();
      pivot.rotation.z = (i / count) * Math.PI * 2;
      const b = new THREE.Mesh(bladeGeo, blade);
      b.scale.setScalar(size);
      b.position.x = 0.22 * size;
      b.rotation.x = 0.55;
      pivot.add(b);
      rotor.add(pivot);
    }
    const hub = new THREE.Mesh(hubGeo, metal);
    hub.scale.setScalar(size);
    rotor.add(hub);
    g.add(rotor);
    rotors.push({ g: rotor, speed });
    return g;
  };

  // --- Side radiator: three fans facing the right glass --------------------
  box(0.12, 2.95, 1.0, metal, 0.73, 0.2, 0.95);
  [1.15, 0.2, -0.75].forEach((y, i) => {
    const f = fan(0.95, i * 0.18, 9 + i);
    f.rotation.y = Math.PI / 2;
    f.position.set(0.86, y, 0.95);
    root.add(f);
  });

  // Rear exhaust fan
  const rear = fan(0.62, 0.55, 8);
  rear.position.set(-0.45, 1.0, -D / 2 + 0.1);
  root.add(rear);

  // --- Motherboard ---------------------------------------------------------
  box(0.03, 2.3, 1.9, pcb, -1.01, 0.45, -0.35);
  box(0.2, 0.16, 1.1, metal, -0.9, 1.4, -0.45); // top VRM sink
  box(0.22, 1.4, 0.22, metal, -0.89, 0.7, -1.18); // rear I/O shroud
  box(0.07, 0.3, 0.55, metal, -0.97, -0.4, 0.15); // chipset / M.2 sink

  // RAM with lit edges
  for (let i = 0; i < 4; i++) {
    const z = 0.12 + i * 0.1;
    box(0.2, 0.95, 0.045, matte, -0.9, 0.95, z);
    box(0.012, 0.9, 0.03, glowMat(0.3 + i * 0.07), -0.9 + 0.106, 0.95, z);
  }

  // AIO pump block with a lit ring and logo cap
  const pump = new THREE.Mesh(keep(new THREE.CylinderGeometry(0.34, 0.34, 0.14, 48)), metal);
  pump.rotation.z = Math.PI / 2;
  pump.position.set(-0.92, 0.75, -0.5);
  root.add(pump);
  const capTex = keep(
    labelTexture(
      (g, w, h) => {
        const grad = g.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w / 2);
        grad.addColorStop(0, '#2a2a33');
        grad.addColorStop(1, '#09090c');
        g.fillStyle = grad;
        g.fillRect(0, 0, w, h);
        g.fillStyle = '#f4f4f6';
        g.textAlign = 'center';
        g.textBaseline = 'middle';
        g.font = '700 150px -apple-system, "SF Pro Display", Inter, system-ui, sans-serif';
        g.fillText('GF', w / 2, h / 2 + 8);
      },
      256,
      256,
    ),
  );
  const capGeo = keep(new THREE.CircleGeometry(0.27, 48));
  capGeo.rotateY(Math.PI / 2);
  const cap = new THREE.Mesh(capGeo, keep(new THREE.MeshBasicMaterial({ map: capTex })));
  cap.position.set(-0.92 + 0.072, 0.75, -0.5);
  root.add(cap);
  const pumpRingGeo = keep(new THREE.TorusGeometry(0.3, 0.014, 8, 64));
  pumpRingGeo.rotateY(Math.PI / 2);
  const pumpRing = new THREE.Mesh(pumpRingGeo, glowMat(0.1));
  pumpRing.position.set(-0.92 + 0.073, 0.75, -0.5);
  root.add(pumpRing);

  // Coolant tubes pump -> radiator
  const tubeMat = keep(new THREE.MeshStandardMaterial({ color: '#15151a', roughness: 0.5, metalness: 0.3 }));
  for (const dz of [0, 0.14]) {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.85, 0.95 - dz * 1.5, -0.45 + dz),
      new THREE.Vector3(-0.35, 1.45, -0.1 + dz),
      new THREE.Vector3(0.35, 1.55, 0.55 + dz),
      new THREE.Vector3(0.72, 1.45, 0.9 + dz),
    ]);
    root.add(new THREE.Mesh(keep(new THREE.TubeGeometry(curve, 48, 0.035, 10)), tubeMat));
  }

  // --- GPU: lit edge plate + shroud ---------------------------------------
  box(0.8, 0.38, 1.75, metal, -0.6, -0.72, -0.4);
  const gpuTex = keep(
    labelTexture(
      (g, w, h) => {
        const grad = g.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, '#16171c');
        grad.addColorStop(1, '#25262d');
        g.fillStyle = grad;
        g.fillRect(0, 0, w, h);
        g.fillStyle = '#f4f4f6';
        g.textBaseline = 'middle';
        g.font = '700 84px -apple-system, "SF Pro Display", Inter, system-ui, sans-serif';
        g.fillText('GEFORCE RTX', 70, h / 2 - 8);
        g.fillStyle = '#9a9aa4';
        g.font = '500 44px "SF Mono", Menlo, ui-monospace, monospace';
        g.fillText('4090 · 24GB', 74, h / 2 + 62);
      },
      1024,
      256,
    ),
  );
  const gpuFaceGeo = keep(new THREE.PlaneGeometry(1.7, 0.36));
  gpuFaceGeo.rotateY(Math.PI / 2);
  const gpuFace = new THREE.Mesh(gpuFaceGeo, keep(new THREE.MeshBasicMaterial({ map: gpuTex })));
  gpuFace.position.set(-0.6 + 0.401, -0.72, -0.4);
  root.add(gpuFace);
  box(0.02, 0.025, 1.75, glowMat(0.45), -0.6 + 0.405, -0.72 + 0.205, -0.4);

  // --- PSU shroud with a light line ---------------------------------------
  box(W - 0.14, 0.55, D - 0.2, metal, 0, -H / 2 + 0.395, 0);
  box(W - 0.3, 0.014, 0.025, glowMat(0.8), 0, -H / 2 + 0.67, D / 2 - 0.12);

  // --- Glass panels (added last so they sort over the interior) -----------
  const sideGeo = keep(new THREE.PlaneGeometry(D - 0.1, H - 0.2));
  sideGeo.rotateY(Math.PI / 2);
  const side = new THREE.Mesh(sideGeo, glass);
  side.position.set(W / 2 - 0.005, 0, 0);
  side.renderOrder = 10;
  const front = new THREE.Mesh(keep(new THREE.PlaneGeometry(W - 0.1, H - 0.2)), glass);
  front.position.set(0, 0, D / 2 - 0.005);
  front.renderOrder = 10;
  root.add(side, front);

  return { root, glows, rotors, disposables };
}

function shadowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, 'rgba(0,0,0,0.38)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

export default function PcViewer() {
  const hostRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    const el = renderer.domElement;
    host.appendChild(el);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;
    scene.environmentIntensity = 0.55;

    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);

    const { root, glows, rotors, disposables } = buildPc();
    const rig = new THREE.Group();
    rig.rotation.order = 'YXZ';
    rig.rotation.y = -0.62;
    rig.add(root);
    scene.add(rig);

    // Soft contact shadow on the "floor"
    const shadowTex = shadowTexture();
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(5.6, 5.6),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -H / 2 - 0.1;
    scene.add(shadow);

    // Interior light that follows the RGB palette
    const inner = [
      new THREE.PointLight('#8b5cf6', 7, 6),
      new THREE.PointLight('#ec4899', 7, 6),
      new THREE.PointLight('#f59e0b', 6, 6),
    ];
    inner[0].position.set(0, 0.9, 0.8);
    inner[1].position.set(-0.3, -0.3, 0.2);
    inner[2].position.set(0.2, 1.3, -0.8);
    inner.forEach((l) => root.add(l));

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (!w || !h) return;
      renderer.setSize(w, h);
      const aspect = w / h;
      camera.aspect = aspect;
      const dist = Math.max(9, 4.4 / (0.536 * aspect));
      camera.position.set(0, 1.4, dist);
      camera.lookAt(0, -0.1, 0);
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    // Fixed light colours and fan angles: nothing animates on its own
    const tmp = new THREE.Color();
    glows.forEach((gl) => {
      palette(0.12 + gl.phase, tmp);
      gl.mat.color.copy(tmp);
    });
    inner.forEach((l, i) => {
      palette(0.12 + i * 0.33, tmp);
      l.color.copy(tmp);
    });
    rotors.forEach((r, i) => {
      r.g.rotation.z = i * 0.7;
    });
    renderer.render(scene, camera);

    // Cursor-driven 3D: the model only moves when the pointer does
    const BASE_Y = -0.62;
    const target = { y: BASE_Y, x: 0 };
    let spin = 0;
    let dragging = false;
    let lastX = 0;
    let raf = 0;

    const tick = () => {
      rig.rotation.y += (target.y - rig.rotation.y) * 0.12;
      rig.rotation.x += (target.x - rig.rotation.x) * 0.12;
      renderer.render(scene, camera);
      const settled =
        Math.abs(target.y - rig.rotation.y) < 0.0005 && Math.abs(target.x - rig.rotation.x) < 0.0005;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      if (dragging) {
        spin += (e.clientX - lastX) * 0.012;
        lastX = e.clientX;
      }
      target.y = BASE_Y + spin + nx * 0.9;
      target.x = ny * 0.25;
      kick();
    };
    const onLeave = () => {
      if (dragging) return;
      target.y = BASE_Y + spin;
      target.x = 0;
      kick();
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = 'grabbing';
    };
    const onUp = (e: PointerEvent) => {
      dragging = false;
      el.releasePointerCapture?.(e.pointerId);
      el.style.cursor = 'grab';
    };
    el.style.cursor = 'grab';
    el.style.touchAction = 'pan-y';
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      ro.disconnect();
      disposables.forEach((d) => d.dispose());
      shadow.geometry.dispose();
      (shadow.material as THREE.Material).dispose();
      shadowTex.dispose();
      envRT.dispose();
      pmrem.dispose();
      renderer.dispose();
      host.removeChild(el);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div
        ref={hostRef}
        className="absolute inset-0"
        role="img"
        aria-label="3D render of a GameForge gaming PC with glass panels and RGB lighting"
      />
    </div>
  );
}
