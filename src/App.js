import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";

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

const ContributorContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-gap: 24px;
`;

const Contributor = styled.div`
  display: grid;
  grid-template-columns: 0.25fr 1.75fr;
  grid-gap: 4px;
  align-items: center;
  padding: 4px 8px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  :hover {
    background-color: ${(props) => props.theme.palette.grey};
  }
  img {
    width: 100px;
    border-radius: 4px;
  }
`;

const ContributorName = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.theme.palette.frontline};
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
  const [contributors, setContributors] = useState([]);
  useEffect(() => {
    fetch("https://api.github.com/repos/facebook/react/contributors")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setContributors([...data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <ContributorAppWrapper>
        <Container>
          <AppTitle>
            <h1>React Repository Contributors</h1>
          </AppTitle>
          <ContributorContainer>
            {contributors.map((contributor) => (
              <Contributor key={contributor.id}>
                <img src={contributor.avatar_url} alt={contributor.login} />
                <ContributorName>{contributor.login}</ContributorName>
              </Contributor>
            ))}
          </ContributorContainer>
        </Container>
      </ContributorAppWrapper>
    </ThemeProvider>
  );
}

export default RepoContributorApp;
