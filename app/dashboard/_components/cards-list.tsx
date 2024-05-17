import CardItem from "./card-item";
import { GetGroupedPopups } from "@/types";

interface CardsListProps {
  items: GetGroupedPopups["items"];
}

const CardsList = ({ items }: CardsListProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
      {items.map((it) => {
        return <CardItem key={it._id} item={it} />;
      })}
    </div>
  );
};

export default CardsList;
