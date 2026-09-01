const fs = require('fs');
const path = require('path');

const inventoryFile = path.join(__dirname, 'data', 'inventory.json');
const inventoryData = JSON.parse(fs.readFileSync(inventoryFile, 'utf8'));

const mockReviewers = ["Sarah M.", "Jessica T.", "Amanda R.", "Chloe S.", "Emily W.", "Nina K.", "Jasmine L."];
const mockComments = [
    "Love the fit! Super comfortable and stylish, perfect for daily wear.",
    "Material feels very premium. Highly recommend for the price.",
    "True to size, the color is exactly like the picture. Very flattering on my curves!",
    "My favorite piece in my closet right now. It washes really well and hasn't shrunk.",
    "A bit snug initially but stretched to fit perfectly. Great quality overall.",
    "I've gotten so many compliments on this piece! It makes me feel so confident.",
    "Beautiful design and very fast shipping. Will definitely buy from CurvyChiQ again!"
];

function getRandomItems(arr, count) {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

inventoryData.forEach(item => {
    // Determine random number of reviews between 2 and 5
    const reviewCount = Math.floor(Math.random() * 4) + 2;
    const selectedComments = getRandomItems(mockComments, reviewCount);
    const selectedReviewers = getRandomItems(mockReviewers, reviewCount);
    
    item.rating = (Math.random() * 0.5 + 4.5).toFixed(1); // Random rating between 4.5 and 5.0
    item.reviewCount = reviewCount * 12 + Math.floor(Math.random() * 10); // Fake a larger number of total reviews
    
    item.reviews = selectedReviewers.map((reviewer, index) => ({
        id: Math.random().toString(36).substr(2, 9),
        reviewer,
        rating: Math.floor(Math.random() * 2) + 4, // 4 or 5 stars
        date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'}),
        comment: selectedComments[index],
        sizePurchased: ['S', 'M', 'L', 'XL', 'XXL'][Math.floor(Math.random() * 5)]
    }));
});

fs.writeFileSync(inventoryFile, JSON.stringify(inventoryData, null, 4));
console.log('Successfully injected mock Shein-style reviews into all inventory items.');
