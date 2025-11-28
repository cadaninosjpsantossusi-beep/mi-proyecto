const navToggle = document.getElementById('navToggle')
const nav = document.getElementById('nav')
const toast = document.getElementById('toast')
const year = document.getElementById('year')

year.textContent = new Date().getFullYear()

const heroTitle = document.querySelector('.hero-title.wave')
if (heroTitle) {
  const text = heroTitle.textContent
  heroTitle.textContent = ''
  text.split('').forEach(ch => {
    const span = document.createElement('span')
    span.textContent = ch === ' ' ? '\u00A0' : ch
    heroTitle.appendChild(span)
  })
  const spans = Array.from(heroTitle.querySelectorAll('span'))
  const len = spans.length
  const amp = 6
  heroTitle.addEventListener('mousemove', e => {
    const rect = heroTitle.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    spans.forEach((s, i) => {
      const d = i/len - x
      const y = Math.sin(d*12) * amp * Math.exp(-Math.abs(d)*3)
      s.style.transform = `translateY(${y}px)`
    })
  })
  heroTitle.addEventListener('mouseleave', () => {
    spans.forEach(s => { s.style.transform = 'translateY(0)' })
  })
}

navToggle.addEventListener('click', () => {
  nav.classList.toggle('open')
})

document.querySelectorAll('.add-btn').forEach(b => {
  b.addEventListener('click', () => {
    const item = b.getAttribute('data-item')
    showToast(`${item} añadido al pedido`)
  })
})

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault()
  const data = new FormData(e.target)
  const nombre = data.get('nombre')
  showToast(`Gracias, ${nombre}`)
  e.target.reset()
})

function showToast(message) {
  toast.textContent = message
  toast.classList.add('show')
  setTimeout(() => toast.classList.remove('show'), 2200)
}