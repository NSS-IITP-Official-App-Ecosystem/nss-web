import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import ffmpegPath from 'ffmpeg-static';
import { execFileSync } from 'node:child_process';

const TARGET_DIR = path.resolve(process.cwd(), 'public/events/2026-2027');

function getFiles(dir) {
    let results = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });
    for (const item of items) {
        const full = path.join(dir, item.name);
        if (item.isDirectory()) {
            results = results.concat(getFiles(full));
        } else if (item.isFile() && !item.name.endsWith('.gitkeep')) {
            results.push(full);
        }
    }
    return results;
}

async function processImage(filePath) {
    const inputBuffer = fs.readFileSync(filePath);
    const beforeSize = inputBuffer.length;
    const ext = path.extname(filePath).toLowerCase();

    try {
        const meta = await sharp(inputBuffer).metadata();
        let pipeline = sharp(inputBuffer);

        // Resize down to 1280px max dimension if larger
        if (meta.width > 1280 || meta.height > 1280) {
            pipeline = pipeline.resize({
                width: meta.width >= meta.height ? 1280 : undefined,
                height: meta.height > meta.width ? 1280 : undefined,
                fit: 'inside',
                withoutEnlargement: true
            });
        }

        pipeline = pipeline.rotate(); // auto-orient

        if (ext === '.webp') {
            pipeline = pipeline.webp({ quality: 75, effort: 6, smartSubsample: true });
        } else if (ext === '.jpg' || ext === '.jpeg') {
            pipeline = pipeline.jpeg({ quality: 75, mozjpeg: true, progressive: true });
        } else if (ext === '.png') {
            pipeline = pipeline.png({ quality: 75, compressionLevel: 9, effort: 7 });
        } else {
            return { skipped: true, reason: 'Unsupported format' };
        }

        const outputBuffer = await pipeline.toBuffer();
        const afterSize = outputBuffer.length;

        if (afterSize < beforeSize) {
            fs.writeFileSync(filePath, outputBuffer);
            return {
                saved: true,
                before: beforeSize,
                after: afterSize,
                reduction: ((1 - afterSize / beforeSize) * 100).toFixed(1) + '%'
            };
        } else {
            return {
                saved: false,
                reason: 'Already optimal',
                before: beforeSize,
                after: beforeSize
            };
        }
    } catch (err) {
        return { error: err.message };
    }
}

function processVideo(filePath) {
    const beforeSize = fs.statSync(filePath).size;
    const tempPath = filePath + '.compressed.mp4';

    try {
        console.log(`\nCompressing video: ${path.basename(filePath)} ...`);
        execFileSync(ffmpegPath, [
            '-y',
            '-i', filePath,
            '-c:v', 'libx264',
            '-crf', '28',
            '-preset', 'slow',
            '-c:a', 'aac',
            '-b:a', '96k',
            '-movflags', '+faststart',
            tempPath
        ], { stdio: 'inherit' });

        const afterSize = fs.statSync(tempPath).size;
        if (afterSize < beforeSize) {
            // Replace original safely
            fs.unlinkSync(filePath);
            fs.renameSync(tempPath, filePath);
            return {
                saved: true,
                before: beforeSize,
                after: afterSize,
                reduction: ((1 - afterSize / beforeSize) * 100).toFixed(1) + '%'
            };
        } else {
            if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
            return { saved: false, reason: 'Already optimal' };
        }
    } catch (err) {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        return { error: err.message };
    }
}

async function run() {
    console.log(`Scanning ${TARGET_DIR} ...`);
    const allFiles = getFiles(TARGET_DIR);
    console.log(`Found ${allFiles.length} media files.\n`);

    let totalBefore = 0;
    let totalAfter = 0;
    let compressedCount = 0;

    for (let i = 0; i < allFiles.length; i++) {
        const file = allFiles[i];
        const rel = path.relative(TARGET_DIR, file);
        const ext = path.extname(file).toLowerCase();
        const stat = fs.statSync(file);
        totalBefore += stat.size;

        if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
            const res = await processImage(file);
            if (res.saved) {
                compressedCount++;
                totalAfter += res.after;
                console.log(`[${i + 1}/${allFiles.length}] [IMG] ${rel}: ${(res.before / 1024).toFixed(1)} KB -> ${(res.after / 1024).toFixed(1)} KB (-${res.reduction})`);
            } else if (res.error) {
                totalAfter += stat.size;
                console.warn(`[${i + 1}/${allFiles.length}] [ERR] ${rel}: ${res.error}`);
            } else {
                totalAfter += stat.size;
                console.log(`[${i + 1}/${allFiles.length}] [SKIP] ${rel}: ${res.reason} (${(stat.size / 1024).toFixed(1)} KB)`);
            }
        } else if (['.mp4', '.mov', '.webm'].includes(ext)) {
            const res = processVideo(file);
            if (res.saved) {
                compressedCount++;
                totalAfter += res.after;
                console.log(`[${i + 1}/${allFiles.length}] [VID] ${rel}: ${(res.before / (1024 * 1024)).toFixed(2)} MB -> ${(res.after / (1024 * 1024)).toFixed(2)} MB (-${res.reduction})`);
            } else {
                totalAfter += stat.size;
                console.log(`[${i + 1}/${allFiles.length}] [VID SKIP] ${rel}`);
            }
        } else {
            totalAfter += stat.size;
        }
    }

    const savedTotal = totalBefore - totalAfter;
    console.log('\n========================================');
    console.log(`Files Processed: ${allFiles.length}`);
    console.log(`Files Reduced:   ${compressedCount}`);
    console.log(`Initial Size:    ${(totalBefore / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`Final Size:      ${(totalAfter / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`Space Saved:     ${(savedTotal / (1024 * 1024)).toFixed(2)} MB (${((savedTotal / totalBefore) * 100).toFixed(1)}% reduction)`);
    console.log('========================================');
}

run();
