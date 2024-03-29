import React, { useState, useEffect } from "react";
import { Movie } from "../typings";
import Image from "next/image";
import requests, { IMG_SRC_URL } from "../utils/request";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/solid";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtmos";

interface Props {
  netflixOriginals: Movie[];
}

const Banner = ({ netflixOriginals }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);
  const baseUrl = IMG_SRC_URL;

  useEffect(() => {
    if (netflixOriginals) {
      let index = Math.floor(Math.random() * netflixOriginals.length);
      setMovie(netflixOriginals[index]);
    }
  }, [netflixOriginals]);

  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 -z-10 h-[100vh] w-full">
        <Image
          layout="fill"
          src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
          objectFit="cover"
        />
      </div>

      <h1 className="text-2xl font-bold md:text-4xl lg:text-7xl text-shadow-lg">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-shadow-xl md:max-w-lg md:text-lg lg:max-w-2xl lg:text-xl">
        {`${
          movie?.overview &&
          movie?.overview.length &&
          movie?.overview?.length < 240
            ? movie?.overview
            : movie?.overview.substring(0, 240) + "..."
        }`}
      </p>

      <div className="flex gap-2">
        <button className="banner-btn bg-white text-black">
          <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
          Play
        </button>
        <button
          className="banner-btn bg-neutral-500"
          onClick={() => {
            setShowModal(true);
            setCurrentMovie(movie);
          }}
        >
          More Info <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
        </button>
      </div>
    </div>
  );
};

export default Banner;
