import fs from 'fs';
import path from 'path';

const inventoryPath = 'c:/Users/chiqu/capstone/curvychiq/data/inventory.json';
const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

// Only update the first 3 items to show the effect
inventory[0].images = [
    "/generated/white tee.jpeg",
    "/generated/plus_top_1773806870130.png",
    "/generated/classic_white_tee.png",
    "/generated/white tee.jpeg"
];

inventory[1].images = [
    "/generated/silk camisole.jpeg",
    "/generated/plus_top_1773806870130.png",
    "/generated/silk camisole.jpeg",
    "/generated/silk camisole.jpeg"
];

inventory[2].images = [
    "/generated/ribbed knit sweater.jpeg",
    "/generated/plus_top_1773806870130.png",
    "/generated/ribbed knit sweater.jpeg",
    "/generated/ribbed knit sweater.jpeg"
];

fs.writeFileSync(inventoryPath, JSON.stringify(inventory, null, 4));
console.log('Successfully added example images to first 3 items in inventory.json');
