import './vant'

window.onload = () => {
  document.addEventListener('touchstart', event => {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  let lastTouchEnd = 0
  document.addEventListener(
    'touchend',
    event => {
      const now = new Date().getTime()
      if (now - lastTouchEnd <= 200) {
        event.preventDefault()
      }
      lastTouchEnd = now
    },
    false
  )
  document.addEventListener('gesturestart', event => {
    event.preventDefault()
  })
}
