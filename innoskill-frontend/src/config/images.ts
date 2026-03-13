/**
 * Image Configuration
 * Centralized image paths for the INNOSKILLS 2026 website
 * 
 * Usage:
 * import { images, getImagePath } from '@/config/images';
 * <Image src={images.logo} alt="Logo" />
 * <Image src={getImagePath('sponsors', 'company.png')} alt="Sponsor" />
 */

// Base paths
const IMAGE_BASE = '/images';
const DOWNLOAD_BASE = '/downloads';

// Image categories
export const imagePaths = {
    // Root images
    logo: `${IMAGE_BASE}/logo.png`,
    heroBackground: `${IMAGE_BASE}/hero-bg.jpg`,
    ogImage: `${IMAGE_BASE}/og-image.jpg`,
    favicon: '/favicon.ico',
    
    // Sponsor images
    sponsors: {
        base: `${IMAGE_BASE}/sponsors`,
        // Add sponsor images here:
        // techNova: `${IMAGE_BASE}/sponsors/technova.png`,
        // futureStack: `${IMAGE_BASE}/sponsors/futurestack.png`,
    },
    
    // Event images (for each vertical)
    events: {
        base: `${IMAGE_BASE}/events`,
        srijan: `${IMAGE_BASE}/events/srijan.jpg`,
        udyam: `${IMAGE_BASE}/events/udyam.jpg`,
        arogya: `${IMAGE_BASE}/events/arogya.jpg`,
        prithvi: `${IMAGE_BASE}/events/prithvi.jpg`,
        aatithya: `${IMAGE_BASE}/events/aatithya.jpg`,
        nyaya: `${IMAGE_BASE}/events/nyaya.jpg`,
        sanchar: `${IMAGE_BASE}/events/sanchar.jpg`,
        kala: `${IMAGE_BASE}/events/kala.jpg`,
    },
    
    // Team member images
    team: {
        base: `${IMAGE_BASE}/team`,
        // Add team member images here:
        // member1: `${IMAGE_BASE}/team/member1.jpg`,
    },
    
    // Gallery images
    gallery: {
        base: `${IMAGE_BASE}/gallery`,
        // Add gallery images here or load dynamically
    },
    
    // Placeholder images
    placeholders: {
        event: `${IMAGE_BASE}/placeholder-event.jpg`,
        sponsor: `${IMAGE_BASE}/placeholder-sponsor.png`,
        team: `${IMAGE_BASE}/placeholder-team.jpg`,
        gallery: `${IMAGE_BASE}/placeholder-gallery.jpg`,
    },
};

// Download files
export const downloadPaths = {
    brochure: `${DOWNLOAD_BASE}/innoskills-brochure-2026.pdf`,
    schedule: `${DOWNLOAD_BASE}/innoskills-schedule-2026.pdf`,
    venueMap: `${DOWNLOAD_BASE}/innoskills-venue-map-2026.pdf`,
    registrationGuide: `${DOWNLOAD_BASE}/registration-guide.pdf`,
};

/**
 * Helper function to get image path by category and filename
 * @param category - Image category (sponsors, events, team, gallery)
 * @param filename - Image filename with extension
 * @returns Full image path
 */
export function getImagePath(category: 'sponsors' | 'events' | 'team' | 'gallery', filename: string): string {
    return `${IMAGE_BASE}/${category}/${filename}`;
}

/**
 * Helper function to get download path
 * @param filename - Download filename with extension
 * @returns Full download path
 */
export function getDownloadPath(filename: string): string {
    return `${DOWNLOAD_BASE}/${filename}`;
}

/**
 * External image URLs (Unsplash, etc.)
 * Use these for development/placeholder purposes
 */
export const externalImages = {
    heroBackground: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80',
    eventDefault: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    teamDefault: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    galleryDefault: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80',
};

// Default export for convenience
const images = {
    ...imagePaths,
    downloads: downloadPaths,
    external: externalImages,
    getImagePath,
    getDownloadPath,
};

export default images;
