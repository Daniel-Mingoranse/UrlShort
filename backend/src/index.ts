import express, { Express } from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import { urlDatabase } from "./urlcontroller";

const app = express()
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Servidor rodando porta 5000</h1>');
}
);

app.post('/shorten', (req, res) => {
    console.log(req.body);
    const { originalUrl } = req.body;
    const shortId = nanoid(6);
    urlDatabase[shortId] = originalUrl;
    console.log(shortId);
    res.json({ shortUrl: `http://localhost:5000/${shortId}` });
}
);


// redirect to original URL
app.get('/:id', (req, res) => {
    const originalUrl = urlDatabase[req.params.id];
    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).send('URL not found');
    }
}
);


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});

// Removed the conflicting local express function
