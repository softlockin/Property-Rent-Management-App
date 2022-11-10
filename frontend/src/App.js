import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage'
import PropertiesPage from './pages/PropertiesPage';
import LoginPage from './pages/LoginPage'
import PropertyItemsPage from './pages/PropertyItemsPage';
import IssueTrackerPage from './pages/IssueTrackerPage'
import InvoicesPage from './pages/InvoicesPage'
import MapPage from './pages/MapPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import RegisterPage from './pages/RegisterPage';
import AccountActivationPage from './pages/AccountActivationPage';
import PageNotFound from './pages/PageNotFound';
import Dashboard from './components/static/Dashboard';
import CompleteRegistration from './pages/CompleteRegistration';
import AccountLinkingPage from './pages/AccountLinkingPage';

function App() {

  const [barVisible, setBarVisible] = useState(false)
  const [otherActions, setOtherActions] = useState(false)
  const [mobileViewNavTitle, setMobileViewNavTitle] = useState('')

  return (
    
      <Router>
        <AuthProvider>
          <Dashboard setBarVisible={setBarVisible} barVisible={barVisible} otherActions={otherActions} mobileViewNavTitle={mobileViewNavTitle} />
          <Routes>
            <Route path="*" element={<PageNotFound />} />
            <Route path="login" element={<LoginPage />} />
            <Route element={<PrivateRoute />} >
              <Route exact path="/" element={<HomePage setMobileViewNavTitle={setMobileViewNavTitle}/>} />
              <Route path="property-list" element={<PropertiesPage setMobileViewNavTitle={setMobileViewNavTitle}/>} />
              <Route path="issue-tracker" element={<IssueTrackerPage setMobileViewNavTitle={setMobileViewNavTitle}/>} />
              <Route path="invoices" element={<InvoicesPage setMobileViewNavTitle={setMobileViewNavTitle}/>} />
              <Route path="map" element={<MapPage setMobileViewNavTitle={setMobileViewNavTitle}/>} />
              <Route path="complete-registration" element={<CompleteRegistration />} />
              <Route path="link-account/:token" element={<AccountLinkingPage setOtherActions={setOtherActions} />} />
            </Route>
            <Route path="forgot-password" element={<ForgotPasswordPage />} />
            <Route path="reset-password/:token" element={<ResetPasswordPage />} />
            <Route path="activate-account/:token" element={<AccountActivationPage />} />
            <Route path="register" element={<RegisterPage />} />
            
          </Routes>
        </AuthProvider>
      </Router>
  
  );
}

export default App;
