import React, { useContext, useEffect, useRef, useState } from 'react'
import { ResizeContext } from './ResizableContainer';

const isResizingValues = {
  'resizeBox-east': 'east', 
  'resizeBox-south': 'south' 
}

export default function ResizableBox(props) {

  const {editResize, setResizeOffset, isResizing, setIsResizing, setResizedBox} = useContext(ResizeContext)
  const [thisResizing, setThisResizing] = useState(false);
  const resizableRef = useRef(null);

  const boxStyle = { 
    borderColor: editResize && thisResizing ? 'red' : 'blue',
    borderWidth: editResize ? '2px' : '0px'
  }

  useEffect(() => {
    if(isResizing === 'none')
      setThisResizing(false);
  }, [isResizing])

  useEffect(()=>{
    if(props.style)
      console.log("props style set")
  }, [])

  const combinedStyle = {...boxStyle, ...props.style}
  const combinedClass = props.className ? props.className + " resizableBox" : "resizableBox"

  const handleMouseDown = (event) => {
    
    setThisResizing(true)
    
    const isResizingVal = isResizingValues[event.target.className]
    setIsResizing(isResizingVal)
    
    setResizedBox(resizableRef.current)
    
    let offsetVal = isResizingVal === 'east' ? event.clientX : 0
    offsetVal = isResizingVal === 'south' ? event.clientY : offsetVal
    setResizeOffset(offsetVal)

  };
  

  return (
    <div
      className={combinedClass}
      ref={resizableRef}
      
      style={combinedStyle}
      >
      {editResize &&
      <>
        <div className='resizeBox-east'
          onMouseDown={handleMouseDown}
        ></div>
        
        <div className='resizeBox-south'
        onMouseDown={handleMouseDown}
        ></div>
      </>
    }

      { props.children }
      
    </div>
  )
}
