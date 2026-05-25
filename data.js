const TEAMS = {
    // Group A
    'MEX': { id: 'MEX', name: 'เม็กซิโก', flag: '🇲🇽' },
    'A2': { id: 'A2', name: 'เกาหลีใต้', flag: '🇰🇷' },
    'A3': { id: 'A3', name: 'แอฟริกาใต้', flag: '🇿🇦' },
    'A4': { id: 'A4', name: 'สาธารณรัฐเช็ก', flag: '🇨🇿' },
    // Group B
    'CAN': { id: 'CAN', name: 'แคนาดา', flag: '🇨🇦' },
    'B2': { id: 'B2', name: 'บอสเนียและเฮอร์เซโกวีนา', flag: '🇧🇦' },
    'B3': { id: 'B3', name: 'กาตาร์', flag: '🇶🇦' },
    'B4': { id: 'B4', name: 'สวิตเซอร์แลนด์', flag: '🇨🇭' },
    // Group C
    'C1': { id: 'C1', name: 'บราซิล', flag: '🇧🇷' },
    'C2': { id: 'C2', name: 'โมร็อกโก', flag: '🇲🇦' },
    'C3': { id: 'C3', name: 'เฮติ', flag: '🇭🇹' },
    'C4': { id: 'C4', name: 'สกอตแลนด์', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
    // Group D
    'USA': { id: 'USA', name: 'สหรัฐอเมริกา', flag: '🇺🇸' },
    'D2': { id: 'D2', name: 'ปารากวัย', flag: '🇵🇾' },
    'D3': { id: 'D3', name: 'ออสเตรเลีย', flag: '🇦🇺' },
    'D4': { id: 'D4', name: 'ตุรกี', flag: '🇹🇷' },
    // Group E
    'E1': { id: 'E1', name: 'เยอรมนี', flag: '🇩🇪' },
    'E2': { id: 'E2', name: 'คูราเซา', flag: '🇨🇼' },
    'E3': { id: 'E3', name: 'ไอวอรี่โคสต์', flag: '🇨🇮' },
    'E4': { id: 'E4', name: 'เอกวาดอร์', flag: '🇪🇨' },
    // Group F
    'F1': { id: 'F1', name: 'เนเธอร์แลนด์', flag: '🇳🇱' },
    'F2': { id: 'F2', name: 'ญี่ปุ่น', flag: '🇯🇵' },
    'F3': { id: 'F3', name: 'สวีเดน', flag: '🇸🇪' },
    'F4': { id: 'F4', name: 'ตูนิเซีย', flag: '🇹🇳' },
    // Group G
    'G1': { id: 'G1', name: 'เบลเยียม', flag: '🇧🇪' },
    'G2': { id: 'G2', name: 'อียิปต์', flag: '🇪🇬' },
    'G3': { id: 'G3', name: 'อิหร่าน', flag: '🇮🇷' },
    'G4': { id: 'G4', name: 'นิวซีแลนด์', flag: '🇳🇿' },
    // Group H
    'H1': { id: 'H1', name: 'สเปน', flag: '🇪🇸' },
    'H2': { id: 'H2', name: 'เคปเวิร์ด', flag: '🇨🇻' },
    'H3': { id: 'H3', name: 'ซาอุดีอาระเบีย', flag: '🇸🇦' },
    'H4': { id: 'H4', name: 'อุรุกวัย', flag: '🇺🇾' },
    // Group I
    'I1': { id: 'I1', name: 'ฝรั่งเศส', flag: '🇫🇷' },
    'I2': { id: 'I2', name: 'เซเนกัล', flag: '🇸🇳' },
    'I3': { id: 'I3', name: 'อิรัก', flag: '🇮🇶' },
    'I4': { id: 'I4', name: 'นอร์เวย์', flag: '🇳🇴' },
    // Group J
    'J1': { id: 'J1', name: 'อาร์เจนตินา', flag: '🇦🇷' },
    'J2': { id: 'J2', name: 'แอลจีเรีย', flag: '🇩🇿' },
    'J3': { id: 'J3', name: 'ออสเตรีย', flag: '🇦🇹' },
    'J4': { id: 'J4', name: 'จอร์แดน', flag: '🇯🇴' },
    // Group K
    'K1': { id: 'K1', name: 'โปรตุเกส', flag: '🇵🇹' },
    'K2': { id: 'K2', name: 'ดีอาร์ คองโก', flag: '🇨🇩' },
    'K3': { id: 'K3', name: 'อุซเบกิสถาน', flag: '🇺🇿' },
    'K4': { id: 'K4', name: 'โคลอมเบีย', flag: '🇨🇴' },
    // Group L
    'L1': { id: 'L1', name: 'อังกฤษ', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    'L2': { id: 'L2', name: 'โครเอเชีย', flag: '🇭🇷' },
    'L3': { id: 'L3', name: 'กานา', flag: '🇬🇭' },
    'L4': { id: 'L4', name: 'ปานามา', flag: '🇵🇦' },
};

const GROUPS = {
    'A': ['MEX', 'A2', 'A3', 'A4'],
    'B': ['CAN', 'B2', 'B3', 'B4'],
    'C': ['C1', 'C2', 'C3', 'C4'],
    'D': ['USA', 'D2', 'D3', 'D4'],
    'E': ['E1', 'E2', 'E3', 'E4'],
    'F': ['F1', 'F2', 'F3', 'F4'],
    'G': ['G1', 'G2', 'G3', 'G4'],
    'H': ['H1', 'H2', 'H3', 'H4'],
    'I': ['I1', 'I2', 'I3', 'I4'],
    'J': ['J1', 'J2', 'J3', 'J4'],
    'K': ['K1', 'K2', 'K3', 'K4'],
    'L': ['L1', 'L2', 'L3', 'L4'],
};

// Simplified Match List for Group Stage (6 matches per group)
const MATCHES = [];
Object.keys(GROUPS).forEach(groupId => {
    const teams = GROUPS[groupId];
    const groupMatches = [
        { h: teams[0], a: teams[1], d: '11 มิ.ย.', t: '02:00' },
        { h: teams[2], a: teams[3], d: '11 มิ.ย.', t: '09:00' },
        { h: teams[0], a: teams[2], d: '18 มิ.ย.', t: '01:00' },
        { h: teams[1], a: teams[3], d: '18 มิ.ย.', t: '08:00' },
        { h: teams[3], a: teams[0], d: '24 มิ.ย.', t: '08:00' },
        { h: teams[2], a: teams[1], d: '24 มิ.ย.', t: '08:00' },
    ];
    groupMatches.forEach((m, i) => {
        MATCHES.push({
            id: MATCHES.length + 1,
            group: groupId,
            home: m.h,
            away: m.a,
            date: m.d,
            time: m.t
        });
    });
});

// Knockout mapping (simplified prediction)
const KNOCKOUT_SLOTS = [
    { id: 73, name: 'Round of 32', home: 'W_A', away: '3rd_C/E/F/H/I' },
    { id: 74, name: 'Round of 32', home: 'W_B', away: '3rd_A/C/D/F/G' },
    { id: 75, name: 'Round of 32', home: 'RU_A', away: 'RU_B' },
    { id: 76, name: 'Round of 32', home: 'W_C', away: '3rd_A/B/D/E/G' },
    { id: 77, name: 'Round of 32', home: 'W_D', away: '3rd_B/E/F/G/H' },
    { id: 78, name: 'Round of 32', home: 'RU_C', away: 'RU_D' },
    { id: 79, name: 'Round of 32', home: 'W_E', away: '3rd_A/B/C/D/F' },
    { id: 80, name: 'Round of 32', home: 'W_F', away: '3rd_A/B/C/D/E' },
    { id: 81, name: 'Round of 32', home: 'RU_E', away: 'RU_F' },
    { id: 82, name: 'Round of 32', home: 'W_G', away: '3rd_A/B/C/D/E' },
    { id: 83, name: 'Round of 32', home: 'W_H', away: 'RU_J' },
    { id: 84, name: 'Round of 32', home: 'RU_G', away: 'RU_H' },
    { id: 85, name: 'Round of 32', home: 'W_I', away: '3rd_C/D/E/F/G' },
    { id: 86, name: 'Round of 32', home: 'W_J', away: '3rd_B/C/D/E/F' },
    { id: 87, name: 'Round of 32', home: 'RU_I', away: 'RU_K' },
    { id: 88, name: 'Round of 32', home: 'W_K', away: 'RU_L' },
    // Round of 16
    { id: 89, name: 'Round of 16', home: 'W_73', away: 'W_75' },
    { id: 90, name: 'Round of 16', home: 'W_74', away: 'W_76' },
    { id: 91, name: 'Round of 16', home: 'W_77', away: 'W_78' },
    { id: 92, name: 'Round of 16', home: 'W_79', away: 'W_80' },
    { id: 93, name: 'Round of 16', home: 'W_81', away: 'W_82' },
    { id: 94, name: 'Round of 16', home: 'W_83', away: 'W_84' },
    { id: 95, name: 'Round of 16', home: 'W_85', away: 'W_86' },
    { id: 96, name: 'Round of 16', home: 'W_87', away: 'W_88' },
    // Quarter-finals
    { id: 97, name: 'Quarter-final', home: 'W_89', away: 'W_90' },
    { id: 98, name: 'Quarter-final', home: 'W_91', away: 'W_92' },
    { id: 99, name: 'Quarter-final', home: 'W_93', away: 'W_94' },
    { id: 100, name: 'Quarter-final', home: 'W_95', away: 'W_96' },
    // Semi-finals
    { id: 101, name: 'Semi-final', home: 'W_97', away: 'W_98' },
    { id: 102, name: 'Semi-final', home: 'W_99', away: 'W_100' },
    // Final
    { id: 103, name: 'Third place', home: 'L_101', away: 'L_102' },
    { id: 104, name: 'Final', home: 'W_101', away: 'W_102' },
];
