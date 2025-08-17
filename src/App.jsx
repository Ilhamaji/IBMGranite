import { LoadingProvider } from "./context/LoadingContext";
import Home from "./pages/Home";

function App() {
  return (
    <LoadingProvider>
      <Home />
    </LoadingProvider>
  );
}

export default App;
