import React from 'react'
import QRCode from 'qrcode.react'
import consola from 'consola'

interface Props {
    isAuthenticated:Boolean;
    connectionId:string;
}

function QrCodeComponent(props: Props) {
    let {isAuthenticated, connectionId} = props

    if (!connectionId)
    {
        connectionId = "nothing"
    }
    consola.info("connectionId : " + connectionId);
    if (isAuthenticated)
    {
        return (<div></div>);
    }
    else{
        return (<div><QRCode value={connectionId} /><span>{connectionId}</span></div>)

    }
}

export default QrCodeComponent
