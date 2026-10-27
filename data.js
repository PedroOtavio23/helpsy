// Dados, planos e regras compartilhados entre o site (index.html) e o painel (admin.html).
// Tudo fica salvo apenas no navegador (localStorage) — é um protótipo, sem cobrança real.
(function () {
  "use strict";
  const BASE_PROFESSIONALS = [
    { id: 1, title: "Dra.", name: "Marina Teixeira", crp: "CRP demonstrativo 00/00001", training: "Terapia Cognitivo-Comportamental", areas: ["Ansiedade", "Estresse escolar"], modes: ["online"], location: "", bio: "Acompanho estudantes que sentem pressão com provas, notas e escolhas, com escuta acolhedora e sem julgamentos.", days: [1,2,3,4,5], times: ["09:00","10:00","14:00","15:00"], plan: "premium", since: "2026-03-02" },
    { id: 2, title: "Dr.", name: "Rafael Almeida", crp: "CRP demonstrativo 00/00002", training: "Orientação profissional", areas: ["Orientação vocacional", "Atenção e estudos"], modes: ["presencial"], location: "Centro (local demonstrativo)", bio: "Ajudo adolescentes a organizar interesses, rotina de estudos e decisões sobre curso e carreira.", days: [1,3,5], times: ["13:00","14:00","15:00","16:00"], plan: "inicial", since: "2026-08-14" },
    { id: 3, title: "Dra.", name: "Beatriz Nogueira", crp: "CRP demonstrativo 00/00003", training: "Psicologia Clínica", areas: ["Luto", "Autoestima"], modes: ["online","presencial"], location: "Zona Sul (local demonstrativo)", bio: "Atendimento acolhedor para quem passou por perdas ou está buscando apoio para lidar com mudanças.", days: [2,4], times: ["18:00","19:00","20:00"], plan: "plus", since: "2026-05-20" },
    { id: 4, title: "Dr.", name: "Caio Mendes", crp: "CRP demonstrativo 00/00004", training: "Neuropsicologia", areas: ["Atenção e estudos", "Estresse escolar"], modes: ["online"], location: "", bio: "Foco em concentração, organização e rotina de estudos, respeitando o ritmo de cada pessoa.", days: [1,2,3,4,5], times: ["08:00","09:00","10:00","11:00"], plan: "inicial", since: "2026-09-01" },
    { id: 5, title: "Dra.", name: "Larissa Prado", crp: "CRP demonstrativo 00/00005", training: "Psicologia Escolar", areas: ["Bullying e convivência", "Autoestima"], modes: ["online"], location: "", bio: "Apoio para questões de convivência escolar, amizades e situações de bullying.", days: [2,3,4], times: ["15:00","16:00","17:00","18:00"], plan: "plus", since: "2026-06-11" },
    { id: 6, title: "Dra.", name: "Helena Ribeiro", crp: "CRP demonstrativo 00/00006", training: "Psicologia de crianças e adolescentes", areas: ["Ansiedade", "Bullying e convivência"], modes: ["presencial"], location: "Centro (local demonstrativo)", bio: "Atendimento de crianças e adolescentes, com participação de responsáveis quando necessário.", days: [1,2,4], times: ["08:00","09:00","10:00"], plan: "inicial", since: "2026-07-07" }
  ];
  const AREAS = ["Ansiedade","Autoestima","Atenção e estudos","Bullying e convivência","Estresse escolar","Luto","Orientação vocacional"];

  // Planos dos pacientes: quantidade fixa de consultas por mês. Não há compra de consultas avulsas;
  // para ter mais consultas, o paciente muda para um plano superior. Consultas não usadas não acumulam.
  const PATIENT_PLANS = [
    { id: "free",        name: "Helpsy Free",         price: 0,     quota: 2,  desc: "Acesso inicial à plataforma, busca de profissionais e agendamento." },
    { id: "basic",       name: "Helpsy Basic",        price: 29.90, quota: 4,  desc: "Mais atendimentos e acesso aos recursos essenciais da plataforma." },
    { id: "plus",        name: "Helpsy Plus",         price: 49.90, quota: 8,  desc: "Para quem deseja mais flexibilidade na frequência dos atendimentos." },
    { id: "premium",     name: "Helpsy Premium",      price: 79.90, quota: 12, desc: "Mais consultas para quem busca acompanhamento frequente, conforme a necessidade clínica.", featured: true },
    { id: "premiumplus", name: "Helpsy Premium Plus", price: 199.90, quota: 24, desc: "A maior quantidade de consultas disponibilizada pelos planos do Helpsy." }
  ];
  // Planos dos psicólogos: todos pagam para participar. Não alteram as consultas dos pacientes.
  const PRO_PLANS = [
    { id: "inicial", name: "Psicólogo Inicial", price: 29.90, features: ["Perfil profissional verificado", "Agenda digital", "Gerenciamento básico dos agendamentos"] },
    { id: "plus",    name: "Psicólogo Plus",    price: 49.90, features: ["Tudo do Inicial", "Recursos de gestão adicionais", "Relatórios administrativos", "Organização avançada da agenda"] },
    { id: "premium", name: "Psicólogo Premium", price: 79.90, features: ["Tudo do Plus", "Recursos avançados de gestão", "Personalização do perfil", "Indicadores de ocupação da agenda"] }
  ];
  const LATE_CANCEL_HOURS = 24;

  const STORE_KEY = "helpsy:v3";
  const freshData = () => ({
    users: [], session: null, bookings: [], blocked: [], notifications: [], payments: [],
    pending: [
      { name: "Paulo Siqueira", crp: "CRP demonstrativo 00/00007", email: "paulo@exemplo.com", training: "Psicologia Escolar", areas: ["Estresse escolar"], modes: ["online"], bio: "Atendimento focado em adaptação escolar e rotina de estudos.", plan: "inicial", date: "21/10/2026" },
      { name: "Joana Farias", crp: "CRP demonstrativo 00/00008", email: "joana@exemplo.com", training: "Psicologia Clínica", areas: ["Autoestima", "Ansiedade"], modes: ["online", "presencial"], bio: "Escuta acolhedora para adolescentes que enfrentam inseguranças.", plan: "plus", date: "22/10/2026" }
    ],
    extraPros: [], hiddenPros: [], proPlans: {}, audit: [], nextId: 100
  });

  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return Object.assign(freshData(), JSON.parse(raw));
    } catch (err) { /* armazenamento indisponível */ }
    return freshData();
  }
  function save(db) { try { localStorage.setItem(STORE_KEY, JSON.stringify(db)); } catch (err) { /* ignora */ } }
  function allPros(db, includeHidden) {
    const hidden = db.hiddenPros || [];
    const overrides = db.proPlans || {};
    return BASE_PROFESSIONALS.concat(db.extraPros || [])
      .map((p) => overrides[p.id] ? Object.assign({}, p, { plan: overrides[p.id] }) : p)
      .filter((p) => includeHidden || !hidden.includes(p.id));
  }
  async function hash(text) {
    try {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch (err) { return "plain:" + btoa(unescape(encodeURIComponent(text))); }
  }

  /* ---- Planos e créditos ---- */
  const patientPlan = (id) => PATIENT_PLANS.find((p) => p.id === id) || PATIENT_PLANS[0];
  const proPlan = (id) => PRO_PLANS.find((p) => p.id === id) || PRO_PLANS[0];
  const brl = (v) => v === 0 ? "R$ 0" : "R$ " + v.toFixed(2).replace(".", ",");
  const monthKey = (iso) => iso.slice(0, 7); // "2026-10"
  const monthName = (ym) => { const [y, m] = ym.split("-").map(Number); return new Date(y, m - 1, 1).toLocaleDateString("pt-BR", { month: "long" }); };
  const userPlanId = (db, email) => { const u = (db.users || []).find((x) => x.email === email); return u ? u.plan || "free" : "free"; };
  // Uma consulta conta no mês da data do atendimento. Cancelamento com antecedência devolve a consulta;
  // cancelamento tardio (menos de 24h) e falta contam como usadas.
  const counts = (b) => b.status === "confirmada" || b.status === "realizada" || b.status === "falta" || (b.status === "cancelada" && b.late);
  function usedInMonth(db, email, ym) { return (db.bookings || []).filter((b) => b.studentEmail === email && monthKey(b.date) === ym && counts(b)).length; }
  function creditsLeft(db, email, ym) { return Math.max(0, patientPlan(userPlanId(db, email)).quota - usedInMonth(db, email, ym)); }
  function mrr(db) {
    const patients = (db.users || []).reduce((s, u) => s + patientPlan(u.plan).price, 0);
    const pros = allPros(db, false).reduce((s, p) => s + proPlan(p.plan).price, 0);
    return { patients, pros, total: patients + pros };
  }

  window.Helpsy = { BASE_PROFESSIONALS, AREAS, PATIENT_PLANS, PRO_PLANS, LATE_CANCEL_HOURS, STORE_KEY, freshData, load, save, allPros, hash,
    patientPlan, proPlan, brl, monthKey, monthName, userPlanId, counts, usedInMonth, creditsLeft, mrr };
})();
