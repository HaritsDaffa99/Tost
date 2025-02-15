import Image from "next/image";
import { Metadata } from "next";
import toast_pict from "@/images/toast_pict.jpg";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { getAuthSession } from "@/lib/auth";

// export const metadata: Metadata = {
//     title: "Tost | Home",
//     description: "The best toast in the world",
// };

export default async function Home() {
    const session = await getAuthSession();

    return (
        <>
            <Navbar name={session?.user.name} image={session?.user.image} />
            <div className="pt-20 w-full h-full flex flex-col justify-between md:flex-row">
                <div className="flex justify-center text-center items-center md:text-left md:justify-start">
                    <div className="font-sans m-20">
                        <h1 className="text-7xl mb-3 font-bold text-custom-green">
                            TOST.
                        </h1>
                        <h3 className="text-2xl mb-10">
                            The o-gee of them all
                        </h3>
                        {/* <button className="bg-custom-red hover:bg-custom-red-hov text-white py-2 px-20 rounded-md">
                            Get Started
                        </button> */}
                        {session ? (
                            <Link
                                href="/user/menu"
                                className="bg-custom-red hover:bg-custom-red-hov text-white py-4 px-20 rounded-md"
                            >
                                Go to Menu 🤩
                            </Link>
                        ) : (
                            <Link
                                href="/sign-in"
                                className="bg-custom-red hover:bg-custom-red-hov text-white py-4 px-20 rounded-md"
                            >
                                Get Started
                            </Link>
                        )}
                    </div>
                </div>
                <div className="flex justify-center relative">
                    <Image
                        className="rounded-tl-[5rem]"
                        src={toast_pict}
                        alt="Picture of a toast"
                        height={750}
                        priority
                    />
                </div>
            </div>
        </>
    );
}
