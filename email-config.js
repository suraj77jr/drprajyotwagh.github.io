// Email Configuration for Adopt The Ayurveda
// Using EmailJS for appointment form emails

const EMAILJS_CONFIG = {
    USER_ID: "PTTVqZgqFup6EbJwz",      // Your EmailJS User ID
    SERVICE_ID: "service_h24b69s",     // Your EmailJS Service ID
    TEMPLATE_ID: "template_yj5h4d4",   // Your EmailJS Template ID
    FROM_EMAIL: "adopt.ayurveda.service@gmail.com", // Sender email
    TO_EMAIL: "aditya.rustagi54@gmail.com"          // Recipient email
};

// METHOD 2: Formspree Configuration (RECOMMENDED - Easiest Setup)
// 1. Go to https://formspree.io/
// 2. Create account and get form endpoint
// 3. Replace the value below:

const FORMSPREE_CONFIG = {
    ENDPOINT: "https://formspree.io/f/YOUR_FORM_ID", // Get from Formspree dashboard
    TO_EMAIL: "aditya.rustagi54@gmail.com"
};

// Quick Formspree Setup Instructions:
// 1. Go to https://formspree.io/forms/new
// 2. Enter your email: aditya.rustagi54@gmail.com
// 3. Click "Create Form"
// 4. Copy the form endpoint (looks like: https://formspree.io/f/xpzgkqyz)
// 5. Replace "YOUR_FORM_ID" in the ENDPOINT above
// 6. Change ACTIVE_EMAIL_METHOD to 'formspree'

// METHOD 3: Netlify Forms (if hosting on Netlify)
// Just add netlify attribute to your form - no configuration needed

// Current active method - using EmailJS
const ACTIVE_EMAIL_METHOD = 'emailjs'; // Using EmailJS with your service and template IDs

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { EMAILJS_CONFIG, FORMSPREE_CONFIG, ACTIVE_EMAIL_METHOD };
}
