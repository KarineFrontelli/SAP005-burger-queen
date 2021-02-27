import React , {useState, useEffect}from "react";



const OptionsBurguer = () =>{

    const token = localStorage.getItem("token");
    const [lunch, setlunch] = useState("");
    const [Duplo, setDuplo] = useState("");
          
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
        const Duplo = lunch.filter((item) => item.sub_type === "hamburguer");
        setDuplo(Duplo);
        console.log(lunch);
    });
    }, []);
    
        
  return(
    <div>
        <h4>Hambúrguer Duplo</h4>
        <div>
            {Duplo &&
          Duplo.map(({index , price, flavor, complement}) => (
            <div key={index}className="container-itens-lunch">
              <p>{flavor}</p>
              <p>{complement}</p>
              <h6>R${price},00</h6>
            </div>))}
        </div>      
    </div>
  )
  
  
};

export default OptionsBurguer;