// Dados e armazenamento compartilhados entre o site (index.html) e o painel (admin.html).
// Tudo fica salvo apenas no navegador (localStorage) — é um protótipo.
(function () {
  "use strict";
  const BASE_PROFESSIONALS = [
    { id: 1, title: "Dra.", name: "Marina Teixeira", crp: "CRP demonstrativo 00/00001", training: "Terapia Cognitivo-Comportamental", areas: ["Ansiedade", "Estresse escolar"], modes: ["online"], location: "", bio: "Acompanho estudantes que sentem pressão com provas, notas e escolhas, com escuta acolhedora e sem julgamentos.", days: [1,2,3,4,5], times: ["09:00","10:00","14:00","15:00"] },
    { id: 2, title: "Dr.", name: "Rafael Almeida", crp: "CRP demonstrativo 00/00002", training: "Orientação profissional", areas: ["Orientação vocacional", "Atenção e estudos"], modes: ["presencial"], location: "Centro (local demonstrativo)", bio: "Ajudo adolescentes a organizar interesses, rotina de estudos e decisões sobre curso e carreira.", days: [1,3,5], times: ["13:00","14:00","15:00","16:00"] },
    { id: 3, title: "Dra.", name: "Beatriz Nogueira", crp: "CRP demonstrativo 00/00003", training: "Psicologia Clínica", areas: ["Luto", "Autoestima"], modes: ["online","presencial"], location: "Zona Sul (local demonstrativo)", bio: "Atendimento acolhedor para quem passou por perdas ou está buscando apoio para lidar com mudanças.", days: [2,4], times: ["18:00","19:00","20:00"] },
    { id: 4, title: "Dr.", name: "Caio Mendes", crp: "CRP demonstrativo 00/00004", training: "Neuropsicologia", areas: ["Atenção e estudos", "Estresse escolar"], modes: ["online"], location: "", bio: "Foco em concentração, organização e rotina de estudos, respeitando o ritmo de cada pessoa.", days: [1,2,3,4,5], times: ["08:00","09:00","10:00","11:00"] },
    { id: 5, title: "Dra.", name: "Larissa Prado", crp: "CRP demonstrativo 00/00005", training: "Psicologia Escolar", areas: ["Bullying e convivência", "Autoestima"], modes: ["online"], location: "", bio: "Apoio para questões de convivência escolar, amizades e situações de bullying.", days: [2,3,4], times: ["15:00","16:00","17:00","18:00"] },
    { id: 6, title: "Dra.", name: "Helena Ribeiro", crp: "CRP demonstrativo 00/00006", training: "Psicologia de crianças e adolescentes", areas: ["Ansiedade", "Bullying e convivência"], modes: ["presencial"], location: "Centro (local demonstrativo)", bio: "Atendimento de crianças e adolescentes, com participação de responsáveis quando necessário.", days: [1,2,4], times: ["08:00","09:00","10:00"] }
  ];
  const AREAS = ["Ansiedade","Autoestima","Atenção e estudos","Bullying e convivência","Estresse escolar","Luto","Orientação vocacional"];
  const STORE_KEY = "helpsy:v2";
  const freshData = () => ({
    users: [], session: null, bookings: [], blocked: [], notifications: [],
    pending: [
      { name: "Paulo Siqueira", crp: "CRP demonstrativo 00/00007", email: "paulo@exemplo.com", training: "Psicologia Escolar", areas: ["Estresse escolar"], bio: "Atendimento focado em adaptação escolar e rotina de estudos.", date: "21/10/2026" },
      { name: "Joana Farias", crp: "CRP demonstrativo 00/00008", email: "joana@exemplo.com", training: "Psicologia Clínica", areas: ["Autoestima", "Ansiedade"], bio: "Escuta acolhedora para adolescentes que enfrentam inseguranças.", date: "22/10/2026" }
    ],
    extraPros: [], hiddenPros: [], audit: [], nextId: 100
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
    return BASE_PROFESSIONALS.concat(db.extraPros || []).filter((p) => includeHidden || !hidden.includes(p.id));
  }
  async function hash(text) {
    try {
      const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
      return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
    } catch (err) { return "plain:" + btoa(unescape(encodeURIComponent(text))); }
  }

  window.Helpsy = { BASE_PROFESSIONALS, AREAS, STORE_KEY, freshData, load, save, allPros, hash };
})();
