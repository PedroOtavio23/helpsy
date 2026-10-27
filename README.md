# Helpsy — Psicologia Escolar

Protótipo de plataforma que aproxima estudantes de profissionais de psicologia e facilita o agendamento de consultas gratuitas.

Site: https://pedrootavio23.github.io/helpsy/

## O que dá para fazer
- **Aluno:** criar conta (com dados do responsável para menores), entrar/sair, buscar psicólogos por nome, tema, modalidade e período, agendar, remarcar, cancelar, adicionar a consulta ao Google Agenda ou ao celular (.ics), ver avisos, editar conta, baixar ou excluir seus dados.
- **Psicólogo:** ver consultas futuras e observações do aluno, marcar como realizada/falta, bloquear e liberar horários.
- **Painel administrativo separado** (`admin.html`, link "Área administrativa" no rodapé): visão geral com gráficos, aprovar/recusar cadastros definindo a agenda inicial, suspender/reativar profissionais, ver e cancelar consultas, lista de alunos, avisos, registro de ações e exportação em CSV.
  Acesso de demonstração: `admin@helpsy.com` / `helpsy2026`.
- **Assistente virtual:** sugere profissionais com horários clicáveis e orienta para CVV (188) / SAMU (192) em situações de crise.
- Funciona como app (pode ser instalado no celular) e abre mesmo sem internet.

Os dados ficam salvos apenas no navegador (localStorage). Profissionais e horários são fictícios. Use a barra "Modo demonstração" para alternar entre Visitante, Aluno e Psicólogo.

Arquivos: `index.html` (site), `admin.html` (painel), `data.js` (dados compartilhados), `sw.js` e `manifest.webmanifest` (app/offline), `assets/` (logo e ícones).
