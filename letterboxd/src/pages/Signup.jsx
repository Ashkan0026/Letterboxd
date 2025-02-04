import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function SignUp() {
    const {login}  = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = (role) => {
        const token = 'fake-token';
        login(token, role)
        navigate('/')
    }

    return (
        <div>
          <h1>Sign Up</h1>
          <button
            style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' }}
            onClick={() => handleLogin('user')}
          >
            Login
          </button>
        </div>
    );
}

export default SignUp;