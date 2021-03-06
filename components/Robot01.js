/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models/Robot01.gltf')
  const { actions } = useAnimations(animations, group)
  useEffect(() => {
    console.log("A: ", actions);
    //actions["Take 001"].play();
  });
  return (
    <group ref={group} {...props} dispose={null} scale={[.5, .5, .5]}>
      <group rotation={[-Math.PI / 2, 0, 0]} >
        <group rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes._rootJoint} />
          <skinnedMesh
            geometry={nodes.droid_Robot_0.geometry}
            material={materials.Robot}
            skeleton={nodes.droid_Robot_0.skeleton}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/Robot01.gltf')
