import GraphCard from "../GraphCard";

export default function GraphContainer() {
    return (
        <div className="grid gap-6">
            <GraphCard
                title="Vulnerabilidade"
                subtitle="Quantidade de vulnerabilidade por gravidade"
                type="get_vulnerability_quantity_by_severity"
            />
            <GraphCard
                title="CVSS Média"
                subtitle="CVSS média por gravidade"
                type="get_vulnerability_mean_by_severity"
            />
        </div>
    );
}
