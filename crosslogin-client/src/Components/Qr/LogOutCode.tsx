import React from 'react'
import QRCode from 'qrcode.react'
import consola from 'consola'

interface Props {
    isAuthenticated: Boolean;
    connectionId: string;
}

function LogOutCode(props: Props) {
    const { isAuthenticated, connectionId } = props
    let url = window.location.href;
    if (!connectionId) {
        url = ""
    }
    else
    {
        url = window.location.href +"LogOut/"+connectionId;
    }

    if (!isAuthenticated) {
        return (< React.Fragment ></ React.Fragment>);
    }
    else {
        return (< React.Fragment >
        <div className="self-start">

            <div className="flex flex-col items-center justify-center ">
                <div className="" >
                    <QRCode value={url} size={100}/>
                </div>
                <div>
                    <span>{url}</span>
                </div>
            </div>
            </div>
        </React.Fragment>
        )
    }
}

export default LogOutCode
