# Aaditya Baruah - Portfolio

A modern, interactive portfolio website built with React and Vite, featuring a sleek design with dynamic animations and AI-powered chat functionality.

🌐 **Live Demo:** [aadityaportfolio-six.vercel.app](https://aadityaportfolio-six.vercel.app)

## ✨ Features

- **Modern UI/UX** - Clean, responsive design with smooth animations
- **Dark/Light Theme** - Toggle between themes with custom cursor effects
- **AI Chat Assistant** - Integrated Gemini AI for interactive conversations
- **Command Palette** - Quick navigation with keyboard shortcuts
- **Floating Dock** - Easy section navigation
- **Dynamic Spotlight Effect** - Mouse-following gradient effects
- **Fluid Cursor** - Custom animated cursor for enhanced interactivity

## 🛠️ Tech Stack

- **React** - Frontend framework
- **Vite** - Build tool and dev server
- **Framer Motion** - Animations (via components)
- **Google Gemini AI** - AI chat integration
- **CSS3** - Custom styling with CSS variables
- **Vercel** - Deployment

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.jsx          # Landing section
│   ├── About.jsx         # About me section
│   ├── Experience.jsx    # Work experience
│   ├── Projects.jsx      # Project showcase
│   ├── Skills.jsx        # Technical skills
│   ├── Contact.jsx       # Contact form
│   ├── FloatingDock.jsx  # Navigation dock
│   ├── CommandPalette.jsx # Keyboard shortcuts
│   ├── FloatingChatInput.jsx # AI chat
│   ├── Cursor.jsx        # Dark mode cursor
│   └── FluidCursor.jsx   # Light mode cursor
├── context/
│   └── ThemeContext.jsx  # Theme management
├── services/
│   └── gemini.js         # AI API integration
└── App.jsx               # Main app component
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/aadityabaruah/aaditya-portfolio.git
   cd aaditya-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create a .env file and add your Gemini API key
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 📧 Contact

**Aaditya Baruah** - [Portfolio](https://aadityaportfolio-six.vercel.app)
