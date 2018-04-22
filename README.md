# JavaScript - Metaprogramação
*Aprenda a fazer metaprogramação com JavaScript!* &lt;3


**Minha intenção com a criação desse conteúdo é além de demonstrar a forma que trabalho há um bom tempo, também ensinar você os primeiros passos nessa linda arte que é de programar um programa que se cria em tempo de execução!**

![](http://i0.kym-cdn.com/photos/images/original/000/754/474/e32.jpg)


Antes de botarmos a mão na massa precisamos definir alguns conceitos-chave para o melhor entendimento desse estudo.

<br> 
 
## Emabasamento Teórico

### Metaprogramação

> Metaprogramação é a programação de programas que escrevem ou manipulam outros programas (ou a si próprios) assim como seus dados, ou que fazem parte do trabalho em tempo de compilação. Em alguns casos, isso permite que os programadores sejam mais produtivos ao evitar que parte do código seja escrita manualmente.



> A metaprogramação é geralmente implementada através de duas formas. A primeira é a exposição do mecanismo interno de execução ao código através de uma API. A segunda é a execução dinâmica de expressões de texto que contém comandos de programação.

<br>

Porém, antes o artigo diz o seguinte:

> **A habilidade de uma linguagem de programação de ser sua própria metalinguagem é chamada reflexão.** A reflexão facilita a metaprogramação, assim como ter uma linguagem de programação que é um tipo de dado de primeira classe de si mesma.


*fonte: https://pt.wikipedia.org/wiki/Metaprograma%C3%A7%C3%A3o*


<br>

<br>

Como eu não aceitei essa afimação como canônica pois **eu não utilizo reflexão!**

Com isso em mente fiz uma leve pesquisa no Google onde cai [nesse mesmo questionamento no StackOverflow BRAZUCA](https://pt.stackoverflow.com/questions/276112/qual-%C3%A9-a-diferen%C3%A7a-entre-metaprograma%C3%A7%C3%A3o-e-reflex%C3%A3o):


> Existem dois termos que se parecem muito quando estamos falando de técnicas de introspecção. São metaprogramação e reflexão.

>O Wikipedia trata a reflexão como uma estratégia-chave da metaprogramação, mas para mim estes termos são idênticos ou não sei o que os difere.

> Qual é a diferença entre os termos? Existe reflexão sem metaprogramação ou vice-versa?

<br>

**E logo abaixo temos essa ótima resposta:**

> Reflexão é um mecanismo que dá informações sobre o próprio código e permite modificá-lo. Isto pode ocorrer em tempo de execução ou tempo de compilação, o que importa é o acesso à informação para manipulá-la (se não manipular é só introspecção). É apenas mais comum ocorrer em tempo de execução.

> Metaprogramação é um paradigma que permite a manipulação do código de forma mais geral, você programa como o código deve ser programado. A reflexão frequentemente é usada para obter as informações necessárias e alterar o que precisa, mas não é a única forma. E é mais comum ocorrer em tempo de compilação.



## Empirismo aka mão na massa

![doutrina segundo a qual todo conhecimento provém unicamente da experiência, limitando-se ao que pode ser captado do mundo externo, pelos sentidos, ou do mundo subjetivo, pela introspecção, sendo ger. descartadas as verdades reveladas e transcendentes do misticismo, ou apriorísticas e inatas do racionalismo.
](https://i.imgur.com/vXWGUZP.png)

<br>
<br>

Pensei no seguinte exercício lúdico:

> Vamos pensar que precisamos criar um jogo de luta e queremos pode usar o mesmo código para gerar qualquer tipo de personagem/lutador.


*Sim, é para ser simples para entendermos o conceito corretamente para depois partirmos para os cenários reais, blz?*

![](https://i.imgur.com/FNZKWyf.jpg)


<br>

### Fluxo de Pensamento

Para que você consiga criar um código em metaprogramação de início, pelo menos para mim, é você programar da forma normal para que você consiga encontrar e analisar os padrões que se repetem para que depois refatore ele para que fique genérico pois daí sim nós iremos automatizar a execução desse código que irá se auto-gerar.

1. Programar normalmente.
2. Inferir os os padrões.
3. Refatorar para generalizar.
4. Automatizar a execução. 

<br>

### Inferindo Padrões

![padrões triangulares coloridos](https://uxmag.com/sites/default/files/styles/632x307/adaptive-image/public/article-images/ux-patterns-banner2.png?itok=ikhleFSI)


Inicialmente vamos definir a Estrutura de Dados dos personagens e suas ações:

```js
// https://repl.it/@suissa/Javascript-Metaprogramming-00
const Personagem1 = {
  name: 'Ryu',
  moves: [
    { 'low-punch':  () => console.log('give a low punch') },
    { 'mid-punch':  () => console.log('give a middle punch') },
    { 'hig-punch':  () => console.log('give a high punch') },
    { 'low-kick':  () => console.log('give a low kick') },
    { 'mid-kick':  () => console.log('give a middle kick') },
    { 'hig-kick':  () => console.log('give a high kick') },
  ]
}

const Personagem2 = {
  name: 'Blanka',
  moves: [
    { 'low-punch':  () => console.log('give a low punch') },
    { 'mid-punch':  () => console.log('give a middle punch') },
    { 'hig-punch':  () => console.log('give a high punch') },
    { 'low-kick':  () => console.log('give a low kick') },
    { 'mid-kick':  () => console.log('give a middle kick') },
    { 'hig-kick':  () => console.log('give a high kick') },
  ]
}

const Personagem3 = {
  name: 'Brain Smasher',
  moves: [
    { 'hig-punch':  () => console.log('give a high punch') },
    { 'hig-kick':  () => console.log('give a high kick') },
  ]
}


const Personagem4 = {
  name: 'Stomach Driller',
  moves: [
    { 'mid-punch':  () => console.log('give a middle punch') },
    { 'mid-kick':  () => console.log('give a middle kick') },
  ]
}
```

<br>

Agora vamos apenas colocar um simulador de luta onde entrará um Array de lutadores e no final um será escolhido o vencedor:


```js
// https://repl.it/@suissa/Javascript-Metaprogramming-01
const Ryu = {
  moves: [
    { 'low-punch':  () => console.log('give a low punch') },
    { 'mid-punch':  () => console.log('give a middle punch') },
    { 'hig-punch':  () => console.log('give a high punch') },
    { 'low-kick':  () => console.log('give a low kick') },
    { 'mid-kick':  () => console.log('give a middle kick') },
    { 'hig-kick':  () => console.log('give a high kick') },
  ]
}

const Blanka = {
  moves: [
    { 'low-punch':  () => console.log('give a low punch') },
    { 'mid-punch':  () => console.log('give a middle punch') },
    { 'hig-punch':  () => console.log('give a high punch') },
    { 'low-kick':  () => console.log('give a low kick') },
    { 'mid-kick':  () => console.log('give a middle kick') },
    { 'hig-kick':  () => console.log('give a high kick') },
  ]
}

const BrainSmasher = {
  moves: [
    { 'hig-punch':  () => console.log('give a high punch') },
    { 'hig-kick':  () => console.log('give a high kick') },
  ]
}


const StomachDriller = {
  moves: [
    { 'mid-punch':  () => console.log('give a middle punch') },
    { 'mid-kick':  () => console.log('give a middle kick') },
  ]
}

const FIGHT = (fighters = [Ryu, Blanka]) => {
  const [fighter1, fighter2] = fighters
  
  console.log('FIGHT!!!')
  
  setTimeout(() => {
    return console.log(
      'Vencedor: ',
      fighters[
        Math.round(Math.random())
      ]
    )
  }, 1000)
}

FIGHT([Ryu, BrainSmasher])
```

<br>

Porém olhe só como é nosso retorno:

```js
FIGHT!!!
Vencedor:  { moves: [ { 'hig-punch': [Function] }, { 'hig-kick': [Function] } ] }
```

Dessa forma se lutadores tiverem os mesmos golpes não saberemos quem foi apenas pelo nome da constante, logo precisamos retirar essa informação do código e colocar na configuração do personagem, dessa forma:

```js
// https://repl.it/@suissa/Javascript-Metaprogramming-02
const MOVES = {
  'low-punch':  { 
    'low-punch': () => console.log('give a low punch')
  },
  'mid-punch': { 
    'mid-punch': () => console.log('give a middle punch')
  },
  'hig-punch':  { 
    'hig-punch': () => console.log('give a high punch')
  },
  'low-kick':  { 
    'low-kick': () => console.log('give a low kick')
  },
  'mid-kick': { 
    'mid-kick': () => console.log('give a middle kick')
  },
  'hig-kick':  { 
    'hig-kick': () => console.log('give a high kick')
  },
}

const Ryu = {
  name: 'Ryu',
  moves: [
    MOVES['low-punch'],
    MOVES['mid-punch'],
    MOVES['hig-punch'],
    MOVES['low-kick'],
    MOVES['mid-kick'],
    MOVES['hig-kick'],
  ]
}

const Blanka = {
  name: 'Blanka',
  moves: [
    MOVES['low-punch'],
    MOVES['mid-punch'],
    MOVES['hig-punch'],
    MOVES['low-kick'],
    MOVES['mid-kick'],
    MOVES['hig-kick'],
  ]
}

const BrainSmasher = {
  name: 'BrainSmasher',
  moves: [
    MOVES['hig-punch'],
    MOVES['hig-kick'],
  ]
}


const StomachDriller = {
  name: 'StomachDriller',
  moves: [
    MOVES['mid-punch'],
    MOVES['mid-kick'],
  ]
}

const FIGHT = (fighters = [Ryu, Blanka]) => {
  
  console.log('FIGHT!!!')
  
  setTimeout(() => {
      
    return console.log(
      'Vencedor: ',
      fighters[
        Math.round(Math.random())
      ]
    )
  }, 1000)
}

FIGHT([Ryu, BrainSmasher])
```

Além disso percebeu que também retirei TODAS as ações pois elas apenas estavam duplicadas em lugares diferentes, sabendo disso eu criei um Objeto o qual centralizará TODAS as ações possíveis de serem utilizadas, **dessa forma nosso reuso e manutenção aumentam drasticamente!**


Percebeu que eu não criei um Array, pois seria o pensamento mais lógico pois é uma coleção de movimentos, porém como precisamos acessar esses movimentos pelo seu nome DEVEMOS utilizar para isso o Objeto, o qual trabalhará como uma *HashTable*

> In computing, a hash table (hash map) is a data structure which implements an associative array abstract data type, a structure that can map keys to values.

**fonte: https://en.wikipedia.org/wiki/Hash_table**


Agora de posse desse mecanismo podemos criar 


```js
// https://repl.it/@suissa/Javascript-Metaprogramming-03
const createFighter = (name, moves = []) => ({
  name, moves
})

const MOVES_RYU = [
  MOVES['low-punch'],
  MOVES['mid-punch'],
  MOVES['hig-punch'],
  MOVES['low-kick'],
  MOVES['mid-kick'],
  MOVES['hig-kick'],
]

const MOVES_BLANKA = [
  MOVES['low-punch'],
  MOVES['mid-punch'],
  MOVES['hig-punch'],
  MOVES['low-kick'],
  MOVES['mid-kick'],
  MOVES['hig-kick'],
]

const MOVES_BS = [
  MOVES['hig-punch'],
  MOVES['hig-kick'],
]

const MOVES_SD = [
  MOVES['mid-punch'],
  MOVES['mid-kick'],
]

const Ryu = createFighter('Ryu', MOVES_RYU)
console.log('Ryu: ', Ryu)


const Blanka = createFighter('Blanka', MOVES_BLANKA)
console.log('Blanka: ', Blanka)


const BrainSmasher = createFighter('BrainSmasher', MOVES_BS)
console.log('BrainSmasher: ', BrainSmasher)


const StomachDriller = createFighter('StomachDriller', MOVES_SD)
console.log('StomachDriller: ', StomachDriller)
```

<br>

Entretanto esse código ainda não está genérico o suficiente pois estamos acessao os movimentos diretamente de `MOVES`, por isso agora iremos criar a função que cria a lista de movimentos para cada lutador:

```js
// https://repl.it/@suissa/Javascript-Metaprogramming-04
const MOVES = {
  'low-punch': {
    'low-punch': () => console.log('give a low punch')
  },
  'mid-punch': {
    'mid-punch': () => console.log('give a middle punch')
  },
  'hig-punch': {
    'hig-punch': () => console.log('give a high punch')
  },
  'low-kick': {
    'low-kick': () => console.log('give a low kick')
  },
  'mid-kick': {
    'mid-kick': () => console.log('give a middle kick')
  },
  'hig-kick': {
    'hig-kick': () => console.log('give a high kick')
  },
}

const createFighter = (name, moves = []) => ({
  name, moves
})

const createMoves = (list, moves) => 
  list.reduce( 
    (result, move) => Object.assign(result, moves[move])
  , {})

const MOVES_RYU = createMoves([
  'low-punch',
  'mid-punch',
  'hig-punch',
  'low-kick',
  'mid-kick',
  'hig-kick',
], MOVES)

const MOVES_BLANKA = createMoves([
  'low-punch',
  'mid-punch',
  'hig-punch',
  'low-kick',
  'mid-kick',
  'hig-kick',
], MOVES)

const MOVES_BS = createMoves([
  'hig-punch',
  'hig-kick',
], MOVES)

const MOVES_SD = createMoves([
  'mid-punch',
  'mid-kick',
], MOVES)

const Ryu = createFighter('Ryu', MOVES_RYU)
console.log('Ryu: ', Ryu)

const Blanka = createFighter('Blanka', MOVES_BLANKA)
console.log('Blanka: ', Blanka)

const BrainSmasher = createFighter('BrainSmasher', MOVES_BS)
console.log('BrainSmasher: ', BrainSmasher)

const StomachDriller = createFighter('StomachDriller', MOVES_SD)
console.log('StomachDriller: ', StomachDriller)


const FIGHT = (fighters = [Ryu, Blanka]) => {

  const [p1, p2] = fighters
  console.log('player1: ', p1)
  console.log('player2: ', p2)

  console.log('\nFIGHT!!!\n\n')

  setTimeout(() => {

    return console.log(
      '\nVencedor: ',
      fighters[
        Math.round(Math.random())
      ].name
    )
  }, 1000)
}

FIGHT([Ryu, BrainSmasher])
FIGHT([Ryu, Blanka])
FIGHT([Ryu, StomachDriller])
```

<br>

Nesse momento quero que você perceba como foi fácil adicionar essa funcionalidade diretamente no código sem mexer muito nele:

```js
// ANTES
const MOVES_RYU = [
  MOVES['low-punch'],
  MOVES['mid-punch'],
  MOVES['hig-punch'],
  MOVES['low-kick'],
  MOVES['mid-kick'],
  MOVES['hig-kick'],
]

const MOVES_BLANKA = [
  MOVES['low-punch'],
  MOVES['mid-punch'],
  MOVES['hig-punch'],
  MOVES['low-kick'],
  MOVES['mid-kick'],
  MOVES['hig-kick'],
]

const MOVES_BS = [
  MOVES['hig-punch'],
  MOVES['hig-kick'],
]

const MOVES_SD = [
  MOVES['mid-punch'],
  MOVES['mid-kick'],
]
```

```js
// DEPOIS
const MOVES_RYU = createMoves([
  'low-punch',
  'mid-punch',
  'hig-punch',
  'low-kick',
  'mid-kick',
  'hig-kick',
], MOVES)

const MOVES_BLANKA = createMoves([
  'low-punch',
  'mid-punch',
  'hig-punch',
  'low-kick',
  'mid-kick',
  'hig-kick',
], MOVES)

const MOVES_BS = createMoves([
  'hig-punch',
  'hig-kick',
], MOVES)

const MOVES_SD = createMoves([
  'mid-punch',
  'mid-kick',
], MOVES)
```

Para sua rápida refatoração selecione todos os `MOVES[`, apague e jogue o cursor para o final da linha, no Mac Command ->, volte uma posição para deixar a `,` e aperte o backspace apenas uma vez para deletar `]`, depois basta copiar `createMoves([` para que você substituir o que vier depois do `=` com isso e no final da `]`, colar `, MOVES)`.

<br>

> ***MUITO FÁCIL NÃO?!***


<br>

![](http://geradormemes.com/media/created/dntkw5.jpg)