import { Link } from "react-router-dom";

type NavitemProps = {
    icon: any;
    text: string;
    path: string;
};

export default function Navitem({ icon, text, path }: NavitemProps) {
    return (
        <nav>
            <Link
                className={`grid place-items-center relative justify-center bg-brand-main p-4 hover:bg-hover `}
                to={`${path}`}
            >
                {icon}
                {text && <p className="text-white text-sm">{text}</p>}
            </Link>
        </nav>
    );
}
