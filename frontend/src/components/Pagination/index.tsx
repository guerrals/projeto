import { useState } from "react";
import {
    CgChevronLeft,
    CgChevronRight,
    CgChevronDoubleRight,
    CgChevronDoubleLeft,
} from "react-icons/cg";

type PaginationProps = {
    count: number;
    getPage: (isNext: boolean) => Promise<void>;
};

export default function Pagination({ count, getPage }: PaginationProps) {
    const [pageNum, setPageNum] = useState(1);
    return (
        <div className="flex justify-between mt-2 text-[#646a6e]">
            <span className="mt-1">
                Mostrando{" "}
                <strong>
                    {(pageNum - 1) * 50}-{pageNum * 50}
                </strong>{" "}
                de <strong>{count}</strong> resultados
            </span>
            <div className="flex justify-center items-center">
                <button
                    className="px-2  rounded-full hover:scale-125"
                    onClick={async () => {
                        if (pageNum > 1) {
                            await getPage(false);
                            setPageNum(pageNum - 1);
                        }
                    }}
                >
                    <CgChevronDoubleLeft size={20} color="black" />
                </button>
                <button
                    className="px-2  rounded-full hover:scale-125 "
                    onClick={async () => {
                        if (pageNum > 1) {
                            await getPage(false);
                            setPageNum(pageNum - 1);
                        }
                    }}
                >
                    <CgChevronLeft size={20} color="black" />
                </button>
                <button className="w-8 h-8 rounded-full bg-[#646a6e] text-white transition-colors">
                    {pageNum}
                </button>
                <button
                    className="px-2  rounded-full hover:scale-125"
                    onClick={async () => {
                        if (pageNum < Math.ceil(count / 50)) {
                            await getPage(true);
                            setPageNum(pageNum + 1);
                        }
                    }}
                >
                    <CgChevronRight size={20} color="black" />
                </button>
                <button
                    className="px-2  rounded-full hover:scale-125"
                    onClick={async () => {
                        if (pageNum < Math.floor(count / 50)) {
                            await getPage(true);
                            setPageNum(pageNum + 1);
                        }
                    }}
                >
                    <CgChevronDoubleRight size={20} color="black" />
                </button>
            </div>
        </div>
    );
}
