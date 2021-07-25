import { getSocket } from "./sockets";

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const mode = document.getElementById("jsMode");
const controls = document.getElementById("jsControls");

// 기본 컬러  stroke & fill
const INITIAL_COLOR = "#2c2c2c";

// pixel manipulating size : pixel modifier에 사이즈를 줌 /
canvas.width = 500;
canvas.height = 500;

// default color of canvas
ctx.fillStyle = "white";
ctx.fillRect(0,0,1200,700);
//default 선의 기본값 색상 & 라인 두께
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;


const beginPath = (x,y) => {
  ctx.beginPath(); //path를 생성한다
  ctx.moveTo(x, y); // 마우스가 있는 쪽으로 path를 움직인다
};

const strokePath = (x,y, color = null) => {
  let currentColor = ctx.strokeStyle;
  if(color !== null) {
    ctx.strokeStyle = color;
  }
  ctx.lineTo(x, y); //마지막 지점과 전 지점을 연결한다 -MDN
  ctx.stroke(); // 선을 긋는다
  ctx.strokeStyle = currentColor;
}

//마우스가 움직이는 내내 발생
function onMouseMove(event) {
  // canvas 안의 위치를 잡기 위해 offsetx , offsety를 저장한다
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    beginPath(x,y);
    getSocket().emit(window.globalobject.beginPath, {x, y});
  } else if(!filling){
    strokePath(x,y);
    getSocket().emit(window.globalobject.strokePath, {x, y, color: ctx.strokeStyle})
  }
}

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function handleColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color; // overwrite default stroke style
  ctx.fillStyle = ctx.strokeStyle; // fill 값에도 같은 color를 적용
}


// Fill & Paint Mode button text change
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

const fill = (color = null)=> {
  let currentColor = ctx.fillStyle;
  if(color !== null) {
    ctx.fillStyle = color;
  }
  ctx.fillRect(0, 0, 1200, 700); // set to pixel manipulating size  
  ctx.fillStyle = currentColor;
}

// canvas click for Fill
function handleCanvasClick() {
  if (filling) {
    fill();
    getSocket().emit(window.globalobject.fill, {color: ctx.fillStyle})
  }; 
}

// 이미지 우 클릭 저장 방지 함수 
function contextMU(event){
  event.preventDefault();
}


// Color Change Event Listner
Array.from(color).forEach((color) =>
  color.addEventListener("click", handleColor)
);


// Button jsMode :: event Listenr
if (mode) {
  mode.addEventListener("click", handleModeClick);
}


// when someone beganPath
export const handleBeganPath = ({x,y}) => {
  return beginPath(x, y);
}

export const handleStrokedPath = ({x,y, color}) => {
  return strokePath(x, y, color);
}

export const handleFilled = ({color}) => {
  return fill(color);
}

export const resetCanvas = () => {
  return fill("#fff")
};

export const disableCanvas = () => {
  canvas.removeEventListener("mousemove", onMouseMove);
  canvas.removeEventListener("mousedown", startPainting);
  canvas.removeEventListener("mouseup", stopPainting);
  canvas.removeEventListener("mouseleave", stopPainting);
  canvas.removeEventListener("click", handleCanvasClick);
}

export const enableCanvas = () => {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}


export const hideControls = () => (controls.style.opacity = 0);

export const showControls = () => (controls.style.opacity = 1);

if (canvas) {
  canvas.addEventListener("contextmenu", contextMU);
  hideControls();
}
