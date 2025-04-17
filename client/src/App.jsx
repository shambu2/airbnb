import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./Layout";
import { UserContextProvider } from "./UserContext";
import AccountPage from "./pages/AccountPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Places from "./pages/Places";
import NewForm from "./components/NewForm";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/account/:subpage/:action" element={<AccountPage />} />
          <Route path="/account/places/:id" element={<NewForm/>}/>
        </Route>
        
      </Routes>
    </UserContextProvider>
  );
}

export default App;
