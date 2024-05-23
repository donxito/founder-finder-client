

const Card: React.FC<{ children: React.ReactNode, bg?: string }> = ({ children, bg = "bg-zinc-300" }) => {
    // Render a div with specified background color, padding, rounded corners, and shadow
    return <div className={`${bg} p-6 rounded-lg shadow-md`}>{children}</div>;
};

export default Card;