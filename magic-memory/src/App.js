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
  const [disabled, setDisabled] = useState(false);
  const [startNewGame, setStartNewGame] = useState(0);
  const [finalWindow, setFinalWindow] = useState(false);

  //console.log("The card match count, ", startNewGame);

  if (startNewGame === 6 && !finalWindow) {
    setFinalWindow(true);
    setTimeout(() => {
      newGame();
    }, 4000);
  }

  // Starting a new game :-
  function newGame() {
    let shuffledCards = shuffle([...cardIamges, ...cardIamges]).map((card) => ({
      ...card, //If wrote card, it would mean the whole obj, but copy obj's properties.
      id: Math.random(),
    }));
    // console.log(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTruns(0);
    setStartNewGame(0);
    setFinalWindow(false);
  } // For each ele of arr ie card, making it a obj.

  // console.log(cards);

  // Handling Choices :-
  const handleChoice = (card) => {
    // console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // resetting the choices an the truns :-
  const resetTruns = () => {
    setTimeout(() => {
      setChoiceOne(null);
      setChoiceTwo(null);
      setTruns((prevTrun) => prevTrun + 1);
    }, 800);
    setDisabled(false);
  };

  // Matching the cards :-
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setStartNewGame((countMatch) => countMatch + 1);
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              // console.log(cards);
              card.matched = true;
              return { ...card };
            } else {
              return card;
            }
          });
        });
      } else {
        setDisabled(true);
        // console.log("Diff choices");
      }
      resetTruns();
    }
  }, [choiceOne, choiceTwo]);

  // Automatic game start :-

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={newGame}>New Game</button>
      <h3>Number of turns:{turns}</h3>
      {finalWindow && (
        <h2 className="numberOfTurns">You took total {turns} turns.</h2>
      )}
      <div className="card-grid">
        {cards.map((card) => {
          return (
            <SingleCard
              key={card.id}
              card={card}
              handleChoice={handleChoice}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          );
        })}
      </div>
      <h2>The game resets upon completion after 4 seconds.</h2>
    </div>
  );
}

export default App;
