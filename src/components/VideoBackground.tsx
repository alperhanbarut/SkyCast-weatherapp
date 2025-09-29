import React, { useRef, useEffect } from "react";

interface VideoBackgroundProps {
  weatherType?: string;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  weatherType = "sunny",
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);

  // Create particles based on weather type
  const createParticles = (canvas: HTMLCanvasElement, type: string) => {
    const particles: Particle[] = [];
    let count = 0;

    switch (type) {
      case "rainy":
        count = 150;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            vx: -1 + Math.random() * 2,
            vy: 8 + Math.random() * 4,
            size: 1 + Math.random() * 2,
            opacity: 0.6 + Math.random() * 0.4,
            life: 1,
            maxLife: 1,
          });
        }
        break;

      case "snowy":
        count = 100;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            vx: -0.5 + Math.random(),
            vy: 2 + Math.random() * 3,
            size: 2 + Math.random() * 4,
            opacity: 0.7 + Math.random() * 0.3,
            life: 1,
            maxLife: 1,
          });
        }
        break;

      case "stormy":
        count = 80;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: -3 + Math.random() * 6,
            vy: -2 + Math.random() * 4,
            size: 1 + Math.random() * 3,
            opacity: 0.3 + Math.random() * 0.4,
            life: Math.random(),
            maxLife: 0.5 + Math.random() * 0.5,
          });
        }
        break;

      case "cloudy":
        count = 60;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: -0.2 + Math.random() * 0.4,
            vy: -0.1 + Math.random() * 0.2,
            size: 10 + Math.random() * 20,
            opacity: 0.2 + Math.random() * 0.3,
            life: 1,
            maxLife: 1,
          });
        }
        break;

      default: // sunny
        count = 40;
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: -0.1 + Math.random() * 0.2,
            vy: -0.1 + Math.random() * 0.2,
            size: 2 + Math.random() * 4,
            opacity: 0.3 + Math.random() * 0.4,
            life: Math.random(),
            maxLife: 2 + Math.random() * 3,
          });
        }
        break;
    }

    return particles;
  };

  // Get gradient based on weather type
  const getGradient = (
    ctx: CanvasRenderingContext2D,
    type: string,
    canvas: HTMLCanvasElement
  ) => {
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

    switch (type) {
      case "rainy":
        gradient.addColorStop(0, "rgba(71, 85, 105, 1)"); // slate-600
        gradient.addColorStop(0.5, "rgba(51, 65, 85, 1)"); // slate-700
        gradient.addColorStop(1, "rgba(30, 41, 59, 1)"); // slate-800
        break;

      case "snowy":
        gradient.addColorStop(0, "rgba(148, 163, 184, 1)"); // slate-400
        gradient.addColorStop(0.5, "rgba(203, 213, 225, 1)"); // slate-300
        gradient.addColorStop(1, "rgba(241, 245, 249, 1)"); // slate-100
        break;

      case "stormy":
        gradient.addColorStop(0, "rgba(30, 41, 59, 1)"); // slate-800
        gradient.addColorStop(0.5, "rgba(15, 23, 42, 1)"); // slate-900
        gradient.addColorStop(1, "rgba(2, 6, 23, 1)"); // slate-950
        break;

      case "cloudy":
        gradient.addColorStop(0, "rgba(148, 163, 184, 1)"); // slate-400
        gradient.addColorStop(0.5, "rgba(100, 116, 139, 1)"); // slate-500
        gradient.addColorStop(1, "rgba(71, 85, 105, 1)"); // slate-600
        break;

      default: // sunny
        gradient.addColorStop(0, "rgba(56, 189, 248, 1)"); // sky-400
        gradient.addColorStop(0.5, "rgba(14, 165, 233, 1)"); // sky-500
        gradient.addColorStop(1, "rgba(2, 132, 199, 1)"); // sky-600
        break;
    }

    return gradient;
  };

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw gradient background
    ctx.fillStyle = getGradient(ctx, weatherType, canvas);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Update life for fading effects
      if (particle.maxLife > 1) {
        particle.life += 0.01;
        if (particle.life >= particle.maxLife) {
          particle.life = 0;
        }
      }

      // Reset particle if it goes off screen
      if (weatherType === "rainy" || weatherType === "snowy") {
        if (particle.y > canvas.height) {
          particle.y = -10;
          particle.x = Math.random() * canvas.width;
        }
      } else {
        if (
          particle.x < -50 ||
          particle.x > canvas.width + 50 ||
          particle.y < -50 ||
          particle.y > canvas.height + 50
        ) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }
      }

      // Draw particle based on weather type
      ctx.save();
      ctx.globalAlpha = particle.opacity;

      if (weatherType === "rainy") {
        // Rain drops
        ctx.strokeStyle = "rgba(147, 197, 253, 0.8)"; // blue-300
        ctx.lineWidth = particle.size;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particle.x - particle.vx * 2, particle.y - particle.vy * 2);
        ctx.stroke();
      } else if (weatherType === "snowy") {
        // Snow flakes
        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (weatherType === "stormy") {
        // Storm particles
        ctx.fillStyle = "rgba(156, 163, 175, 0.6)"; // gray-400
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      } else if (weatherType === "cloudy") {
        // Cloud particles
        ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Sunny particles (light sparkles)
        const alpha = Math.abs(Math.sin(particle.life * Math.PI));
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });

    animationRef.current = requestAnimationFrame(animate);
  };

  // Lightning effect for stormy weather
  useEffect(() => {
    if (weatherType === "stormy") {
      const interval = setInterval(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Create lightning flash
        ctx.save();
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = "rgba(255, 255, 255, 1)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        setTimeout(() => {
          // Clear the flash after 100ms
          const canvas = canvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
          }
        }, 100);
      }, 3000 + Math.random() * 5000); // Random lightning every 3-8 seconds

      return () => clearInterval(interval);
    }
  }, [weatherType]);

  // Setup canvas and animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Recreate particles when canvas is resized
      particlesRef.current = createParticles(canvas, weatherType);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Start animation
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [weatherType]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full -z-10 ${className}`}
      style={{ pointerEvents: "none" }}
    />
  );
};

export default VideoBackground;
