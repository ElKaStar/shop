const mailgun = require("mailgun-js");
const DOMAIN = "sandbox967c26eca9ac4179af42b0b5a072b60e.mailgun.org";
const mg = mailgun({
	apiKey: "12404508d27c0adee296c41c735266ef-fe066263-d82f2ed8",
	domain: DOMAIN
});
const data = {
	from: "Mailgun Sandbox <postmaster@sandbox967c26eca9ac4179af42b0b5a072b60e.mailgun.org>",
	to: "licose1983@gmail.com",
	subject: "Hello",
	text: "Testing some Mailgun awesomness!"
};

class MailGunController {
    async sendTestEmail(req, res) {

        mg.messages().send(data, function (error, body) {
            console.log(body);
            return 'ok'
        });
    }

}
module.exports = new MailGunController()