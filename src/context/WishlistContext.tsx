"use client"

import React, { createContext, ReactNode, useEffect, useState } from "react";
import { getLoggedUserWishlist } from "@/actions/wishlist.actions";

export const WishlistContext = createContext({
  wishlistIds: [] as string[],
  setWishlistIds: (ids: string[]) => {}
});

export default function WishlistContextProvider({ children }: { children: ReactNode }) {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  async function getUserWishlist() {
    try {
      const res = await getLoggedUserWishlist();
      if (res.status === "success") {
        setWishlistIds(res.data.map((product: any) => product._id));
      }
    } catch (err: unknown) {
      if (err instanceof Error) console.log(err.message);
    }
  }

  useEffect(() => {
    getUserWishlist();
  }, []);

  return (
    <WishlistContext.Provider value={{ wishlistIds, setWishlistIds }}>
      {children}
    </WishlistContext.Provider>
  );
}