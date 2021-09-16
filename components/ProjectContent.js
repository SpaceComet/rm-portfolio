import React, { useEffect, useRef, useState } from 'react'
import { useSprings, animated } from 'react-spring'
import { useGesture, useDrag } from 'react-use-gesture'
import { isMobile, isMobileOnly } from 'react-device-detect';
import Image from 'next/image'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import useSWR from 'swr'
import axios from 'axios';

export default function ProjectContent({ tittleId, tittleList, selectedCoverHook, setTittleHovered, tittleSelected, setTittleSelected }) {
    
    //console.log(`/api/getPosts?postName=${tmpTittleID}`);
    //const { data, error } = useSWR(() => tittleSelected ? `/api/getPosts?postName=${tmpTittleID}` : null );

    const [dataContent, setDataContent] = useState(undefined);

    useEffect( () => {
        async function getPost(tittle){
            try {
                const postContentRes = await axios.get('/api/getPosts',{
                    params: {
                        postName: tittle,
                    },
                });
    
                if (postContentRes.status){
                    console.log(postContentRes.status);
                    if (postContentRes.status >= 200 && postContentRes.status < 300){
                        const postContent = {...postContentRes.data};
    
                        setDataContent(postContent);
                    }
                }
            } catch (error) {
                console.log(error);
                setDataContent(undefined);
            }

        }

        const tmpTittleID = tittleList[tittleSelected].tittle.replace(/ /g, '');
        getPost(tmpTittleID);

    }, [])


    return(
        <div className="flex flex-col md:flex-row w-full h-full overflow-y-auto md:overflow-hidden">
            <div className="flex flex-row md:flex-col w-full md:w-16 h-16 md:h-full justify-center items-center">
                <IoArrowBackCircleOutline
                    className=" w-10 h-10 text-yellow-300 hover:text-yellow-500 cursor-pointer"
                    onClick={ () => setTittleSelected(undefined)}
                />
            </div>

            <div className="flex flex-col md:flex-row w-full h-full bg-gray-900 bg-opacity-50">
                <div className="flex flex-col w-full md:w-1/4 h-full bg-yellow-900 bg-opacity-5 md:bg-opacity-10 p-4 items-center justify-center">
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
                            Year: { dataContent !== undefined ? dataContent.metadata.year : "Loading..." }
                        </p>
                        <p className=" w-full text-2xl text-left">
                            Role: { dataContent !== undefined ? dataContent.metadata.role : "Loading..." }
                        </p>
                        <p className=" w-full text-2xl text-left">
                            Software { dataContent !== undefined ? dataContent.metadata.software : "Loading..." }
                        </p>
                        <p className=" w-full text-2xl text-left">
                            Studio/Company: { dataContent !== undefined ? dataContent.metadata.studio : "Loading..." }
                        </p>
                    </div>
                </div>
                <div className="flex flex-none flex-col w-full md:w-3/4 h-full md:overflow-y-auto">
                    <div className=" flex-none h-96 w-full bg-green-900 bg-opacity-10"> Content #01</div>
                    <div className=" flex-none h-96 w-full bg-yellow-900 bg-opacity-10"> Content #02</div>
                    <div className=" flex-none h-96 w-full bg-green-900 bg-opacity-10"> Content #03</div>
                    <div className=" flex-none h-96 w-full bg-yellow-900 bg-opacity-10"> Content #02</div>
                    <div className=" flex-none h-96 w-full bg-green-900 bg-opacity-10"> Content #03</div>
                </div>
            </div>
        </div>
    )
}