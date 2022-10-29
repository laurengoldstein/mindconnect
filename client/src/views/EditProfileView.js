import React,{useState} from 'react';
import { Link, useInRouterContext, useParams } from 'react-router-dom';
import Error404View from './Error404View';

 
function EditProfileView(props){
   let [input, setInput] = useState({});
    let tracking = [];
    props.user.tracked_items && props.user.tracked_items.forEach(e => tracking.push(e.indicator))

    function handleChange(event){
        let{name, value} = event.target;
        setInput(input => ({...input, [name]: value}))
    }

    function handleSubmit(event){
        event.preventDefault();
        //Insert previous data for input fields that were left empty
        let modifiedProfile={...input};
        if(!modifiedProfile.tracked_items){
            modifiedProfile.tracked_items = [];
            for(let i in props.user.tracked_items){
                modifiedProfile.tracked_items.push(props.user.tracked_items[i])
            }
        }
        for(let key in props.user){
            if(!Object.keys(modifiedProfile).includes(key)){
                modifiedProfile[`${key}`] = `${props.user[key]}`
            }
        }
        delete modifiedProfile.id
        props.updateProfile(modifiedProfile)
    }

    return(
        <div>
            <h2>Edit profile:</h2> 
            <form onSubmit={e=> handleSubmit(e)}>
                <label>First name:<input type="text" name="firstName" defaultValue={props.user.firstName || ""} onChange={handleChange}/></label>
                <label>Last name:<input type="text" name="lastName" defaultValue={props.user.lastName || ""} onChange={handleChange}/></label>
                <label>Email:<input type="text" name="email" defaultValue={props.user.email || ""} onChange={handleChange}/></label>
                <label>Password:<input type="password" name="password" defaultValue={props.user.password || ""} onChange={handleChange}/></label>
        
            <h3>Currently tracking:</h3>
            <ul className="trackingList">
                
                {props.indicators &&
                    props.indicators.map((ti) => (
                        <li key={ti.id}>
                        <input type="checkbox" defaultChecked={tracking.includes(ti.indicator) ? true : false} onChange={handleChange}/>
                        {ti.indicator}
                        </li>
                    ))
                }
            </ul>
            <div>
                <form>
                <label><input type="text" placeholder="Add new indicator"/></label>
                </form>
            </div>
            <button type="submit">Save changes</button>
            </form>

        </div>
    )
}

export default EditProfileView;

