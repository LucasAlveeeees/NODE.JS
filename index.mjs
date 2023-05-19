import inquirer from "inquirer";
import chalk from 'chalk';

inquirer.prompt([
    {
        name:'nome',
        message:"Qual seu nome?"

},
{
    name:'idade',
    message:'Qual sua idade?'

},
])

.then((perguntas)=>{
    
    if(!perguntas.nome || !perguntas.idade){
        throw new Error('Vc precisa digitar os dados solicitados');
    }
    else{

    console.log(chalk.black.bgYellow(`Oi ${perguntas.nome} sua idade é ${perguntas.idade}`));
    }
    
})

.catch((err) => console.log(err));


