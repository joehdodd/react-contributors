import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const ContributorWrapper = styled.div`
  padding: 16px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const ContributorContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-gap: 8px;
  background-color: #fff;
  img {
    width: 100%;
    border-radius: 4px;
  }
  hr {
    border: 1px dashed ${(props) => props.theme.palette.frontline};
  }
`;

const ContributorBasicInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 8px;
  img {
    width: 100%;
    border-radius: 4px;
  }
  span {
    display: block;
    font-size: 2rem;
    margin-bottom: 8px;
    color: ${(props) => props.theme.palette.frontline};
  }
  span:last-of-type {
    font-size: 1.25rem;
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
    <ContributorWrapper>
      {contributor && (
        <ContributorContainer>
          <ContributorBasicInfo>
            <img src={contributor.avatar_url} alt={contributor.login} />
            <div>
              <span>{contributor.login}</span>
              <span>{contributor.followers} followers</span>
              <span>{contributor.following} following</span>
              <span>Bio: {contributor.bio}</span>
            </div>
          </ContributorBasicInfo>
          <div>
            <hr />
          </div>
        </ContributorContainer>
      )}
    </ContributorWrapper>
  );
};

export default Contributor;
