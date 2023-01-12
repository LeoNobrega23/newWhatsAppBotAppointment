
// Keys message

const keys = ["novoagendamento", "criaragendamento"];

// Bot steps

const steps = {
  0: {
    replyMessage: "O que voce deseja ser lembrado?",
    replyErro: "",
    nextStep: 1,
    validate: (message) => true,
  },
  1: {
    replyMessage: "Quando você quer ser lembrado? Por favor digite o nome do compromisso, data e hora. Exemplo: Dentista 23/01 as 14:50",
    replyErro: "",
    nextStep: 2,
    validate: (message) => true,
    
    
  },
  2: {
    replyMessage: `Você marcou , iremos te lembar`,
    replyErro:
    '',
    nextStep: null,
    validate: (message) => {
      var msgbody = message.body
      message.reply(`Vamos te lembrar de ${msgbody}` ) 
    }
  },

// Test.

  // 3: {
  //   replyMessage: "Ok, tudo certo!",
  //   replyErro:
  //     "Messagem invalida, tente novamente escrever nesse formato 'dd/mm/aaaa hh:mm'",
  //   nextStep: null,
  //   validate: (message) => {
  //     try {
  //       const body = message.body;
  //       const date = body.split(" ")[0];
  //       const time = body.split(" ")[1];

  //       const dateParts = date.split("/");
  //       const timeParts = time.split(":");
  //       const dateObject = new Date(
  //         dateParts[2],
  //         dateParts[1] - 1,
  //         dateParts[0],
  //         timeParts[0],
  //         timeParts[1]
  //       );

  //       return dateObject.getTime() > Date.now();
  //     } catch (error) {
  //       return false;
  //     }
  //   },
  //   action: (user, message) => {},
  // },

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

export default {
  keys,
  action,
  steps,
};
