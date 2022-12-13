import React from "react";
import classes from '../styles/Home.module.css'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import { Button } from '../components'

const Message = () =>{
    const state = useLocation().state
    const history = useHistory()

    return(
        <div className={classes.home}>
            {!state?.message ? <Redirect to='/'/>:null}
            <h4>{state?.message.split('!')[0]} !</h4>
            <h6>{state?.message.split('!')[1]}</h6>
            <div className={classes.margin}>
                {state?.login==='true' ?
                    <Button onClick={()=>history.push('/login')} lable='Log In'/>
                    :null
                }
            </div>
        </div>
    )
}

export default Message