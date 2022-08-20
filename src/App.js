import { Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Contributors from "./components/Contributors";
import Contributor from "./components/Contributor";

const ContributorAppWrapper = styled.div`
  padding: 4%;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  ${(props) => props.theme.breakpoints.tablet} {
    padding: 0 80px;
  }
  ${(props) => props.theme.breakpoints.tabletLarge} {
    padding: 0 160px;
  }
  ${(props) => props.theme.breakpoints.desktop} {
    padding: 0 240px;
  }
  ${(props) => props.theme.breakpoints.desktopLarge} {
    padding: 0 320px;
  }
`;

const AppTitle = styled.div`
  margin: 0 auto;
  text-align: center;
  h1 {
    font-size: 2rem;
    fomnt-weight: 800;
    color: ${(props) => props.theme.palette.frontline};
  }
`;

const theme = {
  breakpoints: {
    tablet: "@media screen and (min-width: 768px)",
    tabletLarge: "@media screen and (min-width: 1024px)",
    desktop: "@media screen and (min-width: 1200px)",
    desktopLarge: "@media screen and (min-width: 1440px)",
  },
  palette: {
    frontline: "#402c56",
    grey: "#f0f2f5",
  },
};

function RepoContributorApp() {
  return (
    <ThemeProvider theme={theme}>
      <ContributorAppWrapper>
        <Container>
          <AppTitle>
            <h1>React Repository Contributors</h1>
          </AppTitle>
          <Routes>
            <Route path="/" element={<Contributors />} />
            <Route path="/contributor/:login" element={<Contributor />} />
          </Routes>
        </Container>
      </ContributorAppWrapper>
    </ThemeProvider>
  );
}

export default RepoContributorApp;
