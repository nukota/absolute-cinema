import { Box, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel, Navigation } from 'swiper/modules';
import type { MovieDTO } from '../../../utils/types';
import SlideItem from '../../items/SlideItem';
import 'swiper/swiper-bundle.css';

interface MovieSwiperProps {
  title: string;
  movies: MovieDTO[];
}

const MovieSwiper: React.FC<MovieSwiperProps> = ({ title, movies }) => {
  return (
    <Box
      className="movie-slide-container"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'visible',
        px: 2,
        position: 'relative',
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: 'text.primary',
          fontWeight: 700,
          pb: 3,
          ml: 6,
        }}
      >
        {title}
      </Typography>
      <Swiper
        modules={[Navigation, Mousewheel]}
        spaceBetween={0}
        slidesPerView={5}
        centeredSlides={true}
        loop={true}
        navigation
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          1280: {
            slidesPerView: 3,
          },
          1680: {
            slidesPerView: 5,
          },
          1820: {
            slidesPerView: 7,
          },
        }}
        className="w-full movie-slide"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.movie_id}>
            <SlideItem movie={movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default MovieSwiper;
