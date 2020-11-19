import NavigationBar from "./NavigationBar";
import {sampleData} from "../../lib/sampleData";
import {useContext, useEffect, useState, useMemo, useRef} from "react";
import {motion} from 'framer';
import BackgroundImageContext from "../../lib/context/BackgroundImageContext";
import styles from '../../styles/AppView.module.css'

const AppView = () => {
    const [currentTrack, setCurrentTrack] = useState(0)
    const tracks = useMemo(() => sampleData.tracks.filter(track => track.preview_url), [])
    const data = tracks[currentTrack]
    const [audio, setAudio] = useState(undefined)
    const bgImgContext = useContext(BackgroundImageContext)

    useEffect(() => {
        // fb.auth().signOut()
        // Whenever the currentTrack changes, update the page data
        if (data) {
            bgImgContext.setImage(data.album.images[0].url)
            playAudio()
        }
    }, [currentTrack])

    function swipeHandler(direction) {
        console.log(direction)
        if (direction === "left" || direction === "ArrowLeft") {
            return navigateBackwards()
        } else if (direction === "right" || direction === "ArrowRight") {
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
        bgImgContext.toggleBgDarkened(false)

        if (audio) {
            audio.pause()
            setAudio(newAudio)
            newAudio.play()
        } else if (force) {
            setAudio(newAudio)
            newAudio.play()
        }
    }
    function stopAudio() {
        if (audio) {
            audio.pause()
            setAudio(undefined)
            bgImgContext.toggleBgDarkened(true)
        }

    }

    return <div className="full-height flex justify-center items-center">
        <NavigationBar className="fixed top-0 w-full"/>
        {data && <div className="px-4 text-center">
            <motion.img animate={audio ? {scale: 1, opacity: 1} : {scale: 0.75, opacity: 0.75}}
                        src={data.album.images[0].url} className="rounded-xl mx-auto"/>

            <h1 className="text-2xl md:text-4xl font-bold text-center mt-6 truncate">{data.name}</h1>
            <h2 className="text-lg md:text-2xl opacity-75 font-light text-center mt-2 truncate">
                {`${data && data.album.name} • ${data.artists[0].name}`}</h2>
            <div className="flex justify-center space-x-6 items-center mt-6">
                <button className={styles.circleButton}
                        onClick={navigateBackwards}
                >
                    <svg className={styles.circleButtonIcon}
                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <button className={styles.circleButton} onClick={() => audio ? stopAudio() : playAudio(true)}>
                    {audio ? <svg
                        className={styles.circleButtonIcon}
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg> :<svg
                        className={styles.circleButtonIcon}
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>}

                </button>
                <button className={styles.circleButton}
                        onClick={navigateForward}>
                    <svg
                        className={styles.circleButtonIcon}
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
            </div>
        </div>}
    </div>

}

export default AppView