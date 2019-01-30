import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedInLinks = () => {
    return (
        <>
        <h1>================= START src/components/layout/SignedInLinks</h1>
        <ul><li><NavLink to="/">Dashboard</NavLink></li>
        <li><NavLink to="/">Logout</NavLink></li></ul>
        <h1>================= END src/components/layout/SignedInLinks</h1>
        </>
    )
}

export default SignedInLinks;