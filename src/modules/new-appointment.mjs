
import dateConvert from "../utils/dateConvert.mjs";

// Keys message     
const keys = ["novoagendamento", "criaragendamento"];

const appointments = []

// Bot steps
const steps = {
  0: {
    replyMessage: "O que voce deseja ser lembrado?",
    replyErro: "",
    nextStep: 1,
    validate: (message) => true
  },
  1: {
    replyMessage: "Por favor digite a data e hora. Exemplo: 23/01/2023 14:50",
    replyErro: "",
    nextStep: 2,
    validate: (message) => true,
    action: (user, message) =>{
      const description	= message.body
      appointments.push({
        userId: user.id,
        description,
        isSended: false,
        isAppointted: false,
        when: null
      })
    }  
  },
  2: {
    replyMessage: 'Ok, tudo certo!',
    replyErro: 'Formato invalido, tente dessa forma exemplo: 23/01/2023 14:50',
    nextStep: null,
    validate: (message) => {
      try {
       const date = dateConvert(message.body)
       return date > new Date.now()
      } catch (error) {
        return false
      }
    },
    action: (user, message)=> {
      const date = dateConvert(message.body)
     const app =  appointments.findIndex((app)=> app.isSended === false && when === null && app.userId === user.id)

     if(app === -1)
      console.error('appointment not found')

      app[index].when = date;
      app[index].isAppointted = true
    }
  },
};

// Validate function

function action(user, message) {
  const step = steps[user.currentStep];
  const validate = step.validate(message);
 
    if (validate) {
      user.currentStep = step.nextStep;
      message.reply(step.replyMessage);
      
      if (step.action) {
        step.action(user, message);
      }
      
  } else {
    message.reply(step.replyErro);
  } 
}
// const schedules = [{
//   uId: '',
//   userid:'',
//   description: (message) => {
//     console.log(message.boy)
//   },
//   data: (dateObject) => {
//   },
  
// }]



export default {
  keys,
  action,
  steps,
  appointments
  // schedules,
};
