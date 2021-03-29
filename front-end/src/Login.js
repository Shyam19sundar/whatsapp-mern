import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase'
import "./Login.css"
import { actionTypes } from './reducer'
import { useStateValue } from './StateProvider'

function Login({setuser}) {

   // const [{},dispatch] = useStateValue()

    const signin = ()=>{
        auth.signInWithPopup(provider).then(res =>{
            // dispatch({
            //     type : actionTypes.SET_USER,
            //     user : res.user
            // })
            setuser(res)
        }).catch(err => alert(err.message))
    }

    return (
        <div className="login">
            <div className="login__container">
                <img 
                    src=""
                    alt=""
                />
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signin}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
