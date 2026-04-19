//import { Example } from "@/payload-types";
//so...
//import { NavbarItems } from "../someplace";

type itemNav = {
  id:number;
  name:string;
  link:string
}

function Navbar({item}: {item:itemNav[]}) { //might not need in real one?}) {
  return (
    <nav className="navbar">
      <ul>
        <li key={item.name}><a href={item.link}>{item.name}</a></li>
      </ul>
    </nav>


    /*<div className="flex flex-row gap-5 bg-black rounded-lg text-xl p-2">
      <h1>{example.title}</h1>
      <h2>{example.subTitle}</h2>
    </div>*/
  );
}
