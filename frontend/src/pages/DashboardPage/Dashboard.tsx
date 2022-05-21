import CardContainer from "../../components/CardContainer";
import GraphContainer from "../../components/GraphContainer";

export default function DashboardPage() {
    return (
        <main className="grid gap-4 pt-20 pl-28 pr-10">
            <CardContainer />
            <GraphContainer />
        </main>
    );
}
