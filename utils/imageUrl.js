/**
 * Safely resolves an image URL for Next.js <Image /> and <img> components.
 * Prevents "Failed to parse src on next/image", unconfigured host errors, and HTML page injection (e.g. Google Drive login redirects).
 * 
 * @param {string} url - The raw URL or path from database/storage/JSON
 * @param {string} fallback - A valid local/absolute image path to use if url is invalid
 * @returns {string} A valid absolute URL or root-relative URL starting with '/'
 */
export function resolveImageUrl(url, fallback = '/home_slider/nss_home.jpg') {
    if (!url || typeof url !== 'string') {
        return fallback;
    }
    const trimmed = url.trim();
    if (!trimmed) {
        return fallback;
    }
    // If it's a directory/folder path ending in '/', it cannot be directly rendered as an image
    if (trimmed.endsWith('/')) {
        return fallback;
    }
    // Google Drive share pages (e.g. https://drive.google.com/open?id=... or lh3.googleusercontent.com/d/...) 
    // return HTML login pages instead of raw images when accessed by Next.js server/browser without auth.
    if (trimmed.includes('drive.google.com') || trimmed.includes('accounts.google.com') || trimmed.includes('googleusercontent.com')) {
        return fallback;
    }
    // If it already starts with http://, https://, /, or data:, return as is
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('/') || trimmed.startsWith('data:')) {
        return trimmed;
    }
    // If it is a relative path like 'events/photo.jpg' or 'units/chetna.jpg', prepend leading slash '/'
    return `/${trimmed}`;
}
