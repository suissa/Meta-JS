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

### Debate Conceitual

Existe uma característica na metaprogramação que é gerar os arquivos com os códigos desejados, entretanto para fazermos isso com JavaScript muito provavelmente teremos que usar `eval`. Nesse caso nós escrevemos o código que deve ser gerado e criamos ele no seu arquivo respectivo.

Porém o Paradigma que usaremos é o Funcional e nele nós presamos pelo REUSO das menores partes, logo se quisessemos fazer esse gerador nós perderíamos todo o ganho que iremos ter na manutenabilidade e reuso de cada parte gerada.

Além de deixar qualquer tipo de colaboração ou criação de novas partes mais complexas e com fazendo com que cada código seja muito específico, no nosso caso deveremos criar um código tão genérico que possa ser usado em diferentes sistemas e/ou frameworks, algo (quase) impossível se você for seguir esse conceito.

Para você entenderem por cima como seria um colega do grupo [Lambda Studygroup](https://t.me/lambdastudygroup) no Telegram enviou o seguinte código:


```js
// https://gist.github.com/souenzzo/28d7d9ce6f07e604bd2b530cf871b521
// Programação "OO Tradicional"

const express = require('express')
const app = express()

app.get('/', indexGet)
app.post('/', indexPost)

// Programação "Data Driven"

const express = require('express')
const app = express()

const routes = [
  ['get', '/', indexGet],
  ['post', '/', indexPost],
]
const applyRoutes(app, routes) => (
  routes.reduce((app, [method, path, f]) => app[method](path, f))
)

applyRoutes(app, routes)

// Metaprogramação

const makeRoutes(appName, routesName) => ( ... )
// makeRoutes("app", "routes") retornaria algo como
// "(app.get('/', indexGet); app.post('/', indexPost))"
eval(makeRoutes("app", "routes"))
```

<br>

> ***Percebeu o como seria péssimo se fossemos implementar esse conceito?***


<br>
<br>

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

Entretanto esse código ainda não está genérico o suficiente pois estamos acessao os movimentos diretamente de `MOVES`, por isso agora iremos criar a função que cria a lista de movimentos para cada lutador, como precisamos receber uma lista com o nome dos golpes e vamos criar um Objeto com esses nomes e suas funções logicamente iremos utilizar o [reduce](http://mdn.io/reduce):


```js
const createMoves = (names, moves) => 
  names.reduce( 
    (actions, name) => Object.assign(actions, moves[name])
  , {})
```

Nessa função recebemos um *Array* com os nomes dos golpes e um Objeto que possui todos esses golpes a serem utilizados, depois vamos adicionando cada golpe em `actions`, e fizemos dessa forma tão simples porque nosso Objeto `MOVES` já possui o nome do golpe, caso não possuísse poderíamos fazer assim:

```js
const createMoves = (names, moves) => 
  names.reduce( 
    (actions, name) => Object.assign(actions, { [name]: moves[name] })
  , {})
```

Então vejamos como está nosso código até agora:

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

const createMoves = (names, moves) => 
  names.reduce( 
    (actions, name) => Object.assign(actions, moves[name])
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

Para sua rápida refatoração selecione todos os `MOVES[`, apague e jogue o cursor para o final da linha, no Mac Command + [setinha pro lado direito], volte uma posição para deixar a `,` e aperte o backspace apenas uma vez para deletar `]`, depois basta copiar `createMoves([` para que você substituir o que vier depois do `=` com isso e no final da `]`, colar `, MOVES)`.


<br>

> ***MUITO FÁCIL NÃO?!***


<br>

![](http://geradormemes.com/media/created/dntkw5.jpg)



### Generalizando - Modularizando

![](http://retaildesignblog.net/wp-content/uploads/2016/11/Modular-Concrete-tiles-by-Patrycja-Domanska-and-Tanja-Lightfoot02.jpg)

Para Generalizar nosso código precisamos inicialmente separar as partes que se repetem em módulos independentes, então vamos começar pelos golpes:

```js
// https://repl.it/@suissa/Javascript-Metaprogramming-05
const lowPunch = {
  'low-punch': () => console.log('give a low punch')
}
const midPunch = {
  'mid-punch': () => console.log('give a middle punch')
}
const higPunch = {
  'hig-punch': () => console.log('give a high punch')
}
const lowKick = {
  'low-kick': () => console.log('give a low kick')
}
const midKick = {
  'mid-kick': () => console.log('give a middle kick')
}
const higKick = {
  'hig-kick': () => console.log('give a high kick')
}

const MOVES = {
  'low-punch': lowPunch,
  'mid-punch': midPunch,
  'hig-punch': higPunch,
  'low-kick': lowKick,
  'mid-kick': midKick,
  'hig-kick': higKick,
}
```

Para essa refatoração iremos RECORTAR os pedaços já existentes para separar em suas próprias constantes, por exemplo:

```js
const lowPunch = {
  'low-punch': () => console.log('give a low punch')
}
```

Então para isso eu recortei essa parte:

```js
const MOVES = {
  'low-punch': /** AQUI **/,
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
```

Para depois substituir pelo nome da constante criada:

```js
// https://repl.it/@suissa/Javascript-Metaprogramming-05
const lowPunch = {
  'low-punch': () => console.log('give a low punch')
}

const MOVES = {
  'low-punch': lowPunch,
}
```

<br>

Com isso nosso código ficará assim:


```js
// https://repl.it/@suissa/Javascript-Metaprogramming-05
const lowPunch = {
  'low-punch': () => console.log('give a low punch')
}
const midPunch = {
  'mid-punch': () => console.log('give a middle punch')
}
const higPunch = {
  'hig-punch': () => console.log('give a high punch')
}
const lowKick = {
  'low-kick': () => console.log('give a low kick')
}
const midKick = {
  'mid-kick': () => console.log('give a middle kick')
}
const higKick = {
  'hig-kick': () => console.log('give a high kick')
}

const MOVES = {
  'low-punch': lowPunch,
  'mid-punch': midPunch,
  'hig-punch': higPunch,
  'low-kick': lowKick,
  'mid-kick': midKick,
  'hig-kick': higKick,
}

const createFighter = (name, moves = []) => ({
  name, moves
})

const createMoves = (names, moves) => 
  names.reduce( 
    (actions, name) => Object.assign(actions, moves[name])
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

#### Dica - Refatoração

Está percebendo que o código está aumentando um pouquinho, isso acontece porque nesse exemplo no repl.it eu não estou separando os módulos em arquivos separados.

Então para dar continuidade farei esse código localmente.

Para iniciarmos quero que você recorte a constante `lowPunch` e salve num arquivo em separado, dentro de uma pasta chamada `actions` e o nome desse arquivo será O MESMO da constante copiada, `lowPunch.js`, nós já veremos o porquê eu não tenho esse nome no código mas sim no seu nome.

```js
module.exports = {
  'low-punch': () => console.log('give a low punch')
}
```

Agora faça isso com todas as outras, basta você pegar esse que acabou de criar e **Salvar Como** com o nome do próximo golpe, até finalizar. Para facilitar basta que você copie apenas a linha exata da função e cole no arquivo que já está com o nome do novo golpe, PA PUM!

```js
module.exports = {
  'mid-punch': () => console.log('give a middle punch')
}

module.exports = {
  'hig-punch': () => console.log('give a high punch')
}
```

Depois de ter feito esses três eu salvei como cada `[mesmoGolpe]Kick`, pois com isso eu só precisei mandar subistituir a palavra `punch` por `kick`, simprão(sic) né?

![](https://i.imgur.com/m4Gqjqh.png)

![](https://i.imgur.com/di7TU8o.png)


```js
module.exports = {
  'low-kick': () => console.log('give a low kick')
}

module.exports = {
  'mid-kick': () => console.log('give a middle kick')
}

module.exports = {
  'hig-kick': () => console.log('give a high kick')
}
```