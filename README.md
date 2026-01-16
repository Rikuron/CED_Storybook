# 🌍 Evolution: The Storybook

An interactive educational web experience that takes users on a journey through Earth's evolutionary history with Diego, a curious time traveler. Experience millions of years of evolution through engaging animations, interactive elements, and beautiful visuals.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-FF0055?logo=framer&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)

## 📚 About This Project

This interactive storybook was developed as a thesis project for the **College of Education** at **Mindanao State University - Iligan Institute of Technology (MSU-IIT)**. It was created by a team of 3 education students with the goal of making evolutionary biology engaging and accessible for learners.

### 👥 The Team

| Role | Contribution |
| --- | --- |
| **Thesis Researchers** | Fahad Carim, Farnaida Asum Salic, and Hainna Amy |
| **Graphic Artist** | Andrei Raagas |
| **Developer** | Crislane Josh Eugenio |

## ✨ Features

- **10 Interactive Scenes** covering major evolutionary milestones
- **Responsive Design** optimized for mobile, tablet, desktop, and TV displays
- **Smooth Animations** powered by Framer Motion
- **Asset Preloading** for seamless scene transitions
- **Educational Content** with fun facts and interactive challenges
- **Audio Integration** for immersive dinosaur encounters

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd ced-storybook

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```
The app will be available at `http://localhost:3000`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 📖 The Journey

Follow Diego through 10 captivating scenes:

| Scene | Title | Description |
| --- | --- | --- |
| 1 | Title | Meet Diego in space and click Earth to begin the adventure |
| 2 | Volcanic | Experience early Earth's volcanic landscape |
| 3 | Underwater | Explore unicellular organisms and early fish |
| 4 | Amphibian | Witness the transition from water to land |
| 5 | Dinosaurs | Interact with prehistoric giants (with audio!) |
| 6 | Temperature | Understand climate's role in evolution |
| 7 | Mammals | Discover the rise of mammals |
| 8 | Humans | Track human evolution through time |
| 9 | Outro | Reflect on the journey from space |
| 10 | Montage | A rapid journey through all evolutionary stages |

## 🛠️ Tech Stack

- **Framework**: React 19
- **Language**: TypeScript 5.7
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12

## 📁 Project Structure
ced-storybook/ <br />
├── public/ <br />
│   ├── audio/          # Sound effects (dinosaur roars, etc.) <br />
│   ├── background/     # Scene background images <br />
│   ├── fonts/          # Custom fonts <br />
│   └── initial_assets/ # Character sprites and UI elements <br />
├── src/ <br />
│   ├── components/ <br />
│   │   ├── general/    # Shared components (Hero, NarrationDialogue, etc.) <br />
│   │   ├── scene1/     # Scene-specific components <br />
│   │   ├── scene2/ <br />
│   │   └── ... <br />
│   ├── data/           # Scene assets, dinosaur/mammal/organism info <br />
│   ├── hooks/          # Custom hooks (useResponsive, useAssetPreloader) <br />
│   ├── scenes/         # Main scene components (Scene1_Title.tsx, etc.) <br />
│   └── styles.css      # Global styles <br />
└── package.json <br />

## 🎮 Key Components

- **SceneManager** - Orchestrates scene transitions and asset preloading
- **Hero** - Diego, the time-traveling guide
- **NarrationDialogue** - Typewriter-style story text
- **PartIntroduction** - Animated scene title cards
- **Interactive Elements** - Clickable organisms, dinosaurs, and challenges

## 🧪 Testing

```bash
# Run tests
npm run test
```

## 🎨 Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Lint and format
npm run check
```

## 📱 Responsive Breakpoints

The app is optimized for multiple screen sizes using the useResponsive hook:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1920px
- **TV**: > 1920px

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and not open for public use without permission.