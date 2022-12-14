import React, { useContext, useState } from 'react'
import classes from '../styles/Auth.module.css'
import inputClasses from '../styles/Input.module.css'
import { Input, Button } from '../components'
import { Link, useHistory, Redirect} from 'react-router-dom'
import Api from '../apis'
import { Error } from '../components'
import { AuthContext } from '../contexts/AuthContext'
export default function Signup() {
    const {token} = useContext(AuthContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [dob, setDob] = useState(new Date());
    const [batch, setBatch] = useState();
    const [passConfirm, setPassConfirm] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const history = useHistory()

    const handleSignup = async(e) =>{
        e.preventDefault()
        setError('')
        if(!name || !email || !pass || !passConfirm){
            return setError('Please fill all the fields!')
        }
        if(!dobChange(dob)) return;

        if(pass !== passConfirm){
            return setError('Password do not match !')
        }
        setLoading(true)
        const result = await Api.Signup({name:name, email:email, password:pass, batch, dob})
        if(!result){
            setLoading(false)
            return setError('Something went wrong!')
        }
        if(result.status===400){
            setLoading(false)
            return setError(result.data.message)
        }
        if(result.status===201){
            history.push({pathname:'/success',state:{message:result.data.message}})
        }
        setLoading(false)
    }

    const dobChange = (date) => {
        setError('');
        setDob(date);
        const age = new Date().getFullYear()-date.getFullYear()
        if(age<18 || age>65) {
            setError('Invalid Date of birth! your age should between 18 to 65')
            return false;
        }
        return true;
    }

    return (
        <div className={classes.AuthPage}>
            {token? <Redirect to='/home'/>:null}
            <div className={classes.left}>
                <div className={classes.leftContent}>
                    <h4>Yoga Class Registration Page</h4>
                    <h6>Go and Register Yourself for the batch!</h6>
                </div>
            </div>       
            <div className={classes.right}>
                <div className={classes.rightContent}>
                    <h3>Hello !</h3>
                    <h5>Sign Up to enroll in the class</h5><br/><br/>
                    <form onSubmit={(e)=>handleSignup(e)}>
                        <Input
                            value={name}
                            onChange={(text)=>setName(text)}
                            placeholder='Name'
                            type='name'
                        /><br/>
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
                        <Input
                            value={passConfirm}
                            onChange={(text)=>setPassConfirm(text)}
                            placeholder='Confirm Password'
                            type='password'
                        /><br/>
                        <div className={inputClasses.container}>
                            <input 
                                className={inputClasses.input}
                                // value={dob} 
                                onChange={(e)=>dobChange(new Date(e.target.value))}
                                placeholder='Date of Birth'
                                type='date'
                            />
                        </div><br/>
                        <div className={inputClasses.container}>
                            <select className={inputClasses.input} onChange={(e)=>setBatch(e.target.value)}>
                                <option>Batch 6-7AM</option>
                                <option>Batch 7-8AM</option>
                                <option>Batch 8-9AM</option>
                                <option>Batch 5-6PM</option>
                            </select>
                        </div>
                        <Error message={error}/>
                        <Button loading={loading} variant='primary' type='submit' lable='Signup' />
                    </form><br/>
                    
                    
                    <div className={classes.links}>
                        <p>Already have an account? <Link to='/login'>Log In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}