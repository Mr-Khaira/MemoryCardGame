import React from "react";

export default function SingleCard({ card, handleChoice }) {
  function handleClick() {
    handleChoice(card);
  }

  return (
    <>
      <div className="card">
        <img className="front" src={card.card.src} alt="card front" />
        <img
          className="back "
          src="/img/cover.png"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </>
  );
}
