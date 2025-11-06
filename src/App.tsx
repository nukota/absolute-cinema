import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import Signin from './pages/user/Signin';
import Signup from './pages/user/Signup';
import UserLayout from './pages/user';
import Home from './pages/user/Home';
import MoviesPage from './pages/user/MoviesPage';
import SavedMoviesPage from './pages/user/SavedMoviesPage';
import MovieDetail from './pages/user/MovieDetail';
import Booking from './pages/user/Booking';
import Payment from './pages/user/Payment';
import Confirmation from './pages/user/Confirmation';
import Profile from './pages/user/Profile';
import HelpCenter from './pages/user/HelpCenter';
import TermsConditions from './pages/user/TermsConditions';
import PrivacyPolicy from './pages/user/PrivacyPolicy';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* User routes with layout */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="saved-movies" element={<SavedMoviesPage />} />
          <Route path="movie/:id" element={<MovieDetail />} />
          <Route path="booking/:showtimeId" element={<Booking />} />
          <Route path="payment" element={<Payment />} />
          <Route path="confirmation" element={<Confirmation />} />
          <Route path="profile" element={<Profile />} />
          <Route path="help-center" element={<HelpCenter />} />
          <Route path="terms-conditions" element={<TermsConditions />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
        </Route>
        
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
