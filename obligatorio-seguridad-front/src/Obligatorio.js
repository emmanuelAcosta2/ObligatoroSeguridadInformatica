import { Provider } from 'react-redux'
import { store } from './store/store'
import { AppRouter } from './router/AppRouter';

function Obligatorio() {
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    )
}

export default Obligatorio