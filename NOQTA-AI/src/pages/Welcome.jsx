export default function Welcome() {
    return (
        <div className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#9D8FFF] to-[#8B6EFF] text-white font-sora relative overflow-hidden p-4 sm:p-6">

            { /* skip button */}
            <button className="absolute top-4 right-4 sm:top-6 sm:right-6 text-xs sm:text-sm font-semibold z-10">Skip</button>

            { /* Decorative shaped images/backgrounds */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Blob shape 1 - top left */}
                <div className="absolute top-20 left-10 w-32 h-32 sm:w-40 sm:h-40 bg-white/10 rounded-full blur-2xl"></div>

                {/* Blob shape 2 - top right */}
                <div className="absolute top-32 right-16 w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-full blur-3xl"></div>

                {/* Triangle shape 1 - mid left */}
                <div
                    className="absolute top-60 left-8 sm:left-16 w-24 h-24 sm:w-36 sm:h-36 opacity-10"
                    style={{
                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                        background: 'linear-gradient(135deg, #fff, #8B5CF6)'
                    }}
                ></div>

                {/* Diamond shape - mid right */}
                <div
                    className="absolute top-72 right-12 sm:right-20 w-24 h-24 sm:w-32 sm:h-32 opacity-10"
                    style={{
                        clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                        background: 'linear-gradient(135deg, #6366F1, #A78BFA)'
                    }}
                ></div>

                {/* Hexagon shape - center */}
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48 opacity-5"
                    style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                        background: 'linear-gradient(135deg, #fff, #c4b5fd)'
                    }}
                ></div>

                {/* Circle shape - bottom left */}
                <div className="absolute bottom-40 left-8 sm:left-20 w-16 h-16 sm:w-24 sm:h-24 bg-white/15 rounded-full blur-xl"></div>
            </div>

            { /*center content*/}
            <div className="flex flex-col items-center text-center mt-16 sm:mt-20 relative z-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Welcome to</h1>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mt-1 text-[#6366F1]">NOQTA-AI</h2>
                <p className="text-xs sm:text-sm md:text-base opacity-90 mt-2">Write. AI refines.</p>
            </div>

            { /*bottom block */}
            <div className="bg-[#7A5DFF] rounded-t-[40px] sm:rounded-t-[60px] p-4 sm:p-6 md:p-8 text-center relative z-10">
                <p className="text-xs sm:text-sm md:text-base opacity-90">
                    Capture ideas.<br />
                    Let AI organize and expand them for you.
                </p>
            </div>
        </div>
    );
}
