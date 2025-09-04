const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());

const DATA_FILE = './data.json';

function getProducts() {
    if (!fs.existsSync(DATA_FILE)) return [];
    return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveProducts(products) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2));
}

app.get('/products', (req, res) => res.json(getProducts()));

app.post('/products', (req, res) => {
    const products = getProducts();
    const newProduct = { id: Date.now(), ...req.body };
    products.push(newProduct);
    saveProducts(products);
    res.json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const products = getProducts();
    const index = products.findIndex(p => p.id == req.params.id);
    if (index === -1) return res.status(404).send('Produto não encontrado');
    products[index] = { id: products[index].id, ...req.body };
    saveProducts(products);
    res.json(products[index]);
});

app.delete('/products/:id', (req, res) => {
    let products = getProducts();
    products = products.filter(p => p.id != req.params.id);
    saveProducts(products);
    res.send('Produto deletado');
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
