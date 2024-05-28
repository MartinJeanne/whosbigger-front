import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Home from './component/Home';
import App from './App';
import About from './routes/about';
import Map from './component/Map';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/play',
    element: <App />,
  },
  {
    path: '/leaderboard',
    element: <About />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/map/:location',
    element: <Map />,
    loader: async ({ params }) => {
      console.log(params.location);
      return params.location;
    },
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
