import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
    return (
        <>
        <h1>================= START src/components/layout/SignedOutLinks</h1>
        <ul><li><NavLink to="/">Signup</NavLink></li>
        <li><NavLink to="/">Login</NavLink></li>
        <h1>================= START src/components/layout/SignedOutLinks</h1></ul>
        </>
    )
}

export default SignedOutLinks;