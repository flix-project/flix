import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import axiosClient from "../config/axios";
import AuthContext from "./auth/AuthContext";

export const MoviesContext = createContext();

const MoviesProvider = (props) => {
  const authContext = useContext(AuthContext);
  const { user, autenticated } = authContext;
  const [spinner, setSpinner] = useState(null);
  const [spinnerFav, setSpinnerFav] = useState(null);

  const [userMovies, saveUserMovies] = useState([]);
  const [movies, saveMovies] = useState([]);
  const [search, searchMovies] = useState({
    title: "",
    type: "",
  });
  const [searchMade, saveSearch] = useState(false);

  const { title, type } = search;
  if (user) var { _id } = user;
  useEffect(() => {
    if (autenticated && user) {
      const getUserMovies = async () => {
        setSpinnerFav(true);
        try {
          const result = await axiosClient.get("/api/users", {
            params: {
              id: _id,
            },
          });
          let favMovies = result.data.favMovies;
          let res,
            results = [];
          for (var i = 0; i < favMovies.length; i++) {
            url = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OTMDB}&i=${favMovies[i]}`;
            res = await axios.get(url);

            results.push(res.data);
          }
          setTimeout(() => {
            saveUserMovies(results);

            // delete spinner
            setSpinnerFav(false);
          }, 3000);
        } catch (error) {
          console.log(error);
        }
      };
      getUserMovies();
    }
    if (searchMade) {
      var url,
        urlAvalaibility,
        availability,
        displaynames = [];

      const getMovies = async () => {
        setSpinner(true);

        if (type === "All") {
          url = `https://www.omdbapi.com/?apikey=${process.env.OTMDBkey}&s=${title}`;
        } else {
          url = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OTMDB}&s=${title}&type=${type}`;
        }

        const results = await axios.get(url);
        var moviesArray = [];
        var resultsData = results.data.Search;
        if (!resultsData) return;

        for (var i = 0; i < resultsData.length; i++) {
          url = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_OTMDB}&i=${resultsData[i].imdbID}`;
          let res = await axios.get(url);
          urlAvalaibility = `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source=imdb&source_id=${resultsData[i].imdbID}`;
          axios.defaults.headers.common["X-RapidAPI-Key"] =
            process.env.REACT_APP_UTELLY;
          availability = await axios.get(urlAvalaibility);
          delete axios.defaults.headers.common["X-RapidAPI-Key"];
          res.data.Available = availability.data.collection.locations;
          if (typeof res.data.Available !== "undefined") {
            displaynames = res.data.Available.map(
              ({ display_name }) => display_name
            );
          } 
          if(typeof displaynames !== "undefined")
          res.data.Available= [...new Set(displaynames)];
          else
          res.data.Available[0]= "This title is not available to stream.";
          moviesArray.push(res.data);
        }

        setTimeout(() => {
          saveMovies(moviesArray);

          // delete spinner
          setSpinner(false);
        }, 3000);
      };
      getMovies();
    }
  }, [search, user]);

  return (
    <MoviesContext.Provider
      value={{
        movies,
        userMovies,
        spinner,
        spinnerFav,
        searchMovies,
        saveMovies,
        saveSearch,
        saveUserMovies,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesProvider;
