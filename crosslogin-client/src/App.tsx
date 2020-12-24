import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import HubClient from './Components/SignalR/HubClient';
import QrCodeComponent from './Components/Qr/QrCode';
import UserContent from './Components/UserContent/UserContent';
import Auth from './Components/Auth/Auth';


function App() {
  return (
    <div className="App">
      <HubClient>
        <Router>
          <Route exact path="/auth/:connectionId"
            render={(props) =>
              <Auth {...props} />
            } />
          <Route exact path="/">
          
          </Route>
        </Router>
        <QrCodeComponent isAuthenticated={false} connectionId=""></QrCodeComponent>
            <UserContent isAuthenticated={false}></UserContent>
      </HubClient>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
