import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import CartPage from './pages/CartPage';
import CustomerPage from './pages/CustomerPage';
import HomePage from './pages/HomePage';
import InvoicePage from './pages/InvoicePage';
import ProductPage from './pages/ProductPage';
import { useEffect } from 'react';

function App() {
  const cart = useSelector(state => state.cart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <RouteControl>
            <HomePage />
          </RouteControl>
        } />

        <Route path='/cart' element={
          <RouteControl>
            <CartPage />
          </RouteControl>
        } />

        <Route path='/invoices' element={
          <RouteControl>
            <InvoicePage />
          </RouteControl>
        } />

        <Route path='/customers' element={
          <RouteControl>
            <CustomerPage />
          </RouteControl>
        } />

        <Route path='/products' element={
           <RouteControl>
             <ProductPage />
           </RouteControl>
        } />

        <Route path='/login' element={<LoginPage />} />
        
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export const RouteControl = ({ children }) => {
  if (localStorage.getItem("posUser")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
