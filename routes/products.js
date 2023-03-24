const pool = require('../db')
const express =  require('express');
const router = express.Router();
const app = express();

//get products
const getProducts = (req, res) => {
    pool.query('SELECT * FROM product', (error, result) => {
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
    pool.query(
        `INSERT INTO product (id, name, price, description, imgurl)
        VALUES (
            $1, $2, $3, $4, $5
        ) RETURNING *;`, [id, name, price, description, imgurl], (err, result) => {
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
    pool.query(`DELETE FROM product WHERE id = $1`, [productId], (err, result) => {
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
    const id = req.params.id;
    pool.query(
        `UPDATE product SET name = $1, price = $2, description = $3, imgurl = $4 WHERE id = $5;`, [name, price, description, imgurl, id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json({
            message: 'Product updated'
        })
    } )
}

module.exports = { getProducts, createProduct, deleteProduct, updateProducts };