// Content for the "Discover Yuva Krushi" cards and the detail panel each card
// opens. Card descriptions are stored line by line (one string per line) so
// wide screens break them exactly as in the design.
//
// Every detail panel uses the same layout: a header with the topic emoji, then
// a main card (heading + paragraphs) and a side card (heading + intro + a
// checklist). `icon` picks the icon tile shown beside each card heading.

const topics = [
  {
    id: 'what',
    icon: '🌱',
    label: '01 / What',
    title: 'What is Yuva Krushi?',
    description: ['Understand the vision behind helping', 'young people explore agriculture and', 'agripreneurship.'],
    action: 'Explore this topic',
    detail: {
      subtitle: 'A starting point for young people who want to create value through agriculture.',
      main: {
        icon: 'target',
        heading: 'A pathway from knowledge to opportunity',
        paragraphs: [
          'Yuva Krushi is a pathway for young professionals to become agripreneurs by turning their knowledge, skills and entrepreneurial potential into viable agri-business opportunities.',
          'It encourages young people to see agriculture as a space for innovation — from farm-level solutions to technology, processing, services, logistics and market access.',
        ],
      },
      aside: {
        icon: 'bulb',
        heading: 'What this can look like',
        intro: 'Explore a problem, learn about the sector, develop your idea and identify the next steps to test it.',
        items: ['Discover agriculture opportunities', 'Build relevant skills and knowledge', 'Shape an idea into a clear plan'],
      },
    },
  },
  {
    id: 'why',
    icon: '🚀',
    label: '02 / Why',
    title: 'Why Yuva Krushi?',
    description: ['See why youth, new skills and fresh', 'ideas can create value across the', 'agri ecosystem.'],
    action: 'Discover the purpose',
    detail: {
      subtitle: 'Because agriculture needs new perspectives, practical skills and enterprising minds.',
      main: {
        icon: 'trend',
        heading: 'Turn emerging challenges into opportunities',
        paragraphs: [
          'Agriculture is evolving through digital tools, changing consumer needs, new value chains and more efficient ways to produce and move food. Young people can contribute fresh thinking and new capabilities.',
          'Yuva Krushi can help aspiring agripreneurs explore this evolving ecosystem and think about solutions that create value for farmers, businesses and communities.',
        ],
      },
      aside: {
        icon: 'star',
        heading: 'Why it matters',
        intro:
          'A structured starting point can help you move from “I have an idea” to understanding the problem, people, skills and resources involved.',
        items: [
          'Explore real-world agricultural needs',
          'Think creatively and entrepreneurially',
          'Find a practical direction for your next step',
        ],
      },
    },
  },
  {
    id: 'for-me',
    icon: '✨',
    label: '03 / For me',
    title: 'What’s in it for me?',
    description: ['Explore how your interests and ideas', 'could become a practical next step', 'in agriculture.'],
    action: 'See your possibilities',
    detail: {
      subtitle: 'A chance to connect your interests with meaningful possibilities in agriculture.',
      main: {
        icon: 'puzzle',
        heading: 'Find where your skills and interests fit',
        paragraphs: [
          'Whether you enjoy technology, business, farming, design, marketing or problem-solving, there are many roles and business ideas across the agricultural value chain to explore.',
          'Use your interests to identify a focus area, understand what you need to learn, and start shaping an idea that responds to a real need. Specific training, funding or placement benefits depend on the programmes made available.',
        ],
      },
      aside: {
        icon: 'signpost',
        heading: 'Your possible next steps',
        intro: 'Start with curiosity. Choose a focus area, map what you need to learn, and develop a small, testable idea.',
        items: [
          'Explore career and business pathways',
          'Identify skills and learning priorities',
          'Develop an idea with real-world relevance',
        ],
      },
    },
  },
]

export default topics
