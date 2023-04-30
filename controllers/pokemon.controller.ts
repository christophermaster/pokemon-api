import { Request, Response } from 'express';
import PokemonService from '../services/pokemon.service';
import querySchema from '../validator/pokemon.validator';
import { PdfService } from '../services/pdf.service';
import Pokemon from '../interfaces/pokemon.interface';


export class PokemonController {

  async getAllPokemon(req: Request, res: Response): Promise<void | Response<any, Record<string, any>>> {
    try {
      const { limit, page, search } = req.query;

      const { error, value } = querySchema.validate(req.query, { abortEarly: false });

      if (error) {
        const errorDetails = error.details.map((detail) => detail.message).join(', ');
        return res.status(400).json({ message: errorDetails });
      }

      const pokemonList = await new PokemonService().getAllPokemon(Number(limit), Number(page), String(search));
      return res.status(200).json(pokemonList);

    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }


  async createPokemonPdf(req: Request, res: Response): Promise<void | Response<any, Record<string, any>>> {

    try {
      const name = String(req.body.name).trim();

      if (!name) {
        return res.status(400).json({ error: 'Debes proporcionar el nombre de un Pokemon' });
      }

      const pokemon: Pokemon | any = await new PokemonService().getPokemon(name.toLowerCase());

      // Validar si el pokemon existe
      if (!pokemon) {
        return res.status(404).send({ message: 'El pokemon no existe' });
      }

      // Generar el PDF
      const pdfBuffer = await PdfService.createPdf(pokemon);

      // Enviar el PDF como respuesta
      res.setHeader('Content-Disposition', `attachment; filename=${name}.pdf`);
      res.setHeader('Content-Type', 'application/pdf');
      res.send(pdfBuffer);


    } catch (error: any) {
      return res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
    }
  }



}