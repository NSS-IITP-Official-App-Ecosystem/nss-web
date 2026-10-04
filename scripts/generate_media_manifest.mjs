import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const OUTPUT_FILE = path.resolve(process.cwd(), 'data/media_manifest.json');

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.heic', '.bmp']);
const VIDEO_EXTS = new Set(['.mp4', '.mov', '.avi', '.mkv', '.webm', '.wmv']);

function scanDirectories(dir, relativeToPublic = '') {
    const manifest = {};
    if (!fs.existsSync(dir)) return manifest;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const currentFiles = [];

    for (const entry of entries) {
        if (entry.name.startsWith('.')) continue; // ignore .gitkeep, etc.
        const fullPath = path.join(dir, entry.name);
        const relPath = path.join(relativeToPublic, entry.name).replace(/\\/g, '/');

        if (entry.isDirectory()) {
            const subManifest = scanDirectories(fullPath, relPath);
            Object.assign(manifest, subManifest);
        } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (IMAGE_EXTS.has(ext)) {
                currentFiles.push({ fileName: entry.name, mime: 'image' });
            } else if (VIDEO_EXTS.has(ext)) {
                currentFiles.push({ fileName: entry.name, mime: 'video' });
            }
        }
    }

    if (currentFiles.length > 0 && relativeToPublic) {
        const normKey = relativeToPublic.replace(/\\/g, '/').replace(/^\/+|\/+$/g, '').toLowerCase();
        manifest[normKey] = currentFiles;
    }

    return manifest;
}

console.log('Generating media manifest from public/ ...');
const manifest = scanDirectories(PUBLIC_DIR);
const dirCount = Object.keys(manifest).length;
let totalMedia = 0;
for (const k of Object.keys(manifest)) {
    totalMedia += manifest[k].length;
}

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(manifest, null, 2), 'utf8');

const stat = fs.statSync(OUTPUT_FILE);
console.log(`Successfully generated ${OUTPUT_FILE}`);
console.log(`Tracked ${dirCount} media directories, ${totalMedia} media files.`);
console.log(`Manifest size: ${(stat.size / 1024).toFixed(2)} KB.`);
