import React          from 'react'
import { Link }       from 'react-router-dom'
import SignedInLinks  from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'



const Navbar = () => {
    return (

            <div>
                <h1>================= START src/components/layout/NAVBAR</h1>
                <Link to='/'>Memembo</Link>
                <SignedInLinks />    
                <SignedOutLinks />  
                <div><Link to='/create'>Create Game</Link></div>
                
                <div><Link to='/play/:id'>Play Game</Link></div>

                <div><Link to='/search'>Search Games</Link></div>

                <h1>================= END src/components/layout/NAVBAR</h1>       
            </div>
    )
}

export default Navbar;