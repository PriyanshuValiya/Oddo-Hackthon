import nodemailer from "nodemailer";

export async function POST(req) {
  const { balance, expense } = req.body;

  try {
    const to = "valiyapriyansukumar@gmail.com"; 
    const subject = "📊 Your Weekly Financial Summary";

    // Hardcoded financial details
    const totalBalance = 50000; // Total money inserted
    const currentBalance = 12000; // Money left
    const latestExpense = 2800; // Most recent spending
    const remainingBalance = totalBalance - currentBalance;

    // Spending suggestions
    const spendingSuggestions = [
      "Consider investing ₹5,000 in a savings plan for future stability.",
      "Review your monthly subscriptions and cancel unused ones.",
      "Limit your dining-out expenses and focus on home-cooked meals.",
      "Use cashback offers and discount coupons while shopping!",
    ];

    // Email UI in HTML format
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h1 style="text-align: center">💰 Weekly Financial Summary</h1>
        <p>Hello,</p>
        <p>Here’s your financial update for this week:</p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Total Inserted Balance:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">₹50,000</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Current Balance:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">₹12,000</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Latest Expense:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd;">₹2,800</td>
          </tr>
          <tr>
            <td style="padding: 10px; border: 1px solid #ddd;"><strong>Remaining Balance:</strong></td>
            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold; color: ${
              remainingBalance < 1000 ? "red" : "#4CAF50"
            };">₹${remainingBalance}</td>
          </tr>
        </table>

        <h3 style="margin-top: 20px; color: #333;">💡 Smart Spending Tips:</h3>
        <ul style="padding-left: 20px;">
          ${spendingSuggestions.map((tip) => `<li>${tip}</li>`).join("")}
        </ul>

        <p style="margin-top: 20px;">Stay financially smart and spend wisely! 🚀</p>
        
        <p>Best Regards, <br><strong>Your Financial Assistant</strong></p>
      </div>
    `;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: emailHTML,
    };

    await transporter.sendMail(mailOptions);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
