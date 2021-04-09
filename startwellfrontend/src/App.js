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

function App() {
  return (
    <div className='App'>
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
