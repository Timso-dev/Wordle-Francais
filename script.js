class WordleGame {
    constructor() {
        // Dictionnaire de mots par longueur
        this.wordsByLength = {
            4: ['CHAT', 'PAIN', 'BLEU', 'VERT', 'NOIR', 'BLANC', 'ROSE', 'GRIS', 'MORT', 'VIVE', 'FORT', 'FAIM', 'SOIF', 'PEUR', 'JOIE', 'RIRE', 'DIRE', 'VOIR', 'PLUS', 'MAIS', 'AVEC', 'SANS', 'DANS', 'SOUS', 'POUR', 'TRES', 'BIEN', 'TOUT', 'RIEN', 'QUOI', 'QUAND', 'LOIN', 'PRES', 'HAUT', 'FAUX', 'VRAI', 'BEAU', 'LAID', 'RICHE', 'PAUVRE'],
            5: ['MAISON', 'JARDIN', 'SOLEIL', 'CHAISE', 'PORTE', 'LIVRE', 'CHIEN', 'FLEUR', 'ROUTE', 'VILLE', 'TEMPS', 'FROID', 'CHAUD', 'GRAND', 'PETIT', 'HOMME', 'FEMME', 'ENFANT', 'COURS', 'ECOLE', 'TRAIN', 'OCEAN', 'PLAGE', 'SPORT', 'REPOS', 'MUSIQUE', 'DANSE', 'PAPIER', 'STYLO', 'RADIO', 'AMOUR', 'PAIX', 'GUERRE', 'ROUGE', 'JAUNE', 'VIOLET', 'ORANGE', 'MARRON', 'ARGENT'],
            6: ['CHEVAL', 'OISEAU', 'POISSON', 'NATURE', 'NUAGE', 'ETOILE', 'MONTAGNE', 'RIVIERE', 'FORET', 'DESERT', 'ORANGE', 'POMME', 'BANANE', 'CERISE', 'RAISIN', 'CITRON', 'FRAISE', 'PECHE', 'POIRE', 'ANANAS', 'TOMATE', 'CAROTTE', 'SALADE', 'EPINARD', 'RADIS', 'NAVET', 'BETTERAVE', 'ARTICHAUT', 'AUBERGINE', 'COURGETTE'],
            7: ['ELEPHANT', 'GIRAFE', 'SERPENT', 'PAPILLON', 'LIBELLULE', 'ESCARGOT', 'ARAIGNEE', 'FOURMI', 'ABEILLE', 'MOUCHE', 'CIGALE', 'CRIQUET', 'SAUTERELLE', 'HANNETON', 'COCCINELLE', 'MOUSTIQUE', 'TAON', 'BOURDON', 'FRELON', 'GUEPE'],
            8: ['CROCODILE', 'HIPPOPOTAME', 'RHINOCEROS', 'KANGOUROU', 'PINGOUIN', 'FLAMANT', 'PELICAN', 'CORBEAU', 'HIRONDELLE', 'ROSSIGNOL', 'MERLE', 'ROUGE-GORGE', 'MESANGE', 'MOINEAU', 'PIGEON', 'TOURTERELLE', 'COLOMBE', 'AIGLE', 'FAUCON', 'EPERVIER']
        };
        
        this.currentWordLength = this.getRandomWordLength();
        this.currentWord = this.getRandomWord();
        this.currentAttempt = 0;
        this.maxAttempts = 6;
        this.gameOver = false;
        this.guesses = [];
        this.keyboardState = {};

        this.initializeDOM();
        this.setupEventListeners();
        this.createGameBoard();
        this.createKeyboard();
        this.updateDisplay();
        this.generateNewWord();
    }

    getRandomWordLength() {
        const lengths = [4, 5, 6, 7, 8];
        return lengths[Math.floor(Math.random() * lengths.length)];
    }

    getRandomWord() {
        const wordsOfLength = this.wordsByLength[this.currentWordLength];
        if (!wordsOfLength || wordsOfLength.length === 0) {
            // Fallback si aucun mot de cette longueur
            this.currentWordLength = 5;
            return this.wordsByLength[5][Math.floor(Math.random() * this.wordsByLength[5].length)];
        }
        return wordsOfLength[Math.floor(Math.random() * wordsOfLength.length)];
    }

    // Fonction pour mélanger les lettres d'un mot (générer un mot "aléatoire")
    generateRandomWord() {
        const baseWord = this.getRandomWord();
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let randomWord = '';
        
        for (let i = 0; i < this.currentWordLength; i++) {
            // 70% de chance de garder une lettre du mot original, 30% lettre aléatoire
            if (Math.random() < 0.7 && i < baseWord.length) {
                randomWord += baseWord[i];
            } else {
                randomWord += letters[Math.floor(Math.random() * letters.length)];
            }
        }
        
        return randomWord;
    }

    // Génère un nouveau mot avec mélange intelligent
    generateNewWord() {
        // 80% de chance d'utiliser un mot du dictionnaire, 20% de générer un mot aléatoire
        if (Math.random() < 0.8) {
            this.currentWord = this.getRandomWord();
        } else {
            // Créer un mot semi-aléatoire basé sur des patterns français
            this.currentWord = this.createSemiRandomWord();
        }
        
        console.log('Mot à deviner:', this.currentWord); // Pour le debug
    }

    createSemiRandomWord() {
        const consonnes = 'BCDFGHJKLMNPQRSTVWXZ';
        const voyelles = 'AEIOU';
        let word = '';
        
        for (let i = 0; i < this.currentWordLength; i++) {
            // Alternance consonne/voyelle avec quelques variations
            if (i % 2 === 0) {
                // Position paire: favoriser les consonnes
                if (Math.random() < 0.8) {
                    word += consonnes[Math.floor(Math.random() * consonnes.length)];
                } else {
                    word += voyelles[Math.floor(Math.random() * voyelles.length)];
                }
            } else {
                // Position impaire: favoriser les voyelles
                if (Math.random() < 0.7) {
                    word += voyelles[Math.floor(Math.random() * voyelles.length)];
                } else {
                    word += consonnes[Math.floor(Math.random() * consonnes.length)];
                }
            }
        }
        
        return word;
    }

    initializeDOM() {
        this.gameBoard = document.getElementById('gameBoard');
        this.wordInput = document.getElementById('wordInput');
        this.submitBtn = document.getElementById('submitBtn');
        this.message = document.getElementById('message');
        this.currentAttemptSpan = document.getElementById('currentAttempt');
        this.targetWordSpan = document.getElementById('targetWord');
        this.newGameBtn = document.getElementById('newGameBtn');
        this.keyboard = document.getElementById('keyboard');
        this.wordLengthSpan = document.getElementById('wordLength');
    }

    setupEventListeners() {
        this.submitBtn.addEventListener('click', () => this.submitGuess());
        this.wordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.submitGuess();
            }
        });
        this.wordInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.toUpperCase();
        });
        this.newGameBtn.addEventListener('click', () => this.newGame());
    }

    createGameBoard() {
        this.gameBoard.innerHTML = '';
        
        // Ajuster le CSS dynamiquement selon la longueur du mot
        this.gameBoard.style.maxWidth = `${this.currentWordLength * 70 + (this.currentWordLength - 1) * 10}px`;
        
        for (let i = 0; i < this.maxAttempts; i++) {
            const row = document.createElement('div');
            row.className = 'word-row';
            row.id = `row-${i}`;
            row.style.gridTemplateColumns = `repeat(${this.currentWordLength}, 60px)`;
            
            for (let j = 0; j < this.currentWordLength; j++) {
                const box = document.createElement('div');
                box.className = 'letter-box';
                box.id = `box-${i}-${j}`;
                row.appendChild(box);
            }
            
            this.gameBoard.appendChild(row);
        }
    }

    createKeyboard() {
        const rows = [
            ['A', 'Z', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
            ['Q', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M'],
            ['ENTRER', 'W', 'X', 'C', 'V', 'B', 'N', 'EFFACER']
        ];

        this.keyboard.innerHTML = '';
        
        rows.forEach(row => {
            const keyboardRow = document.createElement('div');
            keyboardRow.className = 'keyboard-row';
            
            row.forEach(key => {
                const keyElement = document.createElement('button');
                keyElement.className = key.length > 1 ? 'key wide' : 'key';
                keyElement.textContent = key;
                keyElement.addEventListener('click', () => this.handleKeyPress(key));
                keyboardRow.appendChild(keyElement);
            });
            
            this.keyboard.appendChild(keyboardRow);
        });
    }

    handleKeyPress(key) {
        if (this.gameOver) return;

        if (key === 'ENTRER') {
            this.submitGuess();
        } else if (key === 'EFFACER') {
            this.wordInput.value = this.wordInput.value.slice(0, -1);
        } else if (key.length === 1) {
            if (this.wordInput.value.length < this.currentWordLength) {
                this.wordInput.value += key;
            }
        }
    }

    submitGuess() {
        const guess = this.wordInput.value.trim().toUpperCase();
        
        if (guess.length !== this.currentWordLength) {
            this.showMessage(`Le mot doit contenir exactement ${this.currentWordLength} lettres !`, 'error');
            return;
        }

        if (!/^[A-Z]+$/.test(guess)) {
            this.showMessage('Seules les lettres sont autorisées !', 'error');
            return;
        }

        this.guesses.push(guess);
        this.updateGameBoard(guess, this.currentAttempt);
        this.updateKeyboard(guess);
        this.currentAttempt++;

        if (guess === this.currentWord) {
            this.gameOver = true;
            this.showMessage(`🎉 Bravo ! Vous avez trouvé "${this.currentWord}" en ${this.currentAttempt} essai${this.currentAttempt > 1 ? 's' : ''} !`, 'success');
            this.targetWordSpan.textContent = this.currentWord;
        } else if (this.currentAttempt >= this.maxAttempts) {
            this.gameOver = true;
            this.showMessage(`😔 Perdu ! Le mot était "${this.currentWord}"`, 'error');
            this.targetWordSpan.textContent = this.currentWord;
        } else {
            this.showMessage(`Essai ${this.currentAttempt + 1}/${this.maxAttempts}`, 'info');
        }

        this.wordInput.value = '';
        this.updateDisplay();
    }

    updateGameBoard(guess, rowIndex) {
        const row = document.getElementById(`row-${rowIndex}`);
        const letterCounts = {};
        
        // Compter les lettres dans le mot cible
        for (let letter of this.currentWord) {
            letterCounts[letter] = (letterCounts[letter] || 0) + 1;
        }

        const results = [];
        
        // Premier passage : marquer les lettres correctes
        for (let i = 0; i < this.currentWordLength; i++) {
            if (guess[i] === this.currentWord[i]) {
                results[i] = 'correct';
                letterCounts[guess[i]]--;
            }
        }

        // Deuxième passage : marquer les lettres présentes mais mal placées
        for (let i = 0; i < this.currentWordLength; i++) {
            if (results[i] !== 'correct') {
                if (letterCounts[guess[i]] > 0) {
                    results[i] = 'present';
                    letterCounts[guess[i]]--;
                } else {
                    results[i] = 'absent';
                }
            }
        }

        // Appliquer les résultats visuels
        for (let i = 0; i < this.currentWordLength; i++) {
            const box = document.getElementById(`box-${rowIndex}-${i}`);
            box.textContent = guess[i];
            box.classList.add('filled');
            
            setTimeout(() => {
                box.classList.add(results[i]);
            }, i * 200);
        }
    }

    updateKeyboard(guess) {
        for (let i = 0; i < guess.length; i++) {
            const letter = guess[i];
            const currentState = this.keyboardState[letter];
            
            let newState;
            if (guess[i] === this.currentWord[i]) {
                newState = 'correct';
            } else if (this.currentWord.includes(letter)) {
                newState = currentState === 'correct' ? 'correct' : 'present';
            } else {
                newState = currentState === 'correct' || currentState === 'present' ? currentState : 'absent';
            }
            
            this.keyboardState[letter] = newState;
            
            const keyElement = Array.from(this.keyboard.querySelectorAll('.key'))
                .find(key => key.textContent === letter);
            
            if (keyElement) {
                keyElement.className = `key ${newState}`;
            }
        }
    }

    showMessage(text, type) {
        this.message.textContent = text;
        this.message.className = `message ${type}`;
    }

    updateDisplay() {
        this.currentAttemptSpan.textContent = this.currentAttempt + 1;
        this.wordLengthSpan.textContent = this.currentWordLength;
        this.submitBtn.disabled = this.gameOver;
        this.wordInput.disabled = this.gameOver;
        this.wordInput.maxLength = this.currentWordLength;
    }

    newGame() {
        this.currentWordLength = this.getRandomWordLength();
        this.generateNewWord();
        this.currentAttempt = 0;
        this.gameOver = false;
        this.guesses = [];
        this.keyboardState = {};
        
        this.createGameBoard();
        this.createKeyboard();
        this.wordInput.value = '';
        this.message.textContent = '';
        this.targetWordSpan.textContent = '?'.repeat(this.currentWordLength);
        this.updateDisplay();
        this.showMessage(`Nouvelle partie commencée ! Mot de ${this.currentWordLength} lettres.`, 'info');
        this.wordInput.focus();
    }
}

// Démarrer le jeu quand la page est chargée
document.addEventListener('DOMContentLoaded', () => {
    new WordleGame();
});
