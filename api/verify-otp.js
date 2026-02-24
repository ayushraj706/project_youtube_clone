// api/verify-otp.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const { email, otp } = req.body;

  try {
    // ABHI KE LIYE: Hum sirf check kar rahe hain ki OTP 6 digit ka hai ya nahi.
    // Professional setup mein hum ise Firestore se verify karte hain.
    if (otp && otp.length === 6) {
      return res.status(200).json({ success: true, message: "Login Successful!" });
    } else {
      return res.status(400).json({ success: false, error: "Galat OTP hai!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Verification Error" });
  }
}
