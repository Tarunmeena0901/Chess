export  const Button = ({onClick, children} : {onClick: () => void, children: React.ReactNode} ) => {
    return (
        <button 
        onClick={onClick}
        className=" py-3 px-6 text-2xl hover:bg-blue-700 font-bold bg-green-600 text-white border-2 border-black rounded-md">
           {children}
        </button>
    )
}