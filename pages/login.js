import {useRouter} from "next/router";
import {useEffect} from "react";
import fb from "../lib/firebase";
import LoadingSpinner from "../components/LoadingSpinner";
import LoginView from "../components/LoginView";

const Login = () => {
    const router = useRouter()
    const {token} = router.query

    useEffect(() => {
        if (token) {
            // Check if a Firebase token was passed as a URL param
            fb.auth().signInWithCustomToken(token)
                .then((user) => {
                    router.push('/')
                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }, [token])

    return token ? <div className="h-screen flex justify-center items-center w-full">
        <LoadingSpinner className="h-24 w-24 transform scale-50"/>
    </div> : <LoginView/>
}

export default Login