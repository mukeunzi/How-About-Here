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

const googleLogIn = async code => {
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

	const googleUserData = {
		user_name: response.data.displayName,
		user_id: response.data.emails[0].value,
		user_password: response.data.emails[0].value,
		auth_provider: 'google'
	};

	return googleUserData;
};

module.exports = { url, googleLogIn };
