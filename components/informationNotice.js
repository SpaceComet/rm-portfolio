import { VscInfo } from "react-icons/vsc";

export default function InformationNotice({ children }){

    return(
        <div className="flex flex-row md:w-3/5 my-10 py-4 px-2 rounded-lg bg-gray-800 bg-opacity-70">
            <div className="flex flex-col w-1/4 items-center ">
                <VscInfo className=" text-blue-400 w-20 h-20"/>
            </div>
            <div className="flex flex-col w-3/4 items-start justify-center ">
                <p className=" border-l-2 border-blue-400 pl-6 text-blue-300">
                    { children }
                </p>
            </div>
        </div>
    )
}