import React, { useEffect, useState } from 'react'
import Api from '../apis'
import classes from '../styles/Home.module.css'
import { useHistory, useLocation, Redirect } from 'react-router-dom'
import { Button, Loader } from '../components'

const VerifyEmail = (props) =>{
    const history = useHistory()
    const search = useLocation().search
    const token = new URLSearchParams(search).get('token')
    const [msg, setMsg] = useState('')

    useEffect(()=>{
        VerifyEmail()
    },)

    const VerifyEmail =  async () =>{
        const result = await Api.VerifyEmail({token:token});
        if(result){
            setMsg(result.data.message)
        }
    }
    return(
        <div className={classes.home}>
            {!token? <Redirect to='/'/>:null}
            {msg?
            <>
                <h4>{msg}</h4>
                <h6> </h6>
                <div className={classes.margin}>
                    <Button onClick={()=>history.push('/login')} lable='Login'/>
                </div>
            </>
            :<Loader size={40}/>}
        </div>
    )
}

export default VerifyEmail