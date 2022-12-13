import React from 'react'
import classes from '../styles/Home.module.css'
import { Button } from '../components'
import { useHistory } from 'react-router-dom'
export default function Page404() {
    const history = useHistory()
    return (
        <div className={classes.home}>
            <h4>Page Not Found !</h4>
            <h6> </h6>
            <div className={classes.margin}>
                <Button onClick={()=>history.push('/')} lable='Go to Home'/>
            </div>
        </div>
    )
}
