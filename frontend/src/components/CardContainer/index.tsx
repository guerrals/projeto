import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Card from "../Card";

export default function CardContainer() {
    const [fixedVulnerabilitiesQtd, setFixedVulnerabilitiesQtd] = useState(0);
    const [riskMean, setRiskMean] = useState(0);
    const [pendingVulnerabilities, setPendingVulnerabilities] = useState(0);

    async function loadCardsInformation() {
        try {
            const card_1_response = await api.get(
                `vulnerabilities/get_vulnerabilities_quantity`
            );
            const card_2_response = await api.get(
                `vulnerabilities/get_vulnerability_total_mean`
            );
            const card_3_response = await api.get(
                `vulnerabilities/get_vulnerability_pending_quantity`
            );

            setFixedVulnerabilitiesQtd(card_1_response.data);
            setRiskMean(card_2_response.data);
            setPendingVulnerabilities(card_3_response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadCardsInformation();
    }, []);

    return (
        <div className="flex justify-between gap-10 w-auto h-auto">
            <Card
                quantity={fixedVulnerabilitiesQtd.toString()}
                title="Vulnerabilidades"
                subtitle="Vulnerabilidades consertadas"
            />

            <Card
                quantity={riskMean.toPrecision(2)}
                title="CVSS"
                subtitle="CVSS média"
            />
            <Card
                quantity={pendingVulnerabilities.toString()}
                title="Vulnerabilidades"
                subtitle="Quantidade de vulnerabilidades pendente"
            />
        </div>
    );
}
