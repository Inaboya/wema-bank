import { lazy } from "react";

const Dashboard = lazy(() => import('../pages/Dashboard/Verifiers'))

export const coreRoutes = [
    {
        path: '/dashboard/verifiers',
        title: 'Home Page',
        component: Dashboard,
      },
]