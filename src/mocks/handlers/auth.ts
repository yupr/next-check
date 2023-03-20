import { rest } from 'msw';

export const auth = [
  rest.post('/login', async (req, res, ctx) => {
    const reqBody = await req.json();
    const { userName, pass } = reqBody;

    if (userName && pass) {
      return res(
        ctx.status(200),
        ctx.json({
          message: 'login successed!',
          token: 'testToken',
        })
      );
    }
    return res(
      ctx.status(400),
      ctx.json({
        message: 'bad request',
      })
    );
  }),
];
