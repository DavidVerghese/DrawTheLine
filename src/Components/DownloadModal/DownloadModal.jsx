import './DownloadModal.css';
import { useEffect, useState } from "react";

function DownloadModal() {

  const [modalIsOpen, setModalIsOpen] = useState(false);
  useEffect(() => { 
    // Based on this: https://www.w3schools.com/howto/howto_css_modals.asp
    const modal = document.getElementById("download-modal");
    const btn = document.querySelector("#download");
    const close = document.getElementsByClassName("close")[0];
    const downloadTitle = document.getElementById("download-title");
    const fileType = document.getElementById("file-type");
    
    btn.onclick = function () {
      modal.style.display = "flex";
      setModalIsOpen(true);
    };

    close.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (modalIsOpen && event.target !== modal &&
        event.target !== btn && event.target !== downloadTitle &&
        event.target !== fileType) {
          modal.style.display = "none";
          setModalIsOpen(false);
      }
    }


  })

  return (
    <div id="download-modal" className="modal">
      <h2>Download your painting</h2>
      <form>
        <label>
          <p>Title: </p>
          <input placeholder="untitled" id="download-title" type="text" name="name" />
        </label>
        <label>
          <p>File type: </p>
          <select id="file-type" name="file-type">
            <option value="png">png</option>
            <option value="jpeg">jpeg</option>
          </select>
        </label>
      </form>
      <button id="start-download">OK</button>
      <button className="close">Close</button>
    </div>)
}
export default DownloadModal;