import React, { createContext, useEffect, useRef, useState } from 'react'
import "./resizable.css"

export const ResizeContext = createContext()

export default function ResizableContainer({ children, editResize }) {

  const [isResizing, setIsResizing] = useState(false)
  const isResizingRef = useRef(isResizing)
  const [resizedBox, setResizedBox] = useState()
  const resizedBoxRef = useRef(resizedBox)
  const [resizeOffset, setResizeOffset] = useState(0)
  const resizeOffsetRef = useRef(resizeOffset)

  useEffect(() => {
    resizedBoxRef.current = resizedBox;
  }, [resizedBox])
  useEffect(() => {
    isResizingRef.current = isResizing;
  }, [isResizing])
  useEffect(() => {
    resizeOffsetRef.current = resizeOffset;
  }, [resizeOffset])


  useEffect(()=> {

    const handlePointerUp = () => {
      setIsResizing('none')
    }
  
    const handlePointerMove = (event) => {
      
      if(isResizingRef.current === 'east') {
        const xChange = event.clientX - resizeOffsetRef.current
        if(xChange > 100) {
          resizedBoxRef.current.style.gridColumn = `1 / span 2`;
          setResizeOffset(event.clientX)
        }
        else if(xChange < -100) {
          resizedBoxRef.current.style.gridColumn = `1 / span 1`
          setResizeOffset(event.clientX)
        }
      }

      if(isResizingRef.current === 'south') {
        const yChange = event.clientY - resizeOffsetRef.current
        if(yChange > 50) {
          resizedBoxRef.current.style.gridRow = `span 2`;
          setResizeOffset(event.clientX)
        }
        else if(yChange < -50) {
          resizedBoxRef.current.style.gridRow = `span 1`
          setResizeOffset(event.clientY)
        }
      }
      
    }

    window.addEventListener('pointerup', handlePointerUp )
    window.addEventListener('pointermove', handlePointerMove)
    
    return () => {
      window.removeEventListener('pointerup', handlePointerUp )
      window.removeEventListener('pointermove', handlePointerMove)
    }
  },[])

  return (
    <ResizeContext.Provider value={{editResize, setResizeOffset, isResizing, setIsResizing, resizedBox, setResizedBox}}>
      <div
        className='resizableComponents-container'
        >
      
        { children }
      
      </div>
    </ResizeContext.Provider>
  )
}
