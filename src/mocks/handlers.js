import { rest } from 'msw'

export const handlers = [
  rest.get('/normal', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: 'Normal Get Request',
      })
    )
  }),
  rest.get('/abnormal', (req, res, ctx) => {
    return res(
      ctx.status(500),
      ctx.json({
        data: 'Abnormal Get Request',
      })
    )
  }),
  rest.post('/upload', (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: 'ok',
      })
    )
  }),
  // rest.post('/abnormal', (req, res, ctx) => {
  //   return res(
  //     ctx.status(500),
  //     ctx.json({
  //       data: 'Abnormal Post Request',
  //     })
  //   )
  // }),
]
