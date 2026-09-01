import fs from 'fs';

const path = 'c:/Users/chiqu/capstone/curvychiq/data/inventory.json';
const inventory = JSON.parse(fs.readFileSync(path, 'utf8'));

inventory.forEach(item => {
    delete item.images;
});

fs.writeFileSync(path, JSON.stringify(inventory, null, 4));
console.log('Restored original inventory structure (removed extra images).');
