import React from 'react'

const MyCart = (props) => {
    const saveCart=()=>{
        localStorage.setItem("cart",JSON.stringify( props.cart))
    }
   
  return (
    <div>{props.cart.length >0 && <div>
        {props.cart.map((prod, ind) => <div key={ind}>
                {prod.price} {" "}
                {prod.desc}{" "}
                <button onClick={()=>props.del(ind)} >remove</button>
            </div>)}
        </div>}
        <button onClick={()=>saveCart()}>Save</button>
        

    </div>
  )
}

export default MyCart