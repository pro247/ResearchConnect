import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Dashboard } from "./pages/Dashboard";
import { Mentorship } from "./pages/Mentorship";
import { Guidelines } from "./pages/Guidelines";
import { Chatbot } from "./pages/chatbot";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import RechieChat from "./pages/Rechie";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mentorship/:mentorId" element={<Mentorship />} /> 
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/rechie" element={<RechieChat />} />
          <Route path="/chatbot" element={<Chatbot/>}/>
         
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
export default App;
