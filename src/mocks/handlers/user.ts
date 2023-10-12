import { rest } from 'msw';
import instance from '@/lib/axios';
import { BaseUrl } from '@/lib/axios';

// axiosのbaseURLが設定されていない場合、mswのprefixにそのURLを付与
const isSetAxiosUrl = instance.defaults.url === BaseUrl;

export const user = [
  rest.get(isSetAxiosUrl ? '/user' : `${BaseUrl}/user`, (req, res, ctx) => {
    const isAuth = localStorage.getItem('isAuth');

    if (isAuth === 'true') {
      return res(
        ctx.status(200),
        ctx.json({
          id: 1,
          name: 'admin',
        })
      );
    }

    return res(
      ctx.status(403),
      ctx.json({
        errorMessqge: 'Not authorized',
      })
    );
  }),
];
