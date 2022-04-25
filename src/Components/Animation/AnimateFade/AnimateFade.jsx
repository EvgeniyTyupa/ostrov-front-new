import React from 'react'
import { motion } from 'framer-motion'

const AnimateFade = (props) => {
    const { children, className, key = "key", zIndex = 10} = props

    const animations = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
    }

    return (
        <motion.div
            variants={animations}
            style={{ zIndex: zIndex }}
            key={key}
            initial="initial"
            exit="exit"
            animate="animate"
            transition={{ type: "tween", duration: .2 }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default AnimateFade