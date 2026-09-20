"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useMotionPreference } from "@/providers/motion-provider";

export const FocusThreeMesh: React.FC<{ accentColor?: string }> = ({
  accentColor = "#10b981",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useMotionPreference();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    // Dimensions
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 240;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 75;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Geometry: Torus Knot + Particle Points
    const geom = new THREE.TorusKnotGeometry(22, 6, 96, 16, 2, 3);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(accentColor),
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const mesh = new THREE.Mesh(geom, wireframeMat);
    scene.add(mesh);

    // Outer particle cloud
    const particlesCount = 180;
    const particlePositions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 110;
      particlePositions[i + 1] = (Math.random() - 0.5) * 110;
      particlePositions[i + 2] = (Math.random() - 0.5) * 80;
    }
    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color(accentColor),
      size: 2,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particlePoints = new THREE.Points(particleGeom, particleMat);
    scene.add(particlePoints);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Resize Observer
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    ro.observe(container);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      if (!isReducedMotion) {
        mesh.rotation.x += delta * 0.4;
        mesh.rotation.y += delta * 0.6;

        particlePoints.rotation.y -= delta * 0.15;
        particlePoints.rotation.x += delta * 0.1;

        // Smooth mouse follow
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        mesh.rotation.y += targetX * 0.2;
        mesh.rotation.x -= targetY * 0.2;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      ro.disconnect();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      geom.dispose();
      wireframeMat.dispose();
      particleGeom.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [accentColor, isReducedMotion]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[260px] sm:h-[320px] rounded-2xl overflow-hidden bg-gradient-to-b from-primary/5 via-background/40 to-background/80 border border-border/50 flex items-center justify-center cursor-grab active:cursor-grabbing"
    >
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2 rounded-full bg-background/80 border border-border/60 px-3 py-1 text-[11px] font-mono text-muted-foreground backdrop-blur-md">
        <span className="inline-block size-2 rounded-full bg-primary animate-pulse" />
        <span>THREE.JS // WEBGL SHADER KINETICS</span>
      </div>
      <div className="absolute bottom-3 right-3 z-10 text-[10px] font-mono text-muted-foreground/80 pointer-events-none">
        Move mouse to orient 3D torus
      </div>
    </div>
  );
};
