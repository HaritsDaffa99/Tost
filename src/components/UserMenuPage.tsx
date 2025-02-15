"use client";

import { CheckoutItem, Menu } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import Icons from "./Icons";
import { useState } from "react";

interface UserMenuProps extends Menu {
    createCheckout: (checkout: any) => void;
}

export function UserMenuPage({
    id,
    name,
    price,
    description,
    ingredients,
    calories,
    fats,
    imageURL,
    type,
    createCheckout,
}: UserMenuProps) {
    const [toggle, setToggle] = useState(true);
    const [amount, setAmount] = useState(0);

    return (
        <div className="flex flex-row gap-20 mt-4">
            <div className="flex-1">
                <Image
                    className="mx-auto rounded-2xl"
                    src={imageURL}
                    alt="Product"
                    width={600}
                    height={600}
                />
            </div>

            <div className="flex-1 mt-16 flex flex-col gap-2">
                <h3 className="font-medium text-lg">{type}</h3>
                <h1 className="font-semibold text-2xl mb-2">{name}</h1>
                <p>{description}</p>

                <div
                    onClick={() => setToggle(!toggle)}
                    style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1559239115-ce3eb7cb87ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1688&q=80)`,
                        backgroundPosition: "65% 15%",
                    }}
                    className="select-none my-4 h-36 border border-gray-200 rounded-lg p-6 pt-5 flex flex-col gap-2"
                >
                    <div className="flex justify-between">
                        {toggle ? (
                            <h3 className="font-semibold text-lg">Overview</h3>
                        ) : (
                            <h3 className="font-semibold text-lg">
                                Ingredients
                            </h3>
                        )}

                        <div className="flex items-center gap-2">
                            <input
                                onClick={() => setToggle(!toggle)}
                                checked={toggle}
                                id="1"
                                type="radio"
                                name="toggle"
                                // value="overview"
                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2"
                            />
                            <input
                                onClick={() => setToggle(!toggle)}
                                checked={!toggle}
                                id="2"
                                type="radio"
                                name="toggle"
                                // value="ingredients"
                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500  focus:ring-2 "
                            />
                        </div>
                    </div>

                    {toggle ? (
                        <div className="flex justify-between mt-2">
                            <div className="flex-1 flex items-center gap-2">
                                <Icons.ChefHat className="bg-[#15bf59] w-10 h-10 rounded-full p-1.5" />
                                <div>
                                    <p className="text-sm">Ingredients</p>
                                    <p className="text-xl font-semibold">
                                        {ingredients.split(",").length}
                                    </p>
                                </div>
                            </div>
                            <div className="flex-1 flex items-center gap-2">
                                <Icons.Flame className="bg-orange-500 w-10 h-10 rounded-full p-1.5" />
                                <div>
                                    <p className="text-sm">Calories</p>
                                    <p className="text-xl font-semibold">
                                        {calories}
                                    </p>
                                </div>
                            </div>
                            <div className="flex-1 flex items-center gap-2">
                                <Icons.Droplets className="bg-[#ffc954] w-10 h-10 rounded-full p-1.5" />
                                <div>
                                    <p className="text-sm">Fat</p>
                                    <p className="text-xl font-semibold">
                                        {fats}g
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>{ingredients}</p>
                    )}
                </div>

                <h2 className="font-semibold text-2xl mb-2">
                    RM{amount == 0 ? price : price * amount}
                </h2>

                <div className="flex justify-between">
                    <div className="custom-number-input h-10 w-48">
                        <div className="flex flex-row h-14 rounded-lg relative bg-transparent mt-1">
                            <button
                                onClick={() => {
                                    if (amount > 0) setAmount(amount - 1);
                                }}
                                className=" bg-gray-200 text-gray-600 active:bg-gray-300 h-full w-14 rounded-l cursor-pointer"
                            >
                                <span className="w-full text-2xl font-semibold text-custom-orange">
                                    −
                                </span>
                            </button>
                            <span className="flex items-center justify-center w-16 bg-gray-200 font-semibold text-lg">
                                {amount}
                            </span>
                            <button
                                onClick={() => {
                                    setAmount(amount + 1);
                                }}
                                className="bg-gray-200 text-gray-600 active:bg-gray-300 h-full w-14 rounded-r cursor-pointer"
                            >
                                <span className="w-full h-fit text-2xl font-semibold text-custom-orange">
                                    +
                                </span>
                            </button>
                        </div>
                    </div>

                    <button
                        className="h-14 bg-custom-orange text-white w-52 py-2 rounded-md flex items-center justify-center gap-4"
                        onClick={() => {
                            createCheckout({
                                name,
                                price,
                                quantity: amount,
                                imageURL,
                            });
                        }}
                    >
                        <Icons.ShoppingCart />
                        Add to Cart
                    </button>
                </div>

                <p className="block mt-4">
                    Haven’t booked yet?{" "}
                    <Link className="underline" href="/user/reserve">
                        Book now
                    </Link>
                </p>
            </div>
        </div>
    );
}
