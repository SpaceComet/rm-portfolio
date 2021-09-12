import React, { useRef, useState, useEffect } from 'react'
import { useSprings, animated } from 'react-spring'

export default function ProjectList({ tittleList, tittleHovered, setTittleHovered }) {

    //const [tittleHovered, setTittleHovered] = useState(0);

    const [props, api] = useSprings(tittleList.length, nTittle => ({
        scale: 1,
        blur: 4,
        config: { mass: 3, tension: 600, friction: 30, precision: 0.0001 },
    }));
    
    useEffect(() => {
        console.log("S-01");
        api.start(i => ({
            scale : tittleHovered == i ? 1.1 : 1,
            blur : tittleHovered == i ? 0 : 4,
        }));
    }, [tittleHovered]);

    return(
        <div className="flex flex-col h-full w-full z-30 items-start justify-center">{
            tittleList.map((nMovie) => {
                const tmpKey = nMovie.tittle.replace(/ /g, '');
                return(
                    <animated.div 
                        className="font-simplifica text-white text-6xl ml-10 mb-5 cursor-pointer"
                        style={{
                            scale: props[nMovie.index].scale,
                            filter: props[nMovie.index].blur.to(s => `blur(${s}px)`)
                        }}
                        key={tmpKey}
                        onMouseEnter={ () => setTittleHovered(nMovie.index)}
                        //onMouseLeave={ () => setTittleHovered(undefined)}
                    >
                        {nMovie.tittle}
                    </animated.div>
                )
            })
        }</div>
    )
}