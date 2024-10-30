
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Dashboard } from './pages/Dashboard';
import { Mentorship } from './pages/Mentorship';
import { Guidelines } from './pages/Guidelines';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register';
import { Login } from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/guidelines" element={<Guidelines />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
