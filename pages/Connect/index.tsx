import { instance } from '../../lib/axios';
import React, { useEffect } from 'react';

const Connect = () => {
  useEffect(() => {
    try {
      const fetch = async () => {
        const result = await instance.get(
          'https://api.github.com/users/hadley/orgs'
        );
        console.log('result', result);
      };
      void fetch();
    } catch (err) {
      console.log('err', err);
    }
  }, []);

  return <div>check api response</div>;
};
export default Connect;
