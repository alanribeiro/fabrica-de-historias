const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const daysOfWeek = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

const defineDaysOfWeek = () => {
    let optionDays = [daysOfWeek[new Date().getDay()]];
    let flag = true;
    while(flag) {
        const index = Math.floor(Math.random() * 6) + 0;
        const item = daysOfWeek[index];
        const indexItem = optionDays.indexOf(item);
        if(indexItem == -1) {
            if(optionDays.length < 4) {
                optionDays.push(item);
            }
            else flag = false;
        }
    }
    return optionDays;

}

export const story1 = {
    title: "Casamento da Joana",
    number: 1,
    background: require("../assets/elements/stories/story1.png"),
    thumbnail: require("../assets/elements/stories/thumbnail1.png"),
    text: `Eu vou contar pra você a história do Casamento da Joana.
           No ano de 1948. Lá em Juazeiro do Norte, no Ceará. Morava uma moça chamada Joana.
           Ela era filha do seu Juracir e da dona Lourdes. O seu Juracir era padeiro e a dona Lourdes era costureira.
           A Joana tinha 26 anos, e trabalhava na padaria do seu pai. Era ela que fazia os bolos da padaria.
           Ela fazia bolo de chocolate, bolo mole e bolo de milho.
           Todo mundo que morava no bairro Asa Branca conhecia a Joana e sabia que ela fazia bolos muito bons.
           Principalmente bolo de milho, que era o que ela mais gostava de fazer.
           Joana morava na rua Luiz Gonzaga. Nessa mesma rua morava também um rapaz chamado Manoel.
           Manoel era o noivo da Joana e trabalhava como ajudante de pedreiro.
           Joana e Manoel planêjávam se casar, mas não tinham dinheiro para casar na igreja e nem fazer uma festa.
           A Joana sempre sonhou em ter uma festa de casamento, mas ela e o Manoel ganhavam pouco dinheiro para fazer uma festa.
           Eles resolveram juntar o pouco dinheiro que ganhavam, fizeram um pé de meia, mas ainda não dava pra casar na igreja.
           Manoel vendeu o relógio que ele tinha e a Joana vendeu um par de sapatos que ganhou da sua avó.
           Joana gostava muito das festas de São João, e como estava no mês de Junho, ela sabia que o padre Tomé ia organizar a festa de São João da igreja do bairro Asa Branca.
           O padre Tomé sabia que a Joana fazia um bolo de milho muito bom e foi até a casa dela encomendar alguns bolos pra festa de São João da igreja.
           Como a Joana gostava muito de festa de São João, e o padre ia fazer a festa na igreja, ela falou com o seu noivo Manoel e disse que ia pedir ao padre para casar eles na festa de São João em troca dos bolos e comidas que Joana ia fazer para a festa.
           E assim Joana fez. Pediu para o padre Tomé que celebrásse o seu casamento com Manoel na festa de São João.
           O padre aceitou e disse que ia casar ela na festa.
           A festa da igreja estava marcada para acontecer num sábado de noite. Dia 15 de Junho.
           Então a Joana foi convidando todos os seus amigos e conhecidos da rua Luiz Gonzaga pra que eles fossem na festa da igreja, e que ela se casaria com o Manoel.
           Quando chegou o dia da festa, Manoel ajudou Joana a fazer as comidas. Quando eles acabaram foram se arrumar para a festa.
           O padre Tomé começou celebrando a missa. No final ele anunciou que ia acontecer um casamento e chamou a Joana e o Manoel para subirem no altar.
           Joana e Manoel estavam realizando seu sonho de casar na igreja e terem uma festa de casamento.
           Depois da celebração do casamento eles saíram da igreja e foram para a festa de São João.
           Eles participaram da quadrilha do bairro, e depois receberam os presentes de casamento dos seus amigos e familiares.
           A festa estava muito animada, tinha milho assado, canjica, pamonha e os bolos de milho da Joana.
           Foi uma noite bonita de São João. A Joana se casou com o Manoel, todo mundo dançou, comeu e se divertiu muito.`,
    questions: [
        "Em que ano se passa a história?",
        "Em que ano nós estamos?",
        "Em que metade do ano aconteceu o casamento?",
        "Em que metade do ano nós estamos?",
        "Em que mês Joana se casou?",
        "Em que mês nós estamos?",
        "Qual dia do mês que Joana casou?",
        "Em que dia do mês nós estamos?",
        "Em que dia da semana Joana casou?",
        "Que dia da semana nós estamos?",
        "Em que estado do Brasil a Joana se casou?",
        "Em que cidade a Joana se casou?",
        "Em que bairro a Joana morava?",
        "Em que rua a Joana morava?",
        "Em que local Joana trabalhava?",
        "Carro. Tijolo. Tapete. Quais foram as palavras que eu acabei de falar?",
        "Como fica a palavra MUNDO de trás pra frente?",
        "Quais foram as palavras que eu falei agora pouco?",
        "Diga o nome desse objeto",
        "Diga o nome desse objeto"
    ],
    options: [
        ["1960", "1948", "1958", "1952"],
        ["2009", "2015", new Date().getFullYear(), "2017"],
        ["Primeira", "Segunda"],
        ["Primeira", "Segunda"],
        ["Janeiro", "Agosto", "Março", "Junho"],
        ["Agosto", "Março", months[new Date().getMonth()], "Julho"],
        ["15 de Janeiro", "15 de Junho", "20 de Agosto", "13 de Março"],
        ["15 de Agosto", "22 de Março", `${new Date().getDate()} de ${months[new Date().getMonth()]}`, "2 de Julho"],
        ["Sexta", "Sábado", "Terça", "Quinta"],
        defineDaysOfWeek(),
        ["Ceará", "Sergipe", "Piauí", "Alagoas"],
        ["Crato", "Juazeiro do Norte", "Quixadá", "Fortaleza"],
        ["São Pedro", "Campo Limpo", "Asa Branca", "Pedra dos Ventos"],
        ["Luiz Gonzaga", "Rua B-1", "Rui Barbosa", "Antônio Lúcio"],
        ["Igreja", "Padaria", "Farmácia", "Sorveteria"],
        ["Relógio, Cadeira, Lápis", "Caderno, Mesa, Papel", "Carro, Tijolo, Tapete"],
        ["DOMUN", "ODNUM", "ODMUN", "MUNOD"],
        ["Caderno, Mesa, Papel", "Carro, Tijolo, Tapete", "Relógio, Cadeira, Lápis"],
        ["Cadeira", "Relógio", "Tijolo", "Tapete"],
        ["Sapato", "Mesa", "Lápis", "Cadeira"]
    ],
    answers: [
        "1948",
        new Date().getFullYear(),
        "Primeira",
        new Date().getMonth() + 1 > 6 ? "Segunda" : "Primeira",
        "Junho",
        months[new Date().getMonth()],
        "15 de Junho",
        `${new Date().getDate()} de ${months[new Date().getMonth()]}`,
        "Sábado",
        daysOfWeek[new Date().getDay()],
        "Ceará",
        "Juazeiro do Norte",
        "Asa Branca",
        "Luiz Gonzaga",
        "Padaria",
        "Carro, Tijolo, Tapete",
        "ODNUM",
        "Carro, Tijolo, Tapete",
        "Relógio",
        "Sapato"
    ],
    points: [0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1, 1, 1, 1, 1, 3, 5, 3, 1, 1]
}

export const story2 = {
    title: "O melhor soltador de pião",
    number: 2,
    background: require("../assets/elements/stories/story2.png"),
    thumbnail: require("../assets/elements/stories/thumbnail2.png"),
    text: `No ano de 1945, Joana conheceu um rapaz chamado Manoel, que era carpinteiro na cidade do Crato.
          Em uma noite de São João, eles se encontraram na barraca do milho e logo se encantaram um pelo outro.`
}

export const story3 = {
    title: "Passeio no Cedro",
    number: 3,
    background: require("../assets/elements/stories/story3.png"),
    thumbnail: require("../assets/elements/stories/thumbnail3.png"),
    text: `Você clicou para ouvir sobre a história do açude cedro. O cedro foi uma das primeiras grandes obras de combate à seca realizadas pelo Governo Brasileiro.
          Dom Pêdro Segundo deu a ordem de construção, mas o açude foi construído entre os anos de 1890 e 1906.`
}
