import { useState, useEffect } from "react";

/*
 * https://docs.github.com/en/rest/repos/repos#list-repository-contributors
 */

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
    <div>
      <h1>JOIN US</h1>
      {contributors.map((contributor) => (
        <div key={contributor.id}>
          <img src={contributor.avatar_url} alt={contributor.login} />
          <p>{contributor.login}</p>
        </div>
      ))}
    </div>
  );
}

export default RepoContributorApp;
