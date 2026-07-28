import { User } from "@/payload-types";

type navbarPartContent = {
    name: string;
    links?: Array<string>;
}

type itemNav = {
  id: number;
  name: string;
  childrenLinks?: string[];
}

export default function NavbarPart({ id, name, childrenLinks }: itemNav) {
    return (
        <div className="w-50 h-8 bg-blue-800 border border-blue-500 text-xl flex items-center pl-2 pt-0.5 [clip-path:polygon(0_0,90%_0,93%_30%,100%_30%,100%_100%,0_100%)]">
            <p>▶ {name}</p>

            {childrenLinks && childrenLinks.map((link) => {
                return (
                    <a key={id} href={link}>hello</a>
                )
            })}
        </div>
    )
}