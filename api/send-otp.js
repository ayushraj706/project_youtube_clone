import { Resend } from 'resend';
import admin from 'firebase-admin';

// Firebase Admin ko connect karna
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
  const otp = Math.floor(100000 + Math.random() * 900000).toString(); 

  try {
    // 1. Firebase mein save karna
    await db.collection('otps').doc(email).set({
      email: email,
      otp: otp,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // 2. Resend se email bhejna
    const resendResponse = await resend.emails.send({
      // DHYAN DEIN: Free account mein 'from' address EKDUM yahi hona chahiye!
      from: 'onboarding@resend.dev', 
      to: email,
      subject: `Ayus.fun Login OTP: ${otp}`,
      html: `<h2>Aapka Login OTP hai: ${otp}</h2><p>Ise kisi ke saath share na karein.</p>`,
    });

    // NAYA CODE: Agar Resend ne andar se koi error diya hai toh use pakdo
    if (resendResponse.error) {
      console.error("Resend Error:", resendResponse.error);
      return res.status(400).json({ success: false, error: resendResponse.error.message });
    }

    // Agar sab theek raha
    res.status(200).json({ success: true, message: "Email chala gaya!" });
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: error.message });
  }
}
