import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function LoadingPage({ children }) {
    const { query, isReady } = useRouter();
    const [rmLoading, setRmLoading] = useState(true);

    useEffect(() => {

        if (isReady && rmLoading){
            console.log("ONE")
            window.onload = function(){
                console.log("---------------------------- TWO");
            };
            setTimeout(function(){setRmLoading(false)},100);
        }

    }, [isReady, rmLoading]);

    return(
        <>
            {
                // disabled for now
                rmLoading &&
                <div className="fixed z-50 w-screen h-screen bg-green-600">Loading...</div>
            }
            {children}
        </>
    )

}
