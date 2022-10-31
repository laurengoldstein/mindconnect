import React,{ useState} from 'react';
import Error404View from './Error404View';

 
function EditProfileView(props){
   let [input, setInput] = useState({});
   let [newIndicator, setNewIndicator] = useState("");

    let tracking = [];
    props.user.tracked_items && props.user.tracked_items.forEach(e => tracking.push(e.indicator))


    function handleChange(event){
        let{name, value} = event.target;
        setInput(input => ({...input, [name]: value}))
        console.log(props.user.tracked_items.find(t => t.indicator === "sleep quality"))
    }

    function handleSubmit(event){
        event.preventDefault();
        //Insert previous data for input fields that were left empty
        let modifiedProfile={...input};
        modifiedProfile.tracked_items_id = [];
        console.log(modifiedProfile)
        for(let e in tracking){
           let tracked_obj = props.user.tracked_items.find(t => t.indicator === tracking[e])
           modifiedProfile.tracked_items_id.push(tracked_obj.id)
        }
        for(let key in props.user){
            if(!Object.keys(modifiedProfile).includes(key)){
                modifiedProfile[`${key}`] = `${props.user[key]}`
            }
        }
        delete modifiedProfile.id
        props.updateProfile(modifiedProfile)
    }

    function changeIndicators(event){
       let isChecked = event.target.checked;
       if(isChecked && !tracking.includes(event.target.name)){
        tracking.push(event.target.name)
       } else if (!isChecked){
        tracking = tracking.filter(e => e !== event.target.name)
       }
       return tracking;
        }


    function handleChangeIndicator(event){
        setNewIndicator(event.target.value);
    }

    function handleSubmitIndicator(event){
        event.preventDefault();
        addIndicator();
        setNewIndicator("");
    }

    function addIndicator(){
        console.log(newIndicator)
        fetch("/tracked_items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({indicator: newIndicator})
          })
          // Continue fetch request here
          .then((res) => {
            res.json()
            .then((json)=> {
            console.log(json)
              props.setIndicators(json)
            })})
          .catch(error => {
            console.log(`Server error: ${error.message}`)
          })
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
                        <input type="checkbox" name={ti.indicator} id={ti.indicator} defaultChecked={tracking.includes(ti.indicator) ? true : false} 
                        onChange={e=> changeIndicators(e)}/>
                        {ti.indicator}
                        </li>
                    ))
                }
            </ul>
            <label><button type="button" onClick={e => handleSubmitIndicator(e)}>+</button><input type="text" placeholder="Add new indicator" 
                defaultValue={newIndicator} onChange={e => handleChangeIndicator(e)}/></label>
            <button type="submit">Save changes</button>
            </form>

        </div>
    )
}

export default EditProfileView;

