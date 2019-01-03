const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.json('Hi I\'m online now');
})

app.listen(PORT, () => {
    console.log(`Serving on PORT: ${PORT}`);
});