import {app} from './app.js'
import {ENV} from './lib/env.js'

const PORT = Number(ENV.PORT) || 3000

app.listen(PORT, () => {
    console.log(`✅ Backend running at http://localhost:${PORT}/docs/`)
})