import './register.scss';
import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();

    const handleStart = () => {
        setEmail(emailRef.current.value);
    };
    const handleFinish = async (e) => {
        e.preventDefault();
        console.log(usernameRef.current.value);

        setPassword(passwordRef.current.value);
        setUsername(usernameRef.current.value);
        try {
            await axios.post('auth/register', { email, username, password });
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = () => {
        console.log('first');
    };

    return (
        <div className="register">
            <div className="top">
                <div className="wrapper">
                    <img
                        className="logo"
                        src="https://cdn.jsdelivr.net/gh/Th3Wall/assets-cdn/Fakeflix/Fakeflix_logo.png"
                        alt=""
                    />
                    
                </div>
            </div>
            <div className="container">
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <p>
                    Ready to watch? Enter your email to create or restart your
                    membership.
                </p>
                {!email ? (
                    <div className="input">
                        <input
                            type="email"
                            placeholder="eamil address"
                            ref={emailRef}
                        />
                        <button
                            className="registerButton"
                            onClick={handleStart}
                        >
                            Get Started
                        </button>
                    </div>
                ) : (
                    <form className="input">
                        <input
                            type="username"
                            placeholder="username"
                            ref={usernameRef}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            ref={passwordRef}
                        />
                        <button
                            className="registerButton"
                            onClick={handleFinish}
                        >
                            Start
                        </button>
                    </form>
                )}
                <Link to="/login">
                        <button className="loginButton" onClick={handleClick}>
                            Sign In
                        </button>
                    </Link>
            </div>
        </div>
    );
};

export default Register;
