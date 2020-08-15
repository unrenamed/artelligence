import express from 'express';

const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {    
    res.json('I\'m working');
});


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

