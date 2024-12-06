import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/login/Login.jsx';
import QuizContamination from './pages/quiz/QuizContamination.jsx';
import QuizAcidification from './pages/quiz/QuizAcidification.jsx';
import Home from './pages/home/Home.jsx';
import App from './App.jsx';
import WaterPollution from './pages/waterPollution/WaterPollution.jsx';
import Acidification from './pages/acidification/Acidification.jsx';
import Curious from './pages/exploration/Curious.jsx';
import FaunaPage from './pages/exploration/FaunaPage.jsx';
import FloraPage from './pages/exploration/FloraPage.jsx';
import Quiz from './pages/quiz/Quiz.jsx';

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
    path: "/quiz-contamination",
    element: <QuizContamination/>
  },
  {
    path: "/quiz-acidification",
    element: <QuizAcidification/>
  },
  {
    path: "/quiz",
    element: <Quiz/>
  },
  {
    path: "/inicio",
    element: <Home/>
  },
  {
    path: "/App",
    element: <App/>
  },
  {
    path: "/contaminacion-del-agua",
    element: <WaterPollution/>
  },
  {
    path: "/acidificacion-del-oceano",
    element: <Acidification/>
  },
  {
    path: "/fauna",
    element: <FaunaPage/>
  },
  {
    path: "/flora",
    element: <FloraPage/>
  },
  {
    path: "/datos-curiosos",
    element: <Curious/>
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
    <RouterProvider router={router} />
);