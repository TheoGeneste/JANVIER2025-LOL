import { Container } from "react-bootstrap";
import video from '../assets/lol-video.mp4';
import logo from '../assets/logo-lol.webp';
import nexus2 from '../assets/nexus2.avif';
import nexus from '../assets/nexus.webp';
const HomePage = () => {

    return <div>
        <div style={{position: "relative", width: "100%", height: "90vh", overflow: "hidden"}}>
            <video id="banner-video" autoPlay muted loop style={{position: "relative"}}>
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <img src={logo} style={{position : "absolute", top: "45%", left: "50%", 
                transform: "translate(-50%,-50%)"}} />
        </div>
        <Container fluid className="d-flex flex-column justify-content-center align-items-center">
            <h2 style={{fontSize: "4rem"}}>Lol c'est quoi?</h2>
            <div className="col-6" style={{fontSize : "2rem" , textAlign : "justify"}}>League of Legends est un jeu de stratégie en équipe où deux équipes de cinq joueurs s'affrontent pour détruire le Nexus ennemi. Chaque joueur contrôle un champion unique et progresse sur la carte en éliminant des adversaires, en prenant des objectifs et en renforçant son personnage. Le jeu repose sur la coopération, la stratégie et la réactivité, faisant de LoL l'un des jeux les plus populaires et compétitifs au monde.</div>
        </Container>
        <h2 className="text-center mt-5" style={{fontSize: "4rem"}}>Le principe du jeu</h2>

        <Container fluid className="d-flex justify-content-start align-items-center">
                <img src={nexus2} className="col-6"/>
        </Container>
        <div className="text-center mt-5  d-flex justify-content-center " style={{fontSize: "2rem"}}>
            <p className="col-6">Le Nexus est le bâtiment principal de chaque équipe. Le but du jeu est de détruire le Nexus ennemi pour remporter la partie.</p>
        </div>
        <Container fluid className="d-flex justify-content-end align-items-center">
            <img src={nexus} className="col-6"/>
        </Container>
    </div>;
}
 
export default HomePage;