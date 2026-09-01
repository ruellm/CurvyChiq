
import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';

async function migrate() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
    });

    console.log('Connected to MySQL.');

    await connection.query('CREATE DATABASE IF NOT EXISTS curvychiq');
    await connection.query('USE curvychiq');

    console.log('Ensuring tables exist...');
    
    await connection.query(`
        CREATE TABLE IF NOT EXISTS products (
            id VARCHAR(50) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            price INT NOT NULL,
            category VARCHAR(100),
            image VARCHAR(255),
            description TEXT,
            colors TEXT, 
            colorImages LONGTEXT,
            rating VARCHAR(10),
            reviewCount INT DEFAULT 0
        )
    `);

    await connection.query(`
        CREATE TABLE IF NOT EXISTS reviews (
            id VARCHAR(50) PRIMARY KEY,
            product_id VARCHAR(50),
            reviewer VARCHAR(255),
            rating INT,
            date VARCHAR(50),
            comment TEXT,
            sizePurchased VARCHAR(20),
            FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
        )
    `);

    console.log('Loading inventory.json...');
    const inventoryPath = path.join(process.cwd(), 'data', 'inventory.json');
    const data = await fs.readFile(inventoryPath, 'utf-8');
    const products = JSON.parse(data);

    console.log(`Migrating ${products.length} products...`);

    for (const p of products) {
        // Insert product
        await connection.query(
            'INSERT IGNORE INTO products (id, name, price, category, image, description, colors, colorImages, rating, reviewCount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [
                p.id,
                p.name,
                p.price,
                p.category,
                p.image,
                p.description || '',
                JSON.stringify(p.colors || []),
                JSON.stringify(p.colorImages || {}),
                p.rating || '0',
                p.reviewCount || 0
            ]
        );

        // Insert reviews if any
        if (p.reviews && p.reviews.length > 0) {
            for (const r of p.reviews) {
                await connection.query(
                    'INSERT IGNORE INTO reviews (id, product_id, reviewer, rating, date, comment, sizePurchased) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [
                        r.id,
                        p.id,
                        r.reviewer,
                        r.rating,
                        r.date,
                        r.comment,
                        r.sizePurchased || ''
                    ]
                );
            }
        }
    }

    console.log('Migration complete!');
    await connection.end();
}

migrate().catch(console.error);
