# EmailJS Integration - Quick Start Guide

## ⚡ 5-Step Quick Setup

### 1️⃣ Install Dependencies
```bash
npm install @emailjs/browser  # ✅ Already done
```

### 2️⃣ Create EmailJS Account
- Visit: https://www.emailjs.com/
- Sign up for **FREE**
- Verify your email

### 3️⃣ Get Your 4 Credentials
Copy these from EmailJS dashboard:

| Credential | Where to Find |
|-----------|----------------|
| **Service ID** | Accounts → General → Service ID |
| **Public Key** | Accounts → General → API Keys → Public Key |
| **Admin Template ID** | Email Templates (create template 1) |
| **User Template ID** | Email Templates (create template 2) |

### 4️⃣ Create 2 Email Templates

**Template 1: Admin Email**
- Name: `Book_Free_Consultation_Admin`
- Subject: `New Consultation Booking - {{client_name}}`
- Body: (Use template from EMAILJS_SETUP.md)

**Template 2: User Confirmation**
- Name: `Book_Free_Consultation_User_Confirmation`
- Subject: `Your FusionThreat Free Security Consultation is Confirmed!`
- Body: (Use template from EMAILJS_SETUP.md)

### 5️⃣ Update Credentials (Choose One)

**Option A: Use .env (Recommended)**
```bash
# Create file: .env (at project root)
REACT_APP_EMAILJS_SERVICE_ID=service_abc123
REACT_APP_EMAILJS_TEMPLATE_ADMIN=template_xyz789
REACT_APP_EMAILJS_TEMPLATE_USER=template_qwe123
REACT_APP_EMAILJS_PUBLIC_KEY=k2d8j3_public_key_123
```

**Option B: Edit Code**
```javascript
// File: src/services/emailService.js
const SERVICE_ID = 'service_abc123';
const TEMPLATE_ID_ADMIN = 'template_xyz789';
const TEMPLATE_ID_USER = 'template_qwe123';
const PUBLIC_KEY = 'k2d8j3_public_key_123';
```

## ✅ Testing

```bash
npm start
# Visit Contact section
# Fill out form and submit
# Check:
#  ✓ Admin email arrives immediately
#  ✓ User confirmation arrives after 3 minutes
```

## 📧 Email Flow

```
User submits form
       ↓
Admin email sent IMMEDIATELY ✉️
       ↓
User confirmation scheduled (+3 min) ⏱️
       ↓
After 3 minutes...
       ↓
User confirmation sent ✉️
```

## 📋 Form Fields Captured

User details appear at top of emails:
- ✓ Name
- ✓ Email  
- ✓ Company
- ✓ Team Size
- ✓ Security Concern
- ✓ Selected Time Slot
- ✓ Submission Date/Time

## 🚀 What Happens After Submit

1. **Immediate**: Form shows loading state
2. **Instant**: Admin receives email with all user details
3. **Instant**: Success message shows "Confirmation email will be sent in 3 minutes"
4. **+3 Min**: User automatically receives confirmation email
5. **+4 Sec**: Success message disappears

## 🔧 Customization

### Change Email Delay
File: `src/services/emailService.js`
```javascript
setTimeout(() => {
  sendUserConfirmation(formData);
}, 180000); // 180000 ms = 3 minutes
// Change to: 60000 (1 min), 300000 (5 min), etc.
```

### Change Email Templates
- Edit in EmailJS dashboard
- Keep variable names: `{{client_name}}`, `{{client_email}}`, etc.

## ⚠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| Emails not sending | Check credentials in .env or code |
| No admin email | Verify admin template ID is correct |
| No user email after 3 min | Check browser stays open, template configured |
| Wrong email format | Edit template in EmailJS dashboard |
| Form stuck loading | Check browser console for errors |

## 📚 Full Documentation

- **Setup Guide**: See `EMAILJS_SETUP.md`
- **Implementation Details**: See `EMAILJS_IMPLEMENTATION.md`
- **EmailJS Help**: https://www.emailjs.com/docs/

## ✨ Features Included

✅ Admin notification sent immediately  
✅ User confirmation sent after 3 minutes  
✅ User details at top of email  
✅ Loading states during submission  
✅ Error handling & display  
✅ Environment variable support  
✅ Responsive design maintained  

## 🎯 Next Steps

1. Get EmailJS credentials (5 min)
2. Create 2 email templates (5 min)
3. Update .env file (2 min)
4. Test form (2 min)
5. Deploy! 🚀

---

**Need help?** Check EMAILJS_SETUP.md for detailed step-by-step instructions.
