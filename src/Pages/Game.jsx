import { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import ChampionService from "../Services/ChampionService";
import { toast } from "react-toastify";
import Select from "react-select";

const Game = () => {
    // UseState champion -> qui va etre le champion selectionné aléatoirement 
    // useState search -> qui va etre le champion recherché par l'utilisateur
    const [champion, setChampion] = useState({});
    const [search, setSearch] = useState("");
    const [spell, setSpell] = useState({});
    const [attempt, setAttempt] = useState(3);
    const [points, setPoints] = useState(0);
    const [options, setOptions] = useState([]);
      
    // function qui vien chercher tout les champions de l'api puis 
    // venir en selectionner un aléatoirement
    const fetchChampions = async () => {
        try {
            // On vient chercher tout les champions
            const response = await ChampionService.fetchChampions();
            // On transforme l'objet en tableau
            const champions = Object.entries(response.data.data);

            let optionsTab = [];
            champions.map((champion) => {
                optionsTab.push({ value: champion[1].name, label: champion[1].name });
            })
            setOptions(optionsTab);
            // On selectionne un champion aléatoirement
            const randomChampion = champions[Math.floor(Math.random() * champions.length)];
            // On va chercher les informations du champion selectionné
            const responseBis = await ChampionService.fetchChampionByName(randomChampion[0]);
            // On set le champion selectionné
            setChampion(responseBis.data.data[randomChampion[0]]);
            // On recupère les spells du champion selectionné
            const spells = responseBis.data.data[randomChampion[0]].spells;
            // On selectionne un spell aléatoirement
            const randomSpell = spells[Math.floor(Math.random() * spells.length)];
            // On set le spell selectionné
            setSpell(randomSpell);
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (event) => {
        setSearch(event.target.value);
    }

    // function handleSubmit qui va vérifier le champion tape par l'utilisateur
    // avec le champion selectionné aléatoirement
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (search.toLowerCase() === champion.name.toLowerCase()) {
                toast.success("Bravo, tu as trouvé le champion !");
                setAttempt(3);
                setPoints(points + 1);
                fetchChampions();
            } else {
                if (attempt > 1) {
                    setAttempt(attempt - 1);
                }else{
                    toast.error("Dommage, ce n'est pas le bon champion !\nLe champion était : " + champion.name);
                    setAttempt(3);
                    setPoints(0);
                    fetchChampions();
                }
            }
            setSearch("");
        } catch (error) {
            console.error(error);
        }
    }
    // useEffect qui va appeler la fonction de selection du champion
    useEffect(() => {
        fetchChampions();
    }, []);

    return <div>
        <div style={{ position: "relative", width: "100%", height: "90vh", overflow: "hidden", objectFit: "cover" }}>
            <img width="100%" id="yasuo-img" style={{ position: "relative" }} alt="yasuo" src="https://wallpapercat.com/w/full/6/a/3/2136717-3840x2160-desktop-4k-high-noon-yasuo-wallpaper-image.jpg" />
            <div style={{ borderRadius: "25px", backgroundColor: "rgba(10, 20, 40, 0.40)", border: "1px solid #c8aa6e", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} className="d-flex flex-column justify-content-center align-items-center ps-5 pe-5 pt-3 pb-3">
                <h2 style={{ fontSize: "4rem" }} className="text-center">A qui est ce sort ?</h2>
                <h3 style={{ fontSize: "2rem" }} className="text-center">Serie de victoire : {points}</h3>
                <h3 style={{ fontSize: "2rem" }} className="text-center">Essaie restant {attempt}</h3>
                {/* Avoir l'image d'un des spell de notre champion selectionné aléatoirement */}
                {spell.image && <img width="150" style={{ filter: "grayscale(100%)" }} src={"https://ddragon.leagueoflegends.com/cdn/15.3.1/img/spell/" + spell.image.full} alt="" />}
                {/* Form pour l'input de recherche */}
                <Form onSubmit={handleSubmit} className="d-flex flex-column justify-content-center align-items-center mt-3 col-6">
                    <Select options={options} className="col-12" styles={{color: "white"}} />
                    <Button type="submit" className="mt-3 tag col-12">Valider</Button>
                </Form>
            </div>
        </div>

    </div>;
}

export default Game;