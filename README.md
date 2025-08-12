# 🎯 Wordle Français

Un jeu Wordle en français avec des mots de longueur variable, développé en HTML, CSS et JavaScript vanilla.

## 🎮 Aperçu du jeu

![Wordle Français](https://img.shields.io/badge/Game-Wordle%20Français-blue?style=for-the-badge)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**🚀 [Jouer maintenant](https://timso-dev.github.io/wordle-francais/)**

## ✨ Fonctionnalités

### 🎲 **Longueur variable**
- Mots de **4 à 8 lettres** choisis aléatoirement
- Grille qui s'adapte automatiquement
- Nouveau défi à chaque partie

### 🇫🇷 **Dictionnaire français enrichi**
- Plus de **200 mots** authentiques
- Thèmes variés : animaux, nature, objets, couleurs...
- Mots semi-aléatoires générés intelligemment

### 🎨 **Interface moderne**
- Design responsive avec dégradés
- Animations fluides et effets visuels
- Clavier virtuel intégré
- Compatible mobile et desktop

### 🎯 **Système de couleurs intuitif**
- 🟩 **Vert** : Lettre correcte à la bonne position
- 🟨 **Jaune** : Lettre présente mais mal placée  
- ⬜ **Gris** : Lettre absente du mot

## 🕹️ Comment jouer

1. **Objectif** : Devinez le mot mystère en 6 essais maximum
2. **Saisie** : Tapez votre proposition et validez
3. **Indices** : Utilisez les couleurs pour ajuster votre stratégie
4. **Victoire** : Trouvez le mot avant d'épuiser vos tentatives !

## 🏗️ Structure du projet

```
wordle-francais/
├── index.html          # Structure HTML
├── style.css           # Styles et animations
├── script.js           # Logique du jeu
└── README.md           # Documentation
```

## 🛠️ Technologies utilisées

- **HTML5** : Structure sémantique
- **CSS3** : Styles modernes, animations, responsive design
- **JavaScript ES6+** : Logique du jeu, manipulation DOM
- **GitHub Pages** : Hébergement gratuit

## 🚀 Installation locale

### Prérequis
- Un navigateur web moderne
- Un serveur local (optionnel)

### Étapes
1. **Cloner le dépôt**
   ```bash
   git clone https://github.com/votre-username/wordle-francais.git
   cd wordle-francais
   ```

2. **Ouvrir le jeu**
   - Double-cliquez sur `index.html`
   - Ou utilisez un serveur local :
     ```bash
     # Avec Python
     python -m http.server 8000
     
     # Avec Node.js
     npx serve
     ```

3. **Jouer** 🎉

## 🎯 Fonctionnalités techniques

### Architecture modulaire
- **Classe `WordleGame`** : Encapsulation complète de la logique
- **Séparation des responsabilités** : HTML/CSS/JS distincts
- **Code réutilisable** et facilement extensible

### Algorithmes intelligents
- **Génération de mots** : Mix dictionnaire/aléatoire (80/20)
- **Validation des lettres** : Système de comptage précis
- **Interface adaptive** : Grille responsive selon la longueur

### Optimisations
- **Performance** : Manipulation DOM optimisée
- **Accessibilité** : Contrôles clavier et souris
- **Responsive** : Design adaptatif mobile-first

## 🎨 Personnalisation

### Modifier les mots
Éditez le dictionnaire dans `script.js` :
```javascript
this.wordsByLength = {
    4: ['CHAT', 'PAIN', ...],
    5: ['MAISON', 'JARDIN', ...],
    // Ajoutez vos mots ici
};
```

### Changer les couleurs
Modifiez les variables CSS dans `style.css` :
```css
.letter-box.correct { background: #6aaa64; }
.letter-box.present { background: #c9b458; }
.letter-box.absent { background: #787c7e; }
```

### Ajuster la difficulté
```javascript
// Modifier le nombre d'essais
this.maxAttempts = 6; // Changez cette valeur

// Modifier les longueurs de mots
getRandomWordLength() {
    const lengths = [4, 5, 6, 7, 8]; // Ajustez selon vos préférences
    return lengths[Math.floor(Math.random() * lengths.length)];
}
```

## 🤝 Contributions

Les contributions sont les bienvenues ! 

### Comment contribuer
1. **Fork** le projet
2. **Créez** une branche (`git checkout -b feature/amelioration`)
3. **Commitez** vos changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. **Push** vers la branche (`git push origin feature/amelioration`)
5. **Ouvrez** une Pull Request

### Idées d'améliorations
- [ ] Mode multijoueur
- [ ] Statistiques avancées
- [ ] Thèmes de couleur
- [ ] Sons et effets audio
- [ ] Partage de résultats
- [ ] Mode chronométré
- [ ] Dictionnaire personnalisé

## 📝 Licence

Ce projet est sous licence **MIT**. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🙏 Remerciements

- Inspiré du jeu **Wordle** original de Josh Wardle
- Communauté **GitHub** pour l'hébergement gratuit
- Tous les contributeurs qui rendent ce projet meilleur

## 📞 Contact

- **GitHub** : [@votre-username](https://github.com/timso-dev)
- **Issues** : [Signaler un bug](https://github.com/timso-dev/wordle-francais/issues)

---

**⭐ N'oubliez pas de mettre une étoile si vous aimez le projet !**

*Développé avec ❤️ en France*
