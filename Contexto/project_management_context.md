# Gestão do Projeto e Ciclo de Desenvolvimento

> **Como preencher:** registre aqui como o projeto é gerenciado — onde o trabalho vive, como está organizado e como o time opera no dia a dia. Qualquer pessoa que entre no projeto deve conseguir entender o fluxo de trabalho lendo este documento.
> **Caminho:** `02-systems/{sistema}/management/project-management.md`

---

## Plataforma de Gestão

**Plataforma:** GitHub (issues / projects)
**URL / Acesso:** Definido no repositório do projeto
**Como solicitar acesso:** solicitar acesso ao repositório junto ao responsável pelo código.

---

## Modelo de Organização do Trabalho

| Nível | Nome utilizado | O que representa | Exemplo |
|---|---|---|---|
| 1 — mais alto | Epic | Objetivo macro ou grande funcionalidade do produto | Jogo de palavras cruzadas de IA |
| 2 | Feature | Conjunto de entregas relacionadas a um fluxo de usuário | Timer e progresso do jogo |
| 3 | PBI / Story / Task | Trabalho executável em um ciclo curto | Implementar dica limitada no tabuleiro |
| 4 — mais baixo | Sub-task | Atividade técnica ou ajuste dentro de um PBI | Ajustar navegação por teclado |

---

## Tamanho e Critérios de um PBI

**Tamanho máximo:** Um PBI deve ser concluível em no máximo 2 dias por um desenvolvedor.

**Um bom PBI deve:**
- Ter um critério de aceite claro e verificável
- Poder ser desenvolvido e testado de forma independente
- Ser pequeno o suficiente para caber em um ciclo
- Ter valor de negócio ou técnico identificável

**Um PBI deve ser quebrado quando:**
- A estimativa ultrapassar 2 dias
- Tiver mais de uma responsabilidade principal
- Depender de outra entrega para ser testado

---

## Modelo de Desenvolvimento

**Metodologia:** Kanban leve / fluxo contínuo

**Duração do ciclo:** Ciclo de trabalho contínuo com entregas incrementais

**Início do ciclo:** A cada nova tarefa priorizada no backlog

---

## Cerimônias e Rituais

| Cerimônia | Frequência | Duração | Objetivo |
|---|---|---|---|
| Planning | Quando houver novas features | 30-60 min | Definir escopo e prioridades das próximas entregas |
| Review | Após entrega de funcionalidade | 30-45 min | Validar o que foi concluído e ajustar o backlog |
| Retrospectiva | Quando houver mudanças significativas | 30 min | Identificar aprendizado e melhorias no processo |

---

## Fluxo de Status

| Status | Descrição | Quem move para cá |
|---|---|---|
| Backlog | Item registrado e aguardando priorização | PO / Desenvolvedor |
| Ready | Item refinado e pronto para desenvolvimento | Time / PO |
| In Progress | Em desenvolvimento | Desenvolvedor responsável |
| In Review | Revisão de código ou validação técnica | Desenvolvedor responsável |
| Done | Entrega concluída e validada | PO / Desenvolvedor |

---

## Definição de Pronto (Definition of Done)

- Código implementado e funcionando conforme o critério de aceite
- Testes manuais realizados na aplicação local
- Código revisado ou verificado pelo desenvolvedor responsável
- Documentação atualizada se houver impacto relevante
- Pull request criado e aprovado (quando aplicável)

---

## Acompanhamento e Monitoramento

**Responsável pelo acompanhamento:** Desenvolvedor ou responsável técnico do projeto

**Métricas acompanhadas:**

| Métrica | O que mede | Onde é acompanhada | Frequência |
|---|---|---|---|
| Progresso de tarefas | Quantidade de itens movidos para Done | Quadro GitHub / backlog | Contínuo |
| Lead Time | Tempo do item do backlog até Done | Estimativa manual | A cada release |
| Qualidade | Defeitos identificados durante testes | Revisão de código | A cada entrega |

**Reporte para stakeholders:** Demonstração local ou gravação de produto e atualização do backlog sempre que houver entrega significativa.
