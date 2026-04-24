# EmailJS Configuration Guide

This guide will help you set up EmailJS to send emails from your FusionThreat booking form.

## Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up Free"
3. Create your account and verify your email

## Step 2: Get Your Credentials

### Service ID
1. From your EmailJS dashboard, go to **Accounts** → **General**
2. Copy your **Service ID** (e.g., `service_abcd1234efgh5678`)

### Public Key
1. In the same **General** tab, find **API Keys**
2. Copy your **Public Key** (e.g., `k2d8j3_public_key_abc123`)

### Template IDs (Create Email Templates)

#### Template 1: Admin Notification Email
1. Go to **Email Templates** and click **Create New Template**
2. Name it: `Book_Free_Consultation_Admin`
3. Set Subject to: `New Consultation Booking - {{client_name}}`
4. Use this professional auto-reply template:

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; max-width: 600px; margin: 0 auto;">
  <!-- Logo Section -->
  <a style="text-decoration: none; outline: none" href="https://www.fusionthreat.com" target="_blank">
    <img style="height: 32px; vertical-align: middle; margin-bottom: 20px;" height="32px" src="cid:logo.png" alt="FusionThreat Logo" />
  </a>

  <!-- Header -->
  <p style="padding-top: 16px; border-top: 1px solid #eaeaea; color: #333; margin: 20px 0; font-size: 18px; font-weight: bold;">
    New Consultation Booking Received
  </p>

  <!-- Main Message -->
  <p style="color: #666; line-height: 1.6; margin: 15px 0;">
    A new free consultation request has been received from <strong>{{client_name}}</strong>. The client is interested in a consultation for <strong>"{{selected_slot}}"</strong>. Please reach out to confirm the booking and discuss their security requirements.
  </p>

  <!-- Client Details Section -->
  <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #00ff88;">
    <div style="font-weight: bold; color: #2c3e50; margin-bottom: 12px;">CLIENT DETAILS:</div>
    <table role="presentation" style="width: 100%; font-size: 14px;">
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Name:</strong></td>
        <td style="padding: 8px 0; color: #333;">{{client_name}}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
        <td style="padding: 8px 0; color: #333;">
          <a href="mailto:{{client_email}}" style="color: #00ff88; text-decoration: none;">{{client_email}}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Company:</strong></td>
        <td style="padding: 8px 0; color: #333;">{{client_company}}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Team Size:</strong></td>
        <td style="padding: 8px 0; color: #333;">{{client_team_size}}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Preferred Time Slot:</strong></td>
        <td style="padding: 8px 0; color: #333;">{{selected_slot}}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Submission Date:</strong></td>
        <td style="padding: 8px 0; color: #333;">{{submission_date}}</td>
      </tr>
    </table>
  </div>

  <!-- Security Concern Section -->
  <div style="margin: 20px 0; padding: 15px; background-color: #fff9e6; border-radius: 5px;">
    <div style="font-weight: bold; color: #2c3e50; margin-bottom: 10px;">CLIENT'S SECURITY CONCERN:</div>
    <p style="color: #666; line-height: 1.6; margin: 0;">{{client_concern}}</p>
  </div>

  <!-- Action Required -->
  <div style="margin: 20px 0; padding: 15px; background-color: #e8f4f8; border-radius: 5px; border-left: 4px solid #2196F3;">
    <div style="font-weight: bold; color: #2c3e50; margin-bottom: 10px;">ACTION REQUIRED:</div>
    <ul style="color: #666; line-height: 1.8; padding-left: 20px; margin: 0;">
      <li>Review the client's security concern and requirements</li>
      <li>Reach out to confirm the scheduled consultation slot</li>
      <li>Prepare a customized proposal based on their industry and team size</li>
      <li>Schedule the 30-minute consultation with senior security architects</li>
    </ul>
  </div>

  <!-- Priority Indicator -->
  <p style="margin: 20px 0; color: #d9534f; font-weight: bold;">
    🔔 Priority: Please respond within 24 hours to maximize conversion potential.
  </p>

  <!-- Footer -->
  <p style="padding-top: 16px; border-top: 1px solid #eaeaea; color: #999; font-size: 14px; margin-top: 30px;">
    This is an automated notification from your FusionThreat booking system. For system support, contact your administrator.
    <br /><br />
    <strong style="color: #333;">Best regards,<br />The FusionThreat Admin System</strong>
  </p>

  <!-- Copyright -->
  <p style="color: #ccc; font-size: 12px; text-align: center; margin-top: 20px;">
    © 2026 FusionThreat. All rights reserved.
  </p>
</div>
```

5. Click **Save**
6. Copy the Template ID (shown on the template list)

#### Template 2: User Confirmation Email (Auto-Reply)
1. Create another template named: `Book_Free_Consultation_User_Confirmation`
2. Set Subject to: `We've Received Your Free Consultation Request - {{user_name}}`
3. Use this professional auto-reply template:

```html

<div style="font-family: system-ui, sans-serif, Arial; font-size: 16px; max-width: 600px; margin: 0 auto;">
  <!-- Logo Section -->
  <a style="text-decoration: none; outline: none" href="https://www.fusionthreat.com" target="_blank">
    <img style="height: 32px; vertical-align: middle; margin-bottom: 20px;" height="32px" src="cid:logo.png" alt="FusionThreat Logo" />
  </a>

  <!-- Greeting -->
  <p style="padding-top: 16px; border-top: 1px solid #eaeaea; color: #333; margin: 20px 0;">
    Hi {{user_name}},
  </p>

  <!-- Main Message -->
  <p style="color: #666; line-height: 1.6; margin: 15px 0;">
    Thank you for reaching out to us! We have received your free consultation booking request for <strong>"{{selected_slot}}"</strong>, and our security team will review it within 24 hours.
  </p>

  <!-- Booking Details Section -->
  <div style="margin: 20px 0; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #ff2200;">
    <div style="font-weight: bold; color: #2c3e50; margin-bottom: 12px;">YOUR BOOKING DETAILS:</div>
    <table role="presentation" style="width: 100%; font-size: 14px;">
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Name:</strong></td>
        <td style="padding: 8px 0; color: #333;">{{user_name}}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
        <td style="padding: 8px 0; color: #333;">{{user_email}}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Company:</strong></td>
        <td style="padding: 8px 0; color: #333;">{{user_company}}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Scheduled Slot:</strong></td>
        <td style="padding: 8px 0; color: #333;">{{selected_slot}}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666;"><strong>Request Date:</strong></td>
        <td style="padding: 8px 0; color: #333;">{{submission_date}}</td>
      </tr>
    </table>
  </div>

  <!-- What to Expect -->
  <div style="margin: 20px 0; padding: 15px; background-color: #f0f8ff; border-radius: 5px;">
    <div style="font-weight: bold; color: #2c3e50; margin-bottom: 12px;">WHAT TO EXPECT:</div>
    <ul style="color: #666; line-height: 1.8; padding-left: 20px; margin: 0;">
      <li>Review of your current security posture</li>
      <li>Industry-specific threat analysis</li>
      <li>Compliance gap identification</li>
      <li>Custom pricing & service recommendations</li>
      <li>30-day pilot program availability discussion</li>
    </ul>
  </div>

  <!-- Security Concern -->
  <div style="margin: 20px 0; padding: 15px; background-color: #fff9e6; border-radius: 5px;">
    <div style="font-weight: bold; color: #2c3e50; margin-bottom: 10px;">YOUR SECURITY CONCERN:</div>
    <p style="color: #666; margin: 0;">{{user_concern}}</p>
  </div>

  <!-- Next Steps -->
  <p style="color: #666; line-height: 1.6; margin: 20px 0;">
    Our expert security team will contact you shortly to confirm your consultation details. If you need to reschedule or have any immediate questions, please don't hesitate to reach out.
  </p>

  <!-- Contact Information -->
  <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-radius: 5px; font-size: 14px;">
    <div style="font-weight: bold; color: #2c3e50; margin-bottom: 10px;">CONTACT US:</div>
    <p style="color: #666; margin: 5px 0;">
      📧 Email: <a href="mailto:{{support_email}}" style="color: #ff2200; text-decoration: none;">{{support_email}}</a>
    </p>
    <p style="color: #666; margin: 5px 0;">
      🌐 Website: <a href="https://www.fusionthreat.com" style="color: #ff2200; text-decoration: none;">www.fusionthreat.com</a>
    </p>
  </div>

  <!-- Footer -->
  <p style="padding-top: 16px; border-top: 1px solid #eaeaea; color: #999; font-size: 14px; margin-top: 30px;">
    We look forward to helping you strengthen your security and protecting your organization from evolving threats.
    <br /><br />
    <strong style="color: #333;">Best regards,<br />The FusionThreat Security Team</strong>
  </p>

  <!-- Copyright -->
  <p style="color: #ccc; font-size: 12px; text-align: center; margin-top: 20px;">
    © 2026 FusionThreat. All rights reserved.
  </p>
</div>
```

4. Click **Save**
5. Copy this Template ID

## Step 3: Update Your Code

Open `src/services/emailService.js` and replace these values:

```javascript
const SERVICE_ID = 'service_YOUR_SERVICE_ID'; // Replace with your Service ID
const TEMPLATE_ID_ADMIN = 'template_YOUR_ADMIN_TEMPLATE_ID'; // Template 1 ID
const TEMPLATE_ID_USER = 'template_YOUR_USER_TEMPLATE_ID'; // Template 2 ID
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Replace with your Public Key
```

Example:
```javascript
const SERVICE_ID = 'service_a1b2c3d4e5f6g7h8';
const TEMPLATE_ID_ADMIN = 'template_xyz789abc456';
const TEMPLATE_ID_USER = 'template_qwe123rty456';
const PUBLIC_KEY = 'k2d8j3_public_key_abc123xyz789';
```

## Step 4: Verify Email Configuration

1. In EmailJS dashboard, go to **Email Services**
2. Add your email service (Gmail, Outlook, etc.)
3. Authorize FusionThreat to send emails from your account

## Step 5: Test the Form

1. Run your app: `npm start`
2. Navigate to the Contact section
3. Fill in the form and submit
4. You should receive:
   - **Admin email** immediately
   - **User confirmation email** after 3 minutes

## Important Notes

⚠️ **Email Sending Limits**
- Free tier: 200 emails/month
- Upgrade if you expect more bookings

⚠️ **Security**
- Don't commit your actual credentials to GitHub
- Consider using environment variables in production
- Use `.env` file for local development

## Optional: Use Environment Variables

Create a `.env` file in your project root:

```
REACT_APP_EMAILJS_SERVICE_ID=service_YOUR_SERVICE_ID
REACT_APP_EMAILJS_TEMPLATE_ADMIN=template_YOUR_ADMIN_TEMPLATE_ID
REACT_APP_EMAILJS_TEMPLATE_USER=template_YOUR_USER_TEMPLATE_ID
REACT_APP_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
```

Then update `emailService.js`:

```javascript
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID_ADMIN = process.env.REACT_APP_EMAILJS_TEMPLATE_ADMIN;
const TEMPLATE_ID_USER = process.env.REACT_APP_EMAILJS_TEMPLATE_USER;
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
```

## Troubleshooting

**Problem**: Emails not being sent
- ✓ Check your Service ID is correct
- ✓ Verify Template IDs exist in EmailJS dashboard
- ✓ Confirm Public Key is accurate
- ✓ Check browser console for errors

**Problem**: Form submission fails
- ✓ Open browser DevTools → Console
- ✓ Look for error messages
- ✓ Verify email service is configured in EmailJS

**Problem**: Emails going to spam
- ✓ Use your company domain email
- ✓ Configure DKIM/SPF records
- ✓ Check EmailJS documentation for setup

Need help? Visit: https://www.emailjs.com/docs/
