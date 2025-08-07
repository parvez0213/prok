import React, { useEffect, useRef } from 'react';

const DarkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      size: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    // 3D geometric shapes
    const shapes: Array<{
      x: number;
      y: number;
      z: number;
      rotation: number;
      type: 'cube' | 'sphere' | 'pyramid';
      size: number;
    }> = [];

    // Create geometric shapes
    for (let i = 0; i < 15; i++) {
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 500,
        rotation: Math.random() * Math.PI * 2,
        type: ['cube', 'sphere', 'pyramid'][Math.floor(Math.random() * 3)] as 'cube' | 'sphere' | 'pyramid',
        size: Math.random() * 50 + 20,
      });
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with gradient
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width / 2
      );
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(0.5, '#1a1a2e');
      gradient.addColorStop(1, '#16213e');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        if (particle.z < 0) particle.z = 1000;
        if (particle.z > 1000) particle.z = 0;

        // Calculate 3D position
        const scale = 1000 / (1000 + particle.z);
        const x = particle.x * scale;
        const y = particle.y * scale;
        const size = particle.size * scale;

        // Draw particle
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 150, 255, ${particle.opacity * scale})`;
        ctx.fill();
      });

      // Update and draw shapes
      shapes.forEach((shape) => {
        // Update rotation
        shape.rotation += 0.01;

        // Calculate 3D position
        const scale = 1000 / (1000 + shape.z);
        const x = shape.x * scale;
        const y = shape.y * scale;
        const size = shape.size * scale;

        // Draw shape based on type
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(shape.rotation);
        ctx.strokeStyle = `rgba(100, 150, 255, ${0.3 * scale})`;
        ctx.lineWidth = 2 * scale;

        switch (shape.type) {
          case 'cube':
            drawCube(ctx, size);
            break;
          case 'sphere':
            drawSphere(ctx, size);
            break;
          case 'pyramid':
            drawPyramid(ctx, size);
            break;
        }
        ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    // Helper functions to draw 3D shapes
    const drawCube = (ctx: CanvasRenderingContext2D, size: number) => {
      const halfSize = size / 2;
      ctx.beginPath();
      ctx.moveTo(-halfSize, -halfSize);
      ctx.lineTo(halfSize, -halfSize);
      ctx.lineTo(halfSize, halfSize);
      ctx.lineTo(-halfSize, halfSize);
      ctx.closePath();
      ctx.stroke();
    };

    const drawSphere = (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.beginPath();
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawPyramid = (ctx: CanvasRenderingContext2D, size: number) => {
      const halfSize = size / 2;
      ctx.beginPath();
      ctx.moveTo(0, -halfSize);
      ctx.lineTo(-halfSize, halfSize);
      ctx.lineTo(halfSize, halfSize);
      ctx.closePath();
      ctx.stroke();
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
};

export default DarkBackground; 