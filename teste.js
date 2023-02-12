const user = {
    nome: 'luis',
    idade: 25,
    telefone: 123333
}

const user2 = {
    nome: 'leo',
    idade: 30,
    telefone: 12321
}

const array = [user, user2, {
    nome: 'vitor',
    idade: 54,
    telefone: 321321
}]


array.push({
    nome: 'peu',
    idade: 43,
    telefone:321321
})
for(const obj  of array.filter(i=> i.idade >= 30)){
    console.log(obj.nome)
}