import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './pages/admin/index';
import Dashboard from './pages/admin/Dashboard';
import Movies from './pages/admin/Movies';
import Showtimes from './pages/admin/Showtimes';
import Cinemas from './pages/admin/Cinemas';
import Rooms from './pages/admin/Rooms';
import Customers from './pages/admin/Customers';
import Products from './pages/admin/Products';
import Invoices from './pages/admin/Invoices';
import Ratings from './pages/admin/Ratings';
import Settings from './pages/admin/Settings';
import Signin from './pages/users/Signin';
import Signup from './pages/users/Signup';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to signin */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
        
        {/* Auth routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="movies" element={<Movies />} />
          <Route path="showtimes" element={<Showtimes />} />
          <Route path="cinemas" element={<Cinemas />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="customers" element={<Customers />} />
          <Route path="products" element={<Products />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="ratings" element={<Ratings />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
