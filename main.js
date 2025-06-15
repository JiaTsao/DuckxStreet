const worldUrl = 'https://unpkg.com/world-atlas@2/countries-110m.json';

const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select('#map-container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .attr('viewBox', `0 0 ${width} ${height}`);

const projection = d3.geoNaturalEarth1()
  .scale(width / 6.3)
  .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

fetch(worldUrl)
  .then(res => res.json())
  .then(worldData => {
    const countries = topojson.feature(worldData, worldData.objects.countries).features;

    svg.append('g')
      .selectAll('path')
      .data(countries)
      .enter().append('path')
      .attr('d', path)
      .attr('fill', '#333')
      .attr('stroke', '#111')
      .on('click', d => showCountryPosts(d));

    const markers = postsData.reduce((acc, post) => {
      acc[post.country] = true;
      return acc;
    }, {});

    svg.append('g')
      .selectAll('circle')
      .data(countries.filter(c => markers[c.properties.name]))
      .enter().append('circle')
      .attr('cx', d => path.centroid(d)[0])
      .attr('cy', d => path.centroid(d)[1])
      .attr('r', 5)
      .attr('fill', 'orange');
  });

function showCountryPosts(feature) {
  const name = feature.properties.name;
  const posts = getPostsByCountry(name);
  if (!posts.length) return;

  const modal = document.getElementById('modal');
  const title = document.getElementById('modal-title');
  const content = document.getElementById('modal-content');

  title.textContent = name;
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
