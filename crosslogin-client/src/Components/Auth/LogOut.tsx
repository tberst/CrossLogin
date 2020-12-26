import consola from 'consola';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import eventBus from '../../Services/EventBus';
import MsalClient from '../../Services/MsalClient';

interface Props { }
interface ParamTypes {
    connectionId: string
  }

function LogOut(props: Props) {
    // const {} = props
    const { connectionId } = useParams<ParamTypes>();
    const onBtnClicked = () => {
        async function tmp() {
            const client = new MsalClient();
                eventBus.dispatch("LogoutEvent", connectionId);
                await client.logout();
        }
        tmp();
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <button  className="text-lg font-semibold bg-gray-800 text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black" onClick={() => onBtnClicked()}>
                <span>LogOut</span>
            </button>

        </div>

    );
}

export default LogOut
