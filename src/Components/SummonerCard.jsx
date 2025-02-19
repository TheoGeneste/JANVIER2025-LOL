import { Card } from "react-bootstrap";

const SummonerCard = ({summoner}) => {
    return <>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={"https://ddragon.leagueoflegends.com/cdn/15.3.1/img/spell/"+summoner.id+".png"} />
      <Card.Body>
        <Card.Title className="text-center" style={{fontSize : "2rem"}}>{summoner.name}</Card.Title>
        <Card.Body>
            <Card.Text className="text-center" style={{fontSize : "1rem"}}>{summoner.description}</Card.Text>
        </Card.Body>
    </Card.Body>
    </Card>
    </>;
}
 
export default SummonerCard;