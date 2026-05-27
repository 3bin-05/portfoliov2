import flipzonImg from '../assets/flipzon_mockup.png';
import cryptochatImg from '../assets/cryptochat_mockup.png';
import kia3dImg from '../assets/kia3d_mockup.png';
import purpleMovementImg from '../assets/purple_movement_mockup.png';
import beyondSyllabusImg from '../assets/beyondsyllabus_mockup.png';
import darknetraImg from '../assets/darknetra_mockup.png';


export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'flipzon',
    title: 'FlipZon',
    category: 'Full-stack / E-Commerce',
    description: 'A modern e-commerce web platform featuring full catalog indexing, shopping cart state management, simulated secure checkout, and intuitive dashboard analytics.',
    image: flipzonImg,
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    githubUrl: 'https://github.com/3bin-05/FlopZon',
    caseStudyUrl: 'https://sturdy-snail-3ee.notion.site/FlipZon-35579bf218cc80cca424fe9edb040a73?pvs=74'
  },
  {
    id: 'cryptochat',
    title: 'CryptoChat',
    category: 'Web Security / Messaging',
    description: 'An end-to-end encrypted messaging application with real-time delivery channels, secure user key exchanges, and customizable chat themes in high-contrast dark aesthetics.',
    image: cryptochatImg,
    tags: ['React', 'Socket.io', 'Node.js', 'Web Crypto API', 'Tailwind CSS'],
    githubUrl: 'https://github.com/3bin-05/CryptoChat',
    caseStudyUrl: 'https://sturdy-snail-3ee.notion.site/CryptoChat-35579bf218cc80b2a36ced0b1022c281'
  },
  {
    id: 'purple-movement',
    title: 'Purple Movement',
    category: 'UI/UX Design / Social Good',
    description: 'A complete product design case study mapping user journeys, low-fidelity wireframes, high-fidelity prototypes, and design systems for a community activism initiative.',
    image: purpleMovementImg,
    tags: ['UX Research', 'Figma Prototyping', 'Design System', 'User Testing'],
    caseStudyUrl: 'https://sturdy-snail-3ee.notion.site/Purple-Movement-Website-35779bf218cc8018b325e7cca767c62a'
  },
  {
    id: 'beyondsyllabus',
    title: 'BeyondSyllabus',
    category: 'Web Platform / Community',
    description: 'A modern educational portal designed for peer resource sharing, study pathways navigation, and offline campus student event aggregation.',
    image: beyondSyllabusImg,
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Firebase'],
    liveUrl: 'https://beyondsyllabus.in'
  },
  {
    id: 'kia-3d',
    title: 'KIA 3D',
    category: 'Interactive WebGL / 3D',
    description: 'An immersive 3D automotive visualizer built for real-time concept inspection. Enables dynamic paint customization, interactive camera sweeps, and material detailing.',
    image: kia3dImg,
    tags: ['Three.js', 'React Three Fiber', 'WebGL', 'Framer Motion'],
    githubUrl: 'https://github.com/3bin-05/Kia-seltos',
    caseStudyUrl: 'https://sturdy-snail-3ee.notion.site/KIA-Seltos-3D-Website-Interactive-Product-Experience-35779bf218cc8091a529c29f8921de63'
  },
  {
    id: 'darknetra',
    title: 'DarkNetra',
    category: 'Cybersecurity / Machine Learning',
    description: 'An intelligent security platform for malicious URL classification. Utilizes machine learning to analyze, predict, and block phishing threats in real-time, complete with threat telemetry dashboards.',
    image: darknetraImg,
    tags: ['Cybersecurity', 'Machine Learning', 'React', 'FastAPI', 'Threat Detection', 'ML Classification', 'Web App'],
    githubUrl: 'https://github.com/3bin-05/Dark-netra-frontend',
    caseStudyUrl: 'https://sturdy-snail-3ee.notion.site/DarkNetra-URL-Malicious-Detection-System-35579bf218cc805789f3ef686bc4c85c?source=copy_link'
  }
];

