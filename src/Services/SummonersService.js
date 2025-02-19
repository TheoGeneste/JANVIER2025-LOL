import axios from "axios";

function fetchSummoners() {
  return axios.get("https://ddragon.leagueoflegends.com/cdn/15.3.1/data/fr_FR/summoner.json");
}

export default { fetchSummoners };