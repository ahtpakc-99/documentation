---
id: what-is-gnu-linux
title: O que é GNU/Linux?
sidebar_position: 2
---

# O que é GNU/Linux?

GNU/Linux é um sistema operacional construído ao longo dos anos graças às contribuições de muitos desenvolvedores ao redor do mundo. Algumas de suas peculiaridades serão descritas aqui.

## Software Livre

"Software livre" é um software que respeita a liberdade dos usuários e de sua comunidade. De forma ampla, significa que os usuários têm a liberdade de executar, copiar, distribuir, estudar, modificar e melhorar o software. Em outras palavras, "software livre" é uma questão de liberdade, não de preço. Para entender o conceito, pense em "livre" como em "liberdade de expressão", não como em "cerveja grátis". Em inglês, às vezes no lugar de "free software" usamos "libre software", utilizando esse adjetivo espanhol, derivado de "freedom", para mostrar que não queremos dizer que o software é gratuito.

Quatro são as liberdades que definem o "Software Livre":

- **Liberdade 0**: A liberdade de executar o programa como desejado, para qualquer propósito.  
- **Liberdade 1**: A liberdade de estudar como o programa funciona e modificá-lo para que faça o que você deseja. O acesso ao código-fonte é uma condição necessária para isso.  
- **Liberdade 2**: A liberdade de redistribuir cópias.  
- **Liberdade 3**: A liberdade de distribuir cópias de suas versões modificadas para terceiros. Isso permite oferecer a toda a comunidade a oportunidade de se beneficiar das modificações. O acesso ao código-fonte é uma condição necessária para isso.  

Um programa é "software livre" se concede adequadamente aos usuários todas essas liberdades. Caso contrário, não é livre. Diz-se que é "Software Proprietário".

Em resumo, podemos dizer que:
- "Software Livre" ou "Libre Software" não significa necessariamente que ele é gratuito, embora em muitos casos seja.  
- "Software Livre" fornece quatro liberdades básicas: liberdade de executar o software, liberdade de modificar e estudar seu código, liberdade de redistribuir cópias desse software e liberdade de distribuir cópias modificadas.  

Você pode ler mais sobre isso no seguinte link: [https://www.gnu.org/philosophy/free-sw.en.html](https://www.gnu.org/philosophy/free-sw.en.html)

---

## Projeto GNU

Vamos começar com um pouco de história... Estamos na década de 70 do século XX, quando um homem chamado Richard Stallman começou a trabalhar no MIT (Massachusetts Institute of Technology). Naquela época, era muito comum trabalhar com software livre. Os programadores eram livres para cooperar uns com os outros e o faziam com bastante frequência. Além disso, até as empresas de informática distribuíam seus softwares livremente.  

Tudo isso mudou nos anos 80, e praticamente todo o software passou a ser distribuído de forma proprietária, o que significa que tais softwares tinham donos que proibiam a cooperação entre os usuários. Por essa razão, e diante do que parecia uma injustiça, Richard Stallman decidiu criar o Projeto GNU em 1983. Já em 1985, foi fundada a Free Software Foundation com o objetivo de arrecadar fundos para ajudar no desenvolvimento do GNU.  

O sistema operacional GNU é um sistema de software livre completo e compatível com Unix. O termo GNU vem de "GNU is not Unix". Ele é pronunciado em uma única sílaba: Ñu. Richard Stallman escreveu o anúncio inicial do Projeto GNU em setembro de 1983. Uma versão expandida, chamada de Manifesto GNU [1], foi publicada em setembro de 1985.  

O nome "GNU" foi escolhido porque atendia a alguns requisitos:  
1. Era um acrônimo recursivo de "GNU Is Not Unix".  
2. Era uma palavra real.  
3. Era divertido de dizer (ou cantar) [2].  

Eles decidiram tornar o sistema operacional compatível com Unix porque o design já estava testado e era portátil, além de que essa compatibilidade facilitava a migração dos usuários de Unix para GNU.  

Um sistema operacional semelhante ao Unix inclui um kernel, compiladores, editores, processadores de texto, softwares de e-mail, interfaces gráficas, bibliotecas, jogos e muitas outras coisas. Por tudo isso, escrever um sistema operacional completo dá muito trabalho.  

No início da década de 1990, os principais componentes já haviam sido encontrados ou programados, exceto um: o kernel.  

[1]. [https://www.gnu.org/gnu/manifesto.html](https://www.gnu.org/gnu/manifesto.html)  
[2]. [http://www.poppyfields.net/poppy/songs/gnu.html](http://www.poppyfields.net/poppy/songs/gnu.html)  

---

## Projeto Linux

Agora vamos para 1991.  

Nessa época, um estudante finlandês de ciência da computação chamado Linus Torvalds queria criar um sistema operacional semelhante ao Minix (que ele usava na universidade), mas que funcionasse em seu novo computador com processador 80386.  

Usando o compilador GNU C, Linus Torvalds logo teve uma primeira versão do kernel capaz de rodar em seu computador. Em 25 de agosto de 1991, ele anunciou esse sistema no Usenet, na lista comp.os.minix. Seu projeto rapidamente ganhou seguidores, e muitos se juntaram a ele para desenvolver esse kernel.  

Inicialmente, Linus lançou seu software sob sua própria licença, embora em 1992 ele tenha escolhido a licença GNU GPL, em parte porque a ferramenta C que ele havia usado para compilar também era GPL.  

O nome Linux, para esse kernel, foi adotado meses após sua publicação, já que Linus havia originalmente pensado em chamá-lo de "Freax". Na primeira versão do kernel, dentro do makefile, ainda aparecia esse nome. Foi Ari Lemmke, responsável pelo servidor FTP da Universidade de Tecnologia de Helsinque, quem colocou os arquivos no servidor sob o nome "Linux" sem consultar Linus. Ele inicialmente não gostou, achando o nome egocêntrico.  

Com o tempo, acabou aceitando e, em uma entrevista posterior, comentou: "foi simplesmente o melhor nome que poderia ter sido escolhido".  

![Tux](./images/tux.png)

---

## GNU/Linux

A FSF (GNU) estava desenvolvendo um kernel chamado Hurd (ainda em desenvolvimento). Esse kernel avançava mais lentamente do que se pensava. Assim, antes mesmo do lançamento do kernel Linux, ele foi adotado dentro do projeto.  

Portanto, o nome correto para o Sistema Operacional não é Linux, mas GNU/Linux. Hoje em dia, quando as pessoas falam em Linux, na verdade estão falando em GNU/Linux [1].  

O kernel em si é inútil. Ele é o componente que permite que o software (e, portanto, o usuário) se comunique com o hardware. Mas não basta apenas o kernel para rodar um computador. É necessário haver programas na camada de usuário. Esses programas podem ou não estar licenciados sob a GPL (GNU).  

[1]. [https://www.gnu.org/gnu/linux-and-gnu.en.html](https://www.gnu.org/gnu/linux-and-gnu.en.html)
