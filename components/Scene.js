/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Robert Crosby (https://sketchfab.com/robmcrosby)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/dc1797a6d49e4629bf8ca668bd76e0d0
title: Steam Engine
*/

import React, { useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/scene.gltf')
  const { actions } = useAnimations(animations, group)
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group name="Armature" position={[-0.03, 0, 0]}>
          <primitive object={nodes.Armature_rootJoint} />
          <skinnedMesh
            geometry={nodes.SteamEngine_0.geometry}
            material={materials.Metal}
            skeleton={nodes.SteamEngine_0.skeleton}
          />
          <skinnedMesh
            geometry={nodes.SteamEngine_1.geometry}
            material={materials.Painted}
            skeleton={nodes.SteamEngine_1.skeleton}
          />
          <skinnedMesh
            geometry={nodes.SteamEngine_2.geometry}
            material={materials.Wood}
            skeleton={nodes.SteamEngine_2.skeleton}
          />
          <skinnedMesh
            geometry={nodes.SteamEngine_3.geometry}
            material={materials.Brass}
            skeleton={nodes.SteamEngine_3.skeleton}
          />
          <skinnedMesh
            geometry={nodes.SteamEngine_4.geometry}
            material={materials.Copper}
            skeleton={nodes.SteamEngine_4.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/scene.gltf')
