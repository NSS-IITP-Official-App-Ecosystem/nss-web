import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const TARGET_MAX_BYTES = 95 * 1024; // 97,280 bytes - strictly below 100 KB

const TARGET_DIRECTORIES = [
    path.resolve(process.cwd(), 'public/events/2026-2027'),
    path.resolve(process.cwd(), 'public/teaching gallery/TUT TEACHING')
];

function getAllImageFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results = results.concat(getAllImageFiles(full));
        } else if (entry.isFile() && !entry.name.startsWith('.')) {
            const ext = path.extname(entry.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.webp', '.heic'].includes(ext)) {
                results.push(full);
            }
        }
    }
    return results;
}

async function compressImageBuffer(inputBuffer, ext) {
    let format = ext.toLowerCase();
    if (format === '.heic') format = '.jpg';

    const meta = await sharp(inputBuffer).metadata();
    const origMaxDim = Math.max(meta.width || 1200, meta.height || 1200);

    let dim = Math.min(1280, origMaxDim);
    let best = null;

    const dimSteps = [1280, 1080, 960, 840, 720, 600, 500, 400, 320];

    for (const currentDim of dimSteps) {
        if (currentDim > origMaxDim && currentDim !== dimSteps[0]) continue;
        dim = Math.min(currentDim, origMaxDim);

        const qualities = [80, 72, 64, 56, 48, 40];
        for (const q of qualities) {
            let p = sharp(inputBuffer)
                .rotate()
                .resize({
                    width: meta.width >= meta.height ? dim : undefined,
                    height: meta.height > meta.width ? dim : undefined,
                    fit: 'inside',
                    withoutEnlargement: true
                });

            if (format === '.webp') {
                p = p.webp({ quality: q, effort: 5, smartSubsample: true });
            } else if (format === '.jpg' || format === '.jpeg') {
                p = p.jpeg({
                    quality: q,
                    mozjpeg: true,
                    progressive: true,
                    trellisQuantisation: true,
                    overshootDeringing: true
                });
            } else if (format === '.png') {
                p = p.png({
                    palette: true,
                    quality: q,
                    compressionLevel: 9,
                    effort: 5
                });
            }

            const buf = await p.toBuffer();
            if (buf.length <= TARGET_MAX_BYTES) {
                return {
                    buffer: buf,
                    size: buf.length,
                    dim,
                    quality: q,
                    format
                };
            }

            best = { buffer: buf, size: buf.length, dim, quality: q, format };

            // If significantly oversized (>1.5x target), jump directly to lower dimension
            if (buf.length > TARGET_MAX_BYTES * 1.5) {
                break;
            }
        }
    }

    // Emergency fallback if somehow still above TARGET_MAX_BYTES
    if (!best || best.size > TARGET_MAX_BYTES) {
        let fallbackDim = 300;
        let fallbackQ = 35;
        let p = sharp(inputBuffer).rotate().resize(fallbackDim, fallbackDim, { fit: 'inside' });
        if (format === '.webp') p = p.webp({ quality: fallbackQ });
        else if (format === '.jpg' || format === '.jpeg') p = p.jpeg({ quality: fallbackQ, mozjpeg: true });
        else p = p.png({ palette: true, quality: fallbackQ });
        const buf = await p.toBuffer();
        return { buffer: buf, size: buf.length, dim: fallbackDim, quality: fallbackQ, format };
    }

    return best;
}

async function run() {
    console.log('====================================================');
    console.log(' NSS IITP Image Compressor - Target: < 100 KB');
    console.log(` Target Max Size: ${(TARGET_MAX_BYTES / 1024).toFixed(1)} KB (${TARGET_MAX_BYTES} bytes)`);
    console.log('====================================================\n');

    let allFiles = [];
    for (const d of TARGET_DIRECTORIES) {
        allFiles = allFiles.concat(getAllImageFiles(d));
    }

    console.log(`Found total ${allFiles.length} image files across target directories.`);

    let filesToProcess = [];
    let filesSkipped = 0;

    for (const f of allFiles) {
        const stat = fs.statSync(f);
        const ext = path.extname(f).toLowerCase();
        if (ext === '.heic' || stat.size > TARGET_MAX_BYTES) {
            filesToProcess.push({ path: f, size: stat.size, ext });
        } else {
            filesSkipped++;
        }
    }

    console.log(`- Already below target (<= 95 KB): ${filesSkipped}`);
    console.log(`- Requiring compression (> 95 KB or .heic): ${filesToProcess.push ? filesToProcess.length : 0}\n`);

    let totalSaved = 0;
    let initialTotal = 0;
    let finalTotal = 0;
    let successCount = 0;

    for (let i = 0; i < filesToProcess.length; i++) {
        const item = filesToProcess[i];
        const rel = path.relative(path.resolve('public'), item.path);
        initialTotal += item.size;

        try {
            const inputBuf = fs.readFileSync(item.path);
            const res = await compressImageBuffer(inputBuf, item.ext);

            finalTotal += res.size;
            totalSaved += (item.size - res.size);

            if (item.ext === '.heic') {
                const targetJpgPath = item.path.replace(/\.heic$/i, '.jpg');
                fs.writeFileSync(targetJpgPath, res.buffer);
                fs.unlinkSync(item.path);
                console.log(`[${i + 1}/${filesToProcess.length}] [CONVERT HEIC->JPG] ${rel} -> ${(res.size / 1024).toFixed(1)} KB (dim=${res.dim}, q=${res.quality})`);
            } else {
                fs.writeFileSync(item.path, res.buffer);
                console.log(`[${i + 1}/${filesToProcess.length}] [OPTIMIZED] ${rel}: ${(item.size / 1024).toFixed(1)} KB -> ${(res.size / 1024).toFixed(1)} KB (-${(((item.size - res.size) / item.size) * 100).toFixed(1)}%, dim=${res.dim}, q=${res.quality})`);
            }

            successCount++;
        } catch (err) {
            console.error(`[${i + 1}/${filesToProcess.length}] [ERROR] ${rel}: ${err.message}`);
            finalTotal += item.size;
        }
    }

    // Re-verification step across ALL files
    console.log('\n====================================================');
    console.log(' RE-VERIFICATION PASS ACROSS ALL TARGET IMAGES');
    console.log('====================================================');

    let postCheckFiles = [];
    for (const d of TARGET_DIRECTORIES) {
        postCheckFiles = postCheckFiles.concat(getAllImageFiles(d));
    }

    const over100KB = [];
    const over95KB = [];
    let largest = null;

    for (const f of postCheckFiles) {
        const stat = fs.statSync(f);
        if (!largest || stat.size > largest.size) {
            largest = { path: f, size: stat.size };
        }
        if (stat.size > 100 * 1024) {
            over100KB.push({ path: f, size: stat.size });
        } else if (stat.size > TARGET_MAX_BYTES) {
            over95KB.push({ path: f, size: stat.size });
        }
    }

    console.log(`Total verified image files: ${postCheckFiles.length}`);
    console.log(`Files > 100 KB: ${over100KB.length}`);
    console.log(`Files > 95 KB: ${over95KB.length}`);
    if (largest) {
        console.log(`Largest file in set: ${path.relative(path.resolve('public'), largest.path)} (${(largest.size / 1024).toFixed(1)} KB, ${largest.size} bytes)`);
    }

    if (over100KB.length === 0) {
        console.log('\n>>> SUCCESS: ALL IMAGES ARE STRICTLY BELOW 100 KB! <<<');
    } else {
        console.error(`\n>>> FAILURE: ${over100KB.length} images still exceed 100 KB! <<<`);
        console.error(over100KB);
    }

    console.log('\n====================================================');
    console.log(`Files Processed:  ${filesToProcess.length}`);
    console.log(`Successful:       ${successCount}`);
    console.log(`Initial Size:     ${(initialTotal / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`Final Size:       ${(finalTotal / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`Space Saved:      ${(totalSaved / (1024 * 1024)).toFixed(2)} MB (${((totalSaved / initialTotal) * 100).toFixed(1)}% reduction)`);
    console.log('====================================================\n');
}

run();
