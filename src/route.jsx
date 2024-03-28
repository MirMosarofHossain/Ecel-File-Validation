import { createBrowserRouter } from "react-router-dom";
import Home from "./component/home";
import Login from "./component/login";
import App from "./App";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App></App>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            }
        ]
    },
    {
        path:'/login',
        element:<Login></Login>
    }
])
export default router;