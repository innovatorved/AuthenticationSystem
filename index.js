const app = require('./src/app')

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`)
})