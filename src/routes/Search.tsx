import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { searchMulti, ISearchResult } from "../api"; // ← 타입 가져옴
import styled from "styled-components";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  padding: 40px;
  margin-top: 50px;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.black.darker};
  border-radius: 10px;
  overflow: hidden;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const Poster = styled.img`
  width: 100%;
  height: 270px;
  object-fit: cover;
`;

const Title = styled.h4`
  padding: 10px;
  font-size: 16px;
  text-align: center;
`;

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  const [results, setResults] = useState<ISearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!keyword) return;
    setLoading(true);
    searchMulti(keyword)
      .then((data) => setResults(data.results))
      .finally(() => setLoading(false));
  }, [keyword]);

  return (
    <div>
      <h1></h1>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <Grid>
          {results
            .filter((item) => item.media_type !== "person") // 사람 제외
            .map((item) => (
              <Card key={item.id}>
                <Poster
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w300/${item.poster_path}`
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={item.title || item.name || "제목 없음"}
                />
                <Title>{item.title || item.name || "제목 없음"}</Title>
              </Card>
            ))}
        </Grid>
      )}
    </div>
  );
}

export default Search;
