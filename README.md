# Helpsy — Psicologia Escolar

Protótipo de plataforma que conecta pacientes a psicólogos verificados, com agendamento simples e planos mensais de consultas.

Site: https://pedrootavio23.github.io/helpsy/

## Planos
**Pacientes** — quantidade fixa de consultas por mês, sem compra avulsa e sem acúmulo:

| Plano | Consultas/mês | Preço |
|---|---|---|
| Helpsy Free | 2 | grátis |
| Helpsy Basic | 4 | R$ 29,90 |
| Helpsy Plus | 8 | R$ 49,90 |
| Helpsy Premium | 12 | R$ 79,90 |
| Helpsy Premium Plus | 24 | R$ 199,90 |

Para ter mais consultas, o paciente muda para um plano superior. Cancelamento com mais de 24h devolve a consulta ao saldo; cancelamento tardio ou falta conta como usada.

**Psicólogos** — todos pagam assinatura para participar (após verificação do CRP): Inicial R$ 29,90 · Plus R$ 49,90 · Premium R$ 79,90.

## O que dá para fazer
- **Paciente:** cadastro escolhendo o plano, busca por nome/tema/modalidade/período, agendamento usando o saldo do plano, remarcar, cancelar, adicionar à agenda (.ics / Google Agenda), "Meu plano" com uso do mês, troca de plano e histórico de pagamentos.
- **Psicólogo:** cadastro escolhendo o plano profissional, consultas futuras, marcar realizada/falta, bloquear horários, gerenciar assinatura e ver indicadores (Plus e Premium).
- **Painel administrativo** (`admin.html`, botão "Administrador" na barra de demonstração): visão geral, receita mensal estimada, pacientes e psicólogos por plano, pagamentos, aprovação de cadastros, suspensão de perfis, consultas, pacientes, avisos e registro de ações, com exportação em CSV.
- **Assistente virtual:** tira dúvidas sobre planos e saldo, sugere horários e orienta para CVV (188) / SAMU (192) em crises.

Tudo fica salvo apenas no navegador (localStorage). Profissionais, preços e pagamentos são de demonstração — nenhuma cobrança real é feita.

Arquivos: `index.html` (site), `admin.html` (painel), `data.js` (dados, planos e regras compartilhados), `sw.js` e `manifest.webmanifest` (app/offline), `assets/` (logo e ícones).
