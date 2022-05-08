const mailgun = require("mailgun-js");
const DOMAIN = "sandbox3fd80c9ee6eb4261bd02c5f6bd6e81cc.mailgun.org";
const mg = mailgun({
    apiKey: "7487336dbd524eb15e276f73d437b731-fe066263-fb9d780a",
    domain: DOMAIN
});
const data = {
    from: "Mailgun Sandbox <postmaster@sandbox3fd80c9ee6eb4261bd02c5f6bd6e81cc.mailgun.org>",
    to: "licose2019@gmail.com",
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