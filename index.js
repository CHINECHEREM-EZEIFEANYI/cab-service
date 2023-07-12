
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;

app.use(express.json());
app.use(bodyParser.json())
app.get("/", (req, res) => {
    res.send('Hello World!');
});


app.listen(port, () => {
    console.log(`app running on port ${port}`)
})

