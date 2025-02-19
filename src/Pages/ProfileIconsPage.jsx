import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import IconsService from "../Services/IconsService";

const ProfileIcons = () => {
    const [icons, setIcons] = useState([]);

    const fetchIcons = async () => {
        try {
            const response = await IconsService.fetchIcons();
            setIcons(Object.entries(response.data.data));       
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchIcons();
    }, []);

    return <Container fluid className="d-flex flex-column justify-content-center align-items-center">
        <h2 className="text-center mt-5" style={{fontSize: "4rem"}}>Profile Icons</h2>
        <div className="d-flex flex-wrap gap-3 col-10 justify-content-around">
            {icons.map(([key, value]) => {
                return <img width="250" key={key} src={`https://ddragon.leagueoflegends.com/cdn/15.3.1/img/profileicon/${key}.png`}/>
            })}
        </div>
    </Container>;
}
 
export default ProfileIcons;