import { useParams } from "react-router-dom";
import ChampionService from "../Services/ChampionService";
import { useEffect, useState } from "react";
import { Badge, Carousel, Container, OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap";
import Spell from "../Components/Spell";
import CanvasJSReact from '@canvasjs/react-charts';


const ChampionDetailsPage = () => {
    const { name } = useParams();
    const [champion, setChampion] = useState({});
    const [stats, setStats] = useState([]);

    const CanvasJS = CanvasJSReact.CanvasJS;
    const CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const options = {
        animationEnabled: true,
        exportEnabled: false,
        theme: "dark2",
        backgroundColor: "transparent", // "light1", "dark1", "dark2"
        title: {
            text: "Statistiques"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}",
            startAngle: -90,
            dataPoints: stats
        }],

    }

    const fetchChampionByName = async () => {
        try {
            const response = await ChampionService.fetchChampionByName(name);
            setChampion(response.data.data[name]);
            console.log(response.data.data[name]);

            let statsTab = [];
            Object.entries(response.data.data[name].stats).map((stat) => {
                statsTab.push({ label: stat[0].toUpperCase(), y: stat[1] });
            })



            setStats(statsTab);
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
            {champion.tags &&
                <div style={{ position: "absolute", fontSize: "2rem", top: "80vh", left: "80vw", color: "white", textAlign: "justify" }}>
                    {champion.tags.map((tag, index) => {
                        return <Badge key={index} className="m-1 p-3 tag">{tag}</Badge>
                    })}
                </div>}
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
        <div className="d-flex col-10 mt-3 justify-content-between">
            <div className="d-flex flex-column align-items-center col-5 mt-3">
                <CanvasJSChart options={options} />
            </div>

            <div className="col-5 mt-3">
                <h2 style={{ fontSize: "3rem" }} className="text-center">Infos</h2>

                <h2 style={{ fontSize: "2rem" }}>Difficulté</h2>
                <ProgressBar striped variant="success" now={champion.info && champion.info.difficulty * 10} />
                <h2 style={{ fontSize: "2rem" }} className="mt-3">Defense</h2>
                <ProgressBar striped variant="info" now={champion.info && champion.info.defense * 10} />
                <h2 style={{ fontSize: "2rem" }} className="mt-3">Attaque</h2>
                <ProgressBar striped variant="warning" now={champion.info && champion.info.attack * 10} />
                <h2 style={{ fontSize: "2rem" }} className="mt-3">Magie</h2>
                <ProgressBar striped variant="danger" now={champion.info && champion.info.magic * 10} />
            </div>
        </div>
        <div className="d-flex col-10 mt-3 justify-content-between">
            <div className="col-5 d-flex flex-column align-items-center">
                <h2 style={{ fontSize: "2rem" }}>Tips pour les alliés</h2>
                {champion.allytips && champion.allytips.map((tip, index) => {
                    return <Badge key={index} bg="success" className="m-1 p-3" style={{ fontSize: "0.8rem" }}>{tip}</Badge>
                })}
            </div>
            <div className="col-5 d-flex flex-column align-items-center">
                <h2 style={{ fontSize: "2rem" }}>Tips pour les ennemis</h2>
                {champion.enemytips && champion.enemytips.map((tip, index) => {
                    return <Badge key={index} bg="danger" className="m-1 p-3" style={{ fontSize: "0.8rem" }}>{tip}</Badge>
                })}
            </div>
        </div>
        <div className="col-10 mt-5 mb-5">
            <Carousel >
                {champion.skins && champion.skins.map((skin, index) => {
                    return <Carousel.Item key={index} >
                        <img className="d-block w-100" src={"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + name + "_" + skin.num + ".jpg"} alt={skin.name} />
                        <Carousel.Caption>
                            <h3>{skin.name}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                })}
            </Carousel>
        </div>

    </Container>;
}

export default ChampionDetailsPage;