import emailjs from '@emailjs/browser';

/* ================= CONFIG ================= */

const getConfig = () => ({
  serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
  templateAdmin: process.env.REACT_APP_EMAILJS_TEMPLATE_ADMIN,
  templateUser: process.env.REACT_APP_EMAILJS_TEMPLATE_USER,
  publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
});

const isConfigured = () => {
  const { serviceId, templateAdmin, templateUser, publicKey } = getConfig();
  return !!(serviceId && templateAdmin && templateUser && publicKey);
};

/* ================= INIT (ONLY ONCE) ================= */

let isInitialized = false;

const initEmailJS = () => {
  if (!isInitialized) {
    const { publicKey } = getConfig();
    emailjs.init(publicKey);
    isInitialized = true;
  }
};

/* ================= ADMIN EMAIL ================= */

export const sendAdminNotification = async (formData) => {
  if (!isConfigured()) {
    throw new Error('EmailJS is not configured. Check your .env file.');
  }

  initEmailJS();

  const { serviceId, templateAdmin } = getConfig();

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

  console.log('Sending Admin Email:', templateParams);

  const response = await emailjs.send(
    serviceId,
    templateAdmin,
    templateParams
  );

  console.log('Admin notification sent:', response);
  return response;
};

/* ================= USER CONFIRMATION ================= */

export const sendUserConfirmation = async (formData) => {
  if (!isConfigured()) {
    throw new Error('EmailJS is not configured. Check your .env file.');
  }

  initEmailJS();

  const { serviceId, templateUser } = getConfig();

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

  console.log('Sending User Confirmation:', templateParams);

  const response = await emailjs.send(
    serviceId,
    templateUser,
    templateParams
  );

  console.log('User confirmation sent:', response);
  return response;
};

/* ================= TICKET (SAFE PLACEHOLDER) ================= */

export const sendTicketNotification = async (ticketData) => {
  console.warn(
    '⚠️ Ticket notification is disabled. Create EmailJS template to enable.'
  );

  return {
    success: false,
    message: 'Ticket system not configured yet.',
  };
};

/* ================= MAIN HANDLER ================= */

export const handleConsultationBooking = async (formData) => {
  try {
    await sendAdminNotification(formData);

    // Send user email after delay (non-blocking)
    setTimeout(() => {
      sendUserConfirmation(formData).catch((err) =>
        console.error('User email failed:', err)
      );
    }, 60000);

    return {
      success: true,
      message: 'Consultation booked successfully!',
    };
  } catch (error) {
    console.error('Booking failed:', error);

    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    };
  }
};