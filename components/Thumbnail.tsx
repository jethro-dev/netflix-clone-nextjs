import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IMG_SRC_URL } from "../utils/request";
import { Movie } from "../typings";
interface Props {
  movie: Movie;
}

const FIXED_WIDTH: number = 180;

const Thumbnail = ({ movie }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    movie && setIsLoading(false);
  }, [movie]);

  return (
    <div
      className={`relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105 ${
        isLoading && "bg-neutral-500 flex items-center justify-center"
      }`}
    >
      {isLoading ? (
        <h1>loading...</h1>
      ) : (
        <Image
          layout="fill"
          className="rounded-sm object-cover"
          src={`https://image.tmdb.org/t/p/w500${
            movie.backdrop_path || movie.poster_path
          }`}
        />
      )}
    </div>
  );
};

export default Thumbnail;
