import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">
          Welcome to the Rick and Morty GraphQL App
        </h1>
        <p className="text-gray-700">
          Explore the universe of Rick and Morty using GraphQL.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
