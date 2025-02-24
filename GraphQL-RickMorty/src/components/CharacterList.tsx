import { useState } from "react";
import { graphql } from "../gql";
import { useQuery } from "@apollo/client";
import Loader from "./Loader";
import { toast } from "react-toastify";

const characterDetails = graphql(/* GraphQL */ `
  query characterDetails($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      image
    }
  }
`);

interface Character {
  id: string;
  image: string;
  name: string;
}

const CharacterList = ({ character }: { character: Character }) => {
  const [displayModal, setDisplayModal] = useState(false);

  const { data, loading, error } = useQuery(characterDetails, {
    variables: { id: character.id },
    skip: !displayModal,
  });

  // Vérification d'une erreur ou chargement
  if (error) {
    toast.error("Erreur lors de la récupération des données.");
  }

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-2 text-center transform transition duration-300 hover:scale-105 hover:shadow-lg">
        <div className="relative w-full" style={{ paddingBottom: "145%" }}>
          <button onClick={() => setDisplayModal(true)}>
            <img
              src={character.image}
              alt={character.name}
              className="absolute top-0 left-0 w-full h-full object-center rounded-md"
            />
          </button>
        </div>
        <h3 className="text-lg font-semibold mt-2">{character.name}</h3>
      </div>

      {displayModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-96 relative">
            <button
              onClick={() => setDisplayModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            {loading && <Loader />}
            {!loading && !error && data?.character && (
              <div className="text-center">
                <img
                  src={data.character.image}
                  alt={data.character.name}
                  className="mx-auto w-40 h-40 rounded-full"
                />
                <h2 className="text-xl font-bold mt-4">
                  {data.character.name}
                </h2>
                <p className="text-gray-600">
                  <strong>Status:</strong> {data.character.status}
                </p>
                <p className="text-gray-600">
                  <strong>Species:</strong> {data.character.species}
                </p>
                {data.character.type && (
                  <p className="text-gray-600">
                    <strong>Type:</strong> {data.character.type}
                  </p>
                )}
                <p className="text-gray-600">
                  <strong>Gender:</strong> {data.character.gender}
                </p>
              </div>
            )}
            {error && (
              <div className="text-red-500 text-center">
                <p>
                  Une erreur est survenue lors de la récupération des détails du
                  personnage.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CharacterList;
