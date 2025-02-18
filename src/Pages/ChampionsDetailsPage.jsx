import { useParams } from "react-router-dom";
import ChampionService from "../Services/ChampionService";
import { useEffect, useState } from "react";
import { Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import Spell from "../Components/Spell";

const ChampionDetailsPage = () => {
    const { name } = useParams();
    const [champion, setChampion] = useState({});

    const fetchChampionByName = async () => {
        try {
            const response = await ChampionService.fetchChampionByName(name);
            setChampion(response.data.data[name]);
            console.log(response.data.data[name]);

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchChampionByName();
    }, [name]);

    return <Container fluid className="d-flex flex-column align-items-center">
        <div style={{ position: "relative", width: "100vw" }}>
            <img style={{ position: "relative", top: 0, left: 0, width: "100vw", height: "90vh" }} src={"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + name + "_0.jpg"} alt="" />
            <h2 style={{ position: "absolute", fontSize: "4rem", top: "13vh", left: "10vw" }}>{champion.name}</h2>
            <div style={{ position: "absolute", fontSize: "3rem", top: "20vh", left: "10vw" }}>{champion.title}</div>
            <div style={{ position: "absolute", fontSize: "2rem", top: "30vh", left: "10vw", width: "50vw", color: "white", textAlign: "justify" }}>{champion.lore}</div>
        </div>
        <h2 style={{ fontSize: "4rem" }}>Compétences</h2>
        <div className="d-flex flex-row p-5 gap-5 justify-content-center border border-light rounded" style={{ width: "80vw", marginTop: "2vh" }}>
            {champion.spells && champion.spells.map((spell, index) => {
                return <Spell key={index} spell={spell} />
            })}
            <div className="d-flex flex-column align-items-center">
                {champion.passive && <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id={`tooltip-${champion.passive.name}`}>
                            <strong>{champion.passive.name}</strong>
                            <br />
                            {champion.passive.description}
                        </Tooltip>
                    }
                >
                    <div className="d-flex flex-column align-items-center">
                        <img width={100} src={"https://ddragon.leagueoflegends.com/cdn/15.3.1/img/passive/" + champion.passive.image.full} alt="" />
                        <h2 className="text-center">{champion.passive.name}</h2>
                    </div>
                </OverlayTrigger>}
            </div>
        </div>

    </Container>;
}

export default ChampionDetailsPage;