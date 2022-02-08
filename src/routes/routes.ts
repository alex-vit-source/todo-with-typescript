import { LOGIN_ROUTE, ABOUT_ROUTE, CARDS_ROUTE, NOTFOUND_ROUTE } from '../utils/consts';
import Login from '../components/Login'
import { About } from '../components/About';
import { Cards } from '../container/Cards';
import { NotFound } from '../components/NotFound';



export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Login
    },
    {
        path: ABOUT_ROUTE,
        Component: About
    },
    {
        path: NOTFOUND_ROUTE,
        Component: NotFound
    },

];

export const privateRoutes = [
    {
        path: CARDS_ROUTE,
        Component: Cards
    },
    {
        path: ABOUT_ROUTE,
        Component: About
    },
    {
        path: NOTFOUND_ROUTE,
        Component: NotFound
    },

]