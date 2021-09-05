import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useRef, useEffect } from 'react'

//<primitive object={gltf.scene} scale={0.1} />
export default function MainModel(props) {
    //const gltf = useLoader(GLTFLoader, "/models/scene.gltf");
    const group = useRef();
    const { nodes, materials, animations } = useGLTF("/models/armada.gltf");
    const { actions } = useAnimations(animations, group);
    
    return (
        <group ref={group} {...props} dispose={null}>
            <primitive object={nodes._rootJoint} />
            <skinnedMesh
                geometry={nodes.droid_Robot_0.geometry}
                material={materials.Robot}
                skeleton={nodes.droid_Robot_0.skeleton}
            />
        </group>
    );
}

useGLTF.preload("/models/armada.gltf");
  