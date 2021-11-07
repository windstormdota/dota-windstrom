require('dotenv').config()
const http = require('http')
const polka = require('polka')
const { join } = require('path')
const serveStatic = require('serve-static')
const { json } = require('body-parser')
const nodemailer = require('nodemailer')

const { PORT = 80, MAIL_USERNAME, MAIL_PASSWORD } = process.env
const buildDir = join(__dirname, 'build')
const serve = serveStatic(buildDir)

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: MAIL_USERNAME,
		pass: MAIL_PASSWORD,
	}
})

polka()
	.use(serve)
	.use(json())
	.post('/api/send-email', async (req, res) => {
		try {
			const { type, gameID, division, team, playerName, heroes, minReplay, description } = req.body
			const info = await transporter.sendMail({
				from: 'dota windstrom',
				to: 'windstormdota@hotmail.com',
				subject: `Dota Wadafaaaak - ${type}`,
				text: getEmailText(type, gameID, division, team, playerName, heroes, minReplay, description),
				html: getEmailText(type, gameID, division, team, playerName, heroes, minReplay, description, true),
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

function getEmailText(type, gameID, division, team, playerName, heroes, minReplay, description, isHtml = false) {
	if (isHtml) {
		return `<h3>Type</h3>

${type}

<h3>gameID</h3>

${gameID}

<h3>Division</h3>

${division}

<h3>Team</h3>

${team}

<h3>Player Name</h3>

${playerName}

<h3>Heroes</h3>

${heroes}

<h3>Min Replay</h3>

${minReplay}

<h3>Description/Clip Twitch</h3>

${description}
`
	} else {
		return `# Type

${type}

# gameID

${gameID}

# Division

${division}

# Team

${team}

# Player Name

${playerName}

# Heroes

${heroes}

# Min Replay

${minReplay}

# Description/Clip Twitch

${description}
`
	}
}

// setInterval(() => {
	// Prevents heroku from "sleeping"
	// http.get('http://dota-windstrom.herokuapp.com/')
// }, 300000) // Every 5 minutes
