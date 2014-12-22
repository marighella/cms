# CMS - Marighella
[![Gitter](https://badges.gitter.im/Join Chat.svg)](https://gitter.im/marighella/cms?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

![Carolos Marighella]
(http://marighella.github.io/cms/images/logo.f86a5930.png)

O Marighella é uma iniciativa dedicada a empoderar coletivos, movimentos sociais e organizações populares através da tecnologia. O nome é uma homenagem ao revolucionário Carlos Marighella, o negro guerrilheiro que balançou o Brasil ao lutar contra as opressões sobre o povo.

## O que é?

É um Gerenciador de Conteúdo (CMS) baseado em software livre e no conceito da tecnologia popular - tecnologia do povo para o povo. Pensada e construída nestes termos, a plataforma objetiva trabalhar com os desafios e características de iniciativas populares. Para tal, pretende ser leve, simples e deixar que os usuários foquem apenas na produção do conteúdo.

## Como desenvolver?

### Pré-requisitos:
* [ruby](https://www.ruby-lang.org/en/installation/)
* [sass](http://sass-lang.com/install)
* [node.js](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)
* [bower](http://bower.io/#install-bower)
* [grunt-cli](http://gruntjs.com/getting-started)

### Instalando dependências

``
$ npm install
``

``
$ bower install
``
### Executando local
``
$ grunt serve
``

A aplicação será executada no endereço http://localhost:9000.



## Como funciona?

O Gerenciador de Conteúdo (CMS) Marighella foi construído em AngularJS e é hospedado no Github Pages. Através da Github API, o conteúdo gerado é submetido para um repositório no Github através de um commit. Esse repositório, por sua vez, contém o Jekyll, marcações (HTML + CSS) e todas as postagens.

Para a publicação deste conteúdo, também usamos o Github Pages. Através do SnapCI, um serviço de integração contínua, mantém-se vigilância sobre o repositório que contém as postagens. A cada novo commit, o Jekyll é executado no ambiente do SnapCI e gera páginas estáticas para ser publicado no Github Pages. Isto encerra o ciclo de produção/publicação de conteúdo.

## Como colaborar?

Esta plataforma é levada a cabo por um time dedicado a melhorá-la constantemente. Como vocês podem imaginar, o desafio é grande! Colaboração é a chave para nos manter-mos relevantes para mais e mais movimentos/organizações sociais.

Queremos (e precisamos) de ajuda para trabalhar no Marighella. Se você tem interesse em nos ajudar, em tirar alguma dúvida, em pegar mais contexto, fique a vontade para nos contactar. Qualquer um dos desenvolvedores deste repositório irá respondê-lo.

## Discussões [![Gitter chat](https://badges.gitter.im/marighella/cms.png)](https://gitter.im/marighella/cms)

Para discussões relacionadas ao projeto, é utilizado o [gitter](https://gitter.im) que disponibiliza
um chat em tempo real.

## Gerenciamento de Projeto [![Stories in Ready](https://badge.waffle.io/marighella/cms.png?label=ready&title=Ready)](https://waffle.io/marighella/cms)

[![Throughput Graph](https://graphs.waffle.io/marighella/cms/throughput.svg)](https://waffle.io/marighella/cms/metrics)

Para controle das funcionalidades, bugs, revisão de código e afins é utilizado o waffle que trabalha em cima das issues do github, e disponibiliza um painel para um controle maior.
