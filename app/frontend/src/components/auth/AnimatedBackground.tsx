import React, { useRef, useEffect } from 'react';

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: any[] = [];
    const numParticles = 80;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 400, // [-200, 200] visible depth range target
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        vz: (Math.random() - 0.5) * 1.5,
        size: Math.random() * 2 + 1,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      // Dark gradient background
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, '#0f2027');
      gradient.addColorStop(1, '#2c5364');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      for (const p of particles) {
        // 3D perspective (ensure positive scale)
        const denom = Math.max(20, 200 + p.z); // avoid <= 0
        const scale = 200 / denom;
        const x = p.x * scale + width / 2 - (width / 2) * scale;
        const y = p.y * scale + height / 2 - (height / 2) * scale;
        const radius = Math.max(0.1, p.size * scale);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100,200,255,${0.7 * scale})`;
        ctx.shadowColor = '#00f0ff';
        ctx.shadowBlur = 10 * scale;
        ctx.fill();
      }
    }

    function animate() {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
        if (p.z < -200 || p.z > 200) {
          p.vz *= -1;
          // clamp z back into safe range to prevent negative/zero scale
          p.z = Math.max(-190, Math.min(190, p.z));
        }
      }
      draw();
      requestAnimationFrame(animate);
    }

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
      }}
    />
  );
};

export default AnimatedBackground;