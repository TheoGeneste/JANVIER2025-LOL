import axios from "axios";

function fetchChampions(){
    return axios.get('https://ddragon.leagueoflegends.com/cdn/15.3.1/data/fr_FR/champion.json')
}

function fetchChampionByName(name){
    return axios.get(`https://ddragon.leagueoflegends.com/cdn/15.3.1/data/fr_FR/champion/${name}.json`)
}

export default {
    fetchChampions,
    fetchChampionByName
}