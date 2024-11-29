import { app } from './app'
import { env } from './env'

app.listen(
  {
    host: '0.0.0.0',
    port: env.PORT,
  },
  (err, address) => {
    if (err) {
      throw new Error(err.message)
    }
    console.log(`Server is running on ${address}`)
  },
)
