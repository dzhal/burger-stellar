import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/constructor-element";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/drag-icon";
import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { XYCoord, Identifier } from "dnd-core";
import { IIngredient } from "../../@type/types";
import { moveCard } from "../../services/burger-constructor-slice";
import { useAppDispatch } from "../../services/app-hooks";
import styles from "./constructor-item.module.css";

interface DragItem {
  index: number;
  id: string;
  type: string;
}
interface ElementProps {
  item: IIngredient;
  id: string;
  index: number;
  removeHandler: (index: number) => void;
}
function ConstructorItem({ item, id, index, removeHandler }: ElementProps) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const moveCardHandler = (dragIndex: number, hoverIndex: number) => {
    dispatch(moveCard({ dragIndex, hoverIndex }));
  };
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: "mainAndSauce",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCardHandler(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: "mainAndSauce",
    item: () => {
      return { id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const className = isDragging
    ? styles.ingredient_item_on_drag
    : styles.ingredient_item;

  drag(drop(ref));

  return (
    <div className={className} ref={ref} data-handler-id={handlerId}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => removeHandler(index)}
      />
    </div>
  );
}

export default React.memo(ConstructorItem);
