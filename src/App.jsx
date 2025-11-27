import { Routes, Route } from "react-router-dom";
import RecipeSearch from "./components/RecipeSearch";
import FavoritesPage from "./components/FavoritesPage";
import Login from "./components/Login";
import CreateAccount from "./pages/CreateAccount"; 
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css"; 
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<RecipeSearch />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateAccount />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/favorites"element={<ProtectedRoute> <FavoritesPage /></ProtectedRoute> } />
      </Routes>
       <ToastContainer position="top-right" theme="colored" />
    </AuthProvider>
  );
};

export default App;
//cd "C:\Users\yaswa\OneDrive\Pictures\Desktop\Food Menu\food-menu-app"