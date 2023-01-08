require("dotenv").config()
const express = require("express")
const nodeMail = require("nodemailer")
const path = require("path")

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname + "/public")))


async function mainMail(name, email, message) {
  const transporter = nodeMail.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.PASSWORD
    }
  })

  const mailOption = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `Message Portfolio Site from: ${name}`,
    html: 
    `
      <h1>You got a new message from</h1>
      <br>
      <strong>Name:</strong><span> ${name}</span>
      <br>
      <strong>Email:</strong><span> ${email}</span>
      <br>
      <br>
      <strong>Message:</strong>
      <br>
      <p style="white-space:pre-wrap">${message}</p>
    `,
  }

  try {
    await transporter.sendMail(mailOption)
    return Promise.resolve("Message Sent Successfully!")
  } catch (error) {
    return Promise.reject(error)
  }
}

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
});

app.get("/pt-br", (req, res) => {
  res.sendFile(__dirname + "/views/pt-br.html")
})

app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await mainMail(name, email, message);
    
    res.sendFile(__dirname + "/views/contact/index.html")
  } catch (error) {
    console.log(error)
    res.send("Message Could not be Sent");
  }
});

app.post("/contact/pt-br", async (req, res) => {
  const { name, email, message } = req.body;
  
  try {
    await mainMail(name, email, message);
    
    res.sendFile(__dirname + "/views/contact/pt-br.html")
  } catch (error) {
    console.log(error)
    res.send("Message Could not be Sent");
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Server is running!"));