import React, { useState, useEffect, useRef } from 'react';
import { calculateLayout, NODE_WIDTH, NODE_HEIGHT } from '../utils/layout';
import { getAvatarDataUrl } from '../utils/defaultData';

export default function FamilyTree({
  members,
  collapsedNodes,
  onToggleCollapse,
  selectedMemberId,
  onSelectMember,
  relationMode,
  relationFirstId,
  onCancelRelationMode,
  setFocusNodeFn,
  setFitTreeFn
}) {
  const [panX, setPanX] = useState(50);
  const [panY, setPanY] = useState(50);
  const [zoom, setZoom] = useState(1.0);
  const [isPanning, setIsPanning] = useState(false);
  const [smooth, setSmooth] = useState(false);
  
  const containerRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const touchStart = useRef({ x: 0, y: 0 });

  const { nodes, links } = calculateLayout(members, collapsedNodes);

  // Expose focus and fit functions to parent App component
  useEffect(() => {
    if (setFocusNodeFn) {
      setFocusNodeFn(() => focusOnNode);
    }
    if (setFitTreeFn) {
      setFitTreeFn(() => fitTreeToScreen);
    }
  }, [members, collapsedNodes, nodes, panX, panY, zoom]);

  // Handle auto-fit on initial load or empty tree
  useEffect(() => {
    setTimeout(fitTreeToScreen, 150);
  }, []);

  const triggerSmoothTransition = () => {
    setSmooth(true);
    setTimeout(() => setSmooth(false), 400);
  };

  const applyPanZoom = (x, y, z, isSmooth = false) => {
    if (isSmooth) triggerSmoothTransition();
    setPanX(x);
    setPanY(y);
    setZoom(z);
  };

  const fitTreeToScreen = () => {
    const nodeKeys = Object.keys(nodes);
    if (nodeKeys.length === 0) return;

    const xs = nodeKeys.map(id => nodes[id].x);
    const ys = nodeKeys.map(id => nodes[id].y);

    const minX = Math.min(...xs);
    const maxX = Math.max(...xs) + NODE_WIDTH;
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys) + NODE_HEIGHT;

    const treeW = maxX - minX || 500;
    const treeH = maxY - minY || 400;

    const containerW = containerRef.current ? containerRef.current.clientWidth : 800;
    const containerH = containerRef.current ? containerRef.current.clientHeight : 600;

    const safeW = containerW > 100 ? containerW : 800;
    const safeH = containerH > 100 ? containerH : 600;

    const scaleX = (safeW - 80) / treeW;
    const scaleY = (safeH - 80) / treeH;
    
    let targetZoom = Math.min(Math.min(scaleX, scaleY), 1.0);
    if (isNaN(targetZoom) || targetZoom <= 0.05) {
      targetZoom = 0.5;
    }

    let targetPanX = (safeW - treeW * targetZoom) / 2 - minX * targetZoom;
    let targetPanY = (safeH - treeH * targetZoom) / 2 - minY * targetZoom;

    if (isNaN(targetPanX)) targetPanX = 50;
    if (isNaN(targetPanY)) targetPanY = 50;

    applyPanZoom(targetPanX, targetPanY, targetZoom, true);
  };

  const focusOnNode = (memberId) => {
    const loc = nodes[memberId];
    if (!loc) return;

    const containerW = containerRef.current ? containerRef.current.clientWidth : 800;
    const containerH = containerRef.current ? containerRef.current.clientHeight : 600;

    const targetZoom = 1.0;
    const targetPanX = containerW / 2 - (loc.x + NODE_WIDTH / 2);
    const targetPanY = containerH / 2 - (loc.y + NODE_HEIGHT / 2);

    applyPanZoom(targetPanX, targetPanY, targetZoom, true);
  };

  // Mouse Handlers
  const handleMouseDown = (e) => {
    if (
      e.target.tagName === 'svg' || 
      e.target.id === 'tree-svg' || 
      e.target.id === 'links-group' || 
      e.target.id === 'nodes-group'
    ) {
      setIsPanning(true);
      dragStart.current = { x: e.clientX - panX, y: e.clientY - panY };
    }
  };

  const handleMouseMove = (e) => {
    if (!isPanning) return;
    setPanX(e.clientX - dragStart.current.x);
    setPanY(e.clientY - dragStart.current.y);
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Touch Handlers for mobile swipe-to-pan
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsPanning(true);
      touchStart.current = {
        x: e.touches[0].clientX - panX,
        y: e.touches[0].clientY - panY
      };
    }
  };

  const handleTouchMove = (e) => {
    if (!isPanning || e.touches.length !== 1) return;
    setPanX(e.touches[0].clientX - touchStart.current.x);
    setPanY(e.touches[0].clientY - touchStart.current.y);
  };

  const handleTouchEnd = () => {
    setIsPanning(false);
  };

  // Wheel Zoom Handler
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomIntensity = 0.08;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const wheel = e.deltaY < 0 ? 1 : -1;
    const zoomFactor = Math.exp(wheel * zoomIntensity);
    
    let targetZoom = zoom * zoomFactor;
    targetZoom = Math.min(Math.max(targetZoom, 0.2), 3);
    
    const targetPanX = mouseX - (mouseX - panX) * (targetZoom / zoom);
    const targetPanY = mouseY - (mouseY - panY) * (targetZoom / zoom);

    setPanX(targetPanX);
    setPanY(targetPanY);
    setZoom(targetZoom);
  };

  // Zoom Button controls
  const handleZoomIn = () => {
    const targetZoom = Math.min(zoom + 0.15, 3);
    applyPanZoom(panX, panY, targetZoom, true);
  };

  const handleZoomOut = () => {
    const targetZoom = Math.max(zoom - 0.15, 0.2);
    applyPanZoom(panX, panY, targetZoom, true);
  };

  const handleResetZoom = () => {
    applyPanZoom(50, 50, 1.0, true);
  };

  return (
    <div
      className="tree-container"
      id="tree-container"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
      style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
    >
      {/* Floating Warning Banner for Relationship Calculation Mode */}
      {relationMode && (
        <div id="relation-calc-banner" className="relation-banner">
          <div className="banner-content">
            <i className="fa-solid fa-people-arrows banner-icon"></i>
            <span>
              Tính xưng hô: Chọn người thứ 2 đối chiếu với "{members.find(x => x.id === relationFirstId)?.name}"...
            </span>
          </div>
          <button onClick={onCancelRelationMode} className="btn btn-sm btn-secondary">
            Hủy
          </button>
        </div>
      )}

      {/* SVG Canvas */}
      <svg id="tree-svg" className="tree-svg">
        <g
          id="tree-viewport"
          style={{
            transform: `translate(${panX}px, ${panY}px) scale(${zoom})`,
            transformOrigin: '0 0',
            transition: smooth ? 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)' : 'none'
          }}
        >
          {/* Render Connections */}
          <g id="links-group">
            {links.map((l, index) => {
              const midY = (l.y1 + l.y2) / 2;
              const d = l.type === 'spouse'
                ? `M ${l.x1} ${l.y1} L ${l.x2} ${l.y2}`
                : `M ${l.x1} ${l.y1} C ${l.x1} ${midY}, ${l.x2} ${midY}, ${l.x2} ${l.y2}`;
              
              return (
                <path
                  key={`link-${index}`}
                  d={d}
                  className={`link-line ${l.type === 'spouse' ? 'link-spouse' : ''}`}
                />
              );
            })}
          </g>

          {/* Render Node Cards */}
          <g id="nodes-group">
            {Object.keys(nodes).map(id => {
              const loc = nodes[id];
              const m = members.find(x => x.id === id);
              if (!m) return null;

              const isSelected = selectedMemberId === id;
              const isDeceased = m.isDeceased;
              const clipPathId = `clip-${id}`;

              return (
                <g
                  key={`node-${id}`}
                  className={`node-card ${isSelected ? 'selected' : ''}`}
                  transform={`translate(${loc.x}, ${loc.y})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectMember(id);
                  }}
                >
                  {/* Card Background */}
                  <rect
                    width={NODE_WIDTH}
                    height={NODE_HEIGHT}
                    className="node-rect"
                    style={{
                      strokeDasharray: isDeceased ? '4 2' : 'none',
                      opacity: isDeceased ? 0.85 : 1
                    }}
                  />

                  {/* Gender Line */}
                  <line
                    x1="0"
                    y1="4"
                    x2="0"
                    y2={NODE_HEIGHT - 4}
                    className={`node-gender-line ${m.gender === 'Nam' ? 'male' : 'female'}`}
                  />

                  {/* Avatar clip definition */}
                  <defs>
                    <clipPath id={clipPathId}>
                      <circle cx="32" cy="35" r="20" />
                    </clipPath>
                  </defs>

                  {/* Avatar image */}
                  <image
                    href={getAvatarDataUrl(m.avatar, m.name, m.gender)}
                    x="12"
                    y="15"
                    width="40"
                    height="40"
                    clipPath={`url(#${clipPathId})`}
                  />

                  {/* Name text */}
                  <text x="64" y="32" className="node-text-name">
                    {m.name.length > 16 ? m.name.substring(0, 13) + '...' : m.name}
                  </text>

                  {/* Dates text */}
                  <text x="64" y="48" className="node-text-dates">
                    {m.birthDate ? m.birthDate.split('/').pop() : 'Chưa rõ'} - {
                      isDeceased 
                        ? (m.deathDate ? m.deathDate.split('/').pop() : 'đã mất') 
                        : 'Hiện tại'
                    }
                  </text>

                  {/* Collapse Toggle Button */}
                  {m.children && m.children.length > 0 && (
                    <g
                      className="node-toggle-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleCollapse(id);
                      }}
                    >
                      <circle cx={NODE_WIDTH / 2} cy={NODE_HEIGHT} r="9" className="btnCircle" />
                      <text x={NODE_WIDTH / 2} y={NODE_HEIGHT} className="btnText">
                        {collapsedNodes.has(id) ? '+' : '-'}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </g>
        </g>
      </svg>

      {/* Floating Canvas Controls */}
      <div className="canvas-controls">
        <button className="btn-ctrl" onClick={handleZoomIn} title="Phóng to">
          <i className="fa-solid fa-plus"></i>
        </button>
        <button className="btn-ctrl" onClick={handleZoomOut} title="Thu nhỏ">
          <i className="fa-solid fa-minus"></i>
        </button>
        <button className="btn-ctrl" onClick={fitTreeToScreen} title="Căn giữa sơ đồ">
          <i className="fa-solid fa-expand"></i>
        </button>
        <button className="btn-ctrl" onClick={handleResetZoom} title="Reset thu phóng">
          <i className="fa-solid fa-arrows-to-dot"></i>
        </button>
      </div>

      {/* Legend Panel / Chú thích */}
      <div className="legend-panel">
        <div className="legend-item">
          <span className="legend-dot male"></span> Nam
        </div>
        <div className="legend-item">
          <span className="legend-dot female"></span> Nữ
        </div>
        <div className="legend-item">
          <span className="legend-dot deceased"></span> Đã mất (Ngày giỗ)
        </div>
      </div>
    </div>
  );
}
