const canvas = document.querySelector("canvas");

const input1 = document.getElementById("topLineText");
const input2 = document.getElementById("bottomLineText");
const fileInput = document.getElementById("file");
const button = document.getElementById("saveBtn");

let topLineText = "";
let bottomLineText = "";

input1.addEventListener("input", textChangeListener);
input2.addEventListener("input", textChangeListener);

fileInput.addEventListener("change", handleFileSelect);
button.addEventListener("click", saveFile);

/* Getting the texts from the Input fileds */

function textChangeListener(evt) {
  let id = evt.target.id;
  let text = evt.target.value;
  if (id === "topLineText") {
    topLineText = text;
  } else {
    bottomLineText = text;
  }
  drawMeme(window.image, topLineText, bottomLineText);
}

/* Drawing the Input Texts in the Canvas */

function drawMeme(img, topLine, bottomLine) {
  if (canvas.getContext) {
    let ctx = canvas.getContext("2d");
    if (img != null) {
      ctx.drawImage(img, 0, 0, canvas.height, canvas.width);
      ctx.textAlign = "center";
      ctx.font = "30pt Impact";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.fillStyle = "white";

      if (topLine != null) {
        ctx.fillText(topLine, canvas.width / 2, 40);
        ctx.strokeText(topLine, canvas.width / 2, 40);
      }
      if (bottomLine != null) {
        ctx.fillText(bottomLine, canvas.width / 2, canvas.height - 20);
        ctx.strokeText(bottomLine, canvas.width / 2, canvas.height - 20);
      }
    }
  }
}

/* Getting the seletcted input image to the canvas */

function handleFileSelect(evt) {
  let file = evt.target.files[0];

  let reader = new FileReader();
  reader.onload = function(fileObj) {
    let data = fileObj.target.result;

    let img = document.createElement("img");
    img.onload = function() {
      window.image = img;
      drawMeme(window.image, null, null);
    };
    //setting the source image data to background image;
    img.src = data;
  };
  //garbs the graphical data of the canvas in whole
  reader.readAsDataURL(file);
}

/* Set the canvas as an image to download */
function saveFile() {
  canvas.toDataURL();
  input1.value = "";
  input2.value = "";
  let popup = document.getElementById("success");
  popup.style.display = "block";
  setInterval(function() {
    popup.style.display = "none";
  }, 4000);
}
