import {createBrowserRouter,RouterProvider} from 'react-router';

const router = createBrowserRouter([
    {
        path:'/',
        element:<h1>homie</h1>
    },
    {
        path:'/about',
        element:<h1>abouti</h1>
    }
])

export default router;