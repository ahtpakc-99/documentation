---
id: gnu-linux-basics
title: O que é GNU/Linux?
sidebar_position: 2
---

# O que é GNU/Linux?

GNU/Linux é um sistema operacional construído ao longo dos anos graças às contribuições de muitos desenvolvedores ao redor do mundo. Algumas de suas peculiaridades serão descritas aqui.

## Software Livre

"Software livre" é um software que respeita a liberdade dos usuários e de sua comunidade. Em termos gerais, significa que os usuários têm a liberdade de executar, copiar, distribuir, estudar, modificar e melhorar o software. Em outras palavras, "software livre" é uma questão de liberdade, não de preço. Para entender o conceito, pense em "livre" como em "liberdade de expressão", não como em "cerveja grátis". Em inglês, às vezes no lugar de "free software" usamos "libre software", utilizando esse adjetivo em espanhol, derivado de "freedom", para mostrar que não queremos dizer que o software é gratuito.

Quatro são as liberdades que definem o "Software Livre":
- **Liberdade 0**: A liberdade de executar o programa como desejar, para qualquer propósito.
- **Liberdade 1**: A liberdade de estudar como o programa funciona e mudá-lo para fazer o que você quiser. O acesso ao código-fonte é uma condição necessária para isso.
- **Liberdade 2**: A liberdade de redistribuir cópias.
- **Liberdade 3**: A liberdade de distribuir cópias de suas versões modificadas para terceiros. Isso permite oferecer a toda a comunidade a oportunidade de se beneficiar das modificações. O acesso ao código-fonte é uma condição necessária para isso.

Um programa é "software livre" se concede adequadamente aos usuários todas essas liberdades. Caso contrário, não é livre. Diz-se que é "Software Proprietário".

Em resumo, poderíamos dizer que:
- "Software Livre" ou "Libre Software" não significa necessariamente que seja gratuito, embora em muitos casos o seja.
- "Software Livre" fornece quatro liberdades básicas: liberdade de executar o software, liberdade de modificar e estudar seu código, liberdade de redistribuir cópias desse software e liberdade de distribuir cópias de software modificado.

Você pode ler essas informações no seguinte link: [https://www.gnu.org/philosophy/free-sw.en.html](https://www.gnu.org/philosophy/free-sw.en.html)

## Projeto GNU

Vamos começar com um pouco de história... Estamos na década de 70 do século XX, quando um homem chamado Richard Stallman começou a trabalhar no MIT (Massachusetts Institute of Technology). Nessa época, era muito comum trabalhar com software livre. Os programadores eram livres para cooperar uns com os outros e faziam isso com frequência. Além disso, até mesmo empresas de informática distribuíam seus softwares livremente. Tudo isso mudou na década de 1980, e praticamente todo software passou a ser distribuído de forma privada, o que significa que tais softwares tinham donos que proibiam a cooperação entre os usuários. Por essa razão, e diante do que parecia uma injustiça, Richard Stallman decidiu criar o projeto GNU em 1983. Foi em 1985 que a Free Software Foundation foi fundada com o objetivo de levantar fundos para ajudar a programar o GNU.

O sistema operacional GNU é um sistema de software livre completo compatível com Unix. O termo GNU vem de "GNU is not Unix". É pronunciado em uma única sílaba: Ñu. Richard Stallman escreveu o anúncio inicial do Projeto GNU em setembro de 1983. Uma versão estendida, chamada de Manifesto GNU [1], foi publicada em setembro de 1985.

O nome "GNU" foi escolhido porque atendia a alguns requisitos. Antes de tudo, era um acrônimo recursivo para "GNU Is Not Unix". Em segundo lugar, era uma palavra real. Por último, era divertido de dizer (ou cantar) [2].

Eles decidiram tornar o sistema operacional compatível com Unix porque o design geral já havia sido testado e era portátil, e porque a compatibilidade tornava fácil para os usuários de Unix migrarem do Unix para o GNU.

Um sistema operacional semelhante ao Unix inclui um kernel, compiladores, editores, processadores de texto, software de e-mail, interfaces gráficas, bibliotecas, jogos e muitas outras coisas. Por tudo isso, escrever um sistema operacional completo dá muito trabalho.

No início da década de 1990, os principais componentes já haviam sido encontrados ou programados, exceto um: o kernel.

[1]. [https://www.gnu.org/gnu/manifesto.html](https://www.gnu.org/gnu/manifesto.html)  
[2]. [http://www.poppyfields.net/poppy/songs/gnu.html](http://www.poppyfields.net/poppy/songs/gnu.html)

## Projeto Linux

Vamos avançar na história, agora para 1991.

Por volta dessa época, um estudante finlandês de ciência da computação chamado Linus Torvalds queria criar um sistema operacional semelhante ao Minix (que ele usava na universidade), mas que funcionasse em seu novo computador com processador 80386.

Usando o compilador C do GNU, Linus Torvalds logo teve uma primeira versão do Kernel capaz de rodar em seu computador. Em 25 de agosto de 1991, ele anunciou esse sistema no Usenet, na lista comp.os.minix. Seu projeto rapidamente ganhou seguidores e muitos se juntaram a ele, começando a desenvolver para esse Kernel.

Linus inicialmente lançou seu software sob sua própria licença, embora finalmente tenha optado por uma licença GNU GPL em 1992, em parte porque a ferramenta C que ele havia usado para compilá-lo também era GPL.

O nome Linux, para esse kernel, foi adotado meses após sua publicação, já que o próprio Linus havia inicialmente querido chamá-lo de "Freax". Na verdade, na primeira versão do kernel, pode-se ver dentro do makefile como ele o chamou assim. Finalmente Ari Lemmke, que era uma das pessoas responsáveis pelo servidor FTP na Universidade de Tecnologia de Helsinque, colocou os arquivos no servidor sob o projeto "Linux" sem consultar Linus. Linus não gostou desse nome porque achava que era muito egocêntrico ou egoísta.

Ele finalmente aceitou a mudança de nome e, muito tempo depois, em uma entrevista, o próprio Linus comentou que "foi simplesmente o melhor nome que poderia ter sido escolhido."

![tux](/img/tux.png)

## GNU/Linux

A FSF (GNU) estava desenvolvendo um kernel chamado Hurd (ainda em desenvolvimento). Esse kernel estava sendo desenvolvido mais lentamente do que se pensava. Então, antes do lançamento do kernel Linux, ele foi adotado dentro do projeto.

Portanto, o nome correto para o Sistema Operacional não é Linux, mas GNU/Linux. Hoje em dia, quando as pessoas falam de Linux, na verdade estão falando de GNU/Linux [1].

O kernel em si é inútil. O kernel é o componente que faz o software, e portanto o usuário, ser capaz de se comunicar com o hardware. Mas é preciso mais do que um kernel para rodar um computador. É necessário que existam certos programas na parte do usuário. Esses programas podem ou não ser licenciados sob a GPL (GNU).

[1]. [https://www.gnu.org/gnu/linux-and-gnu.en.html](https://www.gnu.org/gnu/linux-and-gnu.en.html)
=======
---
id: gnu-linux-basics
title: O que é GNU/Linux?
sidebar_position: 2
---

# O que é GNU/Linux?

GNU/Linux é um sistema operacional construído ao longo dos anos graças às contribuições de muitos desenvolvedores ao redor do mundo. Algumas de suas peculiaridades serão descritas aqui.

## Software Livre

"Software livre" é um software que respeita a liberdade dos usuários e de sua comunidade. Em termos gerais, significa que os usuários têm a liberdade de executar, copiar, distribuir, estudar, modificar e melhorar o software. Em outras palavras, "software livre" é uma questão de liberdade, não de preço. Para entender o conceito, pense em "livre" como em "liberdade de expressão", não como em "cerveja grátis". Em inglês, às vezes no lugar de "free software" usamos "libre software", utilizando esse adjetivo em espanhol, derivado de "freedom", para mostrar que não queremos dizer que o software é gratuito.

Quatro são as liberdades que definem o "Software Livre":
- **Liberdade 0**: A liberdade de executar o programa como desejar, para qualquer propósito.

- **Liberdade 1**: A liberdade de estudar como o programa funciona e mudá-lo para fazer o que você quiser. O acesso ao código-fonte é uma condição necessária para isso.

- **Liberdade 2**: A liberdade de redistribuir cópias.

- **Liberdade 3**: A liberdade de distribuir cópias de suas versões modificadas para terceiros. Isso permite oferecer a toda a comunidade a oportunidade de se beneficiar das modificações. O acesso ao código-fonte é uma condição necessária para isso.

Um programa é "software livre" se concede adequadamente aos usuários todas essas liberdades. Caso contrário, não é livre. Diz-se que é "Software Proprietário".

Em resumo, poderíamos dizer que:
- "Software Livre" ou "Libre Software" não significa necessariamente que seja gratuito, embora em muitos casos o seja.
- "Software Livre" fornece quatro liberdades básicas: liberdade de executar o software, liberdade de modificar e estudar seu código, liberdade de redistribuir cópias desse software e liberdade de distribuir cópias de software modificado.

Você pode ler essas informações no seguinte link: [https://www.gnu.org/philosophy/free-sw.en.html](https://www.gnu.org/philosophy/free-sw.en.html)

## Projeto GNU

Vamos começar com um pouco de história... Estamos na década de 70 do século XX, quando um homem chamado Richard Stallman começou a trabalhar no MIT (Massachusetts Institute of Technology). Nessa época, era muito comum trabalhar com software livre. Os programadores eram livres para cooperar uns com os outros e faziam isso com frequência. Além disso, até mesmo empresas de informática distribuíam seus softwares livremente. Tudo isso mudou na década de 1980, e praticamente todo software passou a ser distribuído de forma privada, o que significa que tais softwares tinham donos que proibiam a cooperação entre os usuários. Por essa razão, e diante do que parecia uma injustiça, Richard Stallman decidiu criar o projeto GNU em 1983. Foi em 1985 que a Free Software Foundation foi fundada com o objetivo de levantar fundos para ajudar a programar o GNU.

O sistema operacional GNU é um sistema de software livre completo compatível com Unix. O termo GNU vem de "GNU is not Unix". É pronunciado em uma única sílaba: Ñu. Richard Stallman escreveu o anúncio inicial do Projeto GNU em setembro de 1983. Uma versão estendida, chamada de Manifesto GNU [1], foi publicada em setembro de 1985.

O nome "GNU" foi escolhido porque atendia a alguns requisitos. Antes de tudo, era um acrônimo recursivo para "GNU Is Not Unix". Em segundo lugar, era uma palavra real. Por último, era divertido de dizer (ou cantar) [2].

Eles decidiram tornar o sistema operacional compatível com Unix porque o design geral já havia sido testado e era portátil, e porque a compatibilidade tornava fácil para os usuários de Unix migrarem do Unix para o GNU.

Um sistema operacional semelhante ao Unix inclui um kernel, compiladores, editores, processadores de texto, software de e-mail, interfaces gráficas, bibliotecas, jogos e muitas outras coisas. Por tudo isso, escrever um sistema operacional completo dá muito trabalho.

No início da década de 1990, os principais componentes já haviam sido encontrados ou programados, exceto um: o kernel.

[1]. [https://www.gnu.org/gnu/manifesto.html](https://www.gnu.org/gnu/manifesto.html)  

[2]. [http://www.poppyfields.net/poppy/songs/gnu.html](http://www.poppyfields.net/poppy/songs/gnu.html)

## Projeto Linux

Vamos avançar na história, agora para 1991.

Por volta dessa época, um estudante finlandês de ciência da computação chamado Linus Torvalds queria criar um sistema operacional semelhante ao Minix (que ele usava na universidade), mas que funcionasse em seu novo computador com processador 80386.

Usando o compilador C do GNU, Linus Torvalds logo teve uma primeira versão do Kernel capaz de rodar em seu computador. Em 25 de agosto de 1991, ele anunciou esse sistema no Usenet, na lista comp.os.minix. Seu projeto rapidamente ganhou seguidores e muitos se juntaram a ele, começando a desenvolver para esse Kernel.

Linus inicialmente lançou seu software sob sua própria licença, embora finalmente tenha optado por uma licença GNU GPL em 1992, em parte porque a ferramenta C que ele havia usado para compilá-lo também era GPL.

O nome Linux, para esse kernel, foi adotado meses após sua publicação, já que o próprio Linus havia inicialmente querido chamá-lo de "Freax". Na verdade, na primeira versão do kernel, pode-se ver dentro do makefile como ele o chamou assim. Finalmente Ari Lemmke, que era uma das pessoas responsáveis pelo servidor FTP na Universidade de Tecnologia de Helsinque, colocou os arquivos no servidor sob o projeto "Linux" sem consultar Linus. Linus não gostou desse nome porque achava que era muito egocêntrico ou egoísta.

Ele finalmente aceitou a mudança de nome e, muito tempo depois, em uma entrevista, o próprio Linus comentou que "foi simplesmente o melhor nome que poderia ter sido escolhido."

![tux](/img/tux.png)

## GNU/Linux

A FSF (GNU) estava desenvolvendo um kernel chamado Hurd (ainda em desenvolvimento). Esse kernel estava sendo desenvolvido mais lentamente do que se pensava. Então, antes do lançamento do kernel Linux, ele foi adotado dentro do projeto.

Portanto, o nome correto para o Sistema Operacional não é Linux, mas GNU/Linux. Hoje em dia, quando as pessoas falam de Linux, na verdade estão falando de GNU/Linux [1].

O kernel em si é inútil. O kernel é o componente que faz o software, e portanto o usuário, ser capaz de se comunicar com o hardware. Mas é preciso mais do que um kernel para rodar um computador. É necessário que existam certos programas na parte do usuário. Esses programas podem ou não ser licenciados sob a GPL (GNU).

[1]. [https://www.gnu.org/gnu/linux-and-gnu.en.html](https://www.gnu.org/gnu/linux-and-gnu.en.html)
>>>>>>> f058b54 (Tradução GNU/Linux Basics + ajustes de imagens e sidebar)
