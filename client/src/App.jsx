import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import MyUploads from "./pages/MyUploads";
import PrivateRoutes from "./components/routes/PrivateRoutes";
import UploadsPage from "./pages/UploadsPage";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

        {/* Dashboard routes protected by PrivateRoutes component */}
        <Route path="/dashboard" element={<PrivateRoutes />}>
          <Route path="uploads" element={<MyUploads />} />
          <Route path="myuploads" element={<UploadsPage />} />
        </Route>

        {/* Fallback route for 404 Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
