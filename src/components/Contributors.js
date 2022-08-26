import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Plot from "react-plotly.js";

const ContributorsView = styled.div`
  display: grid;
  grid-template-rows: 675px 1fr;
  grid-gap: 24px;
  .js-plotly-plot {
    border-radius: 4px;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    padding: 8px;
    background-color: #fff;
  }
`;

const ContributorsContainer = styled.div`
  display: grid;
  grid-template-rows: repeat(auto-fit, 1fr);
  grid-gap: 24px;
  a {
    text-decoration: none;
  }
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

const ContributorInfoContainer = styled.div`
  display: grid;
  grid-autoflow: row;
  grid-gap: 4px;
`;

const ContributorName = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => props.theme.palette.frontline};
`;

const ContributionInfo = styled.span`
  font-size: 1rem;
  font-weight: 400;
  color: ${(props) => props.theme.palette.frontline};
`;

const Contributors = () => {
  const [contributors, setContributors] = useState([]);
  useEffect(() => {
    fetch("https://api.github.com/repos/facebook/react/contributors")
      .then((response) => response.json())
      .then((data) => {
        setContributors([...data]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const contributorData = useMemo(() => {
    return [...contributors]
      .sort((a, b) => (a.login.toLowerCase() > b.login.toLowerCase() ? 1 : -1))
      .map((contributor) => {
        return {
          name: contributor.login,
          cont: contributor.contributions,
        };
      });
  }, [contributors]);
  return (
    <ContributorsView>
      <Plot
        data={[
          {
            x: [...contributorData.map((contributor) => contributor.cont)],
            y: [...contributorData.map((contributor) => contributor.name)],
            type: "bar",
            orientation: "h",
            marker: {
              color: "#7e4082",
            },
          },
        ]}
        layout={{
          autosize: true,
          title: "Total Contributions by Contributor",
          margin: {
            b: 60,
            pad: 12,
          },
          yaxis: {
            title: "Contributor",
            automargin: true,
          },
          xaxis: {
            title: "Contributions",
          },
        }}
        config={{ responsive: true }}
      />
      <ContributorsContainer>
        {contributors.map((contributor) => (
          <Link key={contributor.id} to={`/contributor/${contributor.login}`}>
            <Contributor>
              <img src={contributor.avatar_url} alt={contributor.login} />
              <ContributorInfoContainer>
                <ContributorName>{contributor.login}</ContributorName>
                <ContributionInfo>
                  Contributions:{contributor.contributions}
                </ContributionInfo>
              </ContributorInfoContainer>
            </Contributor>
          </Link>
        ))}
      </ContributorsContainer>
    </ContributorsView>
  );
};

export default Contributors;
