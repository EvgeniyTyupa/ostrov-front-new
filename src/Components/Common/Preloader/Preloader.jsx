import React, { useEffect } from 'react'
import classes from './Preloader.module.css'
import OverflowLayout from '../../UI/OverflowLayout/OverflowLayout'

import preloader from '../../../Assets/preloader.svg'

import Aos from 'aos'
import 'aos/dist/aos.css'

const Preloader = () => {

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])

    return (
        <OverflowLayout>
            <img 
                src={preloader} 
                alt="preloader" 
                data-aos="zoom-in" 
                data-aos-duration="200"
                className={classes.main}
            />
        </OverflowLayout>
    )
}

export default Preloader