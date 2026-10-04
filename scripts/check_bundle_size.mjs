import fs from 'node:fs';
import path from 'node:path';

function checkRoute(relNftPath) {
  if (!fs.existsSync(relNftPath)) {
    console.log(`Not found: ${relNftPath}`);
    return;
  }
  const nft = JSON.parse(fs.readFileSync(relNftPath, 'utf8'));
  let totalTraced = 0;
  for (const f of nft.files) {
    const full = path.resolve(path.dirname(relNftPath), f);
    if (fs.existsSync(full)) {
      totalTraced += fs.statSync(full).size;
    }
  }
  console.log(`${relNftPath}: ${(totalTraced / (1024 * 1024)).toFixed(2)} MB (${nft.files.length} files)`);
}

checkRoute('.next/server/app/events/page.js.nft.json');
checkRoute('.next/server/app/gallery/page.js.nft.json');
checkRoute('.next/server/app/gallery/event/[id]/page.js.nft.json');
checkRoute('.next/server/app/wings/prerna/page.js.nft.json');
checkRoute('.next/server/app/wings/teaching/page.js.nft.json');
checkRoute('.next/server/app/page.js.nft.json');
