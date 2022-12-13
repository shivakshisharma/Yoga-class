import React, { useState } from 'react'
import classes from '../styles/Auth.module.css'
import { Input, Button } from '../components'
import { Link, useHistory } from 'react-router-dom'
import { Error } from '../components'
import Api from '../apis'

export default function ForgetPassword() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const history = useHistory()

    const handleForget = async(e) =>{
        e.preventDefault()
        setError('')
        if(!email){
            return setError('Email is required');
        }
        setLoading(true)
        const result = await Api.ForgetPassword({email:email})
        if(!result){
            setLoading(false)
            return setError('Something went wrong!')
        }
        if(result.status===400){
            setLoading(false)
            return setError(result.data.message)
        }
        if(result.status===200){
            history.push('/success',{message:result.data.message})
        }
        setLoading(false)
    }

    return (
        <div className={classes.AuthPage}>
            <div className={classes.left}>
                <div className={classes.leftContent}>
                    <h4>Authentication Forget Password Page</h4>
                    <h6>Go and add your Registered Email !</h6>
                </div>
            </div>       
            <div className={classes.right}>
                <div className={classes.rightContent}>
                    <h3>Forget Password</h3>
                    <h5> </h5><br/><br/>
                    <form onSubmit={(e)=>handleForget(e)}>
                        <Input
                            value={email}
                            onChange={(text)=>setEmail(text)}
                            placeholder='Email Address'
                            type='email'
                            /><br/>
                        <Error message={error}/>
                        <Button loading={loading} variant='primary' type='submit' lable='Login' />
                    </form><br/>
                    <div className={classes.links}>
                        <p>Rememeber the password ? <Link to='/login'>Log In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
