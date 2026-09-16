# Arty

## Plataforma de vídeos curtos para arte

Projeto Integrador desenvolvido em 2026 por estudantes do curso Técnico em Informática para Internet do Instituto Federal Catarinense (IFC), Campus Concórdia.

A **Arty** é uma proposta de plataforma para descobrir, assistir e salvar vídeos curtos relacionados ao universo artístico. A interface foi planejada para apresentar referências e ideias de forma rápida, com navegação por categorias e recursos básicos de personalização do usuário.

Nos materiais de planejamento, o projeto também aparece como **ArtIA** e aborda a relação entre inteligência artificial, música e artes visuais. Esses materiais apresentam uma visão mais ampla da plataforma, incluindo publicação de obras, comunidade artística, recomendações personalizadas e discussão sobre autoria, autenticidade e direitos autorais. O protótipo implementado neste repositório corresponde à versão front-end da Arty, com foco no feed de vídeos curtos.

## Funcionalidades

- Tela inicial com login, criação de conta simulada, acesso como visitante e simulação de login com Google.
- Feed de vídeos curtos organizado nas categorias:
  - Ideias de Desenho
  - Pinturas
  - Escultura
  - Design Digital
- Reprodução, pausa e navegação entre vídeos.
- Navegação para o próximo ou vídeo anterior por botão, teclado, rolagem do mouse ou gesto de arrastar.
- Busca por categoria.
- Salvamento e remoção de vídeos favoritos.
- Comentários privados associados ao usuário e ao vídeo.
- Perfil com edição de nome, biografia, foto, gênero, pronome, cidade/estado e telefone.
- Galeria de vídeos salvos no perfil.
- Alternância entre modo claro e modo escuro.
- Páginas de mensagens, notificações e configurações.
- Modal “Sobre Nós” com informações sobre a proposta da plataforma.

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- `localStorage` para simular contas, sessão, perfil, tema, comentários e vídeos salvos
- Vídeos em formato MP4 armazenados localmente
- Google Fonts: Inter e Playfair Display

## Como executar

O projeto não precisa de instalação de dependências ou processo de compilação.

1. Clone este repositório ou faça o download dos arquivos.
2. Abra a pasta do projeto no VS Code.
3. Abra o arquivo `index.html` diretamente no navegador ou use uma extensão de servidor local, como o Live Server.

Para uma experiência mais consistente com os arquivos locais, recomenda-se executar o projeto por um servidor local.

## Estrutura do projeto

```text
PI-2026-1F-4G/
├── index.html             # Tela inicial e login
├── exposicoes.html        # Feed e exploração de vídeos
├── perfil.html            # Perfil e vídeos salvos
├── configuracoes.html     # Preferências de aparência e conta
├── mensagens.html         # Área de mensagens
├── notificacoes.html      # Lista de notificações
├── css/
│   └── style.css          # Estilos de todas as páginas
├── js/
│   └── script.js          # Interações e regras da aplicação
├── imagens/
│   ├── logo.png           # Logo da Arty
│   └── logoifc.png        # Logo do IFC
├── documentacao/
│   ├── artigo-ia-artes-grupo4.pdf       # Artigo acadêmico sobre IA e artes
│   ├── briefing-grupo4-pi-2026.pdf      # Briefing do Projeto Integrador
│   ├── canvas-grupo4-preenchido.pptx    # Quadro Canvas do projeto
│   ├── wireframe-grupo4-prototipo.pdf   # Primeira versão dos wireframes
│   └── wireframe-grupo4-final.pdf       # Versão final dos wireframes
└── videos/                # Vídeos utilizados no feed
```

## Observações técnicas

Este repositório contém um protótipo acadêmico front-end. Não há servidor, banco de dados ou autenticação real. Os dados inseridos durante o uso ficam armazenados no `localStorage` do navegador e podem ser apagados ao limpar os dados do site.

O botão de login com Google é apenas uma simulação para fins de demonstração. Os vídeos são carregados a partir da pasta `videos/`, portanto ela deve permanecer no projeto para que o feed funcione corretamente.

## Documentação do projeto

Os materiais acadêmicos e de planejamento estão na pasta `documentacao/`:

- `artigo-ia-artes-grupo4.pdf`: artigo sobre a influência da inteligência artificial na música e nas artes visuais, abordando criação, autoria, originalidade, autenticidade e direitos autorais.
- `briefing-grupo4-pi-2026.pdf`: briefing com tema, objetivos, público-alvo, proposta, funcionalidades planejadas, pesquisa e cronograma.
- `canvas-grupo4-preenchido.pptx`: Canvas com contexto, hipótese, metodologia, resultados esperados, riscos e plano de entregas.
- `wireframe-grupo4-prototipo.pdf`: primeira versão dos wireframes, usada durante a etapa inicial de planejamento.
- `wireframe-grupo4-final.pdf`: versão final dos wireframes da interface e da identidade visual da plataforma.

O wireframe final representa a versão consolidada do planejamento visual. O protótipo anterior foi mantido apenas como registro do processo de desenvolvimento.

Os wireframes foram planejados e desenvolvidos no Figma antes da implementação do protótipo em HTML, CSS e JavaScript.

### Proposta planejada

O briefing e o Canvas apresentam uma plataforma social para artistas, com publicação de desenhos, imagens, músicas e projetos, além de curtidas, comentários, reposts, seguidores, coleções, recomendações e pesquisa inteligente. Também é discutida a possibilidade de um verificador de conteúdo gerado por inteligência artificial.

Esses itens fazem parte da proposta e dos materiais de planejamento. Nem todos estão implementados no protótipo atual, que utiliza páginas HTML estáticas e recursos simulados no navegador.

## Equipe

| Integrante | Responsabilidades |
| --- | --- |
| Ramon | Desenvolvimento em HTML, CSS e JavaScript |
| Pedro | Desenvolvimento em HTML, CSS e JavaScript |
| Gabrieli Pecini | Produção e organização do conteúdo |
| Jhonatam Saccon | Revisão do projeto e dos conteúdos |
| Andreas Schell | Desenvolvimento e ajustes em CSS |

## Contexto acadêmico

Este trabalho foi realizado como parte do Projeto Integrador do curso Técnico em Informática para Internet do Instituto Federal Catarinense, Campus Concórdia, no ano de 2026.

---

Projeto acadêmico desenvolvido pelo grupo Arty.
