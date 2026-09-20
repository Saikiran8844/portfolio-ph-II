# 🔴 Custom Red Theme Architecture & Resource Guide

This guide details how to leverage all the existing portfolio resources (Three.js canvas, GSAP physics animations, tech SVGs, bento grids, and custom cursors) with your **Custom Red Theme**.

---

## 🎨 1. Custom Red Theme Palette Tokens

Here are the curated color tokens tailored for a sleek, high-contrast, obsidian-and-crimson aesthetic:

| Token | Hex Code | Description | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Red** | `#dc2626` | Deep Crimson Red | Primary buttons, active highlights, key headings |
| **Accent Red** | `#ef4444` | Vibrant Scarlet Red | Gradients, badges, hover text |
| **Neon Flame** | `#ff0055` | Electric Ruby Red | High-intensity aura glow, shadows, particle canvas |
| **Volcanic Dark** | `#090305` | Deep Obsidian Base | Root background (`bg-[#090305]`) |
| **Card Surface** | `#120406` | Dark Crimson Tint Card | Bento cards, timeline cards, navbar background |
| **Border Glow** | `rgba(220, 38, 38, 0.35)` | Translucent Red Border | Card borders (`border-[#dc2626]/30`) |
| **Red Aura Shadow** | `0 0 30px rgba(239, 68, 68, 0.45)` | Volumetric Glow | Hero avatar ring, CTA button hover |

---

## 🗂️ 2. Repository Resources Directory

All assets and resources are organized and bundled locally for 100% offline uptime:

```text
src/
├── assets/
│   ├── hero_avatar.jpg        # Hero portrait image
│   ├── naruto_avatar.jpg      # Naruto avatar (730 KB)
│   ├── kurama_avatar.jpg      # Kurama Nine-Tails avatar (902 KB)
│   ├── boc.png, project2.png  # Project mockups
│   ├── logo.png, github.png   # Brand & social icons
│   └── tech/                  # High-resolution offline SVGs
│       ├── aws.svg, gcp.svg, redis.svg, docker.png
│       ├── nextjs.svg, reactjs.png, vite.svg, bun.svg
│       ├── playwright.svg, cucumber.svg, claude.svg
│       ├── greensock.svg, shopify.svg, angular.svg, postman.svg
├── context/
│   └── ThemeContext.jsx       # Theme state & dynamic color provider
├── components/
│   ├── Navbar.jsx             # Header with avatar radio toggle
│   ├── Hero.jsx               # Hero with GSAP flame tails & aura rings
│   ├── About.jsx              # Bento power cards & domain specialties
│   ├── Tech.jsx               # Bento tech groups & marquee ticker
│   ├── Experience.jsx         # Vertical timeline with expandable deliverables
│   ├── Works.jsx              # 3D Tilt project cards with GitHub links
│   ├── CustomCursor.jsx       # Spring-physics trailing red cursor
│   └── canvas/
│       └── Stars.jsx          # Three.js 3D floating red embers cloud
└── constants/
    └── index.js               # Master resume data, tech groups, experiences
```

---

## ⚡ 3. Setting the Custom Red Theme as the Default

To make the **Custom Red Theme** the active default across the entire application:

### Step 3.1: Configure `src/context/ThemeContext.jsx`

Ensure `THEMES.KURAMA` (or your custom red theme) is the default:

```javascript
// In src/context/ThemeContext.jsx
export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem("ninja_portfolio_theme");
      // Default to KURAMA / RED theme:
      return saved || THEMES.KURAMA;
    } catch {
      return THEMES.KURAMA;
    }
  });

  // Custom Red Palette:
  const redPalette = {
    primary: "#dc2626",      // Crimson
    secondary: "#ef4444",    // Scarlet
    accent: "#ff0055",       // Electric Ruby
    glow: "rgba(220, 38, 38, 0.5)",
    tag: "CUSTOM RED CHAKRA MODE",
    border: "border-[#dc2626]/40",
    gradient: "from-[#dc2626] via-[#ef4444] to-[#ff0055]",
    textGradient: "from-[#ef4444] via-[#ff0055] to-[#f87171]",
  };
```

---

### Step 3.2: Customize Hero GSAP Animations (`src/components/Hero.jsx`)

The Hero component features 6 GSAP-animated waving flame tails and pulsating aura rings. You can adjust the flame colors and intensity:

```javascript
// Kurama / Red Mode GSAP Aura:
gsap.to(glowRingRef.current, {
  scale: 1.25,
  opacity: 0.9,
  duration: 1.2,
  repeat: -1,
  yoyo: true,
  ease: "power2.inOut",
});

// Flame tails background gradient:
className="bg-gradient-to-t from-transparent via-[#dc2626]/50 to-[#ff0055]/70 blur-[14px]"
```

---

### Step 3.3: Customize 3D Canvas Embers (`src/components/canvas/Stars.jsx`)

The Three.js canvas dynamically responds to the theme. For your Red theme, it renders 5,400 glowing ember particles rotating in 3D space:

```javascript
<PointMaterial
  transparent
  color={isKurama ? "#dc2626" : "#ff0055"}  // Custom red ember color
  size={0.0032}                              // Ember particle size
  sizeAttenuation={true}
  depthWrite={false}
/>
```

---

### Step 3.4: Customize Trailing Cursor (`src/components/CustomCursor.jsx`)

The cursor dot and trailing ring automatically shift to crimson red:

```javascript
// Dot styling
style={{
  backgroundColor: "#dc2626",
  boxShadow: "0 0 10px #dc2626, 0 0 20px rgba(220, 38, 38, 0.7)",
}}

// Ring styling
style={{
  borderColor: "rgba(239, 68, 68, 0.7)",
  boxShadow: "0 0 15px rgba(220, 38, 38, 0.35)",
}}
```

---

## 🖼️ 4. How to Swap in Your Own Custom Image or Avatar

If you want to use your own photo instead of the generated avatars:

1. Place your image file into `src/assets/` (e.g. `src/assets/my_custom_photo.jpg`).
2. Open `src/assets/index.js` and update the import:
   ```javascript
   import heroAvatar from "./my_custom_photo.jpg";
   // or
   import kuramaAvatar from "./my_custom_red_avatar.jpg";
   ```
3. Run `npm run build` to verify the asset bundles properly.

---

## 🚀 5. Development & Deployment

### Run Locally:
```bash
npm run dev
```
Open `http://localhost:5173` to test live changes with Hot Module Replacement (HMR).

### Build for Production:
```bash
npm run build
```
Generates the optimized production bundle in the `dist/` directory with zero errors.

---

*Authored for Saikiran Nannapaneni's Portfolio Rebuild.*
