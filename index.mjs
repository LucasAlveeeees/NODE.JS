// modulos externos
import chalk from 'chalk';
import inquirer from 'inquirer';

//modulos internos
import fs from 'fs';
import { get } from 'http';

operation()

function operation() { // criando operação para perguntas gerais
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'O que você deseja fazer?',
        choices: [
          'Criar conta',
          'Consultar Saldo',
          'Depositar',
          'Sacar',
          'Aplicar',
          'resgatar',
          'Sair',
        ],
      },
    ])
    .then((answer) => {
      const action = answer['action']

      if (action === 'Criar conta') {
        createAccount()
      } else if (action === 'Depositar') {
        deposit()
      } else if (action === 'Consultar Saldo') {
        getAccountBalance()
      } else if (action === 'Sacar') {
        withdraw()
      } else if (action === 'Sair') {
        console.log(chalk.bgBlue.black('Obrigado por usar o Accounts!'))
        process.exit()
      }
      else if(action === 'Aplicar'){
        aplicacao();
      }
      else if('resgatar'){
        resgatar()
      }
    })
}

//Função criar nova conta

function novaConta(){
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'Deseja criar uma?',
        choices: [
          'Sim',
          'Não',
          'finalizar',
          'voltar ao menu principal',
        ],
      },
    ]).then((answer)=>{
      const action = answer['action']
    if(action === 'Sim'){
      createAccount();
    }
    else if(action === 'Não'){
      withdraw()
    }
    else if(action === 'finalizar'){
      process.exit();
    }
    else if(action === 'voltar ao menu principal'){
      operation()
    }
  })
  
}

// create user account
function createAccount() {
  console.log(chalk.bgGreen.black('Parabéns por escolher nosso banco!'))
  console.log(chalk.green('Defina as opções da sua conta a seguir'))

  buildAccount()
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Digite um nome para a sua conta:',
      },
    ])
    .then((answer) => {
      console.info(answer['accountName'])

      const accountName = answer['accountName']

      if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts')
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black(`Não existe a conta ${accountName} nesse banco`),
        )
        buildAccount(accountName)
      }

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance":0}',
        function (err) {
          console.log(err)
        },
      )

      console.log(chalk.green('Parabéns, sua conta foi criada!'))
      operation()
    })
}

// add an amount to user account
function deposit() {
  inquirer
    .prompt([
      {
        name: 'accountName',
        message: 'Qual o nome da sua conta?',
      },
    ])
    .then((answer) => {
      const accountName = answer['accountName']

      if (!checkAccount(accountName)) {
        //return deposit()
        return novaConta()
      }

      inquirer
        .prompt([
          {
            name: 'amount',
            message: 'Quanto você deseja depositar?',
          },
        ])
        .then((answer) => {
          const amount = answer['amount']

          addAmount(accountName, amount)
          operation()
        })
    })
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(chalk.bgRed.black(`Não existe a conta ${accountName} nesse banco`))
    return false
  }
  return true
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: 'utf8',
    flag: 'r',
  })

  return JSON.parse(accountJSON)
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName)

  if (!amount) {
    console.log(
      chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'),
    )
    return deposit()
  }
  if(!checkAccount(accountName)){
    return novaConta()
  }

  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err)
    },
  )

  console.log(
    chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`),
  )
}

// consultar saldo da conta

function getAccountBalance(){

  inquirer.prompt([
    {
      name:'accountName',
      message:'Qual nome da sua conta?'

  }
]).then((answer)=>{
  const accountName = answer["accountName"];

  // verificando se a conta existe
  if(!checkAccount(accountName)){
    //return getAccountBalance()
    return novaConta()
  }
  const accountData = getAccount(accountName);

  console.log(chalk.bgBlue.black(`Oi ${accountName} seu saldo é R$${accountData.balance} e o saldo da poupança é R$${accountData.poupanca}`))
  operation()

})
.catch((err)=> console.log(err))
}

//Sacar dinheiro

function withdraw(){ // criando função para sacar dinheiro
  inquirer.prompt([
    {
      name:'accountName',
      message:'Qual o nome da sua conta?'

  }
]).then((answer)=>{
  const accountName = answer['accountName']

  if(!checkAccount(accountName)){
    //return withdraw()
    return novaConta()
  }

  inquirer.prompt([{
    name:'amount',
    message:'Quanto vc deseja sacar?'
  },
]).then((answer)=>{
  const amount = answer['amount'];
  removeAmount(accountName, amount);
  
})
.catch(err => console.log(err));
})
.catch(err=> console.log(err));
}

function removeAmount(accountName, amount){
  const accountData = getAccount(accountName)

  if(!amount){
    console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde')
    )
    return withdraw()
  }
  if(accountData.balance < amount){
    console.log(chalk.bgRed.black(`Você não tem o valor de R$${amount} disponivel tem somente R$${accountData.balance};`))
    return withdraw()

  }
  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount)

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function(err){
      console.log(err);
    },
  )
  console.log(chalk.bgBlue.black(`Parabéns o valor de 
  R$${amount} foi sacado de conta 
  ${accountName} e seu saldo atual é 
  R$${accountData.balance}`))
  return operation()
  
}

function aplicacao() {
  inquirer.prompt([
    {
      name: 'accountName',
      message: 'Qual o nome da sua conta?',
    },
  ]).then((answer) => {
    const accountName = answer['accountName'];

    if (!checkAccount(accountName)) {
      return novaConta();
    }

    inquirer.prompt([
      {
        name: 'aplicacao',
        message: 'Quanto você deseja aplicar?',
      },
    ]).then((answer) => {
      const aplicacao = answer['aplicacao'];

      if (!aplicacao) {
        console.log(chalk.bgRed.black('O valor fornecido não é válido. Por favor, digite um valor válido.'));
        return operation();
        
      }
      const accountData = getAccount(accountName);

      if(accountData.balance < aplicacao){
        console.log(chalk.bgRed.black(`Olá ${accountName} você não pode aplicar ${aplicacao}
        pois seu saldo é insuficiente.
        Saldo atual ${accountData.balance}`))
        return operation();
      }
      accountData.balance = parseFloat(accountData.balance) - parseFloat(aplicacao);
      accountData.poupanca = parseFloat(aplicacao)

      fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
          console.log(err);
        }
      );

      console.log(chalk.bgGreen.black(`Parabéns! Você aplicou o valor de R$${aplicacao}
      na sua conta ${accountName}. 
      Seu saldo atual é de R$${accountData.balance}. e seu saldo da poupança é ${accountData.poupanca}`));
      return operation();
    });
  }).catch((err) => console.log(err));
}

function resgatar(){
  inquirer.prompt([
    {
      name:'accountName',
      message:'Qual nome da sua conta?',

  }
]).then((answer)=>{
  const accountName = answer['accountName']
  if(!checkAccount(accountName)){
    return novaConta();
  }
  inquirer.prompt([
    {
      name:'resgatar',
      message:'Qual valor deseja resgatar?'

  }
]).then((answer)=>{
  const resgatar = answer['resgatar'];
  if(!resgatar){
    console.log(chalk.red(`Ocorreu um erro, favor tentar novamente`));
    return operation();
  }
  const accountData =  getAccount(accountName);
  if(accountData.poupanca < resgatar){
    console.log(chalk.red(`O valor de R${resgatar} não pode ser resgatado pois está sem saldo da poupança. Saldo da poupança ${accountData.poupanca}`));
    return operation();
  }
  accountData.poupanca = parseFloat(accountData.poupanca) - parseFloat(resgatar);
  accountData.balance = parseFloat(accountData.balance) + parseFloat(resgatar);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );
  console.log(`${accountName} você resgastou valor de R$${resgatar} seu saldo atual da C/C é R$${accountData.balance}
  e o saldo da poupança é R$${accountData.poupanca}`);
  return operation();
  

  
})
})
}