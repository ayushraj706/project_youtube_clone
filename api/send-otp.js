import { Resend } from 'resend';
import admin from 'firebase-admin';

// Firebase Admin ko connect karna (Aapki JSON chabi ka use karke)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT))
  });
}

const db = admin.firestore();
const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Sirf POST allow hai' });
  
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP

  try {
    // 1. Firebase Firestore mein EMAIL aur OTP dono save karein
    await db.collection('otps').doc(email).set({
      email: email,
      otp: otp,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // 2. Email par OTP bhejein
    await resend.emails.send({
      from: 'Ayush App <onboarding@resend.dev>', // Agar ayus.fun verify nahi hai toh yehi rehne dena
      to: email,
      subject: `Ayus.fun Login OTP: ${otp}`,
      html: `<h2>Aapka Login OTP hai: ${otp}</h2><p>Ise kisi ke saath share na karein.</p>`,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
