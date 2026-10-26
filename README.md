# ✨ Portfólio Pessoal Aesthetic — Ana Beatriz

Um portfólio moderno, sofisticado e criativo, desenvolvido com **HTML5, CSS3 e JavaScript puro**, inspirado na estética visual de plataformas como **Awwwards** e **SiteInspire**.

O projeto conta com tema escuro (tons de preto e grafite), acentos em lilás e roxo suave, tipografia elegante (*Syne* + *Plus Jakarta Sans*), microinterações e uma central de configuração de links simples e direta.

---

## 📁 Estrutura de Arquivos

```text
anab/
├── index.html              # Estrutura principal da página (semântica e acessível)
├── css/
│   ├── variables.css       # Design System (paleta de cores, tipografia, espaçamentos)
│   └── style.css           # Estilização completa, layouts modernos e responsividade
├── js/
│   ├── config.js           # ⚡ CENTRAL DE LINKS E CONTEÚDO (Edite seus links aqui!)
│   └── main.js             # Lógica de interações, animações no scroll e validações
├── assets/
│   └── images/             # Vetores SVG aesthetic para prévias e monograms
│       ├── avatar.svg      # Emblema / monograma estilizado
│       ├── project-1.svg   # Mockup visual do Projeto 1
│       ├── project-2.svg   # Mockup visual do Projeto 2
│       └── project-3.svg   # Mockup visual do Projeto 3
└── README.md               # Guia de uso e personalização
```

---

## ⚡ Como Personalizar Seus Links (Passo a Passo)

Você **não precisa mexer no código HTML nem no CSS** para atualizar seus links ou adicionar novos projetos! Tudo está centralizado no arquivo:

👉 `js/config.js`

### 1. Seus Links de Contato
Abra `js/config.js` e localize a seção `contact`:

```javascript
contact: {
  // Substitua pelo link do seu perfil no GitHub:
  github: "https://github.com/seu-usuario",

  // Substitua pelo link do seu perfil no LinkedIn:
  linkedin: "https://linkedin.com/in/seu-perfil",

  // Substitua pelo seu endereço de e-mail real:
  email: "contato@seue-mail.com"
}
```

### 2. Seus Projetos
No mesmo arquivo `js/config.js`, personalize cada projeto na lista `projects`:

```javascript
projects: [
  {
    id: 1,
    number: "01",
    title: "Nome do Seu Projeto",
    category: "Web Design / Front-end",
    description: "Breve descrição do projeto e das tecnologias utilizadas.",
    tags: ["HTML5", "CSS3", "JavaScript"],
    image: "assets/images/project-1.svg", // Ou coloque sua imagem em assets/images/
    demoUrl: "https://seu-projeto-online.vercel.app", // Link do projeto publicado
    githubUrl: "https://github.com/seu-usuario/seu-repositorio" // Link do código no GitHub
  },
  // ... adicione mais projetos duplicando o bloco acima!
]
```

> **💡 Dica inteligente:** Se você clicar em um botão cujo link ainda esteja como `LINK_DO_PROJETO_1` ou `MEU_EMAIL`, o site não quebrará nem exibirá erro 404 — ele mostrará uma notificação amigável na tela indicando onde editá-lo!

---

## 🌟 Principais Recursos e Funcionalidades

- **Identidade Visual Aesthetic:** Fundo escuro com orbs de iluminação ambiente roxa e lilás, bordas sutis com glassmorphism e tipografia display marcante.
- **Menu de Navegação Inteligente:** Barra flutuante com blur (efeito vidro fosco), indicação de seção ativa e drawer responsivo para smartphones.
- **Scroll Reveal & Microinterações:** Animações fluidas ativadas conforme o usuário rola a página, sem bibliotecas pesadas.
- **Cards de Projetos com Ações Reais:** Acesso direto ao deploy e ao código no GitHub com ícones intuitivos.
- **Formulário de Contato com Validação Real:** Valida campos obrigatórios e formato de e-mail; ao enviar, abre o aplicativo de e-mail padrão do usuário pré-preenchido via `mailto:` de forma transparente e honesta.
- **Copiar E-mail com 1 Clique:** O card de e-mail copia o endereço diretamente para a área de transferência com notificação toast imediata.
- **100% Responsivo:** Otimizado e testado para celulares, tablets e computadores de alta resolução.

---

## 🚀 Como Visualizar e Testar no seu Computador

1. Dê dois cliques no arquivo `index.html` ou abra com o seu navegador favorito (Chrome, Edge, Firefox, Brave, Safari).
2. Se você utiliza a extensão **Live Server** no VS Code, basta clicar com o botão direito em `index.html` e selecionar **"Open with Live Server"**.

---

## 🌐 Como Publicar Gratuitamente na Web

Você pode colocar seu portfólio no ar em menos de 2 minutos:

### Opção A: GitHub Pages (Recomendado)
1. Crie um repositório no seu GitHub (ex: `portfolio` ou `seu-usuario.github.io`).
2. Suba todos os arquivos desta pasta para o repositório.
3. No GitHub, acesse **Settings > Pages**.
4. Em **Branch**, selecione `main` e a pasta `/ (root)`, depois clique em **Save**.
5. Seu site estará publicado em: `https://seu-usuario.github.io/portfolio`!

### Opção B: Vercel ou Netlify
1. Acesse [vercel.com](https://vercel.com) ou [netlify.com](https://netlify.com).
2. Arraste e solte a pasta deste projeto ou conecte seu repositório do GitHub.
3. O deploy é instantâneo e você ganha um link rápido com certificado SSL gratuito.
