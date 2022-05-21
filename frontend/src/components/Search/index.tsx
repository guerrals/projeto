import { SetStateAction, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { api } from "../../services/api";
import { vulnerability } from "../../types/types";

type SearchProps = {
    setVulnerabilities: React.Dispatch<
        SetStateAction<vulnerability[] | undefined>
    >;
    setCount: React.Dispatch<SetStateAction<number>>;
    setNextPage: React.Dispatch<SetStateAction<string | undefined>>;
    setPreviousPage: React.Dispatch<SetStateAction<string | undefined>>;
};

export default function Search({
    setVulnerabilities,
    setCount,
    setNextPage,
    setPreviousPage,
}: SearchProps) {
    const [search, setSearch] = useState<string>("");
    async function getSearchedResults() {
        try {
            if (search != "") {
                const response = await api.get(
                    `vulnerabilities/?search=${search}`
                );
                console.log(response.data);
                setVulnerabilities(response.data["results"]);
                setCount(response.data["count"]);
                setNextPage(response.data["next"]);
                setPreviousPage(response.data["previous"]);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex  focus-within:text-[#c7c7c7]">
            <div
                className="absolute w-5 h-5 ml-3 mt-3 
							pointer-events-none"
            >
                <BsSearch size={18} color="#c7c7c7" />
            </div>
            <input
                className="border-2 border-[#c7c7c7] text-[#c8c8c8] p-2 rounded-l-xl 
							pl-10
							pr-2
							font-semibold
							focus:outline-none
							focus:ring-1
							focus:ring-[#c7c7c7]
							"
                placeholder="Placeholder"
                type="text"
                onChange={(event) => setSearch(event.target.value)}
            />
            <button
                className="pl-4 h-full pr-2 rounded-tr-lg rounded-br-lg text-center w-auto bg-[#646a6e] text-[#e4e5e6] focus:outline-none
                focus:ring-2
                focus:ring-[#c7c7c7]"
                onClick={async () => await getSearchedResults()}
            >
                Buscar
            </button>
        </div>
    );
}
