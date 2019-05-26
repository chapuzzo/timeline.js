class Ticker {
  constructor () {
    this.start_ = null
    this.pause_ = null
  }

  play () {
    if (this.start_){
      return
    }

    if (this.pause_) {
      // this.start_ = performance.now()
      this.pause_ = null
    }

    this.start_ = performance.now()

    const tick = timestamp => {
      if (this.pause_){
        return
      }

      const duration = Number(durationInput.value)
      const delta = (timestamp - this.start_) / 1000 % duration

      const event = new CustomEvent('tick', {detail: {value: delta / duration}})

      document.dispatchEvent(event)

      requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }

  pause () {
    this.pause_ = performance.now()
    this.start_ = null
  }
}
