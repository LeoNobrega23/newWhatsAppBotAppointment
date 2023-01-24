import qrcode from "qrcode-terminal";
import { Client } from "whatsapp-web.js";

import createAppointment from "./modules/new-appointment.mjs";
import appointments from "./modules/new-appointment.mjs";
import DateConvert from './utils/dateConvert.mjs'

const users = []; //array of user

const client = new Client({
  puppeteer: {
    headless: false,
  },
});

client.on("qr", (qr) => {
  console.log("QR RECEIVED", qr);
  qrcode.generate(qr, { small: true });
});
// Test to start the bot
client.on("ready", () => {
  console.log("Client is ready!");
 
  setTimeout(()=>{
    const remembeerts = appointments.filter((app)=> app.isSended === false && app.when === new Date.now())

    for( rember in remembeerts){
      remember.userId
      rember.descrpiton
    }
  }, 60 * 100)
});
  
//reply message
client.on("message", (message) => {
  // Id = phone number
  const id = message.from;
  // Key = the message
  const key = message.body.toLowerCase().replaceAll(" ", "");
// Searches if the user already exists, if it does not exist, a new user is created
  var user = users.find((user) => user.id === id);

  if (!user) {
    console.log("User not found, creating new user...");
    user = {
      id,
      currentStep: null,
      currentFlow: null,
    };

    users.push(user);
    console.log("User created!", { user });
  }
// Cancel the bot
  if (user.currentFlow && message.body === "Cancelar" ) {
    user.currentFlow = null;
    user.currentStep = null;
    message.reply("Operação cancelada");
    return;
  }

  if (user.currentFlow) {
    user.currentFlow.action(user, message);
  }

  if (createAppointment.keys.includes(key)) {
    user.currentFlow = createAppointment;
    user.currentStep = 0;
    user.currentFlow.action(user, message);
  } else if(user.currentFlow === null) {
    message.reply('Por favor, para iniciar digite "Novo agendamento"')
  }
});

client.initialize();
