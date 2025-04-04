const http = require('http');
const mongoose = require('mongoose');
 
mongoose.connect('mongodb+srv://admin:admin@cluster0.pznl908.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Connection error:", err));

const server = http.createServer(async (req, res) => {
});
 
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});