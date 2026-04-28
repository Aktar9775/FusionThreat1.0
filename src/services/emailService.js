import emailjs from '@emailjs/browser';

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

export const sendAdminNotification = async (formData) => {
  const { serviceId, templateAdmin, publicKey } = getConfig();

  if (!isConfigured()) {
    throw new Error('EmailJS is not configured. Check your .env file.');
  }

  emailjs.init(publicKey);

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

  console.log('Sending consultation templateParams:', templateParams);
  console.log('Using templateId:', templateAdmin);

  const response = await emailjs.send(serviceId, templateAdmin, templateParams);
  console.log('Admin notification sent:', response);
  return response;
};

export const sendUserConfirmation = async (formData) => {
  const { serviceId, templateUser, publicKey } = getConfig();

  if (!isConfigured()) {
    throw new Error('EmailJS is not configured. Check your .env file.');
  }

  emailjs.init(publicKey);

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

  const response = await emailjs.send(serviceId, templateUser, templateParams);
  console.log('User confirmation sent:', response);
  return response;
};

// ← Ticket form disabled until separate template is created on EmailJS dashboard
export const sendTicketNotification = async (ticketData) => {
  console.warn('Ticket notification is currently disabled. Create a separate EmailJS template to enable it.');
  return { success: false, message: 'Ticket form is not yet configured.' };
};

export const handleConsultationBooking = async (formData) => {
  await sendAdminNotification(formData);

  setTimeout(() => {
    sendUserConfirmation(formData).catch((err) =>
      console.error('Delayed user confirmation failed:', err)
    );
  }, 60_000);

  return { success: true, message: 'Consultation booked successfully!' };
};