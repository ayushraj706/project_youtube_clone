// utils/otpTemplate.js
export const getOTPTemplate = (otp) => {
  return `
    <div style="font-family: sans-serif; background-color: #000; color: #fff; padding: 40px; text-align: center; border-radius: 15px;">
      <h1 style="color: #FF1100; margin-bottom: 20px;">Ayush Video App</h1>
      <p style="font-size: 18px; color: #ccc;">Hello Student!</p>
      <p style="font-size: 16px; color: #aaa;">Bihar Board Exam 2026 ki taiyari ke liye aapka Login OTP niche diya gaya hai:</p>
      
      <div style="background-color: #111; border: 2px solid #333; display: inline-block; padding: 20px 40px; margin: 30px 0; border-radius: 10px;">
        <span style="font-size: 32px; font-weight: bold; letter-spacing: 10px; color: #FF1100;">${otp}</span>
      </div>
      
      <p style="font-size: 14px; color: #666;">Ye code sirf 5 minute ke liye valid hai. Kisi ke saath share na karein.</p>
      <hr style="border: 0; border-top: 1px solid #222; margin: 30px 0;">
      <p style="font-size: 12px; color: #444;">© 2026 Success Point Hub | Samastipur, Bihar</p>
    </div>
  `;
};

