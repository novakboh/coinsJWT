const http = require('http');
const mongoose = require('mongoose');
 
mongoose.connect('mongodb+srv://admin:admin@cluster0.pznl908.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Connection error:", err));
 
const coinSchema = new mongoose.Schema({
    name: String,
    country: String,
    material: String,
    par: Number,
    year: String,
    price: Number
});
const Coin = mongoose.model('Coin', coinSchema);
const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/getAllCoins') {
        const coins = await Coin.find();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(coins));
    } else if (req.method === 'POST' && req.url === '/addCoin') {
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
    } else if (req.method === 'DELETE' && req.url === '/deleteCoin') {
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
    } else if (req.method === 'POST' && req.url === '/updatePrice') {
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
    } else if (req.method === 'GET' && req.url === '/getCoinById') {
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
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Not found" }));
    }
});
 
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});