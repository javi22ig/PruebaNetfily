import { useState } from 'react'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'
import { NavLink } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Navbar'
import linksProfile from '../utils/linksProfile'
import { Link } from 'react-router-dom'

const Navbar = () => {


  const [showLogout, setShowLogout] = useState(false);

  const { user, logoutUser } = useAppContext();

  return (
    <Wrapper>
      <div className='nav-center'>
        <div>
        <Link to='/' > <h3 className='logo-text'>TruequeYa</h3>
          </Link>    
        </div>
        <div className='btn-container'>
          <button className='btn' onClick={() => setShowLogout(!showLogout)}>
            <FaUserCircle />
            {user && user.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>

            <div>
              {linksProfile.map((link) => {
                const { text, path, id, icon } = link

                return (
                  <div key={id} className='perfil'>
                    <NavLink
                    to={path}
                    key={id}
                  >
                    <span className='icon'>{icon} </span>
                    {text}
                  </NavLink></div>
                )
              })}
            </div>

            <button onClick={logoutUser} className='dropdown-btn'>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
