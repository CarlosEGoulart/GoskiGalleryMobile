# GoskiGallery

Este repositório contém o código-fonte do GoskiGallery, uma aplicação de galeria de arte.
O projeto é construído com React Native e Expo, focando em uma experiência de usuário rica e performática para visualização de obras de arte e informações sobre artistas.

## Tecnologias Utilizadas

O projeto utiliza as seguintes tecnologias:

- **React**: Biblioteca para construção de interfaces de usuário.
- **React Native**: Framework para desenvolvimento de aplicativos móveis multiplataforma.
- **Expo**: Plataforma para facilitar o desenvolvimento e a publicação de aplicativos React Native.
- **TypeScript**: Linguagem de programação para um desenvolvimento mais robusto e seguro.
- **Expo Router**: Para navegação e roteamento dentro do aplicativo.

## Estrutura do Projeto

A estrutura do projeto está organizada da seguinte forma:

```
GoskiGallery/
├── app/                  # Arquivos de rota e telas da aplicação
│   ├── _layout.tsx
│   ├── artists.tsx
│   ├── artsCatalog.tsx
│   └── index.tsx
├── assets/               # Recursos estáticos como fontes e imagens
│   ├── fonts/
│   └── images/
├── components/           # Componentes reutilizáveis da interface
│   ├── Artists/
│   ├── Arts/
│   ├── Footer/
│   ├── Header/
│   ├── Main.tsx
│   ├── ScreenWrapper.tsx
│   ├── StyleButton.tsx
│   └── StyleText.tsx
├── constants/            # Constantes e configurações do tema
│   └── theme.ts
├── app.json              # Configurações do aplicativo Expo
├── package.json          # Dependências e scripts do projeto
└── tsconfig.json         # Configurações do TypeScript
```

## Como Configurar e Rodar o Projeto

Para configurar e rodar este projeto em seu ambiente local, siga os passos abaixo:

### Pré-requisitos

Certifique-se de ter o Node.js e o Yarn instalados em sua máquina, além do ambiente de desenvolvimento Expo configurado.

### Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/CarlosEGoulart/GoskiGalleryMobile.git
   ```
2. Navegue até o diretório do projeto:
   ```bash
   cd GoskiGallery
   ```
3. Instale as dependências:
   ```bash
   yarn install
   ```

### Rodando a Aplicação

Para iniciar o servidor de desenvolvimento do Expo:

```bash
yarn start
```

Após iniciar o servidor, você pode abrir o aplicativo em um emulador/simulador (Android/iOS) ou em seu dispositivo físico usando o aplicativo Expo Go.

- Para rodar na web:
  ```bash
  yarn web
  ```
