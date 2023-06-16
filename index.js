const axios = require('axios');
const chalk = require('chalk');
const fs = require('fs');

// Función asincrónica para obtener los datos de un Pokémon
async function fetchPokemon(numero) {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${numero}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos del Pokémon:', error);
    throw error;
  }
}

// Función para formatear los datos del Pokémon
function formatPokemon(nombre, tipo1, tipo2) {
  if (!nombre || !tipo1) {
    throw new Error('Datos de Pokémon incompletos');
  }

  if (tipo2) {
    return `El Pokémon ${chalk.yellow(nombre)} es de tipo ${chalk.yellow(tipo1)} y ${chalk.yellow(tipo2)}`;
  } else {
    return `El Pokémon ${chalk.yellow(nombre)} es de tipo ${chalk.yellow(tipo1)}`;
  }
}

// Obtener nombre y tipos del Pokémon con el número proporcionado
async function obtenerNombreYTiposPokemon(numero) {
  if (numero < 1 || numero > 898) {
    throw new Error('Número de Pokémon inválido');
  }

  try {
    const pokemon = await fetchPokemon(numero);
    const nombre = pokemon.name;
    const tipos = pokemon.types.map(type => type.type.name);

    const resultado = formatPokemon(nombre, tipos[0], tipos[1]);
    console.log(resultado);
  } catch (error) {
    console.error(error.message);
  }
}

// Llamar a obtenerNombreYTiposPokemon con el número de Pokémon 25
obtenerNombreYTiposPokemon(25);

// Leer contenido de un archivo llamado "datos.txt"
function leerArchivo() {
  const nombreArchivo = 'datos.txt';

  try {
    const contenido = fs.readFileSync(nombreArchivo, 'utf-8');
    console.log('Contenido del archivo:');
    console.log(contenido);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`El archivo '${nombreArchivo}' no existe`);
    } else {
      throw new Error('Error al leer el archivo');
    }
  }
}

try {
  leerArchivo();
} catch (error) {
  console.error(error.message);
}

// Escribir mensaje en un archivo llamado "resultados.txt"
function writeToFile(message) {
  const fileName = 'resultados.txt';

  try {
    fs.writeFileSync(fileName, message);
    console.log(`Mensaje escrito en el archivo '${fileName}'`);
  } catch (error) {
    throw new Error(`Error al escribir en el archivo '${fileName}'`);
  }
}

try {
  const message = 'Examen finalizado';
  writeToFile(message);
} catch (error) {
  console.error(error.message);
}