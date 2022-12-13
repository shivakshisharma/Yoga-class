import React, { useState } from 'react'
import classes from '../styles/Auth.module.css'
import { Input, Button, Error } from '../components'
import Api from '../apis'
import { useHistory, useLocation, Redirect} from 'react-router-dom'

export default function ResetPassword(props) {
    const history = useHistory()
    const search = useLocation().search
    const token = new URLSearchParams(search).get('token')
    const [pass, setPass] = useState('')
    const [passConfirm, setPassConfirm] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleResetPassword = async(e) =>{
        e.preventDefault()
        setError('');
        if(!pass){
            return setError('password is required')
        }
        if(pass!==passConfirm){
            return setError('Password do not match!')
        }
        setLoading(true)
        const result = await Api.ResetPassowrd(({newPassword:pass,token:token}))
        if(!result){
            setLoading(false)
            return setError('Something went wrong!')
        }
        if(result.status===400){
            setLoading(false)
            return setError(result.data.message)
        }
        if(result.status===200){
            history.push({pathname:'/success',state:{message:result.data.message,login:'true'}})
        }
        setLoading(false)
    }
    return (
        <div className={classes.AuthPage}>
            {!token? <Redirect to='/'/>:null}
            <div className={classes.left}>
                <div className={classes.leftContent}>
                    <h4>Authentication Reset Password Page</h4>
                    <h6>Go and create your new password !</h6>
                </div>
            </div>       
            <div className={classes.right}>
                <div className={classes.rightContent}>
                    <h3>Reset Password</h3>
                    <h5>Create new pasword</h5><br/><br/>
                    <form onSubmit={(e)=>handleResetPassword(e)}>
                        <Input
                            value={pass}
                            onChange={(text)=>setPass(text)}
                            placeholder='New Password'
                            type='password'
                        /><br/>
                        <Input
                            value={passConfirm}
                            onChange={(text)=>setPassConfirm(text)}
                            placeholder='Confirm Password'
                            type='password'
                        /><br/>
                        <Error message={error}/>
                        <Button loading={loading} variant='primary' type='submit' lable='Submit' />
                    </form><br/>
                    <div className={classes.links}>
                    </div>
                </div>
            </div>
        </div>
    )
}
