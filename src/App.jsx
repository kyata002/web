import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import FamilyTree from './components/FamilyTree';
import Sidebar from './components/Sidebar';
import StatsModal from './components/StatsModal';
import { defaultMembers } from './utils/defaultData';
import { calculateLayout } from './utils/layout';
import { findShortestPath, determineKinshipTerm } from './utils/relations';

export default function App() {
  // Members State (Loaded from LocalStorage or Default)
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('membersData');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing localStorage membersData', e);
      }
    }
    return [...defaultMembers];
  });

  // Collapsed Nodes State
  const [collapsedNodes, setCollapsedNodes] = useState(() => {
    const saved = localStorage.getItem('collapsedNodes');
    if (saved) {
      try {
        return new Set(JSON.parse(saved));
      } catch (e) {
        console.error('Error parsing localStorage collapsedNodes', e);
      }
    }
    return new Set();
  });

  // Selection & Sidebar Form state
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [formType, setFormType] = useState(null); // 'edit' | 'add-spouse' | 'add-child' | 'add-parent' | null

  // Relationship mode state
  const [relationMode, setRelationMode] = useState(false);
  const [relationFirstId, setRelationFirstId] = useState(null);
  const [relationResult, setRelationResult] = useState(null);

  // Stats Modal & Theme
  const [showStats, setShowStats] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light-theme';
  });

  // Toast System State
  const [toasts, setToasts] = useState([]);
  const toastIdRef = useRef(0);

  // Refs for FamilyTree viewport controls
  const focusNodeFnRef = useRef(null);
  const fitTreeFnRef = useRef(null);

  // Save members to localStorage
  useEffect(() => {
    localStorage.setItem('membersData', JSON.stringify(members));
  }, [members]);

  // Save collapsedNodes to localStorage
  useEffect(() => {
    localStorage.setItem('collapsedNodes', JSON.stringify(Array.from(collapsedNodes)));
  }, [collapsedNodes]);

  // Sync theme to body tag
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Premium Toast Notification trigger
  const showToast = (message, type = 'success') => {
    const id = toastIdRef.current++;
    setToasts(prev => [...prev, { id, message, type }]);
    
    // Auto-remove after 3.5s
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Override global window.alert with custom toast
  useEffect(() => {
    window.alert = (msg) => {
      const isError = msg.toLowerCase().includes('lỗi') || 
                      msg.toLowerCase().includes('không') || 
                      msg.toLowerCase().includes('thất bại') ||
                      msg.toLowerCase().includes('chưa');
      showToast(msg, isError ? 'error' : 'success');
    };
  }, []);

  // Theme Toggle
  const handleToggleTheme = () => {
    setTheme(prev => prev === 'light-theme' ? 'dark-theme' : 'light-theme');
  };

  // Restore Default Demo Data
  const handleResetDemo = () => {
    if (window.confirm('Bạn có chắc chắn muốn đặt lại toàn bộ dữ liệu mẫu ban đầu?')) {
      setMembers([...defaultMembers]);
      setCollapsedNodes(new Set());
      setSelectedMemberId(null);
      setFormType(null);
      setRelationMode(false);
      setRelationResult(null);
      showToast('Đã khôi phục dữ liệu mẫu thành công!', 'success');
      setTimeout(() => {
        if (fitTreeFnRef.current) fitTreeFnRef.current();
      }, 100);
    }
  };

  // Export JSON file
  const handleExport = () => {
    try {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(members, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `gia_pha_data_${new Date().toISOString().slice(0,10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      showToast('Xuất file JSON thành công!', 'success');
    } catch (e) {
      showToast('Xuất dữ liệu thất bại: ' + e.message, 'error');
    }
  };

  // Import JSON file
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
      try {
        const imported = JSON.parse(evt.target.result);
        if (Array.isArray(imported) && imported.length > 0 && imported[0].id && imported[0].name) {
          // Add default fields if missing
          const validated = imported.map(m => ({
            ...m,
            video: m.video || '',
            parents: m.parents || [],
            spouses: m.spouses || [],
            children: m.children || []
          }));
          
          setMembers(validated);
          setCollapsedNodes(new Set());
          setSelectedMemberId(null);
          setFormType(null);
          setRelationMode(false);
          setRelationResult(null);
          showToast('Nhập dữ liệu gia phả thành công!', 'success');
          setTimeout(() => {
            if (fitTreeFnRef.current) fitTreeFnRef.current();
          }, 150);
        } else {
          showToast('Định dạng file JSON không hợp lệ.', 'error');
        }
      } catch (err) {
        showToast('Lỗi khi đọc file JSON: ' + err.message, 'error');
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset file input
  };

  // Toggle node children collapse state
  const handleToggleCollapse = (id) => {
    setCollapsedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Relationship mode
  const handleStartRelationMode = () => {
    if (!selectedMemberId) return;
    setRelationMode(true);
    setRelationFirstId(selectedMemberId);
    showToast('Chọn thành viên thứ hai trên sơ đồ để tính xưng hô', 'info');
  };

  const handleCalculateRelation = (id1, id2) => {
    setRelationMode(false);
    setRelationFirstId(null);
    
    const { nodes } = calculateLayout(members, collapsedNodes);
    const path = findShortestPath(members, id1, id2);
    
    if (!path || path.length === 0) {
      setRelationResult({
        path: [],
        text: 'Không tìm thấy đường mối quan hệ giữa hai người này.'
      });
      return;
    }

    const addressing = determineKinshipTerm(members, path, nodes);
    const p1 = members.find(x => x.id === id1);
    const p2 = members.find(x => x.id === id2);

    const resultHtml = `
      <strong>Xưng hô:</strong><br/>
      - <strong>${p1.name}</strong> là <strong>${addressing.term1}</strong> của ${p2.name}.<br/>
      - <strong>${p2.name}</strong> là <strong>${addressing.term2}</strong> của ${p1.name}.<br/>
      - Giao tiếp: <strong>${p2.name}</strong> gọi <strong>${p1.name}</strong> là <strong>"${addressing.call1}"</strong>.
    `;

    setRelationResult({ path, text: resultHtml });
  };

  // Handle Add/Edit Form Saves
  const handleSaveMember = (formData) => {
    const newMembers = [...members];
    const generatedId = formData.id || String(Date.now());
    
    const cleanedMember = {
      id: generatedId,
      name: formData.name,
      gender: formData.gender,
      isDeceased: formData.isDeceased,
      birthDate: formData.birthDate,
      deathDate: formData.isDeceased ? formData.deathDate : '',
      job: formData.job,
      video: formData.video,
      avatar: formData.avatar,
      bio: formData.bio,
      parents: formData.id ? (members.find(x => x.id === formData.id)?.parents || []) : [],
      spouses: formData.id ? (members.find(x => x.id === formData.id)?.spouses || []) : [],
      children: formData.id ? (members.find(x => x.id === formData.id)?.children || []) : []
    };

    if (formType === 'edit') {
      const idx = newMembers.findIndex(x => x.id === formData.id);
      if (idx !== -1) {
        // preserve relationships
        cleanedMember.parents = newMembers[idx].parents;
        cleanedMember.spouses = newMembers[idx].spouses;
        cleanedMember.children = newMembers[idx].children;
        
        // If gender changes, spouses mapping may need adjusting but let's keep it simple
        newMembers[idx] = cleanedMember;
      }
      showToast('Cập nhật thông tin thành viên thành công!', 'success');
    } else {
      const source = newMembers.find(x => x.id === selectedMemberId);
      
      if (formType === 'add-spouse') {
        cleanedMember.spouses = [selectedMemberId];
        newMembers.push(cleanedMember);
        if (source) source.spouses = [...(source.spouses || []), generatedId];
        showToast(`Đã thêm Vợ/Chồng cho ${source?.name}`, 'success');
      } 
      else if (formType === 'add-child') {
        cleanedMember.parents = [selectedMemberId];
        
        // If source has a spouse, also make them a parent
        if (source && source.spouses && source.spouses.length > 0) {
          const spouseId = source.spouses[0];
          cleanedMember.parents.push(spouseId);
          const spouse = newMembers.find(x => x.id === spouseId);
          if (spouse) spouse.children = [...(spouse.children || []), generatedId];
        }
        
        newMembers.push(cleanedMember);
        if (source) source.children = [...(source.children || []), generatedId];
        showToast(`Đã thêm Con cái cho ${source?.name}`, 'success');
      } 
      else if (formType === 'add-parent') {
        cleanedMember.children = [selectedMemberId];
        newMembers.push(cleanedMember);
        if (source) source.parents = [...(source.parents || []), generatedId];
        showToast(`Đã thêm Cha/Mẹ cho ${source?.name}`, 'success');
      }
    }

    setMembers(newMembers);
    setFormType(null);
    setSelectedMemberId(generatedId);
    
    // Smooth transition focus on the new/edited member card
    setTimeout(() => {
      if (focusNodeFnRef.current) focusNodeFnRef.current(generatedId);
    }, 150);
  };

  // Delete member and remove all their references in family tree
  const handleDeleteMember = (id) => {
    const memberToDelete = members.find(x => x.id === id);
    if (!memberToDelete) return;

    if (window.confirm(`Bạn có chắc chắn muốn xóa thành viên "${memberToDelete.name}" và tất cả liên kết quan hệ của họ?`)) {
      const updated = members
        .filter(m => m.id !== id)
        .map(m => ({
          ...m,
          parents: (m.parents || []).filter(pId => pId !== id),
          spouses: (m.spouses || []).filter(sId => sId !== id),
          children: (m.children || []).filter(cId => cId !== id)
        }));

      setMembers(updated);
      setSelectedMemberId(null);
      setFormType(null);
      setRelationMode(false);
      setRelationResult(null);
      showToast('Đã xóa thành viên khỏi sơ đồ!', 'success');
    }
  };

  const { nodes } = calculateLayout(members, collapsedNodes);

  return (
    <div className="app-container">
      {/* HEADER COMPONENT */}
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onStats={() => setShowStats(true)}
        onResetDemo={handleResetDemo}
        onExport={handleExport}
        onImport={handleImport}
        members={members}
        onSelectMember={setSelectedMemberId}
        onFocusNode={(id) => focusNodeFnRef.current && focusNodeFnRef.current(id)}
        relationMode={relationMode}
        onCalculateRelation={handleCalculateRelation}
        relationFirstId={relationFirstId}
      />

      {/* MAIN WORKSPACE */}
      <main className="app-main">
        {/* FAMILY TREE COMPONENT */}
        <FamilyTree
          members={members}
          collapsedNodes={collapsedNodes}
          onToggleCollapse={handleToggleCollapse}
          selectedMemberId={selectedMemberId}
          onSelectMember={setSelectedMemberId}
          relationMode={relationMode}
          relationFirstId={relationFirstId}
          onCancelRelationMode={() => { setRelationMode(false); setRelationFirstId(null); }}
          setFocusNodeFn={(fn) => { focusNodeFnRef.current = fn; }}
          setFitTreeFn={(fn) => { fitTreeFnRef.current = fn; }}
        />

        {/* SIDEBAR COMPONENT */}
        <Sidebar
          selectedMemberId={selectedMemberId}
          members={members}
          nodes={nodes}
          formType={formType}
          onOpenForm={setFormType}
          onCancelForm={() => setFormType(null)}
          onSaveMember={handleSaveMember}
          onDeleteMember={handleDeleteMember}
          onSelectMember={setSelectedMemberId}
          onFocusNode={(id) => focusNodeFnRef.current && focusNodeFnRef.current(id)}
          onStartRelationMode={handleStartRelationMode}
          relationResult={relationResult}
          onCloseRelationResult={() => setRelationResult(null)}
        />
      </main>

      {/* STATISTICS DIALOG MODAL */}
      <StatsModal
        isOpen={showStats}
        onClose={() => setShowStats(false)}
        members={members}
        nodes={nodes}
      />

      {/* PREMIUM TOAST CONTAINER RENDERING */}
      <div id="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type} show`}>
            <i className={`fa-solid ${
              t.type === 'success' ? 'fa-circle-check' : 
              t.type === 'error' ? 'fa-circle-exclamation' : 
              t.type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-info'
            } toast-icon`}></i>
            <div className="toast-content">{t.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
