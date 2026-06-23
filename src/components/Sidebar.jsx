import React, { useState, useEffect } from 'react';
import { getAvatarDataUrl, avatarTemplates } from '../utils/defaultData';

export default function Sidebar({
  selectedMemberId,
  members,
  nodes,
  formType,
  onOpenForm,
  onCancelForm,
  onSaveMember,
  onDeleteMember,
  onSelectMember,
  onFocusNode,
  onStartRelationMode,
  relationResult,
  onCloseRelationResult
}) {
  const selectedMember = members.find(m => m.id === selectedMemberId);

  // Form states
  const [name, setName] = useState('');
  const [gender, setGender] = useState('Nam');
  const [status, setStatus] = useState('alive');
  const [birthDate, setBirthDate] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [job, setJob] = useState('');
  const [video, setVideo] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');

  // Sync form states with selected member when editing, or reset when adding
  useEffect(() => {
    if (formType === 'edit' && selectedMember) {
      setName(selectedMember.name || '');
      setGender(selectedMember.gender || 'Nam');
      setStatus(selectedMember.isDeceased ? 'deceased' : 'alive');
      setBirthDate(selectedMember.birthDate || '');
      setDeathDate(selectedMember.deathDate || '');
      setJob(selectedMember.job || '');
      setVideo(selectedMember.video || '');
      setAvatar(selectedMember.avatar || '');
      setBio(selectedMember.bio || '');
    } else if (formType && formType.startsWith('add-')) {
      setName('');
      // Default gender guesses
      if (formType === 'add-spouse') {
        setGender(selectedMember?.gender === 'Nam' ? 'Nữ' : 'Nam');
      } else {
        setGender('Nam');
      }
      setStatus('alive');
      setBirthDate('');
      setDeathDate('');
      setJob('');
      setVideo('');
      // Smart avatar default based on gender/age guess
      setAvatar(formType === 'add-child' ? 'avatar-male-kid' : 'avatar-male-mid');
      setBio('');
    }
  }, [formType, selectedMemberId]);

  // Adjust avatar option when gender changes during add/edit
  const handleGenderChange = (newGender) => {
    setGender(newGender);
    if (formType && formType.startsWith('add-')) {
      if (formType === 'add-child') {
        setAvatar(newGender === 'Nam' ? 'avatar-male-kid' : 'avatar-female-kid');
      } else if (formType === 'add-parent') {
        setAvatar(newGender === 'Nam' ? 'avatar-male-senior' : 'avatar-female-senior');
      } else {
        setAvatar(newGender === 'Nam' ? 'avatar-male-mid' : 'avatar-female-mid');
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Họ và tên là bắt buộc.");
      return;
    }
    onSaveMember({
      id: formType === 'edit' ? selectedMemberId : null,
      name,
      gender,
      isDeceased: status === 'deceased',
      birthDate,
      deathDate: status === 'deceased' ? deathDate : '',
      job,
      video,
      avatar,
      bio
    });
  };

  // Helper to extract YouTube video ID
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const ytId = selectedMember ? getYouTubeId(selectedMember.video) : null;

  // Sidebar Open condition (for mobile sliding bottom sheet)
  const isSidebarOpen = selectedMemberId !== null;

  return (
    <aside className={`app-sidebar ${isSidebarOpen ? 'open' : ''}`} id="app-sidebar">
      {/* 1. EMPTY STATE PANEL */}
      {!selectedMemberId && (
        <div id="sidebar-empty-state" className="sidebar-panel">
          <div className="empty-state-content">
            <i className="fa-solid fa-network-wired empty-icon text-stone-300 dark:text-slate-600"></i>
            <h3>Khám Phá Gia Tộc</h3>
            <p>Chọn một thành viên trên sơ đồ để xem thông tin chi tiết, chỉnh sửa hoặc thêm thế hệ mới.</p>
            
            <div className="quick-stats-card bg-stone-50 dark:bg-slate-900 border border-stone-100 dark:border-slate-800 p-4 rounded-xl mt-6 w-full">
              <h4 className="font-semibold text-stone-700 dark:text-slate-300 mb-2">
                <i className="fa-solid fa-chart-line mr-2 text-amber-500"></i>Thông tin chung
              </h4>
              <div className="quick-stats-grid">
                <div className="stat-item">
                  <span className="stat-val font-bold text-2xl text-amber-600 dark:text-yellow-500">{members.length}</span>
                  <span className="stat-lbl text-xs text-stone-500">Thành viên</span>
                </div>
                <div className="stat-item">
                  <span className="stat-val font-bold text-2xl text-amber-600 dark:text-yellow-500">
                    {Object.keys(nodes).length > 0 
                      ? Math.max(...Object.keys(nodes).map(id => nodes[id].generation || 0)) + 1 
                      : 0
                    }
                  </span>
                  <span className="stat-lbl text-xs text-stone-500">Thế hệ</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. DETAIL PANEL */}
      {selectedMemberId && !formType && selectedMember && (
        <div id="sidebar-detail-panel" className="sidebar-panel">
          <div className="sidebar-header">
            <button
              id="btn-back-to-empty"
              className="btn-icon-back"
              onClick={() => onSelectMember(null)}
              title="Quay lại"
            >
              <i className="fa-solid fa-chevron-left"></i> Quay lại
            </button>
            <div className="member-actions-top">
              <button
                id="btn-edit-member"
                className="btn btn-primary-outline btn-sm"
                onClick={() => onOpenForm('edit')}
              >
                <i className="fa-solid fa-pen"></i> Sửa
              </button>
              <button
                id="btn-delete-member"
                className="btn btn-danger-outline btn-sm"
                onClick={() => onDeleteMember(selectedMember.id)}
              >
                <i className="fa-solid fa-trash"></i> Xóa
              </button>
            </div>
          </div>

          <div className="member-profile-summary">
            <div className="profile-avatar-container">
              <img
                id="detail-avatar"
                src={getAvatarDataUrl(selectedMember.avatar, selectedMember.name, selectedMember.gender)}
                alt={selectedMember.name}
                className="profile-avatar"
              />
            </div>
            <h2 id="detail-name" className="profile-name">{selectedMember.name}</h2>
            <p id="detail-dates" className="profile-dates text-stone-500 dark:text-slate-400">
              {selectedMember.birthDate || "Chưa rõ"} - {
                selectedMember.isDeceased 
                  ? (selectedMember.deathDate || "Không rõ") 
                  : "Còn sống"
              }
            </p>
            <div className="flex gap-2 items-center mt-2 justify-center">
              <span className={`badge ${selectedMember.gender === 'Nam' ? 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300' : 'bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300'}`}>
                {selectedMember.gender}
              </span>
              <button
                id="btn-calc-relation"
                className="btn btn-secondary btn-sm text-xs py-1 px-2"
                onClick={onStartRelationMode}
                title="Xem xưng hô với người khác"
              >
                <i className="fa-solid fa-people-arrows"></i> Tính xưng hô
              </button>
            </div>
          </div>

          {/* Relationship Calculation Result Box */}
          {relationResult && (
            <div id="relation-result-card" className="relation-result-card">
              <div className="relation-result-header">
                <h4><i className="fa-solid fa-calculator"></i> Kết quả xưng hô</h4>
                <button
                  id="btn-close-relation-result"
                  className="btn-close-small"
                  onClick={onCloseRelationResult}
                >
                  &times;
                </button>
              </div>
              <div className="relation-result-body">
                <div className="relation-path-visual" id="relation-path-visual">
                  {relationResult.path.map((nodeId, idx) => {
                    const m = members.find(x => x.id === nodeId);
                    const isStart = idx === 0;
                    const isEnd = idx === relationResult.path.length - 1;
                    return (
                      <React.Fragment key={`path-${nodeId}`}>
                        <span
                          className={`path-step-node ${isStart ? 'start' : (isEnd ? 'end' : '')}`}
                          onClick={() => { onFocusNode(nodeId); onSelectMember(nodeId); }}
                        >
                          {m ? m.name : 'Unknown'}
                        </span>
                        {idx < relationResult.path.length - 1 && (
                          <span className="path-step-arrow">
                            <i className="fa-solid fa-arrow-right"></i>
                          </span>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
                <div
                  className="relation-summary-text text-sm mt-3"
                  id="relation-summary-text"
                  dangerouslySetInnerHTML={{ __html: relationResult.text }}
                />
              </div>
            </div>
          )}

          {/* Basic Info */}
          <div className="detail-section">
            <h3><i className="fa-solid fa-info-circle"></i> Thông tin cơ bản</h3>
            <div className="info-list">
              <div className="info-row">
                <span className="info-label">Ngày sinh:</span>
                <span className="info-value">{selectedMember.birthDate || "-"}</span>
              </div>
              {selectedMember.isDeceased && (
                <div className="info-row" id="detail-death-row">
                  <span className="info-label">Ngày giỗ:</span>
                  <span className="info-value">{selectedMember.deathDate || "-"}</span>
                </div>
              )}
              <div className="info-row">
                <span className="info-label">Nghề nghiệp:</span>
                <span className="info-value">{selectedMember.job || "-"}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Thế hệ thứ:</span>
                <span className="info-value">
                  {nodes[selectedMember.id] ? nodes[selectedMember.id].generation + 1 : "-"}
                </span>
              </div>
            </div>
          </div>

          {/* Video Section */}
          {ytId && (
            <div className="detail-section" id="detail-video-section">
              <h3><i className="fa-solid fa-video"></i> Video tư liệu</h3>
              <div className="video-container rounded-lg overflow-hidden mt-2">
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${ytId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {/* Relationships list */}
          <div className="detail-section">
            <h3><i className="fa-solid fa-users-rectangle"></i> Mối quan hệ thân cận</h3>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {/* Render Parents */}
              {(selectedMember.parents || []).map(pId => {
                const parent = members.find(x => x.id === pId);
                if (!parent) return null;
                const label = parent.gender === 'Nam' ? 'Cha' : 'Mẹ';
                return (
                  <div
                    key={pId}
                    className="flex items-center gap-2.5 p-2 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-900/50 hover:bg-amber-50/30 dark:hover:bg-slate-800/50 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] min-w-0"
                    onClick={() => { onSelectMember(pId); onFocusNode(pId); }}
                  >
                    <img 
                      src={getAvatarDataUrl(parent.avatar, parent.name, parent.gender)} 
                      alt="" 
                      className="w-9 h-9 rounded-full object-cover border border-stone-200 dark:border-slate-700 flex-shrink-0" 
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-stone-700 dark:text-slate-200 truncate leading-normal">{parent.name}</span>
                      <span className="text-[10px] text-amber-600 dark:text-yellow-500 font-medium leading-none mt-0.5">{label}</span>
                    </div>
                  </div>
                );
              })}
              
              {/* Render Spouses */}
              {(selectedMember.spouses || []).map(sId => {
                const spouse = members.find(x => x.id === sId);
                if (!spouse) return null;
                const label = selectedMember.gender === 'Nam' ? 'Vợ' : 'Chồng';
                return (
                  <div
                    key={sId}
                    className="flex items-center gap-2.5 p-2 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-900/50 hover:bg-amber-50/30 dark:hover:bg-slate-800/50 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] min-w-0"
                    onClick={() => { onSelectMember(sId); onFocusNode(sId); }}
                  >
                    <img 
                      src={getAvatarDataUrl(spouse.avatar, spouse.name, spouse.gender)} 
                      alt="" 
                      className="w-9 h-9 rounded-full object-cover border border-stone-200 dark:border-slate-700 flex-shrink-0" 
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-stone-700 dark:text-slate-200 truncate leading-normal">{spouse.name}</span>
                      <span className="text-[10px] text-amber-600 dark:text-yellow-500 font-medium leading-none mt-0.5">{label}</span>
                    </div>
                  </div>
                );
              })}

              {/* Render Children */}
              {(selectedMember.children || []).map(cId => {
                const child = members.find(x => x.id === cId);
                if (!child) return null;
                return (
                  <div
                    key={cId}
                    className="flex items-center gap-2.5 p-2 rounded-xl border border-stone-200 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-900/50 hover:bg-amber-50/30 dark:hover:bg-slate-800/50 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] min-w-0"
                    onClick={() => { onSelectMember(cId); onFocusNode(cId); }}
                  >
                    <img 
                      src={getAvatarDataUrl(child.avatar, child.name, child.gender)} 
                      alt="" 
                      className="w-9 h-9 rounded-full object-cover border border-stone-200 dark:border-slate-700 flex-shrink-0" 
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-semibold text-stone-700 dark:text-slate-200 truncate leading-normal">{child.name}</span>
                      <span className="text-[10px] text-amber-600 dark:text-yellow-500 font-medium leading-none mt-0.5">Con</span>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Empty state relations */}
            {(!selectedMember.parents || selectedMember.parents.length === 0) &&
             (!selectedMember.spouses || selectedMember.spouses.length === 0) &&
             (!selectedMember.children || selectedMember.children.length === 0) && (
              <p className="text-xs text-stone-400 italic mt-2">Chưa cập nhật thông tin mối quan hệ</p>
            )}
          </div>

          {/* Biography */}
          <div className="detail-section">
            <h3><i className="fa-solid fa-book-open"></i> Tiểu sử / Ghi chú</h3>
            <p className="bio-text text-stone-600 dark:text-slate-300">
              {selectedMember.bio || "Chưa có thông tin tiểu sử chi tiết."}
            </p>
          </div>

          {/* Add Relation Actions */}
          <div className="detail-section relation-actions">
            <h3><i className="fa-solid fa-plus-circle"></i> Thêm liên kết gia đình</h3>
            <div className="relation-buttons-grid">
              <button
                className="btn btn-accent btn-sm"
                onClick={() => onOpenForm('add-spouse')}
              >
                <i className="fa-solid fa-heart"></i> Thêm Vợ/Chồng
              </button>
              <button
                className="btn btn-accent btn-sm"
                onClick={() => onOpenForm('add-child')}
              >
                <i className="fa-solid fa-child"></i> Thêm Con cái
              </button>
              <button
                className="btn btn-accent btn-sm"
                onClick={() => onOpenForm('add-parent')}
              >
                <i className="fa-solid fa-user-tie"></i> Thêm Cha/Mẹ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. EDITOR FORM PANEL */}
      {formType && (
        <div id="sidebar-form-panel" className="sidebar-panel">
          <div className="sidebar-header">
            <button
              id="btn-cancel-edit"
              className="btn-icon-back"
              onClick={onCancelForm}
            >
              <i className="fa-solid fa-chevron-left"></i> Hủy
            </button>
            <h3 id="form-title" className="font-semibold text-lg text-stone-800 dark:text-slate-200">
              {formType === 'edit' && 'Chỉnh sửa thông tin'}
              {formType === 'add-spouse' && `Thêm Vợ/Chồng cho ${selectedMember?.name}`}
              {formType === 'add-child' && `Thêm Con cái cho ${selectedMember?.name}`}
              {formType === 'add-parent' && `Thêm Cha/Mẹ cho ${selectedMember?.name}`}
            </h3>
          </div>

          <form id="member-form" className="member-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="form-name">Họ và tên <span className="text-red-500">*</span></label>
              <input
                type="text"
                id="form-name"
                required
                placeholder="Nhập họ và tên đầy đủ"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-grid grid grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="form-gender">Giới tính</label>
                <select
                  id="form-gender"
                  value={gender}
                  onChange={(e) => handleGenderChange(e.target.value)}
                >
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="form-status">Trạng thái</label>
                <select
                  id="form-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="alive">Còn sống</option>
                  <option value="deceased">Đã mất (Ngày giỗ)</option>
                </select>
              </div>
            </div>

            <div className="form-grid grid grid-cols-2 gap-4">
              <div className="form-group">
                <label htmlFor="form-birth-date">Ngày sinh</label>
                <input
                  type="text"
                  id="form-birth-date"
                  placeholder="DD/MM/YYYY hoặc năm"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              <div
                className="form-group"
                id="form-death-date-group"
                style={{ visibility: status === 'deceased' ? 'visible' : 'hidden' }}
              >
                <label htmlFor="form-death-date">Ngày giỗ (Ngày mất)</label>
                <input
                  type="text"
                  id="form-death-date"
                  placeholder="DD/MM/YYYY hoặc năm"
                  value={deathDate}
                  onChange={(e) => setDeathDate(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="form-job">Nghề nghiệp</label>
              <input
                type="text"
                id="form-job"
                placeholder="Ví dụ: Giáo viên, Kỹ sư..."
                value={job}
                onChange={(e) => setJob(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="form-video">Link Video tư liệu (YouTube)</label>
              <input
                type="text"
                id="form-video"
                placeholder="https://www.youtube.com/watch?v=..."
                value={video}
                onChange={(e) => setVideo(e.target.value)}
              />
            </div>

            {/* Avatar template picker */}
            <div className="form-group">
              <label>Chọn ảnh đại diện mẫu</label>
              <div className="avatar-picker" id="avatar-picker">
                {Object.keys(avatarTemplates).map(avKey => (
                  <div
                    key={avKey}
                    className={`avatar-picker-item ${avatar === avKey ? 'selected' : ''}`}
                    onClick={() => setAvatar(avKey)}
                    dangerouslySetInnerHTML={{ __html: avatarTemplates[avKey] }}
                    title={avKey}
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="form-bio">Tiểu sử / Ghi chú thêm</label>
              <textarea
                id="form-bio"
                rows="4"
                placeholder="Nhập tóm tắt tiểu sử, quê quán, học vấn..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button
                type="button"
                id="btn-form-cancel"
                className="btn btn-secondary"
                onClick={onCancelForm}
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                id="btn-form-save"
                className="btn btn-primary"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      )}
    </aside>
  );
}
