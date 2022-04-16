import React, { useEffect } from 'react'
import classes from './OverflowLayout.module.css'

import Aos from 'aos'
import 'aos/dist/aos.css'

const OverflowLayout = (props) => {
    const { zIndex = 10, children } = props

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => document.body.style.overflow = 'unset'
    }, [])

    return (
        <div className={classes.main} style={{ zIndex: zIndex }} data-aos="fade" data-aos-duration="300">
            {children}            
        </div>
    )
}

export default OverflowLayout