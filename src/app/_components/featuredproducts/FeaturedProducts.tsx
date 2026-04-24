import React from 'react'

import { FaRegStar } from "react-icons/fa";

import { FaStar } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { getAllProducts } from '@/api/services/product.service';
import ProductCard from '../productcard/ProductCard';
import Link from 'next/link';
import TitleFeaturedProducts from '../TitleFeaturedProducts/TitleFeaturedProducts';



 export default async function FeaturedProducts() {




const allProducts = await getAllProducts()

// console.log("dataaa",allProducts);


 



  return (
<>


<div className="flex w-[90%] mx-auto flex-wrap   ">

    {allProducts?.map((product) => (
            <Link href={`/productdetails/${product.id}`} key={product.id} className='p-2 w-full lg:w-1/4 xl:w-1/5 '>

    <ProductCard  product={product} /></Link>
    
      
      
     ) )}

</div>

</>  )}

