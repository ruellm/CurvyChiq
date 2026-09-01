import fs from 'fs';
import path from 'path';

const inventoryPath = 'c:/Users/chiqu/capstone/curvychiq/data/inventory.json';
const inventory = JSON.parse(fs.readFileSync(inventoryPath, 'utf8'));

inventory.forEach(product => {
    if (!product.colors) return;

    // Get the base filename without extension
    // e.g. "/generated/white tee.jpeg" -> "white tee"
    const baseName = path.basename(product.image, path.extname(product.image));
    
    // Clean base name for consistent matching (remove spaces)
    const cleanBase = baseName.replace(/ /g, '_').toLowerCase();

    const colorImages = {};

    product.colors.forEach(color => {
        const colorLower = color.toLowerCase();
        
        // Define 4 angles for each color
        colorImages[color] = [
            `/generated/${cleanBase}_${colorLower}.jpeg`,   // Primary angle
            `/generated/${cleanBase}_${colorLower}_2.jpeg`, // Angle 2
            `/generated/${cleanBase}_${colorLower}_3.jpeg`, // Angle 3
            `/generated/${cleanBase}_${colorLower}_4.jpeg`  // Angle 4
        ];
    });

    product.colorImages = colorImages;
});

fs.writeFileSync(inventoryPath, JSON.stringify(inventory, null, 4));
console.log('Automated colorImages mapping for all items in inventory.json.');
