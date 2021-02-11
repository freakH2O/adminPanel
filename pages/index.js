import { FirestoreProvider,FirestoreCollection } from "@react-firebase/firestore";
import firebase from "firebase";
import Router from "next/router";
import {useState} from "react";

export default function Home() {


  const [nameField,changeName]=useState("");
  const [meaningField,changeMeaning]=useState("");
  const [search,changeSearch]=useState("");
  const [desc,changeDesc]=useState("");
  

  const firebaseConfig = {
    apiKey: "AIzaSyCTMdo9wDst1cz8tLwzbCol3zvUFm7vUhs",
    authDomain: "medical-fb57f.firebaseapp.com",
    projectId: "medical-fb57f",
    storageBucket: "medical-fb57f.appspot.com",
    messagingSenderId: "37193204132",
    appId: "1:37193204132:web:9161e8cc3f66e7c4dd4131",
    measurementId: "G-Y13CX020DW"
  };


    
  return (
    <FirestoreProvider {...firebaseConfig} firebase={firebase} >
        <FirestoreCollection path="/medical/" orderBy={[{field:"name",type:"asc"}]} >
      {d => 
      {
        return d.isLoading ? 
        
        <div> </div>:
         <div className="flex flex-wrap justify-center content-center h-auto"> {
        
          <div>

          <div className="grid grid-flow-row">
              <div className="flex flex-wrap grid grid-flow-col gap-4 justify-center content-center m-5">
                  <div className="flex flex-wrap grid grid-flow-row gap-4 justify-center content-center m-5">
                    <input placeholder="Enter Abbreviation" onChange={(e)=>{changeName(e.target.value)}} className="bg-gray-200 font-bold border-black border-2 h-12 w-72 text-xl pl-2"></input>
                    <input placeholder="Enter Meaning" onChange={(e)=>{changeMeaning(e.target.value)}} className="bg-gray-200 font-bold border-black border-2 h-12 w-72 text-xl pl-2"></input> 
                  </div>


            <div className="flex flex-wrap justify-center content-center">
              <button onClick={
                ()=>{

                  const db = firebase.firestore();
                  var medical = db.collection("medical").doc();
                            
                  medical.set({
                    name:nameField,
                    meaning:meaningField,
                    id:medical.id
                  }).then(()=>{
                  console.log("added");
                  ///Router.replace("/");
                  });

                }
              
                } className="bg-yellow-500 pl-24 pr-24 h-24 rounded-md text-2xl font-bold">Add</button>
            </div>

              </div>
              
                <div className="grid grid-flow-col">
                    <textarea value={desc} onChange={(e)=>{changeDesc(e.target.value)}} placeholder="Enter New Promotions Description" className="pl-5 pt-5 pr-5 text-xl font-bold mb-5 h-48 bg-gray-300 rounded-md"></textarea>
                    <button onClick={
                      ()=>{

                        const db = firebase.firestore();
                        var info = db.collection("info").doc('info');
                
                        info.set({
                          "info":desc
                        }).then(()=>{
                            changeDesc("");
                            console.log("updated");
                            Router.replace("/");
                            });
                
                      }
                    } className="rounded hover:bg-gray-700 hover:text-white bg-blue-500 mb-5 text-xl text-white font-bold" >Update Description</button>
                
                </div>

              <input onChange={(e)=>{changeSearch(e.target.value)}} placeholder="Enter Search Abbreviation" className="pl-5 text-xl font-bold mb-5 h-24 bg-gray-300 rounded-md"></input>
          
          </div>

          <table className="table-auto border-4 border-black p-10 ">
              <thead>
                <th>Name</th>
                <th>Meaning</th>
                <th></th>
                <th></th>
                
              </thead>
              <tbody>
            {d.value.map((doc) => (
              doc["name"].toLowerCase().includes(search.toLowerCase())?
              <tr>
                
              <td className="text-2xl p-5 font-extrabold">
                {doc["name"]}
              </td>

              <td className="overflow-hidden text-2xl pt-5 pb-5 pl-20 w-96 font-extrabold">
                <div className="w-96">{doc["meaning"]}</div>
              </td>
                  
              <td>
              <button onClick={()=>{
                    Router.push(
                      {
                        pathname:"/edit",
                        query:{
                          "id":doc["id"],
                          "name":doc["name"],
                          "meaning":doc["meaning"]
                        }
                      }
                    );
                  }} className="ml-6 mt-4 bg-blue-600 pt-3 text-white font-bold pl-5 pr-5 pb-3 rounded" >Edit</button>
              
              </td>

              <td>
              <button onClick={()=>{
                    const db = firebase.firestore();
                    var medical = db.collection("medical");
            
                    medical.doc(doc["id"]).delete().then(()=>{
                        console.log("deleted");
                        Router.replace("/");
                        });
                
                  }} className="ml-6  mt-4 bg-red-600 pt-3 text-white font-bold pl-5 mr-10 pr-5 pb-3 rounded" >Delete</button>
              
              </td>

            </tr>
                :
                <tr>
                
                <td >
                </td>
  
                <td >
              
                </td>
                    
                <td>
               
                </td>
  
                <td>
               
                </td>
  
              </tr>
               
              
            ))}
          </tbody>

          </table>
          
          </div>

          }</div>;
      }}
    </FirestoreCollection>
    </FirestoreProvider>
  )
}
