const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'generated');
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
}

const inventoryFile = path.join(__dirname, 'data', 'inventory.json');
const inventoryPath = fs.readFileSync(inventoryFile, 'utf8');
const inventoryData = JSON.parse(inventoryPath);

inventoryData.forEach(item => {
    // We successfully generated a real photo for the Classic White Tee!
    if (item.name === "Classic White Tee") {
        item.image = '/generated/classic_white_tee.png';
    } else {
        // Generate a high-fashion, minimalist placeholder SVG for the rest since models are removed
        const filename = `${item.id}_${item.name.replace(/\s+/g, '_').toLowerCase()}.svg`;
        const filepath = path.join(publicDir, filename);

        const svgContent = `
<svg width="600" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="600" height="800" fill="#f9f9f9" />
  <rect x="20" y="20" width="560" height="760" fill="none" stroke="#e5e5e5" stroke-width="2" />
  <text x="50%" y="45%" font-family="sans-serif" font-size="14" fill="#737373" text-anchor="middle" letter-spacing="4">CURVYCHIQ EXCLUSIVE</text>
  <text x="50%" y="50%" font-family="serif" font-size="28" fill="#000000" text-anchor="middle" letter-spacing="2" font-weight="bold">${item.name.toUpperCase()}</text>
  <text x="50%" y="55%" font-family="sans-serif" font-size="14" fill="#737373" text-anchor="middle" letter-spacing="1">PREVIEW UNAVAILABLE</text>
</svg>`.trim();

        fs.writeFileSync(filepath, svgContent);
        item.image = `/generated/${filename}`;
    }
});

fs.writeFileSync(inventoryFile, JSON.stringify(inventoryData, null, 4));
console.log('Successfully updated images to isolated product placeholders.');
