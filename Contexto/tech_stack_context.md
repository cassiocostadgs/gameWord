# Stack de Tecnologia

> **Como preencher:** registre todas as tecnologias, ferramentas e sistemas utilizados neste projeto. O objetivo é que qualquer desenvolvedor novo saiba exatamente com o que vai trabalhar antes de configurar o ambiente.
> **Caminho:** `02-systems/{sistema}/architecture/tech-stack.md`

---

## Linguagem e Runtime

| Item | Tecnologia | Versão | Observação |
|---|---|---|---|
| Linguagem principal | TypeScript | ~5.8.2 | Tipagem estática para React e logica do jogo. |
| Runtime / Plataforma | Navegador / Vite | N/A / 6.2.0 | Aplicação cliente-only carregada pelo bundler Vite. |
| Gerenciador de pacotes | npm | Compatível com Node.js 22+ | Gerencia dependências e scripts. |

---

## Frameworks e Bibliotecas Principais

| Camada | Framework / Biblioteca | Versão | Finalidade |
|---|---|---|---|
| Frontend | React | ^19.2.0 | UI declarativa e componentes do jogo. |
| Build | Vite | ^6.2.0 | Bundling e desenvolvimento local rápido. |
| Animações | framer-motion | ^12.23.24 | Animações sutis de interação e overlay de vitória. |
| Ícones | lucide-react | ^0.554.0 | Ícones do painel de status e botões. |

---

## Banco de Dados

| Tipo | Tecnologia | Versão | Uso no sistema |
|---|---|---|---|
| Relacional | N/A | N/A | Não há armazenamento persistente. |
| Cache | N/A | N/A | Não há cache dedicado. |
| Busca | N/A | N/A | Não há busca externa. |

---

## Infraestrutura e Cloud

| Item | Tecnologia | Observação |
|---|---|---|
| Cloud provider | N/A | Aplicação frontend estática. |
| Containers | N/A | Não há containerização obrigatória. |
| Orquestração | N/A | Não aplicável. |
| CI/CD | N/A | Não definido no repositório atual. |
| Monitoramento | N/A | Não há monitoramento configurado. |

---

## Sistemas e Componentes Externos

> Registre todos os sistemas de terceiros, APIs externas e componentes compartilhados da organização que este sistema consome ou com os quais se integra.

| Sistema / Componente | Tipo | Finalidade | Como integra |
|---|---|---|---|
| Nenhum | N/A | O aplicativo não depende de serviços externos no escopo atual. | Não se aplica. |

---

## Ferramentas de Desenvolvimento

| Ferramenta | Finalidade |
|---|---|
| VS Code | IDE principal |
| npm | Gerenciamento de dependências e execução de scripts |
| Navegador moderno | Testes e execução local |
| Vite | Desenvolvimento local e build de produção |
