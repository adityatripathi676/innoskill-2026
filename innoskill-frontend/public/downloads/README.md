# INNOSKILLS 2026 - Downloads Directory

This folder contains downloadable files for the INNOSKILLS 2026 website.

## Required Files

| File | Description | Status |
|------|-------------|--------|
| `innoskills-brochure-2026.pdf` | Event brochure with all details | Pending |
| `innoskills-schedule-2026.pdf` | Day-wise event schedule | Pending |
| `innoskills-venue-map-2026.pdf` | Campus navigation map | Pending |
| `registration-guide.pdf` | Registration instructions | Pending |

## File Guidelines

### PDF Settings
- **Page Size**: A4 (210 x 297 mm)
- **Resolution**: 150-300 DPI for print quality
- **File Size**: Keep under 5MB for fast downloads
- **Compression**: Use PDF compression for web delivery

### Naming Convention
- Use lowercase with hyphens
- Include year: `innoskills-brochure-2026.pdf`
- Be descriptive and consistent

## Usage in Code

Import from the download config:
```tsx
import { downloadPaths } from '@/config/images';

// Use in download buttons
<a href={downloadPaths.brochure} download>
    Download Brochure
</a>
```

## Notes
- PDFs are served directly from `/downloads/` URL path
- No authentication required for downloads
- Files are cached by the browser
