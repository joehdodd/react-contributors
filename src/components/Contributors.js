import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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

const ContributorName = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.theme.palette.frontline};
`;

const Contributors = () => {
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
    <ContributorsContainer>
      {contributors.map((contributor) => (
        <Link key={contributor.id} to={`/contributor/${contributor.login}`}>
          <Contributor>
            <img src={contributor.avatar_url} alt={contributor.login} />
            <ContributorName>{contributor.login}</ContributorName>
          </Contributor>
        </Link>
      ))}
    </ContributorsContainer>
  );
};

export default Contributors;
