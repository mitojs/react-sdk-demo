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
        data: 'Abnormal Post Request',
      })
    )
  }),
  // rest.post('/normal', (req, res, ctx) => {
  //   return res(
  //     ctx.status(200),
  //     ctx.json({
  //       data: 'Normal Post Request',
  //     })
  //   )
  // }),
  // rest.post('/abnormal', (req, res, ctx) => {
  //   return res(
  //     ctx.status(500),
  //     ctx.json({
  //       data: 'Abnormal Post Request',
  //     })
  //   )
  // }),
]
