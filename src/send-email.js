export function sendEmail(data = {}) {
	return fetch(`http://${window.location.host}/api/send-email`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
}
