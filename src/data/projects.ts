import flipzonImg from '../assets/flipzon_mockup.webp';
import flipzonAvif from '../assets/flipzon_mockup.avif';
import cryptochatImg from '../assets/cryptochat_mockup.webp';
import cryptochatAvif from '../assets/cryptochat_mockup.avif';
import kia3dImg from '../assets/kia3d_mockup.webp';
import kia3dAvif from '../assets/kia3d_mockup.avif';
import purpleMovementImg from '../assets/purple_movement_mockup.webp';
import purpleMovementAvif from '../assets/purple_movement_mockup.avif';
import beyondSyllabusImg from '../assets/beyondsyllabus_mockup.webp';
import beyondSyllabusAvif from '../assets/beyondsyllabus_mockup.avif';
import darknetraImg from '../assets/darknetra_mockup.webp';
import darknetraAvif from '../assets/darknetra_mockup.avif';
import dinodashImg from '../assets/dino.webp';
import dinodashAvif from '../assets/dino.avif';
import mileageUndoImg from '../assets/mileageundo.webp';
import mileageUndoAvif from '../assets/mileageundo.avif';
import mulearnsbcImg from '../assets/mulearnsbc.webp';
import mulearnsbcAvif from '../assets/mulearnsbc.avif';

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  imageAvif?: string;
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  isComingSoon?: boolean;
}

export const projects: Project[] = [
  {
    id: 'flipzon',
    title: 'FlipZon',
    category: 'Full-stack / E-Commerce',
    description: 'A modern e-commerce web platform featuring full catalog indexing, shopping cart state management, simulated secure checkout, and intuitive dashboard analytics.',
    image: flipzonImg,
    imageAvif: flipzonAvif,
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
    imageAvif: cryptochatAvif,
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
    imageAvif: purpleMovementAvif,
    tags: ['UX Research', 'Figma Prototyping', 'Design System', 'User Testing'],
    caseStudyUrl: 'https://sturdy-snail-3ee.notion.site/Purple-Movement-Website-35779bf218cc8018b325e7cca767c62a'
  },
  {
    id: 'beyondsyllabus',
    title: 'BeyondSyllabus',
    category: 'Web Platform / Community',
    description: 'A modern educational portal designed for peer resource sharing, study pathways navigation, and offline campus student event aggregation.',
    image: beyondSyllabusImg,
    imageAvif: beyondSyllabusAvif,
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Firebase'],
    liveUrl: 'https://beyondsyllabus.in'
  },
  {
    id: 'kia-3d',
    title: 'KIA 3D',
    category: 'Interactive WebGL / 3D',
    description: 'An immersive 3D automotive visualizer built for real-time concept inspection. Enables dynamic paint customization, interactive camera sweeps, and material detailing.',
    image: kia3dImg,
    imageAvif: kia3dAvif,
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
    imageAvif: darknetraAvif,
    tags: ['Cybersecurity', 'Machine Learning', 'React', 'FastAPI', 'Threat Detection', 'ML Classification', 'Web App'],
    githubUrl: 'https://github.com/3bin-05/Dark-netra-frontend',
    caseStudyUrl: 'https://sturdy-snail-3ee.notion.site/DarkNetra-URL-Malicious-Detection-System-35579bf218cc805789f3ef686bc4c85c?source=copy_link'
  },
  {
    id: 'dino-dash',
    title: 'Dino Dash',
    category: 'Game Dev / React',
    description: 'A modern 2D endless runner game featuring progressive difficulty, responsive controls, and a custom achievement & daily tasks system.',
    image: dinodashImg,
    imageAvif: dinodashAvif,
    tags: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Game Logic'],
    caseStudyUrl: 'https://sturdy-snail-3ee.notion.site/Dino-Dash-38d79bf218cc807fb7cccf69fd6ab1f0?source=copy_link',
    liveUrl: 'https://d-inodash.vercel.app'
  },
  {
    id: 'mileage-undo',
    title: 'Mileage UNDO',
    category: 'Web App / Intelligence',
    description: 'A community-driven mileage intelligence platform helping vehicle owners track, compare, and optimize fuel efficiency with real-world driving data.',
    image: mileageUndoImg,
    imageAvif: mileageUndoAvif,
    tags: ['React', 'Tailwind CSS', 'Interactive DB', 'Community Benchmarks'],
    caseStudyUrl: 'https://sturdy-snail-3ee.notion.site/Mileage-UNDO-37c79bf218cc805e83c3ce69880c380d?source=copy_link'
  },
  {
    id: 'mulearn-sbc',
    title: 'µLearn SBC',
    category: 'Web Platform / Community',
    description: 'An interactive campus community platform designed to foster peer learning, skill-tracking pathways, and student event collaboration.',
    image: mulearnsbcImg,
    imageAvif: mulearnsbcAvif,
    tags: ['React', 'Tailwind CSS', 'Vite', 'Community Platform'],
    caseStudyUrl: 'https://sturdy-snail-3ee.notion.site/Learn-SBC-Campus-Community-39579bf218cc80768331ff578e5466f7'
  },
  {
    id: 'coming-soon',
    title: 'Coming Soon',
    category: 'Upcoming',
    description: 'Currently developing new tools, web platforms, and interactive experiences. Stay tuned for what\'s next!',
    image: '',
    tags: ['React Native', 'Next.js', 'AI Integration', 'Creative Coding'],
    isComingSoon: true
  }
];

