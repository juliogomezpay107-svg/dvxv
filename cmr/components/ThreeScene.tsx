import { useRef, useEffect, forwardRef, useImperativeHandle, useState } from 'react'
import { Canvas, useFrame, RootState } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { CameraModel, CameraModelHandle } from './CameraModel'
import { useMouseParallax } from '../hooks/useMouseParallax'

export interface ThreeSceneHandle {
  cameraModel: CameraModelHandle | null
}

function CameraRig({
  onReady,
}: {
  onReady?: (handle: CameraModelHandle) => void
}) {
  const modelRef = useRef<CameraModelHandle>(null!)
  const floatingRef = useRef<THREE.Group>(null!)
  const [textureActive, setTextureActive] = useState(false)
  const mouse = useMouseParallax()
  const initialized = useRef(false)

  useEffect(() => {
    if (modelRef.current && !initialized.current) {
      initialized.current = true
      const handle = modelRef.current
      onReady?.(handle)

      mouse.setTarget(handle.group)

      handle.group.scale.set(0.3, 0.3, 0.3)

      gsap.to(handle.group.scale, {
        x: 1, y: 1, z: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.2,
      })

      gsap.to(handle.group.rotation, {
        y: Math.PI,
        duration: 0.8,
        ease: 'power4.out',
        delay: 1.0,
        onComplete: () => {
          setTextureActive(true)
          mouse.setActive(true)
        },
      })
    }
  }, [onReady, mouse])

  useFrame((state: RootState) => {
    if (floatingRef.current) {
      floatingRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <group ref={floatingRef}>
      <CameraModel ref={modelRef} textureActive={textureActive} />
    </group>
  )
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.4} color="#FFFFFF" />
      <directionalLight intensity={1.2} color="#FFFFFF" position={[5, 5, 4]} castShadow />
      <directionalLight intensity={0.6} color="#00E5FF" position={[-5, -2, 2]} />
      <pointLight intensity={1.5} color="#FFFFFF" position={[0, 0, 3]} />
    </>
  )
}

export const ThreeScene = forwardRef<ThreeSceneHandle, {
  onCameraReady?: (ref: CameraModelHandle) => void
}>(
  function ThreeScene({ onCameraReady }, ref) {
    const modelRef = useRef<CameraModelHandle | null>(null)

    useImperativeHandle(ref, () => ({
      get cameraModel() { return modelRef.current },
    }))

    return (
      <div className="fixed inset-0" style={{ zIndex: 2, pointerEvents: 'none' }}>
        <Canvas
          camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 5] }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <SceneLighting />
          <CameraRig
            onReady={(handle) => {
              modelRef.current = handle
              onCameraReady?.(handle)
            }}
          />
        </Canvas>
      </div>
    )
  },
)

export default ThreeScene
