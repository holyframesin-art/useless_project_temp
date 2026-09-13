/**
 * Malayalam Movie Roulette 💀 - Ultra-Sarcastic UI Engine
 * (Zero mentions of the word 'roast' or 'റോസ്റ്റ്' - pure unadulterated sarcasm)
 */

class SfxManager {
  constructor() {
    this.audioCtx = null;
    this.muted = false;
  }

  _init() {
    if (!this.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.audioCtx = new AudioContext();
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playClick() {
    if (this.muted) return;
    try {
      this._init();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(320, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, this.audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.08);
    } catch (e) {}
  }

  playDisaster() {
    if (this.muted) return;
    try {
      this._init();
      if (!this.audioCtx) return;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(140, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(45, this.audioCtx.currentTime + 0.35);
      gain.gain.setValueAtTime(0.18, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, this.audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.35);
    } catch (e) {}
  }

  playAchievement() {
    if (this.muted) return;
    try {
      this._init();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      [330, 440, 554, 659].forEach((freq, i) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.frequency.setValueAtTime(freq, now + i * 0.07);
        gain.gain.setValueAtTime(0.1, now + i * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.01, now + (i + 1) * 0.07);
        osc.connect(gain);
        gain.connect(this.audioCtx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + (i + 1) * 0.07);
      });
    } catch (e) {}
  }
}

// --- 50+ Highly Sarcastic Commentary Pool (NO occurrence of the word roast/റോസ്റ്റ്) ---
const COMMENTARY = {
  // Ultra-Low Tier (< 3.5)
  tierUltraLow: [
    "നിന്റെ സായാഹ്നം എത്ര മനോഹരമാക്കാമായിരുന്നു... എന്നിട്ടും നീ തിരഞ്ഞെടുത്തത് ഈ കൊടും ക്രൂരത!",
    "3.1 റേറ്റിംഗ് കണ്ടിട്ടും ഇത് കാണാൻ തോന്നിയ നിന്റെ ചങ്കൂറ്റം അപാരം തന്നെ ബ്രോ!",
    "ഈ പടം മുഴുവൻ കണ്ട് തീർത്താൽ നിനക്ക് പത്മശ്രീ തരണം... സഹനശക്തിക്ക്!",
    "ഇതൊക്കെ കാണുന്നതിന് പകരം കണ്ണടച്ച് 2 മണിക്കൂർ ഇരുന്നാലും മനസ്സമാധാനം കിട്ടും.",
    "നിന്റെ തലച്ചോറ് ഫോർമാറ്റ് അടിക്കാൻ റെഡിയാക്കിക്കോ, കാരണം ഇനി അതിൽ ഒന്നും ബാക്കി കാണില്ല.",
    "നിന്റെ വീട്ടുകാർ നിന്റെ ഫോൺ വാങ്ങി ഒളിപ്പിച്ചു വെക്കാത്തതിൽ ഞാൻ അത്ഭുതപ്പെടുന്നു.",
    "നിന്റെ സിനിമാ സെലക്ഷൻ കണ്ടിട്ട് സാക്ഷാൽ വൈഫൈ റൂട്ടർ പോലും നാണിച്ചു തലതാഴ്ത്തുന്നു!",
    "ഇത് കണ്ടുകഴിഞ്ഞാൽ കണ്ണാടിയിൽ നോക്കി സ്വയം ഒരു മാപ്പ് ചോദിക്കാൻ മറക്കരുത്."
  ],

  // Disaster Tier (3.5 - 4.2)
  tierDisaster: [
    "മലയാളത്തിൽ എത്രയോ നല്ല സിനിമകളുണ്ട്, എന്നിട്ടും നീ വന്ന് പെട്ടത് ഈ ചവറ്റുകുട്ടയിലാണ്!",
    "കൂട്ടുകാരുടെ കൂടെ പടം വെക്കാൻ നിന്നെ എന്തിനാണ് അടുപ്പിക്കാത്തതെന്ന് ഇപ്പോഴാണ് മനസ്സിലായത്.",
    "പോയ സമയം തിരിച്ചു കിട്ടില്ല സുഹൃത്തേ... ഇനി അനുഭവിച്ചേ തീരൂ!",
    "ഈ പടത്തിന്റെ പോസ്റ്റർ കണ്ടപ്പോഴേ നിനക്ക് അപകടം മണക്കേണ്ടതായിരുന്നു... പക്ഷെ നിന്റെ ടേസ്റ്റ് സമ്മതിച്ചില്ല!",
    "കണ്ണീരും കൈയ്യും തലയിൽ വെച്ചുള്ള ഈ ഇരിപ്പ് കാണാൻ നല്ല രസമുണ്ട്.",
    "ഇതൊക്കെ കണ്ട് സമയം കളയാൻ നീ എന്ത് അപരാധമാണ് ചെയ്തത്?",
    "സിനിമ തീരുന്നതിന് മുൻപ് നിനക്ക് പ്രായം ഒരു 5 വയസ്സ് കൂടും, ഉറപ്പാണ്!"
  ],

  // Questionable Tier (4.3 - 5.0)
  tierQuestionable: [
    "ചിരിക്കാനും വയ്യ, കരയാനും വയ്യ... വല്ലാത്തൊരു വിഷമസന്ധി തന്നെ!",
    "കൊച്ചിയിലെ ഉച്ചവെയിലിൽ ഒരു തണുത്ത കട്ടൻ ചായ കുടിക്കുന്ന ഫീൽ... വെറും ശോകം!",
    "ഇതൊക്കെ തിയേറ്ററിൽ പോയി കാശ് കൊടുത്തു കണ്ടവരെ സമ്മതിക്കണം, നീയാണെങ്കിൽ ഇപ്പോഴും കാണുന്നു!",
    "നിന്റെ ജീവിതത്തിലെ വിലപ്പെട്ട 2 മണിക്കൂർ വെറുതെ ഒരു പുഴയിലേക്ക് ഒഴുക്കിക്കളയാൻ ഇതാ ഒരു അവസരം.",
    "ട്രെയിലർ കണ്ട് മോഹിച്ച് ഒടുവിൽ കുഴിയിൽ ചാടിയ പാവം മലയാളി പ്രേക്ഷകൻ!",
    "ഇതിലും നല്ലത് വല്ല യൂട്യൂബ് കുക്കിംഗ് വീഡിയോയും കണ്ട് കിടന്നുറങ്ങുന്നതായിരുന്നു."
  ],

  // Over-hyped Disappointment Tier (5.1 - 5.8)
  tierOverHyped: [
    "ആഹാ! ഹൈപ്പ് കേട്ട് വന്ന് തല വെച്ചു കൊടുത്ത മറ്റൊരു പാവം ജീവി!",
    "ഫാൻസ് അസോസിയേഷൻ ഫേസ്ബുക്കിൽ മൂന്നാഴ്ച തല്ലുകൂടിയത് ഈ സംഭവത്തിന് വേണ്ടിയായിരുന്നോ?",
    "ബിജിഎമ്മും സ്ലോമോഷനും കണ്ണടയും മാത്രം വെച്ച് കഥയുണ്ടാക്കാൻ നോക്കിയാൽ ഇങ്ങനെയിരിക്കും!",
    "ബജറ്റ് മുഴുവൻ ഗ്രാഫിക്സിലും ടീസറിലും തീർന്നു... ഒടുവിൽ കഥ എഴുതാൻ മറന്നുപോയി!",
    "തിയേറ്ററിൽ ആദ്യത്തെ ആഴ്ച തന്നെ കാറ്റ് പോയതാണ്, നീ ഇപ്പോഴാണോ ഇത് തപ്പിയെടുത്തത്?",
    "സൂപ്പർ താരങ്ങളുടെ ഡേറ്റ് കിട്ടി, പക്ഷെ നിന്റെ സമയം കളയാൻ വേണ്ടി മാത്രം ഇറക്കിയ പടം!"
  ],

  // Cult / Absurdist Tier (> 5.8)
  tierCult: [
    "ഇത് 'വേറെ ലെവൽ മേക്കിംഗ്' ആണെന്ന് പറഞ്ഞ് 10 പേര് നടപ്പുണ്ട്... നീയും അതിൽ പെട്ടോ?",
    "ആർക്കും മനസ്സിലാവാത്തത് കൊണ്ട് 'കൾട്ട് ക്ലാസിക്' എന്ന് വിളിച്ച് ആശ്വസിക്കുന്ന ചില പടങ്ങളുണ്ട്, ഇതും അതുപോലെ ഒന്ന്!",
    "നിനക്ക് സിനിമ മനസ്സിലാവാത്തതാണോ, അതോ സിനിമയിൽ ഒന്നും ഇല്ലാത്തതാണോ എന്ന് ആലോചിച്ച് തല പുണ്ണാക്കിക്കോ.",
    "അതിബുദ്ധിമാന്മാരുടെ കൂട്ടത്തിൽ പെടാൻ ശ്രമിച്ച് ഒടുവിൽ തലവേദന വാങ്ങി വെക്കുന്ന നിഷ്കളങ്കൻ!"
  ],

  // Downgrade sequence
  makeItWorse: [
    "ഇതിലും വലിയ ദുരന്തം വേണമെന്ന് നീ സ്വയം ചോദിച്ചു വാങ്ങിയതല്ലേ... അനുഭവിച്ചോ!",
    "താഴോട്ട് പോകുന്തോറും നിന്റെ ടേസ്റ്റിന്റെ നിലവാരം പാതാളം തൊടുകയാണ്!",
    "ചാവാൻ കിടക്കുന്നവന്റെ മേത്ത് തെങ്ങ് വീണ അവസ്ഥ! ഇനിയും താഴോട്ട് പോണോ?",
    "നിന്റെ വാശി കണ്ടാൽ തോന്നും ഏറ്റവും മോശം പടം കണ്ടതിന് സർക്കാര് നിനക്ക് അവാർഡ് തരുമെന്ന്!",
    "നല്ല പടം കാണാൻ ആരെങ്കിലും നിന്നെ വിലക്കിയിട്ടുണ്ടോ? എന്തിനാണ് ഈ സ്വയം പീഡനം?",
    "നിന്റെ ടേസ്റ്റ് ഇപ്പോൾ സമുദ്രനിരപ്പിൽ നിന്ന് 500 മീറ്റർ താഴെയാണ് സഞ്ചരിക്കുന്നത്!"
  ],

  // Favorite Saved Messages
  favoriteAdded: [
    "ഈ ദുരന്തം നീ സേവ് ചെയ്തോ? നിന്നെ സമ്മതിക്കണം ബ്രോ!",
    "ഭാവിയിൽ വീണ്ടും കണ്ട് സ്വയം ശിക്ഷിക്കാൻ വേണ്ടി എടുത്തു വെച്ചതാണോ? കുറച്ചു ഉളുപ്പ്?",
    "നിന്റെ സേവ്ഡ് ലിസ്റ്റ് കണ്ടാൽ വീട്ടുകാർ നിന്നെ കുടുംബത്തിൽ നിന്ന് പുറത്താക്കും!",
    "ഇതൊക്കെ ഇഷ്ടപ്പെട്ട് സൂക്ഷിക്കുന്ന നിന്റെ മനസ്സ് ഒരു വല്ലാത്ത മനസ്സ് തന്നെ!"
  ],

  // Category Specific
  bottomCategory: [
    "'കൊടും ദുരന്തങ്ങൾ' എന്ന് അറിഞ്ഞുകൊണ്ട് തന്നെ ക്ലിക്ക് ചെയ്ത നിന്നെ എന്ത് വിളിക്കണം?",
    "സിനിമയുടെ പടുകുഴിയിലേക്ക് സ്വാഗതം! ഇവിടെ ശുദ്ധവായു പ്രതീക്ഷിക്കരുത്."
  ],
  overhypedCategory: [
    "മാർക്കറ്റിംഗ് ടീം കോടികൾ വാരി... പാവം പ്രേക്ഷകന് കിട്ടിയത് കൊടും തലവേദന!"
  ],
  accidentalComedyCategory: [
    "വളരെ ഗൗരവത്തോടെ എടുത്ത സീനുകൾ കണ്ട് വയറു നിറയെ ചിരിക്കാൻ റെഡിയായിക്കോ!"
  ],
  pureRegretCategory: [
    "യാതൊരു ത്രില്ലുമില്ലാത്ത പച്ചയായ പശ്ചാത്താപം... അതാണ് നിന്നെ കാത്തിരിക്കുന്നത്."
  ]
};

class UIEngine {
  constructor() {
    this.sfx = new SfxManager();
    this.currentMovie = null;
    this.worseStreak = 0;
  }

  getCommentary(movie, isWorse = false, categoryContext = null) {
    if (isWorse) {
      this.worseStreak++;
      const pool = COMMENTARY.makeItWorse;
      return pool[Math.floor(Math.random() * pool.length)];
    }

    this.worseStreak = 0;

    if (categoryContext === "bottom") {
      return COMMENTARY.bottomCategory[Math.floor(Math.random() * COMMENTARY.bottomCategory.length)];
    }
    if (categoryContext === "overHyped") {
      return COMMENTARY.overhypedCategory[Math.floor(Math.random() * COMMENTARY.overhypedCategory.length)];
    }
    if (categoryContext === "accidentalComedy") {
      return COMMENTARY.accidentalComedyCategory[Math.floor(Math.random() * COMMENTARY.accidentalComedyCategory.length)];
    }
    if (categoryContext === "pureRegret") {
      return COMMENTARY.pureRegretCategory[Math.floor(Math.random() * COMMENTARY.pureRegretCategory.length)];
    }

    const rating = movie.rating;
    let pool;
    if (rating < 3.5) {
      pool = COMMENTARY.tierUltraLow;
    } else if (rating <= 4.2) {
      pool = COMMENTARY.tierDisaster;
    } else if (rating <= 5.0) {
      pool = COMMENTARY.tierQuestionable;
    } else if (rating <= 5.8) {
      pool = COMMENTARY.tierOverHyped;
    } else {
      pool = COMMENTARY.tierCult;
    }

    return pool[Math.floor(Math.random() * pool.length)];
  }

  calculateRegret(rating) {
    const percentage = Math.round((10.0 - rating) * 10);
    return Math.min(100, Math.max(5, percentage));
  }

  getRegretLabel(percentage) {
    if (percentage >= 90) return "ഐസിയു അഡ്മിഷൻ ഉറപ്പാണ് 💀";
    if (percentage >= 80) return "തലച്ചോറിലെ ചിന്താശേഷി നിലച്ചു 📉";
    if (percentage >= 70) return "ആത്മനിന്ദയുടെ പാരമ്യം 🫠";
    if (percentage >= 60) return "ഈ ജന്മത്തിൽ ഇനി ഒരു പടവും കാണില്ലെന്ന തീരുമാനം 🤦";
    return "ഒരു ചെറിയ നെടുവീർപ്പ് മാത്രം 😐";
  }

  updateRegretMeter(rating) {
    const meterFill = document.getElementById("regretMeterFill");
    const meterVal = document.getElementById("regretMeterValue");
    const meterLabel = document.getElementById("regretMeterLabel");
    if (!meterFill || !meterVal) return;

    const percentage = this.calculateRegret(rating);
    meterFill.style.width = `${percentage}%`;
    meterVal.textContent = `${percentage}%`;

    if (meterLabel) {
      meterLabel.textContent = this.getRegretLabel(percentage);
    }

    meterFill.className = "meter-fill";
    if (percentage >= 88) {
      meterFill.classList.add("meter-lethal");
    } else if (percentage >= 75) {
      meterFill.classList.add("meter-danger");
    } else {
      meterFill.classList.add("meter-warning");
    }
  }

  /**
   * Renders the recommended movie card with sarcastic section titles.
   */
  renderMovie(movie, isWorse = false, categoryContext = null) {
    this.currentMovie = movie;
    const stage = document.getElementById("movieStage");
    if (!stage || !movie) return;

    if (isWorse || movie.rating < 4.0) {
      this.sfx.playDisaster();
    } else {
      this.sfx.playClick();
    }

    const commentaryText = this.getCommentary(movie, isWorse, categoryContext);
    const isFav = window.appState ? window.appState.isFavorite(movie.id) : false;

    const castString = Array.isArray(movie.cast) ? movie.cast.join(", ") : "അറിയപ്പെടാത്ത ജീവികൾ";
    const genrePills = Array.isArray(movie.genre)
      ? movie.genre.map(g => `<span class="badge badge-genre">${g}</span>`).join(" ")
      : "";

    stage.innerHTML = `
      <div class="movie-card ${isWorse ? "shake-card" : "reveal-card"}">
        <div class="card-grid">
          <!-- Left: Poster & Rating -->
          <div class="poster-col">
            <div class="poster-wrapper">
              <img 
                src="./assets/images/poster-placeholder.svg" 
                alt="${movie.title} Poster" 
                class="movie-poster"
                onerror="this.src='./assets/images/poster-placeholder.svg'"
              />
              <div class="poster-overlay">
                <span class="poster-title-text">${movie.title}</span>
                <span class="poster-year-text">(${movie.year})</span>
              </div>
            </div>
            
            <div class="rating-box">
              <span class="rating-label">യഥാർത്ഥ IMDb റേറ്റിംഗ്</span>
              <div class="rating-score">
                <span class="star-icon">⭐</span>
                <span class="rating-number">${movie.rating.toFixed(1)}</span>
                <span class="rating-max">/10</span>
              </div>
              <span class="rating-note">കഷ്ടപ്പെട്ട് നിർമ്മിച്ച ഔദ്യോഗിക പണി</span>
            </div>
          </div>

          <!-- Right: Details & Sarcastic Verdict -->
          <div class="info-col">
            <div class="card-header">
              <div>
                <h2 class="movie-title">${movie.title}</h2>
                <div class="movie-submeta">
                  <span class="badge badge-year">${movie.year}</span>
                  ${genrePills}
                </div>
              </div>
              
              <button 
                id="btnFavoriteToggle" 
                class="btn-fav ${isFav ? "is-fav" : ""}" 
                title="${isFav ? "സേവ് ചെയ്തതിൽ നിന്ന് ഒഴിവാക്കൂ" : "ഈ അബദ്ധം എടുത്തു വെക്കൂ"}"
                aria-label="Toggle Favorite"
              >
                ${isFav ? "❤️ ആഹാ, സേവ് ചെയ്തിട്ടുണ്ട്!" : "🤍 ഈ അബദ്ധം സേവ് ചെയ്യ്"}
              </button>
            </div>

            <!-- Sarcastic Verdict Box (NO occurrence of word roast/റോസ്റ്റ്) -->
            <div class="roast-box">
              <div class="roast-header">
                <span class="roast-skull">💀</span>
                <strong>ഈ സിനിമ തിരഞ്ഞെടുത്ത നിനക്കുള്ള സത്യസന്ധമായ വിധി</strong>
              </div>
              <p class="roast-quote">"${commentaryText}"</p>
            </div>

            <!-- Sarcastic Details Section -->
            <div class="factual-details">
              <div class="detail-row">
                <span class="detail-label">സംവിധായകന്റെ കൈപ്പിഴ:</span>
                <span class="detail-value">${movie.director}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">ഇതിൽ ചെന്ന് പെട്ട താരങ്ങൾ:</span>
                <span class="detail-value">${castString}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">കഥയുടെ രൂപത്തിലുള്ള പണി:</span>
                <p class="detail-synopsis">${movie.description}</p>
              </div>
            </div>

            <!-- Action Row -->
            <div class="card-actions">
              <button id="btnMakeItWorse" class="btn btn-worse" title="ഇതിലും കുറഞ്ഞ റേറ്റിംഗുള്ള പടം കാണിക്കൂ">
                💀 ഇനിയും സഹിക്കാം... ഇതിലും താഴെയുള്ളത് താ!
              </button>
              <button id="btnStartFromFirst" class="btn btn-secondary" title="ആദ്യം മുതൽ വീണ്ടും തുടങ്ങുക">
                🔄 ആദ്യം മുതൽ തുടങ്ങുക
              </button>
              <button id="btnShareRoast" class="btn btn-secondary" title="ഈ നാണക്കേട് കൂട്ടുകാർക്ക് അയക്കൂ">
                🔗 എന്റെ ഈ അവസ്ഥ നാട്ടുകാരെ കാണിക്ക്
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.updateRegretMeter(movie.rating);
    this._bindCardEvents(movie, commentaryText);

    if (window.innerWidth < 768) {
      stage.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }

  _bindCardEvents(movie, commentaryText) {
    const btnWorse = document.getElementById("btnMakeItWorse");
    if (btnWorse) {
      btnWorse.addEventListener("click", () => {
        if (window.appState) window.appState.handleMakeItWorse();
      });
    }

    const btnStartFirst = document.getElementById("btnStartFromFirst");
    if (btnStartFirst) {
      btnStartFirst.addEventListener("click", () => {
        if (window.appState) window.appState.startFromFirst();
      });
    }

    const btnFav = document.getElementById("btnFavoriteToggle");
    if (btnFav) {
      btnFav.addEventListener("click", () => {
        if (window.appState) {
          const newState = window.appState.toggleFavorite(movie);
          btnFav.classList.toggle("is-fav", newState);
          btnFav.innerHTML = newState ? "❤️ ആഹാ, സേവ് ചെയ്തിട്ടുണ്ട്!" : "🤍 ഈ അബദ്ധം സേവ് ചെയ്യ്";
          if (newState) {
            const favMsg = COMMENTARY.favoriteAdded[Math.floor(Math.random() * COMMENTARY.favoriteAdded.length)];
            this.showToast(favMsg, "warning");
          } else {
            this.showToast("മോശം തിരഞ്ഞെടുപ്പുകളുടെ പട്ടികയിൽ നിന്ന് ഒഴിവാക്കി.", "info");
          }
        }
      });
    }

    const btnShare = document.getElementById("btnShareRoast");
    if (btnShare) {
      btnShare.addEventListener("click", () => {
        const shareText = `💀 'മലയാളം മൂവി റൗലറ്റ്' വഴി ഞാൻ കണ്ടു മുടിഞ്ഞ പടം: "${movie.title}" (${movie.rating}/10)!\n\nവിധി: "${commentaryText}"\n\nനിനക്കും ജീവിതം മടുത്തുവെങ്കിൽ നോക്ക്: ${window.location.href}`;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(shareText).then(() => {
            this.showToast("നിന്റെ നാണക്കേട് കോപ്പി ചെയ്തു! വാട്സാപ്പിൽ പോയി ആളുകളെ പേടിപ്പിക്ക്.", "success");
          }).catch(() => {
            this._fallbackCopy(shareText);
          });
        } else {
          this._fallbackCopy(shareText);
        }
      });
    }
  }

  _fallbackCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      this.showToast("കോപ്പി ചെയ്തു! ഷെയർ ചെയ്യൂ.", "success");
    } catch (e) {
      this.showToast("ഓട്ടോ-കോപ്പി ചെയ്യാൻ പറ്റിയില്ല. ക്ലിപ്പ്ബോർഡ് പോലും തൊടാൻ മടിക്കുന്നു!", "warning");
    }
    document.body.removeChild(ta);
  }

  showRockBottomModal(currentMovie) {
    this.sfx.playDisaster();
    const modal = document.getElementById("rockBottomModal");
    const lowestTitle = document.getElementById("lowestMovieTitle");
    const lowestRating = document.getElementById("lowestMovieRating");

    if (lowestTitle) lowestTitle.textContent = currentMovie.title;
    if (lowestRating) lowestRating.textContent = `${currentMovie.rating.toFixed(1)}/10`;

    if (modal) {
      modal.classList.add("modal-open");
    }
  }

  closeRockBottomModal() {
    const modal = document.getElementById("rockBottomModal");
    if (modal) modal.classList.remove("modal-open");
  }

  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === "warning" ? "⚠️" : type === "success" ? "✨" : "💬"}</span>
      <span class="toast-msg">${message}</span>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("toast-fadeout");
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  updateCounter(count) {
    const el = document.getElementById("counterValue");
    if (el) el.textContent = count;
  }

  renderAchievements(achievements, newlyUnlocked = null) {
    const listEl = document.getElementById("achievementsList");
    if (!listEl) return;

    if (newlyUnlocked) {
      this.sfx.playAchievement();
      this.showToast(`🏆 പുതിയ നാഴികക്കല്ല്: ${newlyUnlocked.title} - "${newlyUnlocked.desc}"`, "success");
    }

    listEl.innerHTML = achievements.map(ach => `
      <div class="achievement-badge ${ach.unlocked ? "badge-unlocked" : "badge-locked"}" title="${ach.desc}">
        <span class="ach-icon">${ach.icon}</span>
        <div class="ach-meta">
          <span class="ach-title">${ach.title}</span>
          <span class="ach-desc">${ach.desc}</span>
        </div>
        ${ach.unlocked ? '<span class="ach-check">✓</span>' : '<span class="ach-lock">🔒</span>'}
      </div>
    `).join("");
  }

  renderHistory(historyItems) {
    const container = document.getElementById("historyList");
    if (!container) return;

    if (!historyItems || historyItems.length === 0) {
      container.innerHTML = `<p class="empty-state">ഇതുവരെ സിനിമകളൊന്നും കണ്ടിട്ടില്ല. നിങ്ങളുടെ മാനം തൽക്കാലം ബാക്കിയുണ്ട്!</p>`;
      return;
    }

    container.innerHTML = historyItems.map(item => `
      <div class="history-item">
        <div class="history-info">
          <strong class="history-title">${item.title}</strong>
          <span class="history-year">(${item.year}) • ${item.timestamp}</span>
        </div>
        <div class="history-rating">
          ⭐ ${item.rating.toFixed(1)}
        </div>
      </div>
    `).join("");
  }

  renderFavorites(favorites) {
    const container = document.getElementById("favoritesList");
    if (!container) return;

    const badge = document.getElementById("favCountBadge");
    if (badge) badge.textContent = favorites ? favorites.length : 0;

    if (!favorites || favorites.length === 0) {
      container.innerHTML = `<p class="empty-state">നിങ്ങൾ ഇതുവരെ അബദ്ധങ്ങളൊന്നും സേവ് ചെയ്തിട്ടില്ല.</p>`;
      return;
    }

    container.innerHTML = favorites.map(movie => `
      <div class="favorite-item">
        <div class="fav-info">
          <strong>${movie.title}</strong>
          <span class="fav-meta">${movie.year} • ⭐ ${movie.rating.toFixed(1)}</span>
        </div>
        <div class="fav-actions">
          <button class="btn-fav-load" data-id="${movie.id}" title="ഈ തെറ്റ് വീണ്ടും കാണുക">കാണുക</button>
          <button class="btn-fav-remove" data-id="${movie.id}" title="ഒഴിവാക്കുക">✕</button>
        </div>
      </div>
    `).join("");

    container.querySelectorAll(".btn-fav-load").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.dataset.id, 10);
        if (window.appState) window.appState.loadSpecificMovie(id);
      });
    });

    container.querySelectorAll(".btn-fav-remove").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const id = parseInt(e.currentTarget.dataset.id, 10);
        if (window.appState) {
          const removed = window.appState.removeFavorite(id);
          if (removed) {
            this.showToast("അബദ്ധം സേവ് ചെയ്തതിൽ നിന്ന് ഒഴിവാക്കി.", "info");
          }
        }
      });
    });
  }
}

window.uiEngine = new UIEngine();
