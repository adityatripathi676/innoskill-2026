# INNOSKILLS 2026 - Images Directory

This folder contains all static images for the INNOSKILLS 2026 website.

## Folder Structure

```
images/
├── logo.png              # Main INNOSKILLS logo
├── hero-bg.jpg           # Hero section background
├── og-image.jpg          # Open Graph image for social sharing
├── sponsors/             # Sponsor/partner logos
│   └── [sponsor-name].png
├── events/               # Event vertical images
│   ├── srijan.jpg
│   ├── udyam.jpg
│   ├── arogya.jpg
│   ├── prithvi.jpg
│   ├── aatithya.jpg
│   ├── nyaya.jpg
│   ├── sanchar.jpg
│   └── kala.jpg
├── team/                 # Team member photos
│   └── [member-name].jpg
└── gallery/              # Event gallery photos
    └── [photo-name].jpg
```

## Image Guidelines

### Recommended Sizes
- **Logo**: 200x200px (PNG with transparency)
- **Hero Background**: 1920x1080px (JPG)
- **OG Image**: 1200x630px (JPG)
- **Sponsor Logos**: 300x150px (PNG with transparency)
- **Event Images**: 800x600px (JPG)
- **Team Photos**: 400x400px (JPG, square)
- **Gallery Images**: 800x600px or 1200x800px (JPG)

### Format Recommendations
- Use **PNG** for logos and images requiring transparency
- Use **JPG** for photographs (80-90% quality)
- Use **WebP** for better compression (with JPG fallback)

### Naming Convention
- Use lowercase with hyphens: `sponsor-name.png`
- Be descriptive: `srijan-robotics-event.jpg`
- Avoid spaces and special characters

## Usage in Code

Import from the image config:
```tsx
import { imagePaths, getImagePath } from '@/config/images';

// Direct path
<Image src={imagePaths.logo} alt="Logo" />

// Dynamic path
<Image src={getImagePath('sponsors', 'company.png')} alt="Sponsor" />
```
