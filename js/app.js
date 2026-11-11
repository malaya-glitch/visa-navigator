/**
 * VisaNavigator - Core Application Logic
 * Pure Frontend Vanilla JavaScript
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // Application State
  // --------------------------------------------------------------------------
  const state = {
    origin: localStorage.getItem('visanav_origin') || 'ALL',
    categoryFilter: 'all',
    regionFilter: 'all',
    searchQuery: '',
    sortOrder: 'name-asc',
    activeCountry: null,
    activeTab: 'roadmap',
    compareA: 'thailand',
    compareB: 'france',
    theme: localStorage.getItem('visanav_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'),
    // Structure: { [countryId]: { checked: string[], custom: Array } }
    savedChecklists: JSON.parse(localStorage.getItem('visanav_checklists') || '{}')
  };

  // --------------------------------------------------------------------------
  // DOM Elements
  // --------------------------------------------------------------------------
  const elements = {
    originSelect: document.getElementById('originSelect'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    searchInput: document.getElementById('searchInput'),
    searchClearBtn: document.getElementById('searchClearBtn'),
    categoryFilterPills: document.getElementById('categoryFilterPills'),
    regionFilterPills: document.getElementById('regionFilterPills'),
    countriesGrid: document.getElementById('countriesGrid'),
    resultsCount: document.getElementById('resultsCount'),
    sortSelect: document.getElementById('sortSelect'),

    // Passport Calculator
    passportExpiryInput: document.getElementById('passportExpiryInput'),
    departureDateInput: document.getElementById('departureDateInput'),
    calcCheckBtn: document.getElementById('calcCheckBtn'),
    calcResultBox: document.getElementById('calcResultBox'),
    calcResultDetails: document.getElementById('calcResultDetails'),
    calcResultIcon: document.getElementById('calcResultIcon'),

    // Country Details Modal
    countryModal: document.getElementById('countryModal'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    modalFlag: document.getElementById('modalFlag'),
    modalCountryName: document.getElementById('modalCountryName'),
    modalVisaBadge: document.getElementById('modalVisaBadge'),
    modalRegion: document.getElementById('modalRegion'),
    modalCapital: document.getElementById('modalCapital'),
    modalCurrency: document.getElementById('modalCurrency'),
    modalSpecsGrid: document.getElementById('modalSpecsGrid'),
    modalPassportRule: document.getElementById('modalPassportRule'),
    modalNavTabs: document.getElementById('modalNavTabs'),
    tabRoadmap: document.getElementById('tabRoadmap'),
    tabChecklist: document.getElementById('tabChecklist'),
    tabAdvisory: document.getElementById('tabAdvisory'),
    roadmapTimeline: document.getElementById('roadmapTimeline'),
    checklistContainer: document.getElementById('checklistContainer'),
    checklistProgressBar: document.getElementById('checklistProgressBar'),
    checklistProgressText: document.getElementById('checklistProgressText'),
    printChecklistBtn: document.getElementById('printChecklistBtn'),
    copyChecklistBtn: document.getElementById('copyChecklistBtn'),
    resetChecklistBtn: document.getElementById('resetChecklistBtn'),
    customDocInput: document.getElementById('customDocInput'),
    addCustomDocBtn: document.getElementById('addCustomDocBtn'),
    advisoryContent: document.getElementById('advisoryContent'),

    // Compare Modal
    compareNavBtn: document.getElementById('compareNavBtn'),
    compareModal: document.getElementById('compareModal'),
    compareCloseBtn: document.getElementById('compareCloseBtn'),
    compareSelectA: document.getElementById('compareSelectA'),
    compareSelectB: document.getElementById('compareSelectB'),
    compareTableBody: document.getElementById('compareTableBody'),

    // Toast Notice
    toastNotice: document.getElementById('toastNotice'),
    toastText: document.getElementById('toastText')
  };

  // --------------------------------------------------------------------------
  // Initialization
  // --------------------------------------------------------------------------
  function init() {
    initTheme();
    populateOriginDropdown();
    populateCompareDropdowns();
    setupDefaultDates();
    attachEventListeners();
    renderCountries();
  }

  // --------------------------------------------------------------------------
  // Theme Toggle
  // --------------------------------------------------------------------------
  function initTheme() {
    document.documentElement.setAttribute('data-theme', state.theme);
    updateThemeIcon();
  }

  function toggleTheme() {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('visanav_theme', state.theme);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.innerHTML = state.theme === 'light' ? '🌙' : '☀️';
    }
  }

  // --------------------------------------------------------------------------
  // Dropdowns & Default Dates Setup
  // --------------------------------------------------------------------------
  function populateOriginDropdown() {
    if (!elements.originSelect) return;
    elements.originSelect.innerHTML = ORIGIN_PASSPORTS.map(p => `
      <option value="${p.code}" ${p.code === state.origin ? 'selected' : ''}>
        ${p.flag} ${p.name}
      </option>
    `).join('');
  }

  function populateCompareDropdowns() {
    if (!elements.compareSelectA || !elements.compareSelectB) return;
    const sorted = [...COUNTRIES_DATA].sort((a, b) => a.name.localeCompare(b.name));
    const optionsHTML = sorted.map(c => `
      <option value="${c.id}">${c.flag} ${c.name}</option>
    `).join('');

    elements.compareSelectA.innerHTML = optionsHTML;
    elements.compareSelectB.innerHTML = optionsHTML;

    elements.compareSelectA.value = state.compareA;
    elements.compareSelectB.value = state.compareB;
  }

  function setupDefaultDates() {
    // Default departure date to today + 30 days
    const today = new Date();
    const depart = new Date();
    depart.setDate(today.getDate() + 30);

    const expiry = new Date();
    expiry.setFullYear(today.getFullYear() + 2);

    if (elements.departureDateInput) {
      elements.departureDateInput.value = depart.toISOString().split('T')[0];
    }
    if (elements.passportExpiryInput) {
      elements.passportExpiryInput.value = expiry.toISOString().split('T')[0];
    }
  }

  // --------------------------------------------------------------------------
  // Toast Helper
  // --------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(message) {
    if (!elements.toastNotice || !elements.toastText) return;
    elements.toastText.textContent = message;
    elements.toastNotice.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      elements.toastNotice.classList.remove('show');
    }, 2800);
  }

  // --------------------------------------------------------------------------
  // Passport 6-Month Validity Checker Logic
  // --------------------------------------------------------------------------
  function checkPassportValidity() {
    const expiryStr = elements.passportExpiryInput.value;
    const departStr = elements.departureDateInput.value;

    if (!expiryStr || !departStr) {
      showToast("Please enter both dates to check validity.");
      return;
    }

    const expiryDate = new Date(expiryStr);
    const departDate = new Date(departStr);

    if (isNaN(expiryDate.getTime()) || isNaN(departDate.getTime())) {
      showToast("Please enter valid calendar dates.");
      return;
    }

    // Difference in milliseconds
    const diffTime = expiryDate.getTime() - departDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const approxMonths = (diffDays / 30.4375).toFixed(1);

    elements.calcResultBox.className = 'calc-result-box';

    if (diffDays <= 0) {
      elements.calcResultBox.classList.add('invalid');
      elements.calcResultIcon.innerHTML = '❌';
      elements.calcResultDetails.innerHTML = `
        <h4>EXPIRED PASSPORT — STRICT BOARDING DENIAL</h4>
        <p>Your passport expires <strong>before or during</strong> your trip. International airlines and immigration will refuse boarding at check-in. You must renew your passport before booking travel.</p>
      `;
    } else if (diffDays < 183) { // Under 6 months (~183 days)
      elements.calcResultBox.classList.add('invalid');
      elements.calcResultIcon.innerHTML = '🚨';
      elements.calcResultDetails.innerHTML = `
        <h4>PASSPORT INVALID (< 6 MONTHS) — ENTRY REFUSAL RISK</h4>
        <p>Your passport has only <strong>${diffDays} days (~${approxMonths} months)</strong> of validity remaining from your travel date. Over 100+ tourist countries (Thailand, Singapore, Indonesia, UAE, Schengen area) enforce the strict <strong>6-month rule</strong>. Airlines will deny check-in boarding!</p>
      `;
    } else if (diffDays <= 210) { // 6 to 7 months (Borderline)
      elements.calcResultBox.classList.add('warning');
      elements.calcResultIcon.innerHTML = '⚠️';
      elements.calcResultDetails.innerHTML = `
        <h4>BORDERLINE VALIDITY (~${approxMonths} MONTHS) — PROCEED WITH CAUTION</h4>
        <p>Your passport has <strong>${diffDays} days (~${approxMonths} months)</strong> validity. While it technically meets the minimum 6-month cutoff today, any delayed return flight or rescheduled vacation may push you below the 180-day threshold. We strongly advise renewing early.</p>
      `;
    } else {
      // Safe > 6 months
      elements.calcResultBox.classList.add('valid');
      elements.calcResultIcon.innerHTML = '✅';
      elements.calcResultDetails.innerHTML = `
        <h4>PASSPORT FULLY VALID FOR INTERNATIONAL TRAVEL!</h4>
        <p>You have <strong>${diffDays} days (approx. ${approxMonths} months)</strong> of remaining validity beyond your planned departure date. This comfortably satisfies the standard 6-month validity requirement for all global tourist destinations.</p>
      `;
    }

    elements.calcResultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // --------------------------------------------------------------------------
  // Filtering & Sorting
  // --------------------------------------------------------------------------
  function getFilteredCountries() {
    const query = state.searchQuery.trim().toLowerCase();

    return COUNTRIES_DATA.filter(country => {
      const activeVisa = getEffectiveVisa(country, state.origin);

      // Category filter
      if (state.categoryFilter !== 'all' && activeVisa.category !== state.categoryFilter) {
        return false;
      }

      // Region filter
      if (state.regionFilter !== 'all' && country.region !== state.regionFilter) {
        return false;
      }

      // Text search match
      if (query) {
        const nameMatch = country.name.toLowerCase().includes(query);
        const capitalMatch = country.capital.toLowerCase().includes(query);
        const cityMatch = country.popularCities && country.popularCities.some(city => city.toLowerCase().includes(query));
        const visaMatch = activeVisa.categoryLabel.toLowerCase().includes(query);
        if (!nameMatch && !capitalMatch && !cityMatch && !visaMatch) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      const visaA = getEffectiveVisa(a, state.origin);
      const visaB = getEffectiveVisa(b, state.origin);

      if (state.sortOrder === 'name-asc') {
        return a.name.localeCompare(b.name);
      } else if (state.sortOrder === 'name-desc') {
        return b.name.localeCompare(a.name);
      } else if (state.sortOrder === 'fee-low') {
        return visaA.feeNumber - visaB.feeNumber;
      } else if (state.sortOrder === 'fee-high') {
        return visaB.feeNumber - visaA.feeNumber;
      }
      return 0;
    });
  }

  // --------------------------------------------------------------------------
  // Render Country Cards Grid
  // --------------------------------------------------------------------------
  function renderCountries() {
    if (!elements.countriesGrid) return;
    const filtered = getFilteredCountries();

    if (elements.resultsCount) {
      elements.resultsCount.innerHTML = `Showing <b>${filtered.length}</b> of <b>${COUNTRIES_DATA.length}</b> popular destinations`;
    }

    if (filtered.length === 0) {
      elements.countriesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 3rem; margin-bottom: 0.5rem;">🔍</div>
          <h3>No tourist destinations found</h3>
          <p style="font-size: 0.9rem; margin-top: 0.5rem;">Try adjusting your search terms or clearing category filters.</p>
        </div>
      `;
      return;
    }

    elements.countriesGrid.innerHTML = filtered.map(country => {
      const visa = getEffectiveVisa(country, state.origin);
      const citiesStr = country.popularCities ? country.popularCities.slice(0, 3).join(' • ') : '';

      return `
        <article class="country-card" data-id="${country.id}" tabindex="0" role="button" aria-label="View visa details for ${country.name}">
          <div>
            <div class="country-card-header">
              <div class="country-meta">
                <span class="country-flag" aria-hidden="true">${country.flag}</span>
                <div class="country-names">
                  <h3>${country.name}</h3>
                  <span class="country-region-tag">
                    <i class="fas fa-globe-americas"></i> ${country.region} • ${country.capital}
                  </span>
                </div>
              </div>
              <span class="visa-badge ${visa.category}">
                <span class="pill-dot ${visa.category}"></span>
                ${visa.categoryLabel}
              </span>
            </div>

            <div class="country-destinations" title="${country.popularCities.join(', ')}">
              <i class="fas fa-map-pin"></i> <span>${citiesStr}</span>
            </div>

            <div class="card-metrics-strip">
              <div class="metric-item">
                <span class="metric-label">⏱️ Processing Time</span>
                <span class="metric-val" title="${visa.processingTime}">${visa.processingTime}</span>
              </div>
              <div class="metric-item">
                <span class="metric-label">💳 Tourist Visa Fee</span>
                <span class="metric-val">${visa.feeUSD}</span>
              </div>
            </div>

            <div class="passport-rule-preview">
              <i class="fas fa-passport"></i>
              <strong>Rule:</strong> 6-month validity required
            </div>
          </div>

          <div class="country-card-footer">
            <button class="view-details-btn" data-action="open-details" data-id="${country.id}">
              <i class="fas fa-route"></i> Visa Roadmap & Checklist
            </button>
            <button class="card-compare-btn" data-action="quick-compare" data-id="${country.id}" title="Compare with another country">
              <i class="fas fa-columns"></i>
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  // --------------------------------------------------------------------------
  // Country Details Modal Management
  // --------------------------------------------------------------------------
  function openCountryDetails(countryId) {
    const country = COUNTRIES_DATA.find(c => c.id === countryId);
    if (!country) return;

    state.activeCountry = country;
    const visa = getEffectiveVisa(country, state.origin);

    // Populate Modal Header
    elements.modalFlag.textContent = country.flag;
    elements.modalCountryName.textContent = country.name;
    elements.modalRegion.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${country.region}`;
    elements.modalCapital.innerHTML = `<i class="fas fa-city"></i> Capital: ${country.capital}`;
    elements.modalCurrency.innerHTML = `<i class="fas fa-coins"></i> Currency: ${country.currency}`;

    // Visa Badge
    elements.modalVisaBadge.className = `visa-badge ${visa.category}`;
    elements.modalVisaBadge.innerHTML = `<span class="pill-dot ${visa.category}"></span> ${visa.categoryLabel}`;

    // Specs Grid
    elements.modalSpecsGrid.innerHTML = `
      <div class="spec-card">
        <div class="spec-icon"><i class="fas fa-clock"></i></div>
        <div class="spec-content">
          <span class="spec-label">Standard Timeline</span>
          <span class="spec-val">${visa.processingTime}</span>
          <span class="spec-desc">${visa.processingBadge} turnaround</span>
        </div>
      </div>
      <div class="spec-card">
        <div class="spec-icon"><i class="fas fa-money-bill-wave"></i></div>
        <div class="spec-content">
          <span class="spec-label">Visa Fee</span>
          <span class="spec-val">${visa.feeUSD}</span>
          <span class="spec-desc">Official government fee</span>
        </div>
      </div>
      <div class="spec-card">
        <div class="spec-icon"><i class="fas fa-calendar-alt"></i></div>
        <div class="spec-content">
          <span class="spec-label">Allowed Stay</span>
          <span class="spec-val">${visa.stayDuration}</span>
          <span class="spec-desc">Tourist status</span>
        </div>
      </div>
      <div class="spec-card">
        <div class="spec-icon"><i class="fas fa-link"></i></div>
        <div class="spec-content">
          <span class="spec-label">Official Channel</span>
          <span class="spec-val" style="font-size: 0.85rem;">${visa.officialPortal || 'Consulate / Airport'}</span>
          <span class="spec-desc">Authorized immigration desk</span>
        </div>
      </div>
    `;

    // Passport Rule Banner
    elements.modalPassportRule.innerHTML = `
      <i class="fas fa-shield-alt"></i>
      <div>
        <strong>Mandatory Passport Validity Requirement:</strong>
        <p>${visa.passportRule}</p>
      </div>
    `;

    // Render Tabs
    renderRoadmap(country);
    renderChecklist(country);
    renderAdvisory(country);

    // Switch to active tab (default roadmap)
    switchModalTab('roadmap');

    // Open Modal
    elements.countryModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCountryDetails() {
    elements.countryModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function switchModalTab(tabName) {
    state.activeTab = tabName;
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    elements.tabRoadmap.classList.toggle('active', tabName === 'roadmap');
    elements.tabChecklist.classList.toggle('active', tabName === 'checklist');
    elements.tabAdvisory.classList.toggle('active', tabName === 'advisory');
  }

  // --------------------------------------------------------------------------
  // Tab 1: Step-by-Step Visa Requirement Roadmap
  // --------------------------------------------------------------------------
  function renderRoadmap(country) {
    const steps = getRoadmapSteps(country, state.origin);

    elements.roadmapTimeline.innerHTML = steps.map(s => `
      <div class="roadmap-step-item">
        <div class="step-number-circle">${s.step}</div>
        <div class="step-card">
          <div class="step-header">
            <h4 class="step-title">${s.title}</h4>
            <span class="step-tag">${s.status}</span>
          </div>
          <p class="step-desc">${s.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // --------------------------------------------------------------------------
  // Tab 2: Mandatory Document Checklist Generator
  // --------------------------------------------------------------------------
  function getCountryChecklist(countryId) {
    if (!state.savedChecklists[countryId]) {
      state.savedChecklists[countryId] = {
        checked: [],
        custom: []
      };
    }
    return state.savedChecklists[countryId];
  }

  function saveCountryChecklists() {
    localStorage.setItem('visanav_checklists', JSON.stringify(state.savedChecklists));
  }

  function renderChecklist(country) {
    const saved = getCountryChecklist(country.id);
    const standardDocs = country.mandatoryDocs || [];
    const allDocs = [
      ...standardDocs.map(d => ({ ...d, isCustom: false })),
      ...(saved.custom || []).map(d => ({ ...d, isCustom: true }))
    ];

    // Compute progress
    const totalCount = allDocs.length;
    const checkedCount = allDocs.filter(d => saved.checked.includes(d.id)).length;
    const percentage = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

    elements.checklistProgressBar.style.width = `${percentage}%`;
    elements.checklistProgressText.textContent = `${checkedCount} of ${totalCount} Prepared (${percentage}%)`;

    elements.checklistContainer.innerHTML = allDocs.map(doc => {
      const isChecked = saved.checked.includes(doc.id);
      return `
        <div class="checklist-item-card ${isChecked ? 'checked' : ''}" data-id="${doc.id}">
          <input type="checkbox" class="custom-checkbox" data-id="${doc.id}" ${isChecked ? 'checked' : ''} aria-label="Mark ${doc.title} as ready">
          <div class="checklist-item-body">
            <div class="checklist-item-header">
              <div class="checklist-item-title">
                <i class="fas ${doc.icon || 'fa-file-alt'}"></i>
                <span>${doc.title}</span>
              </div>
              <div class="checklist-item-badges">
                <span class="badge-tag">${doc.category || 'General'}</span>
                <span class="badge-tag ${doc.required ? 'req' : ''}">
                  ${doc.required ? 'Mandatory' : 'Recommended'}
                </span>
                ${doc.isCustom ? `
                  <button class="remove-item-btn" data-action="remove-custom" data-id="${doc.id}" title="Remove custom document">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                ` : ''}
              </div>
            </div>
            <p class="checklist-item-desc">${doc.desc || 'No specific instructions provided.'}</p>
          </div>
        </div>
      `;
    }).join('');
  }

  function toggleChecklistItem(docId) {
    if (!state.activeCountry) return;
    const saved = getCountryChecklist(state.activeCountry.id);
    const idx = saved.checked.indexOf(docId);

    if (idx > -1) {
      saved.checked.splice(idx, 1);
    } else {
      saved.checked.push(docId);
    }

    saveCountryChecklists();
    renderChecklist(state.activeCountry);
  }

  function addCustomDocument() {
    if (!state.activeCountry || !elements.customDocInput) return;
    const title = elements.customDocInput.value.trim();
    if (!title) {
      showToast("Please enter a document name.");
      return;
    }

    const saved = getCountryChecklist(state.activeCountry.id);
    const newDoc = {
      id: `custom-${Date.now()}`,
      title: title,
      desc: "Custom traveler item added manually to this checklist roadmap.",
      icon: "fa-clipboard-check",
      category: "Personal",
      required: true
    };

    saved.custom.push(newDoc);
    saved.checked.push(newDoc.id); // auto check
    saveCountryChecklists();

    elements.customDocInput.value = '';
    renderChecklist(state.activeCountry);
    showToast(`Added "${title}" to your checklist.`);
  }

  function removeCustomDocument(docId) {
    if (!state.activeCountry) return;
    const saved = getCountryChecklist(state.activeCountry.id);
    saved.custom = saved.custom.filter(d => d.id !== docId);
    saved.checked = saved.checked.filter(id => id !== docId);
    saveCountryChecklists();
    renderChecklist(state.activeCountry);
    showToast("Custom document removed.");
  }

  function resetChecklist() {
    if (!state.activeCountry) return;
    if (confirm("Reset all checkmarks for this country?")) {
      const saved = getCountryChecklist(state.activeCountry.id);
      saved.checked = [];
      saveCountryChecklists();
      renderChecklist(state.activeCountry);
      showToast("Checklist progress reset.");
    }
  }

  function copyChecklistText() {
    if (!state.activeCountry) return;
    const visa = getEffectiveVisa(state.activeCountry, state.origin);
    const saved = getCountryChecklist(state.activeCountry.id);
    const standardDocs = state.activeCountry.mandatoryDocs || [];
    const allDocs = [...standardDocs, ...(saved.custom || [])];

    let text = `✈️ VISA & DOCUMENT CHECKLIST: ${state.activeCountry.name.toUpperCase()}\n`;
    text += `Visa Category: ${visa.categoryLabel}\n`;
    text += `Standard Timeline: ${visa.processingTime}\n`;
    text += `Passport Requirement: ${visa.passportRule}\n\n`;
    text += `MANDATORY DOCUMENTS:\n`;

    allDocs.forEach((d, idx) => {
      const checked = saved.checked.includes(d.id) ? '[X]' : '[ ]';
      text += `${idx + 1}. ${checked} ${d.title} (${d.required ? 'Mandatory' : 'Optional'})\n   - ${d.desc}\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
      showToast("Checklist copied to clipboard!");
    }).catch(() => {
      showToast("Unable to copy to clipboard.");
    });
  }

  // --------------------------------------------------------------------------
  // Tab 3: Country Travel Advisory & Entry Regulations
  // --------------------------------------------------------------------------
  function renderAdvisory(country) {
    const visa = getEffectiveVisa(country, state.origin);

    elements.advisoryContent.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div class="spec-card">
          <div class="spec-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;">
            <i class="fas fa-exclamation-triangle"></i>
          </div>
          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700;">Official Visa Advisory & Policy Notes</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
              ${visa.notes || 'Please verify local entry requirements with the nearest embassy prior to booking non-refundable arrangements.'}
            </p>
          </div>
        </div>

        <div class="spec-card">
          <div class="spec-icon" style="background: rgba(37, 99, 235, 0.15); color: #2563eb;">
            <i class="fas fa-plane-arrival"></i>
          </div>
          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700;">Airport & Immigration Border Spot Checks</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
              Immigration officers reserve the right to ask for proof of onward travel (confirmed return ticket) and evidence of financial solvency ($50 to $100 per day in cash or credit card credit limits). Keep printed vouchers accessible in hand baggage.
            </p>
          </div>
        </div>

        <div class="spec-card">
          <div class="spec-icon" style="background: rgba(13, 148, 136, 0.15); color: #0d9488;">
            <i class="fas fa-passport"></i>
          </div>
          <div>
            <h4 style="font-size: 0.95rem; font-weight: 700;">The 6-Month Passport Rule Explained</h4>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 4px;">
              Most international aviation carriers strictly enforce the 6-month validity rule at departure gates. If your passport is within 6 months of expiration, you run a high risk of being denied check-in, even if the destination country allows entry. Always renew beforehand.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // Country Comparison Modal
  // --------------------------------------------------------------------------
  function openCompareModal(preselectedCountryId) {
    if (preselectedCountryId) {
      if (elements.compareSelectA.value !== preselectedCountryId) {
        elements.compareSelectB.value = preselectedCountryId;
      }
    }
    renderCompareTable();
    elements.compareModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCompareModal() {
    elements.compareModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function renderCompareTable() {
    const idA = elements.compareSelectA.value;
    const idB = elements.compareSelectB.value;

    const countryA = COUNTRIES_DATA.find(c => c.id === idA);
    const countryB = COUNTRIES_DATA.find(c => c.id === idB);

    if (!countryA || !countryB) return;

    const visaA = getEffectiveVisa(countryA, state.origin);
    const visaB = getEffectiveVisa(countryB, state.origin);

    elements.compareTableBody.innerHTML = `
      <tr>
        <td><strong>Visa Category</strong></td>
        <td>
          <span class="visa-badge ${visaA.category}">
            <span class="pill-dot ${visaA.category}"></span> ${visaA.categoryLabel}
          </span>
        </td>
        <td>
          <span class="visa-badge ${visaB.category}">
            <span class="pill-dot ${visaB.category}"></span> ${visaB.categoryLabel}
          </span>
        </td>
      </tr>
      <tr>
        <td><strong>Government Fee</strong></td>
        <td><strong>${visaA.feeUSD}</strong></td>
        <td><strong>${visaB.feeUSD}</strong></td>
      </tr>
      <tr>
        <td><strong>Processing Timeline</strong></td>
        <td>${visaA.processingTime}</td>
        <td>${visaB.processingTime}</td>
      </tr>
      <tr>
        <td><strong>Allowed Stay Duration</strong></td>
        <td>${visaA.stayDuration}</td>
        <td>${visaB.stayDuration}</td>
      </tr>
      <tr>
        <td><strong>Passport Validity Rule</strong></td>
        <td>${visaA.passportRule}</td>
        <td>${visaB.passportRule}</td>
      </tr>
      <tr>
        <td><strong>Official Channel</strong></td>
        <td>${visaA.officialPortal || 'Consulate / Airport'}</td>
        <td>${visaB.officialPortal || 'Consulate / Airport'}</td>
      </tr>
      <tr>
        <td><strong>Mandatory Documents</strong></td>
        <td>${countryA.mandatoryDocs.map(d => `• ${d.title}`).join('<br>')}</td>
        <td>${countryB.mandatoryDocs.map(d => `• ${d.title}`).join('<br>')}</td>
      </tr>
      <tr>
        <td><strong>Top Destinations</strong></td>
        <td>${countryA.popularCities ? countryA.popularCities.join(', ') : 'N/A'}</td>
        <td>${countryB.popularCities ? countryB.popularCities.join(', ') : 'N/A'}</td>
      </tr>
    `;
  }

  // --------------------------------------------------------------------------
  // Event Listeners
  // --------------------------------------------------------------------------
  function attachEventListeners() {
    // Theme toggle
    if (elements.themeToggleBtn) {
      elements.themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Origin Passport switcher
    if (elements.originSelect) {
      elements.originSelect.addEventListener('change', e => {
        state.origin = e.target.value;
        localStorage.setItem('visanav_origin', state.origin);
        renderCountries();
        if (state.activeCountry && elements.countryModal.classList.contains('open')) {
          openCountryDetails(state.activeCountry.id);
        }
        if (elements.compareModal.classList.contains('open')) {
          renderCompareTable();
        }
        showToast(`Updated passport rules for: ${e.target.selectedOptions[0].text}`);
      });
    }

    // Search input
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', e => {
        state.searchQuery = e.target.value;
        elements.searchClearBtn.style.display = state.searchQuery ? 'block' : 'none';
        renderCountries();
      });
    }

    if (elements.searchClearBtn) {
      elements.searchClearBtn.addEventListener('click', () => {
        elements.searchInput.value = '';
        state.searchQuery = '';
        elements.searchClearBtn.style.display = 'none';
        renderCountries();
        elements.searchInput.focus();
      });
    }

    // Category Filter Pills
    if (elements.categoryFilterPills) {
      elements.categoryFilterPills.addEventListener('click', e => {
        const pill = e.target.closest('.filter-pill');
        if (!pill) return;

        elements.categoryFilterPills.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        state.categoryFilter = pill.dataset.category;
        renderCountries();
      });
    }

    // Region Filter Pills
    if (elements.regionFilterPills) {
      elements.regionFilterPills.addEventListener('click', e => {
        const pill = e.target.closest('.filter-pill');
        if (!pill) return;

        elements.regionFilterPills.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');

        state.regionFilter = pill.dataset.region;
        renderCountries();
      });
    }

    // Sort order select
    if (elements.sortSelect) {
      elements.sortSelect.addEventListener('change', e => {
        state.sortOrder = e.target.value;
        renderCountries();
      });
    }

    // Passport Validity Checker button
    if (elements.calcCheckBtn) {
      elements.calcCheckBtn.addEventListener('click', checkPassportValidity);
    }

    // Country Grid click delegate
    if (elements.countriesGrid) {
      elements.countriesGrid.addEventListener('click', e => {
        const card = e.target.closest('.country-card');
        if (!card) return;

        const compareBtn = e.target.closest('[data-action="quick-compare"]');
        if (compareBtn) {
          e.stopPropagation();
          openCompareModal(card.dataset.id);
          return;
        }

        openCountryDetails(card.dataset.id);
      });
    }

    // Modal close & background click
    if (elements.modalCloseBtn) {
      elements.modalCloseBtn.addEventListener('click', closeCountryDetails);
    }
    if (elements.countryModal) {
      elements.countryModal.addEventListener('click', e => {
        if (e.target === elements.countryModal) closeCountryDetails();
      });
    }

    // Modal navigation tabs
    if (elements.modalNavTabs) {
      elements.modalNavTabs.addEventListener('click', e => {
        const btn = e.target.closest('.tab-btn');
        if (!btn) return;
        switchModalTab(btn.dataset.tab);
      });
    }

    // Checklist interactive items click delegate
    if (elements.checklistContainer) {
      elements.checklistContainer.addEventListener('click', e => {
        const removeBtn = e.target.closest('[data-action="remove-custom"]');
        if (removeBtn) {
          e.stopPropagation();
          removeCustomDocument(removeBtn.dataset.id);
          return;
        }

        const checkbox = e.target.closest('.custom-checkbox');
        const card = e.target.closest('.checklist-item-card');
        if (checkbox) {
          toggleChecklistItem(checkbox.dataset.id);
        } else if (card) {
          toggleChecklistItem(card.dataset.id);
        }
      });
    }

    // Add custom document
    if (elements.addCustomDocBtn) {
      elements.addCustomDocBtn.addEventListener('click', addCustomDocument);
    }
    if (elements.customDocInput) {
      elements.customDocInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') addCustomDocument();
      });
    }

    // Checklist action buttons
    if (elements.resetChecklistBtn) {
      elements.resetChecklistBtn.addEventListener('click', resetChecklist);
    }
    if (elements.copyChecklistBtn) {
      elements.copyChecklistBtn.addEventListener('click', copyChecklistText);
    }
    if (elements.printChecklistBtn) {
      elements.printChecklistBtn.addEventListener('click', () => {
        window.print();
      });
    }

    // Compare modal navigation & triggers
    if (elements.compareNavBtn) {
      elements.compareNavBtn.addEventListener('click', () => openCompareModal());
    }
    if (elements.compareCloseBtn) {
      elements.compareCloseBtn.addEventListener('click', closeCompareModal);
    }
    if (elements.compareModal) {
      elements.compareModal.addEventListener('click', e => {
        if (e.target === elements.compareModal) closeCompareModal();
      });
    }
    if (elements.compareSelectA && elements.compareSelectB) {
      elements.compareSelectA.addEventListener('change', renderCompareTable);
      elements.compareSelectB.addEventListener('change', renderCompareTable);
    }

    // Global keyboard shortcuts
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        closeCountryDetails();
        closeCompareModal();
      }
      if (e.key === '/' && document.activeElement !== elements.searchInput && document.activeElement !== elements.customDocInput) {
        e.preventDefault();
        elements.searchInput.focus();
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
