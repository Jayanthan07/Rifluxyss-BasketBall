import {createSlice,configureStore} from "@reduxjs/toolkit";


const defaultErrors = { firstName: "", lastName: "", height: 0, position: "" };
const teamSelection = [
    { player: "", position: "" }, 
    { player: "", position: "" },
     { player: "", position: "" },
      { player: "", position: "" },
       { player: "", position: "" }]

const initialState={
    formValue: { ...defaultErrors } ,
    formError: {},
players:[],
    teamSelection
};

const basketBall=createSlice({
    name:"player-profile",
    initialState,
    reducers:{
        ////this method for player information
        playerForm(state,actions){
            let e=actions.payload;
            const {name,value}=e.target;
            ///this portion is for removing error and adding errror
            if(value){
                let error = state.formError;
                delete error[name];
              state.formError = error;
               
            }
            else{
                let error = state.formError;
                error = { ...error, [name]: `${name} is required` };
                state.formError = error;
            }
            if(name == "position"){
               let val= state.players.some(res=>res.position == value);
                if(val){
               let error = state.formError;
                error = { ...error, [name]: `${value} already taken` };
                    state.formError = error;
                }

            }
            if(name == "height"){
                let check=new RegExp("-","g");
                let result =check.test(value);
                if (result) {
                    let error = state.formError;
                    error = { ...error, [name]: `negative value not allowed` };
                    state.formError = error;
                }


            }
            console.log(name,value);
            state.formValue[name]=value;
        },
        /////this method for gettting error in player form
        setFormErros(state,actions){
            state.formError=actions.payload

        },
        ///////this method for player form submit
        onSubmitForm(state,actions){
            
            let players=state.players;
            let newPlayer=actions.payload;
            players.push(newPlayer);
            state.players=players;
            state.formValue = { ...defaultErrors}
        },
        ///////this method for choosing player
        choosePlayer(state,actions){
            let datas=actions.payload;
            let team=state.teamSelection;
            const value=datas.value;
            let players = state.players;
            let toChoosePosition = players.filter(res => res.firstName == value)[0]["position"];
            team[datas.index][`player`] = value;
            team[datas.index][`position`] = toChoosePosition;
            state.teamSelection=team;
        }

    }
})

const Store = configureStore({
    reducer:basketBall.reducer
})
export const Actions=basketBall.actions;
export default Store;