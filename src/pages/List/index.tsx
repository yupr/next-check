import { useState } from 'react';
import styles from './index.module.scss';

type ItemType = {
  id: number;
  name: string;
}[];

const List = () => {
  const [checkedList, setCheckedList] = useState<ItemType>([]);

  const Items = [
    { id: 1, name: 'item1' },
    { id: 2, name: 'item2' },
    { id: 3, name: 'item3' },
    { id: 4, name: 'item4' },
  ];

  /** -------------------- todo: ロジック切り離す ---------------------------------------- */

  const onChangeAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.currentTarget.checked;
    if (isChecked) {
      setCheckedList([...Items]);
    } else {
      setCheckedList([]);
    }
  };

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

  const isChecked = (item: { id: number; name: string }) => {
    const result = checkedList.some(
      (checkedItem: { id: number; name: string }) => {
        return checkedItem.id === item.id;
      }
    );
    return result;
  };

  /** -------------------------------------------------------------------------------- */

  return (
    <>
      <ul className={styles.list}>
        <input type="checkbox" onChange={(event) => onChangeAll(event)} />
        <span>全て選択 / 解除</span>

        {Items.map((item) => {
          return (
            <div key={item.id} className={styles.list__item}>
              <input
                onChange={(event) => onChange(event, item)}
                type="checkbox"
                checked={isChecked(item)}
              />
              <li className={styles.list__item} data-item-color="blue">
                {item.name}
              </li>
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
