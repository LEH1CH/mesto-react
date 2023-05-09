function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="cards__item">
      <img
        src={props.card.link}
        onClick={handleClick}
        className="cards__image"
        alt={`Изображение ${props.card.name}`}
      />
      <button type="button" className="cards__delete link"></button>
      <div className="cards__info">
        <h3 className="cards__title">{props.card.name}</h3>
        <div className="cards__like-div">
          <button
            type="button"
            className="cards__like link"
            aria-label="Поставить лайк"
          ></button>
          <p className="cards__likes">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
