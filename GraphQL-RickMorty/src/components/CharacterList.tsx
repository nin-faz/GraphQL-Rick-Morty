import { useState } from "react";
import Modal from "./Modal";

interface Character {
  image: string;
  name: string;
}

const CharacterList = ({ character }: { character: Character }) => {
  const [displayModal, setDisplayModal] = useState(false);

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
        <Modal onClose={() => setDisplayModal(false)}>
          <h2 className="text-xl font-bold">{character.name}</h2>
          <p>Détails du personnage...</p>
        </Modal>
      )}
    </>
  );
};

export default CharacterList;
