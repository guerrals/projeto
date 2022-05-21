import Navitem from "../Navitem";
import { FaArrowRight } from "react-icons/fa";
import { AiFillAppstore } from "react-icons/ai";

import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const [togglePage, setTogglePage] = useState(1);
    return (
        <nav
            className={`${
                isOpen ? "w-40" : "w-20"
            } absolute left-0 top-0 duration-300 h-screen bg-main z-20 shadow-lg shadow-gray-900`}
        >
            <div className="p-1">
                <div
                    className="grid place-items-center h-7 absolute rounded-r-xl -right-5 top-4  bg-h1 hover:bg-hover"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="ml-1 mr-1">
                        <FaArrowRight color="white" size={12} />
                    </div>
                </div>
                <figure>
                    <img
                        className="p-2"
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.a6QCiJUlTtcyDRr24M9IDAHaE6%26pid%3DApi&f=1"
                        alt="placeholder"
                    />
                </figure>
            </div>
            <div
                className={` relative ${
                    togglePage === 1 ? "bg-[#3f474b]" : ""
                }`}
                onClick={() => setTogglePage(1)}
            >
                <Navitem
                    icon={<AiFillAppstore size={24} color="white" />}
                    text="Dashboard"
                    path="/"
                />
                {togglePage === 1 && (
                    <div className="absolute w-2 h-full -right-2 -top-0 bg-white"></div>
                )}
            </div>
            <div
                className={`relative ${togglePage === 2 ? "bg-[#3f474b]" : ""}`}
                onClick={() => setTogglePage(2)}
            >
                <Navitem
                    icon={<AiFillAppstore size={24} color="white" />}
                    text="Table"
                    path="table"
                />
                {togglePage === 2 && (
                    <div className="absolute w-2 h-full -right-2 -top-0  bg-white"></div>
                )}
            </div>
        </nav>
    );
}
