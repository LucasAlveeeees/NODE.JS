import inquirer from 'inquirer';

inquirer.prompt([
    {
        name:'nome',
        message:'Qual seu nome?'


},

{
    name:'nota1',
    message:'Qual a nota1?'

},
{
    name:'nota2',
    message:'Qual a nota2?'
},
{
    name:'nota3',
    message:'Qual a nota3?'
},

])
.then((perguntas) => {
    let media = ((parseInt(perguntas.nota1)+parseInt(perguntas.nota2)+parseInt(perguntas.nota3))/3)
    let aproveitamento = media*10;
    if(media >= 7){
        console.log(`Olá ${perguntas.nome} você foi aprovado sua media foi: ${media}. Sua nota 1 foi: ${perguntas.nota1} sua nota 2 foi: ${perguntas.nota2} sua nota 3 foi: ${perguntas.nota3} e seu aproveitamento foi de: ${aproveitamento}%`)
    }
    else{
        console.log(`Olá ${perguntas.nome} você foi reprovado sua media foi: ${media}. Sua nota 1 foi: ${perguntas.nota1} sua nota 2 foi: ${perguntas.nota2} sua nota 3 foi: ${perguntas.nota3} e seu aproveitamento foi de: ${aproveitamento}%`)

    }

    
})