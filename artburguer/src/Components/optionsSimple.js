import React , {useState, useEffect}from "react";



const OptionsSimple = () =>{

   
        const token = localStorage.getItem("token");
        const [lunch, setlunch] = useState("");
        const [Simples, setSimples] = useState("");
          
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
            const Simples = lunch.filter((item) => item.name === "Hambúrguer simples");
            setSimples(Simples);
        });
        }, []);
        
    
    
    // const Carne = (lunch)=>{
    //     lunch.filter((item)=> item.flavor === 'carne' ? item : null)
    // } 
    // const Queijo = (Carne)=>{
    //     Carne.filter((item)=> item.complement === 'queijo' ? console.log(item) : null)
    // } 
    // console.log(Queijo)
    
        
  return(
    <div>
        <h4>Hambúrguer simples</h4>
        <div>
            {Simples &&
          Simples.map(({id , price, flavor, complement}) => (
            <div key={id}className="container-itens-lunch">
              <p>{flavor}</p>
              <p>{complement}</p>
              <h6>R${price},00</h6>
            </div>))}
        </div>  
    </div>
  )
  
  
};

export default OptionsSimple;