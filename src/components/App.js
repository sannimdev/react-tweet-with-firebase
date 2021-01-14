import { useEffect, useState } from 'react';
import Router from 'components/Router';
/*
    🤷‍♂️ 파일 Absolute imports 설정하기
    https://create-react-app.dev/docs/importing-a-component/
*/
import { authService } from 'fbase';

function App() {
    const [init, setInit] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            console.log(user, !!user);
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setInit(true);
        });
    }, []);
    // setInterval(() => {
    //     console.log(authService.currentUser);
    // }, 2000);
    return (
        <>
            {init ? <Router isLoggedIn={isLoggedIn} /> : 'Initializing...'}
            <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
        </>
    );
}

export default App;
