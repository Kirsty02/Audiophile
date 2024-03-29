require('dotenv').config();
const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(stripeSecretKey); 

const app = express();

// Configure PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
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

    // Convert the image results to a map
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

// Second API Endpoint to get a single product's details
app.get('/product/:slug', async (req, res) => {
  try {
    const { slug } = req.params;

    // Fetch the main product details
    const productResult = await pool.query('SELECT * FROM Product WHERE slug = $1', [slug]);
    const product = productResult.rows[0];

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Fetch related images, includes, gallery, and others
    const imagesResult = await pool.query('SELECT * FROM ProductImages WHERE product_id = $1', [product.product_id]);
    const includesResult = await pool.query('SELECT * FROM ProductIncludes WHERE product_id = $1', [product.product_id]);
    const galleryResult = await pool.query('SELECT * FROM ProductGallery WHERE product_id = $1', [product.product_id]);
    const othersResult = await pool.query('SELECT * FROM ProductOthers WHERE product_id = $1', [product.product_id]);

    // Transform the results into a structured object
    const productDetails = {
      ...product,
      images: imagesResult.rows,
      includes: includesResult.rows,
      gallery: galleryResult.rows,
      others: othersResult.rows.map(other => ({
        ...other,
        mobile: other.mobile,
        tablet: other.tablet,
        desktop: other.desktop
      }))
    };

    res.json(productDetails);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body; // The total amount to charge the customer

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'gbp', 
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: error.message });
  }
});



// The catchall handler
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend/dist/index.html'));
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
