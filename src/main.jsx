import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import "bootstrap-icons/font/bootstrap-icons.css";
import store from './app/store.js'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
