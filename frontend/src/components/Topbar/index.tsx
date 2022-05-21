import Navitem from "../Navitem";
import { AiFillAppstore } from "react-icons/ai";


export default function Topbar() { 
  return (
    <nav
      className="flex justify-end w-screen fixed top-0 left-0 z-10 h-14 bg-main gap-2"
    >
      <Navitem icon={<AiFillAppstore size={24} color="white"/>} text=""/>
      <Navitem icon={<AiFillAppstore size={24} color="white"/>} text=""/>
      <Navitem icon={<AiFillAppstore size={24} color="white"/>} text=""/>
    </nav>
  );
}
