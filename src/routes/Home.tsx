import { motion, AnimatePresence, useScroll } from "framer-motion";
import styled from "styled-components";
import { makeImagePath } from "../utills";
import { useEffect, useState } from "react";
import { FaPlay, FaPlus, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import MovieDetail from "../Components/MovieDetail";
import SliderComponent from "../Components/SliderComponent";
import useMultiMovieQueries from "../hooks/useMultiMovieQueries";
import useSliderGroup from "../hooks/useSlider";
import { getCurrentLanguage } from "../language";

// Styled Components
const Wrapper = styled.div`
  overflow-x: hidden;
  background-color: black;
  height: 100%;
`;
const Loader = styled.div`
  height: 20vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ $bgPhoto: string }>`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 200px 60px 60px 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 60px;
  margin-bottom: 10px;
  font-weight: 700;
`;

const Overview = styled.span`
  font-size: 24px;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -70px;
  margin-bottom: 80px;
  overflow: hidden;
`;


const SliderTitle = styled.h2`
  font-size: 30px;
  margin-left: 20px;
  margin-bottom: 20px;
  font-weight: 600;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  height: 200px;
  cursor: pointer;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center center;
  &:nth-child(1) {
    transform-origin: center left;
  }
  &:nth-child(6) {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.darker};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 14px;
    font-weight: 600;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Btn = styled.button`
  width: 25px;
  height: 25px;
  border-radius: 13px;
  background-color: ${(props) => props.theme.black.darker};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid white;
  color: white;
  cursor: pointer;
  margin-top: 15px;
`;
const Footer = styled.footer`
  height: 40px;
  background-color: #111;
  color: #aaa;
  text-align: center;
  padding: 10px 0;
  font-size: 14px;
  margin: 0 auto;
`;
const A = styled.a`
  text-decoration: underline;
`
const SpanBox =styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Genre = styled.h1`
  font-size: 12px;
  margin-top: 10px;
  padding-bottom: 5px;
`
const Originlang=styled.h1`
font-size: 24px;
  font-weight: 600;
  margin-right: 5px;
  margin-bottom: 5px;
`


// Animation Variants for Box and Info
const boxVar = {
  hover: {
    scale: 1.3,
    y: -20,
    transition: { delay: 0.3, duration: 0.3 },
  },
};

const infoVar = {
  normal: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { delay: 0.3, duration: 0.3 },
  },
};

const offset = 6;

const genreMap: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

function getGenreNames(ids: number[]): string {
  return ids.map(id => genreMap[id]).filter(Boolean).slice(0, 2).join(". ");
}

function Home() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const moviePathMatch: PathMatch<string> | null = useMatch("/movies/:category/:id");
  const clickedMovieId = moviePathMatch?.params.id;
  const [y, setY] = useState(0);
  const queries = useMultiMovieQueries();
  const nowSlider = useSliderGroup(queries.nowPlaying.data?.results.length ?? 0);
  const upcomingSlider = useSliderGroup(queries.upcoming.data?.results.length ?? 0);
  const popularSlider = useSliderGroup(queries.popular.data?.results.length ?? 0);
  const topRatedSlider = useSliderGroup(queries.topRated.data?.results.length ?? 0);

  useEffect(() => {
    return scrollY.on("change", (latest) => setY(latest));
  }, [scrollY]);

  useEffect(() => {
    document.body.style.overflow = moviePathMatch ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [moviePathMatch]);
  const isKorean = getCurrentLanguage() === "ko-KR";
  const SLIDER_CONFIG = [
    { title:isKorean? "상영 중":"Now Playing", query: queries.nowPlaying, slider: nowSlider, category: "nowplaying" },
    { title:isKorean?"개봉 예정":"Upcoming", query: queries.upcoming, slider: upcomingSlider, category: "upcoming" },
    { title:isKorean?"인기 있는": "Popular", query: queries.popular, slider: popularSlider, category: "popular" },
    { title:isKorean?"평점 높은": "Top Rated", query: queries.topRated, slider: topRatedSlider, category: "toprated" },
  ];

  const onBoxClick = (movieId: number,category: string) => navigate(`/movies/${category}/${movieId}`);
  const onOverClick = () => navigate(-1);

  const clickedMovie =
    clickedMovieId &&(
    queries.nowPlaying.data?.results.find((m) => m.id === +clickedMovieId) ||
    queries.upcoming.data?.results.find((m) => m.id === +clickedMovieId) ||
    queries.popular.data?.results.find((m) => m.id === +clickedMovieId) ||
    queries.topRated.data?.results.find((m) => m.id === +clickedMovieId)
  );

  if (queries.nowPlaying.isLoading) return <Loader>Loading...</Loader>;
 
  return (
    <><Wrapper>
      <Banner $bgPhoto={makeImagePath(queries.nowPlaying.data!.results[18].backdrop_path)}>
        <Title>{queries.nowPlaying.data!.results[18].title}</Title>
        <Overview>{queries.nowPlaying.data!.results[18].overview}</Overview>
      </Banner>

      {SLIDER_CONFIG.map(({ title, query, slider, category }) => {
        if (!query.data) return null;
        const movies = query.data.results
          .slice(0)
          .slice(offset * slider.index, offset * slider.index + offset);
        return (
          <Slider key={title}>
            <SliderTitle>{title}</SliderTitle>
            <SliderComponent
              index={slider.index}
              direction={slider.direction}
              onNext={slider.next}
              onPrev={slider.prev}
              setLeaving={slider.setLeaving}
            >
              {movies.map((movie) => {
          const genreText = getGenreNames(movie.genre_ids);
         return (
           <Box
              key={movie.id}
              layoutId={`movie_${category}_${movie.id}`}
              variants={boxVar}
              whileHover="hover"
              initial="normal"
              transition={{ type: "tween", duration: 0.5 }}
              $bgPhoto={makeImagePath(movie.backdrop_path, "w500")}
              onClick={() => onBoxClick(movie.id, category)}
            >
                <Info variants={infoVar}>
                  <h4>{movie.title || movie.name}</h4>
                    <ButtonGroup>
                       <Btn>{FaPlay({}) as React.ReactElement}</Btn>
                       <Btn>{FaPlus({}) as React.ReactElement}</Btn>
                       <Btn>{FaThumbsUp({}) as React.ReactElement}</Btn>
                       <Btn>{FaThumbsDown({}) as React.ReactElement}</Btn>
                    </ButtonGroup>
                    <SpanBox>
                    <Genre>{genreText}</Genre>
                    <Originlang>{movie.original_language.toUpperCase()}</Originlang>
                    </SpanBox>
                  </Info>
              </Box>
              );
            })}
            </SliderComponent>
          </Slider>
        );
      })}
      <AnimatePresence>
        {clickedMovieId && clickedMovie && (
          <MovieDetail movie={clickedMovie} category={moviePathMatch?.params.category!} scrollY={y} onClose={onOverClick} />
        )}
      </AnimatePresence>
      <Footer>Suflix 2025 | <A href="https://github.com/">깃허브</A>  </Footer>
    </Wrapper>
   </>
  );
}

export default Home;
