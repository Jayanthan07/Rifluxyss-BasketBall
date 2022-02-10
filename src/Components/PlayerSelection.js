import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Actions } from "../Store/Store";
import css from "../common.module.css"


const PlayerSelection = () => {
    //////useState area
    const [playersOptions, setPlayersOptions] = useState([]);
    const [uniqueArr,setUniqueArr]=useState([]);

    //////useDispatch
    const dispatch = useDispatch();

    ///////useSelector
    const players = useSelector(state => state.players);
    const teamSelection=useSelector(state=>state.teamSelection);

    //////////useEffect
    useEffect(() => {
        if (players.length) {
            setPlayersOptions(players);
        }
    }, [players])
    useEffect(() => { setUniqueArr([]) }, [teamSelection])


    /////////method area
    const uniqueCheck=(player,index)=>{
      let result=  teamSelection.some((r, i) => { if (player && index !== i) { return r.player == player } });
  let unique=uniqueArr;
  unique.push(result)
      return result;
    }
    const onSubmitTeam=(e)=>{
        e.preventDefault();
        let sample = uniqueArr.some(res=> res == true );
        sample&&alert("select unique player");
        !sample && alert ("your data saved succesfully");

      console.log(sample);

    }
    return (<div className={css.containerBorder}>
        <form onSubmit={onSubmitTeam}>
            {teamSelection.map((res,index)=>
            <>
                <div className={css.playerFormControl}> 
            <div>
                    <select className={!uniqueCheck(res.player, index) ? css.success_bottom : css.error_bottom} value={res.player} onChange={(e) => dispatch(Actions.choosePlayer({value:e.target.value,index}))}>
                    <option value="">Select player</option>
                    {playersOptions.map(res => <option value={res.firstName}>{res.firstName}</option>)}
                    </select>
            </div>
            <div>
                    <select className={css.success_bottom} value={res.position} name="positions">
                    <option value="" >select positions</option>
                    <option value="Point Guard">Point Guard</option>
                    <option value="Shooting Guard">Shooting Guard</option>
                    <option value="Small Forward">Small Forward</option>
                    <option value="Power Forward">Power Forward</option>
                    <option value="Center">Center</option>

                </select>

            </div>
                </div>
                </>
            )}
            <button type="submit" className={css.submitButton}>Submit</button>


        </form>

    </div>);
}

export default PlayerSelection;