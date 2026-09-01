const fs = require('fs');
const path = require('path');

const images = [
  'https://i.imgur.com/QkIa5tT.jpeg',
  'https://i.imgur.com/1twoaDy.jpeg',
  'https://i.imgur.com/cHddUCu.jpeg',
  'https://i.imgur.com/R2PN9Wq.jpeg',
  'https://i.imgur.com/ZKGofuB.jpeg',
  'https://i.imgur.com/mp3rUty.jpeg',
  'https://i.imgur.com/9LFjwpI.jpeg',
  'https://i.imgur.com/R3iobJA.jpeg',
  'https://i.imgur.com/wXuQ7bm.jpeg',
  'https://i.imgur.com/cBuLvBi.jpeg',
  'https://i.imgur.com/KeqG6r4.jpeg',
  'https://i.imgur.com/UsFIvYs.jpeg',
  'https://i.imgur.com/eGOUveI.jpeg',
  'https://i.imgur.com/axsyGpD.jpeg',
  'https://i.imgur.com/Y54Bt8J.jpeg',
  'https://i.imgur.com/9DqEOV5.jpeg',
  'https://i.imgur.com/ZANVnHE.jpeg',
  'https://i.imgur.com/yVeIeDa.jpeg',
  'https://i.imgur.com/SolkFEB.jpeg',
  'https://i.imgur.com/keVCVIa.jpeg',
  'https://i.imgur.com/w3Y8NwQ.jpeg',
  'https://i.imgur.com/OKn1KFI.jpeg',
  'https://i.imgur.com/ItHcq7o.jpeg',
  'https://i.imgur.com/YaSqa06.jpeg',
  'https://i.imgur.com/yb9UQKL.jpeg',
  'https://i.imgur.com/LGk9Jn2.jpeg',
  'https://i.imgur.com/Qphac99.jpeg',
  'https://i.imgur.com/DMQHGA0.jpeg',
  'https://i.imgur.com/NWIJKUj.jpeg',
  'https://i.imgur.com/6wkyyIN.jpeg'
];

const categories = ["Tops", "Bottoms", "Dresses", "Accessories", "New Arrival"];

const descriptions = {
  "Tops": "A classic everyday top designed for effortless elegance. The breathable fabric ensures all-day comfort while maintaining a chic, polished look. Essential for your wardrobe.",
  "Bottoms": "Versatile bottoms offering both support and flexibility. Designed with a flattering silhouette that curves with you. A must-have for every season.",
  "Dresses": "Flowing dress designed for effortless elegance. Features a relaxed silhouette. Perfect for warm days and vacation styling. Comfortable and chic.",
  "Accessories": "Timeless accessory that adds a touch of sophistication to any outfit. Lightweight and perfect for daily wear. The ideal finishing touch for any look.",
  "New Arrival": "The latest addition to our collection. Combining modern silhouettes with premium fabrics. Get this exclusive piece and stand out from the crowd."
};

const names = {
  "Tops": ["Classic White Tee", "Silk Camisole", "Ribbed Knit Sweater", "Oversized Poplin Shirt", "Off-the-Shoulder Blouse", "Cropped Cardigan"],
  "Bottoms": ["High-Waist Denim Jeans", "Wide Leg Tailored Trousers", "Satin Slip Skirt", "Linen Blend Shorts", "Faux Leather Leggings", "Pleated Midi Skirt"],
  "Dresses": ["Linen Blend Dress", "Floral Maxi Dress", "Ribbed Midi Knit Dress", "Satin Wrap Dress", "Halter Neck Mini Dress", "Long Sleeve Shift Dress"],
  "Accessories": ["Gold Hoop Earrings", "Oversized Sunglasses", "Layered Chain Necklace", "Leather Crossbody Bag", "Silk Hair Scarf", "Chunky Bracelets"],
  "New Arrival": ["Tweed Cropped Blazer", "Asymmetric Hem Skirt", "Velvet Evening Gown", "Cashmere Blend Poncho", "Distressed Denim Jacket", "Sequined Party Dress"]
};

// Generate exactly 6 per category
const inventory = [];
let idCounter = 1;
let imageIndex = 0;

for (const cat of categories) {
  for (let i = 0; i < 6; i++) {
    inventory.push({
      id: idCounter.toString(),
      name: names[cat][i],
      price: Math.floor(Math.random() * (7990 - 1290 + 1)) + 1290,
      category: cat,
      image: images[imageIndex % images.length],
      description: descriptions[cat],
      colors: ["Black", "White", "Beige"]
    });
    idCounter++;
    imageIndex++;
  }
}

// Preserve the exact structure of the original file, just replace it entirely.
const inventoryFilePath = path.join(__dirname, 'data', 'inventory.json');
fs.writeFileSync(inventoryFilePath, JSON.stringify(inventory, null, 4));

console.log('Successfully generated inventory with 30 items.');
