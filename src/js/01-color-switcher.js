function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const buttonStart = document.querySelector('button[data-start]')
const buttonStop = document.querySelector('button[data-stop]')

let timerId = null;
buttonStop.setAttribute('disabled', true)

function startBtnClick() {
    buttonStart.setAttribute('disabled', true)
    buttonStop.removeAttribute('disabled')
    timerId = setInterval(() => {
        const color = getRandomHexColor();
        document.body.style.background = color;
        console.log(color);
    }, 1000)
    
}
buttonStart.addEventListener('click', startBtnClick)
function stopBtnClick() {
    buttonStart.removeAttribute('disabled');
    clearInterval(timerId);
    buttonStop.setAttribute('disabled', true)
}
buttonStop.addEventListener('click', stopBtnClick)
