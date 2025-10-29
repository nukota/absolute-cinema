import React from "react";
import type { MovieDTO } from "../../utils/mockdata";

interface MovieProps {
  movie: MovieDTO;
  handleInfoClick: () => void;
}

const Movie: React.FC<MovieProps> = ({ movie, handleInfoClick }) => {
  const formattedDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        month: "2-digit",
        year: "numeric",
      })
    : "";
  return (
    <div
      className="movie h-[256px] w-[160px] flex flex-col rounded-md border border-[#999] overflow-hidden cursor-pointer"
      style={{
        transition: "all 0.2s ease",
      }}
      onClick={handleInfoClick}
    >
      <div className="relative h-[180px] w-full">
        <img
          className="h-full w-full rounded-t-sm object-cover"
          src={movie.poster_url}
          alt="movie poster"
        />
        {/* Fade gradient overlay */}
        <div
          className="absolute bottom-0 left-0 w-full h-8 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
          }}
        />
      </div>
      <div className="px-2 relative flex flex-col flex-1">
        <div className="font-medium text-[13px] text-black my-1 tracking-wide line-clamp-2">
          {movie.title}
        </div>
        <div className="flex flex-row items-center absolute bottom-2 w-full pr-3">
          <div className="font-medium text-[13px] text-gray truncate">
            {formattedDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
