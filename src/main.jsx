import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/login/Login.jsx';
import Quiz from './pages/quiz/Quiz.jsx';
import Home from './pages/home/Home.jsx';
import App from './App.jsx';
import Exploration from './pages/exploration/Exploration.jsx';

/**
 * Creates a router with defined routes for the application.
 * 
 * - The ⁠ / ⁠ path renders the ⁠ Login ⁠ component.
 * - The ⁠ /Quiz ⁠ path renders the ⁠ Quiz ⁠ component.
 * 
 * @constant
 * @type {Router}
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/Quiz",
    element: <Quiz/>
  },
  {
    path: "/Home",
    element: <Home/>
  },
  {
    path: "/App",
    element: <App/>
  },
  {
    path: "/Exploration",
    element: <Exploration/>
  },
]);

/**
 * Renders the root component of the application.
 * 
 * The application is wrapped in React's ⁠ StrictMode ⁠ for highlighting potential problems 
 * and the ⁠ RouterProvider ⁠ for handling client-side routing.
 * 
 * @function
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);