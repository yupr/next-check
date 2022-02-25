import { instance } from '../../lib/axios';
import React, { useEffect } from 'react';

const Connect = () =>{

  useEffect(() => {
    const test = async (): Promise<void> => {
      const result = await instance.get('https://api.github.com/users/hadley/orgs');
      console.log('result', result);
    };
    void test()
  }, []);

  return(
    <div>check api response</div>
  )


}
export default Connect;
