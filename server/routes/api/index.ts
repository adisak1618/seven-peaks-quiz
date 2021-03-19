import express, { Response } from 'express'

const router = express.Router()

router.get('/hello', (_, res: Response) => {
  res.json({
    data: 'Hello World!!!'
  })
})

export default router