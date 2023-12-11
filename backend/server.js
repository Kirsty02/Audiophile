const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const app = express();

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'audiophile_db',
  password: 'Iona12345',
  port: 5432,
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '..', 'frontend/dist')));
app.use(express.json());

// API Endpoint to retrieve products by category with images
app.get('/products/:category', async (req, res) => {
  try {
    const category = req.params.category;

    // Fetch products for the given category
    const productResults = await pool.query(`
      SELECT * FROM Product WHERE category = $1
    `, [category]);

    const products = productResults.rows;

    // Get all images for these products in one go to reduce database calls
    const imageResults = await pool.query(`
      SELECT * FROM ProductImages WHERE product_id = ANY($1)
    `, [products.map(p => p.product_id)]);

    // Convert the image results to a map for easy lookup
    const imageMap = imageResults.rows.reduce((map, image) => {
      if (!map[image.product_id]) {
        map[image.product_id] = {};
      }
      map[image.product_id][image.image_type] = image.image_url;
      return map;
    }, {});

    // Combine the products and images
    const productsWithImages = products.map(product => ({
      ...product,
      images: imageMap[product.product_id] || {}
    }));

    res.json(productsWithImages);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// The "catchall" handler: send back index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend/dist/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
