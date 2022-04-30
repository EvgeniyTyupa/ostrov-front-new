import React, { useEffect } from 'react'
import classes from './OverflowLayout.module.css'

import Aos from 'aos'
import 'aos/dist/aos.css'
import AnimateFade from '../../Animation/AnimateFade/AnimateFade'

const OverflowLayout = (props) => {
    const { zIndex = 20, children } = props

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])

    // useEffect(() => {
    //     document.body.style.overflow = 'hidden'

    //     return () => document.body.style.overflow = 'unset'
    // }, [])

    return (
        <AnimateFade className={classes.main} zIndex={zIndex} key="preloader">
            {children}            
        </AnimateFade>
    )
}

export default OverflowLayout