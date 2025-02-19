import { useEffect, useState } from "react";
import { Badge, Container } from "react-bootstrap";
import { useLocation, useParams } from "react-router-dom";
import ItemService from "../Services/ItemService";
import ItemCard from "../Components/ItemCard";

const ItemDetailsPage = () => {
    const { name } = useParams();
    const location = useLocation();
    const [item, setItem] = useState({});
    const [items, setItems] = useState([]);

    const fetchItems = async () => {
        try {
            const response = await ItemService.fetchItems();
            setItems(Object.entries(response.data.data));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchItems();
    }, [])

    useEffect(() => {
        setItem(location.state);
    }, [location]);

    function removeTags(str) {
        if (str) {
            return str.replace(/<[^>]*>/g, '').trim();
        } else {
            return "";
        }
    }

    console.log(item);



    return <Container className="d-flex flex-column align-items-center justify-content-center">
        <h2 style={{ fontSize: "4rem" }}>{item.name}</h2>
        <div className="d-flex col-10 justify-content-between">
            <div className="col-5">
                {item.image && <img variant="top" width="80%" src={"https://ddragon.leagueoflegends.com/cdn/15.3.1/img/item/" + item.image.full} />}
            </div>
            <div className="col-5 d-flex flex-column align-items-center">
                <h2 style={{ fontSize: "2rem" }}>Description</h2>
                <p>{removeTags(item.description)}</p>
                <p>{item.plaintext}</p>
                <h2 style={{ fontSize: "2rem" }}>Gold</h2>
                <p>Base: {item.gold ? item.gold.base : 0}</p>
                <p>Total: {item.gold ? item.gold.total : 0}</p>
                <p>Vente: {item.gold ? item.gold.sell : 0}</p>
                <div className="d-flex flex-wrap gap-2">
                    {item.tags && item.tags.map((tag, index) => {
                        return <Badge key={index} className="tag p-3" style={{ fontSize: "1rem" }}>{tag}</Badge>
                    })}
                </div>
            </div>
        </div>
        <h2 style={{fontSize: "3rem"}}>Statistiques</h2>
        {item.stats && <div className="d-flex mt-5 flex-wrap gap-2 col-10 justify-content-around">
            {Object.entries(item.stats).map((stat, index) => {
                return <Badge key={index} className="tag p-3">{stat[0]}: {stat[1]}</Badge>
            }
            )}
        </div>
        }
        {item.into && <>
            <h2 style={{ fontSize: "3rem" }} className="mt-3 mb-3">Se transforme en</h2>
            <div className="d-flex flex-wrap gap-2 col-10 justify-content-around">
                {items.map((currentItem, index) => {
                    if (item.into.includes(currentItem[0])) {
                        return <ItemCard key={index} item={currentItem[1]} />
                    }
                })}
            </div>
        </>}
    </Container>;
}

export default ItemDetailsPage;