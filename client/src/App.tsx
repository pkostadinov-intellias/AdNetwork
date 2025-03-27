import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store";
import { AppRoutes } from "./routes/AppRoutes";
import { DialogProvider } from "./contexts/DialogContext";

function App() {
  return (
    <ReduxProvider store={store}>
      <DialogProvider>
        <AppRoutes />
      </DialogProvider>
    </ReduxProvider>
  );
}

export default App;
