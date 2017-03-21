const ejs = require('ejs');
const read = require('fs').readFileSync;
const join = require('path').join;
const template = join(__dirname, '../../invitation.ejs');

const env = join(__dirname, '../../../.env');
const site = require('habitat').load(env).get('SITE');
const mail = require('habitat').load(env).get('MAIL');

const mailcomposer = require('mailcomposer');
const spawn = require('child_process').spawn;

const uid = require('rand-token').uid;

function emailInvite(req, res, next) {

  const token = uid(24);
  res.locals.updates = {
    $set : {
      "meta.verificationToken": token,
      "meta.invitationSent": new Date(),
      enabled : true
    }
  };


  var html = ejs.compile(read(template, 'utf8'), {filename: template})({user: res.locals.user, site: site, token: token});

  if(/localhost/i.test(site.url)){ //for testing purposes, if site url is localhost don't sendmail, log HTML
    console.log(html);
    return next();
  }


  const message = mailcomposer(
    {
      from: mail.from,
      to: res.locals.user.email,
      subject: "Tricity Pinball Registration!",
      html: html
    }
  );
  const stream = message.createReadStream();


  return new Promise((resolve, reject) => {
    const sendmail = spawn('sendmail', ['-t']);

    sendmail.stdout.on('data', (data) => {
      console.log(`sendmail: ${data}`);
    });

    sendmail.stderr.on('data', (data) => {
      console.log(`sendmail error: ${data}`);
      return reject(data);
    });

    sendmail.on('close', (code) => {
      console.log(`sendmail process exited with code ${code}`);
      if(code === 0){
        return resolve();
      }
      return reject(`sendmail process exited with code ${code}`);
    })
    .then(() => next())
    .catch((err) => next(err));

    stream.pipe(sendmail.stdin);
  });

}


module.exports = emailInvite;
