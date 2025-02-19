import { Container } from "react-bootstrap";

const Game = () => {
    // UseState champion -> qui va etre le champion selectionné aléatoirement 
    // useState search -> qui va etre le champion recherché par l'utilisateur

    // function qui vien chercher tout les champions de l'api puis 
    // venir en selectionner un aléatoirement


    // function handleSubmit qui va vérifier le champion tape par l'utilisateur
    // avec le champion selectionné aléatoirement

    // useEffect qui va appeler la fonction de selection du champion

    return <Container fluid className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mt-5" style={{fontSize: "4rem"}}>Game</h2>
        {/* Avoir l'image d'un des spell de notre champion selectionné aléatoirement */}
        {/* Form pour l'input de recherche */}
    </Container>;
}
 
export default Game;