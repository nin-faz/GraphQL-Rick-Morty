import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import CharacterList from "../components/CharacterList";
import { useQuery } from "@apollo/client";
import { graphql } from "../gql";
import { toast } from "react-toastify";

const allCharactersDocument = graphql(/* GraphQL */ `
  query allCharactersQuery($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
      }
      info {
        pages
      }
    }
  }
`);

const HomePage = () => {
  useEffect(() => {
    document.title = "Accueil";
  }, []);

  const [page, setPage] = useState(1);

  const { data, error, loading } = useQuery(allCharactersDocument, {
    variables: { page },
  });

  const totalPages = data?.characters?.info?.pages ?? 1;

  if (error) {
    toast.error("Erreur");
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 via-blue-600 to-indigo-500 flex flex-col items-center justify-center">
      <div className="bg-white p-8 bg-opacity-10 rounded-lg shadow-2xl backdrop-blur-md text-center">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          Welcome to the Rick and Morty GraphQL App
        </h1>
        <p className="text-gray-300">
          Explore the universe of Rick and Morty using GraphQL.
        </p>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {data?.characters?.results?.map((character: any) => (
            <CharacterList key={character.id} character={character} />
          ))}
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
