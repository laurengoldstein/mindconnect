import React,{ useState} from 'react';
import Error404View from './Error404View';
import "./EditProfileView.css";
 
function EditProfileView(props){
   let [input, setInput] = useState({});
   let [newIndicator, setNewIndicator] = useState("");

    let tracking = [];


    function handleChange(event){
        let{name, value} = event.target;
        setInput(input => ({...input, [name]: value}))
        console.log(tracking)
       
    }

    function handleSubmit(event){
        event.preventDefault();
        //Insert previous data for input fields that were left empty
        let modifiedProfile={...input};
        modifiedProfile.tracked_items_id = [];
       for(let e in tracking){
          let tracked_obj = props.indicators.find(t => t.indicator === tracking[e])
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
       if(isChecked){
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
        fetch("/tracked_items", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({indicator: newIndicator, user_id: props.user.id})
          })
          // Continue fetch request here
          .then((res) => {
            res.json()
            .then((json)=> {
              props.setIndicators(json)
            })})
          .catch(error => {
            console.log(`Server error: ${error.message}`)
          })
        }

    return(
        <div className="d-flex flex-column mx-5 py-5">
            <h2 className="blue">Edit profile:</h2> 
            <form onSubmit={e=> handleSubmit(e)}>
                <div className="mb-2">
                    <label className="blue">First name:<input className="form-control" type="text" name="firstName" defaultValue={props.user.firstName || ""} onChange={handleChange}/></label>
                </div>
                <div className="mb-2">
                    <label className="blue">Last name:<input className="form-control" type="text" name="lastName" defaultValue={props.user.lastName || ""} onChange={handleChange}/></label>
                </div>
                <div className="mb-2">
                    <label className="blue">Email:<input className="form-control" type="text" name="email" defaultValue={props.user.email || ""} onChange={handleChange}/></label>
                </div>
                <div className="mb-2"> 
                    <label className="blue">Password:<input className="form-control" type="password" name="password" defaultValue={props.user.password || ""} onChange={handleChange}/></label>
                </div>

            <h3 className="blue" >Currently tracking:</h3>
            <ul className="trackingList">
                
                {props.indicators &&
                    props.indicators.map((ti) => (
                        <li key={ti.id}>
                        <input className="form-check-input me-2" type="checkbox" name={ti.indicator} id={ti.indicator} onChange={e=> changeIndicators(e)}/>
                        {ti.indicator}
                        </li>
                    ))
                }
            </ul>
                <label className="d-flex justify-conent-between mb-4" id="add-button"><button className="me-2" id="add-button" type="button" onClick={e => handleSubmitIndicator(e)}>+</button><input className="form-control" type="text" placeholder="Add new indicator" 
                defaultValue={newIndicator} onChange={e => handleChangeIndicator(e)}/></label>
    
                <div className="d-flex justify-content-center">
                    <button type="submit" className="submit-button button">Save changes</button>
                </div>
            </form>
        </div>
    )
}

export default EditProfileView;

