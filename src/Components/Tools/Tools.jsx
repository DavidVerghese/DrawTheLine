import './Tools.css';
function Tools() {
  return <div className="tools">
  <button id="undo" type="button" className="button">Undo</button>
  <button id="clear" type="button" className="button">Clear</button>

      
      <div  id="red-color-field" className="color-field" style={{ background: 'red' }}></div>
<div   id="blue-color-field" className="color-field" style={{ background: 'blue' }}></div>
<div  id="green-color-field" className="color-field" style={{ background: 'green' }}></div>
<div   id="yellow-color-field" className="color-field" style={{ background: 'yellow' }}></div>

  <input id="color-picker"  type="color" className="color-picker"/>
  <input  type="range" min="1" max="100" id="pen-range" className="pen-range" />
</div>
}
export default Tools;