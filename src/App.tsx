import { HashRouter  as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Tv from "./routes/Tv";
import Search from "./routes/Search";
import Header from "./Components/Header";
import styled from "styled-components"

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <Router>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tv" element={<Tv />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movies/:category/:movieID" element={<Home />} />
            <Route path="/tv/:category/:tvID" element={<Tv />} />
          </Routes>
        </Main>

    </Router>
  );
}

export default App;
