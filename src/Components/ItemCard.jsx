import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ItemCard = ({item}) => {
    const navigate = useNavigate();
    
    return <>
    <Card style={{ width: '10rem' }} onClick={() => {navigate("/item/"+item.name)}}>
      {item.image && <Card.Img variant="top" src={"https://ddragon.leagueoflegends.com/cdn/15.3.1/img/item/"+item.image.full} />}
      <Card.Body>
        <Card.Title className="text-center" style={{fontSize : "1rem"}}>{item.name}</Card.Title>
    </Card.Body>
    </Card>
    </>;
}
 
export default ItemCard;