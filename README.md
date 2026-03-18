# Everbloom 🌸

> A premium, client-side web application for creating and sharing beautiful digital flower bouquets.

Everbloom is a completely serverless, zero-database web application that allows users to design elegant, customized digital flower bouquets and share them instantly via URL. The entire state of the bouquet and attached message is encoded directly into the shareable link.

## ✨ Features

- **Rich Bouquet Canvas:** An interactive, drag-and-drop canvas featuring beautifully illustrated SVG flowers (Roses, Tulips, Sunflowers, Lilies, Daisies).
- **Premium Aesthetics:** A carefully curated off-white/cream UI theme with soft shadows, rounded corners, and subtle breathing animations for a luxurious feel.
- **One-Click Presets:** Beautifully pre-designed bouquet styles (Romantic, Sunshine, Elegant, Playful) to get started instantly.
- **Handwritten Notes:** Attach personalized messages using elegant typography on a textured, tilt-animated paper card.
- **Zero Backend:** 100% client-side. The bouquet state is compressed and encoded using Base64 into the URL hash.
- **Image Export:** Download exactly what you designed as a high-quality PNG image.
- **Responsive & Mobile-First:** Designed to look stunning and function perfectly on both desktop and mobile devices.
- **Dark Mode:** Seamless toggle between a warm cream light mode and a rich, cozy dark mode.

## 🚀 Tech Stack

- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (with custom properties)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Export:** html-to-image

## 🛠 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/omm-prog/Everbloom.git
   cd Everbloom
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:5173`.

### Building for Production

To create a production-ready optimized build:

```bash
npm run build
```
The compiled files will be located in the `dist/` directory, ready to be deployed to any static hosting service (Vercel, Netlify, GitHub Pages, etc.).

## 🔗 How Sharing Works (Architecture)

Everbloom doesn't use a database to store user creations. Instead, when a user clicks "Share", the application state (flower positions, types, colors, wrapper style, ribbon color, and the message content) is serialized into a JSON object, compressed, Base64-encoded, and appended to the URL as a hash fragment.

When a recipient opens the link, the application reads the hash, decodes the state, and perfectly reconstructs the canvas — completely locally in their browser.

## 🎨 Design System

The application uses an emotionally appealing, warm design system:
- **Base Colors:** Off-white (`#f8f5f2`), Cream (`#fdfaf6`), Soft Brown (`#3d2f24`)
- **Typography:** Serif for headings (`font-serif`), Sans-serif for UI (`font-sans`), and cursive for notes (`font-handwriting`).
- **Texture:** The message card utilizes a subtle CSS-generated paper texture (`.paper-texture`).

## 📄 License

This project is licensed under the MIT License.