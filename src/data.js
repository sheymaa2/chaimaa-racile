// Toutes les infos du portfolio sont ici. Pour modifier un texte,
// change juste la valeur correspondante — pas besoin de toucher à App.jsx.

// Icône par compétence : badge coloré (couleur de marque) + glyphe — aucune dépendance externe
export const skillIcons = {
  Java: { bg: '#F58219', glyph: '☕' },
  C: { bg: '#5C6BC0', glyph: 'C' },
  JavaScript: { bg: '#F0DB4F', glyph: 'JS', dark: true },
  HTML: { bg: '#E44D26', glyph: '5' },
  CSS: { bg: '#2965F1', glyph: '3' },
  SQL: { bg: '#4479A1', glyph: '🗄️' },
  MySQL: { bg: '#00618A', glyph: '🐬' },
  UML: { bg: '#6F42C1', glyph: '📐' },
  Linux: { bg: '#1B1B1B', glyph: '🐧' },
  Docker: { bg: '#2496ED', glyph: '🐳' },
  'Git / GitHub': { bg: '#181717', glyph: '🔧' },
  Terraform: { bg: '#7B42BC', glyph: '🏗️' },
  'AWS Cloud': { bg: '#FF9900', glyph: '☁️' },
};

export const projectsMeta = [
  { id: 'p2', year: '2026', category: { label: 'DevOps', color: 'blue' }, tags: ['Linux', 'Docker', 'Terraform'], link: 'https://github.com/Lazaar200/TASK-FLOW-LINUX' },
  { id: 'p3', year: '2025', category: { label: 'Java', color: 'teal' }, tags: ['Java', 'Swing', 'Network Sockets'], link: 'https://github.com/farahbelaali03/projetJava-Whatsap' },
  { id: 'p1', year: '2024', category: { label: 'UML', color: 'purple' }, tags: ['UML', 'Architecture logicielle', 'Conception'], link: null },
  { id: 'p4', year: '2025', category: { label: 'C', color: 'orange' }, tags: ['C', 'Data Structures', 'Memory Management'], link: null },
];

// Catégorie de couleur pour chaque tag/compétence (cohérent sur les deux thèmes)
export const tagColors = {
  'UML': 'purple', 'Architecture logicielle': 'purple', 'Conception': 'purple',
  'Linux': 'blue', 'Docker': 'blue', 'Terraform': 'blue', 'Git / GitHub': 'blue', 'AWS Cloud': 'blue',
  'Java': 'orange', 'C': 'orange', 'Data Structures': 'orange', 'Memory Management': 'orange',
  'Swing': 'teal', 'Network Sockets': 'teal', 'HTML': 'teal', 'CSS': 'teal', 'JavaScript': 'teal', 'SQL': 'teal',
};
export const colorFor = (tag) => tagColors[tag] || 'purple';

export const social = {
  github: 'https://github.com/sheymaa2',
  linkedin: 'https://www.linkedin.com/in/chaimaa-racile-647739263/',
  email: 'racile.chaimaa@gmail.com',
  phone: '+212 6 36 46 07 48',
};

export const translations = {
  fr: {
    nav: { about: 'À propos', formation: 'Formation', skills: 'Compétences', languages: 'Langues', projects: 'Projets', experience: 'Expérience', certifications: 'Certifications', contact: 'Contact' },
    hero: {
      available: "À la recherche d'un stage à partir de mi-juin 2027",
      kicker: 'ÉLÈVE INGÉNIEURE — GÉNIE LOGICIEL',
      title: 'Transformer des problèmes complexes en solutions logicielles simples et fiables.',
      bio: "Actuellement en 4ᵉ année à l'ENSA Tétouan, je m'intéresse à la conception de systèmes robustes, à l'architecture logicielle et au développement web. Rigoureuse et motivée, je recherche un stage PFA en ingénierie logicielle pour contribuer à des projets techniques concrets et développer mon expertise au sein d'une équipe professionnelle.",
      cta: 'Voir mes projets',
      cv: 'CV bientôt disponible',
    },
    stats: [
      { n: '4+', label: 'Projets' },
      { n: '13+', label: 'Compétences techniques' },
      { n: '4', label: 'Langues parlées' },
    ],
    about: {
      heading: 'À propos',
      text: "Curieuse et persévérante, je cherche à comprendre en profondeur avant de construire : pourquoi un système est conçu ainsi, quelles contraintes il doit respecter, comment le rendre évolutif. C'est cette approche que j'apporte à chaque projet, qu'il s'agisse de modélisation, de développement ou de résolution de problèmes techniques.",
      formationLabel: 'Formation',
      formationValue: 'ENSA Tétouan — Génie Logiciel, 4ᵉ année',
      locationLabel: 'Localisation',
      locationValue: 'Tétouan, Maroc',
    },
    formation: {
      heading: 'Formation',
      when: 'En cours',
      title: 'École Nationale des Sciences Appliquées de Tétouan',
      desc: 'Cycle Ingénieur — Génie Logiciel, 4ᵉ année. Modélisation orientée objet, méthodologies de génie logiciel, bases de données, réseaux et sécurité informatique.',
    },
    skills: {
      heading: 'Compétences & Technologies',
      groups: [
        { name: 'Langages', items: ['C', 'Java', 'JavaScript'] },
        { name: 'Web & Bases de données', items: ['HTML', 'CSS', 'SQL', 'MySQL'] },
        { name: 'Outils & Méthodes', items: ['Linux', 'Git / GitHub', 'UML', 'AWS Cloud', 'Docker', 'Terraform'] },
      ],
    },
    languages: {
      heading: 'Langues',
      items: [
        { name: 'Arabe', level: 'Maternelle' },
        { name: 'Français', level: 'B2' },
        { name: 'Anglais', level: 'B2' },
        { name: 'Espagnol', level: 'A1' },
      ],
    },
    projects: {
      heading: 'Projets',
      items: {
        p1: { title: 'Gestion des Crises et Catastrophes', subtitle: 'Modélisation UML', desc: "Modélisation de l'architecture d'un système critique — projet réalisé en binôme dans le cadre du module UML.", bullets: ["Diagrammes de cas d'usage", 'Diagrammes de classes', 'Diagrammes de séquence'], action: '' },
        p2: { title: 'TaskFlow', subtitle: 'Gestion de tâches', desc: "Application modulaire de gestion de tâches, développée en binôme pour l'infrastructure et le déploiement.", bullets: ['Infrastructure Linux', 'Conteneurisation Docker', 'Déploiement avec Terraform'], action: 'Voir le code' },
        p3: { title: 'Application WhatsApp', subtitle: 'Messagerie temps réel', desc: 'Messagerie en temps réel développée en binôme dans le cadre du module Java.', bullets: ['Messagerie en temps réel', 'Sockets réseau', 'Interface Java Swing'], action: 'Voir le code' },
        p4: { title: 'Simulation de Supermarché', subtitle: 'Simulation en C', desc: 'Simulation transactionnelle en C — projet du module Programmation C.', bullets: ['Simulation transactionnelle', 'Structures de données', 'Gestion mémoire optimisée'], action: '' },
      },
    },
    experience: { heading: 'Expérience', empty: 'Section en préparation — stages, jobs étudiants ou vie associative viendront ici dès que le détail est prêt.' },
    certifications: { heading: 'Certifications', empty: 'Section en préparation — les certifications (AWS, Coursera, etc.) viendront ici.' },
    contact: {
      heading: 'Contact',
      intro: "Une offre de stage, un projet ou une simple question ? N'hésitez pas à m'écrire.",
      emailLabel: 'Email', phoneLabel: 'Téléphone', locationLabel: 'Localisation',
      form: { name: 'Votre nom', email: 'Votre email', subject: 'Sujet', message: 'Votre message', send: 'Envoyer', sent: 'Merci ! Votre message a bien été envoyé, je vous répondrai rapidement.', error: "L'envoi a échoué. Contactez-moi directement à" },
    },
    footer: { role: 'Élève ingénieure en Génie Logiciel', rights: 'Tous droits réservés.' },
  },
  en: {
    nav: { about: 'About', formation: 'Education', skills: 'Skills', languages: 'Languages', projects: 'Projects', experience: 'Experience', certifications: 'Certifications', contact: 'Contact' },
    hero: {
      available: 'Looking for an internship starting mid-June 2027',
      kicker: 'SOFTWARE ENGINEERING STUDENT',
      title: 'Turning complex problems into simple, reliable software solutions.',
      bio: "Currently in my 4th year at ENSA Tétouan, I'm interested in designing robust systems, software architecture and web development. Rigorous and driven, I'm looking for a final-year internship (PFA) in software engineering to contribute to real technical projects and grow my expertise within a professional team.",
      cta: 'See my projects',
      cv: 'CV coming soon',
    },
    stats: [
      { n: '4+', label: 'Projects' },
      { n: '13+', label: 'Technical skills' },
      { n: '4', label: 'Languages spoken' },
    ],
    about: {
      heading: 'About',
      text: "Curious and persistent, I like to understand things deeply before building them: why a system is designed a certain way, what constraints it needs to respect, how to make it scalable. That's the approach I bring to every project, whether it's modeling, development, or solving a technical problem.",
      formationLabel: 'Education',
      formationValue: 'ENSA Tétouan — Software Engineering, 4th year',
      locationLabel: 'Location',
      locationValue: 'Tétouan, Morocco',
    },
    formation: {
      heading: 'Education',
      when: 'Ongoing',
      title: 'National School of Applied Sciences of Tétouan',
      desc: 'Engineering degree — Software Engineering, 4th year. Object-oriented modeling, software engineering methodologies, databases, networks and information security.',
    },
    skills: {
      heading: 'Skills & Technologies',
      groups: [
        { name: 'Languages', items: ['C', 'Java', 'JavaScript'] },
        { name: 'Web & Databases', items: ['HTML', 'CSS', 'SQL', 'MySQL'] },
        { name: 'Tools & Methods', items: ['Linux', 'Git / GitHub', 'UML', 'AWS Cloud', 'Docker', 'Terraform'] },
      ],
    },
    languages: {
      heading: 'Languages',
      items: [
        { name: 'Arabic', level: 'Native' },
        { name: 'French', level: 'B2' },
        { name: 'English', level: 'B2' },
        { name: 'Spanish', level: 'A1' },
      ],
    },
    projects: {
      heading: 'Projects',
      items: {
        p1: { title: 'Crisis & Disaster Management', subtitle: 'UML Modeling', desc: 'Modeled the architecture of a critical system — pair project for the UML module.', bullets: ['Use case diagrams', 'Class diagrams', 'Sequence diagrams'], action: '' },
        p2: { title: 'TaskFlow', subtitle: 'Task Management', desc: 'Modular task management application, built in a pair project for infrastructure and deployment.', bullets: ['Linux infrastructure', 'Docker containerization', 'Terraform deployment'], action: 'View code' },
        p3: { title: 'WhatsApp Application', subtitle: 'Real-time Messaging', desc: 'Real-time messaging app built in a pair project for the Java module.', bullets: ['Real-time messaging', 'Network sockets', 'Java Swing interface'], action: 'View code' },
        p4: { title: 'Supermarket Simulation', subtitle: 'C Simulation', desc: 'Transactional simulation in C — project for the C programming module.', bullets: ['Transactional simulation', 'Data structures', 'Optimized memory management'], action: '' },
      },
    },
    experience: { heading: 'Experience', empty: 'Section in progress — internships, student jobs or club activities will go here once ready.' },
    certifications: { heading: 'Certifications', empty: 'Section in progress — certifications (AWS, Coursera, etc.) will go here.' },
    contact: {
      heading: 'Contact',
      intro: "An internship opportunity, a project or just a question? Feel free to reach out.",
      emailLabel: 'Email', phoneLabel: 'Phone', locationLabel: 'Location',
      form: { name: 'Your name', email: 'Your email', subject: 'Subject', message: 'Your message', send: 'Send', sent: "Thank you! Your message has been sent, I'll get back to you soon.", error: 'Sending failed. Reach me directly at' },
    },
    footer: { role: 'Software Engineering Student', rights: 'All rights reserved.' },
  },
};