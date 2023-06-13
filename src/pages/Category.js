import React from "react";
import { Link, Route } from "react-router-dom";
import SampleRoutingMenu from "components/SampleRoutingMenu";
import Container from "components/Container";

const Category = ({ match, menuName, pathName }) => {
  return (
    <Container menuName={menuName} >
      <SampleRoutingMenu pathName={pathName} />
      <div>
        <ul>
          <li>
            <Link to={`${match.url}/shoes`}>Shoes</Link>
          </li>
          <li>
            <Link to={`${match.url}/boots`}>Boots</Link>
          </li>
          <li>
            <Link to={`${match.url}/footwear`}>Footwear</Link>
          </li>
        </ul>
        <Route
          path={`${match.path}/:name`}
          render={({ match }) => (
            <div>
              <h3> {match.params.name} </h3>
            </div>
          )}
        />
      </div>
    </Container>

  );
};

export default Category;
