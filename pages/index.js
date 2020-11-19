import LoginView from "../components/LoginView";
import SessionContext from "../lib/context/SessionContext";
import LoadingSpinner from "../components/LoadingSpinner";
import {useContext, useEffect, useState} from "react";
import dynamic from "next/dynamic";
const AppView = dynamic(() => import("../components/AppView"), {
    ssr: false,
});

const loadingComponent = <div className="h-screen w-screen flex justify-center items-center">
    <LoadingSpinner className="h-24 w-24 transform scale-50"/></div>

export default function Home() {
    const {status, profile} = useContext(SessionContext)
    const [currentComponent, setCurrentComponent] = useState(loadingComponent)

    useEffect(() => {
        // Change the view depending on auth state
        switch (status) {
            case ('LOADING'):
                setCurrentComponent(loadingComponent)
                break
            case ('IN'):
                setCurrentComponent(<AppView/>)
                break
            case ('OUT'):
                setCurrentComponent(<LoginView/>)
                break
            default:
                setCurrentComponent(loadingComponent)
                break
        }

    }, [status])
    return currentComponent
}
