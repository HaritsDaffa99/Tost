"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Icons from "./Icons";
import Link from "next/link";
import { Menu } from "@prisma/client";

export function UserMenuCard(menu: Menu) {
    const [toggleAddToCart, setToggleAddToCart] = useState(true);
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        if (amount == 0) {
            setToggleAddToCart(true);
        }
    }, [amount]);

    return (
        <div className="flex flex-col max-w-sm p-5 border-2 rounded-lg hover:border-gray-300">
            <Image
                className="rounded-md"
                // src="https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80"
                src={menu.imageURL}
                alt="Product"
                width={300}
                height={300}
            />

            <p className="mt-3 font-semibold text-lg">{menu.name}</p>
            <p className="mb-2">
                {" "}
                RM{amount == 0 ? menu.price : menu.price * amount}
            </p>

            <div className="flex gap-2">
                {toggleAddToCart ? (
                    <span
                        onClick={() => {
                            setToggleAddToCart(false);
                            setAmount(1);
                        }}
                        className="cursor-pointer h-10 bg-custom-orange text-white w-full p-2 rounded 
                                flex items-center justify-center gap-2 hover:opacity-90 hover:rounded-none"
                    >
                        <Icons.ShoppingCart size={18} />
                        <span className="text-sm">Add to cart</span>
                    </span>
                ) : (
                    <div className="flex flex-row h-10 w-full rounded relative bg-transparent">
                        <button
                            onClick={() => {
                                if (amount > 0) setAmount(amount - 1);
                            }}
                            className=" bg-gray-200 text-gray-600 active:bg-gray-300 h-full w-20 rounded-l cursor-pointer"
                        >
                            <span className="w-full text-2xl font-semibold text-custom-orange">
                                −
                            </span>
                        </button>
                        <span className="flex items-center w-full justify-center bg-gray-200 font-semibold text-lg">
                            {amount}
                        </span>
                        <button
                            onClick={() => {
                                setAmount(amount + 1);
                            }}
                            className="bg-gray-200 text-gray-600 active:bg-gray-300 h-full w-20 rounded-r cursor-pointer"
                        >
                            <span className="w-full h-fit text-2xl font-semibold text-custom-orange">
                                +
                            </span>
                        </button>
                    </div>
                )}

                <Link
                    className="h-10 bg-gray-800 text-white w-10 p-2 rounded 
                                flex items-center justify-center hover:opacity-90 hover:rounded-none"
                    href={`/user/menu/${menu.id}`}
                >
                    <Icons.Info />
                </Link>
            </div>
        </div>
    );
}
