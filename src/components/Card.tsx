

const Card: React.FC<{ children: React.ReactNode, bg?: string }> = ({ children, bg = "bg-zinc-300" }) => {
    return <div className={`${bg} p-6 rounded-lg shadow-md`}>{children}</div>;
};

export default Card;