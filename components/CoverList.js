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

    const [tittleHovered, setTittleHovered] = useState(0);

    const [props, api] = useSprings(tittleList.length, nTittle => ({
        x: (coverImg.w*nTittle) + coverImg.offset.x,
        y: (coverImg.h*nTittle),
        scale: 1,
        blur: 6,
        opacity: 1,
        config: { mass: 3, tension: 600, friction: 30, precision: 0.0001 },
    }));
    
    useEffect(() => {
        api.start(i => {
            let pIndex = i - selectedCoverHook;
            if (selectedCoverHook == 0 && i == tittleList.length-1)
                pIndex = -1;

            return ({
                x: pIndex * (coverImg.w+coverImg.margin.x) + coverImg.offset.x,
                y: pIndex * (coverImg.h+coverImg.margin.x) * -.5,
                scale : selectedCoverHook == i ? 1.1 : 1,
                blur : selectedCoverHook == i ? 0 : 6,
                opacity : selectedCoverHook == i ? 1 : 0.7,
            })
        });
    }, [selectedCoverHook]);

    return(
        <div className="flex flex-row h-full w-full z-30 items-center ">{
            tittleList.map((nMovie) => {
                const tmpKey = "cover_"+nMovie.tittle.replace(/ /g, '');
                return(
                    <animated.div 
                        className="absolute  "
                        style={{
                            x: props[nMovie.index].x,
                            y: props[nMovie.index].y,
                            scale: props[nMovie.index].scale,
                            filter: props[nMovie.index].blur.to(s => `blur(${s}px)`),
                            opacity: props[nMovie.index].opacity,
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