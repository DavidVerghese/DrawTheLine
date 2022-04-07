import { useEffect } from "react";
import './Canvas.css';
import ColorPanel from "../ColorPanel/ColorPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPaintBrush, faPaintRoller, faBrush } from "@fortawesome/free-solid-svg-icons"

function Canvas() {

  useEffect(() => { 
    const canvas = document.getElementById("canvas");
    const smallPaintbrush = document.querySelector('#small-paintbrush');
    const mediumPaintbrush = document.querySelector('#medium-paintbrush');
    const largePaintbrush = document.querySelector('#large-paintbrush')
    const paintroller = document.querySelector('#paintroller');
    const smallPaintbrushCursor = document.querySelector('#small-paintbrush-cursor');
    const mediumPaintbrushCursor = document.querySelector('#medium-paintbrush-cursor');
    const largePaintbrushCursor = document.querySelector('#large-paintbrush-cursor')
    const paintrollerCursor = document.querySelector('#paintroller-cursor');
    let mouseCursor = document.querySelector(".cursor");
    const clearButton = document.querySelector('#clear');
    const undoButton = document.querySelector('#undo');
    const downloadModal = document.querySelector('#download-modal');
    const downloadTitle = document.querySelector('#download-title');
    const fileTypeInput = document.querySelector('#file-type');
    const startDownload = document.querySelector('#start-download');
    const redColorField = document.querySelector('#red-color-field');
    const blueColorField = document.querySelector('#blue-color-field');
    const yellowColorField = document.querySelector('#yellow-color-field');
    const greenColorField =  document.querySelector('#green-color-field')
    const colorPicker = document.querySelector('#color-picker');
    
    function determineCanvasWidth(width) {
      if (width > 1000) {
        return 0.9
      }
      else if (width > 800) {
        return 0.85
      }
      else if (width > 500) {
        return 0.77
      }
      else if (width > 400) {
        return 0.75
      }
      else if (width > 300) {
        return 0.7
      }
      else {
        return 0.6;
      }
    }

    let canvasWidth = window.outerWidth * determineCanvasWidth(window.outerWidth);
    let canvasHeight = window.outerHeight * 0.6;
    let width = "2";
    let color = 'gray';
    let title = 'untitled';
    let fileType = 'png';
    const background = new Image();
    let draw_color = color;
    let draw_width = width;
    let is_drawing = false;
    let restore_array = [];
    let index = -1;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    let context = canvas.getContext("2d");
    context.fillRect(0, 0, canvas.width, canvas.height);
    background.src = require("../../Pictures/Canvas.jpeg");
    background.setAttribute('crossOrigin', '');
    mouseCursor.style.color = color;

    background.onload = function () {
      context.drawImage(background, 0, 0);
    }

    function start(event, x, y) {
      is_drawing = true;
      context.beginPath();
      context.moveTo(x - canvas.offsetLeft, y - canvas.offsetTop);
      event.preventDefault(); 
    }

    function draw(event, x, y) {
      draw_color = color;
      draw_width = width;
      if (is_drawing) {
        context.lineTo(x - canvas.offsetLeft, y - canvas.offsetTop);
        context.strokeStyle = draw_color;
        context.lineWidth = draw_width;
        context.lineCap = "round";
        context.lineJoin = "round";
        context.stroke();
      }
    };

    function stopDrawing(event) {
      if (is_drawing) {
        context.stroke();
        context.closePath();
        is_drawing = false;
      }
      event.preventDefault();
      restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
      index += 1;
    }

    function clear_canvas() {
      const background = new Image();
      background.src = "https://images.unsplash.com/photo-1612538498613-35c5c8d675c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80";
      background.setAttribute('crossOrigin', '');
      background.onload = function(){
        context.drawImage(background,0,0);   
      }
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillRect(0, 0, canvas.width, canvas.height);
      restore_array = [];
      index = -1;
    }

    function undo_last() {
      if (index <= 0) {
        clear_canvas();
      } else {
        index -= 1;
        restore_array.pop();
        context.putImageData(restore_array[index],0,0)
      }
    }

    const switchCursorType = (paintbrushKey) => {
      const paintbrushes = [smallPaintbrushCursor, mediumPaintbrushCursor, largePaintbrushCursor, paintrollerCursor];
      const paintbrushIcons = [smallPaintbrush, mediumPaintbrush, largePaintbrush, paintroller];
      paintbrushes.map((index, key) => key === paintbrushKey ? paintbrushes[key].style.display = 'flex' : paintbrushes[key].style.display = 'none');
      paintbrushes.map((index, key) => key === paintbrushKey ? paintbrushIcons[key].style = 'outline: 1px dotted black' : paintbrushIcons[key].style = 'outline: 0px dotted black');
    };

    function cursor(e) {
     mouseCursor.style.top = e.pageY + 'px';
     mouseCursor.style.left = e.pageX + 'px';
    }

    function download() {  
      var link = document.createElement('a');
      link.download = title;
      link.href = canvas.toDataURL(`image/${fileType}`)
      link.click();
    }

    canvas.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      start(e, touch.pageX, touch.pageY)
    }, false);
    canvas.addEventListener("touchmove", (e) => {
      const touch = e.touches[0];
      draw(e, touch.pageX, touch.pageY);
    }, { passive: false });
    canvas.addEventListener("mouseenter", () => mouseCursor.style.display = "flex", false);
    canvas.addEventListener("mousedown", (e) => start(e, e.clientX, e.clientY), false);
    canvas.addEventListener("mousemove", (e) => draw(e, e.clientX, e.clientY), false);
    canvas.addEventListener("touchend", stopDrawing, false);
    canvas.addEventListener("mouseup", stopDrawing, false);
    canvas.addEventListener("mouseout", stopDrawing, false);
    canvas.addEventListener("mouseout", () => mouseCursor.style.display = "none", false);
    clearButton.addEventListener("click", clear_canvas);
    undoButton.addEventListener("click", undo_last);
    
    if (downloadModal) {
      downloadTitle.addEventListener("input", (e) => title = e.target.value);
      fileTypeInput.addEventListener('change', (e) => fileType = e.target.value)
      startDownload.addEventListener("click", download);
    };

    redColorField.addEventListener("click", () => {
      color = 'red';
      mouseCursor.style.color = color;
    })
    blueColorField.addEventListener("click", () => {
      color = 'blue';
      mouseCursor.style.color = color;
    })
    greenColorField.addEventListener("click", () => {
      color = 'green';
      mouseCursor.style.color = color;
    })
    yellowColorField.addEventListener("click", () => {
      color = 'yellow';
      mouseCursor.style.color = color;
    })
    colorPicker.addEventListener("input", (e) => {
      color = e.target.value;
      mouseCursor.style.color = color;
    })
    smallPaintbrush.addEventListener("click", (e) => {
      width = 2;
      switchCursorType(0);
    });
    mediumPaintbrush.addEventListener("click", (e) => {
      width = 15;
      switchCursorType(1);
    });
    largePaintbrush.addEventListener("click", (e) => {
      width = 40;
      switchCursorType(2);
    });
    paintroller.addEventListener("click", (e) => {
      width = 70;
      switchCursorType(3);
    });
    window.addEventListener('mousemove', cursor); 
  })

  return (
    <div className="canvas-container">
      <ColorPanel />
      <div className="cursor">
        <FontAwesomeIcon id="small-paintbrush-cursor" className="fa fa-paint-brush" icon={faPaintBrush} />
        <FontAwesomeIcon id="medium-paintbrush-cursor" className="fa fa-paint-brush" icon={faPaintBrush} />
        <FontAwesomeIcon id="large-paintbrush-cursor" className="fa fa-paint-brush" icon={faBrush} />
        <FontAwesomeIcon id="paintroller-cursor" className="fa fa-paint-brush" icon={faPaintRoller} />
      </div>
      <canvas id="canvas"></canvas>
    </div>) 
}
export default Canvas;