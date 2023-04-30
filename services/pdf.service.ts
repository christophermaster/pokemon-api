import htmlToPdf from "html-pdf";
import Pokemon from '../interfaces/pokemon.interface';

export class PdfService {

  static createPdf(pokemon: Pokemon): Promise<Buffer> {

    const html = `<html>
      <head>
        <style>
          #bg{
            background-color: #E7B24E;
            padding:350px
          }
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          .name {
            font-size: 50px;
            font-weight: bold;
            text-transform: capitalize;
            margin-bottom: 10px;
          }
          .image {
            margin-bottom: 10px;
          }
          .attribute {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            font-size: 20px;
          }
          .attribute label {
            font-weight: bold;
            margin-right: 10px;
          }
          .attribute span {
            text-transform: capitalize;
          }
        </style>
      </head>
      <body id = "bg">
        <div class="container" style="text-align: center; width: 100%">
          <div class="name">${pokemon.name}</div>
          <div class="attribute">
            <span>#${pokemon.id}</span>
          </div>
          <img class="image" src="${pokemon.sprites.front_default}" alt="${pokemon.name} image">
          <div class="attribute">
            <label>Type:</label>
            <span>${pokemon.types}</span>
          </div>

          <div class="attribute">
            <label>Abilities:</label>
            <span>${pokemon.abilities}</span>
          </div>

          <div class="attribute">
            <label>Height:</label>
            <span>${pokemon.height} cm</span>
          </div>

          <div class="attribute">
            <label>Weight:</label>
            <span>${pokemon.weight} kg</span>
          </div>
          <div class="attribute">
            <label>Attack:</label>
            <span>${pokemon.stats[4].base_stat}</span>
          </div>
          <div class="attribute">
            <label>Defense:</label>
            <span>${pokemon.stats[1].base_stat}</span>
          </div>
          <div class="attribute">
            <label>Speed:</label>
            <span>${pokemon.stats[0].base_stat}</span>
          </div>

        </div>
      </body>
    </html>`;

    return new Promise<Buffer>((resolve, reject) => {
      const options: any = {
        format: 'Letter',
        type: 'pdf',

      };

      htmlToPdf.create(html, options).toBuffer((err: any, buffer: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(buffer);
        }
      });
    });

  }
}