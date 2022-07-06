import { useState } from 'react';
import './App.css';
import MyCart from './MyCart';
import prods from './MyDB';
import axios from 'axios';
import MyLogin from './MyLogin';

function App() {
    const [myProds, setmyProds] = useState(prods)
    const [price, setprice] = useState(0)
    const [desc, setdesc] = useState("")
    const [cart, setcart] = useState([])
    const SERVER_URL = 'http://localhost:3004/prods'
    const DJANGO ='http://127.0.0.1:8000/notes/'

    const addProduct = () => {
        setmyProds([...myProds, {
            "desc": desc,
            "price": price
        }])
    }
    const loadCart = async() => {
        setmyProds(await fetch(SERVER_URL).then(response => response.json()))

        // console.log(localStorage.getItem("cart"))
    }
    const delFromCart = (i) => {
        console.log(cart[i].desc)
        // setcart(cart.splice(i,1))
        setcart(cart.filter(x => x.desc !== cart[i].desc))
    }

    const add2Cart = (i) => {
        setcart([...cart, myProds[i]])
    }
    const addData2Sever = () => {
        const data = { desc: 'waga',price: 23 };
        fetch(SERVER_URL, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
const test=async()=>{
    axios.get(DJANGO)
    .then(function (response) {
      // handle success
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });
}


    return (
        <div className="App">
            <button onClick={()=>test()}>Test</button>
            <button onClick={() => addData2Sever()}>Add daata 2 server</button>
            <button onClick={() => loadCart()}>load</button>
            <MyCart del={delFromCart} cart={cart}></MyCart>
            <hr></hr>
            <button onClick={() => addProduct()}>Add</button>
            Price<input onChange={(e) => setprice(e.target.value)} />
            Desc:<input onChange={(e) => setdesc(e.target.value)} />
            {myProds.map((prod, ind) => <div key={ind}>
                {prod.price} {" "}
                {prod.desc}{" "}
                <button onClick={() => add2Cart(ind)}>Add to Cart</button>
            </div>)}
            <hr></hr>
            <MyLogin></MyLogin>
        </div>
    );
}

export default App;
