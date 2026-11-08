// Mobile menu toggle.
var menuBtn = document.querySelector('.menu-btn');
var menu = document.getElementById('menu');
if (menuBtn && menu) {
  menuBtn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Pop-up forms. Buttons with data-open="id" open <dialog id="id">.
// data-preset picks a matching option in the form's first <select> (e.g. a web package).
function openModal(id, preset) {
  var dialog = document.getElementById(id);
  if (!dialog || typeof dialog.showModal !== 'function') return false;
  if (preset) {
    var select = dialog.querySelector('select');
    if (select) {
      Array.prototype.forEach.call(select.options, function (o) {
        if (o.text === preset) select.value = o.value || o.text;
      });
    }
  }
  if (menu) menu.classList.remove('open');
  dialog.showModal();
  document.body.classList.add('modal-open');
  var first = dialog.querySelector('form:not([hidden]) input:not([type="hidden"]):not([name="bot-field"])');
  if (first && window.matchMedia('(min-width: 561px)').matches) first.focus();
  return true;
}

document.querySelectorAll('[data-open]').forEach(function (btn) {
  btn.addEventListener('click', function () {
    openModal(btn.getAttribute('data-open'), btn.getAttribute('data-preset'));
  });
});

document.querySelectorAll('dialog.modal').forEach(function (dialog) {
  dialog.addEventListener('close', function () {
    document.body.classList.remove('modal-open');
    // After a successful send, show a fresh form next time.
    var form = dialog.querySelector('form');
    var done = dialog.querySelector('.done');
    if (form && done && !done.hidden) {
      done.hidden = true;
      form.hidden = false;
      form.querySelector('.mform-status').textContent = '';
    }
    if (location.hash === '#' + dialog.id) history.replaceState(null, '', location.pathname);
  });
  // Click on the dark backdrop closes the pop-up.
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });
  dialog.querySelectorAll('[data-close]').forEach(function (b) {
    b.addEventListener('click', function () { dialog.close(); });
  });
});

// Links like /web/#consult open that page's pop-up on arrival.
function openFromHash() {
  var id = location.hash.slice(1);
  if (id && document.querySelector('dialog#' + CSS.escape(id))) openModal(id);
}
openFromHash();
window.addEventListener('hashchange', openFromHash);

// Send forms to Netlify in the background and show a thank-you in the pop-up.
// Without JavaScript the forms still post normally and land on /thanks/.
document.querySelectorAll('form.mform').forEach(function (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var status = form.querySelector('.mform-status');
    var button = form.querySelector('button[type="submit"]');
    status.classList.remove('err');
    status.textContent = 'Sending...';
    button.disabled = true;
    var data = new URLSearchParams(new FormData(form)).toString();
    fetch('/', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body: data })
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        form.hidden = true;
        form.reset();
        form.parentElement.querySelector('.done').hidden = false;
      })
      .catch(function () {
        status.classList.add('err');
        status.textContent = 'That didn\'t send. Please try again, or email hello@distortedbrands.com.';
      })
      .then(function () { button.disabled = false; });
  });
});
