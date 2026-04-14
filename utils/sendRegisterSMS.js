// utils/sendRegisterSMS.js
import axios from "axios";

const sendRegisterSMS = async ({ mobile, name, regNum, qrLink }) => {
  try {
    const message = `Dear ${name}, registration id for Times Property Expo is ${regNum} and QR Links is ${qrLink}. Do not share this info to anyone for security reasons. - SaaScraft Studio`;

    const params = {
      APIKey: process.env.SMS_GATEWAY_API_KEY,
      senderid: process.env.SMS_GATEWAY_SENDER_ID,
      channel: "2",
      DCS: "0",
      flashsms: "0",
      number: mobile,
      text: message,
      route: process.env.SMS_GATEWAY_ROUTE,
      EntityId: process.env.SMS_GATEWAY_ENTITY_ID,
      dlttemplateid: process.env.SMS_GATEWAY_REGISTER_TEMPLATE_ID,
    };

    console.log("SMS PARAMS:", params); // ✅ ADD THIS

    const response = await axios.get(process.env.SMS_GATEWAY_URL, {
      params,
    });

    console.log("SMS RESPONSE:", response.data); // ✅ ADD THIS

    return response.data;
  } catch (error) {
    console.error("Register SMS Error:", error.response?.data || error.message);
    throw error;
  }
};

export default sendRegisterSMS;
