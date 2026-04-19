//import { NavbarItems } from "../someplace";

type itemNav = {
  id:number;
  name:string;
  link:string
}


export default function Navbar({item}: {item:itemNav[]}) {
  return (
    <nav>
      <div>
        {item.map(item => (
          <a className="p-5" key={item.id} href={item.link}>{item.name}</a>
        ))}
      </div>
    </nav>
  );
}
