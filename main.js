// main.js - Shared JavaScript for Bharat Connect Portal

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  initStickyNav();
  initActiveNavLink();
  initLanguageToggle();
  initAccessibilityControls();
  initBharatAIWidget();
  initSearch();
  initRotatingPlaceholder();
  initScrollToTop();
  applySavedAccessibilitySettings();
});

function initMobileNav() {
  const mobileBtn = document.querySelector('.mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  const navActions = document.querySelector('.nav-actions');

  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinks.classList.toggle('show');
      if (navActions) navActions.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.main-nav')) {
        navLinks.classList.remove('show');
        if (navActions) navActions.classList.remove('show');
      }
    });
  }
}

function initStickyNav() {
  const nav = document.querySelector('.main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
  }
}

function initActiveNavLink() {
  const path = window.location.pathname;
  const links = document.querySelectorAll('.nav-links a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && path.includes(href.split('/').pop()) && href !== '#') {
      link.classList.add('active');
    }
  });
}

function initLanguageToggle() {
  const langToggle = document.querySelector('.lang-toggle');
  if (!langToggle) return;

  const translations = {
    en: {
      'nav-home': 'Home', 'nav-services': 'Services', 'nav-schemes': 'Schemes',
      'nav-docs': 'Documents', 'nav-ministries': 'Ministries', 'nav-states': 'States',
      'nav-news': 'News', 'nav-explore': 'Explore India', 'nav-help': 'Help',
      'hero-title': 'Your Government. Your Services. One Digital Gateway.',
      'hero-sub': 'Discover government services, schemes and official resources.',
      'search-placeholder': 'What do you need help with today?',
      'need-heading': 'What do you need help with?',
      'dashboard-btn': 'My Dashboard'
    },
    hi: {
      'nav-home': 'होम', 'nav-services': 'सेवाएं', 'nav-schemes': 'योजनाएं',
      'nav-docs': 'दस्तावेज़', 'nav-ministries': 'मंत्रालय', 'nav-states': 'राज्य',
      'nav-news': 'समाचार', 'nav-explore': 'भारत जानें', 'nav-help': 'मदद',
      'hero-title': 'आपकी सरकार। आपकी सेवाएं। एक डिजिटल गेटवे।',
      'hero-sub': 'सरकारी सेवाओं, योजनाओं और जानकारी को एक जगह खोजें।',
      'search-placeholder': 'आज आपको किस चीज़ में मदद चाहिए?',
      'need-heading': 'आपको किस चीज़ में मदद चाहिए?',
      'dashboard-btn': 'मेरा डैशबोर्ड'
    }
  };

  langToggle.addEventListener('click', () => {
    const isHi = document.body.classList.toggle('lang-hi');
    const lang = isHi ? 'hi' : 'en';
    localStorage.setItem('bharat-lang', lang);
    applyTranslations(lang, translations);
    langToggle.textContent = isHi ? 'EN' : 'हिं';
  });

  const savedLang = localStorage.getItem('bharat-lang');
  if (savedLang === 'hi') {
    document.body.classList.add('lang-hi');
    applyTranslations('hi', translations);
    langToggle.textContent = 'EN';
  }
}

function applyTranslations(lang, translations) {
  const dict = translations[lang];
  for (const key in dict) {
    const els = document.querySelectorAll(`[data-i18n="${key}"]`);
    els.forEach(el => {
      if (el.tagName === 'INPUT' && el.type === 'text') {
        el.placeholder = dict[key];
      } else {
        el.textContent = dict[key];
      }
    });
  }
}

function initAccessibilityControls() {
  const trigger = document.querySelector('.accessibility-trigger');
  
  // Inject Panel if not exists
  if (trigger && !document.querySelector('.accessibility-panel')) {
    const panelHtml = `
      <div class="accessibility-panel">
        <div class="panel-header">
          <h3>Accessibility Options</h3>
          <button class="panel-close">✕</button>
        </div>
        <div class="panel-body">
          <div class="access-option">
            <span>Text Size</span>
            <div class="btn-group">
              <button data-font-action="decrease">A-</button>
              <button data-font-action="reset">A</button>
              <button data-font-action="increase">A+</button>
            </div>
          </div>
          <div class="access-option">
            <span>High Contrast</span>
            <button class="toggle-btn" id="toggle-contrast">Toggle</button>
          </div>
          <div class="access-option">
            <span>Hide Images</span>
            <button class="toggle-btn" id="toggle-images">Toggle</button>
          </div>
          <div class="access-option">
            <span>Easy Reading</span>
            <button class="toggle-btn" id="toggle-reading">Toggle</button>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', panelHtml);
  }

  const panel = document.querySelector('.accessibility-panel');
  if (trigger && panel) {
    trigger.addEventListener('click', () => panel.classList.add('open'));
    panel.querySelector('.panel-close').addEventListener('click', () => panel.classList.remove('open'));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') panel.classList.remove('open');
    });
    document.addEventListener('click', (e) => {
      if (!panel.contains(e.target) && !trigger.contains(e.target)) {
        panel.classList.remove('open');
      }
    });

    // Font actions
    let currentSize = parseFloat(localStorage.getItem('bharat-font-size')) || 16;
    const setFontSize = (size) => {
      currentSize = size;
      document.documentElement.style.fontSize = size + 'px';
      localStorage.setItem('bharat-font-size', size);
    };

    panel.querySelectorAll('[data-font-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.getAttribute('data-font-action');
        if (action === 'increase' && currentSize < 24) setFontSize(currentSize + 2);
        if (action === 'decrease' && currentSize > 12) setFontSize(currentSize - 2);
        if (action === 'reset') setFontSize(16);
      });
    });

    // High Contrast
    panel.querySelector('#toggle-contrast').addEventListener('click', () => {
      const isHc = document.body.classList.toggle('high-contrast');
      localStorage.setItem('bharat-contrast', isHc);
      injectHighContrastStyle(isHc);
    });

    // Hide Images
    panel.querySelector('#toggle-images').addEventListener('click', () => {
      const hide = document.body.classList.toggle('hide-images');
      localStorage.setItem('bharat-hide-images', hide);
    });

    // Easy Reading
    panel.querySelector('#toggle-reading').addEventListener('click', () => {
      const easy = document.body.classList.toggle('easy-reading');
      localStorage.setItem('bharat-easy-reading', easy);
    });
  }
}

function injectHighContrastStyle(enable) {
  let styleEl = document.getElementById('hc-style');
  if (enable) {
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'hc-style';
      styleEl.textContent = `
        body.high-contrast { filter: contrast(150%); background: #000 !important; color: #fff !important; }
        body.high-contrast .main-nav, body.high-contrast .gov-bar { background: #000 !important; }
        body.high-contrast .card { background: #111 !important; color: #fff !important; border: 1px solid #fff; }
      `;
      document.head.appendChild(styleEl);
    }
  } else {
    if (styleEl) styleEl.remove();
  }
}

function applySavedAccessibilitySettings() {
  const size = localStorage.getItem('bharat-font-size');
  if (size) document.documentElement.style.fontSize = size + 'px';

  if (localStorage.getItem('bharat-contrast') === 'true') {
    document.body.classList.add('high-contrast');
    injectHighContrastStyle(true);
  }
  if (localStorage.getItem('bharat-hide-images') === 'true') {
    document.body.classList.add('hide-images');
    if(!document.getElementById('hi-style')){
      const style = document.createElement('style');
      style.id = 'hi-style';
      style.textContent = '.hide-images img { visibility: hidden; }';
      document.head.appendChild(style);
    }
  }
  if (localStorage.getItem('bharat-easy-reading') === 'true') {
    document.body.classList.add('easy-reading');
    if(!document.getElementById('er-style')){
      const style = document.createElement('style');
      style.id = 'er-style';
      style.textContent = '.easy-reading { line-height: 2 !important; letter-spacing: 0.5px; }';
      document.head.appendChild(style);
    }
  }
}

function initBharatAIWidget() {
  const widgetHtml = `
    <div class="bharat-ai-widget">
      <button class="bharat-ai-btn" aria-label="Open Bharat AI Assistant">
        <span>🤖</span><span class="ai-label">Bharat AI</span>
      </button>
      <div class="ai-panel" id="ai-panel" hidden>
        <div class="ai-header">
          <h3>Bharat AI Assistant</h3>
          <button class="ai-close">✕</button>
        </div>
        <div class="ai-disclaimer">Provides guidance only. For applications, visit official portals.</div>
        <div class="ai-messages" id="ai-messages">
          <div class="ai-msg ai">I can help you find government services and schemes. Try asking about scholarships, health schemes, farming support, business registration, or any government service. 🇮🇳</div>
        </div>
        <div class="ai-suggestions" id="ai-suggestions">
          <button>Find scholarships for engineering students</button>
          <button>How do I apply for Ayushman Bharat?</button>
          <button>PM-KISAN registration process</button>
          <button>Start a small business</button>
          <button>Apply for passport</button>
        </div>
        <div class="ai-input-row">
          <input type="text" id="ai-input" placeholder="Ask about any government service...">
          <button id="ai-send">Send</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', widgetHtml);

  const btn = document.querySelector('.bharat-ai-btn');
  const panel = document.getElementById('ai-panel');
  const close = document.querySelector('.ai-close');
  const sendBtn = document.getElementById('ai-send');
  const input = document.getElementById('ai-input');
  const messages = document.getElementById('ai-messages');
  const suggestions = document.querySelectorAll('.ai-suggestions button');

  const aiResponses = [
    { keywords: ['scholarship','study','student','education','college'], response: '🎓 For scholarships, visit the National Scholarship Portal (scholarships.gov.in). Key schemes include PM Scholarship, Central Sector Scholarship, and state-specific scholarships. You\\'ll typically need: marksheets, income certificate, Aadhaar, and bank details.' },
    { keywords: ['farmer','kisan','crop','agriculture','farm'], response: '🌾 Key farming schemes: PM-KISAN (₹6,000/year), PM Fasal Bima Yojana (crop insurance), and Kisan Credit Card. Visit pmkisan.gov.in for PM-KISAN registration. Your local Krishi Vigyan Kendra can also help.' },
    { keywords: ['passport','travel','visa'], response: '✈️ Apply for passport at passportindia.gov.in. Book an appointment at your nearest Passport Seva Kendra (PSK). Documents needed: Aadhaar, proof of address, proof of birth. Processing: 7-30 days depending on type.' },
    { keywords: ['health','hospital','ayushman','medical','insurance'], response: '🏥 Ayushman Bharat PM-JAY provides ₹5 lakh health cover per family/year. Check eligibility at pmjay.gov.in. Also check your state government\\'s health insurance scheme.' },
    { keywords: ['aadhaar','aadhar','uid','biometric'], response: '🪪 For Aadhaar enrolment or update, visit uidai.gov.in or your nearest Aadhaar Seva Kendra. You can update address, mobile, and email online. Helpline: 1947.' },
    { keywords: ['business','startup','msme','entrepreneur','company','register'], response: '🚀 Start your business journey: 1) Register on Startup India (startupindia.gov.in), 2) Get MSME/Udyam registration (udyamregistration.gov.in), 3) Register for GST (gst.gov.in). Explore MUDRA loans for funding.' },
    { keywords: ['pension','retirement','senior','elderly','atal'], response: '👴 Key pension schemes: Atal Pension Yojana (APY) for unorganised sector workers, NPS (National Pension System) for salaried. Visit npscra.nsdl.co.in or your bank. EPFO manages PF and EPS for employees.' },
    { keywords: ['housing','home','pmay','house','flat','construction'], response: '🏠 PMAY (Pradhan Mantri Awas Yojana) provides housing subsidy up to ₹2.67 lakh. Check eligibility at pmaymis.gov.in. Also check your state government\\'s housing scheme.' },
    { keywords: ['ration','food','pds','bpl','card'], response: '🛒 Ration cards are issued by your state government. Visit your state\\'s Food & Civil Supplies portal or nearest ration shop. PM Garib Kalyan Anna Yojana provides free foodgrains to eligible families.' },
    { keywords: ['job','employment','work','career','rozgar','sarkari'], response: '💼 For government jobs: NCS Portal (ncs.gov.in), SSC (ssc.nic.in), UPSC (upsc.gov.in), Railway Recruitment (rrbcdg.gov.in). For skill training: PMKVY (skillindiadigital.gov.in).' }
  ];

  function getResponse(text) {
    const lowerText = text.toLowerCase();
    for (let r of aiResponses) {
      if (r.keywords.some(kw => lowerText.includes(kw))) {
        return r.response;
      }
    }
    return "I can help you find government services and schemes. Try asking about scholarships, health schemes, farming support, business registration, or any government service. 🇮🇳";
  }

  function addMessage(text, type) {
    const div = document.createElement('div');
    div.className = \`ai-msg \${type}\`;
    div.textContent = text;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function handleSend() {
    const val = input.value.trim();
    if (!val) return;
    addMessage(val, 'user');
    input.value = '';
    setTimeout(() => {
      addMessage(getResponse(val), 'ai');
    }, 500);
  }

  btn.addEventListener('click', () => panel.hidden = !panel.hidden);
  close.addEventListener('click', () => panel.hidden = true);
  sendBtn.addEventListener('click', handleSend);
  input.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });

  suggestions.forEach(s => {
    s.addEventListener('click', () => {
      input.value = s.textContent;
      handleSend();
      document.getElementById('ai-suggestions').style.display = 'none';
    });
  });
}

function initSearch() {
  const form = document.getElementById('hero-search-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = form.querySelector('input').value;
      if (q) {
        const isIndex = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
        const searchPath = isIndex ? 'search.html' : 'search.html'; // Assuming all pages are in src/pages except index
        const fullPath = isIndex ? searchPath : \`../pages/\${searchPath}\`;
        
        // Simpler way to navigate
        let prefix = window.location.pathname.includes('/src/pages/') ? '' : 'src/pages/';
        if (window.location.pathname.includes('/src/pages/')) prefix = '';
        
        window.location.href = (window.location.pathname.includes('/src/pages/') ? 'search.html' : 'search.html') + '?q=' + encodeURIComponent(q);
      }
    });
  }
}

function initRotatingPlaceholder() {
  const inputs = document.querySelectorAll('input[data-rotate-placeholder]');
  const examples = [
    'Apply for passport...',
    'Download Aadhaar...',
    'PM Kisan status...',
    'Register MSME...',
    'Find scholarships...'
  ];
  
  inputs.forEach(input => {
    let i = 0;
    setInterval(() => {
      input.style.opacity = '0.5';
      setTimeout(() => {
        input.placeholder = examples[i % examples.length];
        input.style.opacity = '1';
        i++;
      }, 300);
    }, 3000);
  });
}

function initScrollToTop() {
  const btn = document.createElement('button');
  btn.id = 'scroll-top';
  btn.innerHTML = '↑';
  btn.style.cssText = 'position:fixed;bottom:20px;right:20px;display:none;background:var(--india-green, #138808);color:white;border:none;border-radius:50%;width:40px;height:40px;cursor:pointer;z-index:99;box-shadow:0 2px 10px rgba(0,0,0,0.2);';
  document.body.appendChild(btn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) btn.style.display = 'block';
    else btn.style.display = 'none';
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
