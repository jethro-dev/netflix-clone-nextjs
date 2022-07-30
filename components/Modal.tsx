import React, { useState, useEffect } from "react";
import MuiModal from "@mui/material/Modal";
import { modalState, movieState } from "../atoms/modalAtmos";
import { useRecoilState } from "recoil";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import {
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
} from "@heroicons/react/outline";
import ReactPlayer from "react-player/lazy";
import { Element, Genre } from "../typings";
import { FaPlay } from "react-icons/fa";

type Props = {};

const Modal = (props: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    console.log("start return of useEffect");
    if (!movie) return;
    console.log("start of useEffect");
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());

      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        console.log(index);
        setTrailer(data.videos.results[index].key);
      }

      if (data?.genres) {
        setGenres(data.genres);
      }
    }

    fetchMovie();
  }, [movie]);

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-[95vw] max-w-4xl rounded"
    >
      <div className="bg-neutral-900 rounded-lg mx-auto">
        <button
          onClick={handleClose}
          className="modal-btn absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818]/60 hover:bg-[#181818]/100 transition-colors"
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={
              `https://www.youtube.com/watch?v=${trailer}` ||
              "https://youtu.be/eEFVxI9lqjU?t=72"
            }
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              borderTopLeftRadius: "0.5rem",
              borderTopRightRadius: "0.5rem",
              overflow: "hidden",
            }}
            volume={0.3}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex items-center justify-between w-full px-10">
            <div className="flex space-x-2">
              <button className="flex items-center gap-x-2 rounded bg-neutral-100 px-8 text-xl font-bold text-black transition hover:bg-neutral-400 ">
                <FaPlay className="h-4 w-4 text-black" />
                <span className="text-sm">Play</span>
              </button>

              <button className="modal-btn h-9 w-9 hover:bg-[#2a2a2a]/60 text-neutral-100">
                <PlusIcon className="h-4 w-4" />
              </button>

              <button className="modal-btn h-9 w-9 hover:bg-[#2a2a2a]/60 text-neutral-300">
                <ThumbUpIcon className="h-4 w-4" />
              </button>
            </div>
            <div>
              <button
                className="modal-btn h-9 w-9 hover:bg-[#2a2a2a]/60 text-neutral-300"
                onClick={() => setMuted(!muted)}
              >
                {muted ? (
                  <VolumeOffIcon className="h-4 w-4 hover:text-white transition" />
                ) : (
                  <VolumeUpIcon className="h-4 w-4 hover:text-white transition" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-10 lg:p-12 flex space-x-4">
          {/* left col */}
          <div className="flex-1 space-y-5">
            <div className="flex items-center space-x-4">
              <p className="text-green-500 font-semibold">
                {movie?.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {new Date(
                  movie?.release_date || movie?.first_air_date
                ).getFullYear()}
              </p>
              <div className="flex h-4 items-center justify-center rounded-sm border-white/40 px-3 py-2 text-xs border-2">
                HD
              </div>
            </div>
            <div>
              <p className="text-sm lg:text-base">{movie?.overview}</p>
            </div>
          </div>

          {/* right col */}
          <div className="w-[25%]">
            <div>
              <span className="text-xs md:text-sm lg:text-base text-neutral-600">
                Genre:
              </span>{" "}
              <span className="text-xs md:text-sm text-neutral-100">
                {genres.map((genre) => genre.name).join(", ")}
              </span>
            </div>

            <div>
              <span className="text-xs md:text-sm lg:text-base text-neutral-600">
                Original language:
              </span>{" "}
              <span className="text-xs md:text-sm text-neutral-100">
                {movie?.original_language}
              </span>
            </div>

            <div>
              <span className="text-xs md:text-sm lg:text-base text-neutral-600">
                Original language:
              </span>{" "}
              <span className="text-xs md:text-sm text-neutral-100">
                {movie?.original_language}
              </span>
            </div>
          </div>
        </div>
      </div>
    </MuiModal>
  );
};

export default Modal;
