import "./App.css";
import { useEffect, useState } from "react";
import SingleCard from "./components/SingleCard";
import "./components/SingleCard.css";

const cardIamges = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

//Fisher-Yates shuffle algorithm.
function shuffle(theArr) {
  for (let i = theArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = theArr[i];
    theArr[i] = theArr[j];
    theArr[j] = temp;
  }

  return theArr;
}

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTruns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  function newGame() {
    let shuffledCards = shuffle([...cardIamges, ...cardIamges]).map((card) => ({
      card,
      id: Math.random(),
    }));
    console.log(shuffledCards);
    setCards(shuffledCards);
    setTruns(0);
  } // For each ele of arr ie card, making it a obj.

  // console.log(cards);

  // Handling Choices :-
  const handleChoice = (card) => {
    // console.log(card);

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // resetting the choices an the truns :-
  const resetTruns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTruns((prevTrun) => prevTrun + 1);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.card.src === choiceTwo.card.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.card.src === choiceOne.card.src) {
              console.log(cards);
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      } else {
        console.log("Diff choices");
      }
      resetTruns();
    }
  }, [choiceOne, choiceTwo]);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={newGame}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => {
          return (
            <SingleCard key={card.id} card={card} handleChoice={handleChoice} />
          );
        })}
      </div>
    </div>
  );
}

export default App;
