import React, { useEffect } from 'react'
import classes from './OverflowLayout.module.css'

import Aos from 'aos'
import 'aos/dist/aos.css'

const OverflowLayout = (props) => {
    const { children } = props

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])

    return (
        <div className={classes.main} data-aos="fade" data-aos-duration="300">
            {children}            
        </div>
    )
}

export default OverflowLayout