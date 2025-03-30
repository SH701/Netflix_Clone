import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { makeImagePath } from "../utills";

const Backdrop = styled(motion.div)<{ bg: string }>`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  z-index: 0;
`;
const BlurBox = styled(motion.div)`
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(20px);
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1; 
`;

const Card = styled(motion.div)`
  position: absolute;
  width: 95%;
  height: 85vh;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
`;
const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 60%;
  padding-left: 180px;
  padding-bottom: 50px;
`;
const InfoLine = styled.div`
  display: flex;  
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
`;
const BigTitle = styled.h3`
   color: ${(props) => props.theme.white.lighter};
   padding: 20px;
   font-size: 46px;
   position: relative;
   top: 0px;
 `;
const BigOverview = styled.p`
   padding: 0 20px;
   margin-top: 20px;
   position: relative;
   font-size: 20px;
   color: ${(props) => props.theme.white.lighter};
 `;
const Bigposter = styled.div<{ bg: string }>`
  width: 350px;
  height: 450px;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  border-radius: 10px;
  margin-right: 100px;
`;
const BigVote = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
  padding: 0 20px;
`;
const BigGenre = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
  padding: 0 20px;
`;

const BigDate = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-size: 16px;
`;


interface TVDetailProps {
    tv: {
      id: number;
      name: string;
      overview: string;
      backdrop_path: string;
      poster_path: string;
      vote_average: number | string;
      first_air_date: string;
      genre_ids: number[];
    };
    category: string;
    scrollY: number;
    onClose: () => void;
  }
  const genreMap: Record<number, string> = {
    10759: "Action",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    10762: "Kids",
    9648: "Mystery",
    10763: "News",
    10764: "Reality",
    10765: "Sci-Fi",
    10766: "Soap",
    10767: "Talk",
    10768: "War",
    37: "Western",
  };

  function getGenreNames(ids: number[]): string {
    return ids
      .map((id) => genreMap[id])
      .filter(Boolean)
      .slice(0, 2) 
      .join(" / ");
  }


export default function TvDetail({ tv, scrollY, onClose,category }: TVDetailProps) {
  const genreText = getGenreNames(tv.genre_ids);
  console.log(tv.genre_ids);
  return (
    <>
   <AnimatePresence>
  <Backdrop bg={makeImagePath(tv.backdrop_path, "w500")}  onClick={onClose} exit={{ opacity: 0 }} transition={{duration:0.5}} animate={{ opacity: 1 }}/>
  <BlurBox  onClick={onClose} transition={{duration:0.5}} exit={{ opacity: 0 }} animate={{ opacity: 1 }}/>
  <Card onClick={onClose} style={{ top: scrollY + 66.4 }} layoutId={`tv_${category}_${tv.id}`}>
  <InfoBlock>
    <BigTitle>{tv.name}</BigTitle>
    <InfoLine>
      <BigVote>⭐ {Number(tv.vote_average).toFixed(1)}</BigVote>
      <BigDate>📅 {tv.first_air_date}</BigDate>
      <BigGenre>📺 {genreText}</BigGenre>
    </InfoLine>
    <BigOverview>{tv.overview}</BigOverview>   
  </InfoBlock>
    <Bigposter bg={makeImagePath(tv.poster_path,"w500")}/>
  </Card>
</AnimatePresence>
    </>
  );
}