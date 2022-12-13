import React, { useContext } from 'react'
import classes from '../styles/Home.module.css'
import { Button } from '../components'
import { useHistory, Redirect } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'

export default function Home() {
    const { token } = useContext(AuthContext)
    const history = useHistory()

    if(token){
        return <Redirect to='/home'/>
    }
    
    return (
        <div className={classes.home}>
            <h4>Welcome to Yoga Class Form</h4>
            <h6>features : login, signup to any batch, additional info, email verification and forget password</h6>
            <div className={classes.margin}>
                <Button onClick={()=>history.push('/login')} lable='Get Started'/>
            </div>
        </div>
    )
}
