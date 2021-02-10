import { router,useRouter, withRouter } from 'next/router'
import React from "react";
import {FirestoreMutation} from "@react-firebase/firestore";
import firebase from "firebase";
import {useState} from 'react';





function edit(){

    const router = useRouter()

    var DocId=router.query.id
    var nama=router.query.name
    var meaninga=router.query.meaning

    console.log(router.query["id"]);

    const [id, setId] = useState(DocId);
    const [name, setName] = useState(nama);
    const [meaning, setMeaning] = useState(meaninga);


    function handleClick(){
        console.log(name);
        console.log(meaning);

        const db = firebase.firestore();
        var medical = db.collection("medical");

    medical.doc(id).set({
    name: name,
    meaning: meaning,
    id: id
     }).then(()=>{
         console.log("updated");
         router.replace("/");
        });

     
    }

    return (
        <div className="h-screen flex flex-wrap justify-center content-center bg-red-500">
            <div grid grid-flow-row>
 
                <div>
                    <input onChange={(e)=>{setName(e.target.value)}} placeholder={name} className="pt-5 pb-5 pl-2 text-2xl font-bold mb-5 w-45 md:w-96 rounded"></input>
                </div>
                
                <div>
                    <input onChange={(e)=>{setMeaning(e.target.value)}} placeholder={meaning} className="text-2xl font-bold pl-2 pt-5 pb-5 mb-5 w-45 md:w-96 flex-expand rounded"></input>
                </div>
 
                <button onClick={handleClick} className="text-xl text-center font-extrabold rounded p-5 bg-yellow-500">
                    ✓
                </button>


            </div>
        </div>
    )

}



export default withRouter(edit);