import { useState } from "react";
import { GrDocumentUpload } from "react-icons/gr";
import { api } from "../../services/api";
type UploadButtonProps = {
    setIsUploading: React.Dispatch<React.SetStateAction<boolean>>;
    isUploading: boolean;
};
export default function UploadButton({
    setIsUploading,
    isUploading,
}: UploadButtonProps) {
    async function uploadCSV(event: React.ChangeEvent<HTMLInputElement>) {
        try {
            if (event.target.files) {
                setIsUploading(true);
                const formData = new FormData();
                formData.append("csv_file", event.target.files.item(0) as File);
                await api.post("vulnerabilities/", formData);
                setIsUploading(false);
            }
            window.location.reload();
        } catch (error) {
            setIsUploading(false);
            console.log(error);
        }
    }
    return (
        <>
            {isUploading ? (
                <div className="p-2 animate-spin h-6 w-6 rounded-full border-l-blue-500 border-4 ease-linear"></div>
            ) : (
                <div className="flex p-2 items-center h-full w-36 justify-around border-2 border-[#c0c1c2] rounded-md bg-white relative overflow-hidden hover:ring-1 hover:ring-offset-1 hover:ring-[#646a6e]">
                    <GrDocumentUpload color="#646a6e" />
                    <label
                        htmlFor="csv-file-input"
                        className=" border-1 border-[#646a6e] text-[#646a6e]"
                    >
                        Upload CSV
                    </label>
                    <input
                        className="absolute opacity-0 scale-150"
                        title="Escolha um arquivo CSV"
                        type="file"
                        name="file-input"
                        id="csv-file-input"
                        accept=".csv"
                        onChange={(event) => uploadCSV(event)}
                    />
                </div>
            )}
        </>
    );
}
