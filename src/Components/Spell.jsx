import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Spell = ({spell}) => {
    return  <OverlayTrigger
    placement="top"
    overlay={
      <Tooltip id={`tooltip-${spell.name}`}>
        <strong>{spell.name}</strong>
        <br />
        {spell.description}
      </Tooltip>
    }
  >
        <div className="d-flex flex-column align-items-center">
        {spell.image && <img width={100} src={"https://ddragon.leagueoflegends.com/cdn/15.3.1/img/spell/"+spell.image.full} alt="" />}
        <h2 className="text-center">{spell.name}</h2>
    </div>
    </OverlayTrigger>;
}
 
export default Spell;