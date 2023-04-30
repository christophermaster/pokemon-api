import { Router } from 'express';
import { PokemonController } from '../controllers/pokemon.controller';

const router = Router();
const pokemonController = new PokemonController();

router.get('/pokemon', pokemonController.getAllPokemon);
router.post('/pokemon/pdf', pokemonController.createPokemonPdf);


export default router;