import React, { useState } from 'react';
import { useAdminDatabase } from '../adminStore';
import { useAppStore } from '../../../store/store';
import { formatCurrency } from '../../../utils/helpers';
import { 
  Armchair, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  Eye, 
  QrCode, 
  Users, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  X, 
  Check, 
  Split, 
  Merge,
  Maximize2
} from 'lucide-react';

export const TableManagementAdmin = () => {
  const { 
    getTableSections, saveTableSections,
    getTableTypes, saveTableTypes,
    getTableCombinations, saveTableCombinations
  } = useAdminDatabase();
  const { tables = [], setTables } = useAppStore();

  const [activeSubTab, setActiveSubTab] = useState('tables'); // 'tables', 'sections', 'types', 'combinations'

  // Persistent States
  const [tableList, setTableList] = useState(() => tables.length ? tables : [
    { id: 'T01', number: 'T01', capacity: 2, price: 800, location: 'Indoor Hall', status: 'Available', currentBooking: null, type: 'Intimate Couple Booth', shape: 'Round' },
    { id: 'T02', number: 'T02', capacity: 2, price: 800, location: 'Indoor Hall', status: 'Reserved', currentBooking: 'R. Sharma • 7:00 PM', type: 'Intimate Couple Booth', shape: 'Round' },
    { id: 'T03', number: 'T03', capacity: 2, price: 800, location: 'Indoor Hall', status: 'Available', currentBooking: null, type: 'Intimate Couple Booth', shape: 'Round' },
    { id: 'T04', number: 'T04', capacity: 4, price: 1200, location: 'Indoor Hall', status: 'Available', currentBooking: null, type: 'Standard Dining Table', shape: 'Square' },
    { id: 'T05', number: 'T05', capacity: 6, price: 1800, location: 'Outdoor Royal Terrace', status: 'Occupied', currentBooking: 'K. Patel • In Progress', type: 'Family & Celebration Table', shape: 'Rectangular' },
    { id: 'T06', number: 'T06', capacity: 4, price: 1400, location: 'Outdoor Royal Terrace', status: 'Available', currentBooking: null, type: 'Standard Dining Table', shape: 'Round' },
    { id: 'T07', number: 'T07', capacity: 8, price: 2500, location: 'Private VIP Dining Suites', status: 'Reserved', currentBooking: 'Dr. Verma • 8:30 PM', type: 'Executive VIP Boardroom Table', shape: 'Rectangular' },
    { id: 'T08', number: 'T08', capacity: 2, price: 600, location: 'Cocktail Bar & Tapas Lounge', status: 'Available', currentBooking: null, type: 'High-Top Bar Cocktail Station', shape: 'Round' }
  ]);

  const [sections, setSections] = useState(() => getTableSections());
  const [types, setTypes] = useState(() => getTableTypes());
  const [combinations, setCombinations] = useState(() => getTableCombinations());

  // Search & Filter state for Tables
  const [tableSearch, setTableSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [capacityFilter, setCapacityFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');

  // Modals
  const [tableModalOpen, setTableModalOpen] = useState(false);
  const [editingTable, setEditingTable] = useState(null);
  const [deleteTableTarget, setDeleteTableTarget] = useState(null);
  const [qrModalTable, setQrModalTable] = useState(null);
  const [viewTableTarget, setViewTableTarget] = useState(null);

  const [sectionModalOpen, setSectionModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [deleteSectionTarget, setDeleteSectionTarget] = useState(null);

  const [typeModalOpen, setTypeModalOpen] = useState(false);
  const [editingType, setEditingType] = useState(null);

  const [combModalOpen, setCombModalOpen] = useState(false);

  // Table Form
  const [tableForm, setTableForm] = useState({
    number: '',
    capacity: 4,
    price: 1200,
    location: 'Indoor Hall',
    status: 'Available',
    type: 'Standard Dining Table',
    shape: 'Square'
  });

  // Section Form
  const [sectionForm, setSectionForm] = useState({
    name: '',
    floor: 'Ground Floor',
    totalTables: 6,
    maxCapacity: 24,
    manager: 'Harrison Blake',
    status: 'Open'
  });

  // Type Form
  const [typeForm, setTypeForm] = useState({
    name: '',
    stdCapacity: 4,
    minCapacity: 2,
    maxCapacity: 6,
    surcharge: 0,
    description: ''
  });

  // Combination Form
  const [combForm, setCombForm] = useState({
    name: '',
    tableIds: 'T01, T02',
    section: 'Indoor Luxury Hall',
    combinedCapacity: 8,
    allowSingleUnitBooking: true
  });

  // --- Table Handlers ---
  const handleOpenAddTable = () => {
    setEditingTable(null);
    setTableForm({
      number: `T${(tableList.length + 1).toString().padStart(2, '0')}`,
      capacity: 4,
      price: 1200,
      location: sections[0]?.name || 'Indoor Hall',
      status: 'Available',
      type: types[0]?.name || 'Standard Dining Table',
      shape: 'Square'
    });
    setTableModalOpen(true);
  };

  const handleOpenEditTable = (t) => {
    setEditingTable(t);
    setTableForm({
      number: t.number || t.id,
      capacity: t.capacity,
      price: t.price || 1000,
      location: t.location || 'Indoor Hall',
      status: t.status,
      type: t.type || 'Standard Dining Table',
      shape: t.shape || 'Square'
    });
    setTableModalOpen(true);
  };

  const handleSaveTable = (e) => {
    e.preventDefault();
    if (!tableForm.number) return;

    let updated;
    if (editingTable) {
      updated = tableList.map(t => 
        (t.id === editingTable.id || t.number === editingTable.number)
          ? { ...t, ...tableForm, capacity: Number(tableForm.capacity), price: Number(tableForm.price) }
          : t
      );
    } else {
      const newT = {
        id: tableForm.number,
        ...tableForm,
        capacity: Number(tableForm.capacity),
        price: Number(tableForm.price),
        currentBooking: null
      };
      updated = [...tableList, newT];
    }
    setTableList(updated);
    if (setTables) setTables(updated);
    setTableModalOpen(false);
  };

  const handleDeleteTable = () => {
    if (!deleteTableTarget) return;
    const updated = tableList.filter(t => (t.id || t.number) !== (deleteTableTarget.id || deleteTableTarget.number));
    setTableList(updated);
    if (setTables) setTables(updated);
    setDeleteTableTarget(null);
  };

  // --- Section Handlers ---
  const handleOpenAddSection = () => {
    setEditingSection(null);
    setSectionForm({
      name: '',
      floor: 'Ground Floor',
      totalTables: 6,
      maxCapacity: 24,
      manager: 'Harrison Blake',
      status: 'Open'
    });
    setSectionModalOpen(true);
  };

  const handleOpenEditSection = (sec) => {
    setEditingSection(sec);
    setSectionForm({
      name: sec.name,
      floor: sec.floor,
      totalTables: sec.totalTables,
      maxCapacity: sec.maxCapacity,
      manager: sec.manager,
      status: sec.status
    });
    setSectionModalOpen(true);
  };

  const handleSaveSection = (e) => {
    e.preventDefault();
    if (!sectionForm.name) return;

    let updated;
    if (editingSection) {
      updated = sections.map(s => 
        s.id === editingSection.id ? { ...s, ...sectionForm } : s
      );
    } else {
      const newSec = {
        id: `SEC-0${sections.length + 1}`,
        ...sectionForm,
        totalTables: Number(sectionForm.totalTables),
        maxCapacity: Number(sectionForm.maxCapacity)
      };
      updated = [...sections, newSec];
    }
    setSections(updated);
    saveTableSections(updated);
    setSectionModalOpen(false);
  };

  const handleDeleteSection = () => {
    if (!deleteSectionTarget) return;
    const updated = sections.filter(s => s.id !== deleteSectionTarget.id);
    setSections(updated);
    saveTableSections(updated);
    setDeleteSectionTarget(null);
  };

  // --- Type Handlers ---
  const handleOpenAddType = () => {
    setEditingType(null);
    setTypeForm({
      name: '',
      stdCapacity: 4,
      minCapacity: 2,
      maxCapacity: 6,
      surcharge: 0,
      description: ''
    });
    setTypeModalOpen(true);
  };

  const handleOpenEditType = (tp) => {
    setEditingType(tp);
    setTypeForm({
      name: tp.name,
      stdCapacity: tp.stdCapacity,
      minCapacity: tp.minCapacity,
      maxCapacity: tp.maxCapacity,
      surcharge: tp.surcharge,
      description: tp.description
    });
    setTypeModalOpen(true);
  };

  const handleSaveType = (e) => {
    e.preventDefault();
    if (!typeForm.name) return;

    let updated;
    if (editingType) {
      updated = types.map(t => 
        t.id === editingType.id ? { ...t, ...typeForm } : t
      );
    } else {
      const newTp = {
        id: `TT-0${types.length + 1}`,
        ...typeForm,
        stdCapacity: Number(typeForm.stdCapacity),
        minCapacity: Number(typeForm.minCapacity),
        maxCapacity: Number(typeForm.maxCapacity),
        surcharge: Number(typeForm.surcharge)
      };
      updated = [...types, newTp];
    }
    setTypes(updated);
    saveTableTypes(updated);
    setTypeModalOpen(false);
  };

  // --- Combination Handlers ---
  const handleToggleCombinationStatus = (combId) => {
    const updated = combinations.map(c => 
      c.id === combId 
        ? { ...c, status: c.status === 'Joined' ? 'Split' : 'Joined' } 
        : c
    );
    setCombinations(updated);
    saveTableCombinations(updated);
  };

  const handleSaveCombination = (e) => {
    e.preventDefault();
    if (!combForm.name) return;

    const tableArray = combForm.tableIds.split(',').map(s => s.trim()).filter(Boolean);
    const newComb = {
      id: `TC-0${combinations.length + 1}`,
      name: combForm.name,
      tableIds: tableArray,
      section: combForm.section,
      combinedCapacity: Number(combForm.combinedCapacity),
      allowSingleUnitBooking: combForm.allowSingleUnitBooking,
      status: 'Joined'
    };
    const updated = [...combinations, newComb];
    setCombinations(updated);
    saveTableCombinations(updated);
    setCombModalOpen(false);
  };

  // Filter tables
  const filteredTables = tableList.filter(t => {
    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    if (capacityFilter !== 'All' && t.capacity !== Number(capacityFilter)) return false;
    if (locationFilter !== 'All' && t.location !== locationFilter) return false;
    if (tableSearch.trim()) {
      const q = tableSearch.toLowerCase().trim();
      const num = (t.number || t.id).toLowerCase();
      const loc = (t.location || '').toLowerCase();
      return num.includes(q) || loc.includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header & Subtabs */}
      <div className="bg-white rounded-3xl p-5 border border-[#E8DDD8] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#500F1D]/10 flex items-center justify-center text-[#500F1D]">
            <Armchair size={22} />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#500F1D]">Table & Floor Architecture</h1>
            <p className="text-xs text-[#500F1D]/70 font-medium">Manage dining seating inventory, dining zones, seating categories, and banquet table clusters.</p>
          </div>
        </div>

        <div className="flex items-center bg-[#FAF7F5] p-1.5 rounded-2xl border border-[#E8DDD8] gap-1 overflow-x-auto self-start sm:self-auto">
          {[
            { id: 'tables', label: `Tables (${tableList.length})` },
            { id: 'sections', label: `Sections (${sections.length})` },
            { id: 'types', label: `Table Types (${types.length})` },
            { id: 'combinations', label: `Combinations (${combinations.length})` }
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

      {/* SUBTAB 1: TABLES DIRECTORY */}
      {activeSubTab === 'tables' && (
        <div className="space-y-6">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-2xl border border-[#E8DDD8] shadow-sm">
              <p className="text-xs text-[#500F1D]/70 font-medium">Total Tables</p>
              <p className="text-xl font-bold text-[#500F1D]">{tableList.length}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#E8DDD8] shadow-sm">
              <p className="text-xs text-emerald-700 font-medium">Available Now</p>
              <p className="text-xl font-bold text-emerald-700">{tableList.filter(t => t.status === 'Available').length}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#E8DDD8] shadow-sm">
              <p className="text-xs text-rose-700 font-medium">Occupied / Reserved</p>
              <p className="text-xl font-bold text-rose-700">{tableList.filter(t => t.status === 'Occupied' || t.status === 'Reserved').length}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-[#E8DDD8] shadow-sm">
              <p className="text-xs text-[#E5A81E] font-medium">Dining Capacity</p>
              <p className="text-xl font-bold text-[#500F1D]">{tableList.reduce((acc, t) => acc + (t.capacity || 2), 0)} Seats</p>
            </div>
          </div>

          {/* Table Container with Integrated Filter Bar matching User Screenshot */}
          <div className="bg-white rounded-3xl border border-[#E8DDD8] shadow-sm overflow-hidden">
            {/* Integrated Toolbar */}
            <div className="p-4 sm:p-5 border-b border-[#E8DDD8] bg-[#FAF7F5] flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5 flex-1">
                {/* Location Filter */}
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="px-3.5 py-2 text-xs sm:text-sm bg-white rounded-xl border border-[#E8DDD8] text-[#500F1D] font-medium focus:outline-none"
                >
                  <option value="All">All Tables / Sections</option>
                  {sections.map(s => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3.5 py-2 text-xs sm:text-sm bg-white rounded-xl border border-[#E8DDD8] text-[#500F1D] font-medium focus:outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Cleaning">Cleaning</option>
                </select>

                {/* Capacity Filter */}
                <select
                  value={capacityFilter}
                  onChange={(e) => setCapacityFilter(e.target.value)}
                  className="px-3.5 py-2 text-xs sm:text-sm bg-white rounded-xl border border-[#E8DDD8] text-[#500F1D] font-medium focus:outline-none"
                >
                  <option value="All">All Capacity</option>
                  <option value="2">2 Seater</option>
                  <option value="4">4 Seater</option>
                  <option value="6">6 Seater</option>
                  <option value="8">8+ Seater</option>
                </select>

                {/* Search */}
                <div className="relative flex-1 min-w-[180px] max-w-xs">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#500F1D]/50" />
                  <input
                    type="text"
                    placeholder="Search by Table No, Location..."
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white rounded-xl border border-[#E8DDD8] focus:outline-none text-[#500F1D]"
                  />
                  {tableSearch && (
                    <button onClick={() => setTableSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Add Table Button */}
              <button
                onClick={handleOpenAddTable}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] transition-all shadow-sm shrink-0"
              >
                <Plus size={16} />
                <span>+ Add Table</span>
              </button>
            </div>

            {/* Table Listing */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#FAF1EB]">
                  <tr className="text-[#500F1D] text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                    <th className="py-3.5 px-4 sm:px-6 rounded-l-2xl">#</th>
                    <th className="py-3.5 px-4">Table No.</th>
                    <th className="py-3.5 px-4">Capacity</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">Current Booking</th>
                    <th className="py-3.5 px-4 text-center rounded-r-2xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8DDD8] text-xs sm:text-sm">
                  {filteredTables.map((t, idx) => (
                    <tr key={t.id || t.number} className="hover:bg-[#FAF7F5] transition-colors">
                      <td className="py-3 px-4 sm:px-6 text-[#500F1D]/60 font-semibold">{idx + 1}</td>
                      <td className="py-3 px-4 font-bold text-[#500F1D]">
                        {t.number || t.id}
                      </td>
                      <td className="py-3 px-4 text-[#500F1D]">
                        <span className="inline-flex items-center gap-1.5 font-medium">
                          <Users size={14} className="text-[#500F1D]/60" />
                          {t.capacity} Seater
                        </span>
                      </td>
                      <td className="py-3 px-4 font-bold text-[#500F1D]">
                        {formatCurrency(t.price || 800)}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#FAF7F5] border border-[#E8DDD8] text-xs font-medium text-[#500F1D]">
                          <MapPin size={12} className="text-[#500F1D]/50" />
                          {t.location || 'Indoor Hall'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          t.status === 'Available'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : t.status === 'Reserved'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : t.status === 'Occupied'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            t.status === 'Available' ? 'bg-emerald-500' :
                            t.status === 'Reserved' ? 'bg-rose-500' :
                            t.status === 'Occupied' ? 'bg-amber-500 animate-pulse' : 'bg-gray-400'
                          }`}></span>
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-[#500F1D]/80">
                        {t.currentBooking || '—'}
                      </td>
                      {/* Action buttons matching screenshot */}
                      <td className="py-3 px-4 text-center">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => setQrModalTable(t)}
                            title="Table QR Code"
                            className="p-1.5 rounded-xl bg-[#FAF7F5] hover:bg-[#F3EAE7] text-[#500F1D] border border-[#E8DDD8] transition-colors"
                          >
                            <QrCode size={15} />
                          </button>
                          <button
                            onClick={() => handleOpenEditTable(t)}
                            title="Edit Table"
                            className="p-1.5 rounded-xl bg-[#FAF7F5] hover:bg-[#F3EAE7] text-[#500F1D] border border-[#E8DDD8] transition-colors"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => setDeleteTableTarget(t)}
                            title="Delete Table"
                            className="p-1.5 rounded-xl bg-[#FAF7F5] hover:bg-red-50 text-red-600 border border-[#E8DDD8] transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: SECTIONS */}
      {activeSubTab === 'sections' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#500F1D]">Dining Floor Sections & Zones</h2>
              <p className="text-xs text-[#500F1D]/70">Partition restaurant floor space into zones with allocated capacity and section captains.</p>
            </div>
            <button
              onClick={handleOpenAddSection}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] transition-all shadow-sm"
            >
              <Plus size={16} />
              <span>+ Add Floor Section</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((sec) => (
              <div 
                key={sec.id} 
                className="bg-white rounded-3xl border border-[#E8DDD8] p-6 shadow-sm hover:border-[#500F1D]/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#500F1D]/10 text-[#500F1D]">
                      {sec.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {sec.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#500F1D] mb-1">{sec.name}</h3>
                  <p className="text-xs text-[#500F1D]/60 mb-4">{sec.floor}</p>

                  <div className="space-y-2 p-3 bg-[#FAF7F5] rounded-2xl border border-[#E8DDD8] text-xs mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/70">Total Tables:</span>
                      <span className="font-bold text-[#500F1D]">{sec.totalTables}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/70">Max Guest Capacity:</span>
                      <span className="font-bold text-[#500F1D]">{sec.maxCapacity} Guests</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/70">Section Manager:</span>
                      <span className="font-medium text-[#500F1D]">{sec.manager}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8DDD8] flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEditSection(sec)}
                    className="p-2 rounded-xl bg-[#FAF7F5] hover:bg-[#F3EAE7] text-[#500F1D] border border-[#E8DDD8]"
                    title="Edit Section"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => setDeleteSectionTarget(sec)}
                    className="p-2 rounded-xl bg-[#FAF7F5] hover:bg-red-50 text-red-600 border border-[#E8DDD8]"
                    title="Delete Section"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: TABLE TYPES */}
      {activeSubTab === 'types' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#500F1D]">Table Seating Categories & Surcharges</h2>
              <p className="text-xs text-[#500F1D]/70">Classify furniture setups from intimate booths to large celebration banquets.</p>
            </div>
            <button
              onClick={handleOpenAddType}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] transition-all shadow-sm"
            >
              <Plus size={16} />
              <span>+ Add Table Type</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {types.map((tp) => (
              <div 
                key={tp.id} 
                className="bg-white rounded-3xl border border-[#E8DDD8] p-6 shadow-sm flex flex-col justify-between hover:border-[#500F1D]/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#FAF7F5] border border-[#E8DDD8] text-[#500F1D]">
                      {tp.id}
                    </span>
                    {tp.surcharge > 0 && (
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E5A81E]/15 text-[#996500] border border-[#E5A81E]/30">
                        +{formatCurrency(tp.surcharge)} Surcharge
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#500F1D] mb-1">{tp.name}</h3>
                  <p className="text-xs text-[#500F1D]/70 leading-relaxed mb-4">{tp.description}</p>

                  <div className="p-3 bg-[#FAF7F5] rounded-2xl border border-[#E8DDD8] text-xs space-y-1.5 mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/70">Standard Guests:</span>
                      <span className="font-bold text-[#500F1D]">{tp.stdCapacity} Persons</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/70">Min - Max Capacity:</span>
                      <span className="font-semibold text-[#500F1D]">{tp.minCapacity} to {tp.maxCapacity} Guests</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8DDD8] flex items-center justify-end gap-2">
                  <button
                    onClick={() => handleOpenEditType(tp)}
                    className="p-2 rounded-xl bg-[#FAF7F5] hover:bg-[#F3EAE7] text-[#500F1D] border border-[#E8DDD8]"
                    title="Edit Type"
                  >
                    <Edit3 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 4: COMBINATIONS */}
      {activeSubTab === 'combinations' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-serif font-bold text-[#500F1D]">Multi-Table Combinations & Party Pods</h2>
              <p className="text-xs text-[#500F1D]/70">Quickly merge adjacent tables for large birthday feasts, delegations, or wedding receptions.</p>
            </div>
            <button
              onClick={() => setCombModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs sm:text-sm font-semibold hover:bg-[#3D0A15] transition-all shadow-sm"
            >
              <Plus size={16} />
              <span>+ Create Combination</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {combinations.map((comb) => (
              <div 
                key={comb.id} 
                className="bg-white rounded-3xl border border-[#E8DDD8] p-6 shadow-sm flex flex-col justify-between hover:border-[#500F1D]/30 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#500F1D]/10 text-[#500F1D]">
                      {comb.id}
                    </span>
                    <button
                      onClick={() => handleToggleCombinationStatus(comb.id)}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                        comb.status === 'Joined' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : 'bg-gray-100 text-gray-700 border border-gray-200'
                      }`}
                    >
                      {comb.status === 'Joined' ? <Merge size={12} /> : <Split size={12} />}
                      <span>{comb.status}</span>
                    </button>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#500F1D] mb-1">{comb.name}</h3>
                  <p className="text-xs text-[#500F1D]/60 mb-4">{comb.section}</p>

                  <div className="p-3 bg-[#FAF7F5] rounded-2xl border border-[#E8DDD8] text-xs space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#500F1D]/70">Combined Tables:</span>
                      <div className="flex gap-1.5">
                        {comb.tableIds?.map(tId => (
                          <span key={tId} className="px-2 py-0.5 rounded bg-white border border-[#E8DDD8] font-bold text-[#500F1D]">
                            {tId}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/70">Joint Seating:</span>
                      <span className="font-bold text-[#500F1D]">{comb.combinedCapacity} Guests</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#500F1D]/70">Single Unit Booking:</span>
                      <span className="font-semibold text-emerald-700">
                        {comb.allowSingleUnitBooking ? 'Allowed' : 'Requires Approval'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E8DDD8] flex items-center justify-between">
                  <span className="text-xs text-[#500F1D]/60">Status: {comb.status}</span>
                  <button
                    onClick={() => handleToggleCombinationStatus(comb.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F5] hover:bg-[#F3EAE7] text-[#500F1D] border border-[#E8DDD8] text-xs font-semibold"
                  >
                    {comb.status === 'Joined' ? 'Split Tables' : 'Join Tables'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- MODALS --- */}

      {/* ADD/EDIT TABLE MODAL */}
      {tableModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DDD8] animate-scaleUp">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD8] mb-6">
              <h3 className="text-xl font-serif font-bold text-[#500F1D]">
                {editingTable ? 'Edit Table Settings' : 'Add New Table'}
              </h3>
              <button onClick={() => setTableModalOpen(false)} className="text-[#500F1D]/60 hover:text-[#500F1D]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTable} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Table No *</label>
                  <input
                    type="text"
                    required
                    placeholder="T01"
                    value={tableForm.number}
                    onChange={(e) => setTableForm({ ...tableForm, number: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Capacity (Seats)</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={tableForm.capacity}
                    onChange={(e) => setTableForm({ ...tableForm, capacity: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Min Spend / Price (₹)</label>
                  <input
                    type="number"
                    value={tableForm.price}
                    onChange={(e) => setTableForm({ ...tableForm, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Table Shape</label>
                  <select
                    value={tableForm.shape}
                    onChange={(e) => setTableForm({ ...tableForm, shape: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  >
                    <option value="Round">Round</option>
                    <option value="Square">Square</option>
                    <option value="Rectangular">Rectangular</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Floor Location / Section</label>
                <select
                  value={tableForm.location}
                  onChange={(e) => setTableForm({ ...tableForm, location: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                >
                  {sections.map(s => (
                    <option key={s.id} value={s.name}>{s.name} ({s.floor})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Table Type</label>
                <select
                  value={tableForm.type}
                  onChange={(e) => setTableForm({ ...tableForm, type: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                >
                  {types.map(t => (
                    <option key={t.id} value={t.name}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Status</label>
                <select
                  value={tableForm.status}
                  onChange={(e) => setTableForm({ ...tableForm, status: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                >
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Occupied">Occupied</option>
                  <option value="Cleaning">Cleaning</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E8DDD8]">
                <button
                  type="button"
                  onClick={() => setTableModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs font-semibold hover:bg-[#3D0A15]"
                >
                  Save Table
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QR CODE MODAL */}
      {qrModalTable && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E8DDD8] text-center animate-scaleUp">
            <div className="w-10 h-10 rounded-2xl bg-[#500F1D]/10 flex items-center justify-center text-[#500F1D] mx-auto mb-3">
              <QrCode size={22} />
            </div>
            <h4 className="text-xl font-serif font-bold text-[#500F1D]">Table {qrModalTable.number || qrModalTable.id}</h4>
            <p className="text-xs text-[#500F1D]/70 mb-4">{qrModalTable.location || 'Indoor Hall'} • {qrModalTable.capacity} Seater</p>

            {/* QR Mock graphic */}
            <div className="p-4 bg-[#FAF7F5] rounded-2xl border border-[#E8DDD8] inline-block mb-4">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://lunar-dine.com/menu?table=${qrModalTable.number || qrModalTable.id}`}
                alt="Table QR"
                className="w-44 h-44 rounded-xl mx-auto shadow-xs"
              />
            </div>
            <p className="text-[11px] text-[#500F1D]/60 mb-5">
              Guests scan to browse digital menu, call server, or pay directly via UPI.
            </p>

            <button
              onClick={() => setQrModalTable(null)}
              className="w-full py-2.5 rounded-xl bg-[#500F1D] text-white text-xs font-semibold hover:bg-[#3D0A15]"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* DELETE TABLE CONFIRM */}
      {deleteTableTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E8DDD8] text-center">
            <h4 className="text-lg font-serif font-bold text-[#500F1D] mb-1">Delete Table?</h4>
            <p className="text-xs text-[#500F1D]/70 mb-6">
              Remove Table <strong>{deleteTableTarget.number || deleteTableTarget.id}</strong> from active floor inventory?
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteTableTarget(null)}
                className="px-4 py-2 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteTable}
                className="px-5 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION MODAL */}
      {sectionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DDD8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD8] mb-6">
              <h3 className="text-xl font-serif font-bold text-[#500F1D]">
                {editingSection ? 'Edit Floor Section' : 'Add Floor Section'}
              </h3>
              <button onClick={() => setSectionModalOpen(false)} className="text-[#500F1D]/60 hover:text-[#500F1D]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveSection} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Section Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Outdoor Royal Terrace"
                  value={sectionForm.name}
                  onChange={(e) => setSectionForm({ ...sectionForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Floor Level</label>
                  <input
                    type="text"
                    placeholder="Ground Floor"
                    value={sectionForm.floor}
                    onChange={(e) => setSectionForm({ ...sectionForm, floor: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Total Tables</label>
                  <input
                    type="number"
                    value={sectionForm.totalTables}
                    onChange={(e) => setSectionForm({ ...sectionForm, totalTables: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Max Guests</label>
                  <input
                    type="number"
                    value={sectionForm.maxCapacity}
                    onChange={(e) => setSectionForm({ ...sectionForm, maxCapacity: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Section Captain</label>
                  <input
                    type="text"
                    value={sectionForm.manager}
                    onChange={(e) => setSectionForm({ ...sectionForm, manager: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E8DDD8]">
                <button
                  type="button"
                  onClick={() => setSectionModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs font-semibold hover:bg-[#3D0A15]"
                >
                  Save Section
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE SECTION CONFIRM */}
      {deleteSectionTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-[#E8DDD8] text-center">
            <h4 className="text-lg font-serif font-bold text-[#500F1D] mb-1">Delete Section?</h4>
            <p className="text-xs text-[#500F1D]/70 mb-6">
              Delete "{deleteSectionTarget.name}"? Tables in this section must be moved to another area.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeleteSectionTarget(null)}
                className="px-4 py-2 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteSection}
                className="px-5 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TABLE TYPE MODAL */}
      {typeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DDD8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD8] mb-6">
              <h3 className="text-xl font-serif font-bold text-[#500F1D]">
                {editingType ? 'Edit Table Type' : 'Add Table Type'}
              </h3>
              <button onClick={() => setTypeModalOpen(false)} className="text-[#500F1D]/60 hover:text-[#500F1D]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveType} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Type Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Booth"
                  value={typeForm.name}
                  onChange={(e) => setTypeForm({ ...typeForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Std Seats</label>
                  <input
                    type="number"
                    value={typeForm.stdCapacity}
                    onChange={(e) => setTypeForm({ ...typeForm, stdCapacity: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Min</label>
                  <input
                    type="number"
                    value={typeForm.minCapacity}
                    onChange={(e) => setTypeForm({ ...typeForm, minCapacity: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Max</label>
                  <input
                    type="number"
                    value={typeForm.maxCapacity}
                    onChange={(e) => setTypeForm({ ...typeForm, maxCapacity: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Base Surcharge (₹)</label>
                <input
                  type="number"
                  value={typeForm.surcharge}
                  onChange={(e) => setTypeForm({ ...typeForm, surcharge: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Description</label>
                <textarea
                  rows={2}
                  value={typeForm.description}
                  onChange={(e) => setTypeForm({ ...typeForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E8DDD8]">
                <button
                  type="button"
                  onClick={() => setTypeModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs font-semibold hover:bg-[#3D0A15]"
                >
                  Save Type
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* COMBINATION MODAL */}
      {combModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-[#E8DDD8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8DDD8] mb-6">
              <h3 className="text-xl font-serif font-bold text-[#500F1D]">Create Table Combination</h3>
              <button onClick={() => setCombModalOpen(false)} className="text-[#500F1D]/60 hover:text-[#500F1D]">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCombination} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Combination Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. VIP Banquet Cluster"
                  value={combForm.name}
                  onChange={(e) => setCombForm({ ...combForm, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Tables to Merge (comma separated)</label>
                <input
                  type="text"
                  required
                  placeholder="T01, T02"
                  value={combForm.tableIds}
                  onChange={(e) => setCombForm({ ...combForm, tableIds: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Joint Capacity</label>
                  <input
                    type="number"
                    value={combForm.combinedCapacity}
                    onChange={(e) => setCombForm({ ...combForm, combinedCapacity: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#500F1D] uppercase tracking-wider mb-1.5">Section</label>
                  <select
                    value={combForm.section}
                    onChange={(e) => setCombForm({ ...combForm, section: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DDD8] text-sm text-[#500F1D] focus:outline-none"
                  >
                    {sections.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E8DDD8]">
                <button
                  type="button"
                  onClick={() => setCombModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-[#E8DDD8] text-xs font-semibold text-[#500F1D]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#500F1D] text-white text-xs font-semibold hover:bg-[#3D0A15]"
                >
                  Create Cluster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableManagementAdmin;
