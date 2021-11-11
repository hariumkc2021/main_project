import React from 'react';
import { Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css';
import { AppProvider } from './contexts/AppContext.js';
import Layout from './modules/index.js';
import Header from './components/header.jsx';

const history = createBrowserHistory();
function App() {


  return (
    <>

      <Router history={history}>

        <AppProvider>
          <Header></Header>
          <section className="App-container">
            <Route path="/" component={Layout} />
          </section>
        </AppProvider>
      </Router>
    </>
  );
}

export default App;
