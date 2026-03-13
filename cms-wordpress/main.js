/* ═══════════════════════════════════════════════════════════
   Introduction to CMS: WordPress — Shared JavaScript
   ═══════════════════════════════════════════════════════════ */

// ── PROGRESS BAR ──
window.addEventListener('scroll', () => {
  const fill = document.getElementById('progressFill');
  if (!fill) return;
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  fill.style.width = ((scrollTop / docHeight) * 100) + '%';
});

// ── QUIZ LOGIC ──
function checkAnswer(btn, isCorrect, qid) {
  const question = document.getElementById(qid);
  const allBtns  = question.querySelectorAll('.quiz-option');
  const feedback = document.getElementById('fb-' + qid);
  allBtns.forEach(b => { b.disabled = true; b.style.pointerEvents = 'none'; });
  if (isCorrect) {
    btn.classList.add('correct');
    feedback.className = 'quiz-feedback show correct-fb';
    feedback.innerHTML = '✅ Correct! Well done.';
  } else {
    btn.classList.add('wrong');
    feedback.className = 'quiz-feedback show wrong-fb';
    feedback.innerHTML = '❌ Not quite. Review the chapter content and try again.';
    allBtns.forEach(b => {
      if (b.getAttribute('onclick') && b.getAttribute('onclick').includes('true'))
        b.classList.add('correct');
    });
  }
}

// ── TABS ──
function switchTab(btn, tabId) {
  const tabList = btn.closest('.tab-list');
  const tabs    = btn.closest('.tabs');
  tabList.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  tabs.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const target = document.getElementById('tab-' + tabId);
  if (target) target.classList.add('active');
}

// ── ACCORDION ──
function toggleAccordion(header) {
  const body   = header.nextElementSibling;
  const isOpen = body.classList.contains('open');
  const parent = header.closest('.accordion');
  parent.querySelectorAll('.acc-body').forEach(b => b.classList.remove('open'));
  parent.querySelectorAll('.acc-header').forEach(h => h.classList.remove('open'));
  if (!isOpen) { body.classList.add('open'); header.classList.add('open'); }
}

// ── INTERACTIVE HTML TAG EXPLORER (Chapter 3) ──
function selectTag(btn, code, desc) {
  document.querySelectorAll('.tag-chip').forEach(c => c.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('tagOutput').innerHTML =
    '<span style="color:var(--wp-accent)">' + code + '</span><br>' +
    '<span style="color:var(--text-dim);font-size:0.8rem;font-family:\'DM Sans\',sans-serif">' + desc + '</span>';
}

// ── SMOOTH SCROLL (accounts for fixed nav height) ──
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 75, behavior: 'smooth' });
      }
    });
  });
});
