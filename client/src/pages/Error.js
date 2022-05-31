import React from 'react'
import Wrapper from '../assets/wrappers/LandingPage';
import { Link } from 'react-router-dom';


export const Error = () => {
  return (
    <Wrapper className='full-page'>
        <div>
        <h3> 404 - page not found</h3>
        <p>We cant seem to find the page you're looking for</p>
        <Link to='/'>back home</Link>

        </div>

    </Wrapper>
  )
}
