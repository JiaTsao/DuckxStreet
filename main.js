let postsByCountry = {};
let countryFeatures = [];

async function loadData() {
  const [posts, countries] = await Promise.all([
    fetch('data.json').then(r => r.json()),
    fetch('https://unpkg.com/three-globe/example/datasets/ne_110m_admin_0_countries.geojson').then(r => r.json())
  ]);

  posts.forEach(p => {
    if (!postsByCountry[p.countryCode]) postsByCountry[p.countryCode] = [];
    postsByCountry[p.countryCode].push(p);
  });

  countryFeatures = countries.features;
  initGlobe();
}

function initGlobe() {
  const gData = countryFeatures;

  const globe = Globe()
    (document.getElementById('globe-container'))
    .globeImageUrl('https://unpkg.com/three-globe/example/img/earth-dark.jpg')
    .backgroundColor('#000000')
    .polygonsData(gData)
    .polygonAltitude(0.06)
    .polygonCapColor(feat => postsByCountry[feat.properties.ISO_A2] ? 'rgba(255,165,0,0.8)' : 'rgba(200,200,200,0.2)')
    .polygonSideColor(() => 'rgba(0,100,0,0.15)')
    .onPolygonClick(feat => {
      const code = feat.properties.ISO_A2;
      if (postsByCountry[code]) {
        openModal(feat.properties.NAME, postsByCountry[code]);
      }
    });

  const markers = gData
    .filter(f => postsByCountry[f.properties.ISO_A2])
    .map(f => {
      const [lng, lat] = d3.geoCentroid(f);
      return { lat, lng, code: f.properties.ISO_A2 };
    });

  globe.pointsData(markers)
    .pointAltitude(0.1)
    .pointRadius(0.25)
    .pointColor(() => 'orange')
    .onPointClick(pt => {
      const feat = gData.find(f => f.properties.ISO_A2 === pt.code);
      if (feat) openModal(feat.properties.NAME, postsByCountry[pt.code]);
    });
}

loadData();
