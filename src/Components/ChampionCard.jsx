import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ChampionCard = ({name}) => {
    const navigate = useNavigate();
    
    return <>
    <Card style={{ width: '18rem' }} onClick={() => {navigate("/champion/"+name)}}>
      <Card.Img variant="top" src={"https://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+name+"_0.jpg"} />
      <Card.Body>
        <Card.Title className="text-center" style={{fontSize : "2rem"}}>{name}</Card.Title>
    </Card.Body>
    </Card>
    </>;
}
 
export default ChampionCard;