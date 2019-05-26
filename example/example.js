import Ticker from '../Ticker'

document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('input[type="range"')
  const container = document.querySelector('.container')

  // const setUpButton = document.querySelector('button.setup')
  // setUpButton.addEventListener('click', setUp)

  const canvas = document.querySelector('canvas.main')
  const durationInput = document.querySelector('input.duration')
  const renderButton = document.querySelector('button.render')

  slider.addEventListener('change', ({target:{value}}) => {
    const event = new CustomEvent('tick', {detail: {value: Number(value)/Number(slider.max)}})

    document.dispatchEvent(event)
  })

  document.addEventListener('tick', ({detail:{value}}) => {
    const max = Number(slider.max)
    const newValue = String(value * max)

    slider.value = newValue
  })


  const clock = new Ticker()
  const playButton = document.querySelector('button.play')
  playButton.addEventListener('click', () => clock.play())

  const pauseButton = document.querySelector('button.pause')
  pauseButton.addEventListener('click', () => clock.pause())


  const animations = []
  const figures = {
    cubes: []
  }

  function createCube() {
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshPhongMaterial({ color:0x00fffc,side:THREE.DoubleSide});
    const cube = new THREE.Mesh( geometry, material );

    figures.cubes.push(cube)

    return cube
  }

  function addCube(scene){
    const cube = createCube()

    scene.add(cube)

    return cube
  }

  function setUp(){
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xFFFFFF )

    const camera = new THREE.PerspectiveCamera( 75, 1, 0.1, 1000 );
    camera.position.set( 0, 0, 5 )

    const light = new THREE.SpotLight( 0xFFFFFF, 1)
    light.position.set(100, 100, 100)
    scene.add(light)

    stats = new Stats()
    stats.dom.style.right = 0
    stats.dom.style.left = 'auto'
    document.body.appendChild(stats.dom)

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true
    })
    // renderer.setSize(600, 600);

    const cube = addCube(scene)


    function render() {
      renderer.render(scene, camera);
      stats.update()
    }

    function rotate2times(cube, axis = 'x') {
      let enabled = true

      return {
        get enabled() {
          return enabled
        },
        enable () {
          enabled = true
        },
        disable () {
          enabled = false
        },
        update (ratio) {
          const twoTimes = (Math.PI * 2) * 2
          this.enabled = true

          cube.rotation[axis] = twoTimes * ratio
        }
      }
    }

    animations.push(rotate2times(cube))
    animations.push(rotate2times(cube, 'y'))
    console.log(animations)

    document.addEventListener('tick', ({detail:{value}}) => {
      animations.forEach(animation => {
        if (animation.enabled) {
          animation.update(value)
        }
      })

      render()
    })

    render()

    renderButton.addEventListener('click', render)
  }

  setUp()
})

