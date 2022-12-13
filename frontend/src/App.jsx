import React from "react";
import './styles/index.css'
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Switch, Route} from "react-router-dom";
import { Home, Login, Signup, ForgetPassword, VerifyEmail, Profile, Page404, Message, ResetPassword} from "./pages";

const App = () => {
    return (
        <AuthProvider>
           <BrowserRouter>
              <Switch>
                <Route path='/' component={Home} exact/>
                <Route path='/login' component={Login} exact/>
                <Route path='/home' component={Profile} exact/>
                <Route path='/signup' component={Signup} exact/>
                <Route path='/forget-password' component={ForgetPassword} exact/>
                <Route path='/verify-email' component={VerifyEmail} exact/>
                <Route path='/reset-password' component={ResetPassword} exact/>
                <Route path='/success' component={Message} exact/>
                <Route path='*' component={Page404}/>
              </Switch>
           </BrowserRouter>
        </AuthProvider>
    )
}
export default App