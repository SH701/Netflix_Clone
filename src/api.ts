import { getCurrentLanguage } from "./language";

const API_KEY = "f9dc91a30ff3aa6890740b76d7e3c9f8"
const BASE_PATH = "https://api.themoviedb.org/3"
const langParam = () => `language=${getCurrentLanguage()}`;


export interface IMovie{
    id:number;
    poster_path:string;
    backdrop_path:string;
    title:string;
    overview:string;
    release_date:string;
    popularity:number;
    genre_ids: number[];
    original_language:string;
}
export interface ITv {
    id: number;
    name: string;
    original_name: string;
    overview: string;
    first_air_date: string;
    backdrop_path: string | null;
    poster_path: string | null;
    vote_average: number;
    vote_count: number;
    popularity: number;
    origin_country: string[];
    original_language: string;
    status: string;
    type: string;
  }

export interface IGetMoviesResult{
    dates:{
        maximum:string;
        minimum:string;
    },
    page:number;
    results:IMovie[];
    total_pages:number;
    total_result:number;
}
export interface ISearchResult {
    id: number;
    media_type: "movie" | "tv" | "person";
    name?: string;        
    title?: string;     
    poster_path?: string;
    backdrop_path?: string;
    overview?: string;
  }
  
export function getMovies(){
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&${langParam()}`)
    .then((response)=>response.json())
}
export function getTopratedMovies(){
    return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&${langParam()}`)
    .then((response)=>response.json())
}
export function getUpcomingMovies(){
    return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&${langParam()}`)
    .then((response)=>response.json())
}export function getPopularMovies(){
    return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&${langParam()}`)
    .then((response)=>response.json())
}
export function getTvs(){
    return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}&${langParam()}`)
    .then((response)=>response.json())
}
export function getTopratedTvs(){
    return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&${langParam()}`)
    .then((response)=>response.json())
}
export function getAiringTvs(){
    return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&${langParam()}`)
    .then((response)=>response.json())
}
export function getPopularTvs(){
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&${langParam()}`)
    .then((response)=>response.json())
}
export function searchMulti(keyword: string) {
    return fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(keyword)}`)
      .then((response) => response.json());
}
