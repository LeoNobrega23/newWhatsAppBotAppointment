import { validate } from "node-cron";
import dateConvert from "../utils/dateConvert.mjs";

// Keys message     
const keys = ["novoagendamento", "criaragendamento"];

// Bot steps
const steps = {
  0: {
    replyMessage: "O que voce deseja ser lembrado?"
    ,
    replyErro: "",
    nextStep: 1,
    validate: (message) => true,
  },
  1: {
    replyMessage: "Por favor digite a data e hora. Exemplo: 23/01/2023 14:50",
    replyErro: "",
    nextStep: 2,
    validate: (message) => true
  },

// Test.

    2: {
      replyMessage: 'Ok, tudo certo!'
      ,
      replyErro:
        false,
      nextStep: null,
      validate: (message) => {
        try {
          const body = message.body;
          const date = body.split(" ")[0];
          const time = body.split(" ")[1];
          
          
          var dateParts = date.split("/");
          var timeParts = time.split(":");
          var dateObject = new Date(
            //Ano
            dateParts[2],
            //Mês
            dateParts[1] - 1,
            //Dia
            dateParts[0],
            //Hora
            timeParts[0],
            // Minutos
            timeParts[1]
            );
            
            
            
            return dateObject;
          } catch (error) {
          return false;
        }
      },
      action: (user, message) => {
      },
      
    },

};

// Validate function

function action(user, message) {
  const step = steps[user.currentStep];
  const validate = step.validate(message);
    console.log(user.currentStep)
    if (validate) {
      user.currentStep = step.nextStep;
      message.reply(step.replyMessage);
      
      if (step.action) {
        
        step.action(user, message);
      }
      
  } else  {
    message.reply(step.replyErro);
  } 
}
const schedules = [{
  uId: '',
  userid:'',
  description: (message) => {
    console.log(message.boy)
  },
  data: (dateObject) => {
  },
  
}]



export default {
  keys,
  action,
  steps,
  schedules,
};
