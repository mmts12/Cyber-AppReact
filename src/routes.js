import { AttackApp } from './pages/AttackApp';
import { AttackDetails } from './pages/AttackDetails';
import { Statistics } from './pages/Statistics';


export const routes = [
    {
        path: '/:attackId',
        component: AttackDetails
    },
    {
        path: '/attack/statistics',
        component: Statistics
    },
    {
        path: '/',
        component: AttackApp
    },
]