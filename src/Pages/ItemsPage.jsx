import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import ItemCard from "../Components/ItemCard";
import ItemService from "../Services/ItemService";

const ItemsPage = () => {
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [search, setSearch] = useState('');

    const fetchItems = async () => {
        try {
            const response = await ItemService.fetchItems();
            setItems(Object.entries(response.data.data));
            setFilteredItems(Object.entries(response.data.data));
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        setFilteredItems(items.filter(([key, value]) => {
            return value.name.toLowerCase().includes(search.toLowerCase());
        }));
    }, [search]);

    return <Container fluid className="d-flex flex-column align-items-center">
        <h2 style={{fontSize: "4rem"}}>Items</h2>
        <Form className="col-10 mt-3 mb-3">
            <Form.Control type="text" placeholder="Chercher un item" value={search} onChange={handleChange} />
        </Form>
        <div className="d-flex justify-content-around gap-3 flex-wrap col-10">
            {filteredItems.map(([key, value]) => {
                return <ItemCard key={key} item={value} />
            })}
        </div>
    </Container>;
}
 
export default ItemsPage;