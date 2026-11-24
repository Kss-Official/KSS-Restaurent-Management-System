import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppStore } from '../../store/store';
import { generateBookingId } from '../../utils/helpers';
import CustomerPortalFlowBar from '../../components/common/CustomerPortalFlowBar';
import { 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  Check,
  ArrowRight, 
  ArrowLeft, 
  ChevronDown, 
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  UtensilsCrossed, 
  Umbrella, 
  Sparkles, 
  User, 
  Phone, 
  Mail, 
  MessageSquare,
  MessageCircle,
  Share2,
  Copy,
  Download,
  Home,
  Box,
  ShieldCheck,
  RotateCcw,
  Eye,
  Maximize2,
  Minimize2,
  X,
  AlertCircle,
  Info
} from 'lucide-react';

// Indoor Dining Tables: Strictly 2, 4, and 6 Seaters mapped to HD 3D Floor Plan (User Reference Image)
const indoorTables = [
  {
    id: 'T01',
    name: 'Table T01',
    type: '2-Seater',
    capacity: 2,
    seats: ['S1', 'S2'],
    area: 'Northwest Salon',
    desc: 'Intimate two-guest table along the northwest corridor with warm golden glow',
    image: '/table_thumb_t01.jpg',
    position: { top: '31.7%', left: '19.1%' }
  },
  {
    id: 'T02',
    name: 'Table T02',
    type: '2-Seater',
    capacity: 2,
    seats: ['S1', 'S2'],
    area: 'West Archway Promenade',
    desc: 'Cozy two-guest round table beside the architectural wall sconces',
    image: '/table_thumb_t02.jpg',
    position: { top: '52.1%', left: '18.0%' }
  },
  {
    id: 'T03',
    name: 'Table T03',
    type: '2-Seater',
    capacity: 2,
    seats: ['S1', 'S2'],
    area: 'Southwest Terrace',
    desc: 'Spacious two-guest table beside the lush indoor palm arrangements',
    image: '/table_thumb_t03.jpg',
    position: { top: '75.9%', left: '15.8%' }
  },
  {
    id: 'T04',
    name: 'Table T04',
    type: '4-Seater',
    capacity: 4,
    seats: ['S1', 'S2', 'S3', 'S4'],
    area: 'Grand Chandelier Aisle (North)',
    desc: 'Central four-guest round dining table directly below the crystal chandelier',
    image: '/table_thumb_t04.jpg',
    position: { top: '32.2%', left: '41.3%' }
  },
  {
    id: 'T05',
    name: 'Table T05',
    type: '4-Seater',
    capacity: 4,
    seats: ['S1', 'S2', 'S3', 'S4'],
    area: 'Central Marble Atrium',
    desc: 'Prime central round dining table with burgundy velvet armchairs & grand view',
    image: '/table_thumb_t05.jpg',
    position: { top: '52.5%', left: '38.1%' }
  },
  {
    id: 'T06',
    name: 'Table T06',
    type: '4-Seater',
    capacity: 4,
    seats: ['S1', 'S2', 'S3', 'S4'],
    area: 'Foyer Garden Aisle',
    desc: 'Four-guest round table flanking the palm greenery and main dining hall view',
    image: '/table_thumb_t06.jpg',
    position: { top: '76.6%', left: '39.0%' }
  },
  {
    id: 'T07',
    name: 'Table T07',
    type: '4-Seater',
    capacity: 4,
    seats: ['S1', 'S2', 'S3', 'S4'],
    area: 'Northeast Banquet Corner',
    desc: 'Square four-guest table framed by illuminated archways and marble reflections',
    image: '/table_thumb_t07.jpg',
    position: { top: '31.2%', left: '72.8%' }
  },
  {
    id: 'T08',
    name: 'Table T08',
    type: '4-Seater',
    capacity: 4,
    seats: ['S1', 'S2', 'S3', 'S4'],
    area: 'East Archway Salon',
    desc: 'Custom square dining table with plush velvet chairs near the east archways',
    image: '/table_thumb_t08.jpg',
    position: { top: '52.3%', left: '58.3%' }
  },
  {
    id: 'T09',
    name: 'Table T09',
    type: '6-Seater',
    capacity: 6,
    seats: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
    area: 'Southeast Grand Banquet',
    desc: 'Six-guest rectangular banquet table for celebrations and dinner parties',
    image: '/table_thumb_t09.jpg',
    position: { top: '77.4%', left: '66.2%' }
  },
  {
    id: 'T10',
    name: 'Table T10',
    type: '6-Seater',
    capacity: 6,
    seats: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
    area: 'East VIP Promenade',
    desc: 'Spacious rectangular six-guest banquet table overlooking the grand double doors',
    image: '/table_thumb_t10.jpg',
    position: { top: '53.0%', left: '82.9%' }
  }
];

// Outdoor Dining Tables: Exactly 6 Physical Tables Mapped to HD 3D Outdoor Sky Terrace (User Reference Image)
const outdoorTables = [
  {
    id: 'T11',
    name: 'Table T11',
    type: '2-Seater',
    capacity: 2,
    seats: ['S1', 'S2'],
    area: 'Balcony Promenade West',
    desc: 'Intimate two-guest table along the rooftop balustrade overlooking the glittering skyline',
    image: '/lunar_outdoor_table_zoom.jpg',
    position: { top: '36.8%', left: '37.6%' },
    isOutdoor: true
  },
  {
    id: 'T12',
    name: 'Table T12',
    type: '2-Seater',
    capacity: 2,
    seats: ['S1', 'S2'],
    area: 'Balcony Promenade East',
    desc: 'Intimate two-guest table along the rooftop balustrade with panoramic evening views',
    image: '/lunar_outdoor_table_zoom.jpg',
    position: { top: '36.8%', left: '69.2%' },
    isOutdoor: true
  },
  {
    id: 'T13',
    name: 'Table T13',
    type: '4-Seater',
    capacity: 4,
    seats: ['S1', 'S2', 'S3', 'S4'],
    area: 'Sunset West Terrace',
    desc: 'Four-guest round dining table beneath the lighted palm canopy on the west terrace',
    image: '/lunar_outdoor_table_zoom.jpg',
    position: { top: '50.6%', left: '25.2%' },
    isOutdoor: true
  },
  {
    id: 'T14',
    name: 'Table T14',
    type: '4-Seater',
    capacity: 4,
    seats: ['S1', 'S2', 'S3', 'S4'],
    area: 'Central Palm Court',
    desc: 'Signature four-guest round dining table in the heart of the illuminated outdoor terrace',
    image: '/lunar_outdoor_table_zoom.jpg',
    position: { top: '46.8%', left: '53.4%' },
    isOutdoor: true
  },
  {
    id: 'T15',
    name: 'Table T15',
    type: '4-Seater',
    capacity: 4,
    seats: ['S1', 'S2', 'S3', 'S4'],
    area: 'Skyline East Terrace',
    desc: 'Four-guest round dining table framing the glowing architectural glass facade & lanterns',
    image: '/lunar_outdoor_table_zoom.jpg',
    position: { top: '52.0%', left: '81.2%' },
    isOutdoor: true
  },
  {
    id: 'T16',
    name: 'Table T16',
    type: '6-Seater',
    capacity: 6,
    seats: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6'],
    area: 'Grand Skyline VIP Banquet',
    desc: 'Prime six-guest round banquet table with red and white roses centerpiece',
    image: '/lunar_outdoor_table_zoom.jpg',
    position: { top: '74.5%', left: '53.4%' },
    isOutdoor: true
  }
];

// Helper to get tailored viewpoint direction and details per chair
const getChairPerspective = (capacity, seat, isOutdoor = false) => {
  if (isOutdoor) {
    if (capacity === 2) {
      return { facing: 'Across Table & Skyline (Facing Companion)', panOffset: 0, note: 'Seated facing your dining companion directly opposite across the intimate 2-guest table' };
    }
    if (capacity === 4) {
      if (seat === 'S1') return { facing: 'Across Table (Facing North Companion)', panOffset: -8, note: 'Direct view of companion chair opposite, with companion chairs on your left & right' };
      if (seat === 'S2') return { facing: 'Across Table (Facing West Companion)', panOffset: -18, note: 'Direct view of companion chair opposite, with companion chairs on your left & right' };
      if (seat === 'S3') return { facing: 'Across Table (Facing South Companion)', panOffset: 8, note: 'Direct view of companion chair opposite, with companion chairs on your left & right' };
      return { facing: 'Across Table (Facing East Companion)', panOffset: 18, note: 'Direct view of companion chair opposite, with companion chairs on your left & right' };
    }
    // 6-Seater
    const map6 = {
      'S1': { facing: 'Banquet Head (Skyline)', panOffset: -8, note: 'Facing across banquet towards companion diners & city skyline' },
      'S2': { facing: 'Banquet Head (Terrace)', panOffset: 8, note: 'Facing across banquet towards companion diners & terrace lights' },
      'S3': { facing: 'Banquet Mid (Palms)', panOffset: -20, note: 'Mid-table seat overlooking fairy-lit palm trees' },
      'S4': { facing: 'Banquet Mid (Lanterns)', panOffset: 20, note: 'Mid-table seat with view of outdoor lanterns and companions' },
      'S5': { facing: 'Banquet Corner (West)', panOffset: -32, note: 'Corner seat with wide open view of night terrace' },
      'S6': { facing: 'Banquet Corner (East)', panOffset: 32, note: 'Corner seat with wide open view of night terrace' },
    };
    return map6[seat] || { facing: 'Skyline Terrace Center', panOffset: 0, note: 'Prime outdoor terrace view' };
  }
  if (capacity === 2) {
    if (seat === 'S1') {
      return { facing: 'Across Table (Left Side)', panOffset: -8, note: 'Seated on Left chair facing your companion across the table' };
    }
    return { facing: 'Across Table (Right Side)', panOffset: 8, note: 'Seated on Right chair facing your companion across the table' };
  }
  if (capacity === 4) {
    if (seat === 'S1') return { facing: 'Across Table (Host Seat)', panOffset: -8, note: 'Seated facing companion chairs across the table' };
    if (seat === 'S2') return { facing: 'Angled Left Chair', panOffset: -18, note: 'Seated on left side facing across table towards companions' };
    if (seat === 'S3') return { facing: 'Across Table (Center)', panOffset: 8, note: 'Direct view of companions & dining hall ambiance' };
    return { facing: 'Angled Right Chair', panOffset: 18, note: 'Seated on right side facing across table towards companions' };
  }
  // 6-Seater
  const map6 = {
    'S1': { facing: 'Banquet Head (Left)', panOffset: -8, note: 'Facing across banquet towards companion diners' },
    'S2': { facing: 'Banquet Head (Right)', panOffset: 8, note: 'Facing across banquet towards companion diners' },
    'S3': { facing: 'Banquet Mid (Left)', panOffset: -20, note: 'Mid-table seat facing companions across the banquet' },
    'S4': { facing: 'Banquet Mid (Right)', panOffset: 20, note: 'Mid-table seat facing companions across the banquet' },
    'S5': { facing: 'Banquet Corner (Left)', panOffset: -32, note: 'Corner banquet seat overlooking full dining hall' },
    'S6': { facing: 'Banquet Corner (Right)', panOffset: 32, note: 'Corner banquet seat overlooking full dining hall' },
  };
  return map6[seat] || { facing: 'Grand Hall Center', panOffset: 0, note: 'Prime dining hall view' };
};

// 3D First-Person Seated Diner POV Component (Ultra-Sharp 3D Cylindrical Panoramic View)
const Chair3DViewInside = ({ table, seat, onBack, onConfirmSeat }) => {
  const mountRef = useRef(null);
  const isOutdoor = Boolean(table?.isOutdoor || table?.id?.startsWith('O') || ['T11', 'T12', 'T13', 'T14', 'T15', 'T16'].includes(table?.id));
  const perspective = getChairPerspective(table.capacity, seat, isOutdoor);
  const [fov, setFov] = useState(64);
  const [cameraAngle, setCameraAngle] = useState({ yaw: 0, pitch: 0 });
  const threeRef = useRef(null);

  // Dynamic image selection matching outdoor vs indoor and table capacity (Pure Authentic Photorealistic POV):
  const povImage = isOutdoor
    ? table.capacity === 4
      ? '/lunar_outdoor_seated_pov_4seater.jpg?v=8'
      : table.capacity === 6
        ? '/lunar_outdoor_seated_pov_6seater.jpg?v=8'
        : '/lunar_outdoor_seated_pov_2seater.jpg?v=8'
    : table.capacity === 4
      ? '/lunar_seated_pov_4seater.jpg?v=8'
      : table.capacity === 6
        ? '/lunar_seated_pov_6seater.jpg?v=8'
        : '/lunar_seated_pov_2seater.jpg?v=8';

  // Initial longitude based on chair perspective:
  const getInitialLon = () => {
    if (table.capacity === 2) {
      return 0; // Pure centered viewpoint looking directly across at companion chair
    }
    if (table.capacity === 4) {
      if (seat === 'S1') return -8;
      if (seat === 'S2') return -18;
      if (seat === 'S3') return 8;
      return 18;
    }
    // 6-Seater
    const map = { 'S1': -8, 'S2': 8, 'S3': -20, 'S4': 20, 'S5': -32, 'S6': 32 };
    return map[seat] || 0;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x140d0e);

    const camera = new THREE.PerspectiveCamera(64, width / height, 1, 2500);
    camera.target = new THREE.Vector3(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Ultra-Wide Panoramic Curved Cyc (Guaranteed Zero Black Cutoffs, 100% Photorealistic Scale):
    // Radius 600, thetaSpan = 212 degrees (covers full visual field with safety buffer beyond camera pan)
    const R = 600;
    const thetaSpan = Math.PI * 1.18; // ~212.4 degrees
    const H = (R * thetaSpan) / (1376 / 768); // ~1224, perfectly preserving photo aspect ratio without zoom distortion
    const geometry = new THREE.CylinderGeometry(R, R, H, 64, 1, true, -thetaSpan / 2, thetaSpan);
    geometry.scale(1, 1, 1); // Native orientation: -X is LHS, +X is RHS, +Z is center

    const texture = new THREE.TextureLoader().load(povImage);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    const material = new THREE.MeshBasicMaterial({ 
      map: texture, 
      side: THREE.DoubleSide 
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, -10, 0); // Position table perfectly at lower-center
    scene.add(mesh);

    let isUserInteracting = false;
    let onPointerDownMouseX = 0, onPointerDownMouseY = 0;
    let onPointerDownLon = 0, onPointerDownLat = 0;
    let lon = getInitialLon(), lat = -2;
    let phi = 0, theta = 0;
    let currentFov = 64;

    // Realistic "Sit-Down" camera entrance animation:
    // Starts slightly elevated and focused (standing viewpoint approaching chair),
    // then smoothly settles down into the velvet seat at table height.
    const animStartTime = performance.now();
    const animDuration = 800; // 800ms natural easing
    const startY = 24;
    const targetY = 0;
    const startFov = 56;
    const targetFov = 64;
    camera.position.y = startY;
    camera.fov = startFov;
    camera.updateProjectionMatrix();

    const updateCamera = () => {
      // Clamped within cylinder safe bounds so camera never sees past the photo:
      lat = Math.max(-14, Math.min(14, lat));
      lon = Math.max(-46, Math.min(46, lon));

      phi = THREE.MathUtils.degToRad(90 - lat);
      theta = THREE.MathUtils.degToRad(lon);

      camera.target.x = 500 * Math.sin(phi) * Math.sin(theta);
      camera.target.y = camera.position.y + 500 * Math.cos(phi);
      camera.target.z = 500 * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(camera.target);
      renderer.render(scene, camera);
      setCameraAngle({ yaw: Math.round(lon), pitch: Math.round(lat) });
    };

    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      const elapsed = performance.now() - animStartTime;
      if (elapsed < animDuration) {
        const progress = Math.min(1, elapsed / animDuration);
        const ease = 1 - Math.pow(1 - progress, 3); // Cubic ease-out
        camera.position.y = startY + (targetY - startY) * ease;
        currentFov = startFov + (targetFov - startFov) * ease;
        camera.fov = currentFov;
        camera.updateProjectionMatrix();
        setFov(Math.round(currentFov));
      }
      updateCamera();
    };
    animate();

    const onPointerDown = (e) => {
      if (e.isPrimary === false) return;
      isUserInteracting = true;
      onPointerDownMouseX = e.clientX;
      onPointerDownMouseY = e.clientY;
      onPointerDownLon = lon;
      onPointerDownLat = lat;
      container.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!isUserInteracting) return;
      lon = Math.max(-46, Math.min(46, (onPointerDownMouseX - e.clientX) * 0.16 + onPointerDownLon));
      lat = Math.max(-14, Math.min(14, (e.clientY - onPointerDownMouseY) * 0.16 + onPointerDownLat));
    };

    const onPointerUp = (e) => {
      isUserInteracting = false;
      try { container.releasePointerCapture?.(e.pointerId); } catch {}
    };

    const onWheel = (e) => {
      e.preventDefault();
      currentFov = Math.max(50, Math.min(80, currentFov + e.deltaY * 0.04));
      camera.fov = currentFov;
      camera.updateProjectionMatrix();
      setFov(Math.round(currentFov));
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', handleResize);

    threeRef.current = {
      rotateBy: (deltaLon, deltaLat = 0) => {
        lon = Math.max(-46, Math.min(46, lon + deltaLon));
        lat = Math.max(-14, Math.min(14, lat + deltaLat));
      },
      setLonLat: (targetLon, targetLat = -2) => {
        lon = Math.max(-46, Math.min(46, targetLon));
        lat = Math.max(-14, Math.min(14, targetLat));
      },
      zoomBy: (deltaFov) => {
        currentFov = Math.max(50, Math.min(80, currentFov + deltaFov));
        camera.fov = currentFov;
        camera.updateProjectionMatrix();
        setFov(Math.round(currentFov));
      },
      reset: () => {
        lon = getInitialLon();
        lat = -2;
        currentFov = 64;
        camera.fov = 64;
        camera.position.y = 0;
        camera.updateProjectionMatrix();
        setFov(64);
      }
    };

    return () => {
      cancelAnimationFrame(reqId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [seat, table.id, table.capacity, isOutdoor, povImage]);

  return (
    <div className="relative w-full h-full min-h-[520px] sm:min-h-[600px] rounded-[28px] overflow-hidden border border-[#EADBCC] shadow-xs flex flex-col justify-between select-none bg-[#140D0E] animate-in fade-in duration-300">
      
      {/* Three.js 360° Spherical Panoramic Canvas Container */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Atmospheric Subtle Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none" />

      {/* Top Header: Controls & Presets */}
      <div className="relative z-20 p-4 sm:p-5 flex items-center justify-between text-white flex-wrap gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={onBack}
            className="bg-black/75 hover:bg-black/95 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 border border-[#FABE24]/40 backdrop-blur-md shadow-md transition-all cursor-pointer hover:scale-105"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#FABE24]" />
            <span>← Back to Table View</span>
          </button>

          <span className="text-xs font-bold text-white bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
            Chair {seat} • {table.name} ({table.type})
          </span>
        </div>

        {/* 360 Direct Look Controls */}
        <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs pointer-events-auto">
          <span className="text-[11px] text-white/70 mr-1 hidden md:inline">360° View:</span>
          <button
            type="button"
            onClick={() => threeRef.current?.rotateBy(-30, 0)}
            className="px-2 py-0.5 rounded-md hover:bg-white/10 font-bold text-[#FABE24] cursor-pointer"
            title="Pan Left (360°)"
          >
            ◀ Left
          </button>
          <button
            type="button"
            onClick={() => threeRef.current?.rotateBy(30, 0)}
            className="px-2 py-0.5 rounded-md hover:bg-white/10 font-bold text-[#FABE24] cursor-pointer"
            title="Pan Right (360°)"
          >
            Right ▶
          </button>
          <button
            type="button"
            onClick={() => threeRef.current?.rotateBy(0, 15)}
            className="px-1.5 py-0.5 rounded-md hover:bg-white/10 font-bold text-white cursor-pointer text-[10px]"
            title="Look Up"
          >
            ▲
          </button>
          <button
            type="button"
            onClick={() => threeRef.current?.rotateBy(0, -15)}
            className="px-1.5 py-0.5 rounded-md hover:bg-white/10 font-bold text-white cursor-pointer text-[10px]"
            title="Look Down"
          >
            ▼
          </button>
          <button
            type="button"
            onClick={() => threeRef.current?.zoomBy(-10)}
            className="px-2 py-0.5 rounded-md hover:bg-white/10 font-bold text-[#FABE24] cursor-pointer"
            title="Zoom In"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => threeRef.current?.zoomBy(10)}
            className="px-2 py-0.5 rounded-md hover:bg-white/10 font-bold text-[#FABE24] cursor-pointer"
            title="Zoom Out"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => threeRef.current?.reset()}
            className="p-1 rounded-md hover:bg-white/10 text-white/80 cursor-pointer"
            title="Center Chair View"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#FABE24]" />
          </button>
        </div>
      </div>

      {/* Center ambient indicator - minimal non-intrusive */}
      <div className="relative z-20 px-6 flex items-center justify-center pointer-events-none">
        {/* Unobstructed view of table, plates, glasses and chairs */}
      </div>

      {/* Bottom Action Footer inside 3D Card */}
      <div className="relative z-20 p-4 sm:p-5 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex items-center justify-between gap-4">
        <div className="text-white text-xs">
          <p className="font-bold text-[#FABE24] text-sm">Chair {seat} Perspective • {perspective.facing}</p>
          <p className="text-white/85 text-[11.5px]">{perspective.note}</p>
        </div>

        <button
          type="button"
          onClick={() => onConfirmSeat(seat)}
          className="bg-[#FABE24] hover:bg-[#E5AC18] text-[#2B181C] font-bold text-xs px-4 py-2 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
          <span>Confirm Chair {seat}</span>
        </button>
      </div>
    </div>
  );
};

// ============================================================================
// ULTRA-SHARP 3D 360° TABLE EXPERIENCE (WebGL Three.js Cylindrical 360 Scene)
// ============================================================================
const Table360ExperienceView = ({
  table,
  selectedSeats,
  onSelectChair,
  onToggleSeat,
  onBackToFloor,
  diningPreference
}) => {
  const mountRef = useRef(null);
  const isOutdoor = Boolean(
    table?.isOutdoor ||
    diningPreference === 'Outdoor Dining' ||
    table?.id?.startsWith('O') ||
    ['T11', 'T12', 'T13', 'T14', 'T15', 'T16'].includes(table?.id)
  );

  const [fov, setFov] = useState(62);
  const [cameraAngle, setCameraAngle] = useState({ yaw: 0, pitch: 0 });
  const threeRef = useRef(null);

  // Full table view with base, chairs, and floor completely visible:
  const getTablePanoramaImage = () => {
    if (isOutdoor) {
      return table?.image || '/lunar_outdoor_table_zoom.jpg';
    }
    // Indoor Hall
    return table?.capacity === 4
      ? '/lunar_360_4seater.jpg'
      : table?.capacity === 6
        ? '/lunar_360_6seater.jpg'
        : '/lunar_360_2seater.jpg';
  };

  const panoramaImage = getTablePanoramaImage();

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 800;
    let height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x140d0e);

    const camera = new THREE.PerspectiveCamera(62, width / height, 1, 2500);
    camera.target = new THREE.Vector3(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Wide curved panoramic cyc: Full table framing with entire pedestal base and chairs on floor visible
    const R = 720;
    const H = 940; // Exact height matching camera vertical FOV so the entire table, pedestal base, and chair legs on floor are 100% visible
    const Arc = H * (16 / 9); // Exact 16:9 aspect ratio preserving optical geometry without distortion
    const thetaSpan = Arc / R; // ~2.32 rad (~133° span for natural, immersive panorama)
    const geometry = new THREE.CylinderGeometry(R, R, H, 64, 1, true, -thetaSpan / 2, thetaSpan);
    geometry.scale(1, 1, 1); // Native forward-facing orientation

    const texture = new THREE.TextureLoader().load(panoramaImage);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 16, 0); // Elevated so table base and chair legs sit cleanly above footer
    scene.add(mesh);

    let isUserInteracting = false;
    let onPointerDownMouseX = 0, onPointerDownMouseY = 0;
    let onPointerDownLon = 0, onPointerDownLat = 0;
    
    // Physics-damped interpolation for silky smooth rotation
    let currentLon = 0, targetLon = 0;
    let currentLat = 0, targetLat = 0;
    let currentFov = 62, targetFov = 62;

    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);

      // Smooth damping (lerp)
      currentLon += (targetLon - currentLon) * 0.14;
      currentLat += (targetLat - currentLat) * 0.14;
      currentFov += (targetFov - currentFov) * 0.14;

      // Clamped within curved panoramic safety boundaries so camera never sees past edge of photo
      currentLon = Math.max(-36, Math.min(36, currentLon));
      currentLat = Math.max(-14, Math.min(14, currentLat));

      camera.fov = currentFov;
      camera.updateProjectionMatrix();

      const phi = THREE.MathUtils.degToRad(90 - currentLat);
      const theta = THREE.MathUtils.degToRad(currentLon);

      camera.target.x = 500 * Math.sin(phi) * Math.sin(theta);
      camera.target.y = 500 * Math.cos(phi);
      camera.target.z = 500 * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(camera.target);

      renderer.render(scene, camera);
      setCameraAngle({ yaw: Math.round(currentLon), pitch: Math.round(currentLat) });
      setFov(Math.round(currentFov));
    };
    animate();

    const onPointerDown = (e) => {
      if (e.isPrimary === false) return;
      if (e.target.closest('button') || e.target.closest('[role="button"]') || e.target.closest('.interactive-chair-chip')) {
        return;
      }
      isUserInteracting = true;
      onPointerDownMouseX = e.clientX;
      onPointerDownMouseY = e.clientY;
      onPointerDownLon = targetLon;
      onPointerDownLat = targetLat;
      container.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e) => {
      if (!isUserInteracting) return;
      // Dragging right rotates view right, dragging left rotates view left
      targetLon = Math.max(-36, Math.min(36, onPointerDownLon + (e.clientX - onPointerDownMouseX) * 0.20));
      targetLat = Math.max(-14, Math.min(14, onPointerDownLat - (e.clientY - onPointerDownMouseY) * 0.16));
    };

    const onPointerUp = (e) => {
      isUserInteracting = false;
      try { container.releasePointerCapture?.(e.pointerId); } catch {}
    };

    const onWheel = (e) => {
      e.preventDefault();
      targetFov = Math.max(52, Math.min(74, targetFov + e.deltaY * 0.04));
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 800;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', handleResize);

    threeRef.current = {
      rotateBy: (deltaLon, deltaLat = 0) => {
        targetLon = Math.max(-36, Math.min(36, targetLon + deltaLon));
        targetLat = Math.max(-14, Math.min(14, targetLat + deltaLat));
      },
      zoomBy: (deltaFov) => {
        targetFov = Math.max(52, Math.min(74, targetFov + deltaFov));
      },
      reset: () => {
        targetLon = 0;
        targetLat = 0;
        targetFov = 62;
      }
    };

    return () => {
      cancelAnimationFrame(reqId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [table.id, table.capacity, isOutdoor, panoramaImage]);

  // Chair layout definitions positioned naturally around the 3D table matching Image 2
  const getTableChairs = () => {
    if (table.capacity === 2) {
      return [
        { seat: 'S1', label: 'Chair S1', desc: 'Left View', top: '50%', left: '30%' },
        { seat: 'S2', label: 'Chair S2', desc: 'Right View', top: '50%', left: '70%' }
      ];
    }
    if (table.capacity === 4) {
      return [
        { seat: 'S1', label: 'Chair S1', desc: 'North View (Across)', top: '34%', left: '50%' },
        { seat: 'S4', label: 'Chair S4', desc: 'West View (Left)', top: '54%', left: '26%' },
        { seat: 'S2', label: 'Chair S2', desc: 'East View (Right)', top: '54%', left: '74%' },
        { seat: 'S3', label: 'Chair S3', desc: 'South View (Front)', top: '70%', left: '50%' }
      ];
    }
    // 6-Seater VIP (Exact placement matching Reference Image 2)
    return [
      { seat: 'S1', label: 'Chair S1', desc: 'North West View', top: '26%', left: '38%' },
      { seat: 'S2', label: 'Chair S2', desc: 'North East View', top: '26%', left: '62%' },
      { seat: 'S6', label: 'Chair S6', desc: 'West Side', top: '48%', left: '20%' },
      { seat: 'S3', label: 'Chair S3', desc: 'East Side', top: '48%', left: '80%' },
      { seat: 'S5', label: 'Chair S5', desc: 'South West View', top: '72%', left: '28%' },
      { seat: 'S4', label: 'Chair S4', desc: 'South East View', top: '72%', left: '72%' }
    ];
  };

  // Parallax horizontal shift for chair badges as camera rotates
  const tableShiftX = -cameraAngle.yaw * 1.55;

  return (
    <div className="relative w-full h-full min-h-[520px] sm:min-h-[600px] rounded-[28px] overflow-hidden border border-[#EADBCC] shadow-xs flex flex-col justify-between select-none bg-[#140D0E] animate-in fade-in duration-300">
      
      {/* Three.js 3D WebGL Cylindrical Panoramic Canvas */}
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none"
      />

      {/* Atmospheric Subtle Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/55 pointer-events-none" />

      {/* Top Header: Navigation & 360° Orbit Controls */}
      <div className="relative z-20 p-4 sm:p-5 flex items-center justify-between text-white flex-wrap gap-2 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={onBackToFloor}
            className="bg-black/75 hover:bg-black/95 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 border border-[#FABE24]/40 backdrop-blur-md shadow-md transition-all cursor-pointer hover:scale-105"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#FABE24]" />
            <span>{isOutdoor ? '← Back to Terrace View' : '← Back to Full Hall View'}</span>
          </button>

          <span className="text-xs font-bold text-white bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
            {table.name} • {table.capacity} Chairs ({table.type})
          </span>
        </div>

        {/* 360° Real Orbit Controls */}
        <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs pointer-events-auto">
          <span className="text-[11px] text-white/70 mr-1 hidden lg:inline">3D View:</span>
          <button
            type="button"
            onClick={() => threeRef.current?.rotateBy(30, 0)}
            className="px-2 py-0.5 rounded-md hover:bg-white/10 font-bold text-[#FABE24] cursor-pointer"
            title="Rotate Left (LHS View)"
          >
            ◀ Left (LHS)
          </button>
          <button
            type="button"
            onClick={() => threeRef.current?.rotateBy(-30, 0)}
            className="px-2 py-0.5 rounded-md hover:bg-white/10 font-bold text-[#FABE24] cursor-pointer"
            title="Rotate Right (RHS View)"
          >
            (RHS) Right ▶
          </button>
          <button
            type="button"
            onClick={() => threeRef.current?.rotateBy(0, 8)}
            className="px-1.5 py-0.5 rounded-md hover:bg-white/10 font-bold text-white cursor-pointer text-[10px]"
            title="Look Up (Skyline & Palms)"
          >
            ▲
          </button>
          <button
            type="button"
            onClick={() => threeRef.current?.rotateBy(0, -8)}
            className="px-1.5 py-0.5 rounded-md hover:bg-white/10 font-bold text-white cursor-pointer text-[10px]"
            title="Look Down (Table & Decor)"
          >
            ▼
          </button>
          <button
            type="button"
            onClick={() => threeRef.current?.zoomBy(-6)}
            className="px-2 py-0.5 rounded-md hover:bg-white/10 font-bold text-[#FABE24] cursor-pointer"
            title="Zoom In"
          >
            +
          </button>
          <button
            type="button"
            onClick={() => threeRef.current?.zoomBy(6)}
            className="px-2 py-0.5 rounded-md hover:bg-white/10 font-bold text-[#FABE24] cursor-pointer"
            title="Zoom Out"
          >
            −
          </button>
          <button
            type="button"
            onClick={() => threeRef.current?.reset()}
            className="p-1 rounded-md hover:bg-white/10 text-white/80 cursor-pointer"
            title="Reset Center View"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#FABE24]" />
          </button>
        </div>
      </div>

      {/* Floating 3D Chair Badges Layer (Parallax-synchronized with camera rotation) */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-100 ease-out"
        style={{
          transform: `translate3d(${tableShiftX}%, 0, 0)`
        }}
      >
        {/* Table ID Center Core */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
          style={{ top: '50%', left: '50%' }}
        >
          <div className="w-10 h-10 rounded-full bg-black/90 backdrop-blur-md border-2 border-[#FABE24] flex items-center justify-center shadow-[0_0_20px_rgba(250,190,36,0.8)]">
            <span className="text-xs font-black text-[#FABE24]">{table.id}</span>
          </div>
        </div>

        {/* Interactive Chairs */}
        {getTableChairs().map((chair) => {
          const isSelected = selectedSeats.includes(chair.seat);
          return (
            <div
              key={chair.seat}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-auto"
              style={{ top: chair.top, left: chair.left }}
            >
              <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/85 backdrop-blur-md border border-[#FABE24]/80 shadow-2xl hover:scale-105 transition-all">
                <button
                  type="button"
                  onClick={() => onToggleSeat(chair.seat)}
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#4C1824] text-white border border-[#FABE24] shadow-[0_0_12px_rgba(250,190,36,0.6)]'
                      : 'text-white/90 hover:text-white'
                  }`}
                  title={`Click to select Chair ${chair.seat} for booking`}
                >
                  <UtensilsCrossed className="w-3 h-3 text-[#FABE24]" />
                  <span>Chair {chair.seat}</span>
                  {isSelected && <Check className="w-3 h-3 text-[#FABE24] stroke-[3]" />}
                </button>

                <button
                  type="button"
                  onClick={() => onSelectChair(chair.seat)}
                  className="bg-[#FABE24] hover:bg-[#E5AC18] text-[#1F1416] font-bold text-[11px] px-2.5 py-1 rounded-full flex items-center gap-1 transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                  title={`Sit down in Chair ${chair.seat} (Realistic 3D POV)`}
                >
                  <Eye className="w-3 h-3" />
                  <span>3D View</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Footer: Quick Seat Selector & 360 Guidance */}
      <div className="relative z-20 p-4 bg-gradient-to-t from-black/95 via-black/75 to-transparent flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto flex-wrap">
          <span className="text-white/70 text-xs font-semibold">Select Chairs:</span>
          {table.seats.map((seat) => {
            const isSelected = selectedSeats.includes(seat);
            return (
              <button
                key={seat}
                type="button"
                onClick={() => onToggleSeat(seat)}
                className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#FABE24] text-[#1F1416] shadow-[0_0_15px_rgba(250,190,36,0.6)]'
                    : 'bg-black/70 hover:bg-black/90 text-white border border-white/20'
                }`}
              >
                <span>Chair {seat}</span>
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-white text-xs pointer-events-auto">
          <Sparkles className="w-4 h-4 text-[#FABE24] shrink-0" />
          <span className="text-white/85 text-[11.5px]">
            Drag anywhere to explore in 3D (LHS &amp; RHS) • Click 3D View to sit down
          </span>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// CONTINUOUS 3D RESTAURANT SCENE (Powered by GSAP for Silky Smooth 3D Motion)
// ============================================================================
const Continuous3DHallScene = ({
  tables,
  selectedTable,
  viewMode, // 'floor' | 'table'
  selectedSeats,
  onSelectTable,
  onSelectChair,
  onBackToFloor,
  isTableReserved,
  time,
  hoveredTableId,
  setHoveredTableId,
  diningPreference,
  onToggleDiningPreference,
  flyingToTable,
  onFlightArrival,
  isZoomingOut,
  setIsZoomingOut
}) => {
  const containerRef = useRef(null);
  const worldRef = useRef(null);
  const isOutdoor = diningPreference === 'Outdoor Dining' || Boolean(tables && tables[0]?.isOutdoor);
  const overviewImage = isOutdoor ? '/lunar_outdoor_floor_hd.jpg' : '/lunar_hall_overview_hd.jpg';
  const isZoomed = viewMode === 'table';

  // Persistent transform state driven by GSAP (1.08 overscan eliminates any edge gaps on 3D parallax)
  const transformState = useRef({
    scale: 1.08,
    x: 0,
    y: 0,
    rotX: 0,
    rotY: 0
  });

  // Track horizontal and vertical camera exploration in Zoomed Mode (real LHS & RHS navigation)
  const panOffset = useRef({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Directly apply hardware-accelerated 3D transform to DOM without React re-render overhead
  const applyTransform = () => {
    if (!worldRef.current) return;
    const { x, y, scale, rotX, rotY } = transformState.current;
    worldRef.current.style.transform = `translate3d(${x}%, ${y}%, 0px) scale(${scale}) perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  };

  // Smooth GSAP Camera Flight when selecting a table or returning to floor
  useEffect(() => {
    panOffset.current = { x: 0, y: 0 };
    if (flyingToTable) {
      const tx = parseFloat(flyingToTable.position.left);
      const ty = parseFloat(flyingToTable.position.top);
      const targetScale = 2.45;
      const targetX = 50 - tx;
      const targetY = 50 - ty;

      gsap.killTweensOf(transformState.current);
      gsap.to(transformState.current, {
        scale: targetScale,
        x: targetX,
        y: targetY,
        rotX: -2.0,
        rotY: 0,
        duration: 1.15,
        ease: 'power2.inOut',
        onUpdate: applyTransform,
        onComplete: () => {
          if (onFlightArrival) {
            onFlightArrival(flyingToTable);
          }
        }
      });
    } else if (isZoomingOut) {
      gsap.killTweensOf(transformState.current);
      gsap.to(transformState.current, {
        scale: 1.08,
        x: 0,
        y: 0,
        rotX: 0,
        rotY: 0,
        duration: 1.05,
        ease: 'power2.inOut',
        onUpdate: applyTransform,
        onComplete: () => {
          if (setIsZoomingOut) setIsZoomingOut(false);
        }
      });
    } else if (viewMode === 'table' && selectedTable && !flyingToTable) {
      const tx = parseFloat(selectedTable.position.left);
      const ty = parseFloat(selectedTable.position.top);
      const targetScale = 2.45;
      const targetX = 50 - tx;
      const targetY = 50 - ty;

      gsap.killTweensOf(transformState.current);
      gsap.to(transformState.current, {
        scale: targetScale,
        x: targetX + panOffset.current.x,
        y: targetY + panOffset.current.y,
        rotX: -2.0,
        rotY: 0,
        duration: 0.7,
        ease: 'power2.out',
        onUpdate: applyTransform
      });
    } else if (viewMode === 'floor' && !flyingToTable) {
      gsap.killTweensOf(transformState.current);
      gsap.to(transformState.current, {
        scale: 1.08,
        x: 0,
        y: 0,
        rotX: 0,
        rotY: 0,
        duration: 0.9,
        ease: 'power2.out',
        onUpdate: applyTransform
      });
    }
  }, [flyingToTable?.id, isZoomingOut, viewMode, selectedTable?.id]);

  // Pointer & Mouse Handlers (Silky smooth 60fps physics-damped motion via GSAP)
  const handlePointerDown = (e) => {
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('[role="button"]') || e.target.closest('.no-drag')) {
      return;
    }
    if (isZoomed) {
      setIsDragging(true);
      e.currentTarget.setPointerCapture?.(e.pointerId);
      dragStart.current = {
        x: e.clientX || (e.touches && e.touches[0].clientX) || 0,
        y: e.clientY || (e.touches && e.touches[0].clientY) || 0
      };
    }
  };

  const handlePointerMove = (e) => {
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    if (isZoomed && isDragging && selectedTable) {
      const deltaX = clientX - dragStart.current.x;
      const deltaY = clientY - dragStart.current.y;
      dragStart.current = { x: clientX, y: clientY };

      const tx = parseFloat(selectedTable.position.left);
      const ty = parseFloat(selectedTable.position.top);
      const baseX = 50 - tx;
      const baseY = 50 - ty;

      // Real 3D Camera Pan: Dragging LHS/RHS actually navigates across the terrace view!
      panOffset.current.x = Math.max(-22, Math.min(22, panOffset.current.x + deltaX * 0.08));
      panOffset.current.y = Math.max(-14, Math.min(14, panOffset.current.y + deltaY * 0.08));

      transformState.current.x = baseX + panOffset.current.x;
      transformState.current.y = baseY + panOffset.current.y;
      transformState.current.rotY = (panOffset.current.x / 22) * 6.5;
      transformState.current.rotX = -2.5 + (panOffset.current.y / 14) * 4.0;
      applyTransform();
    } else if (!isZoomed && containerRef.current) {
      // Smooth 3D mouse parallax in Floor Mode via GSAP
      const rect = containerRef.current.getBoundingClientRect();
      const nx = (clientX - rect.left) / rect.width;
      const ny = (clientY - rect.top) / rect.height;

      gsap.to(transformState.current, {
        rotX: (0.5 - ny) * 6.0,
        rotY: (nx - 0.5) * 8.0,
        x: (nx - 0.5) * -1.8,
        y: (ny - 0.5) * -1.4,
        scale: 1.08,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
        onUpdate: applyTransform
      });
    }
  };

  const handlePointerUp = (e) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  const handlePointerLeave = () => {
    setIsDragging(false);
    if (!isZoomed) {
      gsap.to(transformState.current, {
        rotX: 0,
        rotY: 0,
        x: 0,
        y: 0,
        scale: 1.08,
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
        onUpdate: applyTransform
      });
    }
  };

  // Chair offsets as percentages of the hall image
  const getChairPositions = (table) => {
    const cx = parseFloat(table.position.left);
    const cy = parseFloat(table.position.top);

    if (table.capacity === 2) {
      return [
        { seat: 'S1', left: `${cx - 5.5}%`, top: `${cy + 1.2}%`, label: 'Chair 1 (Left)' },
        { seat: 'S2', left: `${cx + 5.5}%`, top: `${cy + 1.2}%`, label: 'Chair 2 (Right)' }
      ];
    }
    if (table.capacity === 4) {
      return [
        { seat: 'S1', left: `${cx}%`, top: `${cy - 5.8}%`, label: 'Chair 1 (North)' },
        { seat: 'S2', left: `${cx + 5.8}%`, top: `${cy + 0.5}%`, label: 'Chair 2 (East)' },
        { seat: 'S3', left: `${cx}%`, top: `${cy + 5.8}%`, label: 'Chair 3 (South)' },
        { seat: 'S4', left: `${cx - 5.8}%`, top: `${cy + 0.5}%`, label: 'Chair 4 (West)' }
      ];
    }
    // 6-Seater
    return [
      { seat: 'S1', left: `${cx - 4.2}%`, top: `${cy - 5.8}%`, label: 'Chair 1 (NW)' },
      { seat: 'S2', left: `${cx + 4.2}%`, top: `${cy - 5.8}%`, label: 'Chair 2 (NE)' },
      { seat: 'S3', left: `${cx + 7.5}%`, top: `${cy + 0.5}%`, label: 'Chair 3 (East)' },
      { seat: 'S4', left: `${cx + 4.2}%`, top: `${cy + 5.8}%`, label: 'Chair 4 (SE)' },
      { seat: 'S5', left: `${cx - 4.2}%`, top: `${cy + 5.8}%`, label: 'Chair 5 (SW)' },
      { seat: 'S6', left: `${cx - 7.5}%`, top: `${cy + 0.5}%`, label: 'Chair 6 (West)' }
    ];
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      className={`rounded-[28px] overflow-hidden border border-[#EADBCC] shadow-xs relative bg-[#1F1416] flex flex-col justify-between min-h-[520px] sm:min-h-[600px] select-none touch-none ${
        isZoomed ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
    >
      {/* 3D Visual Stage: Full Edge-to-Edge Cover (Zero LHS/RHS Blank Spaces!) */}
      {flyingToTable && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-40 bg-black/90 backdrop-blur-md px-5 py-2.5 rounded-full border border-[#FABE24] shadow-[0_0_25px_rgba(250,190,36,0.7)] flex items-center gap-2.5 animate-in fade-in zoom-in-95 duration-200 pointer-events-none">
          <Sparkles className="w-4 h-4 text-[#FABE24] animate-spin" />
          <span className="text-white text-xs font-bold">
            Approaching {flyingToTable.name} ({flyingToTable.type})...
          </span>
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          ref={worldRef}
          className="relative shrink-0 will-change-transform"
          style={{
            width: '100%',
            height: '100%',
            aspectRatio: '2048 / 1152',
            minWidth: '100%',
            minHeight: '100%',
            transformOrigin: '50% 50%',
            transform: 'translate3d(0%, 0%, 0px) scale(1.08)'
          }}
        >
          {/* High-Resolution Full-Bleed Reference Image */}
          <img
            src={overviewImage}
            alt={isOutdoor ? "Lunar Sky Garden Outdoor Terrace" : "Lunar Grand Restaurant 3D Hall"}
            className="w-full h-full block object-cover select-none pointer-events-none"
            draggable={false}
          />

          {/* Table Markers (Floor Overview Mode) - Authentic Clean Badges */}
          {!isZoomed &&
            tables.map((table) => {
              const isReserved = isTableReserved(table.id);
              const isHovered = hoveredTableId === table.id;

              if (isReserved) {
                return (
                  <div
                    key={table.id}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black/75 backdrop-blur-[2px] border border-white/20 flex flex-col items-center justify-center pointer-events-none shadow-lg transition-all duration-300 ${
                      flyingToTable ? 'opacity-0 scale-90' : 'opacity-85 scale-100'
                    }`}
                    style={{ top: table.position.top, left: table.position.left }}
                  >
                    <span className="text-[10px] font-bold text-white/60 uppercase">{table.id}</span>
                    <span className="text-[8.5px] text-[#FABE24] font-semibold">Reserved</span>
                  </div>
                );
              }

              return (
                <div
                  key={table.id}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    flyingToTable ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'
                  }`}
                  style={{ top: table.position.top, left: table.position.left }}
                  onMouseEnter={() => setHoveredTableId(table.id)}
                  onMouseLeave={() => setHoveredTableId(null)}
                >
                  <div className="relative flex flex-col items-center group">
                    {/* Tooltip on Hover */}
                    {isHovered && (
                      <div className="absolute -top-11 px-3 py-1 rounded-lg bg-[#2B181C]/95 text-white text-[11px] font-semibold border border-[#FABE24]/60 shadow-2xl whitespace-nowrap pointer-events-none z-30 flex items-center gap-1.5 animate-in fade-in zoom-in-95 duration-150">
                        <span>{table.name}</span>
                        <span className="text-[#FABE24]">({table.type})</span>
                        <span className="text-emerald-400 font-bold">• Click to Zoom</span>
                      </div>
                    )}

                    {/* Clean Table Target Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTable(table);
                      }}
                      className="w-16 h-16 rounded-full border-none bg-transparent hover:bg-white/10 transition-all duration-200 cursor-pointer flex items-center justify-center focus:outline-hidden"
                      title={`Click to zoom in and view ${table.name} (${table.type})`}
                    >
                      <div className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md border border-[#FABE24] text-white flex items-center justify-center shadow-xl group-hover:scale-115 group-hover:shadow-[0_0_15px_rgba(250,190,36,0.6)] transition-all">
                        <span className="text-[10px] font-bold text-[#FABE24]">{table.id}</span>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}

          {/* In Zoomed Table Mode: Chairs rendered inside the transformed 3D world */}
          {isZoomed && selectedTable && (
            <>
              {/* Table Identification Center Core */}
              <div
                className="absolute z-20 pointer-events-none flex items-center justify-center"
                style={{
                  top: selectedTable.position.top,
                  left: selectedTable.position.left,
                  transform: 'translate(-50%, -50%) scale(0.35)',
                  transformOrigin: 'center center'
                }}
              >
                <div className="w-11 h-11 rounded-full bg-black/90 backdrop-blur-md border-2 border-[#FABE24] flex items-center justify-center shadow-[0_0_25px_rgba(250,190,36,0.7)]">
                  <span className="text-xs font-black text-[#FABE24]">{selectedTable.id}</span>
                </div>
              </div>

              {/* Individual Clickable Chairs */}
              {getChairPositions(selectedTable).map((chair) => {
                const isSelected = selectedSeats.includes(chair.seat);
                return (
                  <div
                    key={chair.seat}
                    className="absolute z-30 group/chair flex flex-col items-center pointer-events-auto"
                    style={{
                      top: chair.top,
                      left: chair.left,
                      transform: 'translate(-50%, -50%) scale(0.35)',
                      transformOrigin: 'center center'
                    }}
                  >
                    {/* Tooltip on Hover */}
                    <div className="mb-2 opacity-0 group-hover/chair:opacity-100 transition-opacity duration-150 pointer-events-none whitespace-nowrap bg-[#2B181C]/95 text-white text-xs font-semibold px-3 py-1 rounded-lg border border-[#FABE24]/60 shadow-2xl flex items-center gap-1.5 animate-in fade-in zoom-in-95">
                      <Sparkles className="w-3 h-3 text-[#FABE24]" />
                      <span>Click to Sit in Chair {chair.seat} (3D POV)</span>
                    </div>

                    {/* Interactive Chair Button */}
                    <button
                      type="button"
                      onPointerDown={(e) => e.stopPropagation()}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectChair(chair.seat);
                      }}
                      className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-2xl backdrop-blur-md transition-all duration-200 cursor-pointer hover:scale-115 active:scale-95 ${
                        isSelected
                          ? 'bg-[#4C1824] text-white border-2 border-[#FABE24] ring-4 ring-[#FABE24]/50 shadow-[0_0_25px_rgba(250,190,36,0.8)]'
                          : 'bg-black/90 hover:bg-black text-white border border-[#FABE24]/90 hover:border-[#FABE24] shadow-xl'
                      }`}
                      title={`Click to sit in Chair ${chair.seat} (3D POV)`}
                    >
                      <span className="w-2 h-2 rounded-full bg-[#FABE24] animate-ping" />
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 text-[#FABE24]">
                        <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                        <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
                        <path d="M5 18v3" />
                        <path d="M19 18v3" />
                      </svg>
                      <span className="font-bold text-xs text-[#FABE24]">Chair {chair.seat}</span>
                      <span className="text-[10px] text-[#FABE24] font-semibold bg-[#FABE24]/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        <span>3D View</span>
                      </span>
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* Atmospheric Subtle Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 pointer-events-none" />

      {/* Top Header: Controls & Status */}
      <div 
        className="relative z-20 p-4 sm:p-5 flex items-center justify-between flex-wrap gap-2 no-drag"
        onPointerDown={(e) => e.stopPropagation()}
      >
        {isZoomed ? (
          <>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={onBackToFloor}
                className="bg-black/75 hover:bg-black/95 text-white text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-2 border border-[#FABE24]/40 backdrop-blur-md shadow-md transition-all cursor-pointer hover:scale-105"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#FABE24]" />
                <span>{isOutdoor ? '← Back to Terrace View' : '← Back to Full Hall View'}</span>
              </button>

              <span className="text-xs font-bold text-white bg-black/65 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 hidden sm:inline-block">
                {selectedTable.name} • {selectedTable.capacity} Chairs ({selectedTable.type})
              </span>
            </div>

            {/* Dedicated 360 Orbit & 3D Tilt Controls: Real LHS and RHS Terrace Exploration */}
            <div className="flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-white text-xs">
              <span className="text-[11px] text-white/70 mr-1 hidden lg:inline">360° View:</span>
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => {
                  if (!selectedTable) return;
                  const tx = parseFloat(selectedTable.position.left);
                  const baseX = 50 - tx;
                  panOffset.current.x = Math.min(22, panOffset.current.x + 6.5);
                  gsap.to(transformState.current, {
                    x: baseX + panOffset.current.x,
                    rotY: (panOffset.current.x / 22) * 6.5,
                    duration: 0.45,
                    ease: 'power2.out',
                    onUpdate: applyTransform
                  });
                }}
                className="px-2 py-0.5 rounded-md hover:bg-white/10 font-bold text-[#FABE24] cursor-pointer"
                title="Look Left (LHS Terrace View)"
              >
                ◀ Left (LHS)
              </button>
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => {
                  if (!selectedTable) return;
                  const tx = parseFloat(selectedTable.position.left);
                  const baseX = 50 - tx;
                  panOffset.current.x = Math.max(-22, panOffset.current.x - 6.5);
                  gsap.to(transformState.current, {
                    x: baseX + panOffset.current.x,
                    rotY: (panOffset.current.x / 22) * 6.5,
                    duration: 0.45,
                    ease: 'power2.out',
                    onUpdate: applyTransform
                  });
                }}
                className="px-2 py-0.5 rounded-md hover:bg-white/10 font-bold text-[#FABE24] cursor-pointer"
                title="Look Right (RHS Terrace View)"
              >
                (RHS) Right ▶
              </button>
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => {
                  if (!selectedTable) return;
                  const ty = parseFloat(selectedTable.position.top);
                  const baseY = 50 - ty;
                  panOffset.current.y = Math.min(14, panOffset.current.y + 4.5);
                  gsap.to(transformState.current, {
                    y: baseY + panOffset.current.y,
                    rotX: -2.5 + (panOffset.current.y / 14) * 4.0,
                    duration: 0.45,
                    ease: 'power2.out',
                    onUpdate: applyTransform
                  });
                }}
                className="px-1.5 py-0.5 rounded-md hover:bg-white/10 font-bold text-white/90 cursor-pointer text-[10px]"
                title="Look Up (Skyline & Palms)"
              >
                ▲
              </button>
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => {
                  if (!selectedTable) return;
                  const ty = parseFloat(selectedTable.position.top);
                  const baseY = 50 - ty;
                  panOffset.current.y = Math.max(-14, panOffset.current.y - 4.5);
                  gsap.to(transformState.current, {
                    y: baseY + panOffset.current.y,
                    rotX: -2.5 + (panOffset.current.y / 14) * 4.0,
                    duration: 0.45,
                    ease: 'power2.out',
                    onUpdate: applyTransform
                  });
                }}
                className="px-1.5 py-0.5 rounded-md hover:bg-white/10 font-bold text-white/90 cursor-pointer text-[10px]"
                title="Look Down (Table Surface)"
              >
                ▼
              </button>
              <button
                type="button"
                onPointerDown={(e) => e.stopPropagation()}
                onClick={() => {
                  if (!selectedTable) return;
                  const tx = parseFloat(selectedTable.position.left);
                  const ty = parseFloat(selectedTable.position.top);
                  panOffset.current = { x: 0, y: 0 };
                  gsap.to(transformState.current, {
                    x: 50 - tx,
                    y: 50 - ty,
                    rotX: -2.5,
                    rotY: 0,
                    duration: 0.5,
                    ease: 'power2.out',
                    onUpdate: applyTransform
                  });
                }}
                className="p-1 rounded-md hover:bg-white/10 text-white/80 cursor-pointer"
                title="Reset to Table Center"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#FABE24]" />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <div className="bg-[#2B181C]/85 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-white/15 backdrop-blur-md shadow-md">
                <Box className="w-3.5 h-3.5 text-[#FABE24]" />
                <span>{isOutdoor ? '3D Outdoor Sky Terrace' : '3D Interactive Dining Hall'}</span>
              </div>

              {/* Dining Area Toggle Pill */}
              {onToggleDiningPreference && (
                <div className="hidden sm:flex items-center bg-black/70 backdrop-blur-md rounded-full p-0.5 border border-white/20">
                  <button
                    type="button"
                    onClick={() => onToggleDiningPreference('Indoor Dining')}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                      !isOutdoor
                        ? 'bg-[#4C1824] text-white shadow-xs'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Indoor Hall
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggleDiningPreference('Outdoor Dining')}
                    className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                      isOutdoor
                        ? 'bg-[#FABE24] text-[#2B181C] shadow-xs'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Outdoor Terrace
                  </button>
                </div>
              )}

              <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium">
                <span className="w-2 h-2 rounded-full bg-[#FABE24] animate-ping" />
                <span>Click any table to zoom in & select chairs</span>
              </span>
            </div>

            <span className="text-white/80 text-xs bg-black/50 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/10 hidden md:inline-block">
              {tables.length} Tables Available (2, 4, or 6-seater)
            </span>
          </>
        )}
      </div>

      {/* Bottom Info Bar & Table Selector Pills */}
      <div className="relative z-20 p-4 sm:p-5 flex flex-col items-center gap-2.5 no-drag" onPointerDown={(e) => e.stopPropagation()}>
        {/* Table Selector Pills */}
        {!isZoomed && (
          <div className="flex items-center justify-center flex-wrap gap-2">
            {tables.map((table) => {
              const isReserved = isTableReserved(table.id);
              return (
                <button
                  key={table.id}
                  type="button"
                  disabled={isReserved}
                  onClick={() => onSelectTable(table)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 ${
                    isReserved
                      ? 'bg-black/40 text-white/40 border-white/10 cursor-not-allowed'
                      : 'bg-black/75 hover:bg-black text-[#FABE24] hover:text-white border-[#FABE24]/50 hover:border-[#FABE24] hover:scale-105 shadow-md'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${isReserved ? 'bg-white/30' : 'bg-[#FABE24]'}`} />
                  <span>{table.id} ({table.capacity}P)</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="bg-black/80 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 shadow-lg flex items-center gap-3 sm:gap-6 text-xs font-medium text-white">
          {isZoomed ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-[#FABE24]" />
              <span>Click any chair above to sit down & experience realistic 3D Diner POV (Drag to rotate 360°)</span>
            </>
          ) : (
            <>
              <span>{isOutdoor ? 'Click any table on the outdoor sky terrace to zoom in' : 'Click any table in the continuous 3D hall to zoom in'}</span>
              <span className="text-white/30">|</span>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                <span>Reserved Tables (Dimmed)</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};


export const BookTablePage = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const { bookings, addBooking } = useAppStore();
  const navigate = useNavigate();

  // Multi-step booking state (Persisted in sessionStorage so page refresh stays on current step!)
  const [currentStep, setCurrentStep] = useState(() => {
    try {
      const saved = sessionStorage.getItem('lunar_booking_step');
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem('lunar_booking_step', currentStep);
    } catch {}
  }, [currentStep]);

  // Step 1 Form Data
  const [experience, setExperience] = useState('');
  const [date, setDate] = useState('Tue, Nov 24, 2026');
  const [time, setTime] = useState('07:30 PM');
  const [diningPreference, setDiningPreference] = useState('Indoor Dining');

  // Step 2 Form Data (Seats & Table)
  const containerRef = useRef(null);
  const [viewMode, setViewMode] = useState('floor'); // 'floor' | 'table' | 'chair'
  const [activeChairSeat, setActiveChairSeat] = useState('S1');
  const [isTableSelected, setIsTableSelected] = useState(false);
  const [flyingToTable, setFlyingToTable] = useState(null);
  const [isZoomingOut, setIsZoomingOut] = useState(false);
  const [isZoomedToTable, setIsZoomedToTable] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState('T05');
  const [selectedTable, setSelectedTable] = useState('Table T05');
  const [selectedSeats, setSelectedSeats] = useState(['S1', 'S2']);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [bookingRef, setBookingRef] = useState('LNR84279');
  const [copiedRef, setCopiedRef] = useState(false);
  const [hoveredTableId, setHoveredTableId] = useState(null);

  // 3D Interactive Camera State: tilts and shifts smoothly with mouse movement
  const [tilt, setTilt] = useState({ tiltX: 0, tiltY: 0, panX: 0, panY: 0 });

  // 3D Chair POV and Collision states
  const [collisionWarning, setCollisionWarning] = useState(null);

  // Active Tables list based on Indoor vs Outdoor Dining preference
  const activeTables = diningPreference === 'Outdoor Dining' ? outdoorTables : indoorTables;

  // Current selected table object (Strictly 2, 4, 6 Seaters)
  const currentTableObj = activeTables.find((t) => t.id === selectedTableId) || activeTables[diningPreference === 'Outdoor Dining' ? 4 : 3];

  // Helper to switch dining preference and auto-pick appropriate default table
  const handleSelectDiningPreference = (pref) => {
    setDiningPreference(pref);
    if (pref === 'Outdoor Dining') {
      setSelectedTableId('T14');
      setSelectedTable('Table T14');
    } else {
      setSelectedTableId('T05');
      setSelectedTable('Table T05');
    }
    setViewMode('floor');
    setIsTableSelected(false);
  };

  // Interactive 3D Camera / Mouse Movement on Floor Overview:
  const handlePointerScrub = (e) => {
    if (viewMode !== 'floor') return;
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const tiltY = (x - 0.5) * 10;
    const tiltX = (0.5 - y) * 7;
    const panX = (0.5 - x) * 20;
    const panY = (0.5 - y) * 14;
    setTilt({ tiltX, tiltY, panX, panY });
  };

  const handlePointerLeave = () => {
    if (viewMode === 'floor') {
      setTilt({ tiltX: 0, tiltY: 0, panX: 0, panY: 0 });
    }
  };

  // Step 3 Form Data (Guest info)
  const [guestName, setGuestName] = useState(currentUser?.name || '');
  const [guestEmail, setGuestEmail] = useState(currentUser?.email || '');
  const [guestPhone, setGuestPhone] = useState(currentUser?.phone || '');
  const [specialRequests, setSpecialRequests] = useState('');

  // Dropdown open states
  const [experienceOpen, setExperienceOpen] = useState(false);
  const [dateOpen, setDateOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const location = useLocation();

  // Reset booking flow to allow fresh reservation
  const resetBookingFlow = () => {
    setCurrentStep(1);
    setViewMode('floor');
    setIsTableSelected(false);
    setIsZoomedToTable(false);
    if (diningPreference === 'Outdoor Dining') {
      setSelectedTableId('T14');
      setSelectedTable('Table T14');
    } else {
      setSelectedTableId('T05');
      setSelectedTable('Table T05');
    }
    setSelectedSeats(['S1', 'S2']);
    setActiveChairSeat('S1');
    setCollisionWarning(null);
    setConfirmedBooking(null);
    setSpecialRequests('');
    setBookingRef(`LNR${Math.floor(10000 + Math.random() * 90000)}`);
    try {
      sessionStorage.removeItem('lunar_booking_step');
      sessionStorage.setItem('lunar_booking_step', '1');
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen for reset events from Navbar or external triggers
  useEffect(() => {
    const handleReset = () => {
      resetBookingFlow();
    };
    window.addEventListener('lunar-reset-booking', handleReset);
    return () => window.removeEventListener('lunar-reset-booking', handleReset);
  }, []);

  // Reset when navigating with reset state
  useEffect(() => {
    if (location.state?.reset) {
      resetBookingFlow();
    }
  }, [location.state]);

  // Collision Detection: Prevents double booking the same table for the same Date + Time slot
  const isTableReserved = (tableId) => {
    const storeReserved = bookings?.some(
      (b) => (b.table === tableId || b.tableNo?.includes(tableId)) &&
             b.date === date &&
             b.time === time &&
             b.status !== 'Cancelled'
    );
    // Demo reservations for demo collision prevention in action
    if ((tableId === 'T02' || tableId === 'T13') && date === 'Tue, Nov 24, 2026' && time === '07:30 PM') {
      return true;
    }
    return Boolean(storeReserved);
  };

  // Table selection handler: Validates collision & opens dedicated 3D Table View
  const handleSelectTable = (table) => {
    if (isTableReserved(table.id)) {
      setCollisionWarning({
        tableName: table.name,
        time,
        date
      });
      setTimeout(() => setCollisionWarning(null), 4500);
      return;
    }

    setCollisionWarning(null);
    setSelectedTableId(table.id);
    setSelectedTable(table.name);
    // Set default seats to table capacity
    setSelectedSeats(table.seats.slice(0, Math.min(2, table.seats.length)));
    // Initiate smooth 3D camera swoop flight towards table
    setFlyingToTable(table);
  };

  const handleFlightArrival = (table) => {
    setFlyingToTable(null);
    setViewMode('table');
    setIsTableSelected(true);
  };

  // Reset to full floor overview (Smoothly flies camera back out to full terrace overview!)
  const handleResetToFloor = () => {
    setIsTableSelected(false);
    setIsZoomingOut(true);
    setViewMode('floor');
    setTilt({ tiltX: 0, tiltY: 0, panX: 0, panY: 0 });
  };

  // Chair POV Handlers (Forward view from chair matching Image 3 with LHS/RHS look-around)
  const handleOpenChairPOV = (table, seat) => {
    setSelectedTableId(table.id);
    setSelectedTable(table.name);
    setActiveChairSeat(seat);
    setViewMode('chair');
  };

  const handleConfirmFromPOV = (seat) => {
    if (!selectedSeats.includes(seat)) {
      setSelectedSeats((prev) => [...prev, seat]);
    }
    setViewMode('table');
  };

  // Seat toggle handler
  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        if (prev.length === 1) return prev; // Keep at least one seat selected
        return prev.filter((s) => s !== seatId);
      } else {
        return [...prev, seatId];
      }
    });
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText(`#${bookingRef}`);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleDownloadPDF = () => {
    window.print();
  };

  // Categorized Experiences requested: Dining Experiences (7) & Events & Celebrations (4)
  const experienceGroups = [
    {
      category: 'Dining Experiences',
      items: [
        {
          title: 'Buffet Dining',
          desc: 'An opulent spread of authentic Italian antipasti, handcrafted pastas, hot carving stations, and artisanal desserts.'
        },
        {
          title: 'Breakfast Service',
          desc: 'Artisanal Italian coffees, freshly baked cornetti, farm-fresh egg specialties, and house-made breakfast delicacies.'
        },
        {
          title: 'Lunch Service',
          desc: 'A refined midday dining experience featuring fresh, seasonal Italian classics, light pastas, and crisp salads.'
        },
        {
          title: 'Dinner Service',
          desc: 'Experience an elegant evening with authentic Italian cuisine, aged steaks, fresh seafood, and warm hospitality.'
        },
        {
          title: 'Brunch Service',
          desc: 'Delightful artisanal weekend brunch featuring Bellinis, fresh burrata, signature pastries, and chef specialties.'
        },
        {
          title: 'Outdoor Dining',
          desc: 'Al fresco dining under the stars in our lush garden terrace with fresh breezes and ambient candlelight.'
        },
        {
          title: 'Private Dining',
          desc: 'Exclusive private dining room with dedicated sommelier service, custom tasting menus, and intimate privacy.'
        }
      ]
    },
    {
      category: 'Events & Celebrations',
      items: [
        {
          title: 'Candlelight Dinner',
          desc: 'An intimate, curated romantic dining experience with ambient candlelight, rose petals, and sommelier wine pairings.'
        },
        {
          title: 'Anniversary Celebration',
          desc: 'Celebrate your milestone love story with personalized table decor, complimentary champagne, and commemorative dessert.'
        },
        {
          title: 'Birthday Celebration',
          desc: 'A joyful culinary celebration with custom birthday dessert, festive atmosphere, and special chef surprise touches.'
        },
        {
          title: 'Live Cooking',
          desc: 'Interactive culinary spectacle with our master chefs preparing flambéed pasta and signature dishes right by your table.'
        }
      ]
    }
  ];

  // Flat list of all experiences for easy lookup
  const allExperiences = experienceGroups.flatMap((group) => group.items);
  const currentExperienceObj = allExperiences.find((e) => e.title === experience) || null;

  // Interactive Monthly Calendar State
  const [calendarYear, setCalendarYear] = useState(2026);
  const [calendarMonth, setCalendarMonth] = useState(10); // 10 = November (0-indexed)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const prevMonth = (e) => {
    e.stopPropagation();
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear((y) => y - 1);
    } else {
      setCalendarMonth((m) => m - 1);
    }
  };

  const nextMonth = (e) => {
    e.stopPropagation();
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear((y) => y + 1);
    } else {
      setCalendarMonth((m) => m + 1);
    }
  };

  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(calendarYear, calendarMonth, 1).getDay(); // 0 = Sun, 1 = Mon...

  // Operating Hours from 9:00 AM to 10:00 PM grouped by dining session
  const timeSlots = {
    morning: [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'
    ],
    afternoon: [
      '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM',
      '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
    ],
    evening: [
      '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM',
      '07:30 PM', '08:00 PM', '08:30 PM', '09:00 PM', '09:30 PM', '10:00 PM'
    ]
  };

  const guestOptions = ['1 Guest', '2 Guests', '4 Guests', '6 Guests', '8+ Guests'];

  const availableTables = [
    { id: 'Table 02 - Corner Booth', name: 'Table 02 - Corner Booth', desc: 'Quiet & intimate corner with plush velvet seating', seats: '2-3 Guests' },
    { id: 'Table 04 - Window View', name: 'Table 04 - Window View', desc: 'Overlooks the city garden lights with romantic candlelight', seats: '2-4 Guests' },
    { id: 'Table 07 - Central Dining', name: 'Table 07 - Central Dining', desc: 'Grand ambience near the open pastry kitchen', seats: '4-6 Guests' },
    { id: 'Table 11 - Private Alcove', name: 'Table 11 - Private Alcove', desc: 'Curated secluded setting for celebrations & dates', seats: '2-6 Guests' },
  ];

  const handleConfirmReservation = (e) => {
    if (e) e.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to Lunar's reservation policies and terms to continue.");
      return;
    }
    const newRef = 'LNR' + Math.floor(10000 + Math.random() * 90000);
    setBookingRef(newRef);

    const bookingData = {
      id: generateBookingId(),
      bookingRef: newRef,
      userId: currentUser?.id || 'guest-' + Date.now(),
      customerName: guestName || 'Kuruva Mahesh',
      email: guestEmail || 'mahesh.kuruva@email.com',
      contactNumber: guestPhone || '+91 98765 43210',
      experience: experience || 'Dinner Service',
      date,
      time,
      diningPreference: diningPreference === 'Outdoor Dining' ? 'Outdoor Terrace' : 'Main Dining',
      table: currentTableObj.id,
      tableNo: currentTableObj.name,
      tableDetails: {
        name: currentTableObj.name,
        capacity: `${currentTableObj.capacity} Seats`,
        area: currentTableObj.area,
        image: currentTableObj.image
      },
      seats: selectedSeats.sort(),
      guests: `${selectedSeats.length || currentTableObj.capacity} People`,
      specialRequests: specialRequests || 'Birthday celebration setup, if possible.',
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    try {
      addBooking(bookingData);
    } catch (err) {
      console.warn('Booking stored locally:', err);
    }
    setConfirmedBooking(bookingData);
    window.scrollTo({ top: 80, behavior: 'smooth' });
    setCurrentStep(4);
  };

  return (
    <div className="w-full bg-[#FAF7F2] text-[#2B181C] font-hanken min-h-screen flex flex-col justify-between">
      {/* 8-Step Customer Portal Flow Navigation */}
      <CustomerPortalFlowBar currentStep="book-table" />
      
      {/* Main Content Area */}
      <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* ========================================================
            1. Stepper Progress Bar matching Reference Design
            4 Steps: 1. Reservation Details | 2. Select Seats | 3. Your Details | 4. Confirmation
           ======================================================== */}
        <div className="max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="flex items-center justify-between relative">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center relative z-10">
              <div 
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-[13px] font-semibold transition-all duration-300 ${
                  currentStep >= 1
                    ? 'bg-[#4C1824] text-white shadow-sm'
                    : 'bg-white border border-[#D1C0B4] text-[#8A6B63]'
                }`}
              >
                {currentStep > 1 ? (
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                ) : (
                  1
                )}
              </div>
              <span className={`text-[11px] sm:text-[13px] mt-2 font-medium transition-colors ${
                currentStep === 1 ? 'text-[#2B181C] font-bold' : 'text-[#8A6B63]'
              }`}>
                Reservation Details
              </span>
            </div>

            {/* Connecting Line 1-2 */}
            <div className="flex-1 h-[1.5px] bg-[#E5D7CB] -mt-5 mx-2 sm:mx-3" />

            {/* Step 2 */}
            <div className="flex flex-col items-center relative z-10">
              <div 
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-[13px] font-semibold transition-all duration-300 ${
                  currentStep >= 2
                    ? 'bg-[#4C1824] text-white shadow-sm'
                    : 'bg-white border border-[#D1C0B4] text-[#8A6B63]'
                }`}
              >
                {currentStep > 2 ? (
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                ) : (
                  2
                )}
              </div>
              <span className={`text-[11px] sm:text-[13px] mt-2 font-medium transition-colors ${
                currentStep === 2 ? 'text-[#2B181C] font-bold' : 'text-[#8A6B63]'
              }`}>
                Select Seats
              </span>
            </div>

            {/* Connecting Line 2-3 */}
            <div className="flex-1 h-[1.5px] bg-[#E5D7CB] -mt-5 mx-2 sm:mx-3" />

            {/* Step 3 */}
            <div className="flex flex-col items-center relative z-10">
              <div 
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-[13px] font-semibold transition-all duration-300 ${
                  currentStep >= 3
                    ? 'bg-[#4C1824] text-white shadow-sm'
                    : 'bg-white border border-[#D1C0B4] text-[#8A6B63]'
                }`}
              >
                {currentStep > 3 ? (
                  <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                ) : (
                  3
                )}
              </div>
              <span className={`text-[11px] sm:text-[13px] mt-2 font-medium transition-colors ${
                currentStep === 3 ? 'text-[#2B181C] font-bold' : 'text-[#8A6B63]'
              }`}>
                Your Details
              </span>
            </div>

            {/* Connecting Line 3-4 */}
            <div className="flex-1 h-[1.5px] bg-[#E5D7CB] -mt-5 mx-2 sm:mx-3" />

            {/* Step 4 */}
            <div className="flex flex-col items-center relative z-10">
              <div 
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-[13px] font-semibold transition-all duration-300 ${
                  currentStep === 4
                    ? 'bg-[#4C1824] text-white shadow-sm'
                    : 'bg-white border border-[#D1C0B4] text-[#8A6B63]'
                }`}
              >
                4
              </div>
              <span className={`text-[11px] sm:text-[13px] mt-2 font-medium transition-colors ${
                currentStep === 4 ? 'text-[#2B181C] font-bold' : 'text-[#8A6B63]'
              }`}>
                Confirmation
              </span>
            </div>

          </div>
        </div>

        {/* ========================================================
            2. Centered Header: Exact Styling per Step
           ======================================================== */}
        {currentStep < 4 && (
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12">
            {currentStep === 1 && (
              <>
                <div className="w-12 h-1 bg-[#FABE24] rounded-full mx-auto mb-4" />
                <h1 className="font-hanken text-3xl sm:text-4xl md:text-[42px] font-bold text-[#4C1824] tracking-tight leading-tight mb-3">
                  Plan Your Visit
                </h1>
                <p className="text-sm sm:text-base text-[#7A5B53] font-normal leading-relaxed">
                  Let us know when you'd like to dine and we'll show you the best available tables.
                </p>
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="w-12 h-0.5 bg-[#B58237] mx-auto mb-3" />
                <h1 className="font-hanken text-3xl sm:text-4xl md:text-[42px] font-bold text-[#2B181C] tracking-tight leading-tight mb-3">
                  Select Your Seats
                </h1>
                <p className="text-sm sm:text-base text-[#7A5B53] font-normal leading-relaxed">
                  Explore the restaurant, choose a table and select your preferred seats.
                </p>
              </>
            )}

            {currentStep === 3 && (
              <>
                <span className="text-xs font-bold tracking-widest text-[#B58237] uppercase mb-2 block">
                  ALMOST THERE
                </span>
                <h1 className="font-hanken text-3xl sm:text-4xl md:text-[42px] font-bold text-[#2B181C] tracking-tight leading-tight mb-3">
                  Complete Your Reservation
                </h1>
                <p className="text-sm sm:text-base text-[#7A5B53] font-normal leading-relaxed">
                  Just a few details and your table at Lunar will be ready.
                </p>
              </>
            )}
          </div>
        )}

        {/* ========================================================
            3. MAIN CONTENT: STEP 1 (Matches Exact User Screenshot)
           ======================================================== */}
        {currentStep === 1 && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-stretch">
              
              {/* LHS CARD: Reservation Details (col-span-7) */}
              <div className="lg:col-span-7 bg-white rounded-[26px] sm:rounded-[28px] border border-[#EADBCC] p-6 sm:p-8 shadow-xs flex flex-col justify-between h-full">
                
                {/* Header Row */}
                <div className="flex items-center gap-3 mb-6 sm:mb-7">
                  <div className="w-8 h-8 rounded-lg bg-[#FAF5EE] flex items-center justify-center text-[#4C1824] border border-[#EADBCC]">
                    <Calendar className="w-4 h-4 text-[#4C1824]" />
                  </div>
                  <h2 className="font-hanken font-bold text-xl sm:text-[22px] text-[#2B181C]">
                    Reservation Details
                  </h2>
                </div>

                {/* Field 1: Selected Experience */}
                <div className="relative mb-6">
                  <label className="block text-xs sm:text-[13px] font-semibold text-[#2B181C] mb-2">
                    Selected Experience
                  </label>
                  
                  {/* Select Trigger */}
                  <button
                    type="button"
                    onClick={() => {
                      setExperienceOpen(!experienceOpen);
                      setDateOpen(false);
                      setTimeOpen(false);
                    }}
                    className={`w-full bg-[#FAF5EE] hover:bg-[#F5ECE2] border rounded-2xl px-4 py-3.5 flex items-center justify-between text-left transition-colors cursor-pointer ${
                      experience ? 'border-[#EADBCC]' : 'border-[#C8A095] ring-2 ring-[#4C1824]/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <UtensilsCrossed className="w-4 h-4 text-[#4C1824]" />
                      <span className={`text-sm font-semibold ${experience ? 'text-[#2B181C]' : 'text-[#8A6B63]'}`}>
                        {experience || 'Select an Experience...'}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#7A5B53] transition-transform duration-200 ${experienceOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {experienceOpen && (
                    <>
                      {/* Transparent backdrop to close dropdown on outside click */}
                      <div 
                        className="fixed inset-0 z-30" 
                        onClick={() => setExperienceOpen(false)} 
                      />
                      
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-[#EADBCC] shadow-2xl z-40 py-2.5 max-h-[420px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 divide-y divide-[#F0E5D8]">
                        {experienceGroups.map((group, groupIdx) => (
                          <div key={group.category} className={groupIdx > 0 ? 'pt-3 mt-1' : ''}>
                            {/* Group Header Badge */}
                            <div className="px-4 py-1.5 flex items-center justify-between">
                              <span className="font-hanken font-bold text-xs uppercase tracking-wider text-[#4C1824] bg-[#FAF5EE] px-3 py-1 rounded-full border border-[#EADBCC]">
                                {group.category}
                              </span>
                              <span className="text-[11px] font-medium text-[#8A6B63]">
                                {group.items.length} Options
                              </span>
                            </div>

                            {/* Group Items */}
                            <div className="mt-1.5 space-y-0.5">
                              {group.items.map((exp, itemIdx) => {
                                const isSelected = experience === exp.title;
                                return (
                                  <button
                                    key={exp.title}
                                    type="button"
                                    onClick={() => {
                                      setExperience(exp.title);
                                      setExperienceOpen(false);
                                    }}
                                    className={`w-full px-4 py-2.5 text-left flex items-start gap-2.5 hover:bg-[#FAF5EE] transition-colors cursor-pointer group ${
                                      isSelected ? 'bg-[#FAF5EE]' : ''
                                    }`}
                                  >
                                    <span className="font-mono text-xs font-bold text-[#8A6B63] mt-0.5 w-4 flex-shrink-0">
                                      {itemIdx + 1}.
                                    </span>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between">
                                        <span className={`text-sm font-semibold transition-colors ${
                                          isSelected ? 'text-[#4C1824]' : 'text-[#2B181C] group-hover:text-[#4C1824]'
                                        }`}>
                                          {exp.title}
                                        </span>
                                        {isSelected && (
                                          <span className="w-2 h-2 rounded-full bg-[#4C1824]" />
                                        )}
                                      </div>
                                      <span className="text-xs text-[#7A5B53] line-clamp-1 block mt-0.5">
                                        {exp.desc}
                                      </span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Helper description under experience */}
                  <p className="text-xs text-[#7A5B53] mt-2 leading-relaxed">
                    {currentExperienceObj
                      ? currentExperienceObj.desc
                      : 'Please choose your preferred dining style or celebration to view the reservation preview.'}
                  </p>
                </div>

                {/* Field 2 & 3: Side by Side (Reservation Date & Preferred Time) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  
                  {/* Reservation Date */}
                  <div className="relative">
                    <label className="block text-xs sm:text-[13px] font-semibold text-[#2B181C] mb-2">
                      Reservation Date
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setDateOpen(!dateOpen);
                        setExperienceOpen(false);
                        setTimeOpen(false);
                      }}
                      className="w-full bg-[#FAF5EE] hover:bg-[#F5ECE2] border border-[#EADBCC] rounded-2xl px-4 py-3.5 flex items-center justify-between text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-[#4C1824]" />
                        <span className="text-xs sm:text-[13px] font-medium text-[#2B181C]">
                          {date}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-[#7A5B53] transition-transform duration-200 ${dateOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Interactive Calendar Popdown */}
                    {dateOpen && (
                      <>
                        <div className="fixed inset-0 z-30" onClick={() => setDateOpen(false)} />
                        <div className="absolute top-full left-0 mt-2 bg-white rounded-3xl border border-[#EADBCC] shadow-2xl z-40 p-4 sm:p-5 w-[320px] sm:w-[350px] animate-in fade-in slide-in-from-top-2 duration-200">
                          
                          {/* Month & Year Navigation Header */}
                          <div className="flex items-center justify-between mb-3.5 pb-2.5 border-b border-[#F0E5D8]">
                            <button
                              type="button"
                              onClick={prevMonth}
                              className="w-8 h-8 rounded-full bg-[#FAF5EE] hover:bg-[#F2E8DC] flex items-center justify-center text-[#4C1824] transition-colors cursor-pointer"
                              aria-label="Previous Month"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            
                            <div className="text-center">
                              <span className="font-hanken font-bold text-sm sm:text-base text-[#2B181C]">
                                {monthNames[calendarMonth]} {calendarYear}
                              </span>
                            </div>

                            <button
                              type="button"
                              onClick={nextMonth}
                              className="w-8 h-8 rounded-full bg-[#FAF5EE] hover:bg-[#F2E8DC] flex items-center justify-center text-[#4C1824] transition-colors cursor-pointer"
                              aria-label="Next Month"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Weekdays Header */}
                          <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((dName, idx) => (
                              <div 
                                key={dName} 
                                className={`text-[11px] font-bold py-1 ${
                                  idx === 1 ? 'text-[#C94A4A]' : 'text-[#8A6B63]'
                                }`}
                              >
                                {dName}
                              </div>
                            ))}
                          </div>

                          {/* Calendar Days Grid */}
                          <div className="grid grid-cols-7 gap-1 text-center">
                            {/* Blank days before start of month */}
                            {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                              <div key={`empty-${i}`} className="h-9 w-9" />
                            ))}

                            {/* Days of month */}
                            {Array.from({ length: daysInMonth }).map((_, i) => {
                              const dayNumber = i + 1;
                              const cellDate = new Date(calendarYear, calendarMonth, dayNumber);
                              const dayOfWeek = cellDate.getDay();
                              const isMonday = dayOfWeek === 1;
                              
                              const dateString = cellDate.toLocaleDateString('en-US', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              });
                              const isSelected = date === dateString;

                              if (isMonday) {
                                return (
                                  <div
                                    key={dayNumber}
                                    title="Restaurant is closed on Mondays"
                                    className="h-9 w-9 mx-auto rounded-full flex flex-col items-center justify-center bg-[#FAF5EE]/50 text-[#C94A4A]/50 text-xs font-medium cursor-not-allowed select-none relative"
                                  >
                                    <span className="line-through">{dayNumber}</span>
                                    <span className="text-[7.5px] font-bold text-[#C94A4A] absolute -bottom-0.5 leading-none">Off</span>
                                  </div>
                                );
                              }

                              return (
                                <button
                                  key={dayNumber}
                                  type="button"
                                  onClick={() => {
                                    setDate(dateString);
                                    setDateOpen(false);
                                  }}
                                  className={`h-9 w-9 mx-auto rounded-full flex items-center justify-center text-xs font-semibold transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#4C1824] text-white shadow-md scale-105 font-bold'
                                      : 'text-[#2B181C] hover:bg-[#FAF5EE] hover:text-[#4C1824] hover:border hover:border-[#EADBCC]'
                                  }`}
                                >
                                  {dayNumber}
                                </button>
                              );
                            })}
                          </div>

                          {/* Calendar Footer Info Note */}
                          <div className="mt-3.5 pt-2.5 border-t border-[#F0E5D8] flex items-center justify-between text-[11px]">
                            <div className="flex items-center gap-1.5 text-[#C94A4A] font-semibold">
                              <span className="w-2 h-2 rounded-full bg-[#C94A4A]" />
                              <span>Monday: Closed (Off)</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const today = new Date();
                                const pickDay = today.getDay() === 1 ? new Date(today.getTime() + 86400000) : today;
                                setCalendarYear(pickDay.getFullYear());
                                setCalendarMonth(pickDay.getMonth());
                                setDate(pickDay.toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric'
                                }));
                                setDateOpen(false);
                              }}
                              className="text-[#4C1824] font-bold hover:underline cursor-pointer"
                            >
                              Select Today
                            </button>
                          </div>

                        </div>
                      </>
                    )}
                  </div>

                  {/* Preferred Time: 9:00 AM to 10:00 PM */}
                  <div className="relative">
                    <label className="block text-xs sm:text-[13px] font-semibold text-[#2B181C] mb-2">
                      Preferred Time
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setTimeOpen(!timeOpen);
                        setExperienceOpen(false);
                        setDateOpen(false);
                      }}
                      className="w-full bg-[#FAF5EE] hover:bg-[#F5ECE2] border border-[#EADBCC] rounded-2xl px-4 py-3.5 flex items-center justify-between text-left transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-[#4C1824]" />
                        <span className="text-xs sm:text-[13px] font-medium text-[#2B181C]">
                          {time}
                        </span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-[#7A5B53] transition-transform duration-200 ${timeOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Grouped Operating Hours Time Picker Popdown */}
                    {timeOpen && (
                      <>
                        <div className="fixed inset-0 z-30" onClick={() => setTimeOpen(false)} />
                        <div className="absolute top-full left-0 sm:left-auto sm:right-0 mt-2 bg-white rounded-3xl border border-[#EADBCC] shadow-2xl z-40 p-4 w-[320px] sm:w-[360px] animate-in fade-in slide-in-from-top-2 duration-200">
                          
                          {/* Header with operating hours info */}
                          <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-[#F0E5D8]">
                            <div>
                              <span className="font-hanken font-bold text-xs uppercase tracking-wider text-[#4C1824] block">
                                Operating Hours
                              </span>
                              <span className="text-[11px] text-[#7A5B53]">
                                9:00 AM – 10:00 PM Daily (Tue–Sun)
                              </span>
                            </div>
                            <span className="bg-[#FAF5EE] text-[#4C1824] text-[11px] font-bold px-2.5 py-1 rounded-full border border-[#EADBCC]">
                              {time}
                            </span>
                          </div>

                          <div className="max-h-[340px] overflow-y-auto pr-1 space-y-3.5">
                            
                            {/* 1. Morning (09:00 AM - 11:30 AM) */}
                            <div>
                              <div className="flex items-center gap-1.5 text-xs font-bold text-[#4C1824] mb-2">
                                <Sun className="w-3.5 h-3.5 text-[#FABE24]" />
                                <span>Morning (09:00 AM – 11:30 AM)</span>
                              </div>
                              <div className="grid grid-cols-3 gap-1.5">
                                {timeSlots.morning.map((t) => (
                                  <button
                                    key={t}
                                    type="button"
                                    onClick={() => {
                                      setTime(t);
                                      setTimeOpen(false);
                                    }}
                                    className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                      time === t
                                        ? 'bg-[#4C1824] text-white shadow-sm font-bold'
                                        : 'bg-[#FAF5EE] text-[#2B181C] hover:bg-[#F2E8DC] border border-[#EADBCC]'
                                    }`}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* 2. Afternoon / Lunch (12:00 PM - 04:30 PM) */}
                            <div className="pt-2 border-t border-[#F0E5D8]">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-[#4C1824] mb-2">
                                <Sun className="w-3.5 h-3.5 text-[#E68A00]" />
                                <span>Afternoon (12:00 PM – 04:30 PM)</span>
                              </div>
                              <div className="grid grid-cols-3 gap-1.5">
                                {timeSlots.afternoon.map((t) => (
                                  <button
                                    key={t}
                                    type="button"
                                    onClick={() => {
                                      setTime(t);
                                      setTimeOpen(false);
                                    }}
                                    className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                      time === t
                                        ? 'bg-[#4C1824] text-white shadow-sm font-bold'
                                        : 'bg-[#FAF5EE] text-[#2B181C] hover:bg-[#F2E8DC] border border-[#EADBCC]'
                                    }`}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* 3. Evening & Dinner (05:00 PM - 10:00 PM) */}
                            <div className="pt-2 border-t border-[#F0E5D8]">
                              <div className="flex items-center gap-1.5 text-xs font-bold text-[#4C1824] mb-2">
                                <Moon className="w-3.5 h-3.5 text-[#4C1824]" />
                                <span>Evening & Dinner (05:00 PM – 10:00 PM)</span>
                              </div>
                              <div className="grid grid-cols-3 gap-1.5">
                                {timeSlots.evening.map((t) => (
                                  <button
                                    key={t}
                                    type="button"
                                    onClick={() => {
                                      setTime(t);
                                      setTimeOpen(false);
                                    }}
                                    className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                                      time === t
                                        ? 'bg-[#4C1824] text-white shadow-sm font-bold'
                                        : 'bg-[#FAF5EE] text-[#2B181C] hover:bg-[#F2E8DC] border border-[#EADBCC]'
                                    }`}
                                  >
                                    {t}
                                  </button>
                                ))}
                              </div>
                            </div>

                          </div>

                        </div>
                      </>
                    )}
                  </div>

                </div>

                {/* Field 4: Dining Preference (Indoor vs Outdoor) */}
                <div>
                  <div className="flex items-center gap-2 mb-2.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#4C1824]">
                      <path d="M4 10a8 8 0 0 1 16 0H4z" />
                      <path d="M12 10v11" />
                      <path d="M7 16h10" />
                      <path d="M9 21h6" />
                    </svg>
                    <label className="text-xs sm:text-[13px] font-semibold text-[#2B181C]">
                      Dining Preference
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    
                    {/* Option 1: Indoor Dining */}
                    <button
                      type="button"
                      onClick={() => handleSelectDiningPreference('Indoor Dining')}
                      className={`rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center transition-all cursor-pointer border ${
                        diningPreference === 'Indoor Dining'
                          ? 'bg-[#FAF6F0] border-[#C8A095] ring-2 ring-[#4C1824]/20 shadow-xs'
                          : 'bg-[#FAF6F0]/60 border-[#EADBCC] hover:bg-[#FAF6F0]'
                      }`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#4C1824] mb-2.5">
                        <path d="M3 9h18v2H3z" />
                        <path d="M6 11v8" />
                        <path d="M18 11v8" />
                        <path d="M4 6h16" />
                      </svg>
                      <span className="font-semibold text-sm text-[#2B181C] mb-1">
                        Indoor Dining
                      </span>
                      <span className="text-[11.5px] text-[#7A5B53] leading-relaxed max-w-[200px]">
                        A comfortable dining experience in a warm ambience.
                      </span>
                    </button>

                    {/* Option 2: Outdoor Dining */}
                    <button
                      type="button"
                      onClick={() => handleSelectDiningPreference('Outdoor Dining')}
                      className={`rounded-2xl p-4 sm:p-5 text-center flex flex-col items-center justify-center transition-all cursor-pointer border ${
                        diningPreference === 'Outdoor Dining'
                          ? 'bg-[#FAF6F0] border-[#C8A095] ring-2 ring-[#4C1824]/20 shadow-xs'
                          : 'bg-[#FAF6F0]/60 border-[#EADBCC] hover:bg-[#FAF6F0]'
                      }`}
                    >
                      <Umbrella className="w-6 h-6 text-[#4C1824] mb-2.5" />
                      <span className="font-semibold text-sm text-[#2B181C] mb-1">
                        Outdoor Dining
                      </span>
                      <span className="text-[11.5px] text-[#7A5B53] leading-relaxed max-w-[200px]">
                        Dine in our beautiful outdoor setting.
                      </span>
                    </button>

                  </div>
                </div>

              </div>

              {/* RHS CARD: Your Selection (col-span-5) */}
              <div className="lg:col-span-5 bg-white rounded-[26px] sm:rounded-[28px] border border-[#EADBCC] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full transition-all duration-300">
                
                {!experience ? (
                  /* Empty state when experience is not selected yet */
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-8 min-h-[420px] animate-in fade-in zoom-in-95 duration-300">
                    {/* Illustration Icon */}
                    <div className="relative mb-6">
                      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-[#FAF5EE] to-[#F3E7D9] border-2 border-dashed border-[#D4ADA3] flex items-center justify-center mx-auto shadow-inner">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white flex items-center justify-center shadow-xs">
                          <UtensilsCrossed className="w-7 h-7 sm:w-8 sm:h-8 text-[#4C1824]" />
                        </div>
                      </div>
                      <div className="absolute top-0 right-0 w-7 h-7 rounded-full bg-[#FAF0E1] border border-[#FABE24]/70 flex items-center justify-center text-[#FABE24] shadow-xs">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Illustration Message Requested by User */}
                    <h3 className="font-hanken font-bold text-lg sm:text-xl text-[#2B181C] mb-2">
                      Preview is not available
                    </h3>
                    <p className="text-xs sm:text-sm text-[#7A5B53] max-w-[270px] mx-auto leading-relaxed mb-6">
                      Please select an experience to preview your reservation details.
                    </p>

                    {/* Status Pill */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF5EE] border border-[#EADBCC] text-xs font-medium text-[#8A6B63]">
                      <span className="w-2 h-2 rounded-full bg-[#4C1824] animate-pulse" />
                      <span>Select Experience in Step 1</span>
                    </div>
                  </div>
                ) : (
                  /* Live Populated Selection Details when experience is selected */
                  <div className="flex flex-col justify-between h-full animate-in fade-in duration-300">
                    <div>
                      {/* Dining Selection Photo */}
                      <div className="rounded-[20px] overflow-hidden aspect-[16/10] sm:aspect-[4/3] max-h-[250px] bg-[#EFE5DB] mb-5 shadow-xs">
                        <img
                          src="/reservation-selection.jpg"
                          alt="Fine dining experience at Lunar"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Card Title */}
                      <h3 className="font-hanken font-bold text-xl text-[#2B181C] mb-4">
                        Your Selection
                      </h3>
                    </div>

                    {/* Key-Value Summary List */}
                    <div className="space-y-3.5 text-xs sm:text-[13px]">
                      
                      {/* Experience */}
                      <div className="flex items-center justify-between py-1 border-b border-[#F0E5D8]/70">
                        <div className="flex items-center gap-2 text-[#7A5B53]">
                          <UtensilsCrossed className="w-4 h-4 text-[#4C1824]" />
                          <span>Experience</span>
                        </div>
                        <span className="font-semibold text-[#2B181C]">{experience}</span>
                      </div>

                      {/* Date */}
                      <div className="flex items-center justify-between py-1 border-b border-[#F0E5D8]/70">
                        <div className="flex items-center gap-2 text-[#7A5B53]">
                          <Calendar className="w-4 h-4 text-[#4C1824]" />
                          <span>Date</span>
                        </div>
                        <span className="font-semibold text-[#2B181C]">{date}</span>
                      </div>

                      {/* Time */}
                      <div className="flex items-center justify-between py-1 border-b border-[#F0E5D8]/70">
                        <div className="flex items-center gap-2 text-[#7A5B53]">
                          <Clock className="w-4 h-4 text-[#4C1824]" />
                          <span>Time</span>
                        </div>
                        <span className="font-semibold text-[#2B181C]">{time}</span>
                      </div>

                      {/* Dining Preference */}
                      <div className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2 text-[#7A5B53]">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#4C1824]">
                            <path d="M4 10a8 8 0 0 1 16 0H4z" />
                            <path d="M12 10v11" />
                            <path d="M7 16h10" />
                            <path d="M9 21h6" />
                          </svg>
                          <span>Dining Preference</span>
                        </div>
                        <span className="font-semibold text-[#2B181C]">{diningPreference}</span>
                      </div>

                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Bottom Action Bar: Explore Available Tables Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                disabled={!experience}
                onClick={() => {
                  if (!experience) return;
                  if (diningPreference === 'Outdoor Dining') {
                    setSelectedTableId('T14');
                    setSelectedTable('Table T14');
                  } else {
                    setSelectedTableId('T05');
                    setSelectedTable('Table T05');
                  }
                  setViewMode('floor');
                  setIsTableSelected(false);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                  setCurrentStep(2);
                }}
                className={`font-medium text-sm sm:text-[15px] px-8 py-3.5 rounded-full shadow-md transition-all duration-200 flex items-center gap-2 ${
                  experience
                    ? 'bg-[#4C1824] hover:bg-[#38111A] text-white hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                    : 'bg-[#4C1824]/40 text-white/70 cursor-not-allowed shadow-none'
                }`}
              >
                <span>Explore Available Tables</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            4. STEP 2: SELECT SEATS & TABLE (3D Video + Interactive Tables)
           ======================================================== */}
        {currentStep === 2 && (
          <div className="max-w-6xl mx-auto animate-in fade-in duration-300">
            {/* Collision Warning Banner */}
            {collisionWarning && (
              <div className="mb-4 bg-amber-50 border border-amber-300 text-amber-900 rounded-2xl p-4 flex items-center gap-3 animate-in slide-in-from-top-2 shadow-sm">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold">{collisionWarning.tableName}</span> is already reserved for <span className="font-semibold">{collisionWarning.date}</span> at <span className="font-semibold">{collisionWarning.time}</span>. Please choose another table or time slot.
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-stretch">
              
              {/* Left Column (Full-Width col-span-12 during floor overview & table zoom; col-span-7 ONLY when seated in chair POV!) */}
              <div className={`transition-all duration-500 ease-in-out ${
                viewMode === 'chair' ? 'lg:col-span-7' : 'lg:col-span-12'
              }`}>
                {viewMode === 'chair' ? (
                  <Chair3DViewInside
                    table={currentTableObj}
                    seat={activeChairSeat}
                    onBack={() => setViewMode('table')}
                    onConfirmSeat={handleConfirmFromPOV}
                  />
                ) : (
                  <Continuous3DHallScene
                    tables={activeTables}
                    selectedTable={currentTableObj}
                    viewMode={viewMode}
                    selectedSeats={selectedSeats}
                    onSelectTable={handleSelectTable}
                    onSelectChair={(seat) => {
                      setActiveChairSeat(seat);
                      setViewMode('chair');
                    }}
                    onBackToFloor={handleResetToFloor}
                    isTableReserved={isTableReserved}
                    time={time}
                    hoveredTableId={hoveredTableId}
                    setHoveredTableId={setHoveredTableId}
                    diningPreference={diningPreference}
                    onToggleDiningPreference={handleSelectDiningPreference}
                    flyingToTable={flyingToTable}
                    onFlightArrival={handleFlightArrival}
                    isZoomingOut={isZoomingOut}
                    setIsZoomingOut={setIsZoomingOut}
                  />
                )}
              </div>

              {/* Right Column (col-span-5): Revealed ONLY in chair POV mode! */}
              {viewMode === 'chair' && (
                <div className="lg:col-span-5 bg-white rounded-[28px] border border-[#EADBCC] p-6 sm:p-7 shadow-xs flex flex-col justify-between h-full animate-in fade-in slide-in-from-right-4 duration-300">
                  
                  <div className="space-y-6">
                    {/* Section 1: Your Reservation */}
                    <div>
                      <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-[#F0E5D8]">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#4C1824]" />
                          <h3 className="font-hanken font-bold text-base text-[#2B181C]">
                            Your Reservation
                          </h3>
                        </div>
                        <span className="text-[11px] font-semibold text-[#4C1824] bg-[#FAF5EE] px-2.5 py-0.5 rounded-full border border-[#EADBCC]">
                          {currentTableObj.type}
                        </span>
                      </div>

                      <div className="space-y-3 text-xs sm:text-[13px]">
                        <div className="flex items-center justify-between py-1 border-b border-[#F0E5D8]/70">
                          <span className="text-[#7A5B53]">Experience</span>
                          <span className="font-semibold text-[#2B181C]">{experience || 'Dinner Service'}</span>
                        </div>

                        <div className="flex items-center justify-between py-1 border-b border-[#F0E5D8]/70">
                          <span className="text-[#7A5B53]">Date</span>
                          <span className="font-semibold text-[#2B181C]">{date}</span>
                        </div>

                        <div className="flex items-center justify-between py-1 border-b border-[#F0E5D8]/70">
                          <span className="text-[#7A5B53]">Time</span>
                          <span className="font-semibold text-[#2B181C]">{time}</span>
                        </div>

                        <div className="flex items-center justify-between py-1 border-b border-[#F0E5D8]/70">
                          <span className="text-[#7A5B53]">Party Size</span>
                          <span className="font-semibold text-[#2B181C]">{selectedSeats.length || currentTableObj.capacity} People</span>
                        </div>

                        <div className="flex items-center justify-between py-1">
                          <span className="text-[#7A5B53]">Dining Area</span>
                          <span className="font-semibold text-[#2B181C]">
                            {currentTableObj.area}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Selected Table */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#4C1824]">
                          <path d="M3 8h18" />
                          <path d="M5 8v10" />
                          <path d="M19 8v10" />
                          <path d="M7 8v4" />
                          <path d="M17 8v4" />
                        </svg>
                        <h4 className="font-hanken font-bold text-sm text-[#2B181C]">
                          Selected Table
                        </h4>
                      </div>

                      <div className="bg-[#FAF5EE] rounded-2xl p-3 border border-[#EADBCC] flex items-center gap-3.5 shadow-2xs">
                        <div className="w-16 h-14 rounded-xl overflow-hidden bg-cover bg-center shrink-0 border border-[#EADBCC]">
                          <img
                            src={currentTableObj.image}
                            alt={currentTableObj.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h5 className="font-bold text-sm text-[#2B181C]">
                              {currentTableObj.name}
                            </h5>
                            <span className="text-[11px] font-bold text-[#4C1824] bg-white px-2 py-0.5 rounded-md border border-[#EADBCC]">
                              {currentTableObj.capacity} Seats
                            </span>
                          </div>
                          <p className="text-[11.5px] text-[#7A5B53] line-clamp-1 mt-0.5">
                            {currentTableObj.desc}
                          </p>
                          <p className="text-[11px] text-[#8A6B63] mt-0.5">
                            {currentTableObj.area}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Select Seats (Dynamically adapts to 2, 4, or 6 Seater capacity!) */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#4C1824]">
                            <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                            <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
                            <path d="M5 18v3" />
                            <path d="M19 18v3" />
                          </svg>
                          <h4 className="font-hanken font-bold text-sm text-[#2B181C]">
                            Select Seats
                          </h4>
                        </div>
                        <span className="text-[11px] text-[#8A6B63]">
                          Click eye icon to view 3D Chair POV
                        </span>
                      </div>

                      {/* Seat Buttons: strictly matches table capacity (2, 4, or 6) */}
                      <div className={`grid gap-2.5 ${
                        currentTableObj.capacity === 2 ? 'grid-cols-2' :
                        currentTableObj.capacity === 4 ? 'grid-cols-4' : 'grid-cols-3 sm:grid-cols-6'
                      }`}>
                        {currentTableObj.seats.map((seat) => {
                          const isSelected = selectedSeats.includes(seat);
                          return (
                            <div key={seat} className="flex flex-col items-center">
                              <button
                                type="button"
                                onClick={() => toggleSeat(seat)}
                                className={`w-full relative rounded-2xl py-3 px-2 flex flex-col items-center justify-center transition-all cursor-pointer border ${
                                  isSelected
                                    ? 'bg-[#4C1824] text-white border-[#4C1824] shadow-sm'
                                    : 'bg-white text-[#2B181C] border-[#EADBCC] hover:bg-[#FAF5EE]'
                                }`}
                              >
                                {/* Selected Check Badge */}
                                {isSelected && (
                                  <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#4C1824] border border-white flex items-center justify-center text-white">
                                    <Check className="w-2.5 h-2.5" strokeWidth={3} />
                                  </div>
                                )}
                                {/* Chair SVG */}
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 mb-1 ${isSelected ? 'text-white' : 'text-[#7A5B53]'}`}>
                                  <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
                                  <path d="M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
                                  <path d="M5 18v3" />
                                  <path d="M19 18v3" />
                                </svg>
                                <span className="font-bold text-xs">
                                  {seat}
                                </span>
                              </button>

                              {/* Chair POV Button */}
                              <button
                                type="button"
                                onClick={() => handleOpenChairPOV(currentTableObj, seat)}
                                className="mt-1 text-[10px] text-[#4C1824] hover:text-[#2B181C] font-semibold flex items-center gap-0.5 hover:underline cursor-pointer"
                              >
                                <Eye className="w-3 h-3 text-[#B58237]" />
                                <span>3D POV</span>
                              </button>
                            </div>
                          );
                        })}
                      </div>

                      {/* Selected Seats summary text */}
                      <div className="mt-3 text-center text-xs text-[#7A5B53]">
                        <span>Selected Seats: </span>
                        <span className="font-bold text-[#2B181C]">
                          {selectedSeats.length > 0 ? selectedSeats.sort().join(', ') : 'None'}
                        </span>
                        <span className="mx-2 text-[#D1C0B4]">|</span>
                        <span>Total: </span>
                        <span className="font-bold text-[#2B181C]">{selectedSeats.length} Seats</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Action Buttons in Step 2 */}
                  <div className="mt-6 pt-4 border-t border-[#F0E5D8] flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                        setCurrentStep(1);
                      }}
                      className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-[#2B181C] border border-[#2B181C] hover:bg-[#FAF5EE] flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        window.scrollTo({ top: 120, behavior: 'smooth' });
                        setCurrentStep(3);
                      }}
                      className="flex-1 bg-[#4C1824] hover:bg-[#38111A] text-white font-medium text-xs sm:text-sm py-3 px-5 rounded-full shadow-md hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>Continue to Your Details</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}


        {/* ========================================================
            5. STEP 3: YOUR DETAILS (Matches Image 2)
           ======================================================== */}
        {currentStep === 3 && (
          <div className="max-w-4xl mx-auto animate-in fade-in duration-300">
            {/* Card 1: Your Information */}
            <div className="bg-white rounded-[28px] border border-[#EADBCC] p-6 sm:p-10 shadow-xs">
              <div className="flex items-center gap-2.5 mb-6">
                <User className="w-4 h-4 text-[#4C1824]" />
                <h3 className="font-hanken font-bold text-base sm:text-lg text-[#2B181C]">
                  Your Information
                </h3>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-[#2B181C] mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#7A5B53] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-white border border-[#EADBCC] rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-[#2B181C] placeholder:text-[#9C8279] focus:outline-none focus:border-[#4C1824] focus:ring-1 focus:ring-[#4C1824]"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-[#2B181C] mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#7A5B53] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      className="w-full bg-white border border-[#EADBCC] rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-[#2B181C] placeholder:text-[#9C8279] focus:outline-none focus:border-[#4C1824] focus:ring-1 focus:ring-[#4C1824]"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-semibold text-[#2B181C] mb-1.5">
                    Phone Number *
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 flex items-center gap-1 text-xs text-[#2B181C] font-semibold border-r border-[#EADBCC] pr-2.5">
                      <Phone className="w-3.5 h-3.5 text-[#7A5B53]" />
                      <span>+91</span>
                      <ChevronDown className="w-3 h-3 text-[#7A5B53]" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="Enter your phone number"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-white border border-[#EADBCC] rounded-xl pl-24 pr-4 py-3 text-xs sm:text-sm text-[#2B181C] placeholder:text-[#9C8279] focus:outline-none focus:border-[#4C1824] focus:ring-1 focus:ring-[#4C1824]"
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div>
                  <label className="block text-xs font-semibold text-[#2B181C] mb-1.5">
                    Special Requests (Optional)
                  </label>
                  <div className="relative">
                    <MessageSquare className="w-4 h-4 text-[#7A5B53] absolute left-4 top-4" />
                    <textarea
                      rows={3}
                      maxLength={250}
                      placeholder="Let us know if you have any special requirements..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full bg-white border border-[#EADBCC] rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-[#2B181C] placeholder:text-[#9C8279] focus:outline-none focus:border-[#4C1824] focus:ring-1 focus:ring-[#4C1824] resize-none"
                    />
                    <span className="absolute bottom-3 right-4 text-[11px] text-[#8A6B63]">
                      {specialRequests.length} / 250
                    </span>
                  </div>
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-center gap-2.5 pt-2">
                  <input
                    type="checkbox"
                    id="policy-terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded text-[#4C1824] border-[#C8A095] focus:ring-[#4C1824] accent-[#4C1824] cursor-pointer"
                  />
                  <label htmlFor="policy-terms" className="text-xs text-[#2B181C] cursor-pointer select-none">
                    I agree to Lunar's <span className="font-semibold underline decoration-[#4C1824]">reservation policies and terms</span>.
                  </label>
                </div>
              </div>
            </div>

            {/* Card 2: Reservation Policy Banner */}
            <div className="bg-white rounded-[24px] border border-[#EADBCC] p-5 sm:p-6 shadow-xs mt-6 flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Left */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="w-10 h-10 rounded-full bg-[#FAF5EE] border border-[#EADBCC] flex items-center justify-center text-[#4C1824]">
                  <ShieldCheck className="w-5 h-5 text-[#4C1824]" />
                </div>
                <h4 className="font-hanken font-bold text-sm sm:text-base text-[#2B181C]">
                  Reservation Policy
                </h4>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-12 bg-[#EADBCC]" />

              {/* Right points */}
              <div className="text-xs sm:text-[12.5px] text-[#7A5B53] space-y-1 leading-relaxed">
                <p>Please arrive on time for your reservation.</p>
                <p>Inform us in advance about cancellations.</p>
                <p>Special arrangements are subject to availability.</p>
              </div>
            </div>

            {/* Bottom Action Buttons in Step 3 */}
            <div className="mt-8 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                  setCurrentStep(2);
                }}
                className="px-6 py-3 rounded-full text-xs sm:text-sm font-semibold text-[#2B181C] border border-[#2B181C] hover:bg-[#FAF5EE] flex items-center gap-2 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleConfirmReservation}
                className="bg-[#4C1824] hover:bg-[#38111A] text-white font-medium text-xs sm:text-sm px-8 py-3 rounded-full shadow-md hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Confirm Reservation</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            6. STEP 4: CONFIRMATION (Matches Image 3)
           ======================================================== */}
        {currentStep === 4 && (
          <div className="max-w-5xl mx-auto animate-in fade-in duration-300">
            {/* Center Hero */}
            <div className="text-center max-w-3xl mx-auto mt-2 mb-8">
              {/* Large Maroon Circle Checkmark */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#4C1824] text-white flex items-center justify-center mx-auto shadow-md mb-4">
                <Check className="w-7 h-7 sm:w-8 sm:h-8" strokeWidth={2.5} />
              </div>

              <h2 className="font-hanken font-bold text-3xl sm:text-4xl text-[#2B181C] mb-2">
                Reservation Confirmed!
              </h2>
              <p className="text-xs sm:text-sm text-[#7A5B53] mb-4">
                Your table at Lunar has been successfully reserved.
              </p>

              {/* Booking Reference Pill */}
              <div className="inline-flex items-center gap-2 bg-[#FAF5EE] border border-[#EADBCC] px-4 py-2 rounded-full text-xs sm:text-sm text-[#7A5B53]">
                <span>Booking Reference</span>
                <span className="font-bold text-[#2B181C]">#{bookingRef}</span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  title="Copy reference code"
                  className="text-[#7A5B53] hover:text-[#2B181C] transition-colors p-0.5 cursor-pointer ml-0.5"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                {copiedRef && (
                  <span className="text-[10px] text-emerald-600 font-bold ml-1">Copied!</span>
                )}
              </div>
            </div>

            {/* Two-Column Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              
              {/* Left Card: Reservation Details */}
              <div className="bg-white rounded-[28px] border border-[#EADBCC] p-6 sm:p-7 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#F0E5D8]">
                    <Calendar className="w-4 h-4 text-[#4C1824]" />
                    <h3 className="font-hanken font-bold text-base text-[#2B181C]">
                      Reservation Details
                    </h3>
                  </div>

                  <div className="space-y-3 text-xs sm:text-[13px]">
                    <div className="flex items-center justify-between py-1 border-b border-[#F0E5D8]/70">
                      <span className="text-[#7A5B53]">Experience</span>
                      <span className="font-semibold text-[#2B181C]">{experience || 'Dinner Service'}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-[#F0E5D8]/70">
                      <span className="text-[#7A5B53]">Date</span>
                      <span className="font-semibold text-[#2B181C]">{date}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-[#F0E5D8]/70">
                      <span className="text-[#7A5B53]">Time</span>
                      <span className="font-semibold text-[#2B181C]">{time}</span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-[#F0E5D8]/70">
                      <span className="text-[#7A5B53]">Guests</span>
                      <span className="font-semibold text-[#2B181C]">
                        {selectedSeats.length || currentTableObj.capacity} People
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-[#F0E5D8]/70">
                      <span className="text-[#7A5B53]">Dining Area</span>
                      <span className="font-semibold text-[#2B181C]">
                        {diningPreference === 'Outdoor Dining' ? 'Outdoor Terrace' : 'Main Dining'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1 border-b border-[#F0E5D8]/70">
                      <span className="text-[#7A5B53]">Table</span>
                      <span className="font-semibold text-[#2B181C]">{currentTableObj.id}</span>
                    </div>

                    <div className="flex items-center justify-between py-1">
                      <span className="text-[#7A5B53]">Selected Seats</span>
                      <span className="font-semibold text-[#2B181C]">
                        {selectedSeats.length > 0 ? selectedSeats.sort().join(', ') : 'S1, S2'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Selected Table Card inside Left Card */}
                <div className="mt-5 pt-4 border-t border-[#F0E5D8]">
                  <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-[#EFE5DB] mb-3 border border-[#EADBCC]">
                    <img
                      src={currentTableObj.image || (diningPreference === 'Outdoor Dining' ? '/lunar_outdoor_table_zoom.jpg' : '/table-t05.jpg')}
                      alt={`${currentTableObj.name} at Lunar`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-[#4C1824]">
                        <path d="M3 8h18" />
                        <path d="M5 8v10" />
                        <path d="M19 8v10" />
                      </svg>
                      <span className="font-bold text-sm text-[#2B181C]">{currentTableObj.name}</span>
                    </div>
                    <span className="text-xs text-[#7A5B53]">{currentTableObj.area}</span>
                  </div>
                </div>
              </div>

              {/* Right Card: Guest Information */}
              <div className="bg-white rounded-[28px] border border-[#EADBCC] p-6 sm:p-7 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 pb-2 border-b border-[#F0E5D8]">
                    <User className="w-4 h-4 text-[#4C1824]" />
                    <h3 className="font-hanken font-bold text-base text-[#2B181C]">
                      Guest Information
                    </h3>
                  </div>

                  <div className="space-y-4 text-xs sm:text-[13px]">
                    <div className="flex items-center justify-between py-1.5 border-b border-[#F0E5D8]/70">
                      <span className="text-[#7A5B53]">Full Name</span>
                      <span className="font-semibold text-[#2B181C]">
                        {guestName || 'Kuruva Mahesh'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-b border-[#F0E5D8]/70">
                      <span className="text-[#7A5B53]">Email Address</span>
                      <span className="font-semibold text-[#2B181C]">
                        {guestEmail || 'mahesh.kuruva@email.com'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between py-1.5 border-b border-[#F0E5D8]/70">
                      <span className="text-[#7A5B53]">Phone Number</span>
                      <span className="font-semibold text-[#2B181C]">
                        {guestPhone || '+91 98765 43210'}
                      </span>
                    </div>

                    <div className="py-1.5">
                      <span className="text-[#7A5B53] block mb-1">Special Requests</span>
                      <span className="font-semibold text-[#2B181C] block leading-relaxed">
                        {specialRequests || 'Birthday celebration setup, if possible.'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* What's Next Banner */}
            <div className="bg-[#FAF5EE] rounded-[24px] border border-[#EADBCC] p-5 sm:p-6 shadow-xs mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-[#EADBCC]">
              {/* Item 1 */}
              <div className="flex items-center gap-3 py-2 sm:py-0">
                <div className="w-8 h-8 rounded-full bg-white border border-[#EADBCC] flex items-center justify-center text-[#4C1824] shrink-0">
                  <Calendar className="w-4 h-4 text-[#4C1824]" />
                </div>
                <span className="font-hanken font-bold text-sm text-[#2B181C]">
                  What's Next?
                </span>
              </div>

              {/* Item 2 */}
              <div className="flex items-center gap-3 sm:pl-4 py-2 sm:py-0">
                <Clock className="w-4 h-4 text-[#7A5B53] shrink-0" />
                <p className="text-xs text-[#7A5B53] leading-relaxed">
                  Please arrive on time for a smooth experience.
                </p>
              </div>

              {/* Item 3 */}
              <div className="flex items-center gap-3 sm:pl-4 py-2 sm:py-0">
                <RotateCcw className="w-4 h-4 text-[#7A5B53] shrink-0" />
                <p className="text-xs text-[#7A5B53] leading-relaxed">
                  Need to make changes? You can contact us anytime.
                </p>
              </div>

              {/* Item 4 */}
              <div className="flex items-center gap-3 sm:pl-4 py-2 sm:py-0">
                <Phone className="w-4 h-4 text-[#7A5B53] shrink-0" />
                <p className="text-xs text-[#7A5B53] leading-relaxed">
                  For any assistance, call us at <span className="font-semibold text-[#2B181C]">+91 98765 43210</span>.
                </p>
              </div>
            </div>

            {/* Bottom Action Buttons in Step 4: Full Connection into Next Flow Steps */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/menu"
                className="bg-[#FABE24] hover:bg-[#E5AC20] text-[#2B181C] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                <UtensilsCrossed className="w-4 h-4 text-[#2B181C]" />
                <span>Pre-Order Dishes (Food Menu)</span>
              </Link>

              <Link
                to="/customer/orders"
                className="bg-[#4C1824] hover:bg-[#38111A] text-white font-medium text-xs sm:text-sm px-6 py-3.5 rounded-full shadow-md hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
              >
                <Calendar className="w-4 h-4 text-[#FABE24]" />
                <span>View in My Orders (Step 5)</span>
              </Link>

              <button
                type="button"
                onClick={handleDownloadPDF}
                className="bg-white border border-[#EADBCC] text-[#4C1824] hover:bg-[#FAF7F2] font-medium text-xs sm:text-sm px-5 py-3.5 rounded-full shadow-xs transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <Download className="w-4 h-4 text-[#4C1824]" />
                <span>Download PDF</span>
              </button>

              <button
                type="button"
                onClick={resetBookingFlow}
                className="bg-white border border-[#EADBCC] text-[#7A5B53] hover:bg-[#FAF7F2] font-medium text-xs sm:text-sm px-5 py-3.5 rounded-full shadow-xs transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <span>Book Another Table</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ========================================================
          7. MINIMAL FOOTER matching Screenshot
          - LHS: © 2026 Lunar Restaurant. All Rights Reserved.
          - Center: Privacy Policy | Terms of Service | Contact Support
          - RHS: Social Media Icons
         ======================================================== */}
      <footer className="w-full border-t border-[#EADBCC]/80 bg-[#FAF7F2] py-8 px-4 sm:px-8 mt-16 font-hanken">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#7A5B53]">
          
          {/* Copyright */}
          <div>
            © 2026 Lunar Restaurant. All Rights Reserved.
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-6 text-xs text-[#7A5B53]">
            <a href="#privacy" className="hover:text-[#4C1824] transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-[#4C1824] transition-colors">Terms of Service</a>
            <a href="#support" className="hover:text-[#4C1824] transition-colors">Contact Support</a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-[#7A5B53]">
            {/* Instagram */}
            <a href="#instagram" aria-label="Instagram" className="hover:text-[#4C1824] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#linkedin" aria-label="LinkedIn" className="hover:text-[#4C1824] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            {/* Chat */}
            <a href="#chat" aria-label="Chat" className="hover:text-[#4C1824] transition-colors">
              <MessageSquare className="w-4 h-4" />
            </a>
            {/* Message */}
            <a href="#message" aria-label="Message" className="hover:text-[#4C1824] transition-colors">
              <MessageCircle className="w-4 h-4" />
            </a>
            {/* TikTok */}
            <a href="#tiktok" aria-label="TikTok" className="hover:text-[#4C1824] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
              </svg>
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default BookTablePage;
