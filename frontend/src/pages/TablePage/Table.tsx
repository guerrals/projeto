import { SetStateAction, useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import Table from "../../components/Table";
import UploadButton from "../../components/UploadButton";
import { api } from "../../services/api";
import { vulnerability } from "../../types/types";

export default function TablePage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [nextPage, setNextPage] = useState<string>();
    const [previousPage, setPreviousPage] = useState<string>();
    const [count, setCount] = useState(0);
    const [vulnerabilities, setVulnerabilities] = useState<vulnerability[]>();

    async function loadVulnerabilitiesData() {
        try {
            setIsLoading(true);
            const response = await api.get("vulnerabilities/");
            setVulnerabilities(response.data["results"]);
            setCount(response.data["count"]);
            setNextPage(response.data["next"]);
            setPreviousPage(response.data["previous"]);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    async function getPage(isNext: boolean) {
        try {
            setIsLoading(true);
            const response = await api.get(
                `${isNext ? nextPage : previousPage}`
            );
            setVulnerabilities(response.data["results"]);
            setNextPage(response.data["next"]);
            setPreviousPage(response.data["previous"]);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    }

    useEffect(() => {
        loadVulnerabilitiesData();
    }, []);
    return (
        <div className="flex flex-col relative w-auto h-[83vh] rounded-md mt-24 px-10 pt-10 pb-2 bg-white ml-32 mr-10 ">
            <div className="flex justify-between mb-6 ">
                <Search
                    setVulnerabilities={setVulnerabilities}
                    setCount={setCount}
                    setNextPage={setNextPage}
                    setPreviousPage={setPreviousPage}
                />
                <UploadButton
                    setIsUploading={setIsUploading}
                    isUploading={isUploading}
                />
            </div>
            <div
                className="flex w-full grow overflow-scroll overflow-x-auto overflow-y-auto scroll-smooth resize-none
    scrollbar-thumb-gray-300
    scrollbar-track-transparent
    scrollbar-thin"
            >
                <Table
                    vulnerabilities={vulnerabilities as vulnerability[]}
                    isLoading={false}
                />
            </div>
            <Pagination getPage={getPage} count={count} />
        </div>
    );
}
