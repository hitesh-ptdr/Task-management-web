const nodemailer =
require("nodemailer");

const transporter =
nodemailer.createTransport({

service:"gmail",

auth:{
user:
process.env.EMAIL_USER,

pass:
process.env.EMAIL_PASS,
},

});

const sendMail =
async (
to,
subject,
text
)=>{

try{

console.log(
"📩 TRYING MAIL TO:",
to
);

const info =
await transporter.sendMail({

from:
`Task Manager <${process.env.EMAIL_USER}>`,

to,
subject,
text,
});

console.log(
"✅ MAIL SENT:",
info.response
);

}catch(error){

console.log(
"❌ FULL MAIL ERROR:"
);

console.log(error);

}
};

module.exports =
sendMail;