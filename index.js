require('dotenv').config()
const { RTMClient } = require('@slack/rtm-api')

const rtm = new RTMClient(process.env.SLACK_BOT_TOKEN)

rtm.on('message', (event) => {
	console.log(event)

	if (event.text.indexOf('bot') === -1) return

	new Promise((resolve) => setTimeout(resolve, 1000))
		.then(() => rtm.sendTyping(event.channel))
		.then(() => new Promise((resolve) => setTimeout(resolve, 1000)))
		.then(() => {
			rtm.sendMessage(`I hear you <@${event.user}>`, event.channel)
				.then((reply) => {
					console.log('Reply sent successfully', reply.ts)
				})
		})
		.catch((err) => {
			console.log('An error occured:', err)
		})
})

rtm.start()
	.then((res) => {
		const { self, team } = res
		console.log('RTM bot ready!', self, team)
	})
	.catch((err) => {
		console.log('Error starting RTM', err)
	})
