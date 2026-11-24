import React, { useState } from 'react';
import { useAdminDatabase } from '../adminStore';
import { 
  Flame, 
  Monitor, 
  Settings, 
  GitFork, 
  Sliders, 
  Plus, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  RotateCw, 
  Tv, 
  Check, 
  X,
  Search,
  Laptop,
  Printer,
  Volume2,
  Layers,
  ChevronRight
} from 'lucide-react';

export const KitchenKdsManagement = () => {
  const { 
    getKitchenSetup, saveKitchenSetup,
    getKitchenStations, saveKitchenStations,
    getFoodMaster, saveFoodMaster,
    getKdsDevices, saveKdsDevices,
    getKdsConfig, saveKdsConfig
  } = useAdminDatabase();

  const [activeSubTab, setActiveSubTab] = useState('stations'); // 'setup', 'stations', 'mapping', 'devices', 'config'

  // Data states
  const [kitchenSetup, setKitchenSetup] = useState(() => getKitchenSetup());
  const [stations, setStations] = useState(() => getKitchenStations());
  const [foodItems, setFoodItems] = useState(() => getFoodMaster());
  const [devices, setDevices] = useState(() => getKdsDevices());
  const [kdsConfig, setKdsConfig] = useState(() => getKdsConfig());

  // Save feedback state
  const [saveSuccess, setSaveSuccess] = useState('');

  // Modals
  const [stationModalOpen, setStationModalOpen] = useState(false);
  const [editingStation, setEditingStation] = useState(null);
  const [deleteStationTarget, setDeleteStationTarget] = useState(null);

  const [deviceModalOpen, setDeviceModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState(null);
  const [deleteDeviceTarget, setDeleteDeviceTarget] = useState(null);

  // Forms
  const [stationForm, setStationForm] = useState({
    name: '',
    code: '',
    leadChef: '',
    screenCount: 1,
    avgPrepTime: '12m',
    status: 'Active'
  });

  const [deviceForm, setDeviceForm] = useState({
    name: '',
    ipAddress: '',
    macAddress: '',
    stationId: 'ST-01',
    screenSize: '21.5" Touchscreen',
    model: 'Elo Touch I-Series',
    status: 'Online'
  });

  const [mappingSearch, setMappingSearch] = useState('');

  const triggerSaveNotification = (msg) => {
    setSaveSuccess(msg);
    setTimeout(() => setSaveSuccess(''), 3000);
  };

  // --- Kitchen Setup Handlers ---
  const handleSaveKitchenSetup = (e) => {
    e.preventDefault();
    saveKitchenSetup(kitchenSetup);
    triggerSaveNotification('Kitchen Setup parameters successfully saved!');
  };

  // --- Kitchen Stations Handlers ---
  const handleOpenAddStation = () => {
    setEditingStation(null);
    setStationForm({
      name: '',
      code: `ST-0${stations.length + 1}`,
      leadChef: '',
      screenCount: 1,
      avgPrepTime: '12m',
      status: 'Active'
    });
    setStationModalOpen(true);
  };

  const handleOpenEditStation = (station) => {
    setEditingStation(station);
    setStationForm({
      name: station.name,
      code: station.code,
      leadChef: station.leadChef,
      screenCount: station.screenCount,
      avgPrepTime: station.avgPrepTime,
      status: station.status
    });
    setStationModalOpen(true);
  };

  const handleSaveStation = (e) => {
    e.preventDefault();
    if (!stationForm.name) return;

    let updated;
    if (editingStation) {
      updated = stations.map(s => 
        s.id === editingStation.id ? { ...s, ...stationForm } : s
      );
    } else {
      const newStation = {
        id: `ST-0${stations.length + 1}`,
        ...stationForm,
        activeTickets: 0
      };
      updated = [...stations, newStation];
    }
    setStations(updated);
    saveKitchenStations(updated);
    setStationModalOpen(false);
    triggerSaveNotification('Kitchen station updated!');
  };

  const handleDeleteStation = () => {
    if (!deleteStationTarget) return;
    const updated = stations.filter(s => s.id !== deleteStationTarget.id);
    setStations(updated);
    saveKitchenStations(updated);
    setDeleteStationTarget(null);
    triggerSaveNotification('Station removed.');
  };

  // --- Food Station Mapping Handler ---
  const handleUpdateItemStation = (foodId, newStationId) => {
    const updated = foodItems.map(item => 
      item.id === foodId ? { ...item, stationId: newStationId } : item
    );
    setFoodItems(updated);
    saveFoodMaster(updated);
    triggerSaveNotification('Item routing updated!');
  };

  // --- KDS Devices Handlers ---
  const handleOpenAddDevice = () => {
    setEditingDevice(null);
    setDeviceForm({
      name: '',
      ipAddress: '192.168.1.1' + (devices.length + 10),
      macAddress: 'B8:27:EB:00:11:22',
      stationId: stations[0]?.id || 'ST-01',
      screenSize: '21.5" Touch KDS',
      model: 'Advantech UTC-520',
      status: 'Online'
    });
    setDeviceModalOpen(true);
  };

  const handleOpenEditDevice = (dev) => {
    setEditingDevice(dev);
    setDeviceForm({
      name: dev.name,
      ipAddress: dev.ipAddress,
      macAddress: dev.macAddress,
      stationId: dev.stationId,
      screenSize: dev.screenSize,
      model: dev.model,
      status: dev.status
    });
    setDeviceModalOpen(true);
  };

  const handleSaveDevice = (e) => {
    e.preventDefault();
    if (!deviceForm.name) return;

    const matchedStation = stations.find(s => s.id === deviceForm.stationId);
    const stationName = matchedStation ? matchedStation.name : 'Unassigned';

    let updated;
    if (editingDevice) {
      updated = devices.map(d => 
        d.id === editingDevice.id ? { ...d, ...deviceForm, stationName } : d
      );
    } else {
      const newDev = {
        id: `KDS-00${devices.length + 1}`,
        ...deviceForm,
        stationName,
        lastHeartbeat: 'Just now'
      };
      updated = [...devices, newDev];
    }
    setDevices(updated);
    saveKdsDevices(updated);
    setDeviceModalOpen(false);
    triggerSaveNotification('KDS Hardware screen saved!');
  };

  const handlePingDevice = (devId) => {
    const updated = devices.map(d => 
      d.id === devId ? { ...d, lastHeartbeat: 'Just now', status: 'Online' } : d
    );
    setDevices(updated);
    saveKdsDevices(updated);
    triggerSaveNotification('Ping acknowledged: 4ms roundtrip.');
  };

  const handleDeleteDevice = () => {
    if (!deleteDeviceTarget) return;
    const updated = devices.filter(d => d.id !== deleteDeviceTarget.id);
    setDevices(updated);
    saveKdsDevices(updated);
    setDeleteDeviceTarget(null);
    triggerSaveNotification('Device deregistered.');
  };

  // --- KDS Config Handler ---
  const handleSaveKdsConfig = (e) => {
    e.preventDefault();
    saveKdsConfig(kdsConfig);
    triggerSaveNotification('KDS screen display rules updated!');
  };

  const filteredFoodForMapping = foodItems.filter(f => {
    if (mappingSearch.trim()) {
      const q = mappingSearch.toLowerCase();
      return f.name.toLowerCase().includes(q) || f.category.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Save Notification Toast */}
      {saveSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-[#500F1D] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 border border-[#E5A81E]/40 animate-slideDown">
          <CheckCircle2 size={18} className="text-[#E5A81E]" />
          <span className="text-xs font-semibold">{saveSuccess}</span>
        </div>
      )}

      {/* Header & Subtabs */}
      <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#500F1D]/10 flex items-center justify-center text-[#500F1D]">
            <Flame size={22} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#500F1D]">Kitchen & KDS Operations</h1>
            <p className="text-xs text-[#500F1D]/70 font-medium">Coordinate culinary stations, order dispatch routing, and display screen terminals.</p>
          </div>
        </div>

        <div className="flex items-center bg-[#FAF7F5] p-1.5 rounded-2xl border border-[#E8DDD8] gap-1 overflow-x-auto self-start sm:self-auto">
          {[
            { id: 'stations', label: 'Kitchen Stations' },
            { id: 'mapping', label: 'Station Mapping' },
            { id: 'devices', label: 'KDS Terminals' },
            { id: 'setup', label: 'Kitchen Setup' },
            { id: 'config', label: 'KDS Display Rules' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'bg-[#500F1D] text-white shadow-sm'
                  : 'text-[#500F1D]/70 hover:text-[#500F1D] hover:bg-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SUBTAB 1: KITCHEN STATIONS */}
      {activeSubTab === 'stations' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#500F1D]">Culinary Stations & Production Lines</h2>
              <p className="text-xs text-[#500F1D]/70">Each station receives live orders split automatically by course and recipe.</p>
            </div>
            <button
              onClick={handleOpenAddStation}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] transition-all shadow-sm"
            >
              <Plus size={16} />
              <span>+ Add Kitchen Station</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stations.map((st) => {
              const assignedCount = foodItems.filter(f => f.stationId === st.id).length;
              return (
                <div 
                  key={st.id} 
                  className="bg-white rounded-3xl border border-[#E8DDD8] p-6 shadow-sm hover:border-[#500F1D]/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#500F1D]/10 text-[#500F1D] border border-[#500F1D]/20">
                        {st.code}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> {st.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#500F1D] mb-1">{st.name}</h3>
                    <p className="text-xs text-[#500F1D]/70 font-medium mb-4">Lead: <strong>{st.leadChef}</strong></p>

                    <div className="grid grid-cols-3 gap-2 p-3 bg-[#FAF7F5] rounded-2xl border border-[#E8DDD8] text-center mb-4">
                      <div>
                        <p className="text-[10px] text-[#500F1D]/60 uppercase font-semibold">Active Orders</p>
                        <p className="text-base font-bold text-[#500F1D]">{st.activeTickets}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#500F1D]/60 uppercase font-semibold">Avg Time</p>
                        <p className="text-base font-bold text-[#500F1D]">{st.avgPrepTime}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-[#500F1D]/60 uppercase font-semibold">Screens</p>
                        <p className="text-base font-bold text-[#500F1D]">{st.screenCount}</p>
                      </div>
                    </div>

                    <p className="text-xs text-[#500F1D]/70">
                      <strong>{assignedCount}</strong> menu dishes routed to this station.
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E8DDD8] flex items-center justify-between">
                    <span className="text-xs text-[#500F1D]/60 font-mono">{st.id}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditStation(st)}
                        className="p-2 rounded-xl bg-[#FAF7F5] hover:bg-[#F3EAE7] text-[#500F1D] border border-[#E8DDD8] transition-colors"
                        title="Edit Station"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => setDeleteStationTarget(st)}
                        className="p-2 rounded-xl bg-[#FAF7F5] hover:bg-red-50 text-red-600 border border-[#E8DDD8] transition-colors"
                        title="Delete Station"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUBTAB 2: FOOD STATION MAPPING */}
      {activeSubTab === 'mapping' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-[#E8DDD8] shadow-sm overflow-hidden">
            <div className="p-5 border-b border-[#E8DDD8] bg-[#FAF7F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-serif font-bold text-[#500F1D]">Automated Food Item Routing Matrix</h2>
                <p className="text-xs text-[#500F1D]/70">When POS takes an order, items automatically beam to their mapped prep station.</p>
              </div>

              <div className="relative min-w-[240px]">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#500F1D]/50" />
                <input
                  type="text"
                  placeholder="Filter items..."
                  value={mappingSearch}
                  onChange={(e) => setMappingSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-white rounded-xl border border-[#E8DDD8] focus:outline-none text-[#500F1D]"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#FAF1EB]">
                  <tr className="text-[#500F1D] text-xs font-bold uppercase tracking-wider">
                    <th className="py-3 px-6 rounded-l-2xl">Food Item</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Est Prep</th>
                    <th className="py-3 px-6">Assigned Kitchen Station</th>
                    <th className="py-3 px-4 text-center rounded-r-2xl">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DDD8] text-xs sm:text-sm">
                  {filteredFoodForMapping.map((item) => (
                    <tr key={item.id} className="hover:bg-[#FAF7F5] transition-colors">
                      <td className="py-3 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-9 h-9 rounded-lg object-cover border border-[#E8DDD8]"
                          />
                          <div>
                            <p className="font-bold text-[#500F1D]">{item.name}</p>
                            <p className="text-[11px] text-[#500F1D]/60">{item.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-[#500F1D]/80 font-medium">{item.category}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${item.isVeg ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                          {item.isVeg ? 'Veg' : 'Non-Veg'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#500F1D]/80">{item.prepTime} mins</td>
                      <td className="py-3 px-6">
                        <select
                          value={item.stationId}
                          onChange={(e) => handleUpdateItemStation(item.id, e.target.value)}
                          className="px-3 py-1.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D] bg-white focus:outline-none focus:ring-1 focus:ring-[#500F1D]"
                        >
                          {stations.map(st => (
                            <option key={st.id} value={st.id}>
                              {st.name} ({st.code})
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <Check size={12} /> Auto-Routed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: KDS TERMINALS */}
      {activeSubTab === 'devices' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#500F1D]">KDS Display Hardware Terminals</h2>
              <p className="text-xs text-[#500F1D]/70">Monitor real-time network pings, display sizes, and station assignments.</p>
            </div>
            <button
              onClick={handleOpenAddDevice}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] transition-all shadow-sm"
            >
              <Plus size={16} />
              <span>+ Register KDS Terminal</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {devices.map((dev) => (
              <div 
                key={dev.id} 
                className="bg-white rounded-3xl border border-[#E8DDD8] p-6 shadow-sm hover:border-[#500F1D]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#500F1D]/10 flex items-center justify-center text-[#500F1D]">
                      <Tv size={20} />
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span> {dev.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#500F1D]">{dev.name}</h3>
                  <p className="text-xs text-[#500F1D]/60 font-mono mb-3">{dev.model} • {dev.screenSize}</p>

                  <div className="space-y-2 p-3 bg-[#FAF7F5] rounded-2xl border border-[#E8DDD8] text-xs mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/60">Station:</span>
                      <span className="font-semibold text-[#500F1D]">{dev.stationName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/60">IP Address:</span>
                      <span className="font-mono text-[#500F1D]">{dev.ipAddress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/60">MAC:</span>
                      <span className="font-mono text-[#500F1D]">{dev.macAddress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/60">Heartbeat:</span>
                      <span className="text-emerald-700 font-semibold">{dev.lastHeartbeat}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8DDD8] flex items-center justify-between">
                  <button
                    onClick={() => handlePingDevice(dev.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F5] hover:bg-[#F3EAE7] text-[#500F1D] border border-[#E8DDD8] text-xs font-semibold transition-colors"
                  >
                    <RotateCw size={13} />
                    <span>Ping Test</span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditDevice(dev)}
                      className="p-1.5 rounded-xl bg-[#FAF7F5] hover:bg-[#F3EAE7] text-[#500F1D] border border-[#E8DDD8]"
                      title="Edit Device"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => setDeleteDeviceTarget(dev)}
                      className="p-1.5 rounded-xl bg-[#FAF7F5] hover:bg-red-50 text-red-600 border border-[#E8DDD8]"
                      title="Remove Device"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: KITCHEN SETUP */}
      {activeSubTab === 'setup' && (
        <div className="bg-white rounded-3xl border border-[#E8DDD8] p-6 sm:p-8 shadow-sm max-w-4xl">
          <div className="flex items-center gap-3 pb-5 border-b border-[#E8DDD8] mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#500F1D]/10 flex items-center justify-center text-[#500F1D]">
              <Settings size={20} />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#500F1D]">Culinary Suite Global Setup</h2>
              <p className="text-xs text-[#500F1D]/70">Define kitchen capacity, head chef authority, ticket audio alerts, and printers.</p>
            </div>
          </div>

          <form onSubmit={handleSaveKitchenSetup} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">Kitchen Suite Name</label>
                <input
                  type="text"
                  value={kitchenSetup.kitchenName}
                  onChange={(e) => setKitchenSetup({ ...kitchenSetup, kitchenName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">Executive Chef In-Charge</label>
                <input
                  type="text"
                  value={kitchenSetup.headChef}
                  onChange={(e) => setKitchenSetup({ ...kitchenSetup, headChef: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">Max Concurrent Active Orders</label>
                <input
                  type="number"
                  value={kitchenSetup.maxConcurrentOrders}
                  onChange={(e) => setKitchenSetup({ ...kitchenSetup, maxConcurrentOrders: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">Operating Service Hours</label>
                <input
                  type="text"
                  value={kitchenSetup.operatingHours}
                  onChange={(e) => setKitchenSetup({ ...kitchenSetup, operatingHours: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">Bump Overdue Alert Threshold (mins)</label>
                <input
                  type="number"
                  value={kitchenSetup.bumpThresholdMins}
                  onChange={(e) => setKitchenSetup({ ...kitchenSetup, bumpThresholdMins: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">Kitchen Pass Printer Network IP</label>
                <input
                  type="text"
                  value={kitchenSetup.kitchenPrinterIp}
                  onChange={(e) => setKitchenSetup({ ...kitchenSetup, kitchenPrinterIp: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm focus:outline-none text-[#500F1D] font-mono"
                />
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E8DDD8]">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={kitchenSetup.autoRouting}
                  onChange={(e) => setKitchenSetup({ ...kitchenSetup, autoRouting: e.target.checked })}
                  className="w-4 h-4 accent-[#500F1D] rounded"
                />
                <div>
                  <p className="text-xs font-bold text-[#500F1D]">Enable Automatic Course & Station Routing</p>
                  <p className="text-[11px] text-[#500F1D]/60">Incoming POS orders automatically split items across active stations.</p>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={kitchenSetup.audioAlerts}
                  onChange={(e) => setKitchenSetup({ ...kitchenSetup, audioAlerts: e.target.checked })}
                  className="w-4 h-4 accent-[#500F1D] rounded"
                />
                <div>
                  <p className="text-xs font-bold text-[#500F1D]">Audio Chime on Incoming Tickets & Delayed Orders</p>
                  <p className="text-[11px] text-[#500F1D]/60">Play audio ping on all kitchen station tablets whenever an order arrives.</p>
                </div>
              </label>
            </div>

            <div className="pt-6 border-t border-[#E8DDD8] flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] shadow-sm"
              >
                Save Kitchen Parameters
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUBTAB 5: KDS CONFIGURATION */}
      {activeSubTab === 'config' && (
        <div className="bg-white rounded-3xl border border-[#E8DDD8] p-6 sm:p-8 shadow-sm max-w-4xl">
          <div className="flex items-center gap-3 pb-5 border-b border-[#E8DDD8] mb-6">
            <div className="w-10 h-10 rounded-2xl bg-[#500F1D]/10 flex items-center justify-center text-[#500F1D]">
              <Sliders size={20} />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-[#500F1D]">KDS Visual Screen Configuration</h2>
              <p className="text-xs text-[#500F1D]/70">Fine-tune card urgency timers, font sizes, and expediter bump modes.</p>
            </div>
          </div>

          <form onSubmit={handleSaveKdsConfig} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">Display Layout Mode</label>
                <select
                  value={kdsConfig.viewMode}
                  onChange={(e) => setKdsConfig({ ...kdsConfig, viewMode: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                >
                  <option value="Grid">Multi-column Grid View</option>
                  <option value="Flow">Horizontal Carousel Flow</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">Green Alert Window (&lt; mins)</label>
                <input
                  type="number"
                  value={kdsConfig.greenThresholdMins}
                  onChange={(e) => setKdsConfig({ ...kdsConfig, greenThresholdMins: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">Yellow Warning Window (mins)</label>
                <input
                  type="number"
                  value={kdsConfig.yellowThresholdMins}
                  onChange={(e) => setKdsConfig({ ...kdsConfig, yellowThresholdMins: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">Red Urgent Window (&gt; mins)</label>
                <input
                  type="number"
                  value={kdsConfig.redThresholdMins}
                  onChange={(e) => setKdsConfig({ ...kdsConfig, redThresholdMins: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">Ticket Text Font Size</label>
                <select
                  value={kdsConfig.fontSize}
                  onChange={(e) => setKdsConfig({ ...kdsConfig, fontSize: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                >
                  <option value="Compact">Compact / High Density</option>
                  <option value="Medium">Medium Standard</option>
                  <option value="Large">Large High-Visibility</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-2">Auto-Archive Completed (mins)</label>
                <input
                  type="number"
                  value={kdsConfig.autoArchiveMins}
                  onChange={(e) => setKdsConfig({ ...kdsConfig, autoArchiveMins: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#E8DDD8]">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={kdsConfig.oneClickBump}
                  onChange={(e) => setKdsConfig({ ...kdsConfig, oneClickBump: e.target.checked })}
                  className="w-4 h-4 accent-[#500F1D] rounded"
                />
                <span className="text-xs font-bold text-[#500F1D]">Single-Tap Quick Bump to Expediter Pass</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={kdsConfig.enableSplitOrderItems}
                  onChange={(e) => setKdsConfig({ ...kdsConfig, enableSplitOrderItems: e.target.checked })}
                  className="w-4 h-4 accent-[#500F1D] rounded"
                />
                <span className="text-xs font-bold text-[#500F1D]">Allow Individual Dish Bumping (Partial Completion)</span>
              </label>
            </div>

            <div className="pt-6 border-t border-[#E8DDD8] flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] shadow-sm"
              >
                Apply KDS Configuration
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- MODALS --- */}

      {/* ADD/EDIT STATION MODAL */}
      {stationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DDD8] animate-scaleUp">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD8] mb-6">
              <h3 className="text-xl font-serif font-bold text-[#500F1D]">
                {editingStation ? 'Edit Culinary Station' : 'Add Kitchen Station'}
              </h3>
              <button onClick={() => setStationModalOpen(false)} className="text-[#500F1D]/60 hover:text-[#500F1D]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveStation} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Station Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grill, Rotisserie & Sauté"
                  value={stationForm.name}
                  onChange={(e) => setStationForm({ ...stationForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Station Code</label>
                  <input
                    type="text"
                    required
                    placeholder="GRL-01"
                    value={stationForm.code}
                    onChange={(e) => setStationForm({ ...stationForm, code: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Avg Prep Time</label>
                  <input
                    type="text"
                    placeholder="14m"
                    value={stationForm.avgPrepTime}
                    onChange={(e) => setStationForm({ ...stationForm, avgPrepTime: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Lead Station Chef</label>
                <input
                  type="text"
                  placeholder="Chef Raymond"
                  value={stationForm.leadChef}
                  onChange={(e) => setStationForm({ ...stationForm, leadChef: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Screen Count</label>
                  <input
                    type="number"
                    min="1"
                    value={stationForm.screenCount}
                    onChange={(e) => setStationForm({ ...stationForm, screenCount: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Status</label>
                  <select
                    value={stationForm.status}
                    onChange={(e) => setStationForm({ ...stationForm, status: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E8DDD8]">
                <button
                  type="button"
                  onClick={() => setStationModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs font-semibold hover:bg-[#3D0A15]"
                >
                  Save Station
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE STATION CONFIRM */}
      {deleteStationTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E8DDD8] text-center">
            <h4 className="text-lg font-serif font-bold text-[#500F1D] mb-1">Delete Station?</h4>
            <p className="text-xs text-[#500F1D]/70 mb-6">
              Delete "{deleteStationTarget.name}"? Active dishes mapped to this station will need reassignment.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteStationTarget(null)}
                className="px-4 py-2 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteStation}
                className="px-5 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REGISTER / EDIT DEVICE MODAL */}
      {deviceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DDD8] animate-scaleUp">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD8] mb-6">
              <h3 className="text-xl font-serif font-bold text-[#500F1D]">
                {editingDevice ? 'Edit KDS Terminal' : 'Register New KDS Terminal'}
              </h3>
              <button onClick={() => setDeviceModalOpen(false)} className="text-[#500F1D]/60 hover:text-[#500F1D]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveDevice} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Terminal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hot Kitchen KDS Screen 01"
                  value={deviceForm.name}
                  onChange={(e) => setDeviceForm({ ...deviceForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Assigned Kitchen Station</label>
                <select
                  value={deviceForm.stationId}
                  onChange={(e) => setDeviceForm({ ...deviceForm, stationId: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                >
                  {stations.map(st => (
                    <option key={st.id} value={st.id}>{st.name} ({st.code})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">IP Address</label>
                  <input
                    type="text"
                    required
                    placeholder="192.168.1.101"
                    value={deviceForm.ipAddress}
                    onChange={(e) => setDeviceForm({ ...deviceForm, ipAddress: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">MAC Address</label>
                  <input
                    type="text"
                    placeholder="B8:27:EB:..."
                    value={deviceForm.macAddress}
                    onChange={(e) => setDeviceForm({ ...deviceForm, macAddress: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Hardware Model</label>
                  <input
                    type="text"
                    placeholder="Elo Touch I-Series"
                    value={deviceForm.model}
                    onChange={(e) => setDeviceForm({ ...deviceForm, model: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Screen Size</label>
                  <input
                    type="text"
                    placeholder='21.5" Touch KDS'
                    value={deviceForm.screenSize}
                    onChange={(e) => setDeviceForm({ ...deviceForm, screenSize: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E8DDD8]">
                <button
                  type="button"
                  onClick={() => setDeviceModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs font-semibold hover:bg-[#3D0A15]"
                >
                  Save Device
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE DEVICE CONFIRM */}
      {deleteDeviceTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E8DDD8] text-center">
            <h4 className="text-lg font-serif font-bold text-[#500F1D] mb-1">Deregister Device?</h4>
            <p className="text-xs text-[#500F1D]/70 mb-6">
              Remove terminal "{deleteDeviceTarget.name}" from live display networks?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteDeviceTarget(null)}
                className="px-4 py-2 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteDevice}
                className="px-5 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KitchenKdsManagement;
