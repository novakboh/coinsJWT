const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Coin = require('../models/coin');

router.get('/', async (req, res) => {
    const coins = await Coin.find();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(coins));
});

router.post('/', verifyToken, async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        try {
            const { name, country, material, par, year, price } = JSON.parse(body);
            const newCoin = new Coin({ name, country, material, par, year, price });
            await newCoin.save();
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Coin added", coin: newCoin }));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Invalid data format" }));
        }
    });
}); 

router.delete('/:id', verifyToken, async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        try {
            const { id } = JSON.parse(body);
            await Coin.findByIdAndDelete(id);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Coin deleted" }));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Invalid data format" }));
        }
    });
}); 

router.put('/:id', verifyToken, async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        try {
            const { id, price } = JSON.parse(body);
            await Coin.findByIdAndUpdate(id, { price });
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Price updated" }));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Invalid data format" }));
        }
    });
}); 

router.get('/:id', async (req, res) => {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', async () => {
        try {
            const { id } = JSON.parse(body);
            const coin = await Coin.findById(id);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ coin }));
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Invalid data format" }));
        }
    });
});

module.exports = router;