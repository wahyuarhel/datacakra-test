import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RouteApp from './routes/route';

function App() {
  const router = createBrowserRouter([
    { path: '*', Component: RouteApp }
  ])

  return (
    <div className="">
      <header className="">
      </header>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
