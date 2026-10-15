import { useState, useEffect } from 'react' //useState crea memoria en el componente, useEffect para ejecutar algo cuando el componente aparece
import './App.css' //se importa el css
import { Button, Container } from 'react-bootstrap' //se importa el componente Button y Container de react-bootstrap

function App() { //se crea el componente App, la cual react llama para "dibujar" en la pantalla
  const [pokemon, setPokemon] = useState([]) //se crea el estado pokemon (memoria) y parte vacío, setPokemon es la función que permite cambiar el estado pokemon
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null) //se crea el estado pokemonSeleccionado (función, al pokemon al cual se le hace click), setPokemonSeleccionado para cambiarlo y se inicializa como null

  const getAllPokemones = async () => { //funcion asincrona para obtener todos los pokemones de la api
    const response = await fetch( //await solo funciona dentro de async, responde guarda la respuesta del servidor
      'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'
    )

    const data = await response.json() //await para esperar a que la respuesta se convierta en json, data guarda el json
    setPokemon(data.results) //se cambia el estado pokemon con los resultados de la api
    console.log(data.results) //se imprime en la consola del navegador los resultados
  }

  const getPokemon = async (pokemon) => { //funcion asincrona para obtener un pokemon en especifico, recibe como parametro el pokemon al cual se le hace click
    const response = await fetch(pokemon.url) //await para esperar a que la respuesta del servidor llegue, pokemon.url es la url del pokemon al cual se le hace click
    const data = await response.json() //await para esperar a que la respuesta se convierta en json, data guarda el json

    setPokemonSeleccionado(data)   // se cambia el estado pokemonSeleccionado con los datos del pokemon al cual se le hace click
    console.log(data) //se imprime en la consola del navegador los datos del pokemon al cual se le hace click
  }

  useEffect(() => { //useEffect para ejecutar algo cuando el componente aparece, en este caso se ejecuta la funcion getAllPokemones
    getAllPokemones() 
  }, [])//el segundo parametro es un array vacio, lo que significa que solo se ejecuta una vez cuando el componente aparece

  return ( //se retorna el html que se va a dibujar en la pantalla
    <Container> 
      <h2>Pokemon</h2>
      {pokemon.map((pokemon) => ( //se recorre el estado pokemon (array) y se crea un boton por cada pokemon, pokemon es el parametro que representa cada elemento del array
        <Button //se crea un boton para cada pokemon
          key={pokemon.name} //key es un atributo que ayuda a react a identificar cada elemento del array, en este caso se usa el nombre del pokemon
          className="m-2" 
          onClick={() => getPokemon(pokemon)} //onClick es un evento que se ejecuta cuando se hace click en el boton, en este caso se ejecuta la funcion getPokemon por pokemon
        > 
        
          {pokemon.name}  
        </Button> 
      ))}
    </Container>
  )
}

export default App //se exporta el componente App para que pueda ser usado en otros archivos