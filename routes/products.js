const pool = require('../db')
const express =  require('express');
const router = express.Router();
const app = express();

//get products
const getProducts = (req, res) => {
    pool.query('SELECT * FROM products', (error, result) => {
      if (error) {
        console.log(error)
        throw error;
      }
    res.send(result.rows);
    
    })
}

//post products
const createProduct = (req, res) => {
    console.log(req.body);
    const {name, price, description, img_url} = req.body;
    pool.query(
        `INSERT INTO products (name, price, description, img_url)
        VALUES (
            $1, $2, $3, $4
        ) RETURNING *;`, [name, price, description, img_url], (err, result) => {
            if (err) {
                console.log(err)
                throw err
            }
            res.status(200).json({
                message: 'product created',
                data: result.rows[0]
            })
        })
    
}

/*delete products*/
const deleteProduct = (req, res) => {
    const productId = req.params.id;
    pool.query(`DELETE FROM products WHERE product_id = $1`, [productId], (err, result) => {
        if (err) {
            throw err;
        }
        res.json({
            message: 'product deleted'
        })
    })
}

/*update*/
const updateProducts = (req, res) => {
    const {name, price, description, imgurl} = req.body
    const productId = req.params.id;
    pool.query(
        `UPDATE products SET name = $1, price = $2, description = $3, img_url = $4 WHERE product_id = $5;`, [name, price, description, imgurl, productId], (err, result) => {
        if (err) {
            throw err;
        }
        res.json({
            message: 'Product updated'
        })
    } )
}

module.exports = { getProducts, createProduct, deleteProduct, updateProducts };