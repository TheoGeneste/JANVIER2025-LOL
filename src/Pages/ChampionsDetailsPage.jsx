import { useParams } from "react-router-dom";

const ChampionDetailsPage = () => {
    const {name} = useParams();

    return <>
        <h2 style={{fontSize : "4rem"}}>{name}</h2>
    </>;
}
 
export default ChampionDetailsPage;