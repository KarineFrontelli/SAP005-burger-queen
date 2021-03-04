import React, {useHistory} from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Header from "../../Components/Header";



const Orders = () =>{
  
  // const back = useHistory();
  // function BackPage() {
  //   back.push("/welcome");
  // };

  return(
    <>
      <header>
        <Header />
      </header>
      <div>
        {/* <IconButton className="btn-back">
          <ArrowBackIcon onClick={BackPage} />
        </IconButton> */}
        <h2>Pedidos prontos</h2>
         
      </div>
    </>
  )
  
  
};

export default Orders;