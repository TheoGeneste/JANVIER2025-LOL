import { Container } from "react-bootstrap";
import SummonersService from "../Services/SummonersService";
import { useEffect, useState } from "react";
import SummonerCard from "../Components/SummonerCard";

const SummonersPage = () => {
    const [summoners, setSummoners] = useState([]);

    const fetchSummoners = async () => {
        try {
            const response = await SummonersService.fetchSummoners();
            setSummoners(Object.entries(response.data.data));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchSummoners();
    }, []);


    return <Container fluid className="d-flex flex-column justify-content-center align-items-center">
        <h2 style={{ fontSize: "4rem" }}>Summoners</h2>
        <div className="col-10 d-flex flex-wrap justify-content-around gap-3">
            {summoners.map(([key, value]) => {
                return <SummonerCard summoner={value} key={key} />
            })}
        </div>
    </Container>;
}

export default SummonersPage;