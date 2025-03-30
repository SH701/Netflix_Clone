import { useQuery } from "@tanstack/react-query";
import { getAiringTvs, getPopularTvs, getTopratedTvs } from "../api";

export default function useMultiTvQueries() {

      
        const airingTvQuery = useQuery({
          queryKey: ['tv', 'airing_today'],
          queryFn: getAiringTvs,
        });
      
        const popularTvQuery = useQuery({
          queryKey: ['tv', 'popular'],
          queryFn: getPopularTvs,
        });
      
        const topratedTvQuery = useQuery({
            queryKey: ['tv', 'toprated'],
            queryFn: getTopratedTvs,
          });
          return {
            airing: airingTvQuery,
            popular: popularTvQuery,
            topRated: topratedTvQuery,
          };
}