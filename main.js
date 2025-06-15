const worldUrl = 'https://unpkg.com/world-atlas@2/countries-110m.json';
const earthTexture = 'https://unpkg.com/three-globe/example/img/earth-dark.jpg';

const Globe = window.Globe; // from globe.gl CDN

const world = Globe()
  .globeImageUrl(earthTexture)
  .backgroundColor('#000')
  .showAtmosphere(true)
  .atmosphereColor('#3a228a')
  .atmosphereAltitude(0.25);

const container = document.getElementById('globe-container');
container.appendChild(world());

fetch(worldUrl)
  .then(res => res.json())
  .then(worldData => {
    const countries = window.topojson.feature(worldData, worldData.objects.countries).features;
    world
      .polygonsData(countries)
      .polygonCapColor(() => 'rgba(255, 255, 255, 0.1)')
      .polygonSideColor(() => 'rgba(0, 100, 0, 0.15)')
      .polygonStrokeColor(() => '#111')
      .onPolygonClick(country => showCountryPosts(country));

    // Add markers for countries with posts
    const markers = postsData.reduce((acc, post) => {
      acc[post.country] = true;
      return acc;
    }, {});
    const markerFeatures = countries.filter(c => markers[c.properties.name]);
    world
      .pointsData(markerFeatures)
      .pointAltitude(0.1)
      .pointColor(() => 'orange');
  });

function showCountryPosts(countryFeature) {
  const name = countryFeature.properties.name;
  const posts = getPostsByCountry(name);
  if (!posts.length) return;

  const modal = document.getElementById('modal');
  const title = document.getElementById('modal-title');
  const content = document.getElementById('modal-content');

  title.textContent = countryFeature.properties.name;
  content.innerHTML = '';
  posts.forEach(p => {
    const item = document.createElement('div');
    item.className = 'cursor-pointer';
    item.innerHTML = `
      <img src="${p.thumbnail}" alt="${p.caption}" class="w-full h-auto rounded" />
      <p class="mt-2 text-sm">${p.caption}</p>
    `;
    item.addEventListener('click', () => {
      window.open(p.url, '_blank');
    });
    content.appendChild(item);
  });

  modal.classList.remove('hidden');
}

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('modal').classList.add('hidden');
});
