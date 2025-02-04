import React from "react";

import {Link} from 'react-router-dom';

function Home() {
    return (
      <div>
        <h1>Home</h1>
        <Link to="/signup">
          <button style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px' }}>
            Sign Up
          </button>
        </Link>
      </div>
    );
}

export default Home;