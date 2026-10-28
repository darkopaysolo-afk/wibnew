// =============================================
//  WHO INVENTED BITCOIN — main.js
// =============================================

// Mobile nav toggle
function toggleMenu() {
  const nav = document.getElementById('navLinks');
  const btn = document.querySelector('.hamburger');
  const isOpen = nav.classList.toggle('open');
  btn.classList.toggle('is-open', isOpen);
  btn.innerHTML = isOpen ? '✕' : '&#9776;';
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

// Close menu when clicking outside
document.addEventListener('click', function(e) {
  const nav = document.getElementById('navLinks');
  const btn = document.querySelector('.hamburger');
  if (nav && nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) {
    nav.classList.remove('open');
    btn.classList.remove('is-open');
    btn.innerHTML = '&#9776;';
    document.body.style.overflow = '';
  }
});

// Close on escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    const nav = document.getElementById('navLinks');
    const btn = document.querySelector('.hamburger');
    if (nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      btn.classList.remove('is-open');
      btn.innerHTML = '&#9776;';
      document.body.style.overflow = '';
    }
  }
});

// Close mobile menu when a link is clicked
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('navLinks');
      const btn = document.querySelector('.hamburger');
      nav.classList.remove('open');
      if (btn) { btn.classList.remove('is-open'); btn.innerHTML = '&#9776;'; }
      document.body.style.overflow = '';
    });
  });

  // Animate elements on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .fact-item, .suspect-card, .timeline-item, .wp-section, .faq-item, .news-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
});

// FAQ accordion
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
  document.querySelectorAll('.faq-question').forEach(b => b.classList.remove('open'));
  // Open clicked if it was closed
  if (!isOpen) {
    answer.classList.add('open');
    btn.classList.add('open');
  }
}

// Typed effect for hero (homepage only)
const heroTitle = document.querySelector('.glow-text');
if (heroTitle) {
  const text = heroTitle.textContent;
  heroTitle.textContent = '';
  heroTitle.style.borderRight = '2px solid var(--orange)';
  let i = 0;
  const type = () => {
    if (i < text.length) {
      heroTitle.textContent += text[i++];
      setTimeout(type, 80);
    } else {
      setTimeout(() => { heroTitle.style.borderRight = 'none'; }, 600);
    }
  };
  setTimeout(type, 600);
}
