import { useEffect, useState } from 'react';
import Router from 'components/Router';
/*
    🤷‍♂️ 파일 Absolute imports 설정하기
    https://create-react-app.dev/docs/importing-a-component/
*/
import { authService } from 'fbase';

function App() {
    const [init, setInit] = useState(false);
    const [userObj, setUserObj] = useState(null);

    useEffect(() => {
        authService.onAuthStateChanged((user) => {
            // console.log(user, !!user);
            if (user) {
                setUserObj({
                    displayName: user.displayName,
                    uid: user.uid,
                    updateProfile: (args) => user.updateProfile(args),
                });
            } else {
                setUserObj(null);
            }
            setInit(true);
            refreshUser;
        });
    }, []);
    // setInterval(() => {
    //     console.log(authService.currentUser);
    // }, 2000);

    const refreshUser = () => {
        const user = authService.currentUser;
        setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            updateProfile: (args) => user.updateProfile(args),
        });
    };

    return (
        <>
            {init ? (
                <Router isLoggedIn={userObj} userObj={userObj} refreshUser={refreshUser} />
            ) : (
                'Initializing...'
            )}
            {/* <footer>&copy; Nwitter {new Date().getFullYear()}</footer> */}
        </>
    );
}

export default App;
