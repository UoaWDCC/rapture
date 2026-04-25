/*this page is purely for navbar testing purposes. there is nothing here.
it is bugged. has issues*/

//from page.tsx original
import { headers as getHeaders } from "next/headers.js";
import Image from "next/image";
import { fileURLToPath } from "url";
import { getPayload } from "payload";
import config from "@/payload.config";
//import "./styles.css";
import Link from "next/link";

import Navbar from "@/app/(frontend)/components/navbar.tsx";

export default async function Page() {
    const payloadConfig = await config;
    const payload = await getPayload({ config: payloadConfig });
    const headers = await getHeaders();
    const { user } = await payload.auth({ headers });
    
    const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`;

    const itemsNav = [
        { id: 1, name: "Home", link: "/" },
        { id: 2, name: "Random1", link: "/random1" },
        { id: 3, name: "SomethingPage - link doesn't work!", link: "/example" }
    ];

    return (
        <div>
            <div>
                <Navbar item={itemsNav} user={user} />
            </div>
        </div>
    );
}

//export default App;