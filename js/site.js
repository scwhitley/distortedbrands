// Mobile menu toggle.
var menuBtn = document.querySelector('.menu-btn');
var menu = document.getElementById('menu');
if (menuBtn && menu) {
  menuBtn.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Copy buttons on the contact page. Falls back to selecting the address.
document.querySelectorAll('.copy').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var text = btn.getAttribute('data-copy');
    var done = function () {
      btn.textContent = 'Copied';
      setTimeout(function () { btn.textContent = 'Copy'; }, 1500);
    };
    var select = function () {
      var link = btn.parentElement.querySelector('a');
      var range = document.createRange();
      range.selectNodeContents(link);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(done, select);
    } else {
      select();
    }
  });
});

// Preselect the contact form topic from links like /contact/?topic=web
var topic = new URLSearchParams(window.location.search).get('topic');
var topicSelect = document.getElementById('f-topic');
if (topic && topicSelect && topicSelect.querySelector('option[value="' + topic + '"]')) {
  topicSelect.value = topic;
}
