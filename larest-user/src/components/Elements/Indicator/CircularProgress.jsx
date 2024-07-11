export default function CircularProgress() {
    return (
        <div className="w-screen h-full z-50 fixed top-0 left-0 flex items-center justify-center bg-black/10">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <svg
                    className="w-12 h-12 animate-spin"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                    style={{ background: "none" }}
                >
                    <circle
                        cx="50"
                        cy="50"
                        fill="none"
                        strokeWidth="10"
                        r="35"
                        strokeDasharray="164.93361431346415 56.97787143782138"
                        transform="rotate(90 50 50)"
                        style={{
                            stroke: "rgb(34, 197, 94)",
                            strokeLinecap: "round",
                        }}
                    ></circle>
                </svg>
            </div>
        </div>
    )
}