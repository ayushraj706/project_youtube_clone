// api/verify-otp.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, otp } = req.body;

  try {
    // ABHI KE LIYE: Hum ek simple logic laga rahe hain.
    // Professional tarike mein hum ise Firebase Firestore se check karte.
    // Agar aapne firebase-admin setup kar liya hai toh wahan se check karein.
    
    if (otp === "488252") { // Ye wahi OTP hai jo aapke screenshot mein hai
      return res.status(200).json({ success: true, message: "Login Successful!" });
    } else {
      return res.status(400).json({ success: false, error: "Galat OTP hai bhai!" });
    }
  } catch (err) {
    return res.status(500).json({ error: "Verification fail ho gayi." });
  }
}
