import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

/** Initials, alternating Ge'ez and Latin: ቅ K መ M ተ T. */
const SEQUENCE = [
  { char: "ቅ", font: '"Noto Serif Ethiopic"' },
  { char: "K", font: '"Instrument Serif"' },
  { char: "መ", font: '"Noto Serif Ethiopic"' },
  { char: "M", font: '"Instrument Serif"' },
  { char: "ተ", font: '"Noto Serif Ethiopic"' },
  { char: "T", font: '"Instrument Serif"' },
];
/** Simulation steps each letter holds before morphing (~3.4s at 60fps). */
const HOLD_STEPS = 205;

const LIME = [200 / 255, 241 / 255, 53 / 255];
const BONE = [236 / 255, 231 / 255, 221 / 255];

const VERTEX = /* glsl */ `
  attribute float aSize;
  attribute float aMix;
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vMix;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aSize * uPixelRatio / -mv.z;
    vMix = aMix;
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uLime;
  uniform vec3 uBone;
  uniform float uOpacity;
  varying float vMix;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(mix(uBone, uLime, vMix), alpha * uOpacity);
  }
`;

/** Rasterises one character and returns `count` random points inside it, in [-1, 1]. */
function sampleGlyph({ char, font }, count) {
  const size = 320;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  context.fillStyle = "#fff";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `${Math.round(size * 0.8)}px ${font}, serif`;
  context.fillText(char, size / 2, size * 0.53);

  const { data } = context.getImageData(0, 0, size, size);
  const inside = [];
  for (let y = 0; y < size; y += 2) {
    for (let x = 0; x < size; x += 2) {
      if (data[(y * size + x) * 4 + 3] > 140) inside.push(x, y);
    }
  }

  const points = new Float32Array(count * 3);
  const available = inside.length / 2;
  for (let i = 0; i < count; i += 1) {
    const pick = available ? Math.floor(Math.random() * available) * 2 : -1;
    const x = pick >= 0 ? inside[pick] : size / 2;
    const y = pick >= 0 ? inside[pick + 1] : size / 2;
    points[i * 3] = (x / size - 0.5) * 2 + (Math.random() - 0.5) * 0.01;
    points[i * 3 + 1] = -(y / size - 0.5) * 2 + (Math.random() - 0.5) * 0.01;
    points[i * 3 + 2] = (Math.random() - 0.5) * 0.16;
  }
  return points;
}

/**
 * The hero's signature object: a cloud of particles that keeps re-forming
 * Kidus's initials, trading Ge'ez for Latin. Particles scatter from the
 * pointer, burst on click, and blow apart as the hero scrolls away.
 */
export default function HeroGlyph() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      await Promise.all([
        document.fonts.load('200px "Noto Serif Ethiopic"', "ቅመተ"),
        document.fonts.load('200px "Instrument Serif"', "KMT"),
      ]).catch(() => {});
      if (disposed) return;

      const reduced = prefersReducedMotion();
      const compact = window.matchMedia("(max-width: 820px)").matches;
      const count = compact ? 2000 : 3800;

      const targets = SEQUENCE.map((glyph) => sampleGlyph(glyph, count));

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
      const pixelRatio = Math.min(window.devicePixelRatio, 1.75);
      renderer.setPixelRatio(pixelRatio);
      renderer.setClearColor(0x000000, 0);
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
      camera.position.set(0, 0, 6);

      const positions = new Float32Array(targets[0]);
      const velocities = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const mixes = new Float32Array(count);
      for (let i = 0; i < count; i += 1) {
        sizes[i] = 0.5 + Math.random() ** 4 * 1.8;
        mixes[i] = Math.random() < 0.62 ? 1 : Math.random() * 0.4;
        // Start scattered so the first glyph assembles itself.
        positions[i * 3] += (Math.random() - 0.5) * 4;
        positions[i * 3 + 1] += (Math.random() - 0.5) * 4;
        positions[i * 3 + 2] += (Math.random() - 0.5) * 4;
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute("aMix", new THREE.BufferAttribute(mixes, 1));

      const material = new THREE.ShaderMaterial({
        vertexShader: VERTEX,
        fragmentShader: FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uSize: { value: compact ? 17 : 19 },
          uPixelRatio: { value: pixelRatio },
          uLime: { value: new THREE.Vector3(...LIME) },
          uBone: { value: new THREE.Vector3(...BONE) },
          uOpacity: { value: 0.8 },
        },
      });

      const group = new THREE.Group();
      const points = new THREE.Points(geometry, material);
      group.add(points);
      scene.add(group);

      /* Sizing */
      let scale = 1.4;
      const resize = () => {
        const { width, height } = host.getBoundingClientRect();
        if (!width || !height) return;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        const visibleHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
        const visibleWidth = visibleHeight * camera.aspect;
        scale = Math.min(visibleHeight, visibleWidth) * 0.36;
        group.scale.setScalar(scale);
      };
      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(host);

      /* Pointer, in the glyph's local space (z = 0 plane). */
      const pointer = { x: 99, y: 99, nx: 0, ny: 0, active: false };
      const onPointerMove = (event) => {
        const bounds = host.getBoundingClientRect();
        const ndcX = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
        const ndcY = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
        const visibleHeight = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
        pointer.x = (ndcX * visibleHeight * camera.aspect) / 2 / scale;
        pointer.y = (ndcY * visibleHeight) / 2 / scale;
        pointer.nx = Math.max(-1, Math.min(1, ndcX));
        pointer.ny = Math.max(-1, Math.min(1, ndcY));
        pointer.active = true;
      };
      const onPointerLeave = () => {
        pointer.active = false;
        pointer.nx = 0;
        pointer.ny = 0;
      };

      /* Morphing */
      let current = 0;
      let held = 0;
      const burst = (strength) => {
        for (let i = 0; i < count * 3; i += 1) velocities[i] += (Math.random() - 0.5) * strength;
      };
      const next = () => {
        current = (current + 1) % targets.length;
        held = 0;
        burst(0.05);
      };
      const onClick = () => {
        burst(0.32);
        next();
      };

      /* Scroll — the glyph blows apart as the hero leaves. */
      let scatter = 0;
      const section = host.closest("section");
      const onScroll = () => {
        if (!section) return;
        const { top, height } = section.getBoundingClientRect();
        scatter = Math.min(1, Math.max(0, -top / (height * 0.8)));
      };
      onScroll();

      const simulate = (time) => {
        const target = targets[current];
        const radius = 0.32;

        for (let i = 0; i < count; i += 1) {
          const ix = i * 3;
          let tx = target[ix];
          let ty = target[ix + 1];
          let tz = target[ix + 2] + Math.sin(time * 1.3 + i) * 0.03;

          if (scatter > 0) {
            const spread = scatter * scatter * 3.2;
            tx += tx * spread + Math.sin(i * 12.9898) * spread;
            ty += ty * spread + Math.cos(i * 78.233) * spread;
            tz += Math.sin(i * 3.7) * spread * 2;
          }

          let fx = (tx - positions[ix]) * 0.045;
          let fy = (ty - positions[ix + 1]) * 0.045;
          const fz = (tz - positions[ix + 2]) * 0.045;

          if (pointer.active) {
            const dx = positions[ix] - pointer.x;
            const dy = positions[ix + 1] - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance < radius && distance > 0.0001) {
              const push = ((radius - distance) / radius) * 0.028;
              fx += (dx / distance) * push;
              fy += (dy / distance) * push;
            }
          }

          velocities[ix] = (velocities[ix] + fx) * 0.84;
          velocities[ix + 1] = (velocities[ix + 1] + fy) * 0.84;
          velocities[ix + 2] = (velocities[ix + 2] + fz) * 0.84;
          positions[ix] += velocities[ix];
          positions[ix + 1] += velocities[ix + 1];
          positions[ix + 2] += velocities[ix + 2];
        }
        held += 1;
        if (held > HOLD_STEPS) next();
      };

      /* Fixed 60Hz physics; slow frames catch up with a few extra sub-steps. */
      let last = performance.now();
      const step = (now) => {
        const time = now * 0.001;
        const substeps = Math.min(4, Math.max(1, Math.round((now - last) / 16.7)));
        last = now;
        for (let s = 0; s < substeps; s += 1) simulate(time);
        geometry.attributes.position.needsUpdate = true;

        group.rotation.y += (pointer.nx * 0.45 + Math.sin(time * 0.4) * 0.12 - group.rotation.y) * 0.05;
        group.rotation.x += (-pointer.ny * 0.25 - group.rotation.x) * 0.05;
        material.uniforms.uOpacity.value = 0.8 * (1 - scatter * 0.85);
        renderer.render(scene, camera);
      };

      if (reduced) {
        positions.set(targets[0]);
        geometry.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
        cleanup = () => {
          resizeObserver.disconnect();
          geometry.dispose();
          material.dispose();
          renderer.dispose();
          renderer.domElement.remove();
        };
        return;
      }

      /* Only animate while the hero is on screen and the tab is visible. */
      let visible = true;
      let frame = 0;
      const loop = (now) => {
        frame = requestAnimationFrame(loop);
        if (visible && !document.hidden) step(now);
      };
      frame = requestAnimationFrame(loop);
      const intersection = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
      });
      intersection.observe(host);

      const hero = section ?? host;
      hero.addEventListener("pointermove", onPointerMove);
      hero.addEventListener("pointerleave", onPointerLeave);
      host.addEventListener("click", onClick);
      window.addEventListener("scroll", onScroll, { passive: true });

      cleanup = () => {
        cancelAnimationFrame(frame);
        intersection.disconnect();
        resizeObserver.disconnect();
        hero.removeEventListener("pointermove", onPointerMove);
        hero.removeEventListener("pointerleave", onPointerLeave);
        host.removeEventListener("click", onClick);
        window.removeEventListener("scroll", onScroll);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={hostRef} className="hero-glyph" data-cursor data-cursor-label="Scatter" aria-hidden="true" />;
}
