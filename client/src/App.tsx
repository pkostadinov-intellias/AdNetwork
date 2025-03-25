import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  return (
    <ReduxProvider store={store}>
      <AppRoutes />
    </ReduxProvider>
  );
}

export default App;
