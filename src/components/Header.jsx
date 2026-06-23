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
  const dropdownRef = useRef(null);

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
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
    <header className="app-header">
      <div className="logo-area">
        <i className="fa-solid fa-hands-holding-child logo-icon"></i>
        <div className="logo-text">
          <h1>Gia Phả Ký</h1>
          <span>Sơ đồ gia phả trực quan</span>
        </div>
      </div>

      <div className="search-bar-container" ref={dropdownRef}>
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <input
          type="text"
          id="search-input"
          placeholder="Tìm kiếm thành viên trong gia tộc..."
          value={searchTerm}
          onChange={handleSearchChange}
          onFocus={() => searchTerm.trim().length > 0 && setShowDropdown(true)}
        />
        {showDropdown && (
          <div id="search-results" className="search-results-dropdown">
            {filteredMembers.length === 0 ? (
              <div className="search-result-item">
                <span className="text-sm text-stone-500 dark:text-slate-400">Không tìm thấy thành viên</span>
              </div>
            ) : (
              filteredMembers.map(m => (
                <div
                  key={m.id}
                  className="search-result-item"
                  onClick={() => handleResultClick(m)}
                >
                  <img
                    src={getAvatarDataUrl(m.avatar, m.name, m.gender)}
                    className="search-result-avatar"
                    alt={m.name}
                  />
                  <div className="search-result-info">
                    <h4>{m.name}</h4>
                    <p>
                      {m.birthDate || "Chưa rõ"} - {m.isDeceased ? (m.deathDate || "đã mất") : "Hiện tại"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="header-actions">
        <button id="btn-stats" className="btn btn-secondary" onClick={onStats} title="Thống kê gia phả">
          <i className="fa-solid fa-chart-pie"></i> <span className="btn-text">Thống kê</span>
        </button>
        <button id="btn-reset-demo" className="btn btn-secondary" onClick={onResetDemo} title="Khôi phục dữ liệu mẫu">
          <i className="fa-solid fa-rotate-left"></i> <span className="btn-text">Đặt lại mẫu</span>
        </button>
        <button id="btn-export" className="btn btn-secondary" onClick={onExport} title="Xuất dữ liệu JSON">
          <i className="fa-solid fa-file-export"></i> <span className="btn-text">Xuất JSON</span>
        </button>
        
        <label htmlFor="import-file-input" className="btn btn-secondary cursor-pointer" title="Nhập dữ liệu JSON">
          <i className="fa-solid fa-file-import"></i> <span className="btn-text">Nhập JSON</span>
        </label>
        <input
          type="file"
          id="import-file-input"
          accept=".json"
          className="hidden"
          onChange={onImport}
        />
        
        <button id="theme-toggle" className="btn btn-icon" onClick={onToggleTheme} title="Đổi giao diện">
          <i className={`fa-solid ${theme === 'dark-theme' ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
      </div>
    </header>
  );
}
