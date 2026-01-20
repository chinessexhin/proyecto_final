import Header from "../components/header";
import Cards from "../components/Cards";
import { cafes } from "../components/cafes";

const Home = () => {
  return (
    <>
      <Header />

      <main className="d-flex flex-wrap gap-3 justify-content-center p-4">
        {cafes.map((cafe) => (
          <Cards
            key={cafe.id}
            id={cafe.id}
            img={cafe.img}
            title={`Café ${cafe.nombre}`}
            text={cafe.desc}
            price={cafe.precio}
          />
        ))}
      </main>
    </>
  );
};

export default Home;
