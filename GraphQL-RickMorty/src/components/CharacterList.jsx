import { useNavigate } from "react-router-dom";

const CharacterList = ({ character }) => {
  const navigate = useNavigate();

  const [displayModal, setDisplayModal] = useState(false);

  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-2 text-center                  transform transition duration-300 hover:scale-105 hover:shadow-lg">
        <div className="relative w-full" style={{ paddingBottom: "145%" }}>
          <button onClick={() => navigate(`/character/${character.id}`)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${character.poster_path}`}
              alt={character.title}
              className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-md"
            />
          </button>
        </div>
        <h3 className="text-lg font-semibold mt-2">{character.title}</h3>
      </div>

      {displayModal && (
        <Modal onClose={() => setDisplayModal(false)}>
          <h2 className="text-xl font-bold">{character.title}</h2>
          <p>Détails du personnage...</p>
        </Modal>
      )}
    </>
  );
};

export default CharacterList;
