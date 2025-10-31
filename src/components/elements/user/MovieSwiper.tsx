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
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'visible',
        px: 2,
        position: 'relative',
        '& .swiper-button-next, & .swiper-button-prev': {
          color: 'secondary.main',
          backgroundColor: 'rgba(156, 39, 176, 0.8)',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          marginTop: '-24px',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'white',
          },
          '&::after': {
            fontSize: '20px',
            fontWeight: 'bold',
          },
        },
        '& .swiper-button-next': {
          right: '10px',
        },
        '& .swiper-button-prev': {
          left: '10px',
        },
        '& .swiper-button-disabled': {
          opacity: 0.3,
          cursor: 'not-allowed',
        },
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: 'text.secondary',
          fontWeight: 700,
          pb: 4,
          ml: 2,
        }}
      >
        {title}
      </Typography>
      <Swiper
        modules={[Navigation, Mousewheel]}
        slidesPerView={5}
        loop={true}
        navigation
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          800: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        className="w-full"
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
