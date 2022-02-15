import React, { useState } from "react";
import styles from "./index.module.scss";

const List = () => {
  const Items = ["item1", "item2", "item3", "item4"];
  const [checkedList, setCheckedList] = useState<any | string>([]);


  const onChange = (event: any, item: string) => {
    const isChecked = event.target.checked;
    let updateList = [...checkedList];

    if (isChecked) {
      updateList = [...checkedList, item];
    } else {
      updateList.splice(checkedList.indexOf(item), 1);
    }
    setCheckedList(updateList);
  };


  return (
    <>
      <ul className={styles.list}>
        {Items.map((item) => {
          return (
            <div key={item} className={styles.list__item}>
              <input
                onChange={(event) => onChange(event, item)}
                type="checkbox"
              />
              <li>{item}</li>
            </div>
          );
        })}

        <div>
          <p>{checkedList}</p>
        </div>
      </ul>
    </>
  );
};

export default List;
