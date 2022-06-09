import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage'
import PropertyPage from './pages/PropertyPage';
import LoginPage from './pages/LoginPage'
import Header from './components/Header'
import PropertyItemsPage from './pages/PropertyItemsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import RegisterPage from './pages/RegisterPage';
import AccountActivationPage from './pages/AccountActivationPage';
import PageNotFound from './pages/PageNotFound';

function App() {
  return (
    
      <Router>
        <AuthProvider>
          {/* <Header/> */}
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route exact path="/" element={<HomePage />} />
              <Route path="property/:id" element={<PropertyPage />} />
            </Route>
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="activate-account/:token" element={<AccountActivationPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </AuthProvider>
      </Router>
  
  );
}

export default App;
