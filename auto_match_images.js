const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public', 'generated');
const inventoryFile = path.join(__dirname, 'data', 'inventory.json');

const inventoryData = JSON.parse(fs.readFileSync(inventoryFile, 'utf8'));
const files = fs.readdirSync(publicDir);

function normalizeString(str) {
    return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

let updatedCount = 0;

inventoryData.forEach(item => {
    const itemNameNormalized = normalizeString(item.name);
    let bestMatch = null;

    // Try to find an exact match first
    for (const file of files) {
        if (file.endsWith('.svg') || file.startsWith('plus_') || file === 'classic_white_tee.png') {
            continue; // Skip the ones we generated earlier
        }
        
        const fileNameWithoutExt = file.replace(/\.[^/.]+$/, "");
        const fileNameNormalized = normalizeString(fileNameWithoutExt);

        if (itemNameNormalized === fileNameNormalized || 
            itemNameNormalized.includes(fileNameNormalized) || 
            fileNameNormalized.includes(itemNameNormalized)) {
            bestMatch = file;
            break;
        }
    }

    // specific manual mapping fallbacks based on visual inspection of the list:
    if (!bestMatch) {
         if (item.name === "Gold Hoop Earrings") {
             bestMatch = "gold loop.jpeg";
         } else if (item.name === "Chunky Bracelets") {
             bestMatch = "chunky bracelet.jpeg";
         } else if (item.name === "Leather Crossbody Bag") {
             // did user upload one? "leather crossbody bag" wasn't listed, maybe skip
         } else if (item.name === "Classic White Tee") {
             bestMatch = "white tee.jpeg";
         } else if (item.name === "Pleated Midi Skirt") {
             bestMatch = "pleated mini skirt.jpeg";
         } else if (item.name === "Layered Chain Necklace") {
             bestMatch = "layered necklace.jpeg";
         } else if (item.name === "Silk Hair Scarf") {
             bestMatch = "hair scarf.jpeg";
         }
    }

    if (bestMatch) {
        item.image = `/generated/${bestMatch}`;
        console.log(`Matched "${item.name}" -> ${bestMatch}`);
        updatedCount++;
    } else {
        console.log(`No match found for: ${item.name}`);
    }
});

fs.writeFileSync(inventoryFile, JSON.stringify(inventoryData, null, 4));
console.log(`Updated images for ${updatedCount} items based on your new files.`);
