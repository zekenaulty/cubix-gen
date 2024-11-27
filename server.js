// server.js
import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import cors from 'cors';

const app = express();
const port = 3000;

// Enable CORS for all routes (adjust as needed)
app.use(cors());

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Helper function to get pixel data
const getPixelColors = async (imageBuffer) => {
    const { data, info } = await sharp(imageBuffer)
        .raw()
        .toBuffer({ resolveWithObject: true });

    const pixelColors = [];
    for (let i = 0; i < data.length; i += info.channels) {
        const [r, g, b, a] = data.slice(i, i + info.channels);
        pixelColors.push({ r, g, b, a });
    }

    return { pixelColors, width: info.width, height: info.height };
};

// API endpoint to upload and process the image
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const { scale } = req.query; // Expected values: 0.25, 0.5, 0.75
        const scaleFactor = parseFloat(scale) || 0.5; // Default to 50%

        // Resize image
        const image = sharp(req.file.buffer);
        const metadata = await image.metadata();

        const resizedImageBuffer = await image
            .resize({
                width: Math.round(metadata.width * scaleFactor),
                height: Math.round(metadata.height * scaleFactor),
            })
            .toBuffer();

        // Get pixel colors
        const { pixelColors, width, height } = await getPixelColors(resizedImageBuffer);
        console.log(JSON.stringify({ pixelColors, width, height }));
        res.json({ pixelColors, width, height });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).json({ error: 'Error processing image' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${171717}`);
});
