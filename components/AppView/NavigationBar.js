import SessionContext from "../../lib/context/SessionContext";
import {useContext} from "react";

const NavigationBar = ({className}) => {
    const {profile} = useContext(SessionContext)

    return <div className={"py-8 md:py-4 px-4 flex justify-center md:justify-between items-center " + className}>
        <button className="p-2 rounded-lg hover:bg-frosted inline-flex justify-between items-center">
            <span>December 2020</span>
            <svg
                className="h-6 w-6 text-white ml-2"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 9l-7 7-7-7" />
            </svg>
        </button>

        <button className="p-2 hidden rounded-lg hover:bg-frosted md:inline-flex justify-between items-center">
            <img src={profile.profile.images[0]['url']} className="h-8 w-8 rounded-full border border-frosted mr-2"/>
        </button>

    </div>
}

export default NavigationBar