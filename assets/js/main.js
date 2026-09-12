// Sigacerto Technology — scripts compartilhados

document.addEventListener('DOMContentLoaded', function () {
  /* Header: sombra/blur ao rolar */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 8) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Menu mobile */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.innerHTML = isOpen ? iconClose() : iconMenu();
    });

    nav.querySelectorAll('a:not(.nav-dropdown-toggle)').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.innerHTML = iconMenu();
      });
    });
  }

  /* Submenu de Cursos: hover no desktop, toque no mobile */
  document.querySelectorAll('.nav-dropdown-toggle').forEach(function (dropdownToggle) {
    dropdownToggle.addEventListener('click', function (e) {
      if (window.matchMedia('(max-width: 860px)').matches) {
        e.preventDefault();
        dropdownToggle.closest('.nav-dropdown').classList.toggle('is-open');
      }
    });
  });

  function iconMenu() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
  }
  function iconClose() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  }

  /* Marca item de navegação ativo conforme a página atual */
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a[href]').forEach(function (link) {
    var href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
      var parentDropdown = link.closest('.nav-dropdown');
      if (parentDropdown) parentDropdown.querySelector('.nav-dropdown-toggle').classList.add('active');
    }
  });

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Formulário de contato — envia para o endpoint PHP hospedado na Hostgator */
  var CONTACT_ENDPOINT = 'https://form.sigacerto.com.br/contato-envio.php';
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var successBox = document.getElementById('form-success');
      var errorBox = document.getElementById('form-error');
      var submitBtn = form.querySelector('button[type="submit"]');

      if (successBox) successBox.classList.remove('show');
      if (errorBox) errorBox.classList.remove('show');
      if (submitBtn) submitBtn.disabled = true;

      fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        body: new FormData(form)
      })
        .then(function (response) { return response.json(); })
        .then(function (data) {
          if (data && data.ok) {
            form.reset();
            if (successBox) successBox.classList.add('show');
          } else if (errorBox) {
            errorBox.classList.add('show');
          }
        })
        .catch(function () {
          if (errorBox) errorBox.classList.add('show');
        })
        .finally(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
});
