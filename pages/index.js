import React, { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from "@react-three/fiber"
//import { Environment, OrbitControls } from "@react-three/drei";
import { useSpring, animated } from 'react-spring'
import { Suspense } from "react";
import Lights from "../components/lights"
import MainModel from '../components/mainModel'
import { Box } from '../components/rmGeos';
import { GridHelper } from 'three';
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { OrbitControls } from '@react-three/drei';
import Robot01 from "../components/Robot01"
import SteamMachine from "../components/SteamMachine"

const isOrbitControls = true;

let camPos = {
    x: 0,
    y: 0,
    z: 0
};

let camPosList = [
    {
        position: {
            x: 0.74,
            y: 0.89,
            z: 0.95,
        },
        rotation: {
            _x: -0.41,
            _y: 0.36, 
            _z: 0.15
        },
        quaternion:{
            _x: -0.18,
            _y: 0.19, 
            _z: 0.03
        }
    },
    {
        position: { x: 1.6426732084957327, y: 0.48083797546932344, z: 0.3033016806224841 },
        rotation: { _x: -0.5263450420490279, _y: 1.2821202585212284, _z: 0.5081834407404995},
        quaternion: { _x: -0.056649455321475424, _y: 0.6113225515003889, _z: 0.04394098014608418}
    }
]

function Dolly() {

    const { viewport, mouse, size } = useThree();
    const rmCam = useThree((state) => state.camera)

    const { spring } = useSpring({
        spring: active,
        config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
    });

    console.log(active);

    // This one makes the camera move in and out
    useFrame(({ clock, camera }) => {
        //camera.position.z = 50 + Math.sin(clock.getElapsedTime()) * 30
        if (camPos.x !== camera.position.x){
            camPos = {...camera.position}
            //console.log("camPos: ", camPos);
            console.log("rmCam: ", rmCam);
        }

        //camera.aspect = size.width / size.height;

        /*camera.position.x = camPosList[0].position.x;
        camera.position.y = camPosList[0].position.y;
        camera.position.z = camPosList[0].position.z;

        camera.rotation._x = camPosList[0].rotation._x;
        camera.rotation._y = camPosList[0].rotation._y;
        camera.rotation._z = camPosList[0].rotation._z;

        camera.quaternion._x = camPosList[0].quaternion._x;
        camera.quaternion._y = camPosList[0].quaternion._y;
        camera.quaternion._z = camPosList[0].quaternion._z;*/
    })
    return null
}
export default function Home() {

    const [camPosN, setCamPosN] = useState(0);

    return (
        <>
            <div className="bg-gray-900 h-screen w-screen">
                <Canvas
                    colorManagement
                    camera={{ 
                        fov: 75,
                        position: [0.73, .88, 0.84],
                        rotation: [-0.27, 0.44, 0.12]
                    }}
                    gl={{ powerPreference: "high-performance", alpha: false, antialias: false, stencil: false}}
                > 
                    <color attach="background" args={["#050505"]} />
                    <fog color="#161616" attach="fog" near={8} far={30} />
                    { isOrbitControls && <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} /> }
                    {/*<gridHelper args={[100, 100]}/>*/}
                    <Lights />

                    <Suspense fallback={null}>
                        <SteamMachine onClick={() => setCamPosN(Number(!active))}/>
                    </Suspense>
                    <Dolly />

                    <EffectComposer>
                        <DepthOfField focusDistance={3} focalLength={0.1} bokehScale={8} />
                        {/*<Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={3} />*/}
                        <Noise opacity={0.025} />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>


                </Canvas>
            </div>
        </>
    )
}
