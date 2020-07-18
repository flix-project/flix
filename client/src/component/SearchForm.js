import React, { useContext, useState } from "react";
import { MoviesContext } from "../context/MoviesContext";
import {
  TextField,
  makeStyles,
  MenuItem,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "25ch"
    },
    ['@media (max-width:780px)']: { 
      flexDirection: "column"
    }
  ,
    margin: "10rem",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
}));

const Formulario = () => {
  const [search, setSearch] = useState({
    title: "",
    type: "",
  });

  const { searchMovies, saveSearch } = useContext(MoviesContext);


  const getMovies = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value,
    });
  };

  const classes = useStyles();

  return (
    <form
      className={classes.root}
      onSubmit={(e) => {
        e.preventDefault();
        searchMovies(search);
        saveSearch(true);
      }}
    >
      <TextField
        name="title"
        type="text"
        label="Title"
        placeholder="Search by title"
        onChange={getMovies}
        required
      />

      <TextField
        name="type"
        label="Type"
        select
        onChange={getMovies}
        required
        value="All"
      >
        <MenuItem value="All">-- All--</MenuItem>
        <MenuItem value="movie">Movies</MenuItem>
        <MenuItem value="series">TV Shows</MenuItem>
      </TextField>

      <Button variant="contained" color="secondary" type="submit">
        Search
      </Button>
    </form>
  );
};

export default Formulario;
