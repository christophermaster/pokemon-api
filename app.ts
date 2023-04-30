
import express from 'express';
import pokemonRouter from './routes/pokemon.router';
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', pokemonRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});