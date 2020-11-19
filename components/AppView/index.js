import NavigationBar from "./NavigationBar";
import {sampleData} from "../../lib/sampleData";
import {useContext, useEffect, useState} from "react";
import BackgroundImageContext from "../../lib/context/BackgroundImageContext";

const AppView = () => {
    const [data, setData] = useState(sampleData.tracks[0])
    const setBgImg = useContext(BackgroundImageContext)

    useEffect(() => {
        setBgImg(data.album.images[0].url)
    }, [data])

    return <div className="h-screen flex justify-center items-center">
        <NavigationBar className="fixed top-0 w-full"/>
        <div className="px-4">
            <img src={data.album.images[0].url} className="rounded-xl mx-auto shadow-xl"/>
            <h1 className="text-4xl font-bold text-center mt-8">{data.name}</h1>
            <h2 className="text-2xl opacity-75 font-light text-center mt-2">{`${data.album.name} • ${data.artists[0].name}`}</h2>
            <button onClick={() => setData(sampleData.tracks[1])}>next</button>
        </div>


    </div>

}

export default AppView