import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import '@fontsource/noto-sans-lao/400.css'
import '@fontsource/noto-sans-tc/400.css'
import '@fontsource/noto-sans-tc/900.css'
import '@fontsource/dancing-script'
import '@fontsource/dela-gothic-one'
import './styles/global.css'

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
