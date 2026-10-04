import fs from 'node:fs';
import p from 'node:path';
import mediaManifest from '@/data/media_manifest.json';

const IMAGE_EXTS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.heic', '.bmp'];
const VIDEO_EXTS = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.wmv'];

function normalizeKey(pathStr) {
    if (!pathStr) return '';
    return pathStr
        .replace(/\\/g, '/')
        .replace(/^\/+|\/+$/g, '')
        .trim()
        .toLowerCase();
}

function getManifestEntries(cleanPath) {
    const normKey = normalizeKey(cleanPath);
    if (!normKey) return null;

    // Direct match
    if (mediaManifest[normKey]) {
        return { key: normKey, items: mediaManifest[normKey] };
    }

    // Common typo aliases (e.g. Environmental vs Enviornmental)
    const altKey = normKey.includes('environmental') 
        ? normKey.replace('environmental', 'enviornmental')
        : normKey.includes('enviornmental')
            ? normKey.replace('enviornmental', 'environmental')
            : null;

    if (altKey && mediaManifest[altKey]) {
        return { key: altKey, items: mediaManifest[altKey] };
    }

    return null;
}

export const findDirImages = async (path = 'events/2025-2026/Teaching/') => {
    if (!path) return [];
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const manifestMatch = getManifestEntries(cleanPath);

    if (manifestMatch) {
        return manifestMatch.items;
    }

    // Fallback for local development if new folder added without rebuilding manifest
    try {
        const folderPath = p.join(process.cwd(), 'public', cleanPath);
        if (fs.existsSync && fs.existsSync(folderPath)) {
            const stats = fs.statSync(folderPath);
            if (!stats.isDirectory()) return [];

            const files = fs.readdirSync(folderPath);
            const images = [];
            for (const f of files) {
                const ext = p.extname(f).toLowerCase();
                const isImage = IMAGE_EXTS.includes(ext);
                const isVideo = VIDEO_EXTS.includes(ext);
                if (isImage) {
                    images.push({ fileName: f, mime: 'image' });
                } else if (isVideo) {
                    images.push({ fileName: f, mime: 'video' });
                }
            }
            return images;
        }
    } catch (err) {
        console.error('Error finding dir images:', err);
    }

    return [];
};

export const resolveMediaUrls = async (mediaUrls) => {
    if (!mediaUrls || mediaUrls.length === 0) return [];
    let resolved = [];

    for (const url of mediaUrls) {
        if (!url) continue;
        const cleanPath = url.startsWith('/') ? url.slice(1) : url;
        const ext = p.extname(cleanPath).toLowerCase();

        // Check if cleanPath is a direct file
        if (IMAGE_EXTS.includes(ext) || VIDEO_EXTS.includes(ext)) {
            const isVideo = VIDEO_EXTS.includes(ext);
            resolved.push({
                url: url.startsWith('http') || url.startsWith('/') ? url : `/${url}`,
                type: isVideo ? 'video' : 'image'
            });
            continue;
        }

        // Check manifest for directory
        const manifestMatch = getManifestEntries(cleanPath);
        if (manifestMatch) {
            // Use original cleanPath casing for the URL prefix, ensuring consistent trailing slash
            const relFolder = cleanPath.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');
            const folderSlash = `/${relFolder}/`;
            for (const item of manifestMatch.items) {
                resolved.push({
                    url: `${folderSlash}${item.fileName}`,
                    type: item.mime
                });
            }
            continue;
        }

        // Fallback for local dev
        try {
            const localPath = p.join(process.cwd(), 'public', cleanPath);
            if (fs.existsSync && fs.existsSync(localPath)) {
                const stats = fs.statSync(localPath);
                if (stats.isDirectory()) {
                    const files = fs.readdirSync(localPath);
                    const relFolder = p.relative(p.join(process.cwd(), 'public'), localPath).replace(/\\/g, '/');
                    const folderSlash = relFolder.endsWith('/') ? relFolder : relFolder + '/';
                    for (const f of files) {
                        const fileExt = p.extname(f).toLowerCase();
                        const isImage = IMAGE_EXTS.includes(fileExt);
                        const isVideo = VIDEO_EXTS.includes(fileExt);
                        if (isImage || isVideo) {
                            const fileUrl = folderSlash.startsWith('/') ? `${folderSlash}${f}` : `/${folderSlash}${f}`;
                            resolved.push({
                                url: fileUrl,
                                type: isImage ? 'image' : 'video'
                            });
                        }
                    }
                } else {
                    const isVideo = VIDEO_EXTS.includes(ext);
                    resolved.push({
                        url: url.startsWith('http') || url.startsWith('/') ? url : `/${url}`,
                        type: isVideo ? 'video' : 'image'
                    });
                }
                continue;
            }
        } catch (e) {
            // ignore fallback error
        }

        // Default direct URL fallback
        const isVideo = VIDEO_EXTS.includes(ext);
        resolved.push({
            url: url.startsWith('http') || url.startsWith('/') ? url : `/${url}`,
            type: isVideo ? 'video' : 'image'
        });
    }

    return resolved;
};

export const resolveEventThumbnail = async (eventMedia, fallback = '/placeholder.svg') => {
    if (!eventMedia || eventMedia.length === 0) return fallback;

    // First try the marked thumbnail
    const thumbRow = eventMedia.find(m => m.is_thumbnail);
    if (thumbRow && thumbRow.media_url) {
        const resolved = await resolveMediaUrls([thumbRow.media_url]);
        const img = resolved.find(m => m.type === 'image');
        if (img) return img.url;
    }

    // Otherwise try resolving all in order
    const mediaUrls = eventMedia.map(m => m.media_url);
    const resolved = await resolveMediaUrls(mediaUrls);
    const img = resolved.find(m => m.type === 'image');
    return img ? img.url : fallback;
};
