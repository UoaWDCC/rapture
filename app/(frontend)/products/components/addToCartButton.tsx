"use client";

type props= {
    productId: string;
    className?: string;
    amount: number;
}

async function addToCart(productId: string) {
    //something something
}

export default function AddToCartButton(props: props) {
    return (
        <button className={`font-mono bg-white text-black p-[2%] rounded-sm hover:cursor-pointer ${props.className}`} onClick={() => addToCart(props.productId)}>ADD TO BAG</button>
    )
}