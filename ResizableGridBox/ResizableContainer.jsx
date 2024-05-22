import React, { createContext, useEffect, useRef, useState } from 'react'
import "./resizable.css"

export const ResizeContext = createContext()

const getSpanValue = (spanString) => {
  console.log(spanString)
  if (!spanString) return 1
  return parseInt(spanString.split(' ')[1], 10);
};

export default function ResizableContainer({ children, editResize }) {

  const [isResizing, setIsResizing] = useState(false)
  const isResizingRef = useRef(isResizing)
  const [resizedBox, setResizedBox] = useState()
  const resizedBoxRef = useRef(resizedBox)
  const [resizeOffset, setResizeOffset] = useState(0)
  const resizeOffsetRef = useRef(resizeOffset)
  const maxColSpan = 3
  const maxRowSpan = 3

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
          const colSpan = getSpanValue(resizedBoxRef.current.style.gridColumn);
          if (colSpan < maxColSpan) {
            resizedBoxRef.current.style.gridColumn = `span ${colSpan + 1}`;
          }
          setResizeOffset(event.clientX)
        }
        else if(xChange < -100) {
          const colSpan = getSpanValue(resizedBoxRef.current.style.gridColumn);
          if (colSpan > 1) {
            resizedBoxRef.current.style.gridColumn = `span ${colSpan - 1}`;
          }
          setResizeOffset(event.clientX)
        }
      }

      if(isResizingRef.current === 'south') {
        
        const yChange = event.clientY - resizeOffsetRef.current
        
        if(yChange > 50) {
          const rowSpan = getSpanValue(resizedBoxRef.current.style.gridRow);
          if (rowSpan < maxRowSpan) {
            resizedBoxRef.current.style.gridRow = `span ${rowSpan + 1}`;
          }
          setResizeOffset(event.clientX)
        }
        else if(yChange < 50) {
          const rowSpan = getSpanValue(resizedBoxRef.current.style.gridRow);
          if (rowSpan > 1) {
            resizedBoxRef.current.style.gridRow = `span ${rowSpan - 1}`;
          }
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
