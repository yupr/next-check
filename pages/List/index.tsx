import React, { useState } from 'react';
import styles from './index.module.scss';

const Items = [
  { id: 1, name: 'item1' },
  { id: 2, name: 'item2' },
  { id: 3, name: 'item3' },
  { id: 4, name: 'item4' },
];

type ItemType = {
  id: number;
  name: string;
}[];

const List = () => {
  const [checkedList, setCheckedList] = useState<ItemType>([]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    item: { id: number; name: string }
  ) => {
    const isChecked = event.currentTarget.checked;
    let updateList = [...checkedList];

    if (isChecked) {
      updateList = [...checkedList, item];
    } else {
      const removeIndex = checkedList.findIndex(
        (checkedItem: { id: number; name: string }) => {
          return checkedItem.id === item.id;
        }
      );
      updateList.splice(removeIndex, 1);
    }
    setCheckedList(updateList);
  };

  const Batch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;
    if (isChecked) {
      setCheckedList([...Items]);
    } else {
      setCheckedList([]);
    }
  };

  const isChecked = (item: { id: number; name: string }) => {
    const result = checkedList.some(
      (checkedItem: { id: number; name: string }) => {
        return checkedItem.id === item.id;
      }
    );
    return result;
  };

  return (
    <>
      <ul className={styles.list}>
        <input type="checkbox" onChange={(event) => Batch(event)} />
        <span>一括チェック on or off</span>

        {Items.map((item) => {
          return (
            <div key={item.id} className={styles.list__item}>
              <input
                onChange={(event) => onChange(event, item)}
                type="checkbox"
                checked={isChecked(item)}
              />
              <li>{item.name}</li>
            </div>
          );
        })}

        <div>
          <p>選択したアイテム</p>
          {checkedList.map((list) => {
            return (
              <div key={list.id}>
                <span>{list.name}</span>
              </div>
            );
          })}
        </div>
      </ul>
    </>
  );
};

export default List;
