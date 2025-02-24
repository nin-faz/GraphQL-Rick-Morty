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

 const { data } = useQuery(allCharactersDocument, {variables: {page}});

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
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
    </div>
  );
};

export default HomePage;
