import React, { createContext, useReducer } from 'react'
import Navbar from './components/Navbar';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contacts from './components/Contacts';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Errorpage from './components/Errorpage';
import Logout from './components/Logout';
import './App.css';

import { initialState, reducer } from '../src/reducer/useReducer';

// contextAPI 
export const UserContext = createContext();

const Routing = () =>{
  return(
    <Switch>
          <Route exact path='/' component={Home} /> 
          <Route exact path='/about' component={About} />
          <Route exact path='/contacts' component={Contacts} />
          <Route exact path='/signin' component={Signin} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/logout' component={Logout} />
          <Route component={Errorpage}></Route>
      </Switch>
  )
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
      <Navbar/>
      <Routing />
    </UserContext.Provider> 
    </>
  )
}

export default App
