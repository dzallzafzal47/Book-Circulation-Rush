# Book Circulation Rush

Book Circulation Rush is a lightweight web game about library circulation activities. The player acts as a librarian and must quickly process visitor requests such as borrowing, returning, renewing, and paying overdue fines.

This project is designed to be simple, responsive, and professional-looking, so it can run well on both mobile and desktop browsers.

## Features

- Responsive layout for mobile and desktop
- Choose a **male librarian (Bayu)** or **female librarian (Ayu)**
- Character images are included in the project
- Enter your **own custom character name**
- **How to Play** opens first and is also available from the main menu
- Lightweight stack: **HTML, CSS, and vanilla JavaScript**
- Score, combo, timer, and best-score system
- High score saved with `localStorage`
- Library background image already included
- Ready for GitHub and GitHub Pages deployment

## Gameplay

1. Read the **How to Play** screen.
2. Continue to the character setup.
3. Choose Bayu or Ayu and edit the name if needed.
4. Start the session.
5. Read the visitor request.
6. Select the correct action:
   - Borrow
   - Return
   - Renew
   - Fine
7. Get the highest score possible before time runs out.

## Project Structure

```text
book-circulation-rush/
├── assets/
│   ├── library-bg.jpg
│   ├── male-librarian.webp
│   └── female-librarian.jpg
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── index.html
├── LICENSE
└── README.md
```

## Run Locally

### Option 1: Open directly

Open `index.html` in your browser.

### Option 2: Use a simple local server

```bash
cd book-circulation-rush
python3 -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000
```

## Upload to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/book-circulation-rush.git
git push -u origin main
```

## Deploy to GitHub Pages

1. Push the project to GitHub.
2. Open the repository on GitHub.
3. Go to **Settings** → **Pages**.
4. Under **Build and deployment**, choose:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Save.

GitHub will publish the static game after deployment finishes.

## Customization

You can customize:

- the background image in `assets/library-bg.jpg`
- interface text in `index.html`
- colors and layout in `css/styles.css`
- game rules, timer, visitors, and score logic in `js/app.js`

## License

MIT License

Copyright (c) 2026 Afzaal Alwafier
