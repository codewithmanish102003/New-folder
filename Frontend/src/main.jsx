import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.jsx'
import store, { persistor } from './app/store.js'
import './index.css'

createRoot(document.getElementById('root')).render(
  <><ToastContainer position="top-right" autoClose={3000} hideProgressBar /><Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider></>

)
