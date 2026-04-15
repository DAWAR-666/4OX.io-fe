"use client"

import { motion, type Variants } from "framer-motion"
import React, { useEffect, useState } from "react"

const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
        pathLength: 1,
        opacity: 1, // Keep icons subtle for a background
        transition: {
            pathLength: { 
                delay: i, 
                type: "spring", 
                duration: 1.5, 
                bounce: 0,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 3
            },
            opacity: { delay: i, duration: 0.5 },
        },
    }),
}

const iconColors = ["#ff0088", "#8df0cc", "#0d63f8"];

export default function AnimatedBackground() {
    const [count, setCount] = useState(0);

    // Calculate how many items are needed based on the actual screen size
    useEffect(() => {
        const calculateGrid = () => {
            const iconSize = 50; // size + gap
            const columns = Math.ceil(window.innerWidth / iconSize) + 1;
            const rows = Math.ceil(window.innerHeight / iconSize) + 1;
            setCount(columns * rows);
        };

        calculateGrid();
        window.addEventListener("resize", calculateGrid);
        return () => window.removeEventListener("resize", calculateGrid);
    }, []);

    return (
        <div style={backgroundContainer}>
            <motion.div 
                initial="hidden" 
                animate="visible" 
                style={gridStyle}
            >
                {Array.from({ length: count }).map((_, i) => {
                    const color = iconColors[i % iconColors.length];
                    const isCircle = i % 2 === 0;
                    // Stagger the animation so they don't all draw at once
                    const delay = (i % 10) * 0.2; 

                    return (
                        <div key={i} className="flex items-center justify-center">
                            <svg viewBox="0 0 100 100" style={iconStyle}>
                                {isCircle ? (
                                    <motion.circle
                                        cx="50" cy="50" r="30"
                                        stroke={color}
                                        variants={draw}
                                        custom={delay}
                                        style={shapeStyle}
                                    />
                                ) : (
                                    <>
                                        <motion.line
                                            x1="30" y1="30" x2="70" y2="70"
                                            stroke={color}
                                            variants={draw}
                                            custom={delay}
                                            style={shapeStyle}
                                        />
                                        <motion.line
                                            x1="30" y1="70" x2="70" y2="30"
                                            stroke={color}
                                            variants={draw}
                                            custom={delay + 0.1}
                                            style={shapeStyle}
                                        />
                                    </>
                                )}
                            </svg>
                        </div>
                    )
                })}
            </motion.div>
        </div>
    )
}

/** * ============== Styles ================ */

const backgroundContainer: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: -1,
    overflow: "hidden",
    backgroundColor: "#050505",
}

const gridStyle: React.CSSProperties = {
    display: "grid",
    // Use auto-fill with a fixed size to keep icons consistent across devices
    gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
    width: "100%",
    height: "100%",
    padding: "10px",
}

const iconStyle: React.CSSProperties = {
    width: "60px", // Fixed size for consistency
    height: "60px",
}

const shapeStyle: React.CSSProperties = {
    strokeWidth: 12, // Thicker stroke looks better on small icons
    strokeLinecap: "round",
    fill: "transparent",
}