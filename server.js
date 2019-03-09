const polka = require('polka')
const { join } = require('path')
const serveStatic = require('serve-static')

const { PORT = 80 } = process.env
const buildDir = join(__dirname, 'build')
const serve = serveStatic(buildDir)

polka()
	.use(serve)
	.listen(PORT, (err) => {
		if (err) throw err
		console.log(`> Running on localhost:${PORT}`)
	})
