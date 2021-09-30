//Mouse Magic
const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

const particlesArray = []
let hue = 0

canvas.width = window.innerWidth
canvas.height = window.innerHeight

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

const mouse = {
  x: undefined,
  y: undefined,
}

canvas.addEventListener('click', (event) => {
  mouse.x = event.x
  mouse.y = event.y

  for (let i = 0; i < 2; i++) {
    particlesArray.push(new Particle())
  }
})

canvas.addEventListener('mousemove', (event) => {
  mouse.x = event.x
  mouse.y = event.y

  for (let i = 0; i < 3; i++) {
    particlesArray.push(new Particle())
  }
})

class Particle {
  constructor() {
    this.x = mouse.x
    this.y = mouse.y

    this.size = Math.random() * 15 + 1

    this.speedX = Math.random() * 3 - 1.5
    this.speedY = Math.random() * 3 - 1.5

    this.color = 'hsl(' + hue + ', 100%, 50%)'
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.size > 0.2) this.size -= 0.1
  }

  draw() {
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)

    ctx.fill()
  }
}

function handleParticles() {
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update()
    particlesArray[i].draw()

    for (let j = i; j < particlesArray.length; j++) {
      const dx = particlesArray[i].x - particlesArray[j].x
      const dy = particlesArray[i].y - particlesArray[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 100) {
        ctx.beginPath()
        ctx.strokeStyle = particlesArray[i].color
        ctx.lineWidth = 0.2
        ctx.moveTo(particlesArray[i].x, particlesArray[i].y)
        ctx.lineTo(particlesArray[j].x, particlesArray[j].y)
        ctx.stroke()
        ctx.closePath()
      }
    }
    if (particlesArray[i].size <= 0.3) {
      particlesArray.splice(i, 1)
      i--
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  handleParticles()
  hue += 2
  requestAnimationFrame(animate)
}
animate()
// Mouse Magic End

// Progress Bar
const progress = document.getElementById('progressbar')
let totalHeight = document.body.scrollHeight - window.innerHeight

window.onscroll = () => {
  let progressHeight = (window.pageYOffset / totalHeight) * 100
  progress.style.height = progressHeight + '%'
}

// Progress Bar End

// Navbar
const menuIcon = document.querySelector('.menu-icon')
const navbar = document.querySelector('.navbar')

const scrollFn = () => {
  menuIcon.classList.add('show-menu-icon')
  navbar.classList.add('hide-navbar')

  if (window.scrollY === 0) {
    menuIcon.classList.remove('show-menu-icon')
    navbar.classList.remove('hide-navbar')
  }
}

document.addEventListener('scroll', scrollFn)

menuIcon.addEventListener('click', () => {
  menuIcon.classList.remove('show-menu-icon')
  navbar.classList.remove('hide-navbar')
})
// Navbar End
