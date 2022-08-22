import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import styled from "styled-components";

const ContributorView = styled.div`
  display: grid;
  grid-auto-flow: row;
  grid-gap: 12px;
`;

const ContributorWrapper = styled.div`
  padding: 16px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const ContributorContainer = styled.div`
  display: grid;
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
  grid-auto-flow: 1fr 1fr;
  grid-gap: 8px;
  ${(props) => props.theme.breakpoints.tablet} {
    grid-template-columns: 1fr 1fr;
  }
  h1,
  h3,
  p,
  span {
    color: ${(props) => props.theme.palette.frontline};
  }
  h1 {
    margin-top: 0;
    margin-bottom: 0;
  }
  h3 {
    margin-top: 0;
  }
  img {
    width: 100%;
    border-radius: 4px;
  }
`;

const Contributor = () => {
  const { login } = useParams();
  const [contributor, setContributor] = useState(null);
  useEffect(() => {
    fetch(`https://api.github.com/users/${login}`)
      .then((response) => response.json())
      .then((data) => {
        setContributor(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [login]);

  return (
    <ContributorView>
      <Link to="/"> &#60;= See All Contributors</Link>
      <ContributorWrapper>
        {contributor && (
          <ContributorContainer>
            <ContributorBasicInfo>
              <div>
                <h1>{contributor.name}</h1>
                <h3>{contributor.login}</h3>
                <p>{contributor.bio}</p>
                <div>
                  <span>
                    <strong>{contributor.followers}</strong> followers
                  </span>{" "}
                  <span>
                    <strong>{contributor.following}</strong> following
                  </span>
                </div>
                <hr />
                <div>
                  <span>{contributor.company}</span>
                  <br />
                  <span>{contributor.location}</span>
                  <br />
                  <a href={contributor.blog}>{contributor.blog}</a>
                </div>
              </div>
              <img src={contributor.avatar_url} alt={contributor.login} />
            </ContributorBasicInfo>
          </ContributorContainer>
        )}
      </ContributorWrapper>
    </ContributorView>
  );
};

export default Contributor;
