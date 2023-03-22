import { rest } from 'msw';

export const label = [
  rest.get('/labelViewInfo', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        container: {
          size: {
            width: 1192,
            height: 580,
          },
        },
        items: {
          nickname: {
            groupId: 1111,
            position: {
              x: 400,
              y: 270,
            },
            fontSize: 60,
          },
        },
      })
    );
  }),
];
