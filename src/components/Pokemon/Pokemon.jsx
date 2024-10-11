 


function Pokemon({ name, image, }) {
    return (
      
         <div className="flex flex-col items-center p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition-transform duration-300">
        <div className="text-lg font-semibold text-gray-800 mb-2 hover:text-indigo-600 transition-colors duration-300">
          {name}
        </div>
        <div className="w-40 h-40 flex justify-center items-center">
          <img className="w-full h-full object-contain" src={image} alt={name}   />
        </div>
      </div>
      
    );
  }
  
  export default Pokemon;
  