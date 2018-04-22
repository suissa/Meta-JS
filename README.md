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
2. Inferiros os padrões.
3. Refatorar para generalizar.
4. Automatizar a execução. 

<br>

### Inferindo Padrões

![padrões triangulares coloridos](https://uxmag.com/sites/default/files/styles/632x307/adaptive-image/public/article-images/ux-patterns-banner2.png?itok=ikhleFSI)

