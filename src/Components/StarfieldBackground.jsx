import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 160;
const MOUSE_RADIUS = 140;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function initParticles(width, height) {
  return Array.from({ length: PARTICLE_COUNT }, () => {
    const roll = Math.random();
    // 3 star types: cool white, indigo-tinted, rare warm gold
    const color =
      roll > 0.88
        ? "rgba(199,210,254," // indigo — matches your gradient accent
        : roll > 0.72
        ? "rgba(167,179,255," // blue-lavender
        : roll > 0.06
        ? "rgba(255,255,255," // pure white
        : "rgba(255,245,200,"; // rare warm gold star

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: randomBetween(-0.12, 0.12),
      vy: randomBetween(-0.12, 0.12),
      radius: randomBetween(0.4, 2.0),
      alpha: randomBetween(0.15, 0.75),
      twinkleSpeed: randomBetween(0.003, 0.01),
      twinkleDir: Math.random() > 0.5 ? 1 : -1,
      color,
    };
  });
}

const StarfieldBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef([]);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = initParticles(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const draw = () => {
      const { width, height } = canvas;

      // Fill with the same dark as App.css body background
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      particlesRef.current.forEach((p) => {
        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse repulsion
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.055;
          p.x += (dx / dist) * force * 20;
          p.y += (dy / dist) * force * 20;
        }

        // Twinkle
        p.alpha += p.twinkleSpeed * p.twinkleDir;
        if (p.alpha >= 0.78 || p.alpha <= 0.08) p.twinkleDir *= -1;

        // Core dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha.toFixed(2)})`;
        ctx.fill();

        // Soft glow halo for larger stars only
        if (p.radius > 1.4) {
          const glowRadius = p.radius * 3.5;
          const glow = ctx.createRadialGradient(
            p.x, p.y, 0,
            p.x, p.y, glowRadius
          );
          glow.addColorStop(0, `${p.color}${(p.alpha * 0.45).toFixed(2)})`);
          glow.addColorStop(1, `${p.color}0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      });

      // Subtle indigo mouse aura — complements your #667eea accent
      if (mx > 0 && my > 0) {
        const aura = ctx.createRadialGradient(mx, my, 0, mx, my, MOUSE_RADIUS * 1.5);
        aura.addColorStop(0, "rgba(102,126,234,0.08)");
        aura.addColorStop(0.5, "rgba(102,126,234,0.03)");
        aura.addColorStop(1, "rgba(102,126,234,0)");
        ctx.beginPath();
        ctx.arc(mx, my, MOUSE_RADIUS * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = aura;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        display: "block",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
};

export default StarfieldBackground;