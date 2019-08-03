const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URL);

const scopes = [
	'https://www.googleapis.com/auth/plus.me',
	'https://www.googleapis.com/auth/plus.login',
	'https://www.googleapis.com/auth/userinfo.email'
];

const url = oauth2Client.generateAuthUrl({
	access_type: 'offline',
	scope: scopes
});

const getGooglePlusAPI = auth => {
	return google.plus({ version: 'v1', auth });
};

const googleLogin = async code => {
	const { tokens } = await oauth2Client.getToken(code);
	oauth2Client.setCredentials(tokens);

	oauth2Client.on('tokens', tokens => {
		if (tokens.refresh_token) {
			console.log(tokens.refresh_token);
			oauth2Client.setCredentials({
				refresh_token: tokens.refresh_token
			});
		}
		console.log(tokens.access_token);
	});

	const plus = getGooglePlusAPI(oauth2Client);
	const response = await plus.people.get({ userId: 'me' });
	return response.data.displayName;
};

module.exports = { url, googleLogin };