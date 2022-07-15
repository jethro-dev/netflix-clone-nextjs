import React from "react";
import Image from "next/image";
import { IMG_SRC_URL } from "../utils/request";
import { Movie } from "../typings";
interface Props {
  movie: Movie;
}

const FIXED_WIDTH: number = 180;

const Thumbnail = ({ movie }: Props) => {
  return (
    <div
      className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
    >
      <Image
        layout="fill"
        className="rounded-sm object-cover"
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
      />
    </div>
  );
};

export default Thumbnail;
