import { Provider } from 'react-redux'
import { store } from './store/store'
import { AppRouter } from './router/AppRouter';
import './styles/App.scss';

function ObligatorioSeguridad() {
    return (
        <Provider store={store}>
            <AppRouter/>
        </Provider>
    )
}

export default ObligatorioSeguridad
