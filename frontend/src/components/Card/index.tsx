type CardProps = {
    quantity: string;
    title: string;
    subtitle: string;
};

export default function Card({ quantity, title, subtitle }: CardProps) {
    return (
        <div className="flex items-center justify-between w-96 h-24 bg-white rounded-md p-5 shadow-md shadow-gray-300">
            <h1 className="font-semibold text-xl">{quantity}</h1>
            <div className="flex flex-col items-end">
                <h1 className="text-2xl text-h1">{title}</h1>
                <p className="text-sm text-p">{subtitle}</p>
            </div>
        </div>
    );
}
