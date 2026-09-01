const fs = require('fs');
const path = require('path');

const inventoryFile = path.join(__dirname, 'data', 'inventory.json');
const inventoryPath = fs.readFileSync(inventoryFile, 'utf8');
const inventoryData = JSON.parse(inventoryPath);

function getRandomPrice(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

inventoryData.forEach(item => {
    if (item.category === 'Tops') {
        item.price = getRandomPrice(500, 799);
    } else if (item.category === 'Bottoms') {
        item.price = getRandomPrice(750, 1500);
    } else if (item.category === 'Accessories') {
        item.price = getRandomPrice(150, 300);
    } else if (item.category === 'Dresses') {
        item.price = getRandomPrice(800, 1800); // Guessed a range since it wasn't specified
    } else if (item.category === 'New Arrival') {
        item.price = getRandomPrice(900, 2000); // Guessed a range since it wasn't specified
    }
});

fs.writeFileSync(inventoryFile, JSON.stringify(inventoryData, null, 4));
console.log('Successfully updated product prices based on category constraints.');
