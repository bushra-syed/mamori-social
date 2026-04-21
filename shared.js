// Nav scroll state
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// Mobile nav
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileClose = document.getElementById('mobileClose');
if (hamburger && mobileNav) {
  hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
  mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => mobileNav.classList.remove('open'));
  });
}

// FAQ accordion
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

// Contact form — works with Formspree or shows success if not yet set up
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async function (e) {
    const action = form.getAttribute('action') || '';
    const btn = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('formSuccess');

    if (action.includes('YOUR_FORM_ID')) {
      // Formspree not yet configured — prevent submission and show message
      e.preventDefault();
      btn.textContent = 'Sent!';
      btn.style.background = '#6B9E7A';
      btn.disabled = true;
      if (successMsg) successMsg.style.display = 'block';
      return;
    }

    // Formspree configured — let it submit but intercept for nice UX
    e.preventDefault();
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const data = new FormData(form);
      const res = await fetch(action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        btn.textContent = 'Sent!';
        btn.style.background = '#6B9E7A';
        if (successMsg) successMsg.style.display = 'block';
        form.reset();
      } else {
        btn.textContent = 'Something went wrong. Try again.';
        btn.style.background = '#C8694F';
        btn.disabled = false;
      }
    } catch {
      btn.textContent = 'Something went wrong. Try again.';
      btn.style.background = '#C8694F';
      btn.disabled = false;
    }
  });
}
