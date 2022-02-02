import { LOGIN_ROUTE, CHAT_ROUTE, ABOUT_ROUTE, CARDS_ROUTE } from '../utils/consts';
import Login from './Login';
import { About } from '../components/About';
import { Cards } from '../container/Cards';



export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: ABOUT_ROUTE,
        Component: About
    }

];

export const privateRoutes = [
    {
        path: CHAT_ROUTE,
        Component: Chat
    },
    {
        path: CARDS_ROUTE,
        Component: Cards
    },
]