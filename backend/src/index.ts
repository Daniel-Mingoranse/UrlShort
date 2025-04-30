import express, { Express } from "express";
import cors from "cors";
import { nanoid } from "nanoid";
import { urlDatabase } from "./urlcontroller";

const app = express()
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1>Servidor rodando</h1>');  
}
);

app.get('/shorten', (req, res) => {
    res.send('<h1>Api On</h1>');  
}
);

app.post('/shorten', (req, res) => {
    console.log(req.body);
    const { originalUrl } = req.body;
    const shortId = nanoid(6);
    urlDatabase[shortId] = originalUrl;
    console.log(shortId);
    res.json({ shortUrl: `https://urlshort-555r.onrender.com/${shortId}` });
}
);



// redirect to original URL
app.get('/:id', (req, res) => {
    const originalUrl = urlDatabase[req.params.id];
    if (originalUrl) {
        res.redirect(originalUrl);
    } else {
        res.status(404).send('URL nao encontrada');
    }
}
);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Removed the conflicting local express function
