"use client";

import React, { useEffect, useRef } from "react";

export const HealthcareNetworkCanvas: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
    };

    window.addEventListener("resize", handleResize);

    // Nodes representing healthcare infrastructure connection points
    const nodes = [
      { x: 0.5, y: 0.5, radius: 4, pulse: 0, isCenter: true },
      { x: 0.2, y: 0.3, radius: 2.5, pulse: 1 },
      { x: 0.8, y: 0.25, radius: 3, pulse: 2 },
      { x: 0.85, y: 0.7, radius: 2.5, pulse: 0.5 },
      { x: 0.18, y: 0.75, radius: 3, pulse: 1.5 },
      { x: 0.35, y: 0.18, radius: 2, pulse: 2.5 },
      { x: 0.65, y: 0.85, radius: 2, pulse: 3 },
      { x: 0.5, y: 0.15, radius: 2.5, pulse: 0.8 },
      { x: 0.38, y: 0.88, radius: 2, pulse: 1.8 },
    ];

    const connections = [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8],
      [1, 5], [2, 7], [3, 6], [4, 8], [5, 7], [6, 8]
    ];

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw Connection Lines
      connections.forEach(([i, j]) => {
        const n1 = nodes[i];
        const n2 = nodes[j];
        const x1 = n1.x * width;
        const y1 = n1.y * height;
        const x2 = n2.x * width;
        const y2 = n2.y * height;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "rgba(8, 117, 225, 0.12)";
        ctx.lineWidth = 1 * window.devicePixelRatio;
        ctx.stroke();

        // Traveling Pulse Signal along connection
        const progress = (time * 0.4 + (i + j) * 0.2) % 1;
        const px = x1 + (x2 - x1) * progress;
        const py = y1 + (y2 - y1) * progress;

        ctx.beginPath();
        ctx.arc(px, py, 1.5 * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(8, 117, 225, 0.45)";
        ctx.fill();
      });

      // Draw Nodes
      nodes.forEach((n) => {
        const nx = n.x * width;
        const ny = n.y * height;

        // Outer subtle pulse ring
        const currentPulse = (time + n.pulse) % 3;
        if (currentPulse < 2) {
          ctx.beginPath();
          ctx.arc(
            nx,
            ny,
            (n.radius + currentPulse * 8) * window.devicePixelRatio,
            0,
            Math.PI * 2
          );
          ctx.strokeStyle = `rgba(8, 117, 225, ${Math.max(0, 0.3 - currentPulse * 0.15)})`;
          ctx.lineWidth = 1 * window.devicePixelRatio;
          ctx.stroke();
        }

        // Core dot
        ctx.beginPath();
        ctx.arc(nx, ny, n.radius * window.devicePixelRatio, 0, Math.PI * 2);
        ctx.fillStyle = n.isCenter ? "#0875E1" : "rgba(8, 117, 225, 0.7)";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className}`}
      style={{ display: "block" }}
    />
  );
};
