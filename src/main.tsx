import {Suspense} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {Provider} from "react-redux";
import store from "./store/Store.tsx";
import Spinner from "./components/spinner/Spinner.tsx";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Suspense fallback={<Spinner />}>
                <App />
        </Suspense>
    </Provider>,
)
