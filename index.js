const express = require('express')
const nodemailer = require("nodemailer");
const app = express()
const port = process.env.PORT || 3010
const cors = require('cors')
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const smtp_login = process.env.SMTP_LOGIN
const smtp_password = process.env.SMTP_PASSWORD
const my_email = process.env.MYEMAIL

let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false, // true for 465, false for other ports
    auth: {
        user: smtp_login,
        pass: smtp_password,
    },
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/sendMessage', async (req, res) => {
    let {name, email, message} = req.body

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Портфолио 👻" <foo@example.com>', // sender address
        to: my_email, // list of receivers
        subject: "Обратная связь ✔", // Subject line
        html: `<b>Сообщение через обратную связь Портфолио</b>
<div>Имя: ${name}</div>
<div>e-mail: ${email}</div>
<div>Сообщение: ${message}</div>
`,
    });

    res.send('ok')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})