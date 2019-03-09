export function sendEmail(data = {}) {
	return fetch(`http://${location.host}/api/send-email`, {
		method: 'POST',
		mode: 'cors',
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).then((response) => response.json())
}
