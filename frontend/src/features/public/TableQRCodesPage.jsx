import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'qrcode';
import { indoorTables, outdoorTables, allTables } from '../../data/restaurantTables';
import { 
  QrCode, 
  ExternalLink, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  Search, 
  Sparkles, 
  UtensilsCrossed,
  Users,
  MapPin,
  Eye,
  X
} from 'lucide-react';

export const TableQRCodesPage = () => {
  const [filterHall, setFilterHall] = useState('all'); // 'all' | 'indoor' | 'outdoor'
  const [filterType, setFilterType] = useState('all'); // 'all' | '2-Seater' | '4-Seater' | '6-Seater'
  const [searchQuery, setSearchQuery] = useState('');
  const [qrCodeUrls, setQrCodeUrls] = useState({});
  const [copiedTableId, setCopiedTableId] = useState(null);
  const [previewTable, setPreviewTable] = useState(null);

  // Generate QR codes for all tables on mount
  useEffect(() => {
    const origin = window.location.origin;
    const generateAllQRs = async () => {
      const generated = {};
      for (const table of allTables) {
        const targetUrl = `${origin}/menu?table=${table.id}`;
        try {
          const dataUrl = await QRCode.toDataURL(targetUrl, {
            width: 320,
            margin: 2,
            color: {
              dark: '#4C1824', // Luxury deep maroon
              light: '#FFFFFF'
            },
            errorCorrectionLevel: 'H'
          });
          generated[table.id] = dataUrl;
        } catch (err) {
          console.error(`Failed to generate QR for ${table.id}`, err);
        }
      }
      setQrCodeUrls(generated);
    };

    generateAllQRs();
  }, []);

  const handleCopyLink = (tableId) => {
    const url = `${window.location.origin}/menu?table=${tableId}`;
    navigator.clipboard.writeText(url);
    setCopiedTableId(tableId);
    setTimeout(() => setCopiedTableId(null), 2000);
  };

  const handleDownloadQR = (table) => {
    const dataUrl = qrCodeUrls[table.id];
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `Lunar-${table.id}-QR-Menu.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintAll = () => {
    window.print();
  };

  const filteredTables = allTables.filter((table) => {
    if (filterHall === 'indoor' && table.isOutdoor) return false;
    if (filterHall === 'outdoor' && !table.isOutdoor) return false;
    if (filterType !== 'all' && table.type !== filterType) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        table.id.toLowerCase().includes(query) ||
        table.name.toLowerCase().includes(query) ||
        table.area.toLowerCase().includes(query)
      );
    }
    return true;
  });

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-20 font-hanken">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-b from-[#4C1824] to-[#2B181C] text-white py-12 px-4 sm:px-6 lg:px-8 shadow-md print:hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-[#FABE24] mb-3">
              <QrCode className="w-3.5 h-3.5 text-[#FABE24]" />
              <span>Smart Contactless Dining System</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Table QR Code Station
            </h1>
            <p className="text-white/80 text-xs sm:text-sm max-w-xl mt-2 leading-relaxed">
              Every table has a dedicated QR code. When scanned at the table, it automatically detects the table number, connects with the customer's account, and opens the live ordering menu!
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              type="button"
              onClick={handlePrintAll}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#FABE24]" />
              <span>Print Table Cards</span>
            </button>
            <Link
              to="/menu"
              className="bg-[#FABE24] hover:bg-[#E5AC20] text-[#2B181C] px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Go to Food Menu</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Filter & Search Bar */}
        <div className="bg-white rounded-2xl border border-[#EADBCC] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 print:hidden">
          {/* Hall Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => setFilterHall('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filterHall === 'all'
                  ? 'bg-[#4C1824] text-white shadow-xs'
                  : 'bg-[#FAF5EE] text-[#7A5B53] hover:bg-[#F0E5D8]'
              }`}
            >
              All Tables ({allTables.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterHall('indoor')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filterHall === 'indoor'
                  ? 'bg-[#4C1824] text-white shadow-xs'
                  : 'bg-[#FAF5EE] text-[#7A5B53] hover:bg-[#F0E5D8]'
              }`}
            >
              Indoor Hall (T01 - T10)
            </button>
            <button
              type="button"
              onClick={() => setFilterHall('outdoor')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                filterHall === 'outdoor'
                  ? 'bg-[#4C1824] text-white shadow-xs'
                  : 'bg-[#FAF5EE] text-[#7A5B53] hover:bg-[#F0E5D8]'
              }`}
            >
              Outdoor Sky Terrace (T11 - T16)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-[#7A5B53] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search table number or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FAF5EE] border border-[#EADBCC] rounded-full pl-10 pr-4 py-2 text-xs sm:text-sm text-[#2B181C] placeholder:text-[#9C8279] focus:outline-none focus:border-[#4C1824]"
            />
          </div>
        </div>

        {/* QR Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTables.map((table) => {
            const qrDataUrl = qrCodeUrls[table.id];
            const targetUrl = `${window.location.origin}/menu?table=${table.id}`;

            return (
              <div
                key={table.id}
                className="bg-white rounded-3xl border border-[#EADBCC] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group print:break-inside-avoid print:border-2 print:border-black print:rounded-xl"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-serif text-xl font-bold text-[#2B181C]">
                          {table.name}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          table.isOutdoor
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}>
                          {table.hall || (table.isOutdoor ? 'Outdoor Sky Terrace' : 'Indoor Hall')}
                        </span>
                      </div>
                      <p className="text-xs text-[#7A5B53] mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#4C1824]" />
                        <span>{table.area}</span>
                      </p>
                    </div>

                    <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-[#FAF5EE] text-[#4C1824] border border-[#EADBCC] flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{table.type}</span>
                    </span>
                  </div>

                  {/* QR Code Graphic Box */}
                  <div className="relative my-4 p-4 rounded-2xl bg-[#FAF5EE] border border-[#EADBCC] flex flex-col items-center justify-center">
                    {qrDataUrl ? (
                      <div className="relative">
                        <img
                          src={qrDataUrl}
                          alt={`QR Code for ${table.name}`}
                          className="w-48 h-48 sm:w-52 sm:h-52 rounded-xl object-contain shadow-xs bg-white p-2 border border-[#EADBCC]/60"
                        />
                        {/* Center Luxury Emblem */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-9 h-9 rounded-full bg-[#4C1824] text-[#FABE24] border-2 border-white flex items-center justify-center shadow-md font-serif text-[11px] font-bold">
                            {table.id}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-48 h-48 rounded-xl bg-black/5 animate-pulse flex items-center justify-center">
                        <span className="text-xs text-[#7A5B53]">Generating QR...</span>
                      </div>
                    )}

                    <p className="text-[11px] font-semibold text-[#4C1824] mt-2.5 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#FABE24]" />
                      <span>Scan with Phone Camera</span>
                    </p>
                  </div>

                  {/* Scannable Target URL */}
                  <div className="p-2 rounded-xl bg-[#FAF5EE]/70 border border-[#EADBCC]/60 text-[11px] font-mono text-[#7A5B53] truncate text-center mb-4">
                    /menu?table={table.id}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-[#F0E5D8] print:hidden">
                  {/* Test Scan / Open Menu directly */}
                  <Link
                    to={`/menu?table=${table.id}`}
                    className="w-full bg-[#4C1824] hover:bg-[#38111A] text-white py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#FABE24]" />
                    <span>Test Scan (Open Menu)</span>
                  </Link>

                  <div className="grid grid-cols-3 gap-1.5">
                    {/* Copy Link */}
                    <button
                      type="button"
                      onClick={() => handleCopyLink(table.id)}
                      title="Copy URL"
                      className="py-1.5 px-2 rounded-xl border border-[#EADBCC] bg-white text-[#7A5B53] hover:text-[#4C1824] hover:bg-[#FAF5EE] text-[11px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      {copiedTableId === table.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Link</span>
                        </>
                      )}
                    </button>

                    {/* Download PNG */}
                    <button
                      type="button"
                      onClick={() => handleDownloadQR(table)}
                      title="Download QR Image"
                      className="py-1.5 px-2 rounded-xl border border-[#EADBCC] bg-white text-[#7A5B53] hover:text-[#4C1824] hover:bg-[#FAF5EE] text-[11px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Download className="w-3 h-3" />
                      <span>PNG</span>
                    </button>

                    {/* Preview Acrylic Stand */}
                    <button
                      type="button"
                      onClick={() => setPreviewTable(table)}
                      title="Preview Stand"
                      className="py-1.5 px-2 rounded-xl border border-[#EADBCC] bg-white text-[#7A5B53] hover:text-[#4C1824] hover:bg-[#FAF5EE] text-[11px] font-medium flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <Eye className="w-3 h-3" />
                      <span>Stand</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Acrylic Stand Preview for Printing */}
      {previewTable && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border-2 border-[#FABE24] shadow-2xl relative text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setPreviewTable(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-[#7A5B53] hover:bg-black/5"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Stand Header */}
            <div>
              <div className="w-10 h-10 rounded-full bg-[#4C1824] text-[#FABE24] mx-auto flex items-center justify-center shadow-xs mb-2">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#4C1824]">
                LUNAR DINING
              </h3>
              <p className="text-xs uppercase tracking-widest text-[#B58237] font-semibold">
                Smart Table Service
              </p>
            </div>

            {/* Table Badge */}
            <div className="inline-block bg-[#FAF5EE] border border-[#EADBCC] px-4 py-1.5 rounded-full text-xs font-bold text-[#2B181C]">
              {previewTable.name} • {previewTable.area}
            </div>

            {/* QR Code in Stand */}
            <div className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#EADBCC] inline-block shadow-inner">
              <img
                src={qrCodeUrls[previewTable.id]}
                alt={previewTable.name}
                className="w-48 h-48 mx-auto rounded-xl object-contain bg-white p-2 border border-[#EADBCC]"
              />
            </div>

            {/* Scan Instructions */}
            <div className="space-y-1">
              <p className="font-bold text-sm text-[#2B181C]">
                Scan to View Menu & Order
              </p>
              <p className="text-[11px] text-[#7A5B53] max-w-[240px] mx-auto leading-relaxed">
                Point your mobile camera at this QR code to place orders directly to the kitchen.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleDownloadQR(previewTable)}
                className="w-full bg-[#4C1824] hover:bg-[#38111A] text-white py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <Download className="w-4 h-4 text-[#FABE24]" />
                <span>Download Stand Graphic</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableQRCodesPage;
