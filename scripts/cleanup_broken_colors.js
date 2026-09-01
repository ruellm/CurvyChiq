const fs = require('fs');
const path = require('path');

const projectRoot = 'c:/Users/chiqu/capstone/curvychiq';
const inventoryPath = path.join(projectRoot, 'data/inventory.json');
const publicDir = path.join(projectRoot, 'public');

const data = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

console.log('Cleaning up broken color image references...');

let totalFixed = 0;

data.forEach(item => {
    if (item.colorImages) {
        const cleanedColorImages = {};
        let itemHadIssues = false;

        Object.keys(item.colorImages).forEach(color => {
            const images = item.colorImages[color];
            const imageList = Array.isArray(images) ? images : [images];

            // Check if ANY of the images exist. If not, we remove this color entry
            const validImages = imageList.filter(img => fs.existsSync(path.join(publicDir, img)));

            if (validImages.length > 0) {
                cleanedColorImages[color] = images; // keep as is (array or string)
            } else {
                itemHadIssues = true;
                console.log(`[${item.id}] Removed broken color "${color}" for ${item.name}`);
            }
        });

        if (itemHadIssues) {
            item.colorImages = cleanedColorImages;
            totalFixed++;
        }
    }
});

fs.writeFileSync(inventoryPath, JSON.stringify(data, null, 4));
console.log(`Cleaned up broken references for ${totalFixed} products.`);
