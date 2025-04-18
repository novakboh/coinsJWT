const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());

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

app.get('/getAllCoins', async (req, res) => {
    const coins = await Coin.find();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(coins));
});

app.post('/addCoin', async (req, res) => {
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

app.delete('/deleteCoin', async (req, res) => {
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

app.put('/updatePrice', async (req, res) => {
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

app.get('/getCoinById', async (req, res) => {
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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});