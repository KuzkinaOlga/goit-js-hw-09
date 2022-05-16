import { Notify } from 'notiflix/build/notiflix-notify-aio'

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
    if (shouldResolve) {
    resolve(`Fulfilled promise ${position} in ${delay}ms`)
  } else {
    reject(`Rejected promise ${position} in ${delay}ms`)
  }
  }, delay)
 })
}

const formRef = document.querySelector('.form')
function handleFormSubmit(evente) {
  evente.preventDefault();
  const { delay, step, amount } = evente.currentTarget;
  let delayPromise = Number(delay.value)
  for (let i = 1; i <= amount.value; i += 1){
    createPromise(i, delayPromise).then(onResolved).catch(onRejected)
    delayPromise += Number(step.value)
  }
  evente.currentTarget.reset()
}
formRef.addEventListener('submit', handleFormSubmit)
function onResolved(result) {
 Notify.success(result)

}
function onRejected(result) {
  Notify.failure(result)
}