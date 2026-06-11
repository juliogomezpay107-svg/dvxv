import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function useMouseParallax() {
  const targetRef = useRef<THREE.Object3D | null>(null)
  const activeRef = useRef(false)
  const baseYOffsetRef = useRef(Math.PI)
  const factorRef = useRef(0.1)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!activeRef.current || !targetRef.current) return
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = -(e.clientY / window.innerHeight) * 2 + 1
      targetRef.current.rotation.x = ny * factorRef.current
      targetRef.current.rotation.y = baseYOffsetRef.current + nx * factorRef.current
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return {
    setTarget: (obj: THREE.Object3D | null) => { targetRef.current = obj },
    setActive: (a: boolean) => { activeRef.current = a },
    setBaseYOffset: (v: number) => { baseYOffsetRef.current = v },
    setFactor: (f: number) => { factorRef.current = f },
  }
}
