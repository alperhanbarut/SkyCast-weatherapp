import "./App.css";
import RouterConfig from "./config/RouterConfig";
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    try {
      localStorage.removeItem("weatherMapState_v1");
    } catch {}
  }, []);
  return (
    <div className="min-h-screen transition-colors">
      <RouterConfig />
    </div>
  );
}
export default App;
