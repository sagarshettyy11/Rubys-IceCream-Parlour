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

    let width = container.clientWidth || 450;
    let height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);

    // --- LIGHTING RIG ---
    // Soft ambient fill
    const ambientLight = new THREE.AmbientLight(0xFFFDF8, 1.1);
    scene.add(ambientLight);

    // Subtle side fill lights
    const rimLightLeft = new THREE.PointLight(0xFFE5CC, 1.5, 12);
    rimLightLeft.position.set(-6, 3, -1);
    scene.add(rimLightLeft);

    const fillLightRight = new THREE.PointLight(0xFFF5E6, 1.5, 12);
    fillLightRight.position.set(6, -2, 1);
    scene.add(fillLightRight);

    // Interactive Cursor Spotlight (follows mouse, highlighting normal map in 3D)
    const cursorLight = new THREE.PointLight(0xFFFFFF, 4.5, 10);
    cursorLight.position.set(0, 0, 2.5);
    scene.add(cursorLight);

    // --- MODEL CONTAINER ---
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // --- CYLINDRICAL PLANE GEOMETRY ---
    // Bend a subdivided plane into a cylindrical shape to give it volumetric 3D depth
    const planeGeom = new THREE.PlaneGeometry(3.3, 4.75, 48, 48);
    const pos = planeGeom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      // Bend edges backward in Z space to create volume
      const z = (Math.cos((x / 1.65) * (Math.PI / 2.3)) - 1) * 0.45;
      pos.setZ(i, z);
    }
    planeGeom.computeVertexNormals();

    // Loading placeholder material
    const planeMat = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: 0,
      side: THREE.DoubleSide
    });
    
    const imageMesh = new THREE.Mesh(planeGeom, planeMat);
    imageMesh.position.set(0, 0, 0);
    imageMesh.visible = false;
    mainGroup.add(imageMesh);

    // --- BACKGROUND REMOVAL & NORMAL MAP GENERATORS ---
    
    // BFS Flood-Fill to remove white background cleanly
    const floodFillBackground = (cvs) => {
      const ctx = cvs.getContext('2d');
      const w = cvs.width;
      const h = cvs.height;
      const imgData = ctx.getImageData(0, 0, w, h);
      const data = imgData.data;

      const isBackgroundPixel = (x, y) => {
        const idx = (y * w + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];
        const a = data[idx + 3];
        if (a === 0) return false;
        // Background is pure white/light grey
        return r > 230 && g > 230 && b > 230;
      };

      const visited = new Uint8Array(w * h);
      const queue = [];

      // Initialize queue with all border pixels
      for (let x = 0; x < w; x++) {
        if (isBackgroundPixel(x, 0)) { queue.push({ x, y: 0 }); visited[0 * w + x] = 1; }
        if (isBackgroundPixel(x, h - 1)) { queue.push({ x, y: h - 1 }); visited[(h - 1) * w + x] = 1; }
      }
      for (let y = 1; y < h - 1; y++) {
        if (isBackgroundPixel(0, y)) { queue.push({ x: 0, y }); visited[y * w + 0] = 1; }
        if (isBackgroundPixel(w - 1, y)) { queue.push({ x: w - 1, y }); visited[y * w + (w - 1)] = 1; }
      }

      // BFS traversal directions
      const dx = [0, 0, 1, -1];
      const dy = [1, -1, 0, 0];

      let head = 0;
      while (head < queue.length) {
        const { x, y } = queue[head++];
        const idx = (y * w + x) * 4;
        data[idx + 3] = 0; // Set alpha channel to 0

        for (let i = 0; i < 4; i++) {
          const nx = x + dx[i];
          const ny = y + dy[i];

          if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
            const vIdx = ny * w + nx;
            if (!visited[vIdx] && isBackgroundPixel(nx, ny)) {
              visited[vIdx] = 1;
              queue.push({ x: nx, y: ny });
            }
          }
        }
      }

      // Smooth alpha borders (anti-aliasing)
      for (let y = 1; y < h - 1; y++) {
        for (let x = 1; x < w - 1; x++) {
          const idx = (y * w + x) * 4;
          if (data[idx + 3] > 0) {
            // Check adjacent transparent pixels
            let sumAlpha = data[idx + 3];
            let neighbors = 1;
            
            for (let i = 0; i < 4; i++) {
              const nx = x + dx[i];
              const ny = y + dy[i];
              const nIdx = (ny * w + nx) * 4;
              if (data[nIdx + 3] === 0) {
                sumAlpha += 0;
                neighbors++;
              } else {
                sumAlpha += data[nIdx + 3];
              }
            }
            if (neighbors > 2) {
              data[idx + 3] = sumAlpha / (neighbors + 1);
            }
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
    };

    // Sobel Filter to generate a normal map for specular gloss
    const createNormalMap = (srcCanvas) => {
      const w = srcCanvas.width;
      const h = srcCanvas.height;
      const srcCtx = srcCanvas.getContext('2d');
      const srcData = srcCtx.getImageData(0, 0, w, h).data;

      const normCanvas = document.createElement('canvas');
      normCanvas.width = w;
      normCanvas.height = h;
      const normCtx = normCanvas.getContext('2d');
      const normImgData = normCtx.createImageData(w, h);
      const normData = normImgData.data;

      const getLuminance = (x, y) => {
        if (x < 0 || x >= w || y < 0 || y >= h) return 0;
        const idx = (y * w + x) * 4;
        return (srcData[idx] * 0.299 + srcData[idx + 1] * 0.587 + srcData[idx + 2] * 0.114);
      };

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const idx = (y * w + x) * 4;

          const dX = (
            -1 * getLuminance(x - 1, y - 1) + 1 * getLuminance(x + 1, y - 1) +
            -2 * getLuminance(x - 1, y)     + 2 * getLuminance(x + 1, y)     +
            -1 * getLuminance(x - 1, y + 1) + 1 * getLuminance(x + 1, y + 1)
          );

          const dY = (
            -1 * getLuminance(x - 1, y - 1) - 2 * getLuminance(x, y - 1) - 1 * getLuminance(x + 1, y - 1) +
            1 * getLuminance(x - 1, y + 1) + 2 * getLuminance(x, y + 1) + 1 * getLuminance(x + 1, y + 1)
          );

          // Calculate unit normal vector
          const strength = 0.05;
          const nx = dX * strength;
          const ny = dY * strength;
          const nz = 1.0;

          const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
          const r = ((nx / len) * 0.5 + 0.5) * 255;
          const g = ((ny / len) * 0.5 + 0.5) * 255;
          const b = ((nz / len) * 0.5 + 0.5) * 255;

          normData[idx] = r;
          normData[idx + 1] = g;
          normData[idx + 2] = b;
          normData[idx + 3] = srcData[idx + 3]; // Match parent alpha transparency
        }
      }

      normCtx.putImageData(normImgData, 0, 0);
      return new THREE.CanvasTexture(normCanvas);
    };

    // Load and filter image
    const img = new Image();
    img.src = '/images/premium_3d_ice_cream_nobg.png';
    img.onload = () => {
      const cvs = document.createElement('canvas');
      cvs.width = img.width;
      cvs.height = img.height;
      const ctx = cvs.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Apply flood fill transparency
      floodFillBackground(cvs);

      // Generate maps
      const colorTex = new THREE.CanvasTexture(cvs);
      const normTex = createNormalMap(cvs);

      // Apply to material
      planeMat.map = colorTex;
      planeMat.normalMap = normTex;
      planeMat.normalScale = new THREE.Vector2(0.9, 0.9);
      planeMat.roughness = 0.35;
      planeMat.metalness = 0.05;
      planeMat.clearcoat = 0.4;
      planeMat.clearcoatRoughness = 0.15;
      planeMat.opacity = 1;
      planeMat.needsUpdate = true;

      imageMesh.visible = true;
    };

    // --- ORBITING 3D PARTICLES ---
    const sprinklesArray = [];
    const sprinklesCount = 38;
    const colors = [
      0xFFB3BA, // Strawberry Pink
      0xFFDFBA, // Golden Honey
      0xBAFFC9, // Mint
      0xBAE1FF, // Soft Blue
      0xFFFCF2, // Cream
      0xE5A93B  // Accent Gold
    ];

    const sprinklesGroup = new THREE.Group();
    mainGroup.add(sprinklesGroup);

    for (let i = 0; i < sprinklesCount; i++) {
      const radius = 1.9 + Math.random() * 1.4;
      const angle = (i / sprinklesCount) * Math.PI * 2 + Math.random() * 0.4;
      const heightVal = -1.9 + Math.random() * 3.8;

      let particleMesh;

      if (Math.random() > 0.25) {
        // Cylinder sprinkle
        const sprGeom = new THREE.CylinderGeometry(0.02, 0.02, 0.16 + Math.random() * 0.1, 8);
        const sprMat = new THREE.MeshStandardMaterial({
          color: colors[Math.floor(Math.random() * colors.length)],
          roughness: 0.4,
          metalness: 0.1
        });
        particleMesh = new THREE.Mesh(sprGeom, sprMat);
      } else {
        // Dodecahedron star
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

    // Initial positioning
    mainGroup.rotation.set(0.1, -0.25, 0);

    // --- ADVANCED PHYSICS STORES (Spring-Mass-Damper Wobble) ---
    let currentRotationX = 0.1;
    let currentRotationY = -0.25;
    
    let targetRotationX = 0.1;
    let targetRotationY = -0.25;
    
    let velocityX = 0;
    let velocityY = 0;

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

      if (width < 480) {
        mainGroup.scale.set(0.85, 0.85, 0.85);
        mainGroup.position.y = -0.15;
      } else if (width < 768) {
        mainGroup.scale.set(0.98, 0.98, 0.98);
        mainGroup.position.y = 0.0;
      } else {
        mainGroup.scale.set(1.22, 1.22, 1.22);
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

      // Track cursor spotlight position
      cursorLight.position.x = mousePos.x * 4.2;
      cursorLight.position.y = -mousePos.y * 4.2;

      if (!isDragging) {
        // High fidelity mouse parallax targets
        targetRotationY = -0.25 + mousePos.x * 0.45;
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

      // Adjust direct targets in drag
      targetRotationY += deltaX * 0.009;
      targetRotationX += deltaY * 0.009;

      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleMouseEnter = () => {
      autoRotationSpeed = 0.012; // Accelerate on hover
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

    // --- ANIMATION RENDER LOOP ---
    let frameId;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Premium vertical floating bounce
      mainGroup.position.y += Math.sin(elapsedTime * 1.5) * 0.0012;

      // Orbiting particles math
      sprinklesArray.forEach((part) => {
        part.userData.angle += part.userData.speed;
        part.position.x = Math.cos(part.userData.angle) * part.userData.radius;
        part.position.z = Math.sin(part.userData.angle) * part.userData.radius;

        part.position.y = part.userData.yOffset + Math.sin(elapsedTime * part.userData.floatSpeed) * part.userData.floatAmplitude;

        part.rotation.x += part.userData.rotSpeedX;
        part.rotation.y += part.userData.rotSpeedY;
      });

      // Slowly rotate particle group
      sprinklesGroup.rotation.y = elapsedTime * 0.032;

      // Scroll physics spin addition
      const extraScrollRotation = scrollVal * Math.PI * 1.85;

      // Elastic Spring-Mass-Damper Interpolation
      if (!isDragging) {
        // Continuous rotation addition
        targetRotationY += autoRotationSpeed;

        // Force = k * x (where x is target - current)
        const forceX = (targetRotationX - currentRotationX) * 0.09;
        const forceY = (targetRotationY - currentRotationY) * 0.09;

        // Velocity damping & integration
        velocityX = (velocityX + forceX) * 0.81;
        velocityY = (velocityY + forceY) * 0.81;

        currentRotationX += velocityX;
        currentRotationY += velocityY;
      } else {
        // Tight coupling during drag
        currentRotationX += (targetRotationX - currentRotationX) * 0.22;
        currentRotationY += (targetRotationY - currentRotationY) * 0.22;
        velocityX = 0;
        velocityY = 0;
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
