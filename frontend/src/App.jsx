import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./routes/Route";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  );
}

export default App;
