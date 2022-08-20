import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ContributorContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 8px;
  padding: 8px;
  img {
    width: 100%;
  }
`;

const Contributor = () => {
  const { login } = useParams();
  const [contributor, setContributor] = useState(null);
  useEffect(() => {
    fetch(`https://api.github.com/users/${login}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setContributor(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [login]);

  return (
    <ContributorContainer>
      {contributor && (
        <>
          <img src={contributor.avatar_url} alt={contributor.login} />
          <div>
            <span>{contributor.login}</span>
          </div>
        </>
      )}
    </ContributorContainer>
  );
};

export default Contributor;
