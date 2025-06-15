const postsData = [
  {
    id: 1,
    country: 'United States of America',
    url: 'https://www.instagram.com/p/US_SAMPLE/',
    thumbnail: 'https://via.placeholder.com/150',
    caption: 'Amazing view from the US',
    type: 'image'
  },
  {
    id: 2,
    country: 'France',
    url: 'https://www.instagram.com/p/FR_SAMPLE/',
    thumbnail: 'https://via.placeholder.com/150',
    caption: 'Bonjour from France',
    type: 'image'
  },
  {
    id: 3,
    country: 'Japan',
    url: 'https://www.instagram.com/p/JP_SAMPLE/',
    thumbnail: 'https://via.placeholder.com/150',
    caption: 'Greetings from Japan',
    type: 'image'
  },
  {
    id: 4,
    country: 'United States of America',
    url: 'https://www.instagram.com/p/US_SAMPLE2/',
    thumbnail: 'https://via.placeholder.com/150',
    caption: 'Another shot from the US',
    type: 'image'
  }
];

function getPostsByCountry(name) {
  return postsData.filter(p => p.country === name);
}
