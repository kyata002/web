import React from 'react';

export default function StatsModal({ isOpen, onClose, members, nodes }) {
  if (!isOpen) return null;

  // Calculate statistics
  const total = members.length;
  const males = members.filter(m => m.gender === 'Nam').length;
  const females = members.filter(m => m.gender === 'Nữ').length;
  const maleRatio = total > 0 ? Math.round((males / total) * 100) : 0;
  const femaleRatio = total > 0 ? Math.round((females / total) * 100) : 0;

  // Helper to parse year
  const getBirthYear = (m) => {
    if (!m.birthDate) return null;
    const parts = m.birthDate.split('/');
    const yr = parseInt(parts[parts.length - 1]);
    return isNaN(yr) ? null : yr;
  };
  const getDeathYear = (m) => {
    if (!m.deathDate) return null;
    const parts = m.deathDate.split('/');
    const yr = parseInt(parts[parts.length - 1]);
    return isNaN(yr) ? null : yr;
  };

  // Average age of deceased members
  const deceasedWithAge = members.filter(m => m.isDeceased && getBirthYear(m) && getDeathYear(m));
  const avgAge = deceasedWithAge.length > 0
    ? Math.round(deceasedWithAge.reduce((sum, m) => sum + (getDeathYear(m) - getBirthYear(m)), 0) / deceasedWithAge.length)
    : 0;

  // Generations
  const generations = Object.keys(nodes).length > 0
    ? Math.max(...Object.keys(nodes).map(id => nodes[id].generation || 0)) + 1
    : 0;

  // Oldest living members
  const oldestLiving = members
    .filter(m => !m.isDeceased && getBirthYear(m))
    .map(m => ({
      ...m,
      age: new Date().getFullYear() - getBirthYear(m)
    }))
    .sort((a, b) => b.age - a.age)
    .slice(0, 5);

  // Distribution by generation
  const genCounts = {};
  Object.keys(nodes).forEach(id => {
    const gen = nodes[id].generation || 0;
    genCounts[gen] = (genCounts[gen] || 0) + 1;
  });

  const maxCountInGen = Object.keys(genCounts).length > 0 ? Math.max(...Object.values(genCounts)) : 1;

  return (
    <div id="stats-modal" className="modal flex items-center justify-center bg-black/50 fixed inset-0 z-[1000] p-4 overflow-y-auto">
      <div className="modal-content bg-white dark:bg-slate-900 border border-stone-100 dark:border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden my-8">
        <div className="modal-header flex justify-between items-center px-6 py-4 border-b border-stone-100 dark:border-slate-800 bg-stone-50 dark:bg-slate-900/50">
          <h2 className="text-xl font-bold text-stone-800 dark:text-slate-100 flex items-center gap-2">
            <i className="fa-solid fa-chart-column text-amber-500"></i> Thống Kê Phả Hệ
          </h2>
          <button className="modal-close text-2xl font-semibold text-stone-400 hover:text-stone-600 dark:hover:text-slate-200" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body p-6 space-y-6">
          <div className="stats-overview-grid grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Card 1 */}
            <div className="stats-card card-primary bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30 flex items-center p-4 rounded-xl gap-4 border">
              <div className="card-icon text-amber-600 dark:text-amber-500 text-3xl"><i className="fa-solid fa-users"></i></div>
              <div className="card-info">
                <h3 className="text-2xl font-bold text-amber-800 dark:text-yellow-500">{total}</h3>
                <p className="text-xs text-stone-500 dark:text-slate-400 font-medium">Thành viên</p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="stats-card card-success bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30 flex items-center p-4 rounded-xl gap-4 border">
              <div className="card-icon text-emerald-600 dark:text-emerald-500 text-3xl"><i className="fa-solid fa-venus-mars"></i></div>
              <div className="card-info">
                <h3 className="text-lg font-bold text-emerald-800 dark:text-emerald-400">
                  {maleRatio}% <span className="text-xs font-normal text-stone-500">Nam</span> / {femaleRatio}% <span className="text-xs font-normal text-stone-500">Nữ</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-slate-400 font-medium">Tỷ lệ Nam/Nữ</p>
              </div>
            </div>
            {/* Card 3 */}
            <div className="stats-card card-warning bg-orange-50 border-orange-100 dark:bg-orange-950/20 dark:border-orange-900/30 flex items-center p-4 rounded-xl gap-4 border">
              <div className="card-icon text-orange-600 dark:text-orange-500 text-3xl"><i className="fa-solid fa-hourglass-half"></i></div>
              <div className="card-info">
                <h3 className="text-2xl font-bold text-orange-800 dark:text-orange-400">{avgAge || "-"} <span className="text-xs font-normal text-stone-500">tuổi</span></h3>
                <p className="text-xs text-stone-500 dark:text-slate-400 font-medium">Tuổi thọ TB</p>
              </div>
            </div>
            {/* Card 4 */}
            <div className="stats-card card-info bg-cyan-50 border-cyan-100 dark:bg-cyan-950/20 dark:border-cyan-900/30 flex items-center p-4 rounded-xl gap-4 border">
              <div className="card-icon text-cyan-600 dark:text-cyan-500 text-3xl"><i className="fa-solid fa-sitemap"></i></div>
              <div className="card-info">
                <h3 className="text-2xl font-bold text-cyan-800 dark:text-cyan-400">{generations}</h3>
                <p className="text-xs text-stone-500 dark:text-slate-400 font-medium">Số thế hệ</p>
              </div>
            </div>
          </div>

          <div className="stats-details grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="stats-column space-y-3">
              <h3 className="font-semibold text-stone-800 dark:text-slate-200 border-b border-stone-100 dark:border-slate-800 pb-2 flex items-center gap-2">
                <i className="fa-solid fa-cake-candles text-amber-500"></i> Thành viên lớn tuổi nhất
              </h3>
              <ul id="stats-oldest-list" className="stats-list space-y-2">
                {oldestLiving.length === 0 ? (
                  <p className="text-xs text-stone-400 italic">Chưa có thông tin</p>
                ) : (
                  oldestLiving.map(m => (
                    <li key={m.id} className="flex justify-between items-center text-sm bg-stone-50 dark:bg-slate-900/40 p-2.5 rounded-lg border border-stone-100/50 dark:border-slate-800/50">
                      <span className="font-medium text-stone-700 dark:text-slate-300">{m.name}</span>
                      <span className="font-bold text-amber-600 dark:text-yellow-500">{m.age} tuổi ({m.birthDate ? m.birthDate.split('/').pop() : ''})</span>
                    </li>
                  ))
                )}
              </ul>
            </div>

            <div className="stats-column space-y-3">
              <h3 className="font-semibold text-stone-800 dark:text-slate-200 border-b border-stone-100 dark:border-slate-800 pb-2 flex items-center gap-2">
                <i className="fa-solid fa-layer-group text-amber-500"></i> Phân bố thành viên theo thế hệ
              </h3>
              <div id="generation-bar-chart" className="space-y-3">
                {Object.keys(genCounts).length === 0 ? (
                  <p className="text-xs text-stone-400 italic">Chưa có thông tin</p>
                ) : (
                  Object.keys(genCounts).map(gen => {
                    const count = genCounts[gen];
                    const pct = Math.round((count / maxCountInGen) * 100);
                    return (
                      <div key={gen} className="flex items-center gap-3">
                        <span className="text-xs font-semibold text-stone-600 dark:text-slate-400 w-16">Thế hệ {parseInt(gen) + 1}</span>
                        <div className="chart-bar-container flex-1 h-4 bg-stone-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="chart-bar-fill h-full bg-amber-500 dark:bg-yellow-500 rounded-full"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="chart-value text-xs font-bold text-stone-700 dark:text-slate-300 w-6 text-right">{count}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
