
export default function NotificationButton({ isAlertOn, onClick, children }){

    return(
        <button
            className="flex flex-col transition duration-200 mt-14 md:mt-20 ml-6 px-3 bg-gray-800 hover:bg-gray-900 bg-opacity-90 rounded-xl cursor-pointer"
            onClick={onClick}>

            {
                isAlertOn &&
                <div className="flex w-full h-5 items-end justify-end -mt-4">
                    <div className="flex w-2 md:w-3 h-2 md:h-3 bg-yellow-400 rounded-2xl -mr-2 md:-mr-3"/>
                    <div className="animate-ping w-2 md:w-3 h-2 md:h-3 bg-yellow-400 rounded-2xl -mr-3"/>
                </div>
            }
            <p className="font-simplifica text-yellow-300 text-2xl md:text-4xl tracking-widest ">
                { children }
            </p>
        </button>
    )
}