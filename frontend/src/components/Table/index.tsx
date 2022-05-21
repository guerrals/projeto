import { api } from "../../services/api";
import { vulnerability } from "../../types/types";

type TableProps = {
    vulnerabilities: vulnerability[];
    isLoading: boolean;
};
export default function Table({ vulnerabilities, isLoading }: TableProps) {
    async function updateVulnerability(id: string, update: boolean) {
        const formData = new FormData();
        if (update) {
            formData.append("is_fixed", "false");
        } else {
            formData.append("is_fixed", "true");
        }
        await api.patch(`vulnerabilities/${id}/`, formData);
        window.location.reload();
    }
    return (
        <>
            {isLoading ? (
                <div className="flex-none grow" />
            ) : (
                <table className="w-full">
                    <thead className="bg-[#f9fafb] border-2 border-gray-200">
                        <tr>
                            <th className="p-2 text-sm font-semibold tracking-wide text-left">
                                HOSTNAME
                            </th>
                            <th className="p-2 text-sm font-semibold tracking-wide text-left">
                                IP ADDRESS
                            </th>
                            <th className="p-2 text-sm font-semibold tracking-wide text-left">
                                TITLE
                            </th>
                            <th className="p-2 text-sm font-semibold tracking-wide text-left">
                                SEVERITY
                            </th>
                            <th className="p-2 text-sm font-semibold tracking-wide text-left">
                                CVSS
                            </th>
                            <th className="p-2 text-sm font-semibold tracking-wide text-left">
                                PUBLICATION DATE
                            </th>
                            <th className="p-2 text-sm font-semibold tracking-wide text-left editable">
                                FIXED
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {vulnerabilities &&
                            vulnerabilities.map((vulnerability, key) => {
                                return (
                                    <tr
                                        key={key}
                                        className="border-2 border-[#d9d9da]"
                                    >
                                        <td className="px-3 text-sm text-[#646a6e]">
                                            {vulnerability.asset_hostname}
                                        </td>
                                        <td className="px-3 text-sm text-[#646a6e]">
                                            {vulnerability.asset_ip_address}
                                        </td>
                                        <td className="px-3 text-sm text-[#646a6e]">
                                            {vulnerability.vulnerability_title}
                                        </td>
                                        <td className="px-3 text-sm text-[#646a6e]">
                                            {
                                                vulnerability.vulnerability_severity
                                            }
                                        </td>
                                        <td className="px-3 text-sm text-[#646a6e]">
                                            {vulnerability.vulnerability_cvss}
                                        </td>
                                        <td className="px-3 text-sm text-[#646a6e]">
                                            {
                                                vulnerability.vulnerability_publication_date
                                            }
                                        </td>
                                        <td className="px-3 text-sm text-[#646a6e]">
                                            {vulnerability.is_fixed ? (
                                                <button
                                                    className="flex place-items-center p-2  h-6 w-6 rounded-full bg-green-500  ease-linear text-white"
                                                    onClick={async () =>
                                                        await updateVulnerability(
                                                            vulnerability.id,
                                                            vulnerability.is_fixed
                                                        )
                                                    }
                                                ></button>
                                            ) : (
                                                <button
                                                    className="flex place-items-center p-2  h-6 w-6 rounded-full bg-red-500  ease-linear text-white"
                                                    onClick={async () =>
                                                        await updateVulnerability(
                                                            vulnerability.id,
                                                            vulnerability.is_fixed
                                                        )
                                                    }
                                                ></button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            )}
        </>
    );
}
