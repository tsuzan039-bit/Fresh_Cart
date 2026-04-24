"use client"
import { addToCard } from '@/actions/cart.actions';
import { addToWishlist } from '@/actions/wishlist.actions';
import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'
import { toast } from 'sonner';
import { CartContext } from '@/context/CartContext';
import { WishlistContext } from '@/context/WishlistContext';
import { useSession } from 'next-auth/react';

export default function AddBtn({
  classes,
  word,
  id,
  type = "cart",
}: {
  classes: string
  word: string
  id: string
  type?: "cart" | "wishlist"
}) {
  const { numberOfCartItems, setnumberOfCartItems } = useContext(CartContext)
  const { wishlistIds, setWishlistIds } = useContext(WishlistContext)
  const { status } = useSession()

  async function handleClick() {
    if (status === "unauthenticated") {
      toast.error("Please login first🚫", { position: "top-center" })
      return
    }

    try {
      if (type === "cart") {
        const res = await addToCard(id)
        if (res.status === "success") {
          toast.success(res.message, { position: "top-center", duration: 2000 })
          setnumberOfCartItems(numberOfCartItems + 1)
        } else {
          toast.error(res.message, { position: "top-center", duration: 2000 })
        }
      } else if (type === "wishlist") {
        const res = await addToWishlist(id)
        if (res.status === "success") {
          toast.success(res.message, { position: "top-center", duration: 2000 })
          setWishlistIds([...wishlistIds, id])
        } else {
          toast.error(res.message, { position: "top-center", duration: 2000 })
        }
      }
    } catch (err) {}
  }

  return (
    <Button
      onClick={(e) => {
        e.preventDefault()
        handleClick()
      }}
      className={classes}
    >
      {word}
    </Button>
  )
}