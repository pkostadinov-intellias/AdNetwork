import { Provider as ReduxProvider } from "react-redux";
import { store } from "./store/store";
import { AppRoutes } from "./routes/AppRoutes";
import { DialogProvider } from "./contexts/DialogContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <DialogProvider>
          <AppRoutes />
        </DialogProvider>
      </BrowserRouter>
    </ReduxProvider>
  );
}

export default App;
