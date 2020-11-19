const LoginView = () => {
    function signInSpotify() {
        window.location.href = 'https://accounts.spotify.com/authorize?client_id=b0507091c8dc4c41a62222a147fa2273&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fcallback'
    }

    return <div className="h-screen flex justify-start items-center">
        <div className="px-8 md:px-12 max-w-2xl">
            {/*<img src="https://i.scdn.co/image/ab67616d0000b2739f49ffe7fe94bdd0f2f98af2"*/}
            {/*     className="rounded-xl z-50 shadow-xl mx-auto mb-8"/>*/}
            {/*<h1 className="text-4xl font-bold">100 Degrees</h1>*/}
            {/*<h2 className="text-xl font-light">The Sailor • Rich Brian</h2>*/}
            <h1 className="text-3xl md:text-5xl font-bold title-case">Mixtapes for Any Mood</h1>
            <h2 className="text-xl font-light mt-2">Your place to easily discover music.
                Just swift right on a track to add it to your playlist, or swipe left to pass. Powered by Spotify.</h2>
            <button
                onClick={signInSpotify}
                className="py-2 px-4 text-xl border-2 rounded-lg border-white mt-6 hover:bg-white hover:text-black transition-color duration-150">
                <i className="fab fa-spotify mr-2"/>
                Continue with Spotify
            </button>
        </div>
    </div>
}

export default LoginView