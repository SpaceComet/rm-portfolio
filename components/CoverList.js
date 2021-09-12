import React, { useState, useEffect } from 'react'
import { useSprings, animated } from 'react-spring'
import Image from 'next/image'

export default function CoverList({ tittleList, selectedCoverHook }) {

    if (typeof window !== 'undefined') {
        // detect window screen width function
    }

    //const width = window.innerWidth
    const coverImg = {
        w: 310,
        h: 434,
        margin: {
            x: 200
        },
        offset: {
            x: 100
        }

    }

    // It has to be an even number
    const extraCovers = 2;
    const lastTittleI = tittleList.length - 1;

    const [props, api] = useSprings(tittleList.length+extraCovers, nTittle => ({
        x: (coverImg.w*(nTittle-(extraCovers/2))) + coverImg.offset.x,
        y: (coverImg.h*(nTittle-(extraCovers/2))),
        scale: 1,
        blur: 6,
        opacity: 1,
        config: { mass: 3, tension: 600, friction: 30, precision: 0.0001 },
    }));
    
    useEffect(() => {
        api.start(i => {
            let pIndex = i - selectedCoverHook - (extraCovers/2);
            //if (selectedCoverHook == 0 && i == lastTittleI)
                //pIndex = -1;

            return ({
                x: pIndex * (coverImg.w+coverImg.margin.x) + coverImg.offset.x,
                y: pIndex * (coverImg.h+coverImg.margin.x) * -.5,
                scale : selectedCoverHook == i - (extraCovers/2) ? 1.1 : 1,
                blur : selectedCoverHook == i - (extraCovers/2) ? 0 : 6,
                opacity : selectedCoverHook == i - (extraCovers/2) ? 1 : 0.7,
            })
        });
    }, [selectedCoverHook]);

    return(
        <div className="flex flex-row h-full w-full z-30 items-center ">{
            [...Array(tittleList.length+extraCovers).keys()].map((nMovieI) => {
                let tmpKey = undefined;
                if (nMovieI == 0)
                    tmpKey = "cover_"+tittleList[lastTittleI].tittle.replace(/ /g, '');
                else if (nMovieI == lastTittleI+extraCovers)
                    tmpKey = "cover_"+tittleList[0].tittle.replace(/ /g, '');
                else
                    tmpKey = "cover_"+tittleList[nMovieI-(extraCovers/2)].tittle.replace(/ /g, '');

                return(
                    <animated.div 
                        className="absolute  "
                        style={{
                            x: props[nMovieI].x,
                            y: props[nMovieI].y,
                            scale: props[nMovieI].scale,
                            filter: props[nMovieI].blur.to(s => `blur(${s}px)`),
                            opacity: props[nMovieI].opacity,
                        }}
                        key={tmpKey}
                    >
                        <Image 
                            src={`/covers/${tmpKey}.jpg`}
                            width={coverImg.w}
                            height={coverImg.h}
                            quality={50}
                        />
                    </animated.div>
                )
            })
        }</div>
    )
}