import React,{useState} from "react";
import {useSelector,useDispatch} from "react-redux"
import {Actions} from "../Store/Store";
import css from "../common.module.css"

const NewPlayer = () => {
    //////useDispatch area
    const dispatch = useDispatch();
    //////////useSelector area
    const form = useSelector(state => state.formValue);
    const errors = useSelector(state => state.formError)

    ////////////method area
    const onSubmit=(e)=>{
        e.preventDefault();
        console.log(Object.keys(form));
        let errors={};
        Object.keys(form).forEach((res)=>{
            if (!Boolean(form[res])){
                errors[res]=`${res} is required`
            } 
         
        })
        dispatch(Actions.setFormErros(errors));
        console.log(errors);
        !Object.keys(errors).length && dispatch(Actions.onSubmitForm(form));
    }
    return (
        <div className={css.containerBorder}>
    <form name="palyerForm" onSubmit={onSubmit} noValidate >
                <div className={css.formControl}>
                    <input type="text" className={ !errors.firstName ? css.success_bottom : css.error_bottom} name="firstName" value={form.firstName} onChange={(e) => dispatch(Actions.playerForm(e))}placeholder="First Name"/>
            {errors.firstName && errors.firstName}
        </div>
                <div className={css.formControl}>
                    <input type="text" name="lastName" className={!errors.lastName ? css.success_bottom : css.error_bottom} value={form.lastName} onChange={(e) => dispatch(Actions.playerForm(e))}placeholder="Last Name"/>
             {errors.lastName && errors.lastName}

        </div>
                <div className={css.formControl}>
                    <input type="number" 
                    name="height"
s                      id="h8" 
                      className={!errors.height ? css.success_bottom : css.error_bottom}
                       value={form.height} 
                        onChange={(e) => dispatch(Actions.playerForm(e))} 

                        placeholder="Height"/>
            {errors.height && errors.height}

        </div>
                <div className={css.formControl}>
                    <select name="position" className={!errors.position ? css.success_bottom : css.error_bottom} value={form.position} onChange={(e) => dispatch(Actions.playerForm(e))}>
               <option value="" >select postions</option>
                <option value="Point Guard">Point Guard</option>
                <option value="Shooting Guard">Shooting Guard</option>
                <option value="Small Forward">Small Forward</option>
                <option value="Power Forward">Power Forward</option>
                <option value="Center">Center</option>

            </select>
            {errors.position && errors.position}

        </div>
                <button type="submit" className={css.submitButton}>Submit</button>
    </form>
        </div>
    );
}

export default NewPlayer;