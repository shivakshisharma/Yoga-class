import React from 'react'
import Classes from '../styles/Button.module.css'
import Loader from './Loader'
export default function Button({lable, onClick, loading, variant, type}) {
    return (
        <button 
            className={variant==='primary'? Classes.button1 : Classes.button2} 
            disabled={loading}
            // eslint-disable-next-line no-unused-expressions
            onClick={()=>{type? null : onClick()}}
            type={type}>
                {loading? <Loader size={20}/> : lable}
        </button>
    )
}
