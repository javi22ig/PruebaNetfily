import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar, SmallSidebar} from '../../components'
import Wrapper from '../../assets/wrappers/SharedLayout'

import { Link } from 'react-router-dom'

const SharedLayout = () => {
  //const { user } = useAppContext()
  return (
    <>
      <Wrapper>
        <main className='dashboard'>
          <Link to='/add-post' className='float'>+
          </Link>
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </>
  )
}

export default SharedLayout
