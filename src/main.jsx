import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//pages imported to router
import Home from './pages/Home.jsx';
import Entry from './pages/Entry.jsx'
import Menu from './pages/Menu.jsx'
import Discount from './pages/Discount.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Entry />,
      },
      {
        path: '/Home',
        element: <Home />,
      },
      {
        path: '/Menu',
        element: <Menu />,
      },
      {
        path: '/Discount',
        element: <Discount />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
