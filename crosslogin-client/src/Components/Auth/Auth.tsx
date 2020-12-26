import consola from 'consola';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import eventBus from '../../Services/EventBus';
import MsalClient from '../../Services/MsalClient';

interface Props { }
interface ParamTypes {
    connectionId: string
  }

function Auth(props: Props) {
    // const {} = props
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const { connectionId } = useParams<ParamTypes>();
    const onBtnClicked = (isAuth: boolean) => {
        async function tmp() {
            const client = new MsalClient();
            if (isAuthenticated) {
                eventBus.dispatch("LogoutEvent", connectionId);
                await client.logout();
            }
            else {
                const data = await client.login();
                consola.success(data);
                eventBus.dispatch("AuthenticatedEvent", {data : data,connectionId : connectionId});
            }
            setIsAuthenticated(!isAuthenticated);
        }
        tmp();
    }

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            <button  className="text-lg font-semibold bg-gray-800 text-white rounded-lg px-6 py-3 block shadow-xl hover:text-white hover:bg-black" onClick={() => onBtnClicked(!isAuthenticated)}>
                {isAuthenticated && <span>LogOut</span>}
                {!isAuthenticated && <span>Login</span>} 
            </button>

        </div>

    );
}

export default Auth
