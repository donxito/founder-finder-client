

const Card: React.FC<{ children: React.ReactNode, bg?: string }> = ({ children, bg = "bg-slate-700" }) => {
    // Render a div with specified background color, padding, rounded corners, and shadow
    return <div className={`${bg} p-6 rounded-lg shadow-lg`}>{children}</div>;
};

export default Card;