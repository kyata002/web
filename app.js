// Family Tree App - Core Logic

// Default Family Data
const defaultMembers = [
    {
        id: "1",
        name: "Nguyễn Văn An",
        gender: "Nam",
        birthDate: "15/04/1920",
        deathDate: "20/10/2005",
        isDeceased: true,
        job: "Nhà giáo",
        avatar: "avatar-male-old",
        video: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // Demo video
        bio: "Cụ tổ dòng họ Nguyễn, từng làm thầy đồ dạy học chữ Nho tại quê nhà. Cụ sinh thời đức độ, thương dân.",
        spouses: ["2"],
        children: ["3", "4", "5"],
        parents: []
    },
    {
        id: "2",
        name: "Lê Thị Bình",
        gender: "Nữ",
        birthDate: "02/09/1924",
        deathDate: "12/03/2012",
        isDeceased: true,
        job: "Nội trợ",
        avatar: "avatar-female-old",
        video: "",
        bio: "Cụ bà hiền hậu, chăm lo gia đình chu toàn, là hậu phương vững chắc cho cụ ông.",
        spouses: ["1"],
        children: ["3", "4", "5"],
        parents: []
    },
    {
        id: "3",
        name: "Nguyễn Thế Cường",
        gender: "Nam",
        birthDate: "18/08/1948",
        deathDate: "",
        isDeceased: false,
        job: "Kỹ sư cơ khí (Hưu trí)",
        avatar: "avatar-male-senior",
        video: "",
        bio: "Con trai trưởng cụ An. Nguyên quán Bắc Ninh, hiện đang sinh sống tại Hà Nội.",
        spouses: ["6"],
        children: ["8", "9"],
        parents: ["1", "2"]
    },
    {
        id: "6",
        name: "Trần Thị Dung",
        gender: "Nữ",
        birthDate: "05/11/1952",
        deathDate: "",
        isDeceased: false,
        job: "Bác sĩ (Hưu trí)",
        avatar: "avatar-female-senior",
        video: "",
        bio: "Vợ ông Nguyễn Thế Cường, cựu trưởng khoa sản bệnh viện tỉnh.",
        spouses: ["3"],
        children: ["8", "9"],
        parents: []
    },
    {
        id: "4",
        name: "Nguyễn Thị Hồng",
        gender: "Nữ",
        birthDate: "12/05/1952",
        deathDate: "",
        isDeceased: false,
        job: "Giáo viên văn",
        avatar: "avatar-female-senior",
        video: "",
        bio: "Con gái thứ của cụ An. Yêu thơ văn, sống an nhàn cùng gia đình tại Đà Nẵng.",
        spouses: ["7"],
        children: ["10"],
        parents: ["1", "2"]
    },
    {
        id: "7",
        name: "Phạm Minh Tuấn",
        gender: "Nam",
        birthDate: "20/01/1950",
        deathDate: "15/07/2021",
        isDeceased: true,
        job: "Sĩ quan quân đội",
        avatar: "avatar-male-senior-deceased",
        video: "",
        bio: "Chồng bà Nguyễn Thị Hồng. Tham gia kháng chiến chống Mỹ cứu nước.",
        spouses: ["4"],
        children: ["10"],
        parents: []
    },
    {
        id: "5",
        name: "Nguyễn Tiến Dũng",
        gender: "Nam",
        birthDate: "22/12/1958",
        deathDate: "",
        isDeceased: false,
        job: "Doanh nhân",
        avatar: "avatar-male-mid",
        video: "",
        bio: "Con út cụ An, kinh doanh trong lĩnh vực nông sản xuất khẩu tại TP. Hồ Chí Minh.",
        spouses: ["11"],
        children: ["12", "13"],
        parents: ["1", "2"]
    },
    {
        id: "11",
        name: "Hoàng Mỹ Lệ",
        gender: "Nữ",
        birthDate: "30/06/1962",
        deathDate: "",
        isDeceased: false,
        job: "Kế toán trưởng",
        avatar: "avatar-female-mid",
        video: "",
        bio: "Vợ ông Nguyễn Tiến Dũng, trợ thủ đắc lực trong hoạt động kinh doanh gia đình.",
        spouses: ["5"],
        children: ["12", "13"],
        parents: []
    },
    {
        id: "8",
        name: "Nguyễn Xuân Hải",
        gender: "Nam",
        birthDate: "14/02/1975",
        deathDate: "",
        isDeceased: false,
        job: "Lập trình viên",
        avatar: "avatar-male-mid",
        video: "",
        bio: "Con trai lớn ông Cường, đang làm việc tại một công ty công nghệ lớn ở Hà Nội.",
        spouses: ["14"],
        children: ["15", "16"],
        parents: ["3", "6"]
    },
    {
        id: "14",
        name: "Vũ Thu Hà",
        gender: "Nữ",
        birthDate: "22/07/1978",
        deathDate: "",
        isDeceased: false,
        job: "Nhà thiết kế đồ họa",
        avatar: "avatar-female-mid",
        video: "",
        bio: "Vợ anh Nguyễn Xuân Hải, có gu thẩm mỹ tốt, đam mê hội họa và cắm hoa.",
        spouses: ["8"],
        children: ["15", "16"],
        parents: []
    },
    {
        id: "9",
        name: "Nguyễn Thu Hương",
        gender: "Nữ",
        birthDate: "09/10/1982",
        deathDate: "",
        isDeceased: false,
        job: "Ngân hàng",
        avatar: "avatar-female-mid",
        video: "",
        bio: "Con gái thứ ông Cường, đang là quản lý chi nhánh ngân hàng lớn tại Hà Nội.",
        spouses: [],
        children: [],
        parents: ["3", "6"]
    },
    {
        id: "10",
        name: "Phạm Thùy Linh",
        gender: "Nữ",
        birthDate: "11/11/1980",
        deathDate: "",
        isDeceased: false,
        job: "Dược sĩ",
        avatar: "avatar-female-mid",
        video: "",
        bio: "Con bà Nguyễn Thị Hồng. Hiện đang sở hữu chuỗi nhà thuốc tại Đà Nẵng.",
        spouses: [],
        children: [],
        parents: ["7", "4"]
    },
    {
        id: "12",
        name: "Nguyễn Thanh Tùng",
        gender: "Nam",
        birthDate: "05/03/1988",
        deathDate: "",
        isDeceased: false,
        job: "Kiến trúc sư",
        avatar: "avatar-male-young",
        video: "",
        bio: "Con trai ông Nguyễn Tiến Dũng, thiết kế nhiều công trình biệt thự nổi tiếng.",
        spouses: [],
        children: [],
        parents: ["5", "11"]
    },
    {
        id: "13",
        name: "Nguyễn Hoài An",
        gender: "Nữ",
        birthDate: "19/09/1992",
        deathDate: "",
        isDeceased: false,
        job: "Nhà báo",
        avatar: "avatar-female-young",
        video: "",
        bio: "Con gái út ông Nguyễn Tiến Dũng, phóng viên ban văn hóa xã hội.",
        spouses: [],
        children: [],
        parents: ["5", "11"]
    },
    {
        id: "15",
        name: "Nguyễn Minh Khang",
        gender: "Nam",
        birthDate: "25/08/2005",
        deathDate: "",
        isDeceased: false,
        job: "Sinh viên Đại học",
        avatar: "avatar-male-kid",
        video: "",
        bio: "Con trai lớn anh Nguyễn Xuân Hải, đang học chuyên ngành Trí tuệ Nhân tạo.",
        spouses: [],
        children: [],
        parents: ["8", "14"]
    },
    {
        id: "16",
        name: "Nguyễn Lan Chi",
        gender: "Nữ",
        birthDate: "14/05/2009",
        deathDate: "",
        isDeceased: false,
        job: "Học sinh THPT",
        avatar: "avatar-female-kid",
        video: "",
        bio: "Con gái út anh Nguyễn Xuân Hải, học sinh giỏi văn cấp thành phố.",
        spouses: [],
        children: [],
        parents: ["8", "14"]
    }
];

// Avatar templates mapped to SVG illustrations
const avatarTemplates = {
    "avatar-male-old": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#dfc093"/><path d="M50 85c-18 0-33-10-38-24 2-8 12-14 38-14s36 6 38 14c-5 14-20 24-38 24z" fill="#783f04"/><circle cx="50" cy="40" r="18" fill="#f5d6a8"/><path d="M35 25c10-10 20-10 30 0 4-4 8-4 10-2-3-12-17-15-25-10-8-5-13-1-15 12z" fill="#e0e0e0"/><path d="M42 48c0 3 8 3 8 0s-8-3-8 0z" fill="#f5d6a8" stroke="#783f04" stroke-width="1.5"/><ellipse cx="44" cy="38" rx="2" ry="3" fill="#333"/><ellipse cx="56" cy="38" rx="2" ry="3" fill="#333"/><path d="M40 33c3-2 7-2 10 0M50 33c3-2 7-2 10 0" stroke="#783f04" stroke-width="1.5" fill="none"/><path d="M45 42c5 5 5 5 10 0" stroke="#783f04" stroke-width="1.5" fill="none"/></svg>`,
    "avatar-female-old": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#f3dca3"/><path d="M50 85c-18 0-33-10-38-24 2-8 12-14 38-14s36 6 38 14c-5 14-20 24-38 24z" fill="#b45309"/><circle cx="50" cy="42" r="17" fill="#f7dfb9"/><path d="M32 38c0-15 10-22 18-22s18 7 18 22c0 2-4 0-4-3 0-10-6-14-14-14s-14 4-14 14c0 3-4 5-4 3z" fill="#d1d5db"/><circle cx="50" cy="20" r="8" fill="#d1d5db"/><ellipse cx="44" cy="40" rx="2" ry="3" fill="#333"/><ellipse cx="56" cy="40" rx="2" ry="3" fill="#333"/><path d="M45 46c5 3 5 3 10 0" stroke="#b45309" stroke-width="1.5" fill="none"/></svg>`,
    "avatar-male-senior": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#edd6b1"/><path d="M50 85c-18 0-33-10-38-24 2-8 12-14 38-14s36 6 38 14c-5 14-20 24-38 24z" fill="#3b2314"/><circle cx="50" cy="41" r="18" fill="#fcdbb0"/><path d="M32 32c5-10 12-12 18-12s13 2 18 12c2-8-2-12-18-12s-20 4-18 12z" fill="#9ca3af"/><ellipse cx="43" cy="39" rx="2" ry="3" fill="#333"/><ellipse cx="57" cy="39" rx="2" ry="3" fill="#333"/><path d="M43 47c7 4 7 4 14 0" stroke="#3b2314" stroke-width="1.5" fill="none"/></svg>`,
    "avatar-male-senior-deceased": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#94a3b8"/><path d="M50 85c-18 0-33-10-38-24 2-8 12-14 38-14s36 6 38 14c-5 14-20 24-38 24z" fill="#475569"/><circle cx="50" cy="41" r="18" fill="#cbd5e1"/><path d="M32 32c5-10 12-12 18-12s13 2 18 12c2-8-2-12-18-12s-20 4-18 12z" fill="#64748b"/><ellipse cx="43" cy="39" rx="2" ry="2" fill="#475569"/><ellipse cx="57" cy="39" rx="2" ry="2" fill="#475569"/><path d="M45 47h10" stroke="#475569" stroke-width="1.5" fill="none"/></svg>`,
    "avatar-female-senior": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#f5dbb5"/><path d="M50 85c-18 0-33-10-38-24 2-8 12-14 38-14s36 6 38 14c-5 14-20 24-38 24z" fill="#701a28"/><circle cx="50" cy="42" r="17" fill="#fcdbb0"/><path d="M30 40c0-18 10-23 20-23s20 5 20 23c0 2-4-2-4-5 0-12-6-15-16-15s-16 3-16 15c0 3-4 7-4 5z" fill="#4b5563"/><ellipse cx="43" cy="41" rx="2" ry="3" fill="#333"/><ellipse cx="57" cy="41" rx="2" ry="3" fill="#333"/><path d="M44 47c6 3 6 3 12 0" stroke="#701a28" stroke-width="1.5" fill="none"/></svg>`,
    "avatar-male-mid": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#b5cde6"/><path d="M50 85c-18 0-33-10-38-24 2-8 12-14 38-14s36 6 38 14c-5 14-20 24-38 24z" fill="#1e3a5f"/><circle cx="50" cy="41" r="18" fill="#fcdbb0"/><path d="M30 35c3-15 12-18 20-18s17 3 20 18c3-10-3-15-20-15S27 25 30 35z" fill="#111827"/><ellipse cx="43" cy="39" rx="2" ry="3" fill="#333"/><ellipse cx="57" cy="39" rx="2" ry="3" fill="#333"/><path d="M43 47c7 4 7 4 14 0" stroke="#1e3a5f" stroke-width="1.5" fill="none"/></svg>`,
    "avatar-female-mid": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#fbcfe8"/><path d="M50 85c-18 0-33-10-38-24 2-8 12-14 38-14s36 6 38 14c-5 14-20 24-38 24z" fill="#be185d"/><circle cx="50" cy="42" r="17" fill="#ffe4e6"/><path d="M28 45c0-18 10-25 22-25s22 7 22 25c0 5-5-2-5-6 0-14-6-16-17-16s-17 2-17 16c0 4-5 11-5 6z" fill="#4a0404"/><ellipse cx="43" cy="41" rx="2" ry="3" fill="#333"/><ellipse cx="57" cy="41" rx="2" ry="3" fill="#333"/><path d="M44 48c6 3 6 3 12 0" stroke="#be185d" stroke-width="1.5" fill="none"/></svg>`,
    "avatar-male-young": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#a7f3d0"/><path d="M50 85c-18 0-33-10-38-24 2-8 12-14 38-14s36 6 38 14c-5 14-20 24-38 24z" fill="#065f46"/><circle cx="50" cy="41" r="18" fill="#ffe4e6"/><path d="M30 35c3-15 12-18 20-18s17 3 20 18l-8-5-12 3-12-3-8 5z" fill="#1e293b"/><ellipse cx="43" cy="39" rx="2" ry="3" fill="#333"/><ellipse cx="57" cy="39" rx="2" ry="3" fill="#333"/><path d="M44 48c6 2 6 2 12 0" stroke="#065f46" stroke-width="1.5" fill="none"/></svg>`,
    "avatar-female-young": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#fef08a"/><path d="M50 85c-18 0-33-10-38-24 2-8 12-14 38-14s36 6 38 14c-5 14-20 24-38 24z" fill="#854d0e"/><circle cx="50" cy="42" r="17" fill="#fff1f2"/><path d="M28 42c0-18 10-23 22-23s22 5 22 23c0 10-4 15-4 15L60 38l-10 4-10-4-8 19s-4-5-4-15z" fill="#783f04"/><ellipse cx="43" cy="41" rx="2" ry="3" fill="#333"/><ellipse cx="57" cy="41" rx="2" ry="3" fill="#333"/><path d="M44 48c6 2 6 2 12 0" stroke="#854d0e" stroke-width="1.5" fill="none"/></svg>`,
    "avatar-male-kid": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#c084fc"/><path d="M50 85c-18 0-33-10-38-24 2-8 12-14 38-14s36 6 38 14c-5 14-20 24-38 24z" fill="#581c87"/><circle cx="50" cy="43" r="16" fill="#ffe4e6"/><path d="M32 35c2-12 10-15 18-15s16 3 18 15l-18-6-18 6z" fill="#0f172a"/><ellipse cx="44" cy="41" rx="2" ry="2" fill="#333"/><ellipse cx="56" cy="41" rx="2" ry="2" fill="#333"/><path d="M44 48c4 3 8 3 12 0" stroke="#581c87" stroke-width="1.5" fill="none"/></svg>`,
    "avatar-female-kid": `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#f472b6"/><path d="M50 85c-18 0-33-10-38-24 2-8 12-14 38-14s36 6 38 14c-5 14-20 24-38 24z" fill="#9d174d"/><circle cx="50" cy="43" r="16" fill="#ffe4e6"/><path d="M30 40c0-15 8-20 20-20s20 5 20 20l-6-6h-28l-6 6z" fill="#f43f5e"/><ellipse cx="44" cy="41" rx="2" ry="2" fill="#333"/><ellipse cx="56" cy="41" rx="2" ry="2" fill="#333"/><path d="M44 48c4 3 8 3 12 0" stroke="#9d174d" stroke-width="1.5" fill="none"/></svg>`
};

// Global App State
let members = [];
let selectedMemberId = null;
let currentZoom = 1.0;
let currentPanX = 0;
let currentPanY = 0;
let isPanning = false;
let startPanX = 0;
let startPanY = 0;

// Branch collapse state
let collapsedNodes = new Set();

// Relationship Calculator State
let relationMode = false; // true if selecting second person
let relationFirstId = null;

// Dimensions for positioning
const NODE_WIDTH = 200;
const NODE_HEIGHT = 70;
const ROW_GAP = 100;
const SPOUSE_GAP = 40;
const SIBLING_GAP = 50;

// Initialize Web App
document.addEventListener("DOMContentLoaded", () => {
    loadMembersData();
    setupEventListeners();
    setupAvatarPicker();
    renderTree();
    updateStatistics();
    setTimeout(fitTreeToScreen, 100);
});

// Load data from LocalStorage or use defaults
function loadMembersData() {
    const saved = localStorage.getItem("giapha_members");
    if (saved) {
        try {
            members = JSON.parse(saved);
            if (!Array.isArray(members) || members.length === 0) {
                members = [...defaultMembers];
                saveMembersData();
            }
        } catch (e) {
            console.error("Failed to parse saved data, loading defaults", e);
            members = [...defaultMembers];
        }
    } else {
        members = [...defaultMembers];
        saveMembersData();
    }
}

function saveMembersData() {
    localStorage.setItem("giapha_members", JSON.stringify(members));
}

// Generates data URL for avatar
function getAvatarDataUrl(avatarName, name = "N", gender = "Nam") {
    if (avatarTemplates[avatarName]) {
        const svgString = avatarTemplates[avatarName];
        return "data:image/svg+xml;utf8," + encodeURIComponent(svgString);
    }
    // Fallback: Initial circle
    const color = gender === "Nam" ? "#3b82f6" : "#ec4899";
    const initial = name.trim().split(" ").pop().charAt(0).toUpperCase();
    const fallbackSvg = `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="${color}"/><text x="50" y="58" font-family="'Outfit', sans-serif" font-size="36" font-weight="bold" fill="white" text-anchor="middle">${initial}</text></svg>`;
    return "data:image/svg+xml;utf8," + encodeURIComponent(fallbackSvg);
}

// Build list of avatar selections in form
function setupAvatarPicker() {
    const picker = document.getElementById("avatar-picker");
    if (!picker) return;
    picker.innerHTML = "";
    Object.keys(avatarTemplates).forEach(key => {
        const div = document.createElement("div");
        div.className = "avatar-picker-item";
        div.dataset.avatar = key;
        div.innerHTML = avatarTemplates[key];
        div.addEventListener("click", () => {
            document.querySelectorAll(".avatar-picker-item").forEach(item => item.classList.remove("selected"));
            div.classList.add("selected");
        });
        picker.appendChild(div);
    });
}

// Helpers for YouTube embedded player
function getYouTubeEmbedUrl(url) {
    if (!url) return null;
    let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    let match = url.match(regExp);
    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }
    return null;
}

// -------------------------------------------------------------
// ZOOM & PAN & ACTIONS LISTENERS
// -------------------------------------------------------------
function setupEventListeners() {
    const container = document.getElementById("tree-container");
    if (container) {
        // Pan mouse events
        container.addEventListener("mousedown", (e) => {
            if (e.target.tagName === "svg" || e.target.id === "tree-svg" || e.target.id === "links-group" || e.target.id === "nodes-group") {
                isPanning = true;
                container.style.cursor = "grabbing";
                startPanX = e.clientX - currentPanX;
                startPanY = e.clientY - currentPanY;
            }
        });

        // Zoom wheel
        container.addEventListener("wheel", (e) => {
            e.preventDefault();
            const zoomIntensity = 0.08;
            const mouseX = e.clientX - container.getBoundingClientRect().left;
            const mouseY = e.clientY - container.getBoundingClientRect().top;
            
            const wheel = e.deltaY < 0 ? 1 : -1;
            const zoomFactor = Math.exp(wheel * zoomIntensity);
            
            currentPanX = mouseX - (mouseX - currentPanX) * zoomFactor;
            currentPanY = mouseY - (mouseY - currentPanY) * zoomFactor;
            currentZoom *= zoomFactor;
            currentZoom = Math.min(Math.max(currentZoom, 0.2), 3);
            applyTransform();
        }, { passive: false });
    }

    window.addEventListener("mousemove", (e) => {
        if (!isPanning) return;
        currentPanX = e.clientX - startPanX;
        currentPanY = e.clientY - startPanY;
        applyTransform();
    });

    window.addEventListener("mouseup", () => {
        isPanning = false;
        if (container) container.style.cursor = "grab";
    });

    // Controls
    const zoomIn = document.getElementById("ctrl-zoom-in");
    if (zoomIn) zoomIn.addEventListener("click", () => {
        currentZoom = Math.min(currentZoom + 0.15, 3);
        applyTransform();
    });

    const zoomOut = document.getElementById("ctrl-zoom-out");
    if (zoomOut) zoomOut.addEventListener("click", () => {
        currentZoom = Math.max(currentZoom - 0.15, 0.2);
        applyTransform();
    });

    const ctrlFit = document.getElementById("ctrl-fit");
    if (ctrlFit) ctrlFit.addEventListener("click", fitTreeToScreen);

    const ctrlReset = document.getElementById("ctrl-reset");
    if (ctrlReset) ctrlReset.addEventListener("click", () => {
        currentZoom = 1.0;
        currentPanX = 0;
        currentPanY = 0;
        applyTransform();
    });

    // Theme Toggle
    const themeToggle = document.getElementById("theme-toggle");
    if (themeToggle) themeToggle.addEventListener("click", () => {
        const body = document.body;
        const btnIcon = document.querySelector("#theme-toggle i");
        if (body.classList.contains("light-theme")) {
            body.classList.replace("light-theme", "dark-theme");
            if (btnIcon) btnIcon.className = "fa-solid fa-sun";
        } else {
            body.classList.replace("dark-theme", "light-theme");
            if (btnIcon) btnIcon.className = "fa-solid fa-moon";
        }
    });

    // Search input
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");
    if (searchInput && searchResults) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.trim().toLowerCase();
            if (!query) {
                searchResults.classList.add("hidden");
                return;
            }

            const filtered = members.filter(m => m.name.toLowerCase().includes(query));
            searchResults.innerHTML = "";
            
            if (filtered.length === 0) {
                const empty = document.createElement("div");
                empty.className = "search-result-item";
                empty.innerHTML = `<span style="font-size: 13px; color: var(--text-muted);">Không tìm thấy thành viên</span>`;
                searchResults.appendChild(empty);
            } else {
                filtered.forEach(m => {
                    const item = document.createElement("div");
                    item.className = "search-result-item";
                    item.innerHTML = `
                        <img src="${getAvatarDataUrl(m.avatar, m.name, m.gender)}" class="search-result-avatar">
                        <div class="search-result-info">
                            <h4>${m.name}</h4>
                            <p>${m.birthDate || "Chưa rõ"} - ${m.isDeceased ? (m.deathDate || "đã mất") : "Hiện tại"}</p>
                        </div>
                    `;
                    item.addEventListener("click", () => {
                        if (relationMode) {
                            calculateAndShowRelation(relationFirstId, m.id);
                        } else {
                            selectMember(m.id);
                            focusOnNode(m.id);
                        }
                        searchResults.classList.add("hidden");
                        searchInput.value = "";
                    });
                    searchResults.appendChild(item);
                });
            }
            searchResults.classList.remove("hidden");
        });

        document.addEventListener("click", (e) => {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.add("hidden");
            }
        });
    }

    // Sidebar actions
    const btnBackToEmpty = document.getElementById("btn-back-to-empty");
    if (btnBackToEmpty) btnBackToEmpty.addEventListener("click", () => {
        exitRelationMode();
        deselectMember();
    });

    const btnEditMember = document.getElementById("btn-edit-member");
    if (btnEditMember) btnEditMember.addEventListener("click", () => openFormPanel("edit"));

    const btnCancelEdit = document.getElementById("btn-cancel-edit");
    if (btnCancelEdit) btnCancelEdit.addEventListener("click", cancelFormEdit);

    const btnFormCancel = document.getElementById("btn-form-cancel");
    if (btnFormCancel) btnFormCancel.addEventListener("click", cancelFormEdit);
    
    const btnAddSpouse = document.getElementById("btn-add-spouse");
    if (btnAddSpouse) btnAddSpouse.addEventListener("click", () => openFormPanel("add-spouse"));

    const btnAddChild = document.getElementById("btn-add-child");
    if (btnAddChild) btnAddChild.addEventListener("click", () => openFormPanel("add-child"));

    const btnAddParent = document.getElementById("btn-add-parent");
    if (btnAddParent) btnAddParent.addEventListener("click", () => openFormPanel("add-parent"));

    const btnDeleteMember = document.getElementById("btn-delete-member");
    if (btnDeleteMember) btnDeleteMember.addEventListener("click", handleDeleteMember);

    // Form Submit
    const memberForm = document.getElementById("member-form");
    if (memberForm) memberForm.addEventListener("submit", handleFormSubmit);

    // Stats Modal
    const btnStats = document.getElementById("btn-stats");
    if (btnStats) btnStats.addEventListener("click", openStatsModal);

    const btnCloseStats = document.getElementById("btn-close-stats");
    if (btnCloseStats) btnCloseStats.addEventListener("click", closeStatsModal);

    window.addEventListener("click", (e) => {
        const modal = document.getElementById("stats-modal");
        if (modal && e.target === modal) {
            closeStatsModal();
        }
    });

    // Import / Export
    const btnExport = document.getElementById("btn-export");
    if (btnExport) btnExport.addEventListener("click", exportToJson);

    const btnImportTrigger = document.getElementById("btn-import-trigger");
    const importFileInput = document.getElementById("import-file-input");
    if (btnImportTrigger && importFileInput) {
        btnImportTrigger.addEventListener("click", () => {
            importFileInput.click();
        });
        importFileInput.addEventListener("change", importFromJson);
    }

    // Reset Demo Data
    const btnResetDemo = document.getElementById("btn-reset-demo");
    if (btnResetDemo) {
        btnResetDemo.addEventListener("click", () => {
            if (confirm("Bạn có chắc chắn muốn xóa dữ liệu hiện tại và khôi phục lại gia phả mẫu?")) {
                localStorage.removeItem("giapha_members");
                collapsedNodes.clear();
                loadMembersData();
                renderTree();
                updateStatistics();
                deselectMember();
                fitTreeToScreen();
                alert("Đã khôi phục dữ liệu mẫu!");
            }
        });
    }

    // Relationship Calculator buttons
    const btnCalcRelation = document.getElementById("btn-calc-relation");
    if (btnCalcRelation) btnCalcRelation.addEventListener("click", startRelationCalculation);

    const btnCancelRelation = document.getElementById("btn-cancel-relation-mode");
    if (btnCancelRelation) btnCancelRelation.addEventListener("click", exitRelationMode);

    const btnCloseRelResult = document.getElementById("btn-close-relation-result");
    if (btnCloseRelResult) {
        btnCloseRelResult.addEventListener("click", () => {
            const card = document.getElementById("relation-result-card");
            if (card) card.classList.add("hidden");
        });
    }
}

function applyTransform() {
    const viewport = document.getElementById("tree-viewport");
    viewport.setAttribute("transform", `translate(${currentPanX}, ${currentPanY}) scale(${currentZoom})`);
}

// -------------------------------------------------------------
// LAYOUT & RENDERING ALGORITHM WITH EXPAND/COLLAPSE BRANCHES
// -------------------------------------------------------------
function calculateLayout() {
    if (members.length === 0) return { nodes: {}, links: [] };

    // Find visible members based on expanded/collapsed nodes
    const visibleIds = new Set();
    const queue = [];

    // Roots
    const roots = members.filter(m => {
        const hasNoParents = !(m.parents) || (m.parents || []).length === 0;
        if (!hasNoParents) return false;
        
        // Exclude spouses marrying into the family (whose spouses have parents)
        const hasSpouseWithParents = (m.spouses || []).some(sId => {
            const spouse = members.find(x => x.id === sId);
            return spouse && spouse.parents && spouse.parents.length > 0;
        });
        
        return !hasSpouseWithParents;
    });

    if (roots.length > 0) {
        roots.forEach(r => {
            visibleIds.add(r.id);
            queue.push(r.id);
        });
    } else {
        visibleIds.add(members[0].id);
        queue.push(members[0].id);
    }

    while (queue.length > 0) {
        const currentId = queue.shift();
        const m = members.find(x => x.id === currentId);
        if (!m) continue;

        // Spouses are visible if this node is visible
        if (m.spouses) {
            (m.spouses || []).forEach(sId => {
                if (!visibleIds.has(sId)) {
                    visibleIds.add(sId);
                }
            });
        }

        // Children are visible ONLY if this parent is NOT collapsed
        if (m.children && !collapsedNodes.has(currentId)) {
            (m.children || []).forEach(chId => {
                if (!visibleIds.has(chId)) {
                    visibleIds.add(chId);
                    queue.push(chId);
                }
            });
        }
    }

    const layoutNodes = {};
    const links = [];
    const visited = new Set();

    // Recursive arrangeNode function to compute sizes and position nodes
    function arrangeNode(nodeId, level) {
        if (visited.has(nodeId) || !visibleIds.has(nodeId)) {
            return { width: 0, midpoint: 0, positions: {}, links: [] };
        }
        visited.add(nodeId);

        const m = members.find(x => x.id === nodeId);
        if (!m) return { width: 0, midpoint: 0, positions: {}, links: [] };

        // Get spouses on this level
        const visibleSpouses = (m.spouses || []).filter(sId => visibleIds.has(sId));
        visibleSpouses.forEach(sId => visited.add(sId));

        const hasSpouse = visibleSpouses.length > 0;
        const familyWidth = hasSpouse ? (2 * NODE_WIDTH + SPOUSE_GAP) : NODE_WIDTH;
        const parentMid = familyWidth / 2;

        // Children of this couple/node
        const childrenList = (m.children || []).filter(chId => visibleIds.has(chId) && !collapsedNodes.has(nodeId));
        const localLinks = [];

        if (childrenList.length === 0) {
            const positions = {};
            const y = level * (NODE_HEIGHT + ROW_GAP) + 50;
            positions[nodeId] = { x: 0, y, generation: level };
            if (hasSpouse) {
                const spouseId = visibleSpouses[0];
                positions[spouseId] = { x: NODE_WIDTH + SPOUSE_GAP, y, generation: level };
                
                localLinks.push({
                    type: "spouse",
                    from: nodeId,
                    to: spouseId,
                    x1: NODE_WIDTH,
                    y1: y + NODE_HEIGHT / 2,
                    x2: NODE_WIDTH + SPOUSE_GAP,
                    y2: y + NODE_HEIGHT / 2
                });
            }

            return {
                width: familyWidth,
                midpoint: parentMid,
                positions,
                links: localLinks
            };
        }

        // Layout all children recursively
        const childLayouts = childrenList.map(chId => arrangeNode(chId, level + 1));
        const totalChildrenWidth = childLayouts.reduce((sum, lay) => sum + lay.width, 0) + (childrenList.length - 1) * SIBLING_GAP;
        const childrenMid = totalChildrenWidth / 2;

        let parentStart = 0;
        let childrenStart = 0;
        let totalWidth = 0;

        if (parentMid >= childrenMid) {
            parentStart = 0;
            childrenStart = parentMid - childrenMid;
            totalWidth = familyWidth;
        } else {
            childrenStart = 0;
            parentStart = childrenMid - parentMid;
            totalWidth = totalChildrenWidth;
        }

        const positions = {};
        const y = level * (NODE_HEIGHT + ROW_GAP) + 50;
        
        // Position parents
        positions[nodeId] = { x: parentStart, y, generation: level };
        if (hasSpouse) {
            const spouseId = visibleSpouses[0];
            positions[spouseId] = { x: parentStart + NODE_WIDTH + SPOUSE_GAP, y, generation: level };
            
            localLinks.push({
                type: "spouse",
                from: nodeId,
                to: spouseId,
                x1: parentStart + NODE_WIDTH,
                y1: y + NODE_HEIGHT / 2,
                x2: parentStart + NODE_WIDTH + SPOUSE_GAP,
                y2: y + NODE_HEIGHT / 2
            });
        }

        // Position children subtrees
        let currentChildX = childrenStart;
        childLayouts.forEach((lay, idx) => {
            const childId = childrenList[idx];
            
            // Offset all coordinates in child subtree
            Object.keys(lay.positions).forEach(cId => {
                positions[cId] = {
                    x: lay.positions[cId].x + currentChildX,
                    y: lay.positions[cId].y,
                    generation: lay.positions[cId].generation
                };
            });

            // Offset child links
            lay.links.forEach(l => {
                l.x1 += currentChildX;
                l.x2 += currentChildX;
                localLinks.push(l);
            });

            currentChildX += lay.width + SIBLING_GAP;
        });

        // Add parent-to-child connection lines
        const pMidX = parentStart + parentMid;
        const parentY = y + NODE_HEIGHT / 2;

        childrenList.forEach((chId, idx) => {
            const childLoc = positions[chId];
            if (childLoc) {
                localLinks.push({
                    type: "child",
                    from: nodeId,
                    to: chId,
                    x1: pMidX,
                    y1: parentY,
                    x2: childLoc.x + NODE_WIDTH / 2,
                    y2: childLoc.y
                });
            }
        });

        return {
            width: totalWidth,
            midpoint: parentStart + parentMid,
            positions,
            links: localLinks
        };
    }

    // Process all visible roots and place their trees side-by-side
    const visibleRoots = roots.filter(r => visibleIds.has(r.id));
    let accumulatedX = 50;
    const treeGap = 150;

    visibleRoots.forEach(root => {
        if (visited.has(root.id)) return;
        const res = arrangeNode(root.id, 0);
        
        // Shift this root tree
        Object.keys(res.positions).forEach(id => {
            layoutNodes[id] = {
                x: res.positions[id].x + accumulatedX,
                y: res.positions[id].y,
                generation: res.positions[id].generation
            };
        });

        // Shift links that belong to this tree
        res.links.forEach(l => {
            l.x1 += accumulatedX;
            l.x2 += accumulatedX;
            links.push(l);
        });

        accumulatedX += res.width + treeGap;
    });

    return { nodes: layoutNodes, links };
}

// Render SVG elements
function renderTree() {
    const { nodes, links } = calculateLayout();
    const linksGroup = document.getElementById("links-group");
    const nodesGroup = document.getElementById("nodes-group");

    linksGroup.innerHTML = "";
    nodesGroup.innerHTML = "";

    // Render Links
    links.forEach(l => {
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        if (l.type === "spouse") {
            path.setAttribute("d", `M ${l.x1} ${l.y1} L ${l.x2} ${l.y2}`);
            path.setAttribute("class", "link-line link-spouse");
        } else {
            const midY = (l.y1 + l.y2) / 2;
            path.setAttribute("d", `M ${l.x1} ${l.y1} C ${l.x1} ${midY}, ${l.x2} ${midY}, ${l.x2} ${l.y2}`);
            path.setAttribute("class", "link-line");
        }
        linksGroup.appendChild(path);
    });

    // Render Nodes
    Object.keys(nodes).forEach(id => {
        const loc = nodes[id];
        const m = members.find(x => x.id === id);
        if (!m) return;

        const isSelected = selectedMemberId === id;

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", `node-card ${isSelected ? "selected" : ""}`);
        g.setAttribute("transform", `translate(${loc.x}, ${loc.y})`);
        g.dataset.id = id;

        // Card background
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width", NODE_WIDTH);
        rect.setAttribute("height", NODE_HEIGHT);
        rect.setAttribute("class", "node-rect");
        g.appendChild(rect);

        // Gender color code
        const genderLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
        genderLine.setAttribute("x1", "0");
        genderLine.setAttribute("y1", "4");
        genderLine.setAttribute("x2", "0");
        genderLine.setAttribute("y2", (NODE_HEIGHT - 4).toString());
        genderLine.setAttribute("class", `node-gender-line ${m.gender === "Nam" ? "male" : "female"}`);
        g.appendChild(genderLine);

        // Avatar Clip path
        const clipPathId = `clip-${id}`;
        const clip = document.createElementNS("http://www.w3.org/2000/svg", "clipPath");
        clip.setAttribute("id", clipPathId);
        const clipCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        clipCircle.setAttribute("cx", "32");
        clipCircle.setAttribute("cy", "35");
        clipCircle.setAttribute("r", "20");
        clip.appendChild(clipCircle);
        g.appendChild(clip);

        // Avatar Image
        const img = document.createElementNS("http://www.w3.org/2000/svg", "image");
        img.setAttributeNS("http://www.w3.org/1999/xlink", "href", getAvatarDataUrl(m.avatar, m.name, m.gender));
        img.setAttribute("x", "12");
        img.setAttribute("y", "15");
        img.setAttribute("width", "40");
        img.setAttribute("height", "40");
        img.setAttribute("clip-path", `url(#${clipPathId})`);
        g.appendChild(img);

        // Member name text
        const nameText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        nameText.setAttribute("x", "64");
        nameText.setAttribute("y", "32");
        nameText.setAttribute("class", "node-text-name");
        nameText.textContent = limitText(m.name, 16);
        g.appendChild(nameText);

        // Member dates text
        const datesText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        datesText.setAttribute("x", "64");
        datesText.setAttribute("y", "48");
        datesText.setAttribute("class", "node-text-dates");
        
        const birthYear = m.birthDate ? m.birthDate.split("/").pop() : "Chưa rõ";
        const deathYear = m.isDeceased ? (m.deathDate ? m.deathDate.split("/").pop() : "đã mất") : "Hiện tại";
        datesText.textContent = `${birthYear} - ${deathYear}`;
        g.appendChild(datesText);

        // Style deceased cards
        if (m.isDeceased) {
            rect.style.strokeDasharray = "4 2";
            rect.style.opacity = "0.85";
        }

        // Draw collapse/expand toggle if member has children
        if (m.children && m.children.length > 0) {
            const toggleBtn = document.createElementNS("http://www.w3.org/2000/svg", "g");
            toggleBtn.setAttribute("class", "node-toggle-btn");
            toggleBtn.setAttribute("transform", `translate(${NODE_WIDTH / 2}, ${NODE_HEIGHT})`);
            
            const btnCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            btnCircle.setAttribute("r", "10");
            toggleBtn.appendChild(btnCircle);
            
            const btnText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            btnText.setAttribute("y", "4");
            btnText.textContent = collapsedNodes.has(m.id) ? "+" : "−";
            toggleBtn.appendChild(btnText);
            
            toggleBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const isCollapsed = collapsedNodes.has(m.id);
                const targetIds = [m.id, ...(m.spouses || [])];
                
                targetIds.forEach(id => {
                    if (isCollapsed) {
                        collapsedNodes.delete(id);
                    } else {
                        collapsedNodes.add(id);
                    }
                });
                renderTree();
            });
            g.appendChild(toggleBtn);
        }

        // Node click handler
        g.addEventListener("click", (e) => {
            e.stopPropagation();
            if (relationMode) {
                calculateAndShowRelation(relationFirstId, id);
            } else {
                selectMember(id);
            }
        });

        nodesGroup.appendChild(g);
    });
}

function limitText(text, max) {
    if (text.length <= max) return text;
    return text.substring(0, max - 3) + "...";
}

// Fit and center tree structure inside container
function fitTreeToScreen() {
    const { nodes } = calculateLayout();
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

    const container = document.getElementById("tree-container");
    const containerW = container ? container.clientWidth : 800;
    const containerH = container ? container.clientHeight : 600;

    // Safety fallback for hidden/collapsed container dimensions on load
    const safeW = containerW > 100 ? containerW : 800;
    const safeH = containerH > 100 ? containerH : 600;

    const scaleX = (safeW - 80) / treeW;
    const scaleY = (safeH - 80) / treeH;
    
    // Zoom should always be positive and within reasonable limits
    currentZoom = Math.min(Math.min(scaleX, scaleY), 1.0);
    if (isNaN(currentZoom) || currentZoom <= 0.05) {
        currentZoom = 0.5;
    }

    currentPanX = (safeW - treeW * currentZoom) / 2 - minX * currentZoom;
    currentPanY = (safeH - treeH * currentZoom) / 2 - minY * currentZoom;

    if (isNaN(currentPanX)) currentPanX = 50;
    if (isNaN(currentPanY)) currentPanY = 50;

    applyTransform();
}

function focusOnNode(memberId) {
    const { nodes } = calculateLayout();
    const loc = nodes[memberId];
    if (!loc) return;

    const container = document.getElementById("tree-container");
    const containerW = container.clientWidth;
    const containerH = container.clientHeight;

    currentZoom = 1.0;
    currentPanX = containerW / 2 - (loc.x + NODE_WIDTH / 2);
    currentPanY = containerH / 2 - (loc.y + NODE_HEIGHT / 2);

    applyTransform();
}

// -------------------------------------------------------------
// SELECTION & SIDEBAR DETAILS WITH VIDEO & RELATION CALC
// -------------------------------------------------------------
function selectMember(id) {
    selectedMemberId = id;
    renderTree();
    
    const m = members.find(x => x.id === id);
    if (!m) return;

    document.getElementById("sidebar-empty-state").classList.add("hidden");
    document.getElementById("sidebar-form-panel").classList.add("hidden");
    
    const detailPanel = document.getElementById("sidebar-detail-panel");
    detailPanel.classList.remove("hidden");

    // Profile summary
    document.getElementById("detail-avatar").src = getAvatarDataUrl(m.avatar, m.name, m.gender);
    document.getElementById("detail-name").textContent = m.name;
    
    const birthYear = m.birthDate ? m.birthDate : "Chưa rõ";
    const deathYear = m.isDeceased ? (m.deathDate || "Không rõ") : "Còn sống";
    document.getElementById("detail-dates").textContent = `${birthYear} - ${deathYear}`;

    // Gender/Deceased badge
    const badge = document.getElementById("detail-gender-badge");
    badge.textContent = m.gender;
    badge.className = `badge ${m.gender === "Nam" ? "male" : "female"}`;
    if (m.isDeceased) {
        badge.textContent = `${m.gender} (Đã mất)`;
        badge.className = "badge deceased";
    }

    // Basic Fields
    document.getElementById("detail-birth-date").textContent = m.birthDate || "-";
    
    const deathRow = document.getElementById("detail-death-row");
    if (m.isDeceased) {
        deathRow.classList.remove("hidden");
        document.getElementById("detail-death-date").textContent = m.deathDate || "Chưa rõ";
    } else {
        deathRow.classList.add("hidden");
    }

    document.getElementById("detail-job").textContent = m.job || "Chưa rõ";
    
    // Estimate Generation
    const { nodes } = calculateLayout();
    const nodeLoc = nodes[m.id];
    document.getElementById("detail-generation").textContent = nodeLoc ? (nodeLoc.generation + 1) : "-";

    // Video Section
    const videoSection = document.getElementById("detail-video-section");
    const videoContainer = document.getElementById("detail-video-container");
    const embedUrl = getYouTubeEmbedUrl(m.video);

    if (m.video && embedUrl) {
        videoSection.classList.remove("hidden");
        videoContainer.innerHTML = `<iframe src="${embedUrl}" allowfullscreen></iframe>`;
    } else if (m.video) {
        // Direct video link fallback
        videoSection.classList.remove("hidden");
        videoContainer.innerHTML = `<video src="${m.video}" controls style="width:100%; height:100%;"></video>`;
    } else {
        videoSection.classList.add("hidden");
        videoContainer.innerHTML = "";
    }

    // Bio
    document.getElementById("detail-bio").textContent = m.bio || "Chưa có thông tin tiểu sử.";

    // Relationships List
    const relationsList = document.getElementById("detail-relations-list");
    relationsList.innerHTML = "";

    const addRelItem = (relId, typeLabel) => {
        const target = members.find(x => x.id === relId);
        if (!target) return;
        const item = document.createElement("div");
        item.className = "relation-item";
        item.innerHTML = `
            <div class="rel-left">
                <img src="${getAvatarDataUrl(target.avatar, target.name, target.gender)}" class="rel-avatar">
                <div>
                    <div class="rel-name">${target.name}</div>
                    <div class="rel-type">${typeLabel}</div>
                </div>
            </div>
            <i class="fa-solid fa-chevron-right" style="font-size:12px; color:var(--text-muted);"></i>
        `;
        item.addEventListener("click", () => {
            selectMember(target.id);
            focusOnNode(target.id);
        });
        relationsList.appendChild(item);
    };

    // Parents
    m.parents.forEach((pId, idx) => {
        const parent = members.find(x => x.id === pId);
        const label = parent ? (parent.gender === "Nam" ? "Cha" : "Mẹ") : "Phụ huynh";
        addRelItem(pId, label);
    });

    // Spouses
    m.spouses.forEach(sId => {
        const label = m.gender === "Nam" ? "Vợ" : "Chồng";
        addRelItem(sId, label);
    });

    // Children
    m.children.forEach(cId => {
        addRelItem(cId, "Con");
    });

    if (relationsList.innerHTML === "") {
        relationsList.innerHTML = `<p style="font-size:13px; color:var(--text-muted); font-style:italic;">Chưa cập nhật thông tin</p>`;
    }
}

function deselectMember() {
    selectedMemberId = null;
    renderTree();
    document.getElementById("sidebar-detail-panel").classList.add("hidden");
    document.getElementById("sidebar-form-panel").classList.add("hidden");
    document.getElementById("relation-result-card").classList.add("hidden");
    document.getElementById("sidebar-empty-state").classList.remove("hidden");
}

// -------------------------------------------------------------
// RELATIONSHIP CALCULATOR GRAPH ALGORITHM
// -------------------------------------------------------------
function startRelationCalculation() {
    if (!selectedMemberId) return;
    relationMode = true;
    relationFirstId = selectedMemberId;
    
    // Show top canvas warning banner
    const banner = document.getElementById("relation-calc-banner");
    const m = members.find(x => x.id === relationFirstId);
    banner.querySelector("span").textContent = `Tính xưng hô: Chọn người thứ 2 đối chiếu với "${m.name}"...`;
    banner.classList.remove("hidden");
}

function exitRelationMode() {
    relationMode = false;
    relationFirstId = null;
    document.getElementById("relation-calc-banner").classList.add("hidden");
}

// Un-directed BFS search to find shortest path
function findShortestPath(startId, endId) {
    const queue = [[startId]];
    const visited = new Set([startId]);
    
    while (queue.length > 0) {
        const path = queue.shift();
        const currentId = path[path.length - 1];
        
        if (currentId === endId) return path;
        
        const current = members.find(x => x.id === currentId);
        if (!current) continue;
        
        // Neighbors (parents, children, spouses)
        const neighbors = [];
        current.parents.forEach(id => neighbors.push({ id, rel: "parent" }));
        current.children.forEach(id => neighbors.push({ id, rel: "child" }));
        current.spouses.forEach(id => neighbors.push({ id, rel: "spouse" }));
        
        for (const n of neighbors) {
            if (!visited.has(n.id)) {
                visited.add(n.id);
                queue.push([...path, n.id]);
            }
        }
    }
    return null;
}

function calculateAndShowRelation(id1, id2) {
    exitRelationMode();
    
    const p1 = members.find(x => x.id === id1);
    const p2 = members.find(x => x.id === id2);
    if (!p1 || !p2) return;

    const path = findShortestPath(id1, id2);
    const resultCard = document.getElementById("relation-result-card");
    const visual = document.getElementById("relation-path-visual");
    const text = document.getElementById("relation-summary-text");

    resultCard.classList.remove("hidden");
    visual.innerHTML = "";

    if (!path || path.length === 0) {
        text.textContent = "Không tìm thấy đường mối quan hệ giữa hai người này.";
        return;
    }

    // Build visual path flow
    path.forEach((nodeId, idx) => {
        const m = members.find(x => x.id === nodeId);
        const nodeSpan = document.createElement("span");
        nodeSpan.className = `path-step-node ${idx === 0 ? "start" : (idx === path.length - 1 ? "end" : "")}`;
        nodeSpan.textContent = m.name;
        nodeSpan.title = m.name;
        visual.appendChild(nodeSpan);

        if (idx < path.length - 1) {
            const arrow = document.createElement("span");
            arrow.className = "path-step-arrow";
            arrow.innerHTML = `<i class="fa-solid fa-arrow-right"></i>`;
            visual.appendChild(arrow);
        }
    });

    // Translate relations
    const addressing = determineKinshipTerm(path);
    text.innerHTML = `
        <strong>Xưng hô:</strong><br>
        - <strong>${p1.name}</strong> là <strong>${addressing.term1}</strong> của ${p2.name}.<br>
        - <strong>${p2.name}</strong> là <strong>${addressing.term2}</strong> của ${p1.name}.<br>
        - Xưng hô giao tiếp: <strong>${p2.name}</strong> gọi <strong>${p1.name}</strong> là <strong>"${addressing.call1}"</strong>.
    `;
}

// Detailed Vietnamese kinship translation rule-base
function determineKinshipTerm(path) {
    if (path.length === 1) {
        return { term1: "Bản thân", term2: "Bản thân", call1: "Tôi" };
    }
    
    const m1 = members.find(x => x.id === path[0]);
    const m2 = members.find(x => x.id === path[path.length - 1]);
    
    // 1. Spouses (Vợ / Chồng)
    if (path.length === 2 && m1.spouses.includes(m2.id)) {
        if (m1.gender === "Nam") {
            return { term1: "Chồng", term2: "Vợ", call1: "Chồng" };
        } else {
            return { term1: "Vợ", term2: "Chồng", call1: "Vợ" };
        }
    }

    // Helper to calculate birth year
    const getYear = (m) => m.birthDate ? (parseInt(m.birthDate.split("/").pop()) || 1980) : 1980;

    // Helper to find generation numbers from layout
    const { nodes } = calculateLayout();
    const gen1 = nodes[m1.id]?.generation || 0;
    const gen2 = nodes[m2.id]?.generation || 0;
    const genDiff = gen2 - gen1; // positive means m2 is younger gen, negative means m2 is older gen

    // Direct Parent / Child
    if (path.length === 2) {
        if (m1.children.includes(m2.id)) {
            // m1 is parent of m2
            const term1 = m1.gender === "Nam" ? "Cha" : "Mẹ";
            const term2 = m2.gender === "Nam" ? "Con trai" : "Con gái";
            const call1 = m1.gender === "Nam" ? "Bố" : "Mẹ";
            return { term1, term2, call1 };
        }
        if (m1.parents.includes(m2.id)) {
            // m1 is child of m2
            const term1 = m1.gender === "Nam" ? "Con trai" : "Con gái";
            const term2 = m2.gender === "Nam" ? "Cha" : "Mẹ";
            const call1 = term2 === "Cha" ? "Con" : "Con";
            return { term1, term2, call1: m2.gender === "Nam" ? "Bố" : "Mẹ" };
        }
    }

    // Siblings (Anh/Chị/Em ruột)
    if (path.length === 3 && m1.parents.some(p => m2.parents.includes(p)) && genDiff === 0) {
        const isM1Older = getYear(m1) < getYear(m2);
        if (isM1Older) {
            const term1 = m1.gender === "Nam" ? "Anh trai" : "Chị gái";
            const term2 = m2.gender === "Nam" ? "Em trai" : "Em gái";
            return { term1, term2, call1: m1.gender === "Nam" ? "Anh" : "Chị" };
        } else {
            const term1 = m1.gender === "Nam" ? "Em trai" : "Em gái";
            const term2 = m2.gender === "Nam" ? "Anh trai" : "Chị gái";
            return { term1, term2, call1: "Em" };
        }
    }

    // Grandparents / Grandchildren
    if (genDiff === 2) {
        // m2 is grandchild of m1
        const term1 = m1.gender === "Nam" ? "Ông" : "Bà";
        const term2 = "Cháu";
        return { term1, term2, call1: term1 };
    }
    if (genDiff === -2) {
        // m2 is grandparent of m1
        const term1 = "Cháu";
        const term2 = m2.gender === "Nam" ? "Ông" : "Bà";
        return { term1, term2, call1: term2 };
    }

    // Great Grandparents / Great Grandchildren
    if (genDiff >= 3) {
        const term1 = m1.gender === "Nam" ? "Cụ ông" : "Cụ bà";
        const term2 = "Chắt";
        return { term1, term2, call1: m1.gender === "Nam" ? "Cụ" : "Cụ" };
    }
    if (genDiff <= -3) {
        const term1 = "Chắt";
        const term2 = m2.gender === "Nam" ? "Cụ ông" : "Cụ bà";
        return { term1, term2, call1: m2.gender === "Nam" ? "Cụ" : "Cụ" };
    }

    // Aunt/Uncle vs Nephew/Niece (Gen difference = 1)
    if (genDiff === 1) {
        // m1 is older generation (Uncle / Aunt) of m2
        // Find if paternal or maternal side
        let side = "nội";
        // Check path to see if maternal relation is present
        const step2 = members.find(x => x.id === path[1]);
        if (step2 && step2.parents && step2.parents.length > 0) {
            const father = members.find(x => x.parents.includes(step2.id) && x.gender === "Nam");
            if (!father) side = "ngoại";
        }
        
        let term1 = "Bác";
        if (m1.gender === "Nam") {
            term1 = side === "nội" ? "Chú" : "Cậu";
        } else {
            term1 = side === "nội" ? "Cô" : "Dì";
        }
        
        // If m1 is older sibling of the parent, we call "Bác" regardless of gender in some dialects, but let's stick to standard:
        // Father's older brother/sister = Bác. Mother's older brother/sister = Bác / Dì.
        
        return { term1, term2: "Cháu", call1: term1 };
    }

    if (genDiff === -1) {
        // m2 is older generation (Uncle / Aunt) of m1
        let side = "nội";
        let term2 = "Bác";
        if (m2.gender === "Nam") {
            term2 = side === "nội" ? "Chú" : "Cậu";
        } else {
            term2 = side === "nội" ? "Cô" : "Dì";
        }
        return { term1: "Cháu", term2, call1: "Cháu" };
    }

    // Cousin (Anh em họ - Gen difference = 0)
    if (genDiff === 0) {
        const isM1Older = getYear(m1) < getYear(m2);
        if (isM1Older) {
            const term1 = m1.gender === "Nam" ? "Anh họ" : "Chị họ";
            const term2 = "Em họ";
            return { term1, term2, call1: m1.gender === "Nam" ? "Anh" : "Chị" };
        } else {
            const term1 = "Em họ";
            const term2 = m2.gender === "Nam" ? "Anh họ" : "Chị họ";
            return { term1, term2, call1: "Em" };
        }
    }

    // General fallback based on generation delta
    if (genDiff > 0) {
        return { term1: "Vai Vế Trên (Họ hàng)", term2: "Vai Vế Dưới (Họ hàng)", call1: m1.gender === "Nam" ? "Ông/Bác" : "Bà/Cô" };
    } else {
        return { term1: "Vai Vế Dưới (Họ hàng)", term2: "Vai Vế Trên (Họ hàng)", call1: "Cháu" };
    }
}

// -------------------------------------------------------------
// ADD / EDIT / DELETE CONTROLS
// -------------------------------------------------------------
function openFormPanel(type) {
    const detailPanel = document.getElementById("sidebar-detail-panel");
    const formPanel = document.getElementById("sidebar-form-panel");
    
    detailPanel.classList.add("hidden");
    formPanel.classList.remove("hidden");

    document.getElementById("form-action-type").value = type;
    document.getElementById("form-member-id").value = selectedMemberId;
    document.getElementById("member-form").reset();

    const selectedAvatarItem = document.querySelector(".avatar-picker-item.selected");
    if (selectedAvatarItem) selectedAvatarItem.classList.remove("selected");

    const deathDateGroup = document.getElementById("form-death-date-group");
    deathDateGroup.classList.add("hidden");

    const statusSelect = document.getElementById("form-status");
    statusSelect.addEventListener("change", () => {
        if (statusSelect.value === "deceased") {
            deathDateGroup.classList.remove("hidden");
        } else {
            deathDateGroup.classList.add("hidden");
        }
    });

    if (type === "edit") {
        document.getElementById("form-title").textContent = "Chỉnh sửa thông tin";
        const m = members.find(x => x.id === selectedMemberId);
        if (m) {
            document.getElementById("form-name").value = m.name;
            document.getElementById("form-gender").value = m.gender;
            document.getElementById("form-status").value = m.isDeceased ? "deceased" : "alive";
            document.getElementById("form-birth-date").value = m.birthDate || "";
            document.getElementById("form-death-date").value = m.deathDate || "";
            document.getElementById("form-job").value = m.job || "";
            document.getElementById("form-video").value = m.video || "";
            document.getElementById("form-bio").value = m.bio || "";
            
            if (m.isDeceased) {
                deathDateGroup.classList.remove("hidden");
            }

            const avItem = document.querySelector(`.avatar-picker-item[data-avatar="${m.avatar}"]`);
            if (avItem) avItem.classList.add("selected");
        }
    } else {
        // Adding relations
        const sourceMember = members.find(x => x.id === selectedMemberId);
        document.getElementById("form-relation-source-id").value = selectedMemberId;

        if (type === "add-spouse") {
            document.getElementById("form-title").textContent = `Thêm Vợ/Chồng cho ${sourceMember.name}`;
            document.getElementById("form-gender").value = sourceMember.gender === "Nam" ? "Nữ" : "Nam";
            
            const targetAvatar = sourceMember.gender === "Nam" ? "avatar-female-young" : "avatar-male-young";
            const avItem = document.querySelector(`.avatar-picker-item[data-avatar="${targetAvatar}"]`);
            if (avItem) avItem.classList.add("selected");
        } else if (type === "add-child") {
            document.getElementById("form-title").textContent = `Thêm Con cho ${sourceMember.name}`;
            const targetAvatar = "avatar-male-young";
            const avItem = document.querySelector(`.avatar-picker-item[data-avatar="${targetAvatar}"]`);
            if (avItem) avItem.classList.add("selected");
        } else if (type === "add-parent") {
            document.getElementById("form-title").textContent = `Thêm Cha/Mẹ cho ${sourceMember.name}`;
            const targetAvatar = "avatar-male-senior";
            const avItem = document.querySelector(`.avatar-picker-item[data-avatar="${targetAvatar}"]`);
            if (avItem) avItem.classList.add("selected");
        }
    }
}

function cancelFormEdit() {
    document.getElementById("sidebar-form-panel").classList.add("hidden");
    if (selectedMemberId) {
        selectMember(selectedMemberId);
    } else {
        deselectMember();
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const action = document.getElementById("form-action-type").value;
    const memberId = document.getElementById("form-member-id").value;
    const sourceId = document.getElementById("form-relation-source-id").value;

    const name = document.getElementById("form-name").value.trim();
    const gender = document.getElementById("form-gender").value;
    const isDeceased = document.getElementById("form-status").value === "deceased";
    const birthDate = document.getElementById("form-birth-date").value.trim();
    const deathDate = isDeceased ? document.getElementById("form-death-date").value.trim() : "";
    const job = document.getElementById("form-job").value.trim();
    const video = document.getElementById("form-video").value.trim();
    const bio = document.getElementById("form-bio").value.trim();
    
    const activeAvatar = document.querySelector(".avatar-picker-item.selected")?.dataset.avatar || 
                         (gender === "Nam" ? "avatar-male-young" : "avatar-female-young");

    if (action === "edit") {
        const m = members.find(x => x.id === memberId);
        if (m) {
            m.name = name;
            m.gender = gender;
            m.isDeceased = isDeceased;
            m.birthDate = birthDate;
            m.deathDate = deathDate;
            m.job = job;
            m.video = video;
            m.bio = bio;
            m.avatar = activeAvatar;
        }
    } else {
        const newId = Date.now().toString();
        const newMember = {
            id: newId,
            name,
            gender,
            isDeceased,
            birthDate,
            deathDate,
            job,
            video,
            bio,
            avatar: activeAvatar,
            spouses: [],
            children: [],
            parents: []
        };

        const source = members.find(x => x.id === sourceId);

        if (action === "add-spouse") {
            newMember.spouses.push(sourceId);
            source.spouses.push(newId);
        } else if (action === "add-child") {
            newMember.parents.push(sourceId);
            source.children.push(newId);
            
            source.spouses.forEach(sId => {
                newMember.parents.push(sId);
                const spouse = members.find(x => x.id === sId);
                if (spouse && !spouse.children.includes(newId)) {
                    spouse.children.push(newId);
                }
            });
        } else if (action === "add-parent") {
            newMember.children.push(sourceId);
            source.parents.push(newId);

            if (source.parents.length > 1) {
                const pId = source.parents[0];
                const existingParent = members.find(x => x.id === pId);
                if (existingParent) {
                    existingParent.spouses.push(newId);
                    newMember.spouses.push(pId);
                    existingParent.children.forEach(chId => {
                        if (!newMember.children.includes(chId)) newMember.children.push(chId);
                        const ch = members.find(x => x.id === chId);
                        if (ch && !ch.parents.includes(newId)) ch.parents.push(newId);
                    });
                }
            }
        }

        members.push(newMember);
        selectedMemberId = newId;
    }

    saveMembersData();
    renderTree();
    updateStatistics();
    
    document.getElementById("sidebar-form-panel").classList.add("hidden");
    selectMember(selectedMemberId);
}

function handleDeleteMember() {
    if (!selectedMemberId) return;
    const m = members.find(x => x.id === selectedMemberId);
    if (!m) return;

    if (confirm(`Bạn có chắc chắn muốn xóa thành viên "${m.name}" khỏi gia phả? (Thao tác này cũng gỡ các liên kết liên quan)`)) {
        members.forEach(other => {
            other.spouses = other.spouses.filter(id => id !== selectedMemberId);
            other.children = other.children.filter(id => id !== selectedMemberId);
            other.parents = other.parents.filter(id => id !== selectedMemberId);
        });

        members = members.filter(x => x.id !== selectedMemberId);
        
        saveMembersData();
        deselectMember();
        renderTree();
        updateStatistics();
    }
}

// -------------------------------------------------------------
// STATISTICS & UTILS
// -------------------------------------------------------------
function updateStatistics() {
    document.getElementById("qs-total").textContent = members.length;
    
    const { nodes } = calculateLayout();
    const gens = Object.values(nodes).map(n => n.generation);
    const maxGen = gens.length > 0 ? Math.max(...gens) + 1 : 0;
    document.getElementById("qs-generations").textContent = maxGen;
}

function openStatsModal() {
    const modal = document.getElementById("stats-modal");
    modal.classList.remove("hidden");

    const total = members.length;
    document.getElementById("stat-total-members").textContent = total;

    const males = members.filter(m => m.gender === "Nam").length;
    const females = total - males;
    document.getElementById("stat-male-ratio").textContent = males;
    document.getElementById("stat-female-ratio").textContent = females;

    let ageSum = 0;
    let ageCount = 0;
    const currentYear = new Date().getFullYear();

    members.forEach(m => {
        const birthYear = m.birthDate ? parseInt(m.birthDate.split("/").pop()) : null;
        if (birthYear && !isNaN(birthYear)) {
            if (m.isDeceased) {
                const deathYear = m.deathDate ? parseInt(m.deathDate.split("/").pop()) : null;
                if (deathYear && !isNaN(deathYear)) {
                    ageSum += (deathYear - birthYear);
                    ageCount++;
                }
            } else {
                ageSum += (currentYear - birthYear);
                ageCount++;
            }
        }
    });

    const avgAge = ageCount > 0 ? Math.round(ageSum / ageCount) : 0;
    document.getElementById("stat-avg-age").textContent = `${avgAge} tuổi`;

    const { nodes } = calculateLayout();
    const gens = Object.values(nodes).map(n => n.generation);
    const maxGen = gens.length > 0 ? Math.max(...gens) + 1 : 0;
    document.getElementById("stat-max-generations").textContent = maxGen;

    const oldestList = document.getElementById("stats-oldest-list");
    oldestList.innerHTML = "";

    const sortedByAge = [...members].map(m => {
        const birthYear = m.birthDate ? parseInt(m.birthDate.split("/").pop()) : null;
        let age = 0;
        if (birthYear && !isNaN(birthYear)) {
            if (m.isDeceased) {
                const deathYear = m.deathDate ? parseInt(m.deathDate.split("/").pop()) : null;
                if (deathYear && !isNaN(deathYear)) age = deathYear - birthYear;
            } else {
                age = currentYear - birthYear;
            }
        }
        return { name: m.name, age, isDeceased: m.isDeceased };
    }).filter(x => x.age > 0).sort((a,b) => b.age - a.age).slice(0, 5);

    sortedByAge.forEach(x => {
        const li = document.createElement("li");
        li.className = "stats-list-item";
        li.innerHTML = `<span>${x.name}</span> <span>${x.age} tuổi ${x.isDeceased ? "(Đã mất)" : "(Còn sống)"}</span>`;
        oldestList.appendChild(li);
    });

    if (sortedByAge.length === 0) {
        oldestList.innerHTML = `<li class="stats-list-item">Không đủ dữ liệu năm sinh</li>`;
    }

    const genCounts = {};
    Object.values(nodes).forEach(n => {
        const genNum = n.generation + 1;
        genCounts[genNum] = (genCounts[genNum] || 0) + 1;
    });

    const genChart = document.getElementById("generation-bar-chart");
    genChart.innerHTML = "";
    const maxCount = Math.max(...Object.values(genCounts), 1);

    for (let i = 1; i <= maxGen; i++) {
        const count = genCounts[i] || 0;
        const percentage = (count / maxCount) * 100;
        
        const row = document.createElement("div");
        row.className = "chart-bar-row";
        row.innerHTML = `
            <span class="chart-label">Thế hệ ${i}</span>
            <div class="chart-bar-container">
                <div class="chart-bar-fill" style="width: ${percentage}%"></div>
            </div>
            <span class="chart-value">${count}</span>
        `;
        genChart.appendChild(row);
    }
}

function closeStatsModal() {
    document.getElementById("stats-modal").classList.add("hidden");
}

// -------------------------------------------------------------
// IMPORT & EXPORT
// -------------------------------------------------------------
function exportToJson() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(members, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `giapha_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

function importFromJson(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            const imported = JSON.parse(evt.target.result);
            if (Array.isArray(imported) && imported.length > 0 && imported[0].id && imported[0].name) {
                members = imported;
                // Add default empty fields if they do not exist
                members.forEach(m => {
                    if (!m.video) m.video = "";
                });
                collapsedNodes.clear();
                saveMembersData();
                renderTree();
                updateStatistics();
                deselectMember();
                fitTreeToScreen();
                alert("Nhập dữ liệu thành công!");
            } else {
                alert("Định dạng file JSON không hợp lệ.");
            }
        } catch (err) {
            alert("Lỗi khi đọc file JSON: " + err.message);
        }
    };
    reader.readAsText(file);
}
