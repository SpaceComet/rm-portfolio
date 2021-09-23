import React, { useState } from 'react'
import { ImFilm } from "react-icons/im";
import ReelModal from "./reelModal";

export default function VideoNotice({ children, modalTittle, modalLink }){

    const [isModalOn, setModal] = useState(false);

    return(

        <div>
            <div className="flex w-full items-center justify-center">

                <div
                    className="flex flex-row md:w-3/5 my-5 py-4 px-2 rounded-lg bg-gray-800 hover:bg-gray-800 hover:shadow-2xl bg-opacity-70 cursor-pointer"
                    onClick={() => setModal(true)}>
                    <div className="flex flex-col w-1/4 items-center ">
                        <ImFilm className=" text-purple-400 w-20 h-20"/>
                    </div>
                    <div className="flex flex-col w-3/4 items-start justify-center ">
                        <p className=" lg:text-xl border-l-2 border-purple-400 pl-6 text-purple-300">
                            { children }
                        </p>
                    </div>
                </div>
            </div>

            <ReelModal 
                isModalOn={isModalOn}
                setModal={setModal}
                link={modalLink}
                tittle={modalTittle}
            />
        </div>
    )
}