import { Resend } from 'resend';
// Path Correction: Ek level upar ja kar src/utils mein ghusna hai
import { getOTPTemplate } from '../src/utils/otpTemplate'; 

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Sirf POST request ko allow karein
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email } = req.body;

  // 6-Digit random OTP generate karein
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Resend API call with ayus.fun domain
    const { data, error } = await resend.emails.send({
      from: 'Ayush App <otp@ayus.fun>', // Aapka verified domain
      to: email,
      subject: `Login OTP: ${otp}`,
      html: getOTPTemplate(otp), // Template file se design uthaya
    });

    if (error) {
      console.error("Resend Error:", error);
      return res.status(400).json({ success: false, error });
    }

    // OTP bhej diya gaya hai
    return res.status(200).json({ 
      success: true, 
      message: 'OTP bhej diya gaya hai!' 
    });

  } catch (err) {
    console.error("Server Error:", err);
    return res.status(500).json({ 
      success: false, 
      error: 'Backend mein koi galti hui hai.' 
    });
  }
}
