import { isMobileOnly, isTablet, isDesktop } from 'react-device-detect';
import ReactPlayer from 'react-player';

export default function ReelModal({ tittle, link, isModalOn, setModal }){

    return(
        <div>
            {
                isModalOn &&
                <div
                    className="absolute inset-0 z-50 bg-gray-900 bg-opacity-90 w-full h-full"
                    onClick={ () => setModal(false)}>
                    <div className="flex h-full items-center justify-center">
                        <div className={` 
                            ${ (isDesktop || isTablet) && "bg-gray-800"}
                            ${ isMobileOnly && "bg-gray-800"}
                            flex flex-col w-5/6 md:w-9/12 h-2/6 md:h-5/6 p-2 items-center justify-center rounded-lg`
                        }>
                            <div className=" w-full items-start">
                                <div 
                                    className="flex w-6 h-6 bg-gray-500 hover:bg-gray-900 rounded-lg cursor-pointer items-center justify-center"
                                    onClick={ () => setModal(false)}>
                                    X
                                </div>
                            </div>
                            <p className="font-simplifica text-white text-xl md:text-4xl md:mb-2">{tittle}</p>
                            <ReactPlayer 
                                url={link}
                                width='100%'
                                height='100%'
                                config={{
                                    vimeo: {
                                        playerOptions: { 
                                            controls: false,
                                            portrait: false,
                                            title: false,
                                            byline: false,
                                        }
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}