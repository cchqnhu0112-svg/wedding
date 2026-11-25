import React, { useEffect, useRef } from 'react';

// Romantic falling petals canvas overlay
export const FallingPetals = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Petal shapes: organic rose petal using bezier curves
    const drawPetal = (ctx, x, y, size, rotation, opacity, color) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.beginPath();
      // Organic petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(size * 0.5, -size * 0.5, size, -size * 0.3, size * 0.8, size * 0.2);
      ctx.bezierCurveTo(size * 0.5, size * 0.6, 0, size * 0.4, 0, 0);
      ctx.fill();
      // Petal vein
      ctx.strokeStyle = `rgba(255,255,255,0.25)`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(size * 0.4, size * 0.1, size * 0.8, size * 0.2);
      ctx.stroke();
      ctx.restore();
    };

    const colors = [
      '#F9C4D2', // soft pink
      '#F7A8C0', // rose pink
      '#FDD5E0', // blush
      '#FBCCE7', // light magenta
      '#FFE4EC', // almost white pink
      '#F4B8D1', // mid pink
      '#FFC0CB', // classic pink
    ];

    // Create petals
    const petals = Array.from({ length: 35 }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight - window.innerHeight,
      size: 7 + Math.random() * 11,
      speedY: 0.6 + Math.random() * 1.2,
      speedX: (Math.random() - 0.5) * 0.8,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      sway: Math.random() * Math.PI * 2,
      swaySpeed: 0.008 + Math.random() * 0.012,
      swayAmount: 0.6 + Math.random() * 1.5,
      opacity: 0.5 + Math.random() * 0.4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach(p => {
        p.sway += p.swaySpeed;
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(p.sway) * p.swayAmount;
        p.rotation += p.rotationSpeed;

        // Reset when off screen
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) p.x = canvas.width + 10;
        if (p.x > canvas.width + 20) p.x = -10;

        drawPetal(ctx, p.x, p.y, p.size, p.rotation, p.opacity, p.color);
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
};
