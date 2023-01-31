import "./style.css";

const Home = (props) => {
  return (
    <section className="home__container">
      <article className="home">
        <h1>Quizzical</h1>
        <p>Quiz App for General Knowledge</p>
        <button className="start-quiz" onClick={() => props.start()}>
          Start quiz
        </button>
      </article>
    </section>
  );
};

export default Home;
