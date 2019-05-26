class Ticker {
  constructor (duration) {
    this.duration = duration
    this.delta = null
    this.start = null
    this._pause = false
    this.tick = this.tick.bind(this)
  }

  tick (timestamp) {
    if (this._pause) {
      return
    }

    if (!this.start){
      this.start = timestamp
    }

    this.delta = (timestamp - this.start) % (this.duration * 1000)
    const payload = {value: this.delta / 1000 / this.duration}

    const event = new CustomEvent('tick', {detail: payload})

    document.dispatchEvent(event)

    requestAnimationFrame(this.tick)
  }

  play () {
    if (this.start && !this._pause){
      console.warn('Already being played')
      return
    }

    if (this.start && this._pause){
      this.start = performance.now() - this.delta
      this._pause = false
    }

    requestAnimationFrame(this.tick)
  }

  pause () {
    this._pause = true
  }
}

export default Ticker
