document.addEventListener("DOMContentLoaded", () => {
  initializeLoading()
  initializeNavigation()
  initializeDarkMode() // Fitur Dark Mode
  initializeScrollAnimations()
  initializePortfolioFilter()
  initializeContactForm()
  typeEffect()
  initialize3DTilt()
  initializeScrollProgress()
  initializeAutoDraggableSlider() 
  initializeHeroCanvas() 
})

function initializeLoading() {
  const loadingScreen = document.getElementById("loading-screen")
  window.addEventListener("load", () => {
    setTimeout(() => { loadingScreen.classList.add("fade-out"); setTimeout(() => { loadingScreen.style.display = "none" }, 500) }, 1000)
  })
}

function initializeDarkMode() {
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        if (themeBtn) themeBtn.textContent = '☀️'; 
    }

    if (!themeBtn) return;

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeBtn.textContent = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            themeBtn.textContent = '🌙';
        }
    });
}

function initializeNavigation() {
  const navbar = document.getElementById("navbar");
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  if(!navbar || !hamburger || !navMenu) return; 

  window.addEventListener("scroll", () => { if (window.scrollY > 50) navbar.classList.add("scrolled"); else navbar.classList.remove("scrolled"); });
  hamburger.addEventListener("click", () => { hamburger.classList.toggle("active"); navMenu.classList.toggle("active"); });
  navLinks.forEach((link) => { link.addEventListener("click", () => { hamburger.classList.remove("active"); navMenu.classList.remove("active"); }); });
}

function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {

        if (entry.target.classList.contains('portfolio-item')) {
          if (!entry.target.classList.contains('hidden')) {
            entry.target.classList.add("visible");
          }
        } else {
          entry.target.classList.add("visible");
        }
      } else {
        entry.target.classList.remove("visible"); 
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in").forEach((element) => {
    observer.observe(element);
  });
}

function initializePortfolioFilter() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  if(filterButtons.length === 0) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          item.classList.remove("hidden");
          setTimeout(() => { item.style.display = "block"; setTimeout(() => item.classList.add("visible"), 50) }, 10);
        } else {
          item.classList.add("hidden"); item.classList.remove("visible");
          setTimeout(() => { if (item.classList.contains("hidden")) item.style.display = "none" }, 300);
        }
      })
    })
  })
}

function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const btn = this.querySelector(".submit-button");
      const originalText = btn.textContent;
      btn.textContent = "Sending..."; btn.disabled = true;
      setTimeout(() => { alert("Thank you!"); contactForm.reset(); btn.textContent = originalText; btn.disabled = false; }, 1500);
    })
  }
}

const typingText = document.querySelector(".typing-text");
const words = ["Web Developer", "UI/UX Designer", "Problem Solver"];
let wordIndex = 0; let charIndex = 0; let isDeleting = false;
function typeEffect() {
    if (!typingText) return;
    const currentWord = words[wordIndex];
    if (isDeleting) { charIndex--; typingText.textContent = currentWord.substring(0, charIndex); } 
    else { charIndex++; typingText.textContent = currentWord.substring(0, charIndex); }
    if (!isDeleting && charIndex === currentWord.length) { isDeleting = true; setTimeout(typeEffect, 2000); } 
    else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; setTimeout(typeEffect, 500); } 
    else { setTimeout(typeEffect, isDeleting ? 100 : 200); }
}

function initialize3DTilt() {
  if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".skill-card, .portfolio-item"), { max: 15, speed: 400, glare: true, "max-glare": 0.3, scale: 1.05 });
  }
}

function initializeScrollProgress() {
    const bar = document.createElement('div');
    bar.id = 'scroll-progress';
    Object.assign(bar.style, { position: 'fixed', top: '0', left: '0', height: '4px', backgroundColor: '#007bff', zIndex: '9999', width: '0%', transition: 'width 0.1s' });
    document.body.appendChild(bar);
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        bar.style.width = scrolled + "%";
    });
}

function initializeAutoDraggableSlider() {
  const slider = document.getElementById('cert-slider');
  const track = slider ? slider.querySelector('.slider-track') : null;
  if(!slider || !track) return;

  let isDown = false;
  let startX;
  let scrollLeft;
  let autoSpeed = 0.5; 
  let animationFrameId;

 const autoPlay = () => {
    if (!isDown) {
        slider.scrollLeft += autoSpeed;
        
        // AMBANG BATAS RESET:
        // Kita tambah 300px agar kartu terakhir di Set 1 
        // bener-bener tampil full sebelum balik ke awal.
        const resetPoint = (track.offsetWidth / 2) + 300;
        
        if(slider.scrollLeft >= resetPoint) {
            slider.scrollLeft = 0; 
        }
    }
    animationFrameId = requestAnimationFrame(autoPlay);
  };
  
  animationFrameId = requestAnimationFrame(autoPlay);

  // Event Listeners tetap sama (mousedown, mouseleave, mouseup, mousemove, touchstart, touchend)
  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active'); });
  slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active'); });
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; 
    slider.scrollLeft = scrollLeft - walk;
  });
  slider.addEventListener('touchstart', () => { isDown = true; });
  slider.addEventListener('touchend', () => { isDown = false; });
}

function initializeHeroCanvas() {
    const canvas = document.getElementById("hero-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#007bff', '#4facfe', '#6610f2', '#e83e8c', '#ff5a5f'];

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX - w / 2) * 0.15; 
        mouseY = (e.clientY - h / 2) * 0.15;
    });

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        createParticles();
    });

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.size = Math.random() * 1.5 + 0.5; 
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.depth = Math.random() * 2 + 0.5; 
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < -100) this.x = w + 100;
            if (this.x > w + 100) this.x = -100;
            if (this.y < -100) this.y = h + 100;
            if (this.y > h + 100) this.y = -100;
        }
        draw() {
            let drawX = this.x + (targetX * this.depth);
            let drawY = this.y + (targetY * this.depth);
            ctx.save();
            ctx.translate(drawX, drawY);
            let dx = drawX - w / 2;
            let dy = drawY - h / 2;
            let angle = Math.atan2(dy, dx);
            ctx.rotate(angle);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size * 2, -this.size / 2, this.size * 4, this.size);
            ctx.restore();
        }
    }

    function createParticles() {
        particles.length = 0;
        let count = (w * h) / 7000; 
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    createParticles();
    animate();
}