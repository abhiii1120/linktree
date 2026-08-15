import {createBrowserRouter,RouterProvider} from 'react-router';
import Home from '../features/home/pages/Home';

const router = createBrowserRouter([
    {
        path:'/',
        element:<h1>homie</h1>
    },
    {
        path:'/about',
        element:<h1>abouti</h1>
    },
    {
        path:'/:username',
        element:<Home/>
    }
])

export default router;