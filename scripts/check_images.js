const fs = require('fs');
const path = require('path');

const projectRoot = 'c:/Users/chiqu/capstone/curvychiq';
const inventoryPath = path.join(projectRoot, 'data/inventory.json');
const publicDir = path.join(projectRoot, 'public');

const data = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

console.log('Checking images for ' + data.length + ' products...');

const missing = data.filter(p => {
    const localPath = path.join(publicDir, p.image);
    return !fs.existsSync(localPath);
});

if (missing.length > 0) {
    console.log('Missing main images for products:');
    missing.forEach(p => {
        console.log(`[${p.id}] ${p.name}: ${p.image}`);
    });
} else {
    console.log('All main images found!');
}

console.log('--- Checking color images ---');
data.forEach(p => {
    if (p.colorImages) {
        Object.keys(p.colorImages).forEach(color => {
            const images = p.colorImages[color];
            const imageList = Array.isArray(images) ? images : [images];
            imageList.forEach((img, idx) => {
                if (!fs.existsSync(path.join(publicDir, img))) {
                    console.log(`[${p.id}] ${p.name} - ${color} image ${idx + 1} missing: ${img}`);
                }
            });
        });
    }
});
