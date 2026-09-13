/**
 * Malayalam Movie Roulette 💀 - Application Orchestrator (Malayalam)
 * Connects MovieDatabase, UIEngine, LocalStorage persistence, filters, and Malayalam notifications.
 */

const STORAGE_KEYS = {
  COUNTER: "mmr_counter",
  HISTORY: "mmr_history",
  FAVORITES: "mmr_favorites",
  ACHIEVEMENTS: "mmr_achievements",
  MUTED: "mmr_muted"
};

const DEFAULT_ACHIEVEMENTS = [
  { id: "ach_1", title: "ആദ്യത്തെ തിരിച്ചടി", desc: "ജീവിതത്തിലെ ആദ്യത്തെ മോശം പടം കണ്ടു", threshold: 1, unlocked: false, icon: "🍼" },
  { id: "ach_5", title: "വേദന തിന്നുന്നവൻ", desc: "തുടർച്ചയായി 5 ദുരന്തങ്ങൾ സഹിച്ചു", threshold: 5, unlocked: false, icon: "🩹" },
  { id: "ach_10", title: "മോളിവുഡ് മസോക്കിസ്റ്റ്", desc: "10 മോശം സിനിമകൾ കണ്ട് മനസ്സ് മരവിച്ചു", threshold: 10, unlocked: false, icon: "🧗" },
  { id: "ach_25", title: "സിനിമാ ദുരന്ത ബാധിതൻ", desc: "25 ചവറ് സിനിമകൾ കണ്ട് ചരിത്രം സൃഷ്ടിച്ചു", threshold: 25, unlocked: false, icon: "☣️" },
  { id: "ach_50", title: "തലച്ചോറ് നഷ്ടപ്പെട്ടവൻ", desc: "50 അബദ്ധങ്ങൾ സഹിച്ചിട്ടും ഫോൺ ഓഫ് ചെയ്തില്ല", threshold: 50, unlocked: false, icon: "🧠" },
  { id: "ach_rock_bottom", title: "പാതാള വിജയി", desc: "മലയാളത്തിലെ ഏറ്റവും മോശം സിനിമ വരെ കണ്ടു തീർത്തു", threshold: null, unlocked: false, icon: "🪦" }
];

class AppState {
  constructor() {
    this.counter = 0;
    this.history = [];
    this.favorites = [];
    this.achievements = [...DEFAULT_ACHIEVEMENTS];
    this.currentMovie = null;
    this.activeFilter = {
      genre: "ALL",
      era: "ALL",
      maxRating: null,
      search: ""
    };
  }

  init() {
    this._loadStorage();
    this._populateGenreDropdown();
    this._bindEvents();

    window.uiEngine.updateCounter(this.counter);
    window.uiEngine.renderAchievements(this.achievements);
    window.uiEngine.renderHistory(this.history);
    window.uiEngine.renderFavorites(this.favorites);

    this.recommendRandom();
  }

  _loadStorage() {
    try {
      const storedCounter = localStorage.getItem(STORAGE_KEYS.COUNTER);
      if (storedCounter !== null) this.counter = parseInt(storedCounter, 10) || 0;

      const storedHistory = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (storedHistory) this.history = JSON.parse(storedHistory) || [];

      const storedFavs = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (storedFavs) this.favorites = JSON.parse(storedFavs) || [];

      const storedAchs = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      if (storedAchs) {
        const parsed = JSON.parse(storedAchs);
        this.achievements = DEFAULT_ACHIEVEMENTS.map(def => {
          const found = parsed.find(p => p.id === def.id);
          return found ? { ...def, unlocked: found.unlocked } : def;
        });
      }

      const storedMuted = localStorage.getItem(STORAGE_KEYS.MUTED);
      if (storedMuted === "true" && window.uiEngine) {
        window.uiEngine.sfx.muted = true;
        const soundBtn = document.getElementById("btnToggleSound");
        if (soundBtn) soundBtn.textContent = "🔇";
      }
    } catch (e) {
      console.warn("Storage access restricted or unavailable:", e);
    }
  }

  _saveStorage() {
    try {
      localStorage.setItem(STORAGE_KEYS.COUNTER, this.counter.toString());
      localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(this.history.slice(0, 20)));
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(this.favorites));
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(this.achievements));
    } catch (e) {
      console.warn("Unable to save to localStorage:", e);
    }
  }

  recommendRandom() {
    let pool = window.movieDB.filterMovies({
      genre: this.activeFilter.genre,
      era: this.activeFilter.era,
      maxRating: this.activeFilter.maxRating
    });

    if (this.activeFilter.search) {
      const searchMatches = window.movieDB.searchMovies(this.activeFilter.search);
      const searchIds = new Set(searchMatches.map(m => m.id));
      pool = pool.filter(m => searchIds.has(m.id));
    }

    if (pool.length === 0) {
      window.uiEngine.showToast("നിങ്ങൾ തിരഞ്ഞ മാനദണ്ഡങ്ങൾക്ക് പറ്റിയ ദുരന്തങ്ങൾ ഒന്നും കിട്ടിയില്ല. ഫിൽട്ടറുകൾ മാറ്റി നോക്കൂ!", "warning");
      return;
    }

    const movie = window.movieDB.getRandomMovie(pool);
    this._applyRecommendation(movie, false, null);
  }

  recommendCategory(categoryKey) {
    let pool;
    if (categoryKey === "bottom") {
      pool = window.movieDB.getAbsoluteBottomMovies();
    } else if (categoryKey === "overHyped") {
      pool = window.movieDB.getOverHypedDisasters();
    } else if (categoryKey === "accidentalComedy") {
      pool = window.movieDB.getAccidentalComedyMovies();
    } else if (categoryKey === "pureRegret") {
      pool = window.movieDB.getPureRegretMovies();
    } else {
      pool = window.movieDB.movies;
    }

    const movie = window.movieDB.getRandomMovie(pool);
    this._applyRecommendation(movie, false, categoryKey);
  }

  handleMakeItWorse() {
    if (!this.currentMovie) {
      this.recommendRandom();
      return;
    }

    const worseMovie = window.movieDB.getWorseMovie(this.currentMovie.rating);

    if (!worseMovie) {
      this._unlockAchievement("ach_rock_bottom");
      window.uiEngine.showRockBottomModal(this.currentMovie);
      return;
    }

    this._applyRecommendation(worseMovie, true, null);
  }

  startFromFirst() {
    // 1. Erase all prior works and history
    this.counter = 0;
    this.history = [];
    this.favorites = [];
    this.achievements = DEFAULT_ACHIEVEMENTS.map(def => ({ ...def, unlocked: false }));
    this._resetFilters();

    // 2. Persist cleared state
    this._saveStorage();

    // 3. Reset UI elements
    window.uiEngine.updateCounter(0);
    window.uiEngine.renderHistory([]);
    window.uiEngine.renderFavorites([]);
    window.uiEngine.renderAchievements(this.achievements);
    window.uiEngine.worseStreak = 0;
    window.uiEngine.closeRockBottomModal();

    // 4. Restart from the top of the disaster chain with a fresh slate
    const sorted = [...window.movieDB.movies].sort((a, b) => b.rating - a.rating);
    const topMovie = sorted[0];

    if (topMovie) {
      this._applyRecommendation(topMovie, false, null);
      window.uiEngine.showToast("നിന്റെ മുൻപത്തെ എല്ലാ തെറ്റുകളും മായ്ച്ചു കളഞ്ഞു! ഒരു പുതിയ ജന്മം പോലെ തുടക്കം... പക്ഷെ നിന്റെ ടേസ്റ്റിന് ഒരു മാറ്റവും ഉണ്ടാവില്ലെന്ന് ഉറപ്പാണ്.", "info");
    }
  }

  _resetFilters() {
    this.activeFilter = { genre: "ALL", era: "ALL", maxRating: null, search: "" };
    const searchInput = document.getElementById("movieSearch");
    if (searchInput) searchInput.value = "";
    const filterGenre = document.getElementById("filterGenre");
    if (filterGenre) filterGenre.value = "ALL";
    const filterEra = document.getElementById("filterEra");
    if (filterEra) filterEra.value = "ALL";
    const filterMaxRating = document.getElementById("filterMaxRating");
    if (filterMaxRating) filterMaxRating.value = "ALL";
  }

  loadSpecificMovie(movieId) {
    const movie = window.movieDB.movies.find(m => m.id === movieId);
    if (movie) {
      this._applyRecommendation(movie, false, null);
      this._closeDrawers();
    }
  }

  _applyRecommendation(movie, isWorse = false, categoryContext = null) {
    if (!movie) return;
    this.currentMovie = movie;

    this.counter++;
    window.uiEngine.updateCounter(this.counter);

    if (this.history.length === 0 || this.history[0].id !== movie.id) {
      this.history.unshift({
        id: movie.id,
        title: movie.title,
        year: movie.year,
        rating: movie.rating,
        timestamp: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
      });
      if (this.history.length > 20) this.history.pop();
      window.uiEngine.renderHistory(this.history);
    }

    this._checkCounterAchievements();
    this._saveStorage();
    window.uiEngine.renderMovie(movie, isWorse, categoryContext);
  }

  isFavorite(movieId) {
    return this.favorites.some(f => f.id === movieId);
  }

  toggleFavorite(movie) {
    const index = this.favorites.findIndex(f => f.id === movie.id);
    if (index >= 0) {
      this.favorites.splice(index, 1);
      this._saveStorage();
      window.uiEngine.renderFavorites(this.favorites);
      return false;
    } else {
      this.favorites.unshift(movie);
      this._saveStorage();
      window.uiEngine.renderFavorites(this.favorites);
      return true;
    }
  }

  removeFavorite(movieId) {
    const prevLen = this.favorites.length;
    this.favorites = this.favorites.filter(f => f.id !== movieId);
    this._saveStorage();
    window.uiEngine.renderFavorites(this.favorites);
    if (this.currentMovie && this.currentMovie.id === movieId) {
      const favBtn = document.getElementById("btnFavoriteToggle");
      if (favBtn) {
        favBtn.classList.remove("is-fav");
        favBtn.innerHTML = "🤍 ഈ തെറ്റ് സേവ് ചെയ്യ്";
      }
    }
    return this.favorites.length < prevLen;
  }

  clearShame() {
    const confirmed = confirm("നിങ്ങളുടെ ചരിത്രവും കൗണ്ടറും ഡിലീറ്റ് ചെയ്യണമെന്ന് ഉറപ്പാണോ? നിങ്ങളുടെ മോശം ടേസ്റ്റ് നിങ്ങളുടെ മനസ്സിൽ തന്നെ ബാക്കിയുണ്ടാവും!");
    if (!confirmed) return;

    this.counter = 0;
    this.history = [];
    this._saveStorage();

    window.uiEngine.updateCounter(0);
    window.uiEngine.renderHistory([]);
    window.uiEngine.showToast("നിങ്ങളുടെ നാണക്കേടിന്റെ ചരിത്രം മായ്‌ച്ചു. ഇനിയെങ്കിലും കുറച്ചു നല്ല പടങ്ങൾ തിരഞ്ഞെടുക്കാൻ നോക്ക്!", "info");
  }

  _checkCounterAchievements() {
    this.achievements.forEach(ach => {
      if (!ach.unlocked && ach.threshold !== null && this.counter >= ach.threshold) {
        this._unlockAchievement(ach.id);
      }
    });
  }

  _unlockAchievement(achId) {
    const ach = this.achievements.find(a => a.id === achId);
    if (ach && !ach.unlocked) {
      ach.unlocked = true;
      this._saveStorage();
      window.uiEngine.renderAchievements(this.achievements, ach);
    }
  }

  _populateGenreDropdown() {
    const select = document.getElementById("filterGenre");
    if (!select) return;
    const genres = window.movieDB.getAllGenres();
    select.innerHTML = `<option value="ALL">എല്ലാ വിഭാഗങ്ങളും</option>` +
      genres.map(g => `<option value="${g}">${g}</option>`).join("");
  }

  _bindEvents() {
    const btnRuin = document.getElementById("btnRuinEvening");
    if (btnRuin) {
      btnRuin.addEventListener("click", () => this.recommendRandom());
    }

    const btnHeroStart = document.getElementById("btnHeroStartFirst");
    if (btnHeroStart) {
      btnHeroStart.addEventListener("click", () => this.startFromFirst());
    }

    const btnBottom = document.getElementById("btnCatBottom");
    if (btnBottom) {
      btnBottom.addEventListener("click", () => this.recommendCategory("bottom"));
    }

    const btnOverHyped = document.getElementById("btnCatOverHyped");
    if (btnOverHyped) {
      btnOverHyped.addEventListener("click", () => this.recommendCategory("overHyped"));
    }

    const btnAccidental = document.getElementById("btnCatAccidental");
    if (btnAccidental) {
      btnAccidental.addEventListener("click", () => this.recommendCategory("accidentalComedy"));
    }

    const btnPureRegret = document.getElementById("btnCatPureRegret");
    if (btnPureRegret) {
      btnPureRegret.addEventListener("click", () => this.recommendCategory("pureRegret"));
    }

    const searchInput = document.getElementById("movieSearch");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.activeFilter.search = e.target.value.trim();
      });
      searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") this.recommendRandom();
      });
    }

    const filterGenre = document.getElementById("filterGenre");
    if (filterGenre) {
      filterGenre.addEventListener("change", (e) => {
        this.activeFilter.genre = e.target.value;
      });
    }

    const filterEra = document.getElementById("filterEra");
    if (filterEra) {
      filterEra.addEventListener("change", (e) => {
        this.activeFilter.era = e.target.value;
      });
    }

    const filterMaxRating = document.getElementById("filterMaxRating");
    if (filterMaxRating) {
      filterMaxRating.addEventListener("change", (e) => {
        const val = parseFloat(e.target.value);
        this.activeFilter.maxRating = isNaN(val) ? null : val;
      });
    }

    const btnResetFilters = document.getElementById("btnResetFilters");
    if (btnResetFilters) {
      btnResetFilters.addEventListener("click", () => {
        this.activeFilter = { genre: "ALL", era: "ALL", maxRating: null, search: "" };
        if (searchInput) searchInput.value = "";
        if (filterGenre) filterGenre.value = "ALL";
        if (filterEra) filterEra.value = "ALL";
        if (filterMaxRating) filterMaxRating.value = "ALL";
        window.uiEngine.showToast("ഫിൽട്ടറുകൾ റീസെറ്റ് ചെയ്തു.", "info");
      });
    }

    const btnResetShame = document.getElementById("btnResetShame");
    if (btnResetShame) {
      btnResetShame.addEventListener("click", () => this.clearShame());
    }

    const btnSound = document.getElementById("btnToggleSound");
    if (btnSound) {
      btnSound.addEventListener("click", () => {
        const isMuted = window.uiEngine.sfx.toggleMute();
        btnSound.textContent = isMuted ? "🔇" : "🔊";
        try {
          localStorage.setItem(STORAGE_KEYS.MUTED, isMuted ? "true" : "false");
        } catch (e) {}
      });
    }

    this._bindDrawer("btnOpenHistory", "drawerHistory", "btnCloseHistory");
    this._bindDrawer("btnOpenFavorites", "drawerFavorites", "btnCloseFavorites");

    const btnModalStart = document.getElementById("btnModalStartFirst");
    if (btnModalStart) {
      btnModalStart.addEventListener("click", () => this.startFromFirst());
    }

    const btnCloseModal = document.getElementById("btnCloseRockBottom");
    if (btnCloseModal) {
      btnCloseModal.addEventListener("click", () => window.uiEngine.closeRockBottomModal());
    }
    const modalBackdrop = document.getElementById("rockBottomModal");
    if (modalBackdrop) {
      modalBackdrop.addEventListener("click", (e) => {
        if (e.target === modalBackdrop) window.uiEngine.closeRockBottomModal();
      });
    }
  }

  _bindDrawer(openBtnId, drawerId, closeBtnId) {
    const openBtn = document.getElementById(openBtnId);
    const drawer = document.getElementById(drawerId);
    const closeBtn = document.getElementById(closeBtnId);

    if (openBtn && drawer) {
      openBtn.addEventListener("click", () => {
        drawer.classList.add("drawer-open");
      });
    }

    if (closeBtn && drawer) {
      closeBtn.addEventListener("click", () => {
        drawer.classList.remove("drawer-open");
      });
    }

    document.addEventListener("click", (e) => {
      if (drawer && drawer.classList.contains("drawer-open")) {
        if (!drawer.contains(e.target) && openBtn && !openBtn.contains(e.target)) {
          drawer.classList.remove("drawer-open");
        }
      }
    });
  }

  _closeDrawers() {
    document.querySelectorAll(".drawer").forEach(d => d.classList.remove("drawer-open"));
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  window.appState = new AppState();
  await window.movieDB.loadMovies();
  window.appState.init();
});
