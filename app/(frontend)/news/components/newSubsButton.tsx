"use client";

import { useEffect, useState } from "react";

export default function NewSubsButton() {
    const [subscribed, setSubscribed] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkSubscription = async () => {
            const response = await fetch("/api/news/subscription");
            const data = await response.json();

            setSubscribed(data.subscribed);
        }

        checkSubscription();
    }, []);

    const subscribe = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/news/subscribe", {
                method: "POST"
            });
            const data = await res.json();

            console.log("Subscribe response:", res.status, data);

            // if (res.status === 409) {
            //     setSubscribed(true);
            //     return;
            // }
            
            if (!res.ok) {
                throw new Error(data.error || "Couldn't Subscribe.")
            }

            console.log("Setting subscribed to true");

            setSubscribed(true);

            // alert("Subscribe Success!")
        } catch (error) {
            console.error(error);
            // alert("Sorry, subscription failed.")
        } finally {
            setLoading(false);
        };
    }

    const unsubscribe = async () => {
        setLoading(true);

        try {
            const res = await fetch("/api/news/unsubscribe", {
                method: "POST"
            });
            const data = await res.json();

            if (res.status === 409) {
                setSubscribed(false);
                return;
            }
            
            if (!res.ok) {
                throw new Error(data.error || "Couldn't Unsubscribe.")
            }

            setSubscribed(false);

            // alert("Unsubscribe Success!")
        } catch (error) {
            console.error(error);
            // alert("Sorry, unsubscribing failed.")
        } finally {
            setLoading(false);
        };
    }

    return (
        <button
            onClick={subscribed ? unsubscribe : subscribe}
            disabled={loading}
            className={`h-12.25 bg-[#f2b423e6] cursor-pointer p-2.5 mb-3`}
        >
            {loading ? "Please wait..." : subscribed ? "UNSUBSCRIBE" : "SUBSCRIBE TO NEWS"}
        </button>
    );
}