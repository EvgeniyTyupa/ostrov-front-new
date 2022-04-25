import React from 'react'
import { motion } from 'framer-motion'
import classes from './AnimatedBlock.module.css'
import { cx } from '../../../Utils/classnames'

const AnimatedBlock = (props) => {
    const { 
        children, 
        className, 
        key = "key", 
        initial = { opacity: 0, y: -20 },
        animate = { opacity: 1, y: 0 },
        exit = { opacity: 0, y: 100 },
        duration = .3
    } = props

    const animations = {
        initial: initial,
        animate: animate,
        exit: exit
    }

    return (
        <motion.div
            variants={animations}
            key={key}
            initial="initial"
            exit="exit"
            animate="animate"
            transition={{ type: "tween", duration: duration }}
            className={cx(classes.main, className)}
        >
            {children}
        </motion.div>
    )
}

export default AnimatedBlock