import React from 'react';
import { Link } from 'react-router-dom';
import Wrapper from '../assets/wrappers/LandingPage';

export const Landing = () => {
    return (
        <Wrapper>
            
            <div className='container page'>
                <div className='info'>
                    <h1><span>TruequeYa</span> </h1>
                    <p>Intercambie los productos que ya no utiliza
                    </p>
                    <Link to={'/register'} className='btn btn-hero'>Login/Register</Link>
                </div>
            </div>
        </Wrapper>
    )
}




