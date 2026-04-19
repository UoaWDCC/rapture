import Navbar from "@/app/(frontend)/components/navbar.tsx";

function App() {
  const itemsNav = [
    { id: 1, name: "SomethingPage", link: "/example" },
    { id: 2, name: "SomethingPage2", link: "/example2" }
  ];


  return (
    <div>
      <Navbar item={itemsNav} />
    </div>
  );
}


export default App;
