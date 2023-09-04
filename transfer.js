require('dotenv').config()
// @ts-ignore
const Flutterwave = require('flutterwave-node-v3');
const flw = new Flutterwave(process.env.FLW_PUBLIC_KEY, process.env.FLW_SECRET_KEY);
const initiateFundsTransfer = async (recipientBankCode, recipientAccountNumber, amount, narration) => {
  try {
    const payload = {
      account_bank: recipientBankCode,
      account_number: recipientAccountNumber,
      amount,
      narration,
      currency: "NGN",
      reference: "transfer-" + Date.now(),
      callback_url: "https://webhook.site/b3e505b0-fe02-430e-a538-22bbbce8ce0d",
      debit_currency: "NGN",
    };

    const response = await flw.Transfer.initiate(payload);
    return response;
  } catch (error) {
    console.error("Error initiating funds transfer:", error);
    throw error;
  }
};

initiateFundsTransfer();