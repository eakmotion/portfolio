# Personal Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- Responsive design for all screen sizes
- Smooth animations and transitions
- Dark theme
- Interactive UI components
- Contact form
- Project showcase section

## Tech Stack

- React 19
- TypeScript
- Tailwind CSS
- Lucide Icons

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/eak-portfolio.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

The portfolio is configured to deploy to GitHub Pages. To deploy:

1. Update the `homepage` field in `package.json` with your GitHub Pages URL
2. Run the deployment command:
   ```bash
   npm run deploy
   ```

This will build the application and deploy it to the `gh-pages` branch of your repository.

## Project Structure

```
src/
  ├── components/     # Reusable components
  ├── portfolio.tsx   # Main portfolio component
  ├── App.tsx        # App component
  └── index.tsx      # Entry point
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App
- `npm run deploy` - Deploys the app to GitHub Pages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
