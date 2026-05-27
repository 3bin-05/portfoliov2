import ebImage from '../assets/eb.png';

interface KineticProfileProps {
  playClick?: () => void;
  playType?: () => void;
}

export function KineticProfile({ playClick, playType }: KineticProfileProps) {
  // Staggered durations for rows to create depth
  const rowDurations = [25, 32, 22, 28, 35, 24, 30];
  const repeatingText = "EBIN REJI EBIN REJI EBIN REJI EBIN REJI EBIN REJI ";

  return (
    <div className="relative flex justify-center items-center w-full max-w-2xl mx-auto min-h-[350px]">
      {/* Keyframe Injection for Kinetic Scroll */}
      <style>
        {`
          @keyframes kinetic-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      {/* Background Container for scrolling typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-full overflow-hidden flex flex-col justify-center z-[1] pointer-events-none">
        {/* Left Side Gradient Mask */}
        <div className="absolute top-0 bottom-0 left-0 w-[20%] z-[5] bg-gradient-to-r from-[var(--bg-primary)] to-transparent pointer-events-none transition-colors duration-500" />
        
        {/* Right Side Gradient Mask */}
        <div className="absolute top-0 bottom-0 right-0 w-[20%] z-[5] bg-gradient-to-l from-[var(--bg-primary)] to-transparent pointer-events-none transition-colors duration-500" />

        {/* Scrolling text rows */}
        <div className="flex flex-col py-4 select-none">
          {rowDurations.map((duration, index) => {
            const isReverse = index % 2 === 1;
            return (
              <div
                key={index}
                className="flex whitespace-nowrap overflow-hidden opacity-[0.09] dark:opacity-[0.05] font-sans font-black text-[1.6rem] md:text-[2.4rem] lg:text-[2.8rem] leading-[1.0] uppercase text-[var(--text-primary)] my-0.5 tracking-tighter"
              >
                <div
                  className="flex will-change-transform"
                  style={{
                    animation: `kinetic-scroll ${duration}s linear infinite ${isReverse ? 'reverse' : 'normal'}`,
                  }}
                >
                  <span className="pr-8">{repeatingText}</span>
                  <span className="pr-8">{repeatingText}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Foreground Container */}
      <div className="relative z-10 w-[180px] sm:w-[220px] md:w-[240px] lg:w-[260px] xl:w-[290px] mx-auto pointer-events-auto">
        <div 
          onClick={playClick}
          onMouseEnter={playType}
          className="relative transition-all duration-700 ease-out hover:scale-[1.03] cursor-pointer"
        >
          {/* Actual image */}
          <img
            src={ebImage}
            alt="Ebin Reji"
            className="w-full h-auto object-cover relative z-10"
          />
        </div>
      </div>
    </div>
  );
}
