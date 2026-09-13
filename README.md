# Malayalam Movie Roulette 💀

> *"Because apparently your taste in movies wasn't bad enough."*

A web application that recommends **REAL**, below-average Malayalam movies while aggressively roasting your questionable movie choices. Built strictly with **vanilla HTML, CSS, and modern JavaScript** (zero frameworks, zero external API keys, zero backend dependencies).

---

## 🎭 Philosophy & Humor Boundaries

- **100% Real Movies Only**: All 26 titles in the database are real Malayalam feature films released between 2007 and 2024 with verified public IMDb ratings between **3.1 and 6.1**.
- **No Fabrications**: Factual information (actors, directors, release years, synopses, and ratings) is completely real and kept strictly separate from the roast commentary.
- **Roast the User, Not the Creators**: The humor targets the **user's decision** to watch low-rated movies on a Friday night, their inability to pick good cinema, and their descending spiral of regret. It never defames or makes personal attacks against actors, directors, or film crews.

---

## ⚡ Key Features

1. **🎲 Ruin My Evening (The Roulette Button)**:
   - Instantly recommends a real low-rated Malayalam disaster with a context-aware roast.

2. **💀 "Make It Worse" Downgrade Algorithm**:
   - Searches the database for a movie with a strictly lower rating than the one currently displayed.
   - **Rock Bottom Detection**: When you reach the absolute lowest-rated film (*Salam Kashmier* at 3.1/10), the app triggers the Rock Bottom Modal and unlocks the rare *"Rock Bottom Survivor"* achievement.

3. **📊 Predicted Regret Meter**:
   - Computes an inverse emotional damage percentage based on the rating:
     $$\text{Regret Level} = \text{Clamp}\Big(\text{Round}\big((10.0 - \text{Rating}) \times 10\big), 5\%, 100\%\Big)$$
   - Color shifts from warning amber to lethal glowing crimson.

4. **🎪 Curated Disaster Categories**:
   - **💀 Absolute Bottom (< 4.0)**: Sub-4.0 catastrophe tier (*Salam Kashmier*, *White*, *Alone*, *Lailaa O Lailaa*, *Aaraattu*).
   - **🎪 Over-Hyped Disasters**: High-budget, high-profile misfires (*Marakkar*, *Odiyan*, *Mamangam*, *Gold*, *CBI 5*).
   - **🤨 Accidental Comedy**: Films so absurd they loop back into unintentional comedy (*Masterpiece*, *Shylock*, *China Town*, *Double Barrel*).
   - **📉 Pure Regret**: Standard-issue mid-tier cinematic grief (*Big Brother*, *Monster*, *Jack N Jill*).

5. **🔍 Multi-Attribute Filters & Live Search**:
   - Search by Title, Director, or Actor.
   - Filter by Genre (Action, Comedy, Horror, Romance, Sci-Fi, Cult, etc.).
   - Filter by Era (2020s, 2010s, Before 2010).
   - Filter by Maximum Rating Cap (≤ 5.5, ≤ 5.0, ≤ 4.0, ≤ 3.5).

6. **📜 Hall of Shame (History)**:
   - Sliding sidebar drawer tracking your session and lifetime regretted films with timestamps and ratings.

7. **❤️ Saved Mistakes (Favorites)**:
   - Bookmark your favorite disasters in `localStorage`. Revisit them or clear them at any time.

8. **🏆 Taste Degradation Milestones (Achievements)**:
   - *First Taste of Tragedy* (1 movie)
   - *Glutton for Punishment* (5 movies)
   - *Mollywood Masochist* (10 movies)
   - *Certified Cinema Hazard* (25 movies)
   - *Brain Cell Obliterator* (50 movies)
   - *Rock Bottom Survivor* (Triggered Rock Bottom)

9. **🔊 Synthesized Web Audio FX**:
   - Subtle procedural sound effects using browser Web Audio API (zero MP3/WAV assets to load). Includes mute toggle.

10. **🛡️ Dual-Mode CORS-Proof Data Engine**:
    - Fetches `data/movies.json` when served via HTTP/HTTPS.
    - Automatically falls back to embedded dataset when opened directly from disk via `file:///` in Chrome/Edge/Firefox.

---

## 🚀 How to Run

### Option 1: Direct File Launch (Zero Server Required)
Simply double-click `index.html` inside `malayalam-movie-recommender/` in your file explorer. It will open in any web browser and function with 100% features.

### Option 2: Local HTTP Server
```bash
# From the repository root
python -m http.server 8000
```
Then navigate to:
```
http://localhost:8000/malayalam-movie-recommender/
```

---

## 📁 Project Structure

```
malayalam-movie-recommender/
├── index.html                     # Primary UI entry point
├── css/
│   └── style.css                  # Dark cinema theme, animations & responsive grid
├── js/
│   ├── movies.js                  # Dataset & MovieDatabase filtering/search engine
│   ├── ui.js                      # Roast engine, regret meter, drawers, audio synthesizer
│   └── app.js                     # State management, localStorage & event wiring
├── data/
│   └── movies.json                # 26 verified real Malayalam movies (3.1 to 6.1 rating)
├── assets/
│   └── images/
│       └── poster-placeholder.svg # High-contrast vector film slate poster
└── README.md                      # Documentation
```

---

## 🎬 Dataset Overview (Sample)

| Title | Year | Rating | Director | Category |
|---|---|---|---|---|
| Salam Kashmier | 2014 | **3.1** | Joshiy | Absolute Bottom |
| White | 2016 | **3.2** | Uday Ananthan | Absolute Bottom |
| Alone | 2023 | **3.5** | Shaji Kailas | Absolute Bottom |
| Lailaa O Lailaa | 2015 | **3.8** | Joshiy | Absolute Bottom |
| Aaraattu | 2022 | **3.9** | B. Unnikrishnan | Absolute Bottom |
| Monster | 2022 | **4.2** | Vysakh | Pure Regret |
| Big Brother | 2020 | **4.2** | Siddique | Pure Regret |
| Gold | 2022 | **4.8** | Alphonse Puthren | Over-Hyped |
| CBI 5: The Brain | 2022 | **5.2** | K. Madhu | Over-Hyped |
| Odiyan | 2018 | **5.3** | V. A. Shrikumar | Over-Hyped |
| Marakkar: Arabikadalinte Simham | 2021 | **5.8** | Priyadarshan | Over-Hyped |
| Double Barrel | 2015 | **6.1** | Lijo Jose Pellissery | Accidental Comedy |

---


