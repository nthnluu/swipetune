import {motion, useAnimation} from "framer"
import {useEffect} from "react";
import CrossfadeImage from "react-crossfade-image";

const BlurryImageBackground = ({image, children}) => {
    const controls = useAnimation()

    useEffect(() => {
        controls.start({
            backgroundImage: `url(${image})`,
            transition: {duration: 3},
        })

    }, [image])
    return <div className="h-screen dark:bg-gray-900 bg-black text-white">
        <div className="z-50 relative h-screen overflow-auto"
             style={{backdropFilter: "blur(98px)", "WebkitBackdropFilter": "blur(98px)"}}>
            {children}

        </div>
        <div className="absolute top-0">
            <CrossfadeImage src={image}
                            style={{height: '100%', width: '100%'}}
                            containerClass="absolute top-0 h-screen w-screen opacity-75"/>
        </div>
    </div>
}

export default BlurryImageBackground