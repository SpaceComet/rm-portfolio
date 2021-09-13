import React, { useRef, useState, Suspense, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree } from "@react-three/fiber"
//import { Environment, OrbitControls } from "@react-three/drei";
import { useSpring, useSprings, animated } from 'react-spring'
import { useDrag, useHover } from 'react-use-gesture';
import Camera from '../components/camera';
import Lights from "../components/lights"
import { GridHelper } from 'three';
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { OrbitControls, useProgress, Html } from '@react-three/drei';
import SteamMachine from "../components/SteamMachine"
import { isMobileOnly, isTablet, isDesktop, browserName, BrowserView, MobileView, } from 'react-device-detect';
import ReactPlayer from 'react-player';
import ProjectList from '../components/ProjectList';
import CoverList from '../components/CoverList';

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

function Loader() {
    const { active, progress, errors, item, loaded, total } = useProgress()
    console.log(progress);
    return(
        <Html center>{progress} % loaded</Html>
    )
}

function Dolly() {

    const { viewport, mouse, size } = useThree();
    const rmCam = useThree((state) => state.camera)

    /*const { spring } = useSpring({
        spring: active,
        config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
    });*/

    //console.log(active);

    // This one makes the camera move in and out
    useFrame(({ clock, camera }) => {
        //camera.position.z = 50 + Math.sin(clock.getElapsedTime()) * 30
        if (camPos.x !== camera.position.x){
            camPos = {...camera.position}
            //console.log("camPos: ", camPos);
            console.log("rmCam: ", rmCam);
        }

        camera.aspect = size.width / size.height;

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

const tittleList = [
    {
        index: 0,
        tittle: 'League of Gods',
    },
    {
        index: 1,
        tittle: 'Seeds',
    },
    {
        index: 2,
        tittle: 'Higher Power',
    },
]

const covers = [
    '/covers/cover_seeds.jpg',
    '/covers/cover_LeagueOfGods.jpg',
    'cover_HigherPower.jpg',
]

export default function Home() {

    // List of projects Hooks
    const [tittleHovered, setTittleHovered] = useState(0);

    // Reel modal hook
    const [isReelModalOn, setReelModal] = useState(false);

    const [camPosN, setCamPosN] = useState(0);

    const { spring } = useSpring({
        spring: camPosN,
        config: { mass: 1, tension: 600, friction: 30, precision: 0.0001 }
    })

    const { tmpPos } = useSpring({
        tmpPos: camPosN ? [0.73, .88, 0.84] : [ 1.64, 0.48, 0.30] ,
        config: { mass: 10, tension: 1000, friction: 300, precision: 0.00001 }
    })

    //const pZ = spring.to([0.84, 1], [1, .94])
    //const rotation = spring.to((x) => console.log(x))
    const scale = spring.to([0, 1], [1, 2])
    

    //console.log(pZ);


    return (
        <>
            <div className="relative bg-gray-900 h-screen w-screen">
                <Canvas
                    className="absolute z-0"
                    colorManagement
                    gl={{ powerPreference: "high-performance", alpha: false, antialias: false, stencil: false}}
                    //linear={true} // You might use this to avoid banding...
                    
                > 

                    {true && <Camera 
                        fov={75}
                        position={[0.73, .88, 0.84]} 
                        rotation={[-0.27, 0.44, 0.12]} 
                        far={1000}
                        aspect={1}

                        position-x = {scale}
                       
                    />}

                    <color attach="background" args={["#050505"]} />
                    <fog color="#161616" attach="fog" near={8} far={30} />

                    { isOrbitControls && <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} /> }
                    {/*<gridHelper args={[100, 100]}/>*/}
                    <Lights />

                    <Suspense fallback={<Loader />}>
                        <SteamMachine onClick={ () => setCamPosN(Number(!camPosN)) }/>
                    </Suspense>
                    
                    {false && <Dolly />}

                    <EffectComposer>
                        <DepthOfField focusDistance={3} focalLength={0.1} bokehScale={3} />
                        {/*<Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} opacity={3} />*/}
                        <Noise
                            //opacity={ isDesktop ? 0.050 : 0.025}
                            premultiply
                            blendFunction={BlendFunction.ADD}
                        />
                        <Vignette eskil={false} offset={0.1} darkness={1.1} />
                    </EffectComposer>


                </Canvas>

                <div className="absolute inset-0 z-10 overflow-hidden">
                    <div className="flex w-full h-full items-center justify-center">
                        <div className="flex flex-row w-full h-full">
                            <div className="flex flex-row bg-gray-800 w-5/12 bg-opacity-30">
                                <div className="flex w-2/12 h-full justify-center items-center">
                                    <div className="font-simplifica text-yellow-300 text-4xl tracking-widest">
                                        <p className="transform -rotate-90">
                                            Projects
                                        </p>
                                    </div>
                                    
                                </div>
                                <div className="flex flex-col w-10/12 h-full">
                                    <div className="absolute z-50">
                                        <button 
                                            className=" transition duration-200 mt-20 p-1 bg-gray-800 hover:bg-gray-900 bg-opacity-90 rounded-xl cursor-pointer"
                                            onClick={() => setReelModal(true)}>
                                            <p className="font-simplifica  text-yellow-300 text-4xl tracking-widest "> Check latest Reel </p>
                                        </button>
                                    </div>
                                    <div className="flex items-center h-full z-10">
                                        <ProjectList
                                            tittleList={tittleList}
                                            tittleHovered={tittleHovered}
                                            setTittleHovered={setTittleHovered}
                                        />
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="flex bg-gray-900 w-7/12 bg-opacity-0">
                                <CoverList
                                    tittleList={tittleList}
                                    selectedCoverHook={tittleHovered}
                                    setTittleHovered={setTittleHovered}
                                />
                            </div>
                        </div>

                        {
                            isReelModalOn &&
                            <div className="absolute z-50 bg-gray-900 bg-opacity-90 w-screen h-screen">
                                <div className="flex h-full items-center justify-center">
                                    <div className={` 
                                        ${ (isDesktop || isTablet) && "bg-gray-800"}
                                        ${ isMobileOnly && "bg-gray-800"}
                                        flex flex-col w-5/6 md:w-2/4 h-2/6 md:h-1/2 p-2 items-center justify-center rounded-lg`
                                    }>
                                        <div className=" w-full items-start">
                                            <div 
                                                className="flex w-6 h-6 bg-gray-500 hover:bg-gray-900 rounded-lg cursor-pointer items-center justify-center"
                                                onClick={ () => setReelModal(false)}>
                                                X
                                            </div>
                                        </div>
                                        <p className="font-simplifica text-white text-xl md:text-4xl md:mb-2">2021 Demo Reel</p>
                                        <ReactPlayer 
                                            url="https://vimeo.com/599954436"
                                            width='100%'
                                            height='100%'
                                            config={{
                                                vimeo: {
                                                    playerOptions: { 
                                                        controls: false,
                                                        portrait: false,
                                                        title: false,
                                                        byline: false,
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}
