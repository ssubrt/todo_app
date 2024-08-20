import { useState } from "react"





const CreateTodo = () => {

  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  return (
    <div>
        <input type="text" placeholder="title" 
        onChange={(e)=> {
          const value = e.target.value
        }}
        className="border border-black  p-2 m-10"
        ></input>
        <br/>
        <input type="text" placeholder="description"
         className="border border-black p-2 m-10"
        ></input>
        <br/>

        <button className="p-5 m-10 bg-orange-400 border rounded-md" 
        onClick={()=>{
          fetch("http://localhost:3000/todos",{
            method:"POST",
            body:JSON.stringify({
              title:title,
              description:description
            }),
            headers: {
              "Content-Type":"application/json"
            }
          })
          .then(async function(res){
            const json = await(res.json());
            alert("Todo added")
          })
        }}
         > Add a Todo</button>
        


    </div>
  )
}

export default CreateTodo