/* =========================================================
   BANCO DE PALAVRAS E RIMAS (CONSCIÊNCIA FONOLÓGICA)
   ========================================================= */
   const VOCABULARY = [
    { id: 'baleia',    word: 'BALEIA',    syllables: ['BA', 'LEI', 'A'],       emoji: '🐋' },
    { id: 'borboleta', word: 'BORBOLETA', syllables: ['BOR', 'BO', 'LE', 'TA'], emoji: '🦋' },
    { id: 'tartaruga', word: 'TARTARUGA', syllables: ['TAR', 'TA', 'RU', 'GA'], emoji: '🐢' },
    { id: 'girassol',  word: 'GIRASSOL',  syllables: ['GI', 'RAS', 'SOL'],     emoji: '🌻' },
    { id: 'abacaxi',   word: 'ABACAXI',   syllables: ['A', 'BA', 'CA', 'XI'],  emoji: '🍍' },
    { id: 'coruja',    word: 'CORUJA',    syllables: ['CO', 'RU', 'JA'],       emoji: '🦉' },
    { id: 'estrela',   word: 'ESTRELA',   syllables: ['ES', 'TRE', 'LA'],      emoji: '⭐' },
    { id: 'foguete',   word: 'FOGUETE',   syllables: ['FO', 'GUE', 'TE'],      emoji: '🚀' },
    { id: 'violao',    word: 'VIOLÃO',    syllables: ['VI', 'O', 'LÃO'],       emoji: '🎸' },
    { id: 'golfinho',  word: 'GOLFINHO',  syllables: ['GOL', 'FI', 'NHO'],     emoji: '🐬' },
    { id: 'montanha',  word: 'MONTANHA',  syllables: ['MON', 'TA', 'NHA'],     emoji: '⛰️' },
    { id: 'elefante',  word: 'ELEFANTE',  syllables: ['E', 'LE', 'FAN', 'TE'], emoji: '🐘' }
  ];
  
  const RHYME_PAIRS = [
    {
      pairId: 'rhyme-1',
      a: { word: 'GATO',  syllables: ['GA', 'TO'],   emoji: '🐱' },
      b: { word: 'PATO',  syllables: ['PA', 'TO'],   emoji: '🦆' }
    },
    {
      pairId: 'rhyme-2',
      a: { word: 'BOLA',  syllables: ['BO', 'LA'],   emoji: '⚽' },
      b: { word: 'COLA',  syllables: ['CO', 'LA'],   emoji: '🧴' }
    },
    {
      pairId: 'rhyme-3',
      a: { word: 'DENTE', syllables: ['DEN', 'TE'],  emoji: '🦷' },
      b: { word: 'PENTE', syllables: ['PEN', 'TE'],  emoji: '🪮' }
    },
    {
      pairId: 'rhyme-4',
      a: { word: 'FOGO',  syllables: ['FO', 'GO'],   emoji: '🔥' },
      b: { word: 'JOGO',  syllables: ['JO', 'GO'],   emoji: '🎲' }
    },
    {
      pairId: 'rhyme-5',
      a: { word: 'LUA',   syllables: ['LU', 'A'],    emoji: '🌙' },
      b: { word: 'RUA',   syllables: ['RU', 'A'],    emoji: '🛣️' }
    },
    {
      pairId: 'rhyme-6',
      a: { word: 'TREM',  syllables: ['TREM'],       emoji: '🚂' },
      b: { word: 'NUVEM', syllables: ['NU', 'VEM'],  emoji: '☁️' }
    },
    {
      pairId: 'rhyme-7',
      a: { word: 'PÃO',   syllables: ['PÃO'],        emoji: '🍞' },
      b: { word: 'MÃO',   syllables: ['MÃO'],        emoji: '✋' }
    },
    {
      pairId: 'rhyme-8',
      a: { word: 'ANEL',  syllables: ['A', 'NEL'],   emoji: '💍' },
      b: { word: 'PINCEL',syllables: ['PIN', 'CEL'], emoji: '🖌️' }
    },
    {
      pairId: 'rhyme-9',
      a: { word: 'LIMÃO', syllables: ['LI', 'MÃO'],  emoji: '🍋' },
      b: { word: 'AVIÃO', syllables: ['A', 'VI', 'ÃO'], emoji: '✈️' }
    },
    {
      pairId: 'rhyme-10',
      a: { word: 'URSO',  syllables: ['UR', 'SO'],   emoji: '🐻' },
      b: { word: 'CURSO', syllables: ['CUR', 'SO'],  emoji: '📚' }
    },
    {
      pairId: 'rhyme-11',
      a: { word: 'CHAVE', syllables: ['CHA', 'VE'],  emoji: '🔑' },
      b: { word: 'NAVE',  syllables: ['NA', 'VE'],   emoji: '🛸' }
    },
    {
      pairId: 'rhyme-12',
      a: { word: 'BALÃO', syllables: ['BA', 'LÃO'],  emoji: '🎈' },
      b: { word: 'LEÃO',  syllables: ['LE', 'ÃO'],   emoji: '🦁' }
    }
  ];
  
  const MODE_DESCRIPTIONS = {
    classic: 'Encontre os pares idênticos. Cada carta exibe a imagem e a palavra dividida em sílabas coloridas.',
    'word-image': 'Desafio de leitura: combine a carta que tem apenas a IMAGEM com a carta que tem apenas a PALAVRA escrita.',
    rhyme: 'Desafio sonoro: combine duas palavras diferentes que terminam com o mesmo som (ex.: GATO e PATO).'
  };
  
  /* =========================================================
     MOTOR DE ÁUDIO SUAVE E LEITURA EM VOZ ALTA (PT-BR)
     ========================================================= */
  class CalmAudio {
    constructor() {
      this.enabled = true;
      this.ctx = null;
    }
  
    initContext() {
      if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtx();
      }
    }
  
    playTone(freq, duration = 0.25, type = 'sine', volume = 0.08, delay = 0) {
      if (!this.enabled) return;
      this.initContext();
      if (!this.ctx) return;
  
      const now = this.ctx.currentTime + delay;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
  
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);
  
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  
      osc.connect(gain);
      gain.connect(this.ctx.destination);
  
      osc.start(now);
      osc.stop(now + duration + 0.02);
    }
  
    playFlip() {
      this.playTone(440, 0.14, 'sine', 0.05);
    }
  
    playMatch() {
      // Acorde suave e acolhedor
      this.playTone(523.25, 0.32, 'sine', 0.07, 0);     // Dó
      this.playTone(659.25, 0.36, 'sine', 0.07, 0.09);  // Mi
      this.playTone(783.99, 0.45, 'sine', 0.07, 0.18);  // Sol
    }
  
    playMismatch() {
      // Tom neutro e baixo (sem som de erro agressivo)
      this.playTone(310, 0.2, 'triangle', 0.04, 0);
    }
  
    playVictory() {
      const notes = [523.25, 587.33, 659.25, 783.99, 1046.5];
      notes.forEach((n, i) => this.playTone(n, 0.4, 'sine', 0.07, i * 0.11));
    }
  
    speak(text) {
      if (!this.enabled || !('speechSynthesis' in window)) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.toLowerCase());
      utterance.lang = 'pt-BR';
      utterance.rate = 0.88; // Ritmo levemente pausado para melhor compreensão
      utterance.pitch = 1.02;
      window.speechSynthesis.speak(utterance);
    }
  }
  
  /* =========================================================
     ESTADO E LÓGICA DO JOGO
     ========================================================= */
  const audio = new CalmAudio();
  
  const state = {
    mode: 'classic',
    pairCount: 8,
    cards: [],
    flippedCards: [],
    matchedPairs: 0,
    moves: 0,
    streak: 0,
    hintsUsed: 0,
    isLocked: false
  };
  
  // Elementos do DOM
  const boardEl = document.getElementById('game-board');
  const modeSelect = document.getElementById('game-mode');
  const diffSelect = document.getElementById('difficulty');
  const modeDescEl = document.getElementById('mode-description');
  const statPairsEl = document.getElementById('stat-pairs');
  const statMovesEl = document.getElementById('stat-moves');
  const statStreakEl = document.getElementById('stat-streak');
  const statBestEl = document.getElementById('stat-best');
  const peekBtn = document.getElementById('btn-peek');
  const victoryModal = document.getElementById('victory-modal');
  
  // Embaralhamento Fisher-Yates
  function shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  
  // Gera o baralho conforme o modo cognitivo selecionado
  function buildDeck(mode, pairCount) {
    const deck = [];
  
    if (mode === 'rhyme') {
      const selected = shuffle(RHYME_PAIRS).slice(0, pairCount);
      selected.forEach((item) => {
        deck.push({
          uid: `${item.pairId}-a`,
          matchKey: item.pairId,
          displayType: 'full',
          badge: 'Rima',
          word: item.a.word,
          syllables: item.a.syllables,
          emoji: item.a.emoji
        });
        deck.push({
          uid: `${item.pairId}-b`,
          matchKey: item.pairId,
          displayType: 'full',
          badge: 'Rima',
          word: item.b.word,
          syllables: item.b.syllables,
          emoji: item.b.emoji
        });
      });
    } else {
      const selected = shuffle(VOCABULARY).slice(0, pairCount);
      selected.forEach((item) => {
        if (mode === 'word-image') {
          // Carta 1: apenas imagem | Carta 2: apenas palavra silabada
          deck.push({
            uid: `${item.id}-img`,
            matchKey: item.id,
            displayType: 'image-only',
            badge: 'Imagem',
            word: item.word,
            syllables: item.syllables,
            emoji: item.emoji
          });
          deck.push({
            uid: `${item.id}-word`,
            matchKey: item.id,
            displayType: 'word-only',
            badge: 'Palavra',
            word: item.word,
            syllables: item.syllables,
            emoji: item.emoji
          });
        } else {
          // Modo Clássico: ambas mostram imagem + sílabas coloridas
          for (let copy = 1; copy <= 2; copy++) {
            deck.push({
              uid: `${item.id}-${copy}`,
              matchKey: item.id,
              displayType: 'full',
              badge: null,
              word: item.word,
              syllables: item.syllables,
              emoji: item.emoji
            });
          }
        }
      });
    }
  
    return shuffle(deck);
  }
  
  // Renderiza sílabas com cores alternadas
  function renderSyllablesHTML(syllables, extraClass = '') {
    const spans = syllables
      .map((syl, idx) => `<span class="syl syl-${idx % 4}">${syl}</span>`)
      .join('');
    return `<div class="syllable-word ${extraClass}">${spans}</div>`;
  }
  
  // Renderiza o tabuleiro completo
  function renderBoard() {
    boardEl.innerHTML = '';
    boardEl.className = `game-board grid-${state.pairCount}`;
  
    state.cards.forEach((card, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'memory-card';
      button.dataset.index = index;
      button.setAttribute('aria-label', `Carta ${index + 1}, virada para baixo`);
  
      let frontContent = '';
      if (card.displayType === 'image-only') {
        frontContent = `
          <span class="card-tag">${card.badge}</span>
          <span class="card-emoji only-image" aria-hidden="true">${card.emoji}</span>
        `;
      } else if (card.displayType === 'word-only') {
        frontContent = `
          <span class="card-tag">${card.badge}</span>
          ${renderSyllablesHTML(card.syllables, 'only-word')}
        `;
      } else {
        frontContent = `
          ${card.badge ? `<span class="card-tag">${card.badge}</span>` : ''}
          <span class="card-emoji" aria-hidden="true">${card.emoji}</span>
          ${renderSyllablesHTML(card.syllables)}
        `;
      }
  
      button.innerHTML = `
        <div class="card-inner">
          <div class="card-face card-back">
            <span class="card-number">${index + 1}</span>
            <span class="card-pattern" aria-hidden="true">🌿</span>
          </div>
          <div class="card-face card-front">
            ${frontContent}
          </div>
        </div>
      `;
  
      button.addEventListener('click', () => handleCardClick(index, button));
      boardEl.appendChild(button);
    });
  }
  
  // Atualiza indicadores visuais
  function updateStatsUI() {
    statPairsEl.textContent = `${state.matchedPairs} / ${state.pairCount}`;
    statMovesEl.textContent = state.moves;
    statStreakEl.textContent = `${state.streak} ✨`;
  
    const bestKey = `mentecalma_best_${state.mode}_${state.pairCount}`;
    const savedBest = localStorage.getItem(bestKey);
    statBestEl.textContent = savedBest ? `${savedBest}%` : '—';
  }
  
  // Clique em uma carta
  function handleCardClick(index, cardEl) {
    if (state.isLocked) return;
    if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;
  
    const cardData = state.cards[index];
    cardEl.classList.add('flipped');
    cardEl.setAttribute('aria-label', `Carta ${index + 1}: ${cardData.word}`);
  
    audio.playFlip();
    audio.speak(cardData.word);
  
    state.flippedCards.push({ index, el: cardEl, data: cardData });
  
    if (state.flippedCards.length === 2) {
      state.moves += 1;
      checkForMatch();
      updateStatsUI();
    }
  }
  
  // Verifica se as duas cartas formam par
  function checkForMatch() {
    state.isLocked = true;
    const [first, second] = state.flippedCards;
    const isMatch = first.data.matchKey === second.data.matchKey;
  
    if (isMatch) {
      setTimeout(() => {
        first.el.classList.add('matched');
        second.el.classList.add('matched');
        state.matchedPairs += 1;
        state.streak += 1;
        state.flippedCards = [];
        state.isLocked = false;
  
        audio.playMatch();
        updateStatsUI();
  
        if (state.matchedPairs === state.pairCount) {
          handleVictory();
        }
      }, 450);
    } else {
      state.streak = 0;
      // Tempo confortável de 1,35s para o leitor processar as duas cartas
      setTimeout(() => {
        audio.playMismatch();
        first.el.classList.remove('flipped');
        second.el.classList.remove('flipped');
        first.el.setAttribute('aria-label', `Carta ${first.index + 1}, virada para baixo`);
        second.el.setAttribute('aria-label', `Carta ${second.index + 1}, virada para baixo`);
        state.flippedCards = [];
        state.isLocked = false;
      }, 1350);
    }
  }
  
  // Recurso "Espiar Calmo" (revela cartas temporariamente sem punição)
  function triggerCalmPeek() {
    if (state.isLocked || state.matchedPairs === state.pairCount) return;
  
    state.isLocked = true;
    state.hintsUsed += 1;
    peekBtn.disabled = true;
  
    // Fecha qualquer carta solta antes de espiar
    state.flippedCards.forEach((item) => item.el.classList.remove('flipped'));
    state.flippedCards = [];
  
    const allCardEls = document.querySelectorAll('.memory-card');
    allCardEls.forEach((el) => el.classList.add('flipped'));
  
    setTimeout(() => {
      allCardEls.forEach((el) => {
        if (!el.classList.contains('matched')) {
          el.classList.remove('flipped');
        }
      });
      state.isLocked = false;
      peekBtn.disabled = false;
    }, 2400);
  }
  
  // Finalização da partida
  function handleVictory() {
    const accuracy = Math.min(100, Math.round((state.pairCount / state.moves) * 100));
    const bestKey = `mentecalma_best_${state.mode}_${state.pairCount}`;
    const prevBest = Number(localStorage.getItem(bestKey) || 0);
  
    if (accuracy > prevBest) {
      localStorage.setItem(bestKey, accuracy);
    }
    updateStatsUI();
  
    document.getElementById('final-moves').textContent = state.moves;
    document.getElementById('final-accuracy').textContent = `${accuracy}%`;
    document.getElementById('final-hints').textContent = state.hintsUsed;
  
    const nextBtn = document.getElementById('btn-next-level');
    nextBtn.style.display = state.pairCount >= 12 ? 'none' : 'inline-block';
  
    setTimeout(() => {
      audio.playVictory();
      victoryModal.classList.remove('hidden');
    }, 400);
  }
  
  // Inicia ou reinicia uma partida
  function startNewGame() {
    victoryModal.classList.add('hidden');
    state.mode = modeSelect.value;
    state.pairCount = Number(diffSelect.value);
    state.cards = buildDeck(state.mode, state.pairCount);
    state.flippedCards = [];
    state.matchedPairs = 0;
    state.moves = 0;
    state.streak = 0;
    state.hintsUsed = 0;
    state.isLocked = false;
  
    modeDescEl.textContent = MODE_DESCRIPTIONS[state.mode];
    renderBoard();
    updateStatsUI();
  }
  
  /* =========================================================
     CONTROLES DE ACESSIBILIDADE E EVENTOS
     ========================================================= */
  document.querySelectorAll('.theme-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.theme-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const theme = btn.dataset.setTheme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('mentecalma_theme', theme);
    });
  });
  
  const toggleFontBtn = document.getElementById('toggle-font');
  toggleFontBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-font');
    const next = current === 'lexend' ? 'atkinson' : 'lexend';
    document.documentElement.setAttribute('data-font', next);
    toggleFontBtn.textContent = next === 'lexend' ? 'Aa Fonte: Lexend' : 'Aa Fonte: Atkinson';
  });
  
  const toggleSpacingBtn = document.getElementById('toggle-spacing');
  toggleSpacingBtn.addEventListener('click', () => {
    const active = document.body.classList.toggle('wide-spacing');
    toggleSpacingBtn.classList.toggle('active', active);
    toggleSpacingBtn.setAttribute('aria-pressed', String(active));
  });
  
  const toggleAudioBtn = document.getElementById('toggle-audio');
  toggleAudioBtn.addEventListener('click', () => {
    audio.enabled = !audio.enabled;
    toggleAudioBtn.classList.toggle('active', audio.enabled);
    toggleAudioBtn.setAttribute('aria-pressed', String(audio.enabled));
    toggleAudioBtn.textContent = audio.enabled ? '🔊 Voz e Som: Ligado' : '🔇 Voz e Som: Mudo';
    if (!audio.enabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  });
  
  modeSelect.addEventListener('change', startNewGame);
  diffSelect.addEventListener('change', startNewGame);
  document.getElementById('btn-restart').addEventListener('click', startNewGame);
  peekBtn.addEventListener('click', triggerCalmPeek);
  
  document.getElementById('btn-play-again').addEventListener('click', startNewGame);
  document.getElementById('btn-next-level').addEventListener('click', () => {
    if (state.pairCount === 6) diffSelect.value = '8';
    else if (state.pairCount === 8) diffSelect.value = '12';
    startNewGame();
  });
  
  // Restaura tema salvo, se existir
  const savedTheme = localStorage.getItem('mentecalma_theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    document.querySelectorAll('.theme-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.setTheme === savedTheme);
    });
  }
  
  // Inicializa o jogo ao carregar a página
  startNewGame();