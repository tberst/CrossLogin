import React from 'react'
import QRCode from 'qrcode.react'
import consola from 'consola'

interface Props {
    isAuthenticated: Boolean;
    connectionId: string;
}

function QrCodeComponent(props: Props) {
    const { isAuthenticated, connectionId } = props
    let url = window.location.href;
    if (!connectionId) {
        url = ""
    }
    else
    {
        url = window.location.href +"Auth/"+connectionId;
    }

    consola.info("connectionId : " + connectionId);


    if (isAuthenticated) {
        return (< React.Fragment ></ React.Fragment>);
    }
    else {
        return (< React.Fragment >
            <div className="h-screen flex flex-col items-center justify-center px-5 text-gray-700 w-screen">
                <div className="" >
                    <QRCode value={url} size={400}/>
                </div>
                <div>
                    <span>{url}</span>
                </div>
            </div>
        </React.Fragment>
        )
    }
}

export default QrCodeComponent
