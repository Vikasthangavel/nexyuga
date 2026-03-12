import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CareersPage from './pages/CareersPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/nx-admin-2024" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
