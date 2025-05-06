import { Link, useParams } from "react-router-dom";
import { DashboardParams } from "../../interfaces/IDashboardParams.ts";

type NewSpeakerCardProps = {
    previousPage: "dashboard" | "speaker",
}

const NewSpeakerCard = ({ previousPage }: NewSpeakerCardProps) => {
    const params = useParams<DashboardParams>();
    return (
        <div className="w-full min-h-64">
            <Link
                to={`/project/${params.projectId}/speaker/new?previous=${["dashboard", "speaker"].includes(previousPage) ? previousPage : "dashboard"}`}
                className="bg-gray-800 rounded-lg shadow-md transition-transform hover:scale-105 w-full h-full flex items-center justify-center text-6xl text-white"
            >
                +
            </Link>
        </div>
    );
};

export default NewSpeakerCard;