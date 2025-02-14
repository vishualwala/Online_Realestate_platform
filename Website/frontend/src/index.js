import React from 'react';
import '../src/CSS/index.css'

import ReactDOM from 'react-dom/client'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootswatch/dist/darkly/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom'; 
import App from './App';
import { store } from './RTK/store'
import { Provider } from 'react-redux'




const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router> 
      <App/>
      </Router>
      </Provider>
  </React.StrictMode>
);


