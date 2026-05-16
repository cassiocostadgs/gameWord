# Objetivo do Projeto

> **Como preencher:** substitua os blocos em _itálico_ pelo conteúdo real. Remova as instruções após preencher. Seja direto — evite textos genéricos.
> **Caminho:** `02-systems/{sistema}/overview/project-goal.md`

---

## Identificação do Sistema

**Nome do sistema:** IA Crossword

**Status:** Em desenvolvimento

**Repositório de código:** Local / repositório de estudo

**Última atualização:** 2026-05-16 — Desenvolvedor

### Ambientes

| Ambiente | URL |
|---|---|
| Desenvolvimento | `localhost` via `npm run dev` |
| Homologação | N/A |
| Produção | N/A |

---

## Problema a Ser Resolvido

**Situação atual:** Não existe uma experiência interativa leve para revisar e fixar conceitos básicos de Inteligência Artificial em formato de jogo. O material de estudo atual é frequentemente textual e pouco envolvente.

**Causa raiz:** Falta de recursos lúdicos que conectem termos de IA a atividades práticas e visuais. O aprendizado fica menos eficiente sem reforço por meio de feedback imediato.

**Impacto:** Estudantes e iniciantes têm mais dificuldade para memorizar conceitos e perdem motivação. Isso reduz a retenção de conhecimento e a velocidade de aprendizado.

---

## Objetivo do Projeto

**Onde devemos chegar com o projeto entregue:**

- Entregar um jogo de palavras cruzadas temático de IA que possa ser usado diretamente no navegador.
- Oferecer uma experiência interativa com navegação por teclado, dicas limitadas e feedback visual de progresso.
- Ajudar o usuário a consolidar conceitos de IA por meio de pistas e palavras relacionadas.

---

## Visão Geral do Sistema

### Propósito

O sistema é um aplicativo educativo de palavras cruzadas com foco em Inteligência Artificial. Ele resolve a necessidade de oferecer um ambiente de estudo mais prático e engajante para conceitos como modelo, prompt, token, rede, neural, treino e bias.

### Público-Alvo e Usuários

**Perfil 1 — Estudante de IA**
Profissional ou estudante em início de jornada que busca reforçar o vocabulário técnico. Usa o jogo para praticar e memorizar termos de IA.

**Perfil 2 — Entusiasta de tecnologia**
Pessoa curiosa que deseja aprender conceitos básicos de IA de forma lúdica. Acessa o aplicativo como complemento de estudos.

**Perfil 3 — Instrutor / Facilitador**
Professor ou mentor que recomenda o jogo como material de apoio em aulas, treinamentos ou workshops.

### Contexto de Mercado e Posicionamento

**Contexto de mercado:** Educação tecnológica e gamificação. Há demanda por ferramentas rápidas e visuais para aprender conceitos de IA.

**Posicionamento:** Aplicativo leve, sem backend, focado em aprendizado conceitual por meio de uma atividade conhecida: palavras cruzadas.

**Público-alvo de mercado:** Alunos, entusiastas e facilitadores de IA que querem uma experiência de revisão direta e focada.

### Contexto de Uso pelo Cliente

O aplicativo é usado no navegador local, em ambiente de estudo ou apresentação. Serve como ferramenta de autoavaliação e reforço conceitual, sem integração com outros sistemas.

---

## Contexto de Negócio

**Sobre o negócio:** Protótipo educacional para reforçar conceitos básicos de Inteligência Artificial.

**Domínio e segmento:** Educação em tecnologia, com foco em IA e gamificação de conteúdo.

**Processo atual (como as pessoas fazem hoje):** Usuários estudam termos de IA em texto ou vídeo, mas não contam com um recurso interativo simples para praticar o significado das palavras.

**Restrições e regras de negócio relevantes:** O produto é cliente-only e não deve exigir dados pessoais ou integrações externas para funcionar.

---

## Escopo Macro do Projeto

> Liste os grandes blocos de entrega: módulos, epics ou grandes funcionalidades. Apenas títulos — o detalhamento fica em `product/scope-features.md`. Ordene por prioridade ou sequência de entrega.

| # | Módulo / Epic | Prioridade |
|---|---|---|
| 1 | Jogo de palavras cruzadas de IA | Alta |
| 2 | Navegação e usabilidade | Alta |
| 3 | Feedback e progresso | Média |
| 4 | Interface visual e animações | Baixa |

---

## Escopo Negativo do Projeto

> Liste explicitamente o que este projeto NÃO vai fazer. Isso é tão importante quanto o escopo positivo — evita retrabalho e alinhamentos tardios.

| O que não será feito | Motivo |
|---|---|
| Persistência de pontuação e progresso em servidor | Não há backend ou requisito de login. |
| Autenticação de usuário | O jogo deve ser acessado sem cadastro. |
| Geração dinâmica de puzzles | O conteúdo do puzzle é estático e definido no código. |
| Integração com APIs externas | O objetivo é manter o app leve e independente. |

---

## Pessoas e Interesses (Stakeholders)

> Liste todas as pessoas com papel relevante no projeto — quem decide, quem aprova, quem usa e quem é afetado.

| Nome | Empresa / Área | Papel no Projeto |
|---|---|---|
| Desenvolvedor | Equipe técnica | Implementação e manutenção do aplicativo |
| Estudante / Usuário final | Público-alvo | Usa a aplicação para aprender IA |
| Instrutor / Facilitador | Educação | Utiliza o jogo como material de apoio |

---

> **Próximo passo:** com este documento preenchido e revisado, acione o `makuco-specify` referenciando este arquivo para gerar as specs de cada módulo listado no Escopo Macro.
