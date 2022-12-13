import React, { useContext, useState } from 'react'
import classes from '../styles/Auth.module.css'
import { Input, Button, Error } from '../components'
import { Link, useHistory, Redirect} from 'react-router-dom'
import Api from '../apis'
import { AuthContext } from '../contexts/AuthContext'
import Cookies from 'js-cookie'

export default function Login() {
    const history = useHistory()
    const { setToken, token } = useContext(AuthContext);
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleLogin = async(e) =>{
        e.preventDefault()
        setError('');
        if(!email || !pass){
            return setError('Email and password are required')
        }
        setLoading(true)
        const result = await Api.Login(({email:email,password:pass}))
        if(!result){
            setLoading(false)
            return setError('Something went wrong!')
        }
        if(result.status===400){
            setLoading(false)
            return setError(result.data.message)
        }
        if(result.status===200){
            setToken(result.data.token)
            Cookies.set('token',result.data.token)
            history.push('/home',{message:result.data.message})
        }
        setLoading(false)
    }
    return (
        <div className={classes.AuthPage}>
            {token? <Redirect to='/home'/>:null}
            <div className={classes.left}>
                <div className={classes.leftContent}>
                    <h4>Yoga Class Login Page</h4>
                    <h6>Go and add your credential</h6>
                </div>
            </div>       
            <div className={classes.right}>
                <div className={classes.rightContent}>
                    <h3>Hello Member!&#127749;</h3>
                    <h5>Welcome Back</h5><br/><br/>
                    <form onSubmit={(e)=>handleLogin(e)}>
                        <Input
                            value={email}
                            onChange={(text)=>setEmail(text)}
                            placeholder='Email Address'
                            type='email'
                            /><br/>
                        <Input
                            value={pass}
                            onChange={(text)=>setPass(text)}
                            placeholder='Password'
                            type='password'
                        /><br/>
                        <Error message={error}/>
                        <Button loading={loading} variant='primary' type='submit' lable='Login' />
                    </form><br/>
                    <div className={classes.links}>
                        <Link to={'/forget-password'}>Forget Password</Link><br/>
                        <p>Don't have an account? <Link to='/signup'>Create Account</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
