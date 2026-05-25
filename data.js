const TEAMS = {
    // Group A
    'MEX': { id: 'MEX', name: 'เม็กซิโก', iso: 'mx' },
    'A2': { id: 'A2', name: 'เกาหลีใต้', iso: 'kr' },
    'A3': { id: 'A3', name: 'แอฟริกาใต้', iso: 'za' },
    'A4': { id: 'A4', name: 'สาธารณรัฐเช็ก', iso: 'cz' },
    // Group B
    'CAN': { id: 'CAN', name: 'แคนาดา', iso: 'ca' },
    'B2': { id: 'B2', name: 'บอสเนียและเฮอร์เซโกวีนา', iso: 'ba' },
    'B3': { id: 'B3', name: 'กาตาร์', iso: 'qa' },
    'B4': { id: 'B4', name: 'สวิตเซอร์แลนด์', iso: 'ch' },
    // Group C
    'C1': { id: 'C1', name: 'บราซิล', iso: 'br' },
    'C2': { id: 'C2', name: 'โมร็อกโก', iso: 'ma' },
    'C3': { id: 'C3', name: 'เฮติ', iso: 'ht' },
    'C4': { id: 'C4', name: 'สกอตแลนด์', iso: 'gb-sct' },
    // Group D
    'USA': { id: 'USA', name: 'สหรัฐอเมริกา', iso: 'us' },
    'D2': { id: 'D2', name: 'ปารากวัย', iso: 'py' },
    'D3': { id: 'D3', name: 'ออสเตรเลีย', iso: 'au' },
    'D4': { id: 'D4', name: 'ตุรกี', iso: 'tr' },
    // Group E
    'E1': { id: 'E1', name: 'เยอรมนี', iso: 'de' },
    'E2': { id: 'E2', name: 'คูราเซา', iso: 'cw' },
    'E3': { id: 'E3', name: 'ไอวอรี่โคสต์', iso: 'ci' },
    'E4': { id: 'E4', name: 'เอกวาดอร์', iso: 'ec' },
    // Group F
    'F1': { id: 'F1', name: 'เนเธอร์แลนด์', iso: 'nl' },
    'F2': { id: 'F2', name: 'ญี่ปุ่น', iso: 'jp' },
    'F3': { id: 'F3', name: 'สวีเดน', iso: 'se' },
    'F4': { id: 'F4', name: 'ตูนิเซีย', iso: 'tn' },
    // Group G
    'G1': { id: 'G1', name: 'เบลเยียม', iso: 'be' },
    'G2': { id: 'G2', name: 'อียิปต์', iso: 'eg' },
    'G3': { id: 'G3', name: 'อิหร่าน', iso: 'ir' },
    'G4': { id: 'G4', name: 'นิวซีแลนด์', iso: 'nz' },
    // Group H
    'H1': { id: 'H1', name: 'สเปน', iso: 'es' },
    'H2': { id: 'H2', name: 'เคปเวิร์ด', iso: 'cv' },
    'H3': { id: 'H3', name: 'ซาอุดีอาระเบีย', iso: 'sa' },
    'H4': { id: 'H4', name: 'อุรุกวัย', iso: 'uy' },
    // Group I
    'I1': { id: 'I1', name: 'ฝรั่งเศส', iso: 'fr' },
    'I2': { id: 'I2', name: 'เซเนกัล', iso: 'sn' },
    'I3': { id: 'I3', name: 'อิรัก', iso: 'iq' },
    'I4': { id: 'I4', name: 'นอร์เวย์', iso: 'no' },
    // Group J
    'J1': { id: 'J1', name: 'อาร์เจนตินา', iso: 'ar' },
    'J2': { id: 'J2', name: 'แอลจีเรีย', iso: 'dz' },
    'J3': { id: 'J3', name: 'ออสเตรีย', iso: 'at' },
    'J4': { id: 'J4', name: 'จอร์แดน', iso: 'jo' },
    // Group K
    'K1': { id: 'K1', name: 'โปรตุเกส', iso: 'pt' },
    'K2': { id: 'K2', name: 'ดีอาร์ คองโก', iso: 'cd' },
    'K3': { id: 'K3', name: 'อุซเบกิสถาน', iso: 'uz' },
    'K4': { id: 'K4', name: 'โคลอมเบีย', iso: 'co' },
    // Group L
    'L1': { id: 'L1', name: 'อังกฤษ', iso: 'gb-eng' },
    'L2': { id: 'L2', name: 'โครเอเชีย', iso: 'hr' },
    'L3': { id: 'L3', name: 'กานา', iso: 'gh' },
    'L4': { id: 'L4', name: 'ปานามา', iso: 'pa' },
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

// Knockout mapping (Based on Official FIFA 2026 Schedule)
const KNOCKOUT_SLOTS = [
    { id: 73, name: 'Round of 32', home: 'RU_A', away: 'RU_B' },
    { id: 74, name: 'Round of 32', home: 'W_E', away: 'T1' }, // 3rd A/B/C/D/F
    { id: 75, name: 'Round of 32', home: 'W_F', away: 'RU_C' },
    { id: 76, name: 'Round of 32', home: 'W_C', away: 'RU_F' },
    { id: 77, name: 'Round of 32', home: 'W_I', away: 'T2' }, // 3rd C/D/F/G/H
    { id: 78, name: 'Round of 32', home: 'RU_E', away: 'RU_I' },
    { id: 79, name: 'Round of 32', home: 'W_A', away: 'T3' }, // 3rd C/E/F/H/I
    { id: 80, name: 'Round of 32', home: 'W_L', away: 'T4' }, // 3rd E/H/I/J/K
    { id: 81, name: 'Round of 32', home: 'W_D', away: 'T5' }, // 3rd B/E/F/I/J
    { id: 82, name: 'Round of 32', home: 'W_G', away: 'T6' }, // 3rd A/E/H/I/J
    { id: 83, name: 'Round of 32', home: 'RU_K', away: 'RU_L' },
    { id: 84, name: 'Round of 32', home: 'W_H', away: 'RU_J' },
    { id: 85, name: 'Round of 32', home: 'W_B', away: 'T7' }, // 3rd E/F/G/I/J
    { id: 86, name: 'Round of 32', home: 'W_J', away: 'RU_H' },
    { id: 87, name: 'Round of 32', home: 'W_K', away: 'T8' }, // 3rd D/E/I/J/L
    { id: 88, name: 'Round of 32', home: 'RU_D', away: 'RU_G' },
    // Round of 16
    { id: 89, name: 'Round of 16', home: 'W_74', away: 'W_77' },
    { id: 90, name: 'Round of 16', home: 'W_73', away: 'W_75' },
    { id: 91, name: 'Round of 16', home: 'W_76', away: 'W_78' },
    { id: 92, name: 'Round of 16', home: 'W_79', away: 'W_80' },
    { id: 93, name: 'Round of 16', home: 'W_83', away: 'W_84' },
    { id: 94, name: 'Round of 16', home: 'W_81', away: 'W_82' },
    { id: 95, name: 'Round of 16', home: 'W_86', away: 'W_88' },
    { id: 96, name: 'Round of 16', home: 'W_85', away: 'W_87' },
    // Quarter-finals
    { id: 97, name: 'Quarter-final', home: 'W_89', away: 'W_90' },
    { id: 98, name: 'Quarter-final', home: 'W_93', away: 'W_94' },
    { id: 99, name: 'Quarter-final', home: 'W_91', away: 'W_92' },
    { id: 100, name: 'Quarter-final', home: 'W_95', away: 'W_96' },
    // Semi-finals
    { id: 101, name: 'Semi-final', home: 'W_97', away: 'W_98' },
    { id: 102, name: 'Semi-final', home: 'W_99', away: 'W_100' },
    // Final
    { id: 103, name: 'Third place', home: 'L_101', away: 'L_102' },
    { id: 104, name: 'Final', home: 'W_101', away: 'W_102' },
];

const THIRD_PLACE_MAP = {
    'T1': ['A', 'B', 'C', 'D', 'F'],
    'T2': ['C', 'D', 'F', 'G', 'H'],
    'T3': ['C', 'E', 'F', 'H', 'I'],
    'T4': ['E', 'H', 'I', 'J', 'K'],
    'T5': ['B', 'E', 'F', 'I', 'J'],
    'T6': ['A', 'E', 'H', 'I', 'J'],
    'T7': ['E', 'F', 'G', 'I', 'J'],
    'T8': ['D', 'E', 'I', 'J', 'L']
};
