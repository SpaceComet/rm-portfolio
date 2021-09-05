import React, { useRef, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"

/*
camera={{ 
    fov: 75,
    position: [0.73, .88, 0.84],
    rotation: [-0.27, 0.44, 0.12]
}}
*/

// https://github.com/pmndrs/react-three-fiber/blob/master/markdown/recipes.md#using-your-own-camera-rig

export default function Camera(props) {
    const ref = useRef();
    //const set = useThree(state => state.set);
    const { size, set } = useThree()

    // Make the camera known to the system
    useEffect(() => void set({ camera: ref.current }), []);

    // Update it every frame
    useFrame(() => ref.current.updateMatrixWorld());
    
    return (

        <perspectiveCamera 
            ref={ref} {...props} 
            aspect={size.width / size.height}
            radius={(size.width + size.height) / 4}
            onUpdate={self => self.updateProjectionMatrix()}
        />
    )
}