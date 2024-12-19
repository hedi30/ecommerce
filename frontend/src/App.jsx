import { useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import AuthProvider from "./components/AuthProvider";
import { Toaster } from "react-hot-toast";
function App() {
  const [allRoutes] = useState([...publicRoutes]);
  return (
    <AuthProvider>
      <Toaster position="top-right" />
      <Router allRoutes={allRoutes} />
    </AuthProvider>
  );
}
export default App;
