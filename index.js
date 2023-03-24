const express = require('express');
const cors = require('cors')
const app = express();
const port = 3000;
const user = require('./routes/users')
const products = require('./routes/products')
const orders = require('./routes/orders')


app.use(cors())
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true
  })
)


app.get('/', (req, res) => {
  res.send('Hello World');
  
});


/*users*/
app.get('/users', user.getUsers)
app.post('/adduser', user.createUser)
app.delete('/deleteuser/:id', user.deleteUser)
app.put('/updateuser/:id', user.updateUser)

/*products*/
app.get('/products', products.getProducts)
app.post('/addproduct', products.createProduct)
app.delete('/deleteproduct/:id', products.deleteProduct)
app.put('/updateproduct/:id', products.updateProducts)

// orders
app.get('/orders', orders.getOrders)
app.post('/createorder', orders.createOrder)
app.delete('/deleteorder/:id', orders.deleteOrder)
app.put('/updateorder/:id', orders.updateOrder)

/*cart*/
// app.get('/cart')


app.listen(port, () => console.log(`Example backend API listening on port ${port}!`))
