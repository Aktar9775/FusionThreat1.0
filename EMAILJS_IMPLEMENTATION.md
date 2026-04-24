# FusionThreat - EmailJS Integration for Free Consultation Booking

## Overview

This implementation adds automated email notifications to your "Book Free Consultation" form using EmailJS. The system sends:

1. **Admin Notification** - Sent immediately when a user submits the form
2. **User Confirmation Email** - Sent to the user after 3 minutes

## Features

✅ **Admin Email** with complete user details  
✅ **User Confirmation Email** sent automatically after 3 minutes  
✅ **User details displayed at top of email** as requested  
✅ **Loading states** and error handling  
✅ **Error notifications** in the UI  
✅ **Environment variable support** for secure credential management  
✅ **Responsive design** maintained  

## What Was Changed

### 1. **New Files Created**

- `src/services/emailService.js` - Email service with functions for sending admin and user emails
- `EMAILJS_SETUP.md` - Complete setup guide with instructions and email templates
- `.env.example` - Environment variables template

### 2. **Updated Files**

- `src/components/Contact.js` - Enhanced with:
  - Import of emailService functions
  - Loading state management
  - Error handling and display
  - Automatic 3-minute delay for user confirmation email
  - Better UX with disabled states during form submission
  - Confirmation message showing user email address

### 3. **Dependencies Added**

- `@emailjs/browser` - EmailJS SDK for sending emails

## Email Format

### Admin Email
Shows user details at the top in this format:

```
CLIENT DETAILS:
• Name: John Doe
• Email: john@company.com
• Company: Tech Corp
• Team Size: 51–250
• Date: 4/24/2026, 2:45:30 PM

SCHEDULED SLOT: Mon 9am

SECURITY CONCERN:
[User's security concern text]
```

### User Confirmation Email
Sent to the user after 3 minutes with:

```
YOUR BOOKING DETAILS:
• Name: John Doe
• Email: john@company.com
• Company: Tech Corp
• Scheduled Slot: Mon 9am
• Submission Date: 4/24/2026, 2:45:30 PM

[Consultation details and next steps]
```

## Setup Instructions

Follow the detailed guide in [EMAILJS_SETUP.md](./EMAILJS_SETUP.md)

### Quick Start

1. **Install EmailJS** (already done):
   ```bash
   npm install @emailjs/browser
   ```

2. **Create EmailJS Account**:
   - Visit https://www.emailjs.com/
   - Sign up for free account

3. **Get Credentials**:
   - Service ID
   - Public Key
   - Create 2 email templates (instructions in EMAILJS_SETUP.md)
   - Get Template IDs

4. **Configure Credentials**:
   
   **Option A: Environment Variables (Recommended)**
   ```bash
   # Create .env file in project root
   REACT_APP_EMAILJS_SERVICE_ID=service_xxx
   REACT_APP_EMAILJS_TEMPLATE_ADMIN=template_xxx
   REACT_APP_EMAILJS_TEMPLATE_USER=template_xxx
   REACT_APP_EMAILJS_PUBLIC_KEY=xxxx_public_key
   ```

   **Option B: Direct in Code**
   ```javascript
   // src/services/emailService.js
   const SERVICE_ID = 'your_service_id';
   const TEMPLATE_ID_ADMIN = 'your_admin_template_id';
   const TEMPLATE_ID_USER = 'your_user_template_id';
   const PUBLIC_KEY = 'your_public_key';
   ```

5. **Test the Form**:
   ```bash
   npm start
   ```
   - Fill out the consultation form
   - You should receive admin email immediately
   - Check your email inbox for confirmation after 3 minutes

## How It Works

### Form Submission Flow

```
User fills form
    ↓
Form submitted
    ↓
[handleConsultationBooking triggered]
    ↓
├─ Send ADMIN email immediately
│  └─ Admin receives notification with all user details
│
└─ Schedule USER confirmation email
   └─ After 180 seconds (3 minutes)
      └─ User receives confirmation email
```

### Code Flow

```javascript
// Contact.js - Form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  
  const formData = { name, email, company, size, concern, selectedSlot };
  
  try {
    await handleConsultationBooking(formData); // Calls emailService
    setSubmitted(true);
  } catch (err) {
    setError('Failed to send consultation request');
  } finally {
    setLoading(false);
  }
};

// emailService.js
export const handleConsultationBooking = async (formData) => {
  // 1. Send admin email immediately
  await sendAdminNotification(formData);
  
  // 2. Schedule user email after 3 minutes
  setTimeout(() => {
    sendUserConfirmation(formData);
  }, 180000); // 3 minutes = 180000 ms
};
```

## Email Templates

### Template Variables Available

**Admin Email Template Variables:**
- `to_email` - Admin email address
- `client_name` - User's full name
- `client_email` - User's email
- `client_company` - User's company
- `client_team_size` - Team size selection
- `client_concern` - Security concern text
- `selected_slot` - Selected consultation time
- `submission_date` - Submission timestamp

**User Email Template Variables:**
- `to_email` - User's email
- `user_name` - User's full name
- `user_email` - User's email
- `user_company` - User's company
- `user_concern` - Security concern text
- `selected_slot` - Selected consultation time
- `submission_date` - Submission timestamp
- `support_email` - Support contact email

## Configuration Validation

The service includes a configuration check:

```javascript
const isConfigured = () => {
  return (
    SERVICE_ID !== 'service_YOUR_SERVICE_ID' &&
    TEMPLATE_ID_ADMIN !== 'template_YOUR_ADMIN_TEMPLATE_ID' &&
    TEMPLATE_ID_USER !== 'template_YOUR_USER_TEMPLATE_ID' &&
    PUBLIC_KEY !== 'YOUR_PUBLIC_KEY'
  );
};
```

If not configured, the form will show an error message.

## Error Handling

The form includes robust error handling:

1. **Configuration errors** - Detected and logged
2. **Network errors** - User sees error message
3. **API errors** - Caught and displayed
4. **Timeout handling** - User email delay doesn't block UI

## Testing

### Manual Testing Checklist

- [ ] Fill out consultation form with all fields
- [ ] Submit form
- [ ] Check console for success messages
- [ ] Verify admin email received immediately
- [ ] Wait 3 minutes for user confirmation email
- [ ] Check both emails have correct formatting
- [ ] Test error scenario (invalid credentials)
- [ ] Test on mobile (responsive design)

### Unit Testing (Optional)

```javascript
// Example test
import { sendAdminNotification } from './emailService';

describe('emailService', () => {
  it('should send admin notification with correct format', async () => {
    const mockData = {
      name: 'Test User',
      email: 'test@example.com',
      company: 'Test Corp',
      size: '51–250',
      concern: 'Test concern',
      selectedSlot: 'Mon 9am'
    };
    
    const result = await sendAdminNotification(mockData);
    expect(result.status).toBe(200);
  });
});
```

## Troubleshooting

### Issue: Form submission shows loading forever
- **Solution**: Check browser console for errors
- Verify credentials are correct in emailService.js
- Check EmailJS dashboard for API status

### Issue: Emails not received
- **Solution**: Check spam/junk folder
- Verify email service is configured in EmailJS dashboard
- Confirm template IDs match in both places

### Issue: Wrong email format
- **Solution**: Check template format in EmailJS dashboard
- Verify template variables match the code
- Review EMAILJS_SETUP.md templates

### Issue: 3-minute delay not working
- **Solution**: Browser might be blocking setTimeout (unlikely)
- Check browser console for errors
- Ensure user confirmation template is configured

## Security Best Practices

⚠️ **Important Security Notes:**

1. **Never commit credentials** to GitHub
   - Use `.env` files (add to `.gitignore`)
   - Use environment variables in production

2. **Validate input** before sending
   - Currently validates required fields in form
   - Add backend validation for production

3. **Rate limiting** (for production)
   - Consider adding rate limiting to prevent spam
   - EmailJS has built-in limits (check pricing)

4. **Email verification**
   - Verify user email in production
   - Add DKIM/SPF records for deliverability

## Production Deployment

For production deployment:

1. **Set environment variables** in your hosting platform
   - Vercel: Settings → Environment Variables
   - Netlify: Build & Deploy → Environment
   - AWS: Lambda Environment Variables

2. **Enable DKIM/SPF** for your domain
   - Improves email deliverability
   - Reduces spam filtering

3. **Monitor email sending**
   - Use EmailJS analytics dashboard
   - Track delivery rates

4. **Increase rate limits**
   - Upgrade EmailJS plan as needed
   - Consider backend solution for high volume

## Customization

### Modify Email Delay

Change the 3-minute delay in `src/services/emailService.js`:

```javascript
// Current: 180000 ms = 3 minutes
setTimeout(() => {
  sendUserConfirmation(formData);
}, 180000); // Change to desired milliseconds
```

Options:
- 60000 = 1 minute
- 120000 = 2 minutes
- 300000 = 5 minutes

### Customize Email Templates

Edit templates in EmailJS dashboard:
- Change email subject
- Modify email body content
- Add/remove template variables
- Add company branding

### Add More Fields

To add more form fields:

1. Add field to form state in Contact.js
2. Add input element to form
3. Add field to formData object
4. Add template variable in emailService.js
5. Update email templates in EmailJS dashboard

## Support & Resources

- **EmailJS Documentation**: https://www.emailjs.com/docs/
- **EmailJS Dashboard**: https://dashboard.emailjs.com/
- **Setup Guide**: See [EMAILJS_SETUP.md](./EMAILJS_SETUP.md)

## Next Steps

1. Follow the setup guide in [EMAILJS_SETUP.md](./EMAILJS_SETUP.md)
2. Configure your EmailJS credentials
3. Create email templates as described
4. Test the form
5. Deploy to production

Happy emailing! 🚀
