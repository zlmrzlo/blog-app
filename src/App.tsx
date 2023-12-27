import { useEffect, useState } from "react";
import { app } from "firebaseApp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Router from "components/Router";
import Loader from "components/Loader";

export default function App() {
    const auth = getAuth(app);

    // auth를 체크하기 전에 (initialize 전)에는 loader를 띄워주는 용도
    const [init, setInit] = useState<boolean>(false);

    // firebase Auth가 인증되었으면 true로 변경해주는 로직 추가
    // auth의 currentUser가 있으면 authenticated로 변경
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        !!auth?.currentUser
    );

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
            setInit(true);
        });
    }, [auth]);

    return (
        <>
            <ToastContainer />
            {init ? <Router isAuthenticated={isAuthenticated} /> : <Loader />}
        </>
    );
}
