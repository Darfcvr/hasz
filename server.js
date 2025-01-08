const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve static files from the "img" folder
app.use('/img', express.static(path.join(__dirname, 'img')));

// Endpoint to get the list of images
app.get('/images', (req, res) => {
    const imgDir = path.join(__dirname, 'img');
    fs.readdir(imgDir, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory');
        }
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        res.json(imageFiles);
    });
});

// Serve the static HTML file
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});