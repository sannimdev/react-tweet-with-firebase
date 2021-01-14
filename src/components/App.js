import { useState } from 'react';
import Router from 'components/Router';
/*
    🤷‍♂️ 파일 Absolute imports 설정하기
    https://create-react-app.dev/docs/importing-a-component/
*/
import { authService } from 'fbase';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
    console.log(authService.currentUser);
    return (
        <>
            <Router isLoggedIn={isLoggedIn} />
            <footer>&copy; Nwitter {new Date().getFullYear()}</footer>
        </>
    );
}

export default App;
