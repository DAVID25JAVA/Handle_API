import { Route , Routes } from "react-router-dom"
import ImageData from "../components/Image/ImageData"
import PokemonDetails from "../components/PokemonDetails/PokemonDetails"
 

 

function  RouterDom() {
  return (
    <Routes>
      <Route path="/" element={<ImageData />} />
      <Route path="/pokemondetails" element={<PokemonDetails/>} />
     </Routes>
  )
}

export default RouterDom