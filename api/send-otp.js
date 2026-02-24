// api/send-otp.js
import { Resend } from 'resend';
import { getOTPTemplate } from '../utils/otpTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Branded Domain se email bhejna (ayus.fun)
    const { data, error } = await resend.emails.send({
      from: 'Login <otp@ayus.fun>', // Aapka branded domain yahan set hai
      to: email,
      subject: `${otp} is your Login OTP for Ayush Video App`,
      html: getOTPTemplate(otp) // Alag template file se design uthaya
    });

    if (error) {
      return res.status(400).json({ error });
    }

    // Yahan hum Firestore mein OTP save karne ka logic bhi jodd sakte hain
    return res.status(200).json({ success: true, message: 'OTP bhej diya gaya hai!' });
    
  } catch (error) {
    return res.status(500).json({ error: 'Server error: OTP nahi gaya.' });
  }
}

