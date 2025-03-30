import { useQuery } from "@tanstack/react-query";
import { getMovies, getUpcomingMovies, getPopularMovies, getTopratedMovies } from "../api";

export default function useMultiMovieQueries() {
        const nowPlayingQuery = useQuery({
          queryKey: ['movies', 'nowPlaying'],
          queryFn: getMovies,
        });
      
        const upcomingQuery = useQuery({
          queryKey: ['movies', 'upcoming'],
          queryFn: getUpcomingMovies,
        });
      
        const popularMovieQuery = useQuery({
          queryKey: ['movies', 'popular'],
          queryFn: getPopularMovies,
        });
      
        const topratedMovieQuery = useQuery({
            queryKey: ['movies', 'toprated'],
            queryFn: getTopratedMovies,
          });
          return {
            nowPlaying: nowPlayingQuery,
            upcoming: upcomingQuery,
            popular: popularMovieQuery,
            topRated: topratedMovieQuery,
          };
}