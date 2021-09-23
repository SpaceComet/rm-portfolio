import React, { useEffect, useRef, useState } from 'react'
import { useSprings, animated } from 'react-spring'
import { useGesture, useDrag } from 'react-use-gesture'
import { isMobile, isMobileOnly } from 'react-device-detect';
import Image from 'next/image'
import Link from 'next/link'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MDXRemote } from 'next-mdx-remote'
import InformationNotice from './informationNotice';
import VideoNotice from './videoNotice';

const components = {
    h1: (props) => <h1 {...props} className="text-8xl md:text-9xl my-5 font-simplifica tracking-wider" />,
    h2: (props) => <h1 {...props} className="text-7xl my-5 font-simplifica tracking-wider" />,
    h3: (props) => <h1 {...props} className="text-6xl my-5 font-simplifica tracking-wider" />,
    h4: (props) => <h1 {...props} className="text-5xl my-5 font-simplifica tracking-wider" />,
    h5: (props) => <h1 {...props} className="text-4xl my-5 font-simplifica tracking-wider" />,
    h6: (props) => <h1 {...props} className="text-3xl my-5 font-simplifica tracking-wider" />,
    p: (props) => <p {...props} className="text-2xl lg:text-3xl font-simplifica tracking-wide " />,
    a: Link,
    img: (props) => 
        <div className="flex items-center justify-center my-5">
            <div className="w-11/12 md:w-3/4">
                <Image {...props} width={16} height={9} layout="responsive"/>
            </div>
        </div>,
    hr: (props) =>
        <div className="flex w-full items-center justify-center my-10">
            <hr className="flex border-yellow-800 text-2xl w-2/4 " />
        </div>,
    inlineCode: (props) => <code {...props} className=" text-base lg:text-xl tracking-normal bg-gray-500 rounded-md px-1 bg-opacity-50"></code>,
    blockquote: (props) => 
        <div className="flex">
            <blockquote {...props} className="flex-initial bg-gray-700 px-6 py-1 mt-2 rounded-r-md border-l-2 border-yellow-400 bg-opacity-80">

            </blockquote>
        </div>,
    InformationNotice,
    VideoNotice,
}

export default function ProjectContent({ tittleId, tittleList, selectedCoverHook, setTittleHovered, tittleSelected, setTittleSelected, tittleContent }) {

    const tmpTittleID = tittleList[tittleSelected].tittle.replace(/ /g, '');
    console.log(tittleContent[tmpTittleID].metadata.software);

    return(
        <div className="flex flex-col md:flex-row w-full h-full overflow-y-auto md:overflow-hidden">
            <div className="flex flex-row md:flex-col w-full md:w-16 h-16 md:h-full py-10 md:py-0 justify-center items-center">
                <IoArrowBackCircleOutline
                    className=" w-10 h-10 text-yellow-300 hover:text-yellow-500 cursor-pointer"
                    onClick={ () => setTittleSelected(undefined)}
                />
            </div>

            <div className="flex flex-col md:flex-row w-full h-full bg-gray-900 bg-opacity-50">
                <div className="flex flex-col w-full md:w-1/4 md:h-full bg-yellow-900 bg-opacity-5 md:bg-opacity-10 p-4 items-center justify-center">
                    <div className=" w-9/12">
                        <Image 
                            src={`/covers/cover_${tittleList[tittleSelected].tittle.replace(/ /g, '')}.jpg`}
                            width={5}
                            height={7}
                            quality={40}
                            layout="responsive"
                            alt={`Cover of ${tittleList[tittleSelected].tittle.replace(/ /g, '')}`}
                        />
                    </div>

                    <div 
                        className="flex flex-col w-full px-6 font-simplifica tracking-wide mt-5 text-white items-center justify-center">
                        <p className=" w-full text-4xl text-center">
                            { tittleList[tittleSelected].tittle }
                        </p>
                        <p className=" w-full text-2xl mt-4 text-left">
                            Year: { tittleContent[tmpTittleID] ? tittleContent[tmpTittleID].metadata.year : "Error" }
                        </p>
                        <p className=" w-full text-2xl text-left">
                            Role: { tittleContent[tmpTittleID] ? tittleContent[tmpTittleID].metadata.role : "Error" }
                        </p>
                        <div className="flex flex-row w-full text-2xl text-left items-center">
                            Software { tittleContent[tmpTittleID] 
                                ? tittleContent[tmpTittleID].metadata.software.map( software => {
                                    const softwareID = software.replace(/ /g, '');
                                    return(
                                        <div
                                            className="w-10 h-10 ml-4 opacity-50"
                                            key={softwareID}>

                                            <Image 
                                                src={`/icons/icon_${softwareID}.png`}
                                                width={4}
                                                height={4}
                                                quality={40}
                                                layout="responsive"
                                                alt={`Icon of ${software}`}
                                            />

                                        </div>
                                    )
                                })
                                : "Error" 
                            }
                        </div>
                        <p className=" w-full text-2xl text-left">
                            Studio/Company: { tittleContent[tmpTittleID] ? tittleContent[tmpTittleID].metadata.studio : "Error" }
                        </p>
                    </div>
                </div>
                <div className="flex flex-none flex-col w-full md:w-3/4 md:h-full p-4 md:p-10 backdrop-filter backdrop-blur-sm bg-gray-900 bg-opacity-50 md:bg-opacity-70 text-white md:overflow-y-auto overscroll-contain">
                    <MDXRemote {...tittleContent[tmpTittleID].source} components={components} />
                </div>

                <div className=" md:hidden flex flex-row md:flex-col w-full md:w-16 h-16 md:h-full py-10 md:py-0 justify-center items-center">
                    <IoArrowBackCircleOutline
                        className=" w-10 h-10 text-yellow-300 hover:text-yellow-500 cursor-pointer"
                        onClick={ () => setTittleSelected(undefined)}
                    />
                </div>
            </div>

        </div>
    )
}