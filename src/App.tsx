import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RouteApp from './routes/route';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const router = createBrowserRouter([
    { path: '*', Component: RouteApp }
  ])

  return (
    <div className="">
      <header className="">
      </header>
      <ToastContainer />
      <RouterProvider router={router}
      />
    </div>
  );
}

export default App;
