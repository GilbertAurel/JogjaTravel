import IMAGE from '../images';

const priceRating = {
  affordable: 1,
  fair: 2,
  expensive: 3,
};

export const popular = [
  {
    id: 1,
    category: ['keraton'],
    title: 'Alun Alun',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, nobis.',
    image: IMAGE.alun,
    rating: 3.5,
    priceRating: priceRating.affordable,
  },
  {
    id: 2,
    category: ['keraton', 'shopping'],
    title: 'Malioboro',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, nobis.',
    image: IMAGE.malioboro,
    rating: 4.0,
    priceRating: priceRating.affordable,
  },
  {
    id: 3,
    category: ['nature'],
    title: 'Indrayanti Beach',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, nobis.',
    image: IMAGE.indrayanti,
    rating: 4.8,
    priceRating: priceRating.affordable,
  },
  {
    id: 4,
    category: ['culinary'],
    title: 'Tempo Gelato',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, nobis.',
    image: IMAGE.tempoGelato,
    rating: 4.5,
    priceRating: priceRating.expensive,
  },
  {
    id: 5,
    category: ['arts'],
    title: 'Jogja National Museum',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, nobis.',
    image: IMAGE.jnm,
    rating: 3.8,
    priceRating: priceRating.fair,
  },
  {
    id: 6,
    category: ['shopping', 'culinary'],
    title: 'Bakpia Tugu',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, nobis.',
    image: IMAGE.bakpiaTugu,
    rating: 4.8,
    priceRating: priceRating.fair,
  },
  {
    id: 7,
    category: ['nature'],
    title: 'Merapi Volcano Tour',
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolor, nobis.',
    image: IMAGE.merapiTour,
    rating: 4.5,
    priceRating: priceRating.expensive,
  },
];

export default popular;
