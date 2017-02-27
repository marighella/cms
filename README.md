# CMS - Marighella


![Carolos Marighella]
(http://marighella.github.io/cms/images/logo.png)

O Marighella é uma iniciativa dedicada a empoderar coletivos, movimentos sociais e organizações populares através da tecnologia. O nome é uma homenagem ao revolucionário Carlos Marighella, o negro guerrilheiro que balançou o Brasil ao lutar contra as opressões sobre o povo.


## O que é?

É um Gerenciador de Conteúdo (CMS) baseado em software livre e no conceito da tecnologia popular - tecnologia do povo para o povo. Pensada e construída nestes termos, a plataforma objetiva trabalhar com os desafios e características de iniciativas populares. Para tal, pretende ser leve, simples e deixar que os usuários foquem apenas na produção do conteúdo.


Instalando os pacotes NodeJS

``
$ npm install
``

Instalando os pacotes do Frontend do projeto via Bower

``
$ bower install
``


### Executando em sua máquina local com uma fake api
``
$ json-server --watch db/db.json --routes db/routes.json && grunt serve
``

A aplicação será executada no endereço `http://localhost:9000`.
