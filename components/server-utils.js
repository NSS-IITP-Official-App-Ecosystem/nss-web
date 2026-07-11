import fs from 'node:fs';
import p from 'node:path';

export const findDirImages = async (path = 'events/2025-2026/Teaching/') => {
    if (!path) return [];
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    const folderPath = p.join(process.cwd(), 'public', cleanPath);
    let images = [];
    try {
        const stats = fs.statSync(folderPath);
        if (!stats.isDirectory()) return [];

        const files = fs.readdirSync(folderPath);
        for (const f of files) {
            const ext = p.extname(f).toLowerCase();
            const isImage = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.heic', '.bmp'].includes(ext);
            const isVideo = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.wmv'].includes(ext);
            if (isImage) {
                images.push({
                    'fileName': f,
                    'mime': 'image'
                });
            } else if (isVideo) {
                images.push({
                    'fileName': f,
                    'mime': 'video'
                });
            }
        }
    } catch (err) {
        console.log(err);
    }

    return images;
}

export const resolveMediaUrls = async (mediaUrls) => {
    if (!mediaUrls || mediaUrls.length === 0) return [];
    let resolved = [];
    for (const url of mediaUrls) {
        if (!url) continue;
        const cleanPath = url.startsWith('/') ? url.slice(1) : url;
        const localPath = p.join(process.cwd(), 'public', cleanPath);
        try {
            const stats = fs.statSync(localPath);
            if (stats.isDirectory()) {
                const files = fs.readdirSync(localPath);
                for (const f of files) {
                    const ext = p.extname(f).toLowerCase();
                    const isImage = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.heic', '.bmp'].includes(ext);
                    const isVideo = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.wmv'].includes(ext);
                    if (isImage || isVideo) {
                        const folderSlash = url.endsWith('/') ? url : url + '/';
                        const fileUrl = folderSlash.startsWith('/') ? `${folderSlash}${f}` : `/${folderSlash}${f}`;
                        resolved.push({
                            url: fileUrl,
                            type: isImage ? 'image' : 'video'
                        });
                    }
                }
            } else {
                const ext = p.extname(url).toLowerCase();
                const isVideo = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.wmv'].includes(ext);
                resolved.push({
                    url: url.startsWith('http') || url.startsWith('/') ? url : `/${url}`,
                    type: isVideo ? 'video' : 'image'
                });
            }
        } catch (e) {
            const ext = p.extname(url).toLowerCase();
            const isVideo = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.wmv'].includes(ext);
            resolved.push({
                url: url.startsWith('http') || url.startsWith('/') ? url : `/${url}`,
                type: isVideo ? 'video' : 'image'
            });
        }
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
