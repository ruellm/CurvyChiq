const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\chiqu\\.gemini\\antigravity\\brain\\cde828bd-cd13-4950-9285-105188587e6e';
const destDir = path.join(__dirname, 'public', 'generated');

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

// Ensure the local images map matches your latest generated file names exactly
const fileMap = {
  "Tops": "plus_top_1773806870130.png",
  "Bottoms": "plus_bottom_1773806885607.png",
  "Dresses": "plus_dress_1773806957456.png",
  "Accessories": "plus_accessory_1773806971398.png",
  "New Arrival": "plus_newarrival_1773807028771.png"
};

// Copy files over
for (const [cat, filename] of Object.entries(fileMap)) {
  const src = path.join(srcDir, filename);
  const dest = path.join(destDir, filename);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
  } else {
    console.error(`Missing file: ${src}`);
  }
}

// Update inventory
const inventoryFilePath = path.join(__dirname, 'data', 'inventory.json');
const inventoryData = JSON.parse(fs.readFileSync(inventoryFilePath, 'utf-8'));

for (let i = 0; i < inventoryData.length; i++) {
  const item = inventoryData[i];
  if (fileMap[item.category]) {
    item.image = '/generated/' + fileMap[item.category];
  }
}

fs.writeFileSync(inventoryFilePath, JSON.stringify(inventoryData, null, 4));
console.log('Successfully copied images and updated inventory to strictly use plus size clothing images.');
