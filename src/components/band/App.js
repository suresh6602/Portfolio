'use client';
import './index.css';
import * as THREE from 'three';
import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

extend({ MeshLineGeometry, MeshLineMaterial });

const GLTF_PATH = '/assets/kartu.glb';
const TEXTURE_PATH = '/assets/bandd.png';
const FRONT_PATH = '/assets/P.png';
useGLTF.preload(GLTF_PATH);
useTexture.preload(TEXTURE_PATH);
useTexture.preload(FRONT_PATH);

export default function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div
      className="responsive-wrapper"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      <Canvas
        gl={{ alpha: true }}
        camera={{ position: [0, 0, 13], fov: 25 }}
        style={{
          background: 'transparent',
          width: '100%',
          height: '100%',
          pointerEvents: isMobile ? 'none' : 'auto', // ✅ fix drag desktop
        }}
      >
        <ambientLight intensity={Math.PI} />

        <Scene isMobile={isMobile} />

        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

function Scene({ isMobile }) {
  return (
    <Physics
      key={isMobile ? 'mobile' : 'desktop'}
      interpolate
      gravity={[0, -40, 0]}
      timeStep={1 / 60}
    >
      {/* hanya desktop */}
      {!isMobile && <Band isMobile={isMobile} />}
    </Physics>
  );
}

function makeCardTexture(width, height, drawFn) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  drawFn(ctx, width, height);
  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 16;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}

function drawFrontCard(ctx, W, H, profileImg) {
  // White card background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  // Top header bar
  ctx.fillStyle = '#0f0f0f';
  ctx.fillRect(0, 0, W, 72);
  ctx.fillStyle = '#ffffff';
  ctx.font = '400 16px Arial, sans-serif';
  ctx.letterSpacing = '6px';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('EMPLOYEE ID', W / 2 + 3, 36);
  ctx.letterSpacing = '0px';

  // Photo frame (object-cover fitting)
  const padX = 60;
  const photoX = padX;
  const photoY = 110;
  const photoW = W - padX * 2;
  const photoH = 410;

  ctx.fillStyle = '#f3f3f3';
  ctx.fillRect(photoX, photoY, photoW, photoH);

  if (profileImg && profileImg.naturalWidth) {
    const imgW = profileImg.naturalWidth;
    const imgH = profileImg.naturalHeight;
    const imgAspect = imgW / imgH;
    const targetAspect = photoW / photoH;

    let sx, sy, sw, sh;
    if (imgAspect > targetAspect) {
      // Image wider than frame — crop sides, keep full height
      sh = imgH;
      sw = imgH * targetAspect;
      sx = (imgW - sw) / 2;
      sy = 0;
    } else {
      // Image taller than frame — crop top/bottom, center vertically
      sw = imgW;
      sh = imgW / targetAspect;
      sx = 0;
      sy = (imgH - sh) / 2;
    }

    ctx.save();
    ctx.beginPath();
    ctx.rect(photoX, photoY, photoW, photoH);
    ctx.clip();
    ctx.drawImage(profileImg, sx, sy, sw, sh, photoX, photoY, photoW, photoH);
    ctx.restore();
  }

  // Photo border
  ctx.strokeStyle = 'rgba(0,0,0,0.12)';
  ctx.lineWidth = 1;
  ctx.strokeRect(photoX + 0.5, photoY + 0.5, photoW - 1, photoH - 1);

  // Name
  ctx.fillStyle = '#111111';
  ctx.font = '800 42px Arial, sans-serif';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('Sureshkumar R', W / 2, photoY + photoH + 60);

  // Designation
  ctx.fillStyle = '#1f1f1f';
  ctx.font = '600 22px Arial, sans-serif';
  ctx.fillText('Full Stack Engineer', W / 2, photoY + photoH + 95);

  // Footer divider + id
  ctx.strokeStyle = 'rgba(0,0,0,0.1)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padX, H - 50);
  ctx.lineTo(W - padX, H - 50);
  ctx.stroke();

  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.font = '400 13px Arial, sans-serif';
  ctx.fillText('ID-2026-0001', W / 2, H - 28);

  // Outer border
  ctx.strokeStyle = 'rgba(0,0,0,0.15)';
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, W - 1, H - 1);
}

function drawBackCard(ctx, W, H) {
  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, W, H);

  // Top bar
  ctx.fillStyle = '#0f0f0f';
  ctx.fillRect(0, 0, W, 72);
  ctx.fillStyle = '#ffffff';
  ctx.font = '400 16px Arial, sans-serif';
  ctx.letterSpacing = '6px';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('CONTACT INFO', W / 2 + 3, 36);
  ctx.letterSpacing = '0px';

  const cx = W / 2;
  let y = 200;

  // NAME
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.font = '500 14px Arial, sans-serif';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('NAME', cx, y);
  y += 38;
  ctx.fillStyle = '#111111';
  ctx.font = '700 34px Arial, sans-serif';
  ctx.fillText('Sureshkumar R', cx, y);
  y += 65;

  ctx.strokeStyle = 'rgba(0,0,0,0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(80, y);
  ctx.lineTo(W - 80, y);
  ctx.stroke();
  y += 50;

  // ROLE
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.font = '500 14px Arial, sans-serif';
  ctx.fillText('ROLE', cx, y);
  y += 32;
  ctx.fillStyle = '#111111';
  ctx.font = '600 22px Arial, sans-serif';
  ctx.fillText('Full Stack Engineer', cx, y);
  y += 55;

  ctx.beginPath();
  ctx.moveTo(80, y);
  ctx.lineTo(W - 80, y);
  ctx.stroke();
  y += 50;

  // EMAIL
  ctx.fillStyle = 'rgba(0,0,0,0.4)';
  ctx.font = '500 14px Arial, sans-serif';
  ctx.fillText('EMAIL', cx, y);
  y += 30;
  ctx.fillStyle = '#111111';
  ctx.font = '500 19px Arial, sans-serif';
  ctx.fillText('sureshkumar27082002@gmail.com', cx, y);

  // Bottom bar
  ctx.fillStyle = '#0f0f0f';
  ctx.fillRect(0, H - 72, W, 72);
  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.font = '400 11px Arial, sans-serif';
  ctx.letterSpacing = '4px';
  ctx.textBaseline = 'middle';
  ctx.fillText('RETURN IF FOUND', W / 2 + 2, H - 36);
  ctx.letterSpacing = '0px';

  // Outer border
  ctx.strokeStyle = 'rgba(0,0,0,0.15)';
  ctx.lineWidth = 1;
  ctx.strokeRect(0.5, 0.5, W - 1, H - 1);
}

function Band({ isMobile, maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef();
  const fixed = useRef();
  const j1 = useRef();
  const j2 = useRef();
  const j3 = useRef();
  const card = useRef();

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(GLTF_PATH);
  const texture = useTexture(TEXTURE_PATH);
  const frontTexture = useTexture(FRONT_PATH);

  const frontMaterial = useMemo(() => {
    const tex = makeCardTexture(600, 840, (ctx, W, H) =>
      drawFrontCard(ctx, W, H, frontTexture.image)
    );
    if (tex) {
      // GLTF card UVs span 0-0.5; repeat 2 maps the full canvas onto the face
      tex.repeat.set(2, 1);
      tex.offset.set(0, 0);
    }
    const mat = materials.base.clone();
    if (tex) mat.map = tex;
    mat.side = THREE.FrontSide;
    mat.needsUpdate = true;
    return mat;
  }, [materials.base, frontTexture]);

  const backMaterial = useMemo(() => {
    const tex = makeCardTexture(600, 840, drawBackCard);
    if (tex) {
      // repeat 2 to fill the half-UV face; negative U + offset 1 mirrors so
      // text reads correctly when viewed from behind (BackSide flips it)
      tex.repeat.set(-2, 1);
      tex.offset.set(1, 0);
    }
    return new THREE.MeshBasicMaterial({
      map: tex || null,
      side: THREE.BackSide,
    });
  }, []);

  const { width, height } = useThree((state) => state.size);

  const [curve] = useState(() => {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
      new THREE.Vector3(),
    ]);
    c.curveType = 'chordal';
    return c;
  });

  const bandTexture = useMemo(() => {
    const t = texture.clone();
    t.wrapS = THREE.RepeatWrapping;
    t.wrapT = THREE.RepeatWrapping;
    t.needsUpdate = true;
    return t;
  }, [texture]);

  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const canDrag = !isMobile;

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);

  useEffect(() => {
    if (hovered && canDrag) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged, canDrag]);

  useFrame((state, delta) => {
    if (dragged && card.current && canDrag) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));

      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());

      const newX = vec.x - dragged.x;
      let newY = vec.y - dragged.y;
      const newZ = vec.z - dragged.z;

      const screenY = state.pointer.y;
      const limit = isMobile ? -0.1 : -0.2;

      if (screenY < limit) newY = card.current.translation().y;

      card.current.setNextKinematicTranslation({ x: newX, y: newY, z: newZ });
    }

    if (fixed.current && j1.current && j2.current && j3.current && card.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped) {
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        }

        const d = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );

        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + d * (maxSpeed - minSpeed))
        );
      });

      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());

      if (band.current?.geometry) {
        band.current.geometry.setPoints(curve.getPoints(32));
      }

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());

      card.current.setAngvel({
        x: ang.x,
        y: ang.y - rot.y * 0.25,
        z: ang.z,
      });
    }
  });

  return (
    <>
      <group position={[3, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>

        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.93, 1.3, 0.01]} />

          <group
            scale={2.6}
            position={[0, -1.4, -0.05]}
            onPointerOver={() => canDrag && hover(true)}
            onPointerOut={() => canDrag && hover(false)}
            onPointerUp={(e) => {
              if (!canDrag) return;
              e.target.releasePointerCapture(e.pointerId);
              drag(false);
            }}
            onPointerDown={(e) => {
              if (!canDrag) return;
              e.target.setPointerCapture(e.pointerId);
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation()))
              );
            }}
          >
            <mesh geometry={nodes.card.geometry} material={frontMaterial} />
            <mesh geometry={nodes.card.geometry} material={backMaterial} />
            <mesh geometry={nodes.clip.geometry} material={materials.metal} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          transparent
          opacity={0.9}
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={bandTexture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}