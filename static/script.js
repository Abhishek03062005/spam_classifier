// ============================================
// SpamGuard — Frontend Logic
// ============================================

(function () {
  'use strict';

  const textarea = document.getElementById('email-input');
  const charCount = document.getElementById('char-count');
  const classifyBtn = document.getElementById('classify-btn');
  const resultPanel = document.getElementById('result-panel');
  const resultBadge = document.getElementById('result-badge');
  const resultIcon = document.getElementById('result-icon');
  const resultLabel = document.getElementById('result-label');
  const confidenceBar = document.getElementById('confidence-bar');
  const confidencePct = document.getElementById('confidence-pct');
  const confidenceLevel = document.getElementById('confidence-level');
  const errorMsg = document.getElementById('error-msg');

  // --- Character count ---
  textarea.addEventListener('input', () => {
    charCount.textContent = textarea.value.length;
  });

  // --- Classify handler ---
  classifyBtn.addEventListener('click', handleClassify);

  // Allow Ctrl+Enter to submit
  textarea.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleClassify();
    }
  });

  async function handleClassify() {
    const text = textarea.value.trim();

    // Reset state
    hideError();
    hideResult();

    if (!text) {
      showError('Please paste an email or message to classify.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error(`Server error (${res.status})`);
      }

      const data = await res.json();

      if (data.Error) {
        showError(data.Error);
        return;
      }

      showResult(data);
    } catch (err) {
      showError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // --- UI helpers ---

  function setLoading(loading) {
    classifyBtn.disabled = loading;
    classifyBtn.classList.toggle('loading', loading);
  }

  function showResult(data) {
    const isSpam = data.prediction === 'Spam';
    const pct = Math.round(data.Confidence * 100);
    const level = data.Confidence_level;

    // Badge
    resultBadge.className = 'result-badge ' + (isSpam ? 'spam' : 'safe');
    resultIcon.textContent = isSpam ? '⚠️' : '✅';
    resultLabel.textContent = isSpam ? 'Spam Detected' : 'Looks Safe';

    // Confidence bar
    confidenceBar.className = 'confidence-bar-fill ' + (isSpam ? 'spam' : 'safe');
    // Trigger reflow for animation
    confidenceBar.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        confidenceBar.style.width = pct + '%';
      });
    });

    confidencePct.textContent = pct + '% confidence';
    confidenceLevel.textContent = level;

    resultPanel.classList.remove('hidden');
  }

  function hideResult() {
    resultPanel.classList.add('hidden');
    confidenceBar.style.width = '0%';
  }

  function showError(msg) {
    errorMsg.textContent = msg;
    errorMsg.classList.remove('hidden');
  }

  function hideError() {
    errorMsg.classList.add('hidden');
  }
})();
