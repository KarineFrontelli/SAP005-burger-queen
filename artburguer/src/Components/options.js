import React , {useState, useEffect}from "react";



const Options = () =>{

   
        const token = localStorage.getItem("token");
        const [lunch, setlunch] = useState("");
          
        useEffect(() => {
            fetch("https://lab-api-bq.herokuapp.com/products", {
            method: "GET",
            headers: {
            accept: "application/json",
            Authorization: `${token}`,
            },
        })
        .then((response) => response.json())
        .then((json) => {
            const lunch = json.filter((item) => item.type === "all-day");  
            setlunch(lunch);
        });
        }, []);
        
    
    function buttonSelected(event){
      let button = event.target.value;
      console.log(button) 
    };

    function confirm(){
        
        console.log()
    };
    

  return(
      <div>
         <div>
             <p>Opções de Hambúrguer</p>
             <div>
                 <button type="submit" value="carne" onClick={(()=>lunch.filter((item) => item.flavor === "carne"? console.log(item.id): null))}>Hambúrguer de carne</button>
                 <button type="submit" value="frango" onClick={(()=>lunch.filter((item) => item.flavor === "frango"))}>Hambúrguer de frango</button>
                 <button type="submit" value="vegetariano" onClick={buttonSelected}>Hambúrguer vegetariano</button>
             </div>
         </div>
         <div>
             <p>Adicionais</p>
             <div>
                 <button type="submit" value="queijo" onClick={(()=>lunch.filter((item) => item.complement === "queijo"? console.log(item): null))}>Queijo</button>
                 <button type="submit" value="ovo" onClick={(()=>lunch.filter((item) => item.complement === "ovo"))}>Ovo</button>
                 <button type="submit" value="null" onClick={(()=>lunch.filter((item) => item.complement === "null"))}>Nenhum</button>
             </div>
             <div><button type="submit" onClick={confirm}>Confirmar</button></div>
         </div>
      </div>
  )
  
  
};

export default Options;