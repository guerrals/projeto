import { SetStateAction, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

type DropdownProps = {
    setGraphMode: React.Dispatch<SetStateAction<null>>;
};

export default function Dropdown({ setGraphMode }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <button onClick={() => setIsOpen(!isOpen)} className="absolute p-4 ">
            <BsThreeDotsVertical />
            <div
                className={`${
                    isOpen ? "" : "hidden"
                } top-5  w-36  bg-white shadow-md mt-1 rounded transition-opacity`}
            >
                <ul className="text-left border rounded">
                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                        Teste 1
                    </li>
                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                        Teste 2
                    </li>
                    <li className="px-4 py-1 hover:bg-gray-100 border-b">
                        Teste 3
                    </li>
                </ul>
            </div>
        </button>
    );
}
