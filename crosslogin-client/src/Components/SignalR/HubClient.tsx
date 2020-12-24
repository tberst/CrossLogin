import React, { useState, useEffect } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import eventBus from '../../Services/EventBus';
import consola from 'consola';

const HubClient = (props: any) => {

    const [connection, setConnection] = useState<HubConnection>();
    const [isAuthenticated, setisAuthenticated] = useState<Boolean>(false);
    const [connectionId, setConnectionId] = useState<String>("");

    /**
     * Send cross login event to SignalR
     * @param event 
     * @param payload 
     */
    const sendCrossLogin = async (event: string,connectionId : string,  payload: string) => {
        consola.info('sendCrossLogin');
        const crossLoginMessage = {
            event: event,
            targetId : connectionId,
            payload: payload
        };

        if (connection) {
            try {
                await connection.send('sendCrossLogin', crossLoginMessage);
            }
            catch (e) {
                consola.error(e);
            }
        }
        else {
            consola.error('No connection to server yet.');
        }
    }

    // setup signalR connection
    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:5001/hubs/chat')
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    //when the signalR connection is up, setup the wiring
    useEffect(() => {
        if (connection != null) {
            connection.start()
                .then(result => {
                    consola.success('Connected!');
                    setConnectionId(connection.connectionId == null ? "" : connection.connectionId);
                    // 1 - plug the ReceiveCrosslogin logic when a message is received from the signalR hub
                    connection.on('ReceiveCrossLogin', (message: any) => {
                        consola.info('ReceiveCrossLogin');
                        consola.info(message);
                        if (message.event === "login")
                        {
                            const sessionData = JSON.parse(message.payload);
                            sessionData.forEach((element :any)=> {
                                sessionStorage.setItem(element.key, element.value);
                            });
                            setisAuthenticated(true);
                        }
                        else
                        {
                            setisAuthenticated(false);
                            sessionStorage.clear();
                        }
                    });

                     // 2 - plug the eventbus receiver to receive authentication event from the Auth component.
                    eventBus.on("AuthenticatedEvent",
                        (data:any) => {
                            const message = Object.keys(sessionStorage).map((key) => { return { key: key, value: sessionStorage.getItem(key) } });
                            const payload = JSON.stringify(message);
                            sendCrossLogin("login", data.connectionId, payload);
                        }
                    );
                      // 2 - plug the eventbus receiver to receive authentication event from the Auth component.
                      eventBus.on("LogoutEvent",
                      (data : any) => {
                          sendCrossLogin("logout",data, "");
                      }
                  );
                })
                .catch((e: any) => consola.error('Connection failed: ', e));
        }
    }, [connection,connectionId]);


    consola.info("hubconnectionId : " + connection?.connectionId);
    //pass the isAuthenticated props to all the children
    const childrenWithProps = React.Children.map(props.children, child => {
        // checking isValidElement is the safe way and avoids a typescript error too
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { isAuthenticated: isAuthenticated, connectionId : connectionId } as any);
        }
        return child;
    });

    return (
        <div>{childrenWithProps}

        </div>
    );
};

export default HubClient;