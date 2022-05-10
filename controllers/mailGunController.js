const mailgun = require("mailgun-js");


class MailGunController {
    async sendTestEmail(req, res) {

        mg.messages().send(data, function (error, body) {
            console.log(body);
            return 'ok'
        });
    }

}
module.exports = new MailGunController()