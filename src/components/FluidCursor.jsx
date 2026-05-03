import { useEffect, useRef } from 'react';

const FluidCursor = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let trail = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
      trail.push({ x: e.clientX, y: e.clientY, age: 0 });
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update trail
      for (let i = 0; i < trail.length; i++) {
        let p = trail[i];
        p.age += 1;
        
        if (p.age > 50) {
          trail.splice(i, 1);
          i--;
          continue;
        }

        const radius = Math.max(0, 20 - (p.age * 0.4));
        const opacity = Math.max(0, 1 - (p.age / 50));

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(231, 73, 4, ${opacity * 0.3})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.8})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 9999,
        pointerEvents: 'none',
        mixBlendMode: 'screen'
      }}
    />
  );
};

export default FluidCursor;
