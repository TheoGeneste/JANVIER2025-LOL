import { useEffect, useState } from "react";
import { Container, Form } from "react-bootstrap";
import ChampionService from "../Services/ChampionService";
import ChampionCard from "../Components/ChampionCard";
import { useParams } from "react-router-dom";

const ChampionsByTagPage = () => {
    const { tag } = useParams();
    const [champions, setChampions] = useState([]);
    const [filteredChampions, setFilteredChampions] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    const fetchChampions =async () => {
        try {
            const response = await ChampionService.fetchChampions();
            let championsTab = [];
            Object.entries(response.data.data).map(([key, value]) => {
                if (value.tags.includes(tag)) {
                    championsTab.push([key, value]);
                }
            });
            setChampions(championsTab);
            setFilteredChampions(championsTab);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    useEffect(() => {
        fetchChampions();
    }, [tag]);

    useEffect(() => {
        setFilteredChampions(champions.filter(([key, value]) => {
            return key.toLowerCase().includes(searchValue.toLowerCase());
        }));
    }, [searchValue]);

    return <Container fluid className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mt-5" style={{fontSize: "4rem"}}>Champions de type {tag}</h2>
        <Form className="col-10">
            <Form.Control type={"text"} className="p-2" placeholder="Rechercher un champion" value={searchValue}
            onChange={handleChange}/>
        </Form>
        <div className="d-flex col-10 mt-3 gap-4 flex-wrap justify-content-around">
            {filteredChampions.map(([key, value]) => {
                return <ChampionCard name={key} key={key}/>
            })}
        </div>
    </Container>;
}
 
export default ChampionsByTagPage;