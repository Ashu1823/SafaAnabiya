// Smooth scroll for internal links and form handling (Bootstrap-friendly)
document.addEventListener('DOMContentLoaded', function () {
  // Smooth scroll for internal anchor links
  document.querySelectorAll('a.nav-link[href^="#"], a.btn[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      if (hash && hash.startsWith('#')) {
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Activate Bootstrap ScrollSpy if available
  if (window.bootstrap && bootstrap.ScrollSpy) {
    new bootstrap.ScrollSpy(document.body, { target: '#mainNavbar' });
  }

  // Contact form demo submit with HTML5 validation
  const form = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add('was-validated');
        if (formStatus) formStatus.textContent = 'Please correct the highlighted fields.';
        return;
      }
      if (formStatus) formStatus.textContent = 'Sending...';
      const name = (document.getElementById('name') || {}).value || '';
      setTimeout(function () {
        if (formStatus) formStatus.textContent = 'Message sent (demo only). Thank you' + (name ? ', ' + name : '') + '!';
        form.reset();
        form.classList.remove('was-validated');
      }, 900);
    });
  }
  
  // Intersection Observer to reveal elements with 'will-animate'
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(() => el.classList.add('visible'), delay);
        // start counters
        const counter = el.querySelectorAll ? el.querySelectorAll('.counter') : [];
        counter.forEach(c => startCounter(c));
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.will-animate').forEach(el => observer.observe(el));

  // Counter animation
  function startCounter(el) {
    const target = parseInt(el.getAttribute('data-target') || '0', 10);
    if (isNaN(target) || target <= 0) return;
    const duration = 1400;
    const stepTime = Math.max(20, Math.floor(duration / target));
    let current = 0;
    const increment = Math.ceil(target / (duration / stepTime));
    const t = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(t);
      } else {
        el.textContent = current;
      }
    }, stepTime);
  }

  // Navbar shrink on scroll
  const navbar = document.querySelector('#mainNavbar');
  const hero = document.querySelector('#home');
  function checkNav(){
    const y = window.scrollY;
    // shrink when scrolled down a bit
    if(y > 60) navbar.classList.add('shrink'); else navbar.classList.remove('shrink');

    // make navbar transparent when over the hero section (top area)
    if(!hero) return;
    const heroRect = hero.getBoundingClientRect();
    // heroRect.bottom > navbar height means hero still visible behind nav
    const navHeight = navbar.offsetHeight || 72;
    if(heroRect.bottom > navHeight + 8 && y < 200){
      navbar.classList.add('transparent');
    } else {
      navbar.classList.remove('transparent');
    }
  }
  checkNav();
  window.addEventListener('scroll', checkNav, {passive:true});

  // Simple typed text effect
  const typedEl = document.getElementById('typedText');
  if(typedEl){
    const words = ['skilled technicians','certified engineers','reliable manpower','trained field staff'];
    let w=0, i=0; let forward=true;
    function tick(){
      const word = words[w];
      typedEl.textContent = word.substring(0, i);
      if(forward){ i++; if(i>word.length){ forward=false; setTimeout(tick,1000); return; }} else { i--; if(i<0){ forward=true; w=(w+1)%words.length; setTimeout(tick,300); return; }}
      setTimeout(tick, forward?90:45);
    }
    tick();
  }
});
