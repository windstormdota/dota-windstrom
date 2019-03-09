const http = require('http')
const polka = require('polka')
const { join } = require('path')
const serveStatic = require('serve-static')
const { json } = require('body-parser')
const nodemailer = require('nodemailer')

const { PORT = 80 } = process.env
const buildDir = join(__dirname, 'build')
const serve = serveStatic(buildDir)

async function main () {
	const account = await nodemailer.createTestAccount()
	const transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false,
		auth: {
			user: account.user,
			pass: account.pass,
		}
	})

	polka()
		.use(serve)
		.use(json())
		.post('/api/send-email', async (req, res) => {
			try {
				const info = await transporter.sendMail({
					from: '"Toto email <toto@toto.toto>',
					to: 'q300678@nwytg.net',
					subject: 'Test: subject',
					text: 'coucou this is text body',
					html: '<h1> BOUZAAAA </h1>',
				})
				res.writeHead(200);
				res.end()
			} catch (err) {
				res.writeHead(500)
				res.end(err.message)
			}
		})
		.listen(PORT, (err) => {
			if (err) throw err
			console.log(`> Running on localhost:${PORT}`)
		})	
}

main().catch(console.error)

// Prevents heroku from "sleeping"
setInterval(() => {
	http.get('http://dota-windstrom.herokuapp.com/')
}, 1800000) // Every 30 minutes
