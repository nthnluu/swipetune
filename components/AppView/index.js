import NavigationBar from "./NavigationBar";
import {sampleData} from "../../lib/sampleData";
import {useContext, useEffect, useState, useMemo} from "react";
import {motion} from 'framer';
import BackgroundImageContext from "../../lib/context/BackgroundImageContext";
import TinderCard from 'react-tinder-card'

const AppView = () => {
    const [currentTrack, setCurrentTrack] = useState(0)
    const tracks = useMemo(() => sampleData.tracks.filter(track => track.preview_url), [])
    const data = tracks[currentTrack]
    const [audio, setAudio] = useState(undefined)
    const setBgImg = useContext(BackgroundImageContext)

    useEffect(() => {
        if (data) {
            setBgImg(data.album.images[0].url)
            playAudio()
        }
    }, [data])

    function swipeHandler(direction) {
        console.log(direction)
        if (direction === "left") {
            return navigateBackwards()
        } else if (direction === "right") {
            return navigateForward()
        }
    }

    function navigateForward() {
        setCurrentTrack(prevState => {
            let result
            if (prevState >= (tracks.length - 1)) {
                result = 0
            } else {
                result = prevState + 1
            }
            return result
        })
    }
    function navigateBackwards() {
        setCurrentTrack(prevState => {
            let result
            if (prevState === 0) {
                result = tracks.length - 1
            } else {
                result = prevState - 1
            }
            return result
        })
    }
    function playAudio(force = false) {
        const newAudio = new Audio(data['preview_url'])
        newAudio.loop = true

        if (audio) {
            audio.pause()
            setAudio(newAudio)
            newAudio.play()
        } else if (force) {
            setAudio(newAudio)
            newAudio.play()
        }
    }

    return <div className="h-screen flex justify-center items-center">
        <NavigationBar className="fixed top-0 w-full"/>
        {data && <div className="px-4 text-center">
            <TinderCard key={data} flickOnSwipe={false} onSwipe={swipeHandler}>
                <motion.img animate={audio ? {scale: 1, opacity: 1} : {scale: 0.75, opacity: 0.75}}
                            src={data.album.images[0].url} className="rounded-xl mx-auto shadow-xl"/>
            </TinderCard>

            <h1 className="text-4xl font-bold text-center mt-6">{data.name}</h1>
            <h2 className="text-2xl opacity-75 font-light text-center mt-2">{`${data && data.album.name} • ${data.artists[0].name}`}</h2>
            {!audio && <button className="px-6 mt-4 py-3 text-xl font-bold bg-frosted mx-auto rounded-lg"
                               onClick={() => playAudio(true)}>
                <i className="fas fa-play mr-2"/>Resume Playback
            </button>}
        </div>}


    </div>

}

export default AppView