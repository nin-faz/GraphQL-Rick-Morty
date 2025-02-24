import React from "react";
import { useQuery } from "@apollo/client";
import { graphql } from "../gql";


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

const HomePage: React.FC = () => {

  const [page, setPage] = React.useState();
  const [selectedCharacter, setSelectedCharacter] = React.useState<any>(null); // État pour le personnage sélectionné
  const { data } = useQuery(allCharactersDocument, {variables: {page}});

const openModal = (character: any) => {
    setSelectedCharacter(character);
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Rick and Morty GraphQL App</h1>
          <p className="text-gray-700">
            Explore the universe of Rick and Morty using GraphQL.
            <div>
              {data?.characters?.results?.map((character: any) => (
                <div
                  key={character.id}
                  className="flex items-center space-x-4 cursor-pointer"
                  onClick={() => openModal(character)} // Ouvre la modal au clic
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <p>{character.name}</p>
                </div>
              ))}
            </div>
          </p>
        </div>

        {/* Modal pour afficher l'image agrandie */}
        {selectedCharacter && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            onClick={closeModal} // Ferme la modal quand on clique en dehors
          >
            <div
              className="bg-white p-8 rounded shadow-lg max-w-lg w-full"
              onClick={(e) => e.stopPropagation()} // Empêche la fermeture de la modal si on clique à l'intérieur
            >
              <h2 className="text-2xl font-bold mb-4">{selectedCharacter.name}</h2>
              <img
                src={selectedCharacter.image}
                alt={selectedCharacter.name}
                className="w-full h-auto rounded-lg"
              />
              <button
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                onClick={closeModal} // Bouton pour fermer la modal
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

export default HomePage;
