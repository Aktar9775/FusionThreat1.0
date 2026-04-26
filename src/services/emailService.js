import emailjs from "@emailjs/browser";

/* ================= CONFIG ================= */

const getConfig = () => {
  const config = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateAdmin: import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN,
    templateUser: import.meta.env.VITE_EMAILJS_TEMPLATE_USER,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  };

  // 🔍 Debug (remove after testing)
  console.log("CONFIG DEBUG:", config);

  return config;
};

const isConfigured = (config) => {
  return !!(
    config.serviceId &&
    config.templateAdmin &&
    config.templateUser &&
    config.publicKey
  );
};

/* ================= INIT (only once) ================= */

let isInitialized = false;

const initEmailJS = (publicKey) => {
  if (!isInitialized) {
    emailjs.init(publicKey);
    isInitialized = true;
    console.log("✅ EmailJS initialized");
  }
};

/* ================= ADMIN EMAIL ================= */

export const sendAdminNotification = async (formData) => {
  const config = getConfig();

  if (!isConfigured(config)) {
    console.error("❌ EmailJS config missing:", config);
    throw new Error("EmailJS is not configured. Check your env variables.");
  }

  initEmailJS(config.publicKey);

  const templateParams = {
    to_email: "support@fusionthreat.com",
    client_name: formData.name,
    client_email: formData.email,
    client_company: formData.company || "Not specified",
    client_team_size: formData.size || "Not specified",
    client_concern: formData.concern,
    selected_slot: formData.selectedSlot || "Not selected",
    submission_date: new Date().toLocaleString(),
  };

  try {
    const response = await emailjs.send(
      config.serviceId,
      config.templateAdmin,
      templateParams
    );

    console.log("✅ Admin email sent:", response);
    return response;
  } catch (error) {
    console.error("❌ Admin email failed:", error);
    throw error;
  }
};

/* ================= USER EMAIL ================= */

export const sendUserConfirmation = async (formData) => {
  const config = getConfig();

  if (!isConfigured(config)) {
    console.error("❌ EmailJS config missing:", config);
    throw new Error("EmailJS is not configured.");
  }

  initEmailJS(config.publicKey);

  const templateParams = {
    to_email: formData.email,
    user_name: formData.name,
    user_email: formData.email,
    user_company: formData.company || "Not specified",
    user_concern: formData.concern,
    selected_slot: formData.selectedSlot || "Not selected",
    submission_date: new Date().toLocaleString(),
    support_email: "support@fusionthreat.com",
  };

  try {
    const response = await emailjs.send(
      config.serviceId,
      config.templateUser,
      templateParams
    );

    console.log("✅ User email sent:", response);
    return response;
  } catch (error) {
    console.error("❌ User email failed:", error);
    throw error;
  }
};

/* ================= MAIN FLOW ================= */

export const handleConsultationBooking = async (formData) => {
  try {
    // 1️⃣ Send admin email immediately
    await sendAdminNotification(formData);

    // 2️⃣ Send user email after delay
    setTimeout(() => {
      sendUserConfirmation(formData).catch((err) =>
        console.error("Delayed user email failed:", err)
      );
    }, 60000);

    return {
      success: true,
      message: "Consultation booked successfully!",
    };
  } catch (error) {
    console.error("❌ Booking error:", error);

    return {
      success: false,
      message: "Failed to send email. Please try again.",
    };
  }
};