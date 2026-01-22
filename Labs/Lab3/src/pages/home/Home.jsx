import ListOfOrchids from "../orchids/ListOfOrchids";
import { OrchidsData } from "../../data/OrchidsData.js";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const { search } = useOutletContext();

  return (
    <>
      <h1 className="title">Welcome to my Orchid Shop !</h1>
      <ListOfOrchids orchidsData={OrchidsData} searchValue={search} />
    </>
  );
}
