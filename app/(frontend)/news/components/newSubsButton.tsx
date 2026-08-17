"use client";

async function subsToNews() {
    try {
        const res = await fetch("/api/news/subscribe", {
            method: "POST"
        });
        const data = await res.json();
        
        if (!res.ok) {
            throw new Error(data.error || "Couldn't Subscribe.")
        }

        // alert("Subscribe Success!")
    } catch (error) {
        console.error(error);
        // alert("Sorry, subscription failed.")
    };
}

export default function NewSubsButton() {
    return (
        <button onClick={subsToNews}>SUBSCRIBE TO NEWS</button>
    );
}