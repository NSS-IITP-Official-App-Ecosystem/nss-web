import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const targetDirs = [
    path.resolve('public/events/2026-2027'),
    path.resolve('public/teaching gallery/TUT TEACHING')
];

function scan(dir) {
    let res = [];
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, f.name);
        if (f.isDirectory()) res = res.concat(scan(full));
        else if (f.isFile() && !f.name.startsWith('.')) {
            const ext = path.extname(f.name).toLowerCase();
            if (['.jpg', '.jpeg', '.png', '.webp', '.heic'].includes(ext)) {
                res.push(full);
            }
        }
    }
    return res;
}

let files = [];
for (const d of targetDirs) {
    files = files.concat(scan(d));
}

console.log(`Total images checked: ${files.length}`);
let anyOver100KB = false;
let corruptCount = 0;

for (const f of files) {
    const s = fs.statSync(f);
    if (s.size > 100 * 1024) {
        console.error(`FAIL: ${f} is ${(s.size/1024).toFixed(1)} KB`);
        anyOver100KB = true;
    }
    try {
        const meta = await sharp(f).metadata();
        if (!meta.width || !meta.height) {
            console.error(`CORRUPT: ${f}`);
            corruptCount++;
        }
    } catch (e) {
        console.error(`ERROR READING: ${f} - ${e.message}`);
        corruptCount++;
    }
}

if (!anyOver100KB && corruptCount === 0) {
    console.log(`ALL ${files.length} IMAGES ARE VALID AND BELOW 100 KB!`);
} else {
    console.error(`Found errors: anyOver100KB=${anyOver100KB}, corruptCount=${corruptCount}`);
}
