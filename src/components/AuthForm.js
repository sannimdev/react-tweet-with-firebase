import React, { useState } from 'react';
import { authService } from 'fbase';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState('');

    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                // create account
                data = await authService.createUserWithEmailAndPassword(email, password);
            } else {
                // log in
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
        <>
            <form onSubmit={onSubmit} className='container'>
                <input
                    type='text'
                    name='email'
                    placeholder='Email'
                    required
                    value={email}
                    onChange={onChange}
                    className='authInput'
                />
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    required
                    value={password}
                    onChange={onChange}
                    className='authInput'
                />
                <input type='submit' value={newAccount ? 'Create Account' : 'Login'} />
                {error && <span className='authError'>{error}</span>}
            </form>
            <span onClick={toggleAccount} className='authSwitch'>
                {newAccount ? 'Log in' : 'Create Account'}
            </span>
        </>
    );
};

export default AuthForm;
