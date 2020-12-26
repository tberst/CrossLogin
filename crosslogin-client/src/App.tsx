import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import './App.css';

import HubClient from './Components/SignalR/HubClient';
import QrCodeComponent from './Components/Qr/QrCode';
import UserContent from './Components/UserContent/UserContent';
import Auth from './Components/Auth/Auth';
import LogOutCode from './Components/Qr/LogOutCode';
import LogOut from './Components/Auth/LogOut';


function App() {
  return (
    <div className="App h-screen w-screen flex flex-col bg-gray-100">

      <Router>
        <Route exact path="/auth/:connectionId"
          render={(props) =>
            <HubClient>
              <Auth {...props} />
            </HubClient>
          } />
          <Route exact path="/logout/:connectionId"
          render={(props) =>
            <HubClient>
              <LogOut {...props} />
            </HubClient>
          } />
        <Route exact path="/">
          <HubClient>
            <QrCodeComponent isAuthenticated={false} connectionId="" ></QrCodeComponent>
            <UserContent isAuthenticated={false}></UserContent>
            <LogOutCode isAuthenticated={false} connectionId="" ></LogOutCode>
          </HubClient>
        </Route>
      </Router>



    </div>
  );
}

export default App;
