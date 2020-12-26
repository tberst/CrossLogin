import consola from 'consola';
import React, { useState } from 'react'
import { getUserDetails } from '../../../Services/GraphService';
import MsalClient from '../../../Services/MsalClient';
// import { Providers,ProviderState } from '@microsoft/mgt-element';
// import { Login } from '@microsoft/mgt-react';

interface Props {
    isAuthenticated: Boolean
}

function UserCard(props: Props) {
    const { isAuthenticated } = props

    const [user, setUser] = useState<any>(null)
    React.useEffect(() => {
        consola.info("graphTasks => isAuth useEffect")
        async function tmp() {
            if (isAuthenticated) {
                const client = new MsalClient();
                const token = await client.getAccessToken(["User.Read"]);
                const user = await getUserDetails(token)
                const url = window.URL || window.webkitURL;
                const blobUrl = url.createObjectURL(user.photo);
                user.pictureSrc = blobUrl;
                setUser(user);
                consola.success(user);
            }
            else {
            }
        }    // Execute the created function directly
        tmp();


    }, [isAuthenticated]);

    return (
        <React.Fragment>
            {isAuthenticated &&
                <div id="container" className="w-4/5 mx-auto">
                    <div className="flex flex-col sm:flex-row">
                        <div className="p-2">
                            <div className="bg-white px-6 py-8 rounded-lg shadow-lg text-center">
                                <div className="mb-3">
                                    <img
                                        className="w-auto mx-auto rounded-full"
                                        src={user?.pictureSrc}
                                        alt=""
                                    />
                                </div>
                                <h2 className="text-xl font-medium text-gray-700"><span>{user?.displayName}</span></h2>
                                {/* {loginComplet && <Login/>} */}
                                <h2 >{user?.jobTitle}</h2>
                                <span className="text-blue-500 block mb-5">{user?.userPrincipalName}</span>

                                {/* <a href="http://www.google.com" className="px-4 py-2 bg-blue-500 text-white rounded-full">zzs</a  > */}
                            </div>
                        </div>
                    </div>
                </div>}
        </React.Fragment>

    )
}

export default UserCard
