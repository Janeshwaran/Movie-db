import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { api_key, img_url, unavailable } from "./../Requests";
import axios from "axios";
import "./../Requests";
import "./Modal.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    width: "70%",
    height: "80%",
    backgroundColor: "#000",
    border: "1px solid grey",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(1, 1, 3),
    color: "#b89f42",
  },
}));

export default function TransitionsModal({ children, media_type, id }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [movies, setmovies] = useState();
  const [credits, setCredits] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${api_key}&language=en-US`
    );

    setmovies(data);
    // console.log(data);
  };
  const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${api_key}&language=en-US`
    );
    setCredits(data.cast);
    // console.log(data.cast);
  };
  useEffect(() => {
    fetchData();
    fetchCredits()
  }, []);

  return (
    <div>
      <button type="button" className="content" onClick={handleOpen}>
        {children}
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {movies && (
            <div className={classes.paper}>
              <div className="ContentModal">
                <img
                  src={
                    movies.poster_path
                      ? `${img_url}/${movies.poster_path}`
                      : unavailable
                  }
                  alt={movies.name || movies.title}
                  className="ContentModal_portrait"
                />

                <div className="ContentModal_about">
                  <span className="ContentModal_title">
                    {movies.name || movies.title} (
                    {(
                      movies.first_air_date ||
                      movies.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  <span className="actors">
                        {credits.map((credit)=>(
                            <h1> {credit.name}</h1>
                        ))}
                    </span>
                  {movies.tagline && (
                    <i className="tagline">{movies.tagline}</i>
                  )}
                    <i className="tagline">{movies.release_date}</i>
                  <span className="ContentModal_description">
                    {movies.overview}<br/>
                   
                  </span>
                </div>
              </div>
            </div>
          )}
        </Fade>
      </Modal>
    </div>
  );
}
