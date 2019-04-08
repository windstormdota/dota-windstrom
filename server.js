const http = require('http')
const polka = require('polka')
const { join } = require('path')
const serveStatic = require('serve-static')
const { json } = require('body-parser')
const nodemailer = require('nodemailer')

const { PORT = 80 } = process.env
const buildDir = join(__dirname, 'build')
const serve = serveStatic(buildDir)

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: 'dota.windstrom@gmail.com',
		pass: '!dota.windstrom123',
	}
})

polka()
	.use(serve)
	.use(json())
	.post('/api/send-email', async (req, res) => {
		try {
			const info = await transporter.sendMail({
				from: 'dota windstrom',
				to: 'windstormdota@hotmail.com',
				subject: `Dota Wadafaaaak - ${req.body.type}`,
				text: getEmailText(req.body.type, req.body.gameID, req.body.playerName, req.body.heroes, req.body.minReplay, req.body.description),
				html: getEmailText(req.body.type, req.body.gameID, req.body.playerName, req.body.heroes, req.body.minReplay, req.body.description, true),
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

function getEmailText(type, gameID, playerName, heroes, minReplay, description, isHtml = false) {
	if (isHtml) {
		return `<h3>Type</h3>

${type}

<h3>gameID</h3>

${gameID}

<h3>Player Name</h3>

${playerName}

<h3>Heroes</h3>

${heroes}

<h3>Min Replay</h3>

${minReplay}

<h3>Description</h3>

${description}
`
	} else {
		return `# Type

${type}

# gameID

${gameID}

# Player Name

${playerName}

# Heroes

${heroes}

# Min Replay

${minReplay}

# Description

${description}
`
	}
}

setInterval(() => {
	const hour = new Date().getHours()

	if (hour > 0 && hour < 10) {
		// Do nothing if between 1 and 9 am
		return
	}

	// Prevents heroku from "sleeping"
	http.get('http://dota-windstrom.herokuapp.com/')
}, 300000) // Every 5 minutes
