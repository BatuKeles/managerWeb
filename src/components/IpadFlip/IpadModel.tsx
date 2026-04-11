'use client'

import type { MutableRefObject } from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { IMAGES } from './screens'

const SCREEN_WIDTH_RATIO = 0.92
const SCREEN_HEIGHT_RATIO = 0.96
const SCREEN_OFFSET_X = 0.0
const SCREEN_OFFSET_Y = 0.0
const SCREEN_DEPTH_BIAS = 0.005
const SCREEN_CORNER_RADIUS = 0.03
const TARGET_HEIGHT = 2.2

/* ── rounded-rect canvas texture helper ── */
function createRoundedTexture(img: HTMLImageElement): THREE.CanvasTexture {
  const w = img.naturalWidth
  const h = img.naturalHeight
  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  const radius = Math.min(w, h) * SCREEN_CORNER_RADIUS

  ctx.clearRect(0, 0, w, h)
  ctx.save()
  ctx.beginPath()
  // roundRect fallback
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const anyCtx = ctx as any
  if (typeof anyCtx.roundRect === 'function') {
    anyCtx.roundRect(0, 0, w, h, radius)
  } else {
    ctx.moveTo(radius, 0)
    ctx.lineTo(w - radius, 0)
    ctx.quadraticCurveTo(w, 0, w, radius)
    ctx.lineTo(w, h - radius)
    ctx.quadraticCurveTo(w, h, w - radius, h)
    ctx.lineTo(radius, h)
    ctx.quadraticCurveTo(0, h, 0, h - radius)
    ctx.lineTo(0, radius)
    ctx.quadraticCurveTo(0, 0, radius, 0)
    ctx.closePath()
  }
  ctx.clip()
  ctx.drawImage(img, 0, 0, w, h)
  ctx.restore()

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  tex.anisotropy = 8
  tex.needsUpdate = true
  return tex
}

function loadImageAsync(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

interface IpadModelProps {
  progressRef: MutableRefObject<number>
}

export default function IpadModel({ progressRef }: IpadModelProps) {
  const tabletRef = useRef<THREE.Group>(null)
  const { scene } = useGLTF('/models/ipad.glb')

  const [textures, setTextures] = useState<THREE.CanvasTexture[]>([])

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const isSmallScreen = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.innerWidth < 768
  }, [])

  /* ── prepare model + compute bbox ── */
  const { modelGroup, tabletSize, tabletCenter } = useMemo(() => {
    const root = scene.clone(true)

    // collect meshes with face counts
    const meshes: { mesh: THREE.Mesh; faces: number }[] = []
    root.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const m = obj as THREE.Mesh
        const g = m.geometry
        const faces = g.index ? g.index.count / 3 : g.attributes.position.count / 3
        meshes.push({ mesh: m, faces })
      }
    })

    // eslint-disable-next-line no-console
    console.log(
      '[IpadModel] meshes:',
      meshes.map((m) => ({ name: m.mesh.name, faces: m.faces })),
    )

    if (meshes.length === 0) {
      return {
        modelGroup: root,
        tabletSize: new THREE.Vector3(1, 1, 0.1),
        tabletCenter: new THREE.Vector3(),
      }
    }

    meshes.sort((a, b) => b.faces - a.faces)
    const tabletMesh = meshes[0].mesh

    // world bbox of tablet mesh
    const worldBox = new THREE.Box3().setFromObject(tabletMesh)
    const worldCenter = new THREE.Vector3()
    worldBox.getCenter(worldCenter)
    const worldSize = new THREE.Vector3()
    worldBox.getSize(worldSize)

    // translate root so tablet center = origin
    root.position.sub(worldCenter)

    // scale root so largest dim = TARGET_HEIGHT
    const maxDim = Math.max(worldSize.x, worldSize.y, worldSize.z)
    const scale = maxDim > 0 ? TARGET_HEIGHT / maxDim : 1

    const wrapper = new THREE.Group()
    wrapper.add(root)
    wrapper.scale.setScalar(scale)
    wrapper.updateMatrixWorld(true)

    // recompute world bbox of tabletMesh
    const newBox = new THREE.Box3().setFromObject(tabletMesh)
    const newSize = new THREE.Vector3()
    const newCenter = new THREE.Vector3()
    newBox.getSize(newSize)
    newBox.getCenter(newCenter)

    return { modelGroup: wrapper, tabletSize: newSize, tabletCenter: newCenter }
  }, [scene])

  /* ── materials (stable references) ── */
  const frontMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        toneMapped: false,
        transparent: true,
        alphaTest: 0.01,
      }),
    [],
  )
  const backMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        toneMapped: false,
        transparent: true,
        alphaTest: 0.01,
      }),
    [],
  )

  /* ── async load textures ── */
  useEffect(() => {
    let cancelled = false
    const created: THREE.CanvasTexture[] = []
    Promise.all(IMAGES.map((meta) => loadImageAsync(meta.src)))
      .then((imgs) => {
        if (cancelled) return
        const texs = imgs.map((img) => {
          const t = createRoundedTexture(img)
          created.push(t)
          return t
        })
        setTextures(texs)
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('[IpadModel] texture load error', err)
      })

    return () => {
      cancelled = true
      created.forEach((t) => t.dispose())
    }
  }, [])

  /* ── initial material map assignment ── */
  useEffect(() => {
    if (textures.length === 0) return
    frontMat.map = textures[0]
    frontMat.needsUpdate = true
    backMat.map = textures[1] ?? textures[0]
    backMat.needsUpdate = true
  }, [textures, frontMat, backMat])

  const FLIPS = IMAGES.length - 1

  function updateTextures(rotY: number) {
    if (textures.length === 0) return
    let flips = Math.round(rotY / Math.PI)
    flips = Math.max(0, Math.min(FLIPS, flips))

    let frontIdx: number
    let backIdx: number
    if (flips % 2 === 0) {
      frontIdx = flips
      backIdx = Math.min(flips + 1, IMAGES.length - 1)
    } else {
      backIdx = flips
      frontIdx = Math.min(flips + 1, IMAGES.length - 1)
    }

    if (frontMat.map !== textures[frontIdx]) {
      frontMat.map = textures[frontIdx]
      frontMat.needsUpdate = true
    }
    if (backMat.map !== textures[backIdx]) {
      backMat.map = textures[backIdx]
      backMat.needsUpdate = true
    }
  }

  useFrame(() => {
    if (!tabletRef.current) return
    const rotY = progressRef.current * Math.PI * FLIPS
    if (prefersReducedMotion) {
      tabletRef.current.rotation.y = rotY
    } else {
      tabletRef.current.rotation.y = THREE.MathUtils.lerp(
        tabletRef.current.rotation.y,
        rotY,
        0.12,
      )
    }
    updateTextures(tabletRef.current.rotation.y)
  })

  const planeW = tabletSize.x * SCREEN_WIDTH_RATIO
  const planeH = tabletSize.y * SCREEN_HEIGHT_RATIO
  const halfDepth = tabletSize.z / 2

  const frontPos: [number, number, number] = [
    tabletCenter.x + SCREEN_OFFSET_X,
    tabletCenter.y + SCREEN_OFFSET_Y,
    tabletCenter.z + halfDepth + SCREEN_DEPTH_BIAS,
  ]
  const backPos: [number, number, number] = [
    tabletCenter.x + SCREEN_OFFSET_X,
    tabletCenter.y + SCREEN_OFFSET_Y,
    tabletCenter.z - halfDepth - SCREEN_DEPTH_BIAS,
  ]

  const groupX = isSmallScreen ? 0 : 1.0
  const groupY = isSmallScreen ? 0.5 : -0.15
  const groupScale = isSmallScreen ? 0.65 : 1.2

  return (
    <group ref={tabletRef} position={[groupX, groupY, 0]} scale={groupScale}>
      <primitive object={modelGroup} />
      <mesh position={frontPos} material={frontMat}>
        <planeGeometry args={[planeW, planeH]} />
      </mesh>
      <mesh position={backPos} rotation={[0, Math.PI, 0]} material={backMat}>
        <planeGeometry args={[planeW, planeH]} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/ipad.glb')
