
export const Landing = () => {
    return <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex justify-center p-5">
                <img
                className="max-w-150" 
                src="./chess.jpeg" />
            </div>
            <div className="flex flex-col justify-center gap-4">
                <div className="text-[2rem] text-white font-bold flex flex-wrap justify-center">
                    Play Chess Online on the #3 Site
                </div>
                <div className="flex justify-center">
                <button className=" py-3 px-6 text-2xl hover:bg-blue-700 font-bold bg-green-600 text-white border-2 border-black rounded-md">
                    Play Online
                </button>
                </div>
            </div>

        </div>
    </div>
}