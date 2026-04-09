import { useEffect, useRef } from "react";

const ORBS = [
  { x: 0.15, y: 0.20, r: 0.38, color: [59,  130, 246], speed: 0.00018, phase: 0.0, mouseFactor: 0.12  },
  { x: 0.75, y: 0.15, r: 0.32, color: [99,  102, 241], speed: 0.00014, phase: 1.2, mouseFactor: -0.10 },
  { x: 0.55, y: 0.65, r: 0.40, color: [139, 92,  246], speed: 0.00020, phase: 2.4, mouseFactor: 0.16  },
  { x: 0.88, y: 0.55, r: 0.28, color: [16,  185, 129], speed: 0.00016, phase: 0.7, mouseFactor: -0.14 },
  { x: 0.25, y: 0.78, r: 0.34, color: [79,  70,  229], speed: 0.00022, phase: 3.8, mouseFactor: 0.20  },
  { x: 0.50, y: 0.35, r: 0.22, color: [168, 85,  247], speed: 0.00012, phase: 5.1, mouseFactor: -0.18 },
];

const STAR_COUNT = 90;

function makeStars(w, h) {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.1 + 0.3,
    alpha: Math.random() * 0.45 + 0.1,
    twinkle: Math.random() * 0.008 + 0.003,
    dir: Math.random() > 0.5 ? 1 : -1,
  }));
}

const AuroraBackground = () => {
  const canvasRef  = useRef(null);
  // Raw mouse target (normalised -0.5 to 0.5 from center)
  const mouseTarget = useRef({ x: 0, y: 0 });
  // Smoothed mouse (lerped each frame)
  const mouseSmooth = useRef({ x: 0, y: 0 });
  const starsRef   = useRef([]);
  const rafRef     = useRef(null);
  const t          = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      starsRef.current = makeStars(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e) => {
      // Offset from screen center, normalised to -0.5 … +0.5
      mouseTarget.current = {
        x: (e.clientX / window.innerWidth)  - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      };
    };
    window.addEventListener("mousemove", onMove);

    const draw = () => {
      t.current += 1;
      const { width: W, height: H } = canvas;

      // ── Lerp smoothed mouse toward raw target (easing factor) ──
      const lerpFactor = 0.035; // lower = lazier trail, higher = snappier
      mouseSmooth.current.x += (mouseTarget.current.x - mouseSmooth.current.x) * lerpFactor;
      mouseSmooth.current.y += (mouseTarget.current.y - mouseSmooth.current.y) * lerpFactor;

      const smx = mouseSmooth.current.x;
      const smy = mouseSmooth.current.y;

      // Deep dark base
      ctx.fillStyle = "#03050f";
      ctx.fillRect(0, 0, W, H);

      // ── Aurora orbs ──
      ORBS.forEach((orb) => {
        const time = t.current * orb.speed;

        // Drift (Lissajous) + strong mouse offset — each orb has its own factor & sign
        const ox =
          (orb.x +
            Math.sin(time * 2.1 + orb.phase) * 0.08 +
            Math.cos(time * 1.3 + orb.phase) * 0.05 +
            smx * orb.mouseFactor   // <-- strong, signed per-orb
          ) * W;

        const oy =
          (orb.y +
            Math.cos(time * 1.7 + orb.phase) * 0.07 +
            Math.sin(time * 2.5 + orb.phase) * 0.04 +
            smy * orb.mouseFactor
          ) * H;

        const pulse  = 1 + Math.sin(time * 3.1 + orb.phase) * 0.07;
        const radius = orb.r * Math.min(W, H) * pulse;

        const [r, g, b] = orb.color;
        const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, radius);
        grad.addColorStop(0,    `rgba(${r},${g},${b},0.20)`);
        grad.addColorStop(0.35, `rgba(${r},${g},${b},0.10)`);
        grad.addColorStop(0.70, `rgba(${r},${g},${b},0.04)`);
        grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);

        ctx.beginPath();
        ctx.arc(ox, oy, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      });

      // ── Vignette ──
      const vig = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W, H) * 0.75);
      vig.addColorStop(0,   "rgba(0,0,0,0)");
      vig.addColorStop(0.65,"rgba(0,0,0,0.08)");
      vig.addColorStop(1,   "rgba(0,0,0,0.60)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // ── Stars ──
      starsRef.current.forEach((s) => {
        s.alpha += s.twinkle * s.dir;
        if (s.alpha > 0.55 || s.alpha < 0.05) s.dir *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(210,220,255,${s.alpha.toFixed(2)})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "fixed",
        inset:          0,
        width:         "100vw",
        height:        "100vh",
        display:       "block",
        pointerEvents: "none",
        zIndex:        -1,
      }}
    />
  );
};

export default AuroraBackground;