const WaveElement = () => {
    
    return (
      <div className={`absolute bottom-0 z-0 left-0 w-full h-[250px] 2xl:h-[300px]`}>
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#2b77c4"
            d="M0,160 Q120,80 240,160 T480,160 T720,160 T960,160 T1200,160 T1440,160 V320 H0 Z"
          ></path>
        </svg>
      </div>
    )
}
export default WaveElement;
