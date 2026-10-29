'use strict';
function setMenu(open, restoreFocus = false) {
  const nav = document.getElementById('navLinks');
  const btn = document.querySelector('.hamburger');
  if (!nav || !btn) return;
  nav.classList.toggle('open', open);
  btn.classList.toggle('is-open', open);
  btn.setAttribute('aria-expanded', String(open));
  btn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  btn.textContent = open ? '✕' : '☰';
  document.body.style.overflow = open ? 'hidden' : '';
  if (restoreFocus) btn.focus();
}
function toggleMenu() { setMenu(!document.getElementById('navLinks')?.classList.contains('open')); }
document.addEventListener('click', event => {
  const nav = document.getElementById('navLinks');
  const btn = document.querySelector('.hamburger');
  if (nav?.classList.contains('open') && !nav.contains(event.target) && !btn?.contains(event.target)) setMenu(false);
  if (event.target.closest('#navLinks a')) setMenu(false);
  const link = event.target.closest('a[href]');
  if (!link || typeof window.gtag !== 'function') return;
  const url = new URL(link.href, location.href);
  if (!/^https?:$/.test(url.protocol)) return;
  const internal = url.origin === location.origin;
  window.gtag('event', internal ? 'explore_content' : 'source_click', {
    content_path: internal ? url.pathname : undefined,
    link_domain: internal ? undefined : url.hostname,
    source_page: location.pathname,
    transport_type: 'beacon'
  });
});
document.addEventListener('keydown', event => {
  const nav = document.getElementById('navLinks');
  const btn = document.querySelector('.hamburger');
  if (!nav?.classList.contains('open')) return;
  if (event.key === 'Escape') setMenu(false, true);
  if (event.key === 'Tab') {
    const links = Array.from(nav.querySelectorAll('a[href]'));
    const last = links[links.length - 1];
    if (event.shiftKey && document.activeElement === btn) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); btn?.focus(); }
  }
});
window.matchMedia('(min-width: 1001px)').addEventListener('change', event => { if (event.matches) setMenu(false); });
function toggleFaq(btn) {
  const open = !btn.nextElementSibling.classList.contains('open');
  document.querySelectorAll('.faq-answer').forEach(answer => answer.classList.remove('open'));
  document.querySelectorAll('.faq-question').forEach(question => {
    question.classList.remove('open'); question.setAttribute('aria-expanded', 'false');
  });
  btn.nextElementSibling.classList.toggle('open', open);
  btn.classList.toggle('open', open);
  btn.setAttribute('aria-expanded', String(open));
}
document.querySelectorAll('.faq-question').forEach(btn => btn.setAttribute('aria-expanded', 'false'));
// Headlines and cards remain visible immediately, including with reduced motion or blocked scripts.
