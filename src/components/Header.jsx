import React, { useState, useEffect, useRef } from 'react';
import { getAvatarDataUrl } from '../utils/defaultData';

export default function Header({
  theme,
  onToggleTheme,
  onStats,
  onResetDemo,
  onExport,
  onImport,
  members,
  onSelectMember,
  onFocusNode,
  relationMode,
  onCalculateRelation,
  relationFirstId
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);

  // Close search dropdown and menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(e.target.value.trim().length > 0);
  };

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const handleResultClick = (member) => {
    if (relationMode) {
      onCalculateRelation(relationFirstId, member.id);
    } else {
      onSelectMember(member.id);
      onFocusNode(member.id);
    }
    setSearchTerm('');
    setShowDropdown(false);
  };

  return (
    <header className="app-header flex items-center justify-between px-4 md:px-6 py-3 border-b border-stone-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-[100] h-[70px]">
      {/* Logo Area */}
      <div className="logo-area flex items-center gap-3">
        <div className="logo-icon w-10 h-10 rounded-full bg-amber-50 dark:bg-slate-900 border border-stone-200 dark:border-slate-800 flex items-center justify-center text-amber-600 dark:text-yellow-500 text-lg">
          <i className="fa-solid fa-hands-holding-child"></i>
        </div>
        <div className="logo-text hidden sm:block">
          <h1 className="font-serif text-lg font-bold text-stone-800 dark:text-slate-100 leading-tight">Gia Phả Ký</h1>
          <span className="text-[10px] text-stone-500 dark:text-slate-400 tracking-wider uppercase">Sơ đồ gia phả trực quan</span>
        </div>
      </div>

      {/* Search Input */}
      <div className="search-bar-container relative max-w-sm w-full mx-4" ref={dropdownRef}>
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass search-icon absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-slate-500 text-xs"></i>
          <input
            type="text"
            id="search-input"
            className="w-full pl-9 pr-4 py-2 text-sm rounded-full border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-900 text-stone-800 dark:text-slate-200 placeholder-stone-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 focus:bg-white dark:focus:bg-slate-950 transition-all"
            placeholder="Tìm kiếm người trong gia tộc..."
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={() => searchTerm.trim().length > 0 && setShowDropdown(true)}
          />
        </div>
        
        {showDropdown && (
          <div id="search-results" className="search-results-dropdown absolute top-full left-0 right-0 mt-2 max-h-[300px] overflow-y-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-stone-200 dark:border-slate-850 rounded-2xl shadow-xl z-[110]">
            {filteredMembers.length === 0 ? (
              <div className="p-4 text-center text-sm text-stone-500 dark:text-slate-400 italic">
                Không tìm thấy thành viên
              </div>
            ) : (
              filteredMembers.map(m => (
                <div
                  key={m.id}
                  className="search-result-item flex items-center gap-3 p-3 cursor-pointer hover:bg-stone-50 dark:hover:bg-slate-850 border-b border-stone-100 dark:border-slate-800 last:border-0 transition-colors"
                  onClick={() => handleResultClick(m)}
                >
                  <img
                    src={getAvatarDataUrl(m.avatar, m.name, m.gender)}
                    className="w-8 h-8 rounded-full object-cover border border-stone-200 dark:border-slate-700 flex-shrink-0"
                    alt={m.name}
                  />
                  <div className="search-result-info min-w-0 flex-1">
                    <h4 className="text-sm font-semibold text-stone-700 dark:text-slate-200 truncate">{m.name}</h4>
                    <p className="text-xs text-stone-500 dark:text-slate-400">
                      {m.birthDate || "Chưa rõ"} - {m.isDeceased ? (m.deathDate || "đã mất") : "Hiện tại"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Header Actions */}
      <div className="header-actions flex items-center gap-2">
        {/* Theme Toggle Button */}
        <button
          className="w-9 h-9 flex items-center justify-center rounded-full border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-900 text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all"
          onClick={onToggleTheme}
          title="Đổi giao diện"
        >
          <i className={`fa-solid ${theme === 'dark-theme' ? 'fa-sun text-yellow-500' : 'fa-moon text-stone-600'}`}></i>
        </button>

        {/* Dropdown Menu Container */}
        <div className="relative" ref={menuRef}>
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full border border-stone-200 dark:border-slate-800 bg-stone-50 dark:bg-slate-900 text-stone-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 hover:scale-105 active:scale-95 transition-all"
            onClick={() => setShowMenu(!showMenu)}
            title="Công cụ & Tiện ích"
          >
            <i className="fa-solid fa-ellipsis-vertical text-lg"></i>
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-stone-200 dark:border-slate-800 rounded-2xl shadow-xl p-1.5 z-[110] flex flex-col gap-0.5 animate-in fade-in slide-in-from-top-2 duration-200">
              <button
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-stone-700 dark:text-slate-200 hover:bg-stone-50 dark:hover:bg-slate-800/60 rounded-xl transition-all border-0 bg-transparent outline-none cursor-pointer text-left"
                onClick={() => { onStats(); setShowMenu(false); }}
              >
                <i className="fa-solid fa-chart-pie text-amber-500 w-4 text-center"></i>
                <span className="font-medium">Thống kê gia phả</span>
              </button>
              <button
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-stone-700 dark:text-slate-200 hover:bg-stone-50 dark:hover:bg-slate-800/60 rounded-xl transition-all border-0 bg-transparent outline-none cursor-pointer text-left"
                onClick={() => { onResetDemo(); setShowMenu(false); }}
              >
                <i className="fa-solid fa-rotate-left text-amber-500 w-4 text-center"></i>
                <span className="font-medium">Đặt lại mẫu</span>
              </button>
              <div className="h-px bg-stone-100 dark:bg-slate-800 my-1 mx-2" />
              <button
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-stone-700 dark:text-slate-200 hover:bg-stone-50 dark:hover:bg-slate-800/60 rounded-xl transition-all border-0 bg-transparent outline-none cursor-pointer text-left"
                onClick={() => { onExport(); setShowMenu(false); }}
              >
                <i className="fa-solid fa-file-export text-amber-500 w-4 text-center"></i>
                <span className="font-medium">Xuất dữ liệu JSON</span>
              </button>
              <label
                htmlFor="import-file-input-header"
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-stone-700 dark:text-slate-200 hover:bg-stone-50 dark:hover:bg-slate-800/60 rounded-xl transition-all border-0 bg-transparent outline-none cursor-pointer text-left"
              >
                <i className="fa-solid fa-file-import text-amber-500 w-4 text-center"></i>
                <span className="font-medium">Nhập dữ liệu JSON</span>
              </label>
              <input
                type="file"
                id="import-file-input-header"
                accept=".json"
                className="hidden"
                onChange={(e) => { onImport(e); setShowMenu(false); }}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
