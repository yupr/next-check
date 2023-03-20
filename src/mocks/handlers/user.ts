import { rest } from 'msw';

export const user = [
  rest.get('/user', (req, res, ctx) => {
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
