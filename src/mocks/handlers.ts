import { rest } from 'msw';

export const handlers = [
  rest.post('/login', async (req, res, ctx) => {
    // sessionStorage.setItem('is-authenticated', 'true');
    const reqBody = await req.json();
    const { userName, pass } = reqBody;

    if (userName && pass) {
      return res(
        // ctx.status(500)
        ctx.status(200),
        ctx.json({
          message: 'login successed!',
          token: 'testToken',
        })
      );
    }
  }),

  rest.get('/user', (req, res, ctx) => {
    const isAuthenticated = sessionStorage.getItem('is-authenticated');

    if (!isAuthenticated) {
      return res(
        ctx.status(403),
        ctx.json({
          errorMessage: 'Not authorized',
        })
      );
    }
    return res(
      ctx.status(200),
      ctx.json({
        username: 'admin',
      })
    );
  }),

  rest.get('/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      // ctx.status(500),

      ctx.json([
        {
          id: 1,
          name: 'Leanne Graham',
        },
        {
          id: 2,
          name: 'Ervin Howell',
        },
        {
          id: 3,
          name: 'Clementine Bauch',
        },
        {
          id: 4,
          name: 'Glenna Reichert',
        },
      ])
    );
  }),

  rest.get('/names', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          name: 'carl',
        },
        {
          name: 'james',
        },
      ])
    );
  }),
];
