import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../assets/Logo.png'
import search from '../../assets/search.svg'
import Avatar from '../../components/Avatar/Avatar'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import './Navbar.css'
import { setCurrentUser } from '../../actions/currentUser'
import decode from 'jwt-decode'


const Navbar = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const handleLogout=()=>{
        dispatch({type:'LOGOUT'})
        navigate('/')
        dispatch(setCurrentUser(null))
    }
    
    var User = useSelector((state)=>(state.currentUserReducer))
    useEffect(()=>{
        const token=User?.token
        if(token){
            const decodedToken=decode(token)
            if(decodedToken.exp * 1000<new Date().getTime()){
                handleLogout()
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    },[dispatch])

  
  return (
    <nav className='main-nav'>
        <div className='navbar'>
            <Link to='/' className='nav-item nav-logo'>
                <img src={logo} alt="logo" width='200' />
            </Link>
            <Link to='/' className='nav-item nav-btn'>About</Link>
            <Link to='/' className='nav-item nav-btn'>Products</Link>
            <Link to='/' className='nav-item nav-btn'>For Teams</Link>
            <form >
                <input type="text" placeholder='Search...'/>
                <img src={search} alt="search"  width="18" className='search-icon'/>
            </form>
            {User===null ? 
            <Link to='/Auth' className='nav-item nav-links'>Log in</Link>:
            <><Avatar backgroundColor="#009dff" px='10px' py='7px' borderRadius="50%" color='white' textDecoration="none"><Link to={`/User/${User?.result._id}` }style={{color:'white', textDecoration:'none'}}>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
            <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
            </>
        }
        </div>
    </nav>
  )
}

export default Navbar