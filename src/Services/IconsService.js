import axios from "axios";

function fetchIcons() {
    return axios.get("https://ddragon.leagueoflegends.com/cdn/15.3.1/data/en_US/profileicon.json");
}

export default { fetchIcons };