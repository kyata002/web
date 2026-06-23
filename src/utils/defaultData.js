export const defaultMembers = [
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

export const avatarTemplates = {
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

export function getAvatarDataUrl(avatarId, name, gender) {
    if (avatarId && avatarTemplates[avatarId]) {
        return `data:image/svg+xml;utf8,${encodeURIComponent(avatarTemplates[avatarId])}`;
    }
    
    // Generate simple initials avatar if not found
    const initials = name ? name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() : "?";
    const bgColor = gender === "Nam" ? "#0284C7" : "#DB2777";
    const svg = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="50" fill="${bgColor}"/>
            <text x="50" y="55" font-family="'Outfit', sans-serif" font-size="36" font-weight="bold" fill="white" text-anchor="middle" dominant-baseline="middle">${initials}</text>
        </svg>
    `;
    return `data:image/svg+xml;utf8,${encodeURIComponent(svg.trim())}`;
}
