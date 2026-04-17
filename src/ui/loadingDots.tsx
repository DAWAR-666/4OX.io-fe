"use client"

import { motion, type Variants } from "framer-motion"

function LoadingDots() {
    const dotVariants: Variants = {
        jump: {
            transform: "translateY(-30px)",
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            },
        },
    }

    return (
        <motion.div
            animate="jump"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className="container"
        >
            <motion.div className="dot dot1" variants={dotVariants} />
            <motion.div className="dot dot2" variants={dotVariants} />
            <motion.div className="dot dot3" variants={dotVariants} />
            <StyleSheet />
        </motion.div>
    )
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
    return (
        <style>
            {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
            }

            .dot {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                
                will-change: transform;
            }
            .dot1{
                background-color: #ff0088;
            }
            .dot2{
                background-color:#0d63f8
            }
            .dot3{
                background-color:#8df0cc
            }
            `}
        </style>
    )
}

export default LoadingDots
