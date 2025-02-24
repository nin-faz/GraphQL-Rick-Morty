import { useEffect, useState } from "react";
import Loader from "../components/Loader";

const allCharactersDocument = graphql(/* GraphQL */ `
  query allCharactersQuery($page: Int) {
    characters (page: $page) {
      results {
        id
        name
        image
      }
    }
  }
`)        

const HomePage = () => {
  useEffect(() => {
    document.title = "Accueil";
  }, []);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);

  const [loading, setLoading] = useState(false);

  // const {
  //   movies = [],
  //   totalPages,
  //   loading,
  //   error,
  // } = useMovies(searchTerm, filter, page);

  // if (error) {
  //   toast.error(error);
  // }
  
  const { data } = useQuery(allCharactersDocument, {variables: {page}});

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the Rick and Morty GraphQL App
        </h1>
        <p className="text-gray-700">
          Explore the universe of Rick and Morty using GraphQL.
          {data?.characters?.results?.map((character: any) => (
            <div key={character.id} className="flex items-center space-x-4">
              <img
                src={character.image}
                alt={character.name}
                className="w-12 h-12 rounded-full"
              />
              <p>{character.name}</p>
            </div>
          ))}
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          <p> perso ici</p>
          {/* {characters?.length > 0 ? (
            characters.map((character) => (
              <CharacterList key={character.id} character={character} />
            ))
          ) : (
            <p className="text-center col-span-full text-white">
              Aucun personnage trouvé
            </p>
          ) 
          }*/}
        </div>
      )}

      <div className="flex justify-center mt-12 space-x-32">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className={`px-4 py-2 rounded transition-colors duration-300 ${
            page === 1
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : "bg-yellow-500 text-gray-900 hover:bg-yellow-600"
          }`}
        >
          Précédent
        </button>

        <p className="text-black text-lg">
          Page {""}
          {page} {""}
          sur {""}
          {totalPages}
        </p>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page >= totalPages}
          className={`px-4 py-2 rounded transition-colors duration-300 ${
            page >= totalPages
              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
              : "bg-yellow-500 text-gray-900 hover:bg-yellow-600"
          }`}
        >
          Suivant
        </button>
      </div>
    </div>
  );
};

export default HomePage;
