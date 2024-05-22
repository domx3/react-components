# ResizableGridBox

## Install

1. Create a folder inside your project src
2. Copy all the files (_ResizableBox.jsx_, _ResizableContainer.jsx_ and _resizable.css_) into the folder you created

Besides react, no other dependencies are needed.

## How to use

First you need to import the components.  

```javascript
import ResizableContainer from './PATH/ResizableContainer'
import ResizableBox from './PATH/ResizableBox'
```
_Set __PATH__ to the folder where you put the files._

Now you can use the components like so:

```javascript
      <ResizableContainer
        editResize={true}
      >
        <ResizableBox> Box1 content </ResizableBox>
        <ResizableBox style={{backgroundColor:'aliceblue',}}> Box2 </ResizableBox>
        <ResizableBox className="my-class"> box3 </ResizableBox>
      </ResizableContainer>
```

### Props

- __editResize__ is a boolean that enables or disables the boxes to be resized. You can use a variable to toggle it on or off.
- you can also add html attributes style and className
