import { useNavigate } from "react-router-dom"
import { Button } from "../components/Button";

export const Landing = () => {
    const navigate = useNavigate();
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
                <Button
                onClick={() => navigate("/game")}
                >
                    Play Online
                </Button>
                </div>
            </div>

        </div>
    </div>
}