const pool = require('../db')

//get orders
const getOrders = (req, res) => {
    pool.query(
        `SELECT * FROM orders`, (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json({
                data: result.rows
            })
        })
}

// post order
const createOrder = (req, res) => {
    const {id, total, status, created, modified, userid} = req.body;
    console.log(req.body);
    pool.query(
        `INSERT INTO orders (id, total, status, created, modified, userid)
        VALUES (
            $1, $2, $3, $4, $5, $6
        ) RETURNING *;`, [id, total, status, created, modified, userid], (err, result) => {
            if (err) {
                throw err;
            }
            res.status(200).json({
                message: 'order created',
                data: result.rows[0]
            })
        }
    )
}

// delete order
const deleteOrder = (req, res) => {
    const orderId = req.params.id;
    pool.query(
        `DELETE FROM orders WHERE id = $1`, [orderId], (err, result) => {
            if (err) {
                throw err;
            }
            res.json({
                message: 'order deleted'
            })
        }
    )
}

// update order
const updateOrder = (req, res) => {
    const {total, status, created, modified, userid} = req.body;
    const id = req.params.id;
    pool.query(
        `UPDATE orders SET total = $1, status = $2, created = $3, modified = $4, userid = $5 WHERE id = $6;`, [total, status, created, modified, userid, id], 
        (err, result) => {
            if (err) {
                throw err;
            }
            res.json({
                message: 'order updated'
            })
        })
}

module.exports = { getOrders, createOrder, deleteOrder, updateOrder }