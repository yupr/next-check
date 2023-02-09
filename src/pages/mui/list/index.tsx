import { useState, useMemo, Fragment, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const items = ['item1', 'item2', 'item3', 'item4', 'item5'];

const List = () => {
  const [checked, setChecked] = useState<boolean[]>(items.map(() => false));

  const checkAllItem = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(items.map(() => !!event.target.checked));
  };

  const checkItem = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const newChecked = [...checked];
    newChecked.splice(index, 1, event.target.checked);
    setChecked(newChecked);
  };

  const isAllChecked = useMemo(() => {
    return checked.every((result) => !!result);
  }, [checked]);

  const isIndeterminate = useMemo(() => {
    // 全てチェック済みではないが、少なくとも1つチェックされている
    return !isAllChecked && checked.includes(true);
  }, [checked, isAllChecked]);

  return (
    <div>
      <FormControlLabel
        label="全選択/解除"
        control={
          <Checkbox
            checked={isAllChecked}
            indeterminate={isIndeterminate}
            onChange={checkAllItem}
          />
        }
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
        {items.map((item, index) => {
          return (
            <Fragment key={index}>
              <FormControlLabel
                label={item}
                control={
                  <Checkbox
                    checked={checked[index]}
                    onChange={(event) => checkItem(index, event)}
                  />
                }
              />
            </Fragment>
          );
        })}
      </Box>
    </div>
  );
};

export default List;
