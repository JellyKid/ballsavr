const router = require('express').Router();
const ejs = require('ejs');
const read = require('fs').readFileSync;
const join = require('path').join;
const path = join(__dirname, '../invitation.ejs');

const site = require('habitat').load().get('SITE');
const mail = require('habitat').load().get('MAIL');
const mailcomposer = require('mailcomposer');
const spawn = require('child_process').spawn;

var user = {
        "_id" : "58d00a3392668327c81af60d",
        "firstName" : "John",
        "lastName" : "Public",
        "email" : "seaoftea@gmail.com",
        "meta" : {
                "activated" : false,
                "authType" : "local",
                "invitationSent" : Date("2017-03-20T16:58:27.582Z"),
                "verificationToken" : "m642MLmAoO9UYY2vW4q9IG34",
                "updatedAt" : Date("2017-03-20T16:58:27.584Z")
        },
        "enabled" : true,
        "admin" : false,
        "initials" : "AAA",
        "__v" : 0
};







router.get(
  '/test',
  (req, res) => {
    res.locals.user = user; //GET RID OF THIS AFTER YOU MAKE EVERYTHING WORK!!!
    var html = ejs.compile(read(path, 'utf8'), {filename: path})({user: res.locals.user, site: site});
    const message = mailcomposer(
      {
        from: mail.from,
        to: res.locals.user.email,
        subject: "Tricity Pinball Registration!",
        html: html
      }
    );
    const stream = message.createReadStream();

    const sendmail = spawn('sendmail', ['-t']);

    sendmail.stdout.on('data', (data) => {
      console.log(`sendmail: ${data}`);
    });

    sendmail.stderr.on('data', (data) => {
      console.log(`sendmail error: ${data}`);
    });

    sendmail.on('close', (code) => {
      console.log(`sendmail process exited with code ${code}`);
    });

    stream.pipe(sendmail.stdin);

    return res.status(200).send(html);
  }
);

module.exports = router;
