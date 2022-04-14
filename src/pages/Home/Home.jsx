import React from "react";
import Nav from "../../components/Nav/Nav";
import Banner from "../../components/Banner/Banner";
import Row from "../../components/Row/Row";
import DefaultHome from "../../components/DefaultHome/DefaultHome";
import requests from "../../services/requests";
import { useSelector } from "react-redux";

const Home = () => {
  const subscription = useSelector((state) => state.user.subscription);

  return (
    <>
      {!subscription?.role ? (
        <DefaultHome />
      ) : (
        <div>
          <Nav />

          <Banner />

          <Row
            title="Netflix Originals"
            fetchUrl={requests.fetchNetflixOriginals}
            isLargeRow
          />

          <Row title="Trending Now" fetchUrl={requests.fetchTrending} />

          <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />

          <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />

          <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />

          <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />

          <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />

          <Row title="Documentries" fetchUrl={requests.fetchDocumentries} />
        </div>
      )}
    </>
  );
};

export default Home;
