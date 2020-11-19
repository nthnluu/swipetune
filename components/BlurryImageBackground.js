const BlurryImageBackground = ({image, children}) => {
    return  <div className="h-screen dark:bg-gray-900 bg-black text-white">
        <div className="z-50 relative h-screen overflow-auto"
             style={{backdropFilter: "blur(98px)"}}>
            {children}

        </div>

        <img
            className="absolute top-0 h-screen w-screen opacity-75"
            src={image} alt=""/>
    </div>
}

export default BlurryImageBackground