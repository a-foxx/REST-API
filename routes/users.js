const Pool = require('pg').pool;
const pool = require('../db')

// get users
const getUsers = (req, res) => {
    // console.log()
    pool.query(
        `SELECT * FROM users`, (err, result) => {
            if(err) {
                console.log(err)
                throw err
            }
            res.status(200).json({

                data: result.rows
            })
        })
}

// post users
const createUser = (req, res) => {
    console.log(req.body)
    const {id, email, firstname, lastname, password} = req.body;
    
    pool.query(
        `INSERT INTO users (id, email, firstname, lastname, password)
        VALUES (
            $1, $2, $3, $4, $5
        ) RETURNING *;`, [id, email, firstname, lastname, password], (err, result) => {
            
            if(err) {
                console.log(err)
                throw err
            }
            
            res.status(200).json({
                message: 'user created',
                data: result.rows[0]
            })
        })
}

// delete users
const deleteUser = (req, res) => {
    const userId = req.params.id;
    pool.query(`DELETE FROM users WHERE id = $1`, [userId], (err, result) => {
        if (err) {
            throw err;
            console.log(err);
        }
        res.json({
            message: 'user deleted'
        })
    })
}

// update users
const updateUser = (req, res) => {
    const {email, password, firstname, lastname} = req.body;
    const id = req.params.id;
    pool.query(`UPDATE users SET email = $1, password = $2, firstname = $3, lastname = $4 WHERE id = $5`, [email, password, firstname, lastname, id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json({
            message: 'user updated'
        })
    })
}


module.exports = {createUser, getUsers, deleteUser, updateUser};