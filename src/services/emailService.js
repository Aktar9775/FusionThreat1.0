import emailjs from '@emailjs/browser';

// Initialize EmailJS - Replace with your credentials from https://www.emailjs.com/
// You can also use environment variables: REACT_APP_EMAILJS_SERVICE_ID, etc.
const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_YOUR_SERVICE_ID';
const TEMPLATE_ID_ADMIN = process.env.REACT_APP_EMAILJS_TEMPLATE_ADMIN || 'template_YOUR_ADMIN_TEMPLATE_ID';
const TEMPLATE_ID_USER = process.env.REACT_APP_EMAILJS_TEMPLATE_USER || 'template_YOUR_USER_TEMPLATE_ID';
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

// Check if credentials are properly configured
const isConfigured = () => {
  return (
    SERVICE_ID !== 'service_YOUR_SERVICE_ID' &&
    TEMPLATE_ID_ADMIN !== 'template_YOUR_ADMIN_TEMPLATE_ID' &&
    TEMPLATE_ID_USER !== 'template_YOUR_USER_TEMPLATE_ID' &&
    PUBLIC_KEY !== 'YOUR_PUBLIC_KEY'
  );
};

// Initialize EmailJS
if (PUBLIC_KEY && PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
  emailjs.init(PUBLIC_KEY);
} else {
  console.warn(
    'EmailJS not configured. Please set up your credentials in src/services/emailService.js or in .env file'
  );
}

/**
 * Send consultation request notification to admin
 * @param {Object} formData - { name, email, company, size, concern, selectedSlot }
 */
export const sendAdminNotification = async (formData) => {
  if (!isConfigured()) {
    throw new Error('EmailJS is not configured. Please set up your credentials.');
  }

  const templateParams = {
    to_email: 'support@fusionthreat.com',
    client_name: formData.name,
    client_email: formData.email,
    client_company: formData.company || 'Not specified',
    client_team_size: formData.size || 'Not specified',
    client_concern: formData.concern,
    selected_slot: formData.selectedSlot || 'Not selected',
    submission_date: new Date().toLocaleString(),
  };

  const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID_ADMIN, templateParams);
  console.log('Admin notification sent:', response);
  return response;
};

/**
 * Send confirmation email to the user (called after a delay)
 * @param {Object} formData - { name, email, company, size, concern, selectedSlot }
 */
export const sendUserConfirmation = async (formData) => {
  // FIX: guard added — sendUserConfirmation now also requires EmailJS to be configured
  if (!isConfigured()) {
    throw new Error('EmailJS is not configured. Please set up your credentials.');
  }

  const templateParams = {
    to_email: formData.email,
    user_name: formData.name,
    user_email: formData.email,
    user_company: formData.company || 'Not specified',
    user_concern: formData.concern,
    selected_slot: formData.selectedSlot || 'Not selected',
    submission_date: new Date().toLocaleString(),
    support_email: 'support@fusionthreat.com',
  };

  const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID_USER, templateParams);
  console.log('User confirmation email sent:', response);
  return response;
};

/**
 * Send ticket notification to admin
 * @param {Object} ticketData - { name, email, priority, category, title, desc }
 */
export const sendTicketNotification = async (ticketData) => {
  if (!isConfigured()) {
    throw new Error('EmailJS is not configured. Please set up your credentials.');
  }

  const templateParams = {
    to_email: 'support@fusionthreat.com',
    client_name: ticketData.name,
    client_email: ticketData.email,
    ticket_priority: ticketData.priority,
    ticket_category: ticketData.category,
    ticket_title: ticketData.title,
    ticket_description: ticketData.desc,
    submission_date: new Date().toLocaleString(),
  };

  const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID_ADMIN, templateParams);
  console.log('Ticket notification sent:', response);
  return response;
};

/**
 * Book a consultation: notify admin immediately, confirm to user after 1 minute.
 * @param {Object} formData - { name, email, company, size, concern, selectedSlot }
 * @returns {{ success: boolean, message: string }}
 */
export const handleConsultationBooking = async (formData) => {
  // Send admin notification immediately — throws on error so caller can catch
  await sendAdminNotification(formData);

  // Send user confirmation after 1 minute (non-blocking; errors logged only)
  setTimeout(() => {
    sendUserConfirmation(formData).catch((err) =>
      console.error('Delayed user confirmation failed:', err)
    );
  }, 60_000);

  return { success: true, message: 'Consultation booked successfully!' };
};