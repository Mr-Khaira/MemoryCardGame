import React from "react";

export default function SingleCard({ card, handleChoice, flipped, disabled }) {
  function handleClick() {
    if (!disabled) {
      handleChoice(card);
    }
  }

  return (
    <>
      <div className="card">
        <div className={flipped ? "flipped" : ""}>
          <img className="front" src={card.src} alt="card front" />
          <img
            className="back"
            src="/img/cover.png"
            onClick={handleClick}
            alt="card back"
          />
        </div>
      </div>
    </>
  );
}

/* {flipped && <img className="front" src={card.src} alt="card front" />}
        {!flipped && (
          <img
            className="back"
            src="/img/cover.png"
            onClick={handleClick}
            alt="card back"
          />
        )} */
