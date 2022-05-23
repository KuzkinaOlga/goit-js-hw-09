import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from "notiflix";

const btnStartRef = document.querySelector('button[data-start]');
const inputRef = document.querySelector('#datetime-picker');
const dayRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutsRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

btnStartRef.setAttribute('disabled', true)
let userData = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {

      if (selectedDates[0] < Date.now()) {
    Notify.failure('Please choose a date in the future')
    return
      }
      userData = selectedDates[0]; 
      btnStartRef.removeAttribute('disabled')
  },
};

flatpickr(inputRef, options)

btnStartRef.addEventListener('click', () => {
    inputRef.setAttribute('disabled', true)
    btnStartRef.setAttribute('disabled', true)

    const timeId = setInterval(() => {
        // convertMs(userData - Date.now())
        let leftTime = userData - Date.now();
        if (leftTime <= 1000) {
            clearInterval(timeId)
            btnStartRef.removeAttribute('disabled')
            inputRef.removeAttribute('disabled')
            Notify.success('Super!!')
        }
        const { days, hours, minutes, seconds } = convertMs(leftTime);
        secondsRef.textContent = addLeadingZero(seconds) ;
        minutsRef.textContent = addLeadingZero(minutes);
        hoursRef.textContent = addLeadingZero(hours);
        dayRef.textContent = addLeadingZero(days);
    }, 1000);
})

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, 0)
      
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

