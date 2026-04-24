// "use client"

// import { createContext, useEffect, useState } from "react";
// export const CartContext =createContext();
// import React from 'react'
// import { getLoggedUserCart } from '@/actions/cart.actions';

// export default function CartContextProvider({children}) {
//     const [numberOfCartItems, setnumberOfCartItems] = useState(0)

// try{
//     async function getUserCart(){
// const res =await  getLoggedUserCart( )
// console.log("context from carttt" ,res.data.product);

// let sum =0;
// res.data.product.forEach((product)=>{
//     sum +=product.count
// })
// // console.log(sum);

// setnumberOfCartItems(sum)
//  }


// }
//  catch(err){console.log(err.message);
//  } 
//  useEffect(()=>{ 
//     getUserCart()
// },[])
 
 
//     return (

    
// <CartContext.Provider value={{numberOfCartItems,setnumberOfCartItems}}>


// {children}

// </CartContext.Provider>  )
// }




"use client"

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { getLoggedUserCart } from "@/actions/cart.actions";
import { product } from "@/api/services/types/cart.type";

export const CartContext = createContext({numberOfCartItems :0, setnumberOfCartItems   (num:number){}});

export default function CartContextProvider({ children }:{ children : ReactNode}) {

  const  [numberOfCartItems, setnumberOfCartItems] = useState(0);

  async function getUserCart() {
    try {
      const res = await getLoggedUserCart();

      console.log("context from carttt", res.data.product);

      let sum = 0;
      res.data.product.forEach((product :product) => {
        sum += product.count;
      });

      setnumberOfCartItems(sum);

    } catch (err:unknown) {
      if(err instanceof Error){      console.log(err.message);
}
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfCartItems, setnumberOfCartItems }}>
      {children}
    </CartContext.Provider>
  );
}