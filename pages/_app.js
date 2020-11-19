import '../styles/globals.css'
import {useEffect, useState} from "react";
import fb from "../lib/firebase";
import SessionContext from "../lib/context/SessionContext";
import BackgroundImageContext from "../lib/context/BackgroundImageContext";
import dynamic from "next/dynamic";
const BlurryImageBackground = dynamic(() => import("../components/BlurryImageBackground"), {
    ssr: false,
});

function MyApp({Component, pageProps}) {
    const [session, setSession] = useState({status: 'LOADING', userId: undefined})
    const [bgImage, setBgImage] = useState("https://source.unsplash.com/random")
    const [darkened, toggleBgDarkened] = useState(true)
    useEffect(() => {
        fb.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                fb.firestore().collection('users').doc(user.uid).get()
                    .then((doc) =>
                        setSession({status: 'IN', userId: user, profile: doc.data()}))
                    .catch(() => setSession({status: 'OUT', userId: undefined}))
            } else {
                // User is signed out.
                setSession({status: 'OUT', userId: undefined})
            }
        });
    }, [])

    function adaptViewport() {
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }

    useEffect(() => {
        adaptViewport()
        window.addEventListener('resize', adaptViewport);
    }, [])


    return <SessionContext.Provider value={session}>
        <BackgroundImageContext.Provider value={{setImage: (img) => setBgImage(img), toggleBgDarkened: (state) => toggleBgDarkened(state)}}>
            <BlurryImageBackground image={bgImage} darkened={darkened}>
                <Component {...pageProps} />
            </BlurryImageBackground>
        </BackgroundImageContext.Provider>
    </SessionContext.Provider>
}

export default MyApp
