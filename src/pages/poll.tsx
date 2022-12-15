import { useQuery } from "@tanstack/react-query";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { Poll } from "../interfaces/Poll";
import Api from "../libs/api";

export default function PollPage() {
    const params = useParams()
    const {data} = useQuery(['poll', params.id], async () => {
        const {data} = await Api.get<Poll>(`polls/${params.id}`)

        return data;
    })

    return <div>

        <div className="flex gap-2 border-b pb-4">
            <h1 className="flex-1 text-2xl uppercase">{data?.name}</h1>
            <NavLink to="ranking">Ranking</NavLink>
            <NavLink to="games">Jogos</NavLink>
        </div>
       
        <Outlet context={{poll: data}} />
    </div>
}