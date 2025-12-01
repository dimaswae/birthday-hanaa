// js/script.js
// DOM Elements
const letterOverlay = document.getElementById("letterOverlay")
const mainContent = document.getElementById("mainContent")
const openGiftBtn = document.getElementById("openGiftBtn")
const envelopeBody = document.querySelector(".envelope-body")
const letterCard = document.querySelector(".letter-card")
const bgMusic = document.getElementById("bgMusic")
const musicBtn = document.getElementById("musicBtn")
const musicIcon = document.querySelector(".music-icon")

let isMusicPlaying = false

// ==================== LETTER OPENING SEQUENCE ====================
// Click on envelope to start opening
envelopeBody.addEventListener("click", () => {
  if (!letterCard.classList.contains("hidden")) return
  letterCard.classList.remove("hidden")
  playMusic()
})

// Open Gift Button
openGiftBtn.addEventListener("click", () => {
  letterOverlay.classList.add("hidden")
  mainContent.classList.remove("hidden")
  triggerAllAnimations()
})

// Auto-trigger letter after 2.5 seconds
setTimeout(() => {
  letterCard.classList.remove("hidden")
  playMusic()
}, 2500)

// ==================== MUSIC CONTROL ====================
function playMusic() {
  if (!isMusicPlaying) {
    bgMusic.play().catch((err) => {
      console.log("Music play error:", err)
    })
    isMusicPlaying = true
    updateMusicButton()
  }
}

function toggleMusic() {
  if (isMusicPlaying) {
    bgMusic.pause()
    isMusicPlaying = false
  } else {
    playMusic()
  }
  updateMusicButton()
}

function updateMusicButton() {
  musicIcon.textContent = isMusicPlaying ? "🔊" : "🔇"
}

musicBtn.addEventListener("click", toggleMusic)

// ==================== ANIMATIONS ====================
function triggerAllAnimations() {
  createSparkles("sparklesHero")
  createSparkles("sparklesUcapan")
  createConfetti()
  createHeartParticles()
  observeSections()
}

// Create sparkles animation
function createSparkles(containerId) {
  const container = document.getElementById(containerId)
  if (!container) return

  for (let i = 0; i < 20; i++) {
    const sparkle = document.createElement("div")
    sparkle.className = "sparkle"
    sparkle.innerHTML = "✨"

    const x = Math.random() * 100
    const y = Math.random() * 100
    const delay = Math.random() * 2
    const duration = 2 + Math.random() * 2

    sparkle.style.left = x + "%"
    sparkle.style.top = y + "%"
    sparkle.style.animationDelay = delay + "s"
    sparkle.style.animationDuration = duration + "s"

    container.appendChild(sparkle)
  }
}

// Create confetti animation
function createConfetti() {
  const container = document.getElementById("confetti")
  if (!container) return

  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div")
    confetti.className = "confetti"
    confetti.innerHTML = ["🎉", "🎈", "✨", "💖", "🎂"][Math.floor(Math.random() * 5)]

    const x = Math.random() * 100
    const delay = Math.random() * 0.5
    const duration = 3 + Math.random() * 2
    const rotate = Math.random() * 360

    confetti.style.left = x + "%"
    confetti.style.top = "-10px"
    confetti.style.animationDelay = delay + "s"
    confetti.style.opacity = "0.8"

    const animation = `
            @keyframes confetti${i} {
                0% {
                    opacity: 1;
                    transform: translateY(0) rotate(0deg);
                }
                100% {
                    opacity: 0;
                    transform: translateY(${window.innerHeight + 100}px) rotate(${rotate}deg);
                }
            }
        `

    const style = document.createElement("style")
    style.innerHTML =
      animation + ` .confetti-${i} { animation: confetti${i} ${duration}s linear ${delay}s forwards !important; }`
    document.head.appendChild(style)

    confetti.className = "confetti confetti-" + i
    container.appendChild(confetti)
  }
}

// Create heart particles
function createHeartParticles() {
  const container = document.getElementById("heartParticles")
  if (!container) return

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.innerHTML = "💖"

    const x = Math.random() * 100
    const y = Math.random() * 100
    const delay = Math.random() * 2
    const duration = 3 + Math.random() * 2

    particle.style.left = x + "%"
    particle.style.top = y + "%"
    particle.style.opacity = "0.6"

    const animation = `
            @keyframes float${i} {
                0% {
                    opacity: 0;
                    transform: translateY(0) scale(0.5);
                }
                50% {
                    opacity: 0.8;
                }
                100% {
                    opacity: 0;
                    transform: translateY(-100px) scale(1);
                }
            }
        `

    const style = document.createElement("style")
    style.innerHTML =
      animation + ` .particle-${i} { animation: float${i} ${duration}s ease-out ${delay}s forwards !important; }`
    document.head.appendChild(style)

    particle.className = "particle particle-" + i
    container.appendChild(particle)
  }
}

// Observe sections for fade-in text animation
function observeSections() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fadeTexts = entry.target.querySelectorAll(".fade-in-text")
          fadeTexts.forEach((text, index) => {
            setTimeout(() => {
              text.style.animation = "fadeIn 0.8s ease forwards"
              text.style.opacity = "1"
            }, index * 200)
          })
        }
      })
    },
    { threshold: 0.5 },
  )

  document.querySelectorAll(".section").forEach((section) => {
    observer.observe(section)
  })
}

// Smooth scroll for different browsers
document.addEventListener(
  "wheel",
  (e) => {
    if (letterOverlay.classList.contains("active") || letterOverlay.classList.contains("hidden")) {
      // Allow normal scrolling
    }
  },
  { passive: true },
)

// Mobile touch swipe support
let touchStartY = 0
let touchEndY = 0

document.addEventListener(
  "touchstart",
  (e) => {
    touchStartY = e.changedTouches[0].screenY
  },
  false,
)

document.addEventListener(
  "touchend",
  (e) => {
    touchEndY = e.changedTouches[0].screenY
    handleSwipe()
  },
  false,
)

function handleSwipe() {
  // Basic swipe detection (for future enhancements)
}

// Reload animation on page load
window.addEventListener("load", () => {
  createSparkles("sparklesHero")
  createSparkles("sparklesUcapan")
})

console.log("🎂 Birthday website loaded! Happy Birthday Hana! 🎂")