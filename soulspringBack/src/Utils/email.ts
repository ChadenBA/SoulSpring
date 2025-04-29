import nodemailer from "nodemailer";

export const sendAcceptanceEmail = async (recipientEmail: string): Promise<void> => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS, 
    },
  });

  // Setup the email data
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender address
    to: recipientEmail, // Recipient email
    subject: 'Professional Account Approval', 
    text: 'Congratulations! Your professional account has been approved.', 
    html: '<p>Congratulations! Your professional account has been approved.</p>', 
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log("Approval email sent to:", recipientEmail);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};



export const sendEmail =  async({ to, subject, text }: { to: string; subject: string; text: string ; html:string}) =>{
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERR, // Ton email
      pass: process.env.EMAIL_PASSWORD, // Ton mot de passe (ou un App Password)
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};

