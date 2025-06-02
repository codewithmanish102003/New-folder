import '@fortawesome/fontawesome-free/css/all.min.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { fetchUserDetailsThunk } from './app/features/auth/authThunk';
import Login from './Components/Auth/Login';
import Owner_Register from './Components/Auth/Owner_Register';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import Register from './Components/Auth/Register';
import Cart from './Components/Customer/Cart';
import Orders from './Components/Customer/Orders';
import Customer from './Components/Dashboard/Customer';
import Owner from './Components/Dashboard/Owner';
import Home from './Components/Main/Home';
import Footer from './Components/Partials/Footer';
import LineBreak from './Components/Partials/LineBreak';
import NavigationBar from './Components/Partials/NavigationBar';
import Payments from './Components/Payments/Payments';
import ProductDetails from './Components/Products/ProductDetails';
import Products from './Components/Shop/Products';
import AboutUs from './Components/Partials/AboutUs';
import TermsAndConditions from './Components/Partials/TermsAndConditions';
import FAQs from './Components/Partials/FAQ';
import PrivacyPolicy from './Components/Partials/PrivacyPolicy';
import ContactUs from './Components/Partials/ContactUs';


const App = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role) || 'guest'; 
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn) || false;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isLoggedIn) {
      dispatch(fetchUserDetailsThunk());
    }
  }, [isLoggedIn]);

  console.log("Current role:", role);
  console.log("Is authenticated:", isLoggedIn);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <NavigationBar />
        <LineBreak />
        <div className="flex-grow bg-gray-50">
          <Routes>
            {role !== 'owner' && (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetails />} />
                <Route path="/payments" element={<Payments />} />
                <Route path="/cart" element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                } />
                <Route path='/orders' element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } />
              </>
            )}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login/owner_register" element={<Owner_Register />} />
            {role === 'user' && (
              <Route path="/profile" element={<Customer />} />
            )}
            {role === 'owner' && (
              <Route path="/owner" element={<Owner />} />
            )}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact-us" element={<ContactUs />} />


            

            



          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;