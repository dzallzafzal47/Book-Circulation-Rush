const state = {
  selectedCharacter: 'male',
  playerName: 'Bayu',
  score: 0,
  combo: 0,
  best: Number(localStorage.getItem('bookCirculationBest') || 0),
  longestCombo: 0,
  timeLeft: 60,
  round: 1,
  timerId: null,
  currentTask: null,
  locked: false,
};

const defaultNames = {
  male: 'Bayu',
  female: 'Ayu',
};

const characterProfiles = {
  male: { label: 'Male Librarian', image: 'assets/male-librarian.webp' },
  female: { label: 'Female Librarian', image: 'assets/female-librarian.jpg' },
};

const visitors = [
  { name: 'Alya', emoji: '🙂' },
  { name: 'Raka', emoji: '😄' },
  { name: 'Sinta', emoji: '😊' },
  { name: 'Dion', emoji: '😎' },
  { name: 'Tari', emoji: '🤓' },
  { name: 'Bayu', emoji: '🧐' },
  { name: 'Lina', emoji: '😌' },
  { name: 'Niko', emoji: '😃' },
  { name: 'Fira', emoji: '😇' },
  { name: 'Reza', emoji: '🙂' },
  { name: 'Mita', emoji: '😀' },
  { name: 'Arif', emoji: '😄' },
];

const books = [
  { title: 'The Midnight Library', author: 'Matt Haig', cover: ['#516d91', '#2d4769'] },
  { title: 'Atomic Habits', author: 'James Clear', cover: ['#da9955', '#9d4f31'] },
  { title: 'Laskar Pelangi', author: 'Andrea Hirata', cover: ['#d98f60', '#935247'] },
  { title: 'The Alchemist', author: 'Paulo Coelho', cover: ['#d8b05e', '#8b6133'] },
  { title: 'Sapiens', author: 'Yuval Noah Harari', cover: ['#b25555', '#6c313f'] },
  { title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', cover: ['#8b6948', '#5b3c32'] },
  { title: 'Deep Work', author: 'Cal Newport', cover: ['#567b88', '#31505d'] },
  { title: 'Pulang', author: 'Tere Liye', cover: ['#ab6a56', '#6c3a3a'] },
  { title: 'The Psychology of Money', author: 'Morgan Housel', cover: ['#5f8a6e', '#375646'] },
  { title: 'Filosofi Teras', author: 'Henry Manampiring', cover: ['#6384a6', '#3d527c'] },
  { title: 'The Book Thief', author: 'Markus Zusak', cover: ['#55546f', '#2f314d'] },
  { title: 'Educated', author: 'Tara Westover', cover: ['#c87858', '#874541'] },
  { title: 'Rich Dad Poor Dad', author: 'Robert T. Kiyosaki', cover: ['#6d67a8', '#494279'] },
  { title: 'Bulan', author: 'Tere Liye', cover: ['#5b88a9', '#37536b'] },
  { title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', cover: ['#6486a6', '#3e5d7b'] },
  { title: 'Cantik Itu Luka', author: 'Eka Kurniawan', cover: ['#a95a68', '#6e3c56'] },
  { title: 'Madilog', author: 'Tan Malaka', cover: ['#6b7562', '#474c43'] },
  { title: 'Negeri 5 Menara', author: 'A. Fuadi', cover: ['#a67a46', '#714f31'] },
];

const taskTemplates = {
  borrow: (visitor, book) => `${visitor.name} wants to borrow "${book.title}" today. Process the loan request correctly.`,
  return: (visitor, book) => `${visitor.name} is returning "${book.title}" to the library desk. Complete the return process.`,
  renew: (visitor, book) => `${visitor.name} still needs "${book.title}" and asks to extend the due date. Process a renewal.`,
  fine: (visitor, book) => `${visitor.name} returned "${book.title}" late and has an overdue fine to settle. Process the fine payment.`,
};

const screens = {
  menu: document.getElementById('menuScreen'),
  howToPlay: document.getElementById('howToPlayScreen'),
  game: document.getElementById('gameScreen'),
  result: document.getElementById('resultScreen'),
};

const els = {
  startBtn: document.getElementById('startBtn'),
  howToPlayBtn: document.getElementById('howToPlayBtn'),
  backToMenuBtn: document.getElementById('backToMenuBtn'),
  playAgainBtn: document.getElementById('playAgainBtn'),
  goHomeBtn: document.getElementById('goHomeBtn'),
  characterCards: [...document.querySelectorAll('.character-card')],
  characterName: document.getElementById('characterName'),
  playerAvatar: document.getElementById('playerAvatar'),
  resultAvatar: document.getElementById('resultAvatar'),
  playerName: document.getElementById('playerName'),
  resultPlayerName: document.getElementById('resultPlayerName'),
  scoreValue: document.getElementById('scoreValue'),
  comboValue: document.getElementById('comboValue'),
  bestValue: document.getElementById('bestValue'),
  timeValue: document.getElementById('timeValue'),
  roundValue: document.getElementById('roundValue'),
  visitorEmoji: document.getElementById('visitorEmoji'),
  visitorName: document.getElementById('visitorName'),
  requestTypeBadge: document.getElementById('requestTypeBadge'),
  bookTitle: document.getElementById('bookTitle'),
  bookCoverTitle: document.getElementById('bookCoverTitle'),
  bookCoverAuthor: document.getElementById('bookCoverAuthor'),
  bookCoverCard: document.getElementById('bookCoverCard'),
  requestText: document.getElementById('requestText'),
  feedbackBanner: document.getElementById('feedbackBanner'),
  finalScore: document.getElementById('finalScore'),
  finalBest: document.getElementById('finalBest'),
  finalCombo: document.getElementById('finalCombo'),
  actionButtons: [...document.querySelectorAll('.action-btn')],
};

function showScreen(name) {
  Object.values(screens).forEach((screen) => screen.classList.remove('active'));
  screens[name].classList.add('active');
}

function randomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function setSelectedCharacter(character) {
  state.selectedCharacter = character;
  els.characterCards.forEach((card) => {
    const active = card.dataset.character === character;
    card.classList.toggle('selected', active);
    card.setAttribute('aria-pressed', String(active));
  });

  if (!els.characterName.value.trim() || els.characterName.value.trim() === defaultNames.male || els.characterName.value.trim() === defaultNames.female) {
    els.characterName.value = defaultNames[character];
  }
}

function getSafePlayerName() {
  const typed = els.characterName.value.trim();
  return typed || defaultNames[state.selectedCharacter];
}

function applyPlayerProfile() {
  state.playerName = getSafePlayerName();
  const profile = characterProfiles[state.selectedCharacter];

  [els.playerAvatar, els.resultAvatar].forEach((target) => {
    target.className = `avatar ${target.id === 'playerAvatar' ? 'small' : 'medium'} character-photo-shell`;
    target.innerHTML = `<img src="${profile.image}" alt="${profile.label}" />`;
  });

  els.playerName.textContent = state.playerName;
  els.resultPlayerName.textContent = state.playerName;
}

function updateHud() {
  els.scoreValue.textContent = String(state.score);
  els.comboValue.textContent = `${state.combo}x`;
  els.bestValue.textContent = String(state.best);
  els.timeValue.textContent = String(state.timeLeft);
  els.roundValue.textContent = `Round ${state.round}`;
}

function renderBookCover(book) {
  els.bookCoverTitle.textContent = book.title;
  els.bookCoverAuthor.textContent = book.author;
  els.bookCoverCard.style.setProperty('--cover-start', book.cover[0]);
  els.bookCoverCard.style.setProperty('--cover-end', book.cover[1]);
}

function createTask() {
  const action = randomItem(['borrow', 'return', 'renew', 'fine']);
  const visitor = randomItem(visitors);
  const book = randomItem(books);

  state.currentTask = {
    action,
    visitor,
    book,
    description: taskTemplates[action](visitor, book),
  };

  els.visitorEmoji.textContent = visitor.emoji;
  els.visitorName.textContent = visitor.name;
  els.requestTypeBadge.textContent = capitalize(action);
  els.bookTitle.textContent = book.title;
  els.requestText.textContent = state.currentTask.description;
  renderBookCover(book);
  resetActionButtons();
}

function resetActionButtons() {
  els.actionButtons.forEach((btn) => {
    btn.classList.remove('correct', 'wrong');
    btn.disabled = false;
  });
}

function setFeedback(message, type = '') {
  els.feedbackBanner.textContent = message;
  els.feedbackBanner.className = 'feedback-banner';
  if (type) els.feedbackBanner.classList.add(type);
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function handleAction(event) {
  if (state.locked || !state.currentTask) return;
  state.locked = true;

  const chosen = event.currentTarget.dataset.action;
  const correct = state.currentTask.action;

  if (chosen === correct) {
    state.combo += 1;
    state.longestCombo = Math.max(state.longestCombo, state.combo);
    const points = 10 + Math.max(0, state.combo - 1) * 2;
    state.score += points;
    event.currentTarget.classList.add('correct');
    setFeedback(`Correct! +${points} points`, 'success');
  } else {
    state.combo = 0;
    state.timeLeft = Math.max(0, state.timeLeft - 4);
    event.currentTarget.classList.add('wrong');
    const correctButton = els.actionButtons.find((btn) => btn.dataset.action === correct);
    if (correctButton) correctButton.classList.add('correct');
    setFeedback(`Wrong action. The correct answer was ${capitalize(correct)}. -4 seconds`, 'error');
  }

  if (state.score > state.best) {
    state.best = state.score;
    localStorage.setItem('bookCirculationBest', String(state.best));
  }

  updateHud();

  setTimeout(() => {
    if (state.timeLeft <= 0) {
      endGame();
      return;
    }
    state.round += 1;
    state.locked = false;
    createTask();
    updateHud();
  }, 600);
}

function startGame() {
  clearInterval(state.timerId);
  applyPlayerProfile();
  state.score = 0;
  state.combo = 0;
  state.longestCombo = 0;
  state.timeLeft = 60;
  state.round = 1;
  state.locked = false;

  createTask();
  updateHud();
  setFeedback(`${state.playerName}'s desk is open. Process the first request.`);
  showScreen('game');

  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    updateHud();
    if (state.timeLeft <= 0) {
      endGame();
    }
  }, 1000);
}

function endGame() {
  clearInterval(state.timerId);
  els.finalScore.textContent = String(state.score);
  els.finalBest.textContent = String(state.best);
  els.finalCombo.textContent = `${state.longestCombo}x`;
  applyPlayerProfile();
  showScreen('result');
}

function bindEvents() {
  els.characterCards.forEach((card) => {
    card.addEventListener('click', () => setSelectedCharacter(card.dataset.character));
  });

  els.startBtn.addEventListener('click', startGame);
  els.howToPlayBtn.addEventListener('click', () => showScreen('howToPlay'));
  els.backToMenuBtn.addEventListener('click', () => showScreen('menu'));
  els.playAgainBtn.addEventListener('click', startGame);
  els.goHomeBtn.addEventListener('click', () => showScreen('menu'));
  els.actionButtons.forEach((btn) => btn.addEventListener('click', handleAction));
}

function init() {
  els.bestValue.textContent = String(state.best);
  setSelectedCharacter('male');
  bindEvents();
  renderBookCover(books[0]);
}

init();
