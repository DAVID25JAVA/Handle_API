import { useEffect, useState } from "react";
import axios from "axios";
import Pokemon from "../Pokemon/Pokemon";

function ImageData() {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [pokedxUrl, setPokedxUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [searchTerm, setSearchTerm] = useState("");

  const PokemonImage = async () => {
    setIsLoading(true);
    const response = await axios.get(pokedxUrl);
    const imageData = response.data.results;
    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);
    const imgList = imageData.map((image) => axios.get(image.url));
    const imgReponse = await axios.all(imgList);
    const imageResult = imgReponse.map((e) => {
      const res = e.data;
      return {
        id: res.id,
        name: res.name,
        image: res.sprites.other
          ? res.sprites.other.dream_world.front_default
          : res.sprites,
      };
    });
    setPokemonList(imageResult);
    setIsLoading(false);
  };

  useEffect(() => {
    PokemonImage();
  }, [pokedxUrl]);

  // Function to handle the search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter Pokémon based on search term
  const filteredPokemon = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <p className="text-2xl font-bold text-center mb-6">Pokedex Image</p>

      {/* Search Input */}
      <div className="mb-4 flex justify-center">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search Pokémon"
          className="border px-4 py-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="cursor-pointer grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading ? (
          <p className="flex justify-center items-center font-serif font-semibold text-2xl">
            Loading....
          </p>
        ) : (
          filteredPokemon.map((img) => (
            <Pokemon
              key={img.id}
              name={img.name}
              image={img.image}
              id={img.id}
            />
          ))
        )}
      </div>

      <div className="flex justify-center mt-4 gap-3">
        <button
          className="border outline-none font-serif font-semibold 
              px-4 py-2 rounded shadow"
          disabled={prevUrl == null}
          onClick={() => setPokedxUrl(prevUrl)}
        >
          Prev
        </button>
        <button
          className="border outline-none font-serif font-semibold 
              px-4 py-2 rounded shadow"
          disabled={nextUrl == null}
          onClick={() => setPokedxUrl(nextUrl)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ImageData;
