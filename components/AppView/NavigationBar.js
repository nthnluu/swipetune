import SessionContext from "../../lib/context/SessionContext";
import {useContext} from "react";

const NavigationBar = ({className}) => {
    const {profile} = useContext(SessionContext)

    return <div className={"p-4 flex justify-end items-center " + className}>
        <button className="p-2 rounded-lg hover:bg-frosted inline-flex justify-between items-center">
            <img src={profile.profile.images[0]['url']} className="h-8 w-8 shadow rounded-full border border-white mr-2"/>
            <span className="text-lg text-right">{profile.profile['display_name']}</span>
        </button>

    </div>
}

export default NavigationBar