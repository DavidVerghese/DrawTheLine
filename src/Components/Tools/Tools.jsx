import './Tools.css';
import DownloadModal from '../DownloadModal/DownloadModal';
import ColorPanel from '../ColorPanel/ColorPanel';
function Tools() {


  
  return <div className="tools">
    <div className="buttons">
      <button id="undo" type="button" className="button">Undo</button>
      <button id="clear" type="button" className="button">Clear</button>
      <button id="download" type="button" className="button">Download</button>
    </div>

    <DownloadModal/>
  
    {/* <ColorPanel/> */}

    {/* <div className="colors">
      <p>Color: </p>
       <div  id="red-color-field" className="color-field" ></div>
<div   id="blue-color-field" className="color-field" ></div>
<div  id="green-color-field" className="color-field" ></div>
<div   id="yellow-color-field" className="color-field"></div>
<p>Custom color: </p>
 <input id="color-picker"  type="color" className="color-picker"/>
      </div> */}
    
    <div className="width">  <p>Brush size: </p> <input type="range" min="1" max="100" id="pen-range" className="pen-range" /></div>
   
</div>
}
export default Tools;