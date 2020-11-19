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

    return <SessionContext.Provider value={session}>
        <BackgroundImageContext.Provider value={setBgImage}>
            <BlurryImageBackground image={bgImage}>
                <Component {...pageProps} />
            </BlurryImageBackground>
        </BackgroundImageContext.Provider>
    </SessionContext.Provider>
}

export default MyApp
