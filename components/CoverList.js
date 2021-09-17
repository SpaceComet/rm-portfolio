import React, { useEffect, useRef, useState } from 'react'
import { useSprings, animated } from 'react-spring'
import { useGesture, useDrag } from 'react-use-gesture'
import { isMobile, isMobileOnly } from 'react-device-detect';
import Image from 'next/image'
import { IoArrowBackCircleOutline } from "react-icons/io5";

export default function CoverList({ tittleList, selectedCoverHook, setTittleHovered, tittleSelected, setTittleSelected }) {

    // Copy from tailwindcss
    const sm = 640;
    const md = 768;
    const lg = 1024;
    const xl = 1280;
    const xl_2 = 1536;

    const coverImg = {
        w: isMobile ? .70 : .28, 
        h: .50, 
        margin: {
            x: .0
        },
        offset: {
            x: 0//100
        }

    }

    // It has to be an even number
    const extraCovers = 2;
    const lastTittleI = tittleList.length - 1;

    // Swipe code (Mobile only)
    const bind = useDrag(({ canceled, first, last, active, movement: [mx], direction: [xDir], cancel }) => {
        if (active && Math.abs(mx) > 50) {
            if(xDir < 0) {
                // swipeLeft
                setTittleHovered(prevVal => {
                    let rVal = 0;

                    if (prevVal === lastTittleI) rVal = 0;
                    else rVal = prevVal + 1;

                    return( rVal )
                })
            }
            else  {
                // swipeRight
                setTittleHovered(prevVal => {
                    let rVal = 0;

                    if (prevVal === 0) rVal = lastTittleI;
                    else rVal = prevVal - 1;

                    return( rVal )
                })
            }

            cancel()
        }
    });

    const [props, api] = useSprings(tittleList.length+extraCovers, nTittle => ({
        x: (coverImg.w*(nTittle-(extraCovers/2))) + coverImg.offset.x,
        y: (coverImg.h*(nTittle-(extraCovers/2))),
        scale: 1,
        blur: 6,
        opacity: 1,
        config: { mass: 1, tension: 600, friction: 30, precision: 0.0001 },
    }));

    useEffect(() => {

        const tmpCoverImg = {
            w: window.innerWidth >= md ? .28: .70, 
        }

        api.start(i => {
            let pIndex = i - selectedCoverHook - (extraCovers/2);
            //if (selectedCoverHook == 0 && i == lastTittleI)
                //pIndex = -1;
                
            return ({
                // x: pIndex * ((tmpCoverImg.w*window.innerWidth)+(coverImg.margin.x*window.innerWidth)) + (tittleSelected !== undefined && coverImg.offset.x),
                x: pIndex * ((tmpCoverImg.w*window.innerWidth)+(coverImg.margin.x*window.innerWidth)) + coverImg.offset.x,
                y: tittleSelected !== undefined
                    ? pIndex !== 0 ? window.innerHeight : window.innerHeight // window.innerHeight/2 * -0.2
                    : pIndex * ((coverImg.h*window.innerHeight)+coverImg.margin.x) * -.5,
                scale : selectedCoverHook == i - (extraCovers/2) ? 1.1 : 1,
                blur : selectedCoverHook == i - (extraCovers/2) ? 0 : 6,
                opacity : selectedCoverHook == i - (extraCovers/2) ? 1 : 0.7,
                ...(tittleSelected !== undefined && {config: { mass: 1, tension: 100, friction: 20, precision: 0.0001 }})
            })
        });
    }, [selectedCoverHook, tittleSelected]);

    return(
        <div className="flex flex-row h-full w-full z-20 items-center justify-center md:justify-start">

            {
                [...Array(tittleList.length+extraCovers).keys()].map((nMovieI) => {
                    let tmpKey = undefined;
                    let tmpCoverTittle = "";

                    if (nMovieI == 0)
                        tmpCoverTittle = "coverCopy_"+tittleList[lastTittleI].tittle
                    else if (nMovieI == lastTittleI+extraCovers)
                        tmpCoverTittle = "coverCopy_"+tittleList[0].tittle
                    else
                        tmpCoverTittle = tittleList[nMovieI-(extraCovers/2)].tittle

                    tmpKey = "cover_"+tmpCoverTittle.replace(/ /g, '');

                    return(
                        <animated.div 
                            className="absolute w-3/5 md:w-2/12"
                            style={{
                                "touchAction": "none",
                                x: props[nMovieI].x,
                                y: props[nMovieI].y,
                                scale: props[nMovieI].scale,
                                filter: props[nMovieI].blur.to(s => `blur(${s}px)`),
                                opacity: props[nMovieI].opacity,
                            }}
                            key={tmpKey}
                            {...(isMobile && bind())}
                        >
                            <Image 
                                className={`${nMovieI-(extraCovers/2) == selectedCoverHook 
                                    ? "cursor-pointer"
                                    : ""
                                } `}
                                src={`/covers/${tmpKey.replace(/coverCopy_/, '')}.jpg`}
                                width={5}
                                height={7}
                                quality={40}
                                layout="responsive"
                                alt={`Cover of ${tmpCoverTittle.replace(/coverCopy_/, '')}`}
                                onClick={ () => {
                                    if (nMovieI-(extraCovers/2) == selectedCoverHook)
                                        console.log("IN: ",selectedCoverHook)
                                    setTittleSelected(selectedCoverHook)
                                }}
                            />

                            {
                                isMobileOnly &&
                                <div 
                                    className="flex flex-col font-simplifica tracking-wide mt-10 text-white text-4xl items-center justify-center ">
                                    <div className="flex">
                                        { tmpCoverTittle }
                                    </div>
                                </div>
                            }
                        </animated.div>
                    )
                })
            }
        </div>
    )
}