import consola from 'consola';
import React, { useState } from 'react'
import { getUserDetails } from '../../../Services/GraphService';
import MsalClient from '../../../Services/MsalClient';
// import { Providers,ProviderState } from '@microsoft/mgt-element';
// import { Login } from '@microsoft/mgt-react';

interface Props {
    isAuthenticated: Boolean
}

function GraphTasks(props: Props) {
    const { isAuthenticated } = props
    // const [loginComplet, setLoginComplet] = useState<boolean>(false)
const [user, setUser] = useState<any>(null)
    // Providers.globalProvider.setState(ProviderState.SignedOut);

    React.useEffect(() => {
        consola.info("graphTasks => isAuth useEffect")
        async function tmp() {
            if (isAuthenticated)
            {
                const client = new MsalClient();
                const token = await client.getAccessToken(["User.Read"]);
                const user = await getUserDetails(token)
                setUser(user);
                // Providers.globalProvider.setState(ProviderState.SignedIn)
                //  setLoginComplet(true);
                consola.success(user);
            }
            else
            {
                // Providers.globalProvider.setState(ProviderState.SignedOut)
                // setLoginComplet(false);
            }
           
        }    // Execute the created function directly
        tmp();


    }, [isAuthenticated]);

    return (
        <div>
            {isAuthenticated && <span>{user?.displayName}</span> }
            {/* {loginComplet && <Login/>} */}
        </div>

    )
}

export default GraphTasks
