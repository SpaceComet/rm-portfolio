import { ImFilm } from "react-icons/im";

export default function VideoNotice({ children }){

    return(
        <div className="flex flex-row md:w-3/5 mb-10 py-4 px-2 rounded-lg bg-gray-800 bg-opacity-70">
            <div className="flex flex-col w-1/4 items-center ">
                <ImFilm className=" text-purple-400 w-20 h-20"/>
            </div>
            <div className="flex flex-col w-3/4 items-start justify-center ">
                <p className=" lg:text-xl border-l-2 border-purple-400 pl-6 text-purple-300">
                    { children }
                </p>
            </div>
        </div>
    )
}