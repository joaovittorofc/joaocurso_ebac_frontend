"use client"

import { useEffect, useState } from "react"

export default function MouseGlow() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Don't render anything during SSR
  if (!isMounted) {
    return null
  }

  return (
    <div
      className="fixed pointer-events-none z-0 opacity-20 transition-all duration-100 ease-out"
      style={{
        left: mousePosition.x - 200,
        top: mousePosition.y - 200,
        width: 400,
        height: 400,
        background:
          "radial-gradient(circle, rgba(160, 196, 255, 0.3) 0%, rgba(160, 196, 255, 0.1) 30%, transparent 70%)",
        borderRadius: "50%",
      }}
    />
  )
}
