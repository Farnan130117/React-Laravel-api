import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Http from '../Http';

export default function Edit(props) {

    const navigate = useNavigate();
    const [inputs,setInputs] = useState({});
    const {id} = useParams();

    useEffect(()=>{
        fetchUser()
    },[]);

    const fetchUser= () =>{
        Http.get('/users/'+id+'/edit').then((res)=>{
            setInputs({
                name:res.data.name,
                email:res.data.email,
            });
        });
    }


  return (
    <div>
            <h2>Edit User</h2>
            <div className="row">
                <div className="col-sm-6">
                    <div className="card p-4">
                        <label>Name</label>
                        {inputs.name}

                        <label>Email</label>
                        {inputs.email}
                    </div>
                </div>
            </div>
        </div>
  )
}
