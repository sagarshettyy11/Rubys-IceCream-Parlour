import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function IceCream3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // --- SCENE, CAMERA, RENDERER Setup ---
    const scene = new THREE.Scene();

    // Responsive sizing
    let width = container.clientWidth || 450;
    let height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true, // Transparent background to blend into the CSS gradient
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    // --- LIGHTING (Mainly for orbiting sprinkles/stars) ---
    const ambientLight = new THREE.AmbientLight(0xFFF8F0, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xFFFFFF, 1.2);
    dirLight.position.set(5, 8, 5);
    scene.add(dirLight);

    const rimLightLeft = new THREE.PointLight(0xFF4081, 2.5, 10);
    rimLightLeft.position.set(-5, 2, -2);
    scene.add(rimLightLeft);

    const fillLightRight = new THREE.PointLight(0xE5A93B, 2.0, 10);
    fillLightRight.position.set(5, -2, 2);
    scene.add(fillLightRight);

    // --- MODEL CONTAINER ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- REAL IMAGE plane ---
    const textureLoader = new THREE.TextureLoader();
    const iceCreamTexture = textureLoader.load('/images/real_hero_ice_cream.png');
    
    // Create a Plane mapped to the PNG.
    // 3.2 x 4.8 plane size fits the vertical waffle cone aspect ratio beautifully
    const planeGeom = new THREE.PlaneGeometry(3.3, 4.75);
    const planeMat = new THREE.MeshBasicMaterial({
      map: iceCreamTexture,
      transparent: true,
      side: THREE.DoubleSide
    });
    
    const imageMesh = new THREE.Mesh(planeGeom, planeMat);
    imageMesh.position.set(0, 0, 0);
    mainGroup.add(imageMesh);

    // --- ORBITING 3D PARTICLES (Sprinkles & Stars) ---
    const sprinklesArray = [];
    const sprinklesCount = 38;
    const colors = [
      0xFFB3BA, // Strawberry Pink
      0xFFDFBA, // Golden Honey
      0xBAFFC9, // Mint Green
      0xBAE1FF, // Soft Blue
      0xFFFCF2, // Cream White
      0xE5A93B  // Accent Gold
    ];

    const sprinklesGroup = new THREE.Group();
    mainGroup.add(sprinklesGroup);

    for (let i = 0; i < sprinklesCount; i++) {
      const radius = 1.8 + Math.random() * 1.3;
      const angle = (i / sprinklesCount) * Math.PI * 2 + Math.random() * 0.4;
      const heightVal = -1.8 + Math.random() * 3.6;

      let particleMesh;

      if (Math.random() > 0.25) {
        // 3D Sprinkle (cylinder)
        const sprGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.16 + Math.random() * 0.1, 8);
        const sprMat = new THREE.MeshStandardMaterial({
          color: colors[Math.floor(Math.random() * colors.length)],
          roughness: 0.4,
          metalness: 0.1
        });
        particleMesh = new THREE.Mesh(sprGeom, sprMat);
      } else {
        // 3D Star/Crystal (dodecahedron)
        const starGeom = new THREE.DodecahedronGeometry(0.045 + Math.random() * 0.035, 0);
        const starMat = new THREE.MeshStandardMaterial({
          color: 0xE5A93B,
          roughness: 0.2,
          metalness: 0.9
        });
        particleMesh = new THREE.Mesh(starGeom, starMat);
      }

      particleMesh.position.set(
        Math.cos(angle) * radius,
        heightVal,
        Math.sin(angle) * radius
      );

      particleMesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      // Store particle properties
      particleMesh.userData = {
        angle: angle,
        radius: radius,
        speed: 0.003 + Math.random() * 0.004,
        rotSpeedX: 0.01 + Math.random() * 0.02,
        rotSpeedY: 0.01 + Math.random() * 0.02,
        yOffset: heightVal,
        floatSpeed: 0.6 + Math.random() * 1.2,
        floatAmplitude: 0.05 + Math.random() * 0.07
      };

      sprinklesGroup.add(particleMesh);
      sprinklesArray.push(particleMesh);
    }

    // Initial group adjustments
    mainGroup.rotation.set(0.1, -0.2, 0);

    // --- INTERACTIVE SYSTEM & ROTATION VELOCITIES ---
    let currentRotationX = 0.1;
    let currentRotationY = -0.2;
    let targetRotationX = 0.1;
    let targetRotationY = -0.2;
    let autoRotationSpeed = 0.0035;

    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;

    const mousePos = { x: 0, y: 0 };
    let scrollVal = 0;

    // --- RESPONSIVE SCALER ---
    const scaleToFit = () => {
      width = container.clientWidth || 450;
      height = container.clientHeight || 500;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Scaler adjustments based on breakpoints
      if (width < 480) {
        mainGroup.scale.set(0.82, 0.82, 0.82);
        mainGroup.position.y = -0.15;
      } else if (width < 768) {
        mainGroup.scale.set(0.95, 0.95, 0.95);
        mainGroup.position.y = 0.0;
      } else {
        mainGroup.scale.set(1.2, 1.2, 1.2);
        mainGroup.position.y = 0.1;
      }
    };

    scaleToFit();

    const resizeObserver = new ResizeObserver(() => scaleToFit());
    resizeObserver.observe(container);

    // --- EVENT LISTENERS ---
    const handleMouseMoveGlobal = (e) => {
      mousePos.x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mousePos.y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);

      if (!isDragging) {
        // Soft tilt following the mouse pointer coordinates
        targetRotationY = -0.2 + mousePos.x * 0.45;
        targetRotationX = 0.1 + mousePos.y * 0.35;
      }
    };

    const handlePointerDown = (e) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousPointerX;
      const deltaY = e.clientY - previousPointerY;

      // Direct drag rotation targets
      targetRotationY += deltaX * 0.008;
      targetRotationX += deltaY * 0.008;

      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleMouseEnter = () => {
      autoRotationSpeed = 0.012; // Speed up auto-spin on hover
    };

    const handleMouseLeave = () => {
      autoRotationSpeed = 0.0035;
      isDragging = false;
    };

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        scrollVal = window.scrollY / totalScroll;
      }
    };

    window.addEventListener('mousemove', handleMouseMoveGlobal);
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll);

    // --- ANIMATION RENDERING LOOP ---
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Gentle floating bounce on Y-axis
      mainGroup.position.y += Math.sin(elapsedTime * 1.4) * 0.0012;

      // Update sprinkles positions
      sprinklesArray.forEach((part) => {
        part.userData.angle += part.userData.speed;
        part.position.x = Math.cos(part.userData.angle) * part.userData.radius;
        part.position.z = Math.sin(part.userData.angle) * part.userData.radius;

        // Sprinkle vertical drift
        part.position.y = part.userData.yOffset + Math.sin(elapsedTime * part.userData.floatSpeed) * part.userData.floatAmplitude;

        // Individual spin
        part.rotation.x += part.userData.rotSpeedX;
        part.rotation.y += part.userData.rotSpeedY;
      });

      // Ambient sprinkle group spin
      sprinklesGroup.rotation.y = elapsedTime * 0.03;

      // Extra spin rotation on scroll
      const extraScrollRotation = scrollVal * Math.PI * 1.8;

      // Interpolate actual rotation towards target with smooth damping
      if (!isDragging) {
        currentRotationY += autoRotationSpeed;
        currentRotationX += (targetRotationX - currentRotationX) * 0.065;
        currentRotationY += (targetRotationY - currentRotationY) * 0.065;
      } else {
        currentRotationX += (targetRotationX - currentRotationX) * 0.15;
        currentRotationY += (targetRotationY - currentRotationY) * 0.15;
      }

      mainGroup.rotation.x = currentRotationX;
      mainGroup.rotation.y = currentRotationY + extraScrollRotation;

      renderer.render(scene, camera);
    };

    animate();

    // --- CLEANUP ---
    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);

      planeGeom.dispose();
      planeMat.dispose();
      iceCreamTexture.dispose();

      sprinklesArray.forEach((part) => {
        part.geometry.dispose();
        part.material.dispose();
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '480px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        cursor: 'grab'
      }}
    >
      <canvas 
        ref={canvasRef} 
        style={{
          width: '100%',
          height: '100%',
          outline: 'none',
          touchAction: 'none'
        }}
      />
    </div>
  );
}
