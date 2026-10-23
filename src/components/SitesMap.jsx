import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map as MapIcon } from 'lucide-react';
import Panel, { ViewAllButton } from './Panel.jsx';
import { mapCenter, mapSites } from '../data/mockData.js';

const makeIcon = (site) =>
  L.divIcon({
    className: 'site-marker',
    html: `
      <div class="site-marker__wrap">
        <span class="site-marker__label">${site.name}</span>
        <span class="site-marker__pin" style="--pin:${site.color}"><i></i></span>
      </div>`,
    iconSize: [0, 0],
    iconAnchor: [0, 0],
  });

export default function SitesMap() {
  const containerRef = useRef(null);
  const [tilesFailed, setTilesFailed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    const map = L.map(el, {
      center: [mapCenter.lat, mapCenter.lng],
      zoom: mapCenter.zoom,
      zoomControl: false,
      scrollWheelZoom: false,
      attributionControl: true,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    });
    tiles.on('tileerror', () => setTilesFailed(true));
    tiles.on('tileload', () => setTilesFailed(false));
    tiles.addTo(map);

    const bounds = [];
    mapSites.forEach((site) => {
      const marker = L.marker([site.lat, site.lng], { icon: makeIcon(site), title: site.name }).addTo(map);
      marker.bindPopup(
        `<strong>${site.name}</strong><br/>Manchester<br/>${site.guards} guards · ${site.status}`,
        { offset: [0, -26] },
      );
      bounds.push([site.lat, site.lng]);
    });
    map.fitBounds(bounds, { padding: [48, 48], maxZoom: 15 });

    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(el);

    return () => {
      observer.disconnect();
      map.remove();
    };
  }, []);

  return (
    <Panel icon={MapIcon} title="Sites Map" action={<ViewAllButton />}>
      <div className="map-wrap">
        <div className="map" ref={containerRef} role="region" aria-label="Map of Manchester sites" />
        {tilesFailed && (
          <p className="map-fallback" role="status">
            Map tiles are unavailable offline. Showing a schematic view.
          </p>
        )}
      </div>
    </Panel>
  );
}
