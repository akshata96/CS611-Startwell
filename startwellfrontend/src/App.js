import React from 'react';
import Homepage from '../src/Components/Homepage/Homepage';
import Login from '../src/Components/Login/Login';
import Survey from '../src/Components/Survey/Survey';
import SignUp from '../src/Components/SignUp/SignUp';
import RegisterSuccess from '../src/Components/RegisterSuccess/RegisterSuccess';
import LoginSuccess from '../src/Components/LoginSuccess/LoginSuccess';
import Admin from '../src/Components/Admin/Admin';
import './App.css';
import ResetPassword from '../src/Components/ResetPassword/ResetPassword';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ForgotPassword from '../src/Components/ForgotPassword/ForgotPassword';
import UserDashboard from '../src/Components/UserDashboard/UserDashboard';
import Matching from '../src/Components/Matching/Matching';
import ContactUs from '../src/Components/ContactUs/ContactUsList';
import ProviderDashboard from '../src/Components/ProviderDashboard/ProviderDashboard';
import ChangePersonalDetails from '../src/Components/ChangePersonalDetails/ChangePersonalDetails';
import Subscriptions from '../src/Components/Subscriptions/Subscriptions'
import About from './Components/About/About';

function App() {
  return (
    <div className='App'>
      <Router>
        <Route exact path={'/'} render={props => <Homepage />} />
        <Route exact path={'/Homepage'} render={props => <Homepage />} />
        <Route exact path={'/Login'} render={props => <Login />} />
        <Route exact path={'/SignUp'} render={props => <SignUp />} />
        <Route exact path={'/ForgotPassword'} render={props => <ForgotPassword />} />
        <Route exact path={'/ResetPassword'} render={props => <ResetPassword />} />
        <Route exact path={'/RegisterSuccess'} render={props => <RegisterSuccess />} />
        <Route exact path={'/LoginSuccess'} render={props => <LoginSuccess />} />
        <Route exact path={'/Survey'} render={props => <Survey />} />
        <Route exact path={'/UserDashboard'} render={props => <UserDashboard />} />
        <Route exact path={'/Admin'} render={props => <Admin />} />
        <Route exact path={'/Matching'} render={props => <Matching />} />
        <Route exact path={'/ContactUs'} render={props => <ContactUs />} />
        <Route exact path={'/ProviderDashboard'} render={props => <ProviderDashboard />} />
        <Route exact path={'/ChangePersonalDetails'} render={props => <ChangePersonalDetails />} />
        <Route exact path={'/Subscriptions'} render={props => <Subscriptions />} />
        <Route exact path={'/About'} render={props => <About />} />
      </Router>
    </div>
  );
}

export default App;
