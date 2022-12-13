import React from 'react'
import classes from '../styles/Input.module.css'
import { MdOutlineEmail, MdOutlineLock } from 'react-icons/md'
import { FiUser } from 'react-icons/fi'

const Input = ({value, onChange, placeholder, type, disabled}) =>{
    return(
        <div className={classes.container}>
            {type==='email'? <MdOutlineEmail className={classes.icon}/> : type==='password'? <MdOutlineLock className={classes.icon}/>: <FiUser className={classes.icon}/>}
            <input 
                className={classes.input}
                value={value} 
                onChange={(e)=>onChange(e.target.value)}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
            />
        </div>
    )
}
export default Input