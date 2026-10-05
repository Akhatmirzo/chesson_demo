'use client';

import { Suspense, useEffect, useLayoutEffect, useRef, type MutableRefObject } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const MODEL_URL = '/models/king.glb';
const HDRI_URL = '/hdri/studio_small_09_512.hdr';
const SCALE = 10; // model ~0.15 birlik balandlikda — ~1.5 ga kattalashtiramiz

export type KingSceneProps = {
  /** 0..1 — hero scroll progressi */
  progress: MutableRefObject<number>;
  /** progress o'zgarganda chaqiriladigan funksiyani ro'yxatdan o'tkazish */
  subscribe: (fn: () => void) => () => void;
  onReady?: () => void;
  preserveDrawingBuffer?: boolean;
};

const ease = (t: number) => t * t * (3 - 2 * t); // smoothstep
const lerp = THREE.MathUtils.lerp;

// Kamera kalit nuqtalari: boshlanish -> oxir
const CAM_FROM = new THREE.Vector3(0, 1.0, 5.6);
const CAM_TO = new THREE.Vector3(0.15, 1.38, 2.35);
const LOOK_FROM = new THREE.Vector3(0, 0.78, 0);
const LOOK_TO = new THREE.Vector3(0, 1.14, 0);
const ROT_FROM = -0.55;
const ROT_TO = ROT_FROM + Math.PI * 1.5;

function King({ progress, subscribe, onReady }: KingSceneProps) {
  const { scene } = useGLTF(MODEL_URL, false, true);
  const invalidate = useThree((s) => s.invalidate);
  const group = useRef<THREE.Group>(null);
  const look = useRef(new THREE.Vector3());

  useEffect(() => subscribe(() => invalidate()), [subscribe, invalidate]);

  useEffect(() => {
    // Birinchi kadr chizilgach "tayyor" deymiz (poster bilan almashish uchun)
    let id = requestAnimationFrame(() => {
      id = requestAnimationFrame(() => onReady?.());
    });
    return () => cancelAnimationFrame(id);
  }, [onReady]);

  useFrame(({ camera }) => {
    const p = ease(THREE.MathUtils.clamp(progress.current, 0, 1));
    if (group.current) group.current.rotation.y = lerp(ROT_FROM, ROT_TO, p);
    camera.position.lerpVectors(CAM_FROM, CAM_TO, p);
    look.current.lerpVectors(LOOK_FROM, LOOK_TO, p);
    camera.lookAt(look.current);
  });

  return (
    <group ref={group} rotation-y={ROT_FROM}>
      <primitive object={scene} scale={SCALE} />
    </group>
  );
}

function InitialCamera() {
  const camera = useThree((s) => s.camera);
  useLayoutEffect(() => {
    camera.position.copy(CAM_FROM);
    camera.lookAt(LOOK_FROM);
  }, [camera]);
  return null;
}

export default function KingScene(props: KingSceneProps) {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 1.75]}
      camera={{ fov: 26, near: 0.1, far: 50, position: CAM_FROM.toArray() }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: props.preserveDrawingBuffer ?? false,
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      aria-hidden="true"
    >
      <InitialCamera />
      <directionalLight position={[3, 5, 2]} intensity={1.6} color="#fff6ea" />
      <directionalLight position={[-4, 2, -3]} intensity={0.9} color="#ffd9c9" />
      <Suspense fallback={null}>
        <Environment files={HDRI_URL} environmentIntensity={0.9} />
        <King {...props} />
        <ContactShadows
          position={[0, 0.001, 0]}
          opacity={0.32}
          scale={2.6}
          blur={2.4}
          far={1.6}
          resolution={512}
          frames={1}
          color="#1f4d3a"
        />
      </Suspense>
    </Canvas>
  );
}
