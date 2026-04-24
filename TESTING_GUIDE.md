# EmailJS Integration - Testing & Verification Guide

## 🧪 How to Test the Email Integration

### Prerequisites
- ✅ EmailJS package installed
- ✅ EmailJS account created
- ✅ Email templates created
- ✅ Credentials configured
- ✅ Development server running (`npm start`)

---

## 📝 Test Scenario 1: Complete Form Submission

### Step 1: Open the Form
1. Navigate to http://localhost:3000
2. Scroll to "Contact" section
3. Find the "Get Your Free Security Assessment" form

### Step 2: Fill Out the Form
```
Full Name: John Test
Email: john.test@example.com
Company: Test Corp
Team Size: 51–250
Select Slot: Mon 9am
Security Concern: Test consultation booking to verify email integration
```

### Step 3: Submit the Form
Click "Book Free Consultation" button

### Expected Behavior Timeline

| Time | Event | Indicator |
|------|-------|-----------|
| 00:00 | Submit button clicked | Button changes to "Sending..." |
| 00:01 | Form inputs disabled | Grayed out appearance |
| 00:02 | Admin email sent | Check browser console |
| 00:03 | Success message shows | Green checkmark appears |
| 00:04 | Success message fades | Message disappears |
| +3:00 | User email sent | Check your email inbox |

### Step 4: Verify Admin Email
1. Check admin email (support@fusionthreat.com or configured address)
2. Should arrive immediately
3. Subject: "New Consultation Booking - John Test"
4. Body should show:
   - CLIENT DETAILS at top
   - User info in structured format
   - Consultation slot
   - Security concern
   - Submission timestamp

### Step 5: Wait for User Confirmation
1. Wait 3 minutes (180 seconds)
2. Check user email inbox (john.test@example.com)
3. Should see confirmation email
4. Subject: "Your FusionThreat Free Security Consultation is Confirmed!"
5. Body should show booking details and next steps

---

## 🔍 Test Scenario 2: Error Testing

### Test 2A: Missing Credentials
1. Temporarily comment out credentials in emailService.js:
   ```javascript
   const SERVICE_ID = 'service_INVALID';
   ```
2. Submit form
3. **Expected**: Error message banner appears
   - "Failed to send consultation request. Please try again."

### Test 2B: Invalid Email Address
1. Fill form with invalid email: "not-an-email"
2. Submit form
3. **Expected**: Browser validation error (native HTML5)

### Test 2C: Missing Required Fields
1. Leave "Full Name" empty
2. Try to submit
3. **Expected**: Browser validation error

### Test 2D: Network Error
1. Disconnect internet
2. Submit form
3. **Expected**: Error message after timeout
   - "Failed to send consultation request. Please try again."

---

## 🖥️ Browser Console Verification

### What to Look For

**Successful Submission:**
```javascript
// Console should show:
Admin notification sent: {status: 200, text: "OK"}
// After 3 minutes:
User confirmation email sent: {status: 200, text: "OK"}
```

**Error Cases:**
```javascript
// Missing credentials:
EmailJS not configured. Please set up your credentials...

// Network error:
Failed to send admin notification: Error: Network error

// Invalid template ID:
Invalid Template ID
```

### How to Open Console
- **Windows/Linux**: F12 or Ctrl+Shift+I
- **Mac**: Cmd+Option+I
- **Any**: Right-click → Inspect → Console tab

---

## 📧 Email Content Verification

### Admin Email Checklist

Verify the admin email contains:

- [ ] Subject includes client name: "New Consultation Booking - John Test"
- [ ] "CLIENT DETAILS:" section at top
- [ ] Name field: "John Test"
- [ ] Email field: "john.test@example.com"
- [ ] Company field: "Test Corp"
- [ ] Team Size field: "51–250"
- [ ] Submission date with timestamp
- [ ] "SCHEDULED SLOT:" section with "Mon 9am"
- [ ] "SECURITY CONCERN:" section with user's text
- [ ] Professional formatting

### User Email Checklist

Verify the user confirmation email contains:

- [ ] Subject: "Your FusionThreat Free Security Consultation is Confirmed!"
- [ ] Greeting: "Hi John Test,"
- [ ] "YOUR BOOKING DETAILS:" section with:
  - Name
  - Email
  - Company
  - Scheduled Slot
  - Submission Date
- [ ] "WHAT TO EXPECT:" section
- [ ] Checklist of consultation benefits
- [ ] "SECURITY CONCERN NOTED:" with user's text
- [ ] Support contact information
- [ ] Professional signature

---

## ⏱️ Timing Verification

### Admin Email Timing
- **Expected**: Immediate (within 1-2 seconds)
- **Maximum**: 5 seconds
- **If slower**: Check internet connection and EmailJS status

### User Confirmation Timing
- **Expected**: Exactly 180 seconds (3 minutes)
- **Verification**: Submit form, note time, wait 3 minutes
- **Note**: Delay is from form submission, not from when page opened

### Form Reset Timing
- **Expected**: Immediately after success message
- **All fields should be cleared**: name, email, company, size, concern
- **Slot selection should reset**: No slot selected

---

## 📊 Test Results Template

Use this template to document your testing:

```
TEST DATE: _______________
TESTER: _______________

FORM SUBMISSION:
- [ ] Form filled successfully
- [ ] Submit button responsive
- [ ] Loading state works

ADMIN EMAIL:
- [ ] Received immediately
- [ ] Subject correct
- [ ] All fields populated
- [ ] Formatting correct
- [ ] Time: _____________

USER CONFIRMATION EMAIL:
- [ ] Received after 3 minutes
- [ ] Correct recipient email
- [ ] Subject correct
- [ ] All details correct
- [ ] Time received: _____________

SUCCESS CRITERIA MET:
- [ ] Admin gets instant notification
- [ ] User gets confirmation after 3 min
- [ ] Email format with user details at top
- [ ] Professional appearance
- [ ] Error handling works
- [ ] Loading states work

ISSUES FOUND:
1. _______________
2. _______________
3. _______________

RESOLVED: YES / NO
```

---

## 🐛 Debugging Tips

### Check 1: Credentials Verification
```javascript
// Open browser console and type:
console.log({
  serviceId: 'service_YOUR_SERVICE_ID',
  templateIdAdmin: 'template_YOUR_ADMIN_TEMPLATE_ID',
  templateIdUser: 'template_YOUR_USER_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY'
});
```

### Check 2: Email Service Status
```javascript
// In browser console:
import emailjs from '@emailjs/browser';
emailjs.init('YOUR_PUBLIC_KEY')
  .then(() => console.log('EmailJS initialized'))
  .catch(err => console.error('EmailJS init failed:', err));
```

### Check 3: Template Variables
**In EmailJS Dashboard:**
1. Go to Email Templates
2. Click on template
3. Verify variables used in template match these:

**Admin Template Variables:**
- `to_email`
- `client_name`
- `client_email`
- `client_company`
- `client_team_size`
- `client_concern`
- `selected_slot`
- `submission_date`

**User Template Variables:**
- `to_email`
- `user_name`
- `user_email`
- `user_company`
- `user_concern`
- `selected_slot`
- `submission_date`
- `support_email`

### Check 4: API Response Format
When emails are sent, you should see:
```json
{
  "status": 200,
  "text": "OK"
}
```

---

## 🚨 Common Issues & Solutions

### Issue: "EmailJS not configured"
**Cause**: Credentials not set  
**Solution**:
1. Check .env file exists with correct variables
2. Or update emailService.js with credentials directly
3. Verify no typos in credential values
4. Restart dev server (`npm start`)

### Issue: Emails not arriving
**Cause**: Template ID mismatch  
**Solution**:
1. Copy correct Template ID from EmailJS dashboard
2. Verify exact spelling in emailService.js
3. Check template exists in EmailJS dashboard
4. Verify email service is configured

### Issue: Wrong email format
**Cause**: Template format incorrect  
**Solution**:
1. Edit template in EmailJS dashboard
2. Use provided template code (see EMAILJS_SETUP.md)
3. Ensure all variables are wrapped in `{{variable}}`
4. Check for typos in variable names

### Issue: Form stuck on "Sending..."
**Cause**: Network error or invalid credentials  
**Solution**:
1. Check browser console for errors
2. Verify internet connection
3. Check EmailJS account is active
4. Verify API quota not exceeded

### Issue: User email not arriving after 3 minutes
**Cause**: Browser closed or tab inactive  
**Solution**:
1. Keep browser tab active while waiting
2. Check spam folder
3. Verify user email template configured
4. Check EmailJS quota

---

## ✅ Complete Success Checklist

- [ ] npm install @emailjs/browser successful
- [ ] EmailJS account created
- [ ] Service ID obtained
- [ ] Public Key obtained
- [ ] 2 email templates created with correct names
- [ ] Admin template ID obtained
- [ ] User template ID obtained
- [ ] Credentials entered in .env or emailService.js
- [ ] Development server running
- [ ] Form accessible
- [ ] Test form submitted successfully
- [ ] Admin email received instantly
- [ ] User confirmation email received after 3 minutes
- [ ] Email format correct with user details at top
- [ ] Error handling tested
- [ ] Loading states working
- [ ] All success criteria met

**If all checked ✅ - You're ready for production!**

---

## 🎯 Next Steps After Testing

1. **Fix any issues** using debugging tips above
2. **Review email templates** in EmailJS dashboard
3. **Test on different devices** (mobile, tablet, desktop)
4. **Test across browsers** (Chrome, Firefox, Safari, Edge)
5. **Deploy to production**
6. **Monitor EmailJS dashboard** for email sending metrics

---

## 📞 Support

- **EmailJS Documentation**: https://www.emailjs.com/docs/
- **Setup Guide**: See EMAILJS_SETUP.md
- **Quick Reference**: See EMAILJS_QUICK_START.md
- **Full Docs**: See EMAILJS_IMPLEMENTATION.md

**Happy testing! 🧪✨**
