import React, { useEffect, useRef, useState } from 'react'
import { useSprings, animated } from 'react-spring'
import { useGesture, useDrag } from 'react-use-gesture'
import { isMobile } from 'react-device-detect';
import Image from 'next/image'

export default function CoverList({ tittleList, selectedCoverHook, setTittleHovered }) {

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
    const bind = isMobile && useDrag(({ canceled, first, last, active, movement: [mx], direction: [xDir], cancel }) => {
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

        api.start(i => {
            let pIndex = i - selectedCoverHook - (extraCovers/2);
            //if (selectedCoverHook == 0 && i == lastTittleI)
                //pIndex = -1;
                
            return ({
                x: pIndex * ((coverImg.w*window.innerWidth)+(coverImg.margin.x*window.innerWidth)) + coverImg.offset.x,
                y: pIndex * ((coverImg.h*window.innerHeight)+coverImg.margin.x) * -.5,
                scale : selectedCoverHook == i - (extraCovers/2) ? 1.1 : 1,
                blur : selectedCoverHook == i - (extraCovers/2) ? 0 : 6,
                opacity : selectedCoverHook == i - (extraCovers/2) ? 1 : 0.7,
            })
        });
    }, [selectedCoverHook]);

    return(
        <div className="flex flex-row h-full w-full z-20 items-center justify-center md:justify-start">{
            [...Array(tittleList.length+extraCovers).keys()].map((nMovieI) => {
                let tmpKey = undefined;
                if (nMovieI == 0)
                    tmpKey = "coverCopy_"+tittleList[lastTittleI].tittle.replace(/ /g, '');
                else if (nMovieI == lastTittleI+extraCovers)
                    tmpKey = "coverCopy_"+tittleList[0].tittle.replace(/ /g, '');
                else
                    tmpKey = "cover_"+tittleList[nMovieI-(extraCovers/2)].tittle.replace(/ /g, '');

                return(
                    <animated.div 
                        className="absolute w-3/5 md:w-2/12"
                        style={{
                            "touch-action": "none",
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
                            src={`/covers/${tmpKey.replace(/coverCopy_/, 'cover_')}.jpg`}
                            width={5}
                            height={7}
                            quality={50}
                            layout="responsive"
                        />

                        {
                            isMobile &&
                            <div 
                                className="flex flex-col font-simplifica tracking-wide mt-10 text-white text-4xl items-center justify-center ">
                                <div className="flex">
                                    {
                                        nMovieI === 0 
                                        ? tittleList[lastTittleI].tittle
                                        : nMovieI === lastTittleI+extraCovers
                                        ? tittleList[0].tittle
                                        : tittleList[nMovieI-(extraCovers/2)].tittle
                                    }
                                </div>
                            </div>
                        }
                    </animated.div>
                )
            })
        }</div>
    )
}