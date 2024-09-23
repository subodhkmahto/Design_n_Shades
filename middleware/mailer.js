import nodemailer from 'nodemailer';

async function sendMailer(email, resetLink) {
    // Create a transporter object using your email service
    const transporter = nodemailer.createTransport({
        service: 'Gmail', // or another email service
        auth: {
            user: '2017subodh2017@gmail.com', // your email
            pass: 'Ayush@1303' // your email password
        }
    });

    // Set up email data
    const mailOptions = {
        from: '"Inventry Management Sysytem"2017subodh2017@gmail.com', // sender address
        to: email, // list of receivers
        subject: 'Password Reset Request', // Subject line
        text: `You requested a password reset. Click the link to reset your password: ${resetLink}`, // plain text body
        html: `<p>You requested a password reset. Click the link to reset your password: <a href="${resetLink}">Reset Password</a></p>`, // HTML body
    };

    try {
        // Send mail
        await transporter.sendMail(mailOptions);
        console.log('Password reset email sent successfully!');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export default sendMailer;