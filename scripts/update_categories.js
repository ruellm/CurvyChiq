import fs from 'fs';

const path = 'c:/Users/chiqu/capstone/curvychiq/data/inventory.json';
const inventory = JSON.parse(fs.readFileSync(path, 'utf8'));

inventory.forEach(item => {
    // If category is "New Arrival", mark it and then assign its "real" category
    if (item.category === 'New Arrival') {
        item.isNewArrival = true;
        // Optionally, assign based on name/description, but for ID 26 we know it's a bottom
        if (item.id === '26') {
            item.category = 'Bottoms';
        }
    }
});

fs.writeFileSync(path, JSON.stringify(inventory, null, 4));
console.log('Updated inventory: Category for ID 26 set to "Bottoms" and tagged as isNewArrival.');
