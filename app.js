let matchScores = JSON.parse(localStorage.getItem('wc2026_scores')) || {};

function init() {
    renderMatches();
    calculateAll();
}

function renderMatches() {
    const container = document.getElementById('matches-container');
    container.innerHTML = '';

    let currentGroup = '';
    MATCHES.forEach(match => {
        if (match.group !== currentGroup) {
            currentGroup = match.group;
            const groupHeader = document.createElement('div');
            groupHeader.className = 'bg-gray-800 text-white p-2 mt-4 mb-2 font-bold sticky top-0';
            groupHeader.innerText = `สาย ${currentGroup}`;
            container.appendChild(groupHeader);
        }

        const matchEl = document.createElement('div');
        matchEl.className = 'match-card';

        const homeScore = matchScores[match.id]?.home ?? '';
        const awayScore = matchScores[match.id]?.away ?? '';

        matchEl.innerHTML = `
            <div class="text-[10px] uppercase tracking-wider text-slate-400 mb-2 flex justify-between font-bold">
                <span>${new Date(match.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })} • ${match.time}</span>
                <span>#${match.id}</span>
            </div>
            <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-2 flex-1 min-w-0">
                    <span class="text-2xl shadow-sm rounded-sm">${TEAMS[match.home].flag}</span>
                    <span class="truncate text-sm font-semibold text-slate-700">${TEAMS[match.home].name}</span>
                </div>
                <div class="flex items-center gap-1.5">
                    <input type="number" min="0" class="score-input" value="${homeScore}" oninput="updateScore(${match.id}, 'home', this.value)">
                    <span class="text-slate-300 font-bold">:</span>
                    <input type="number" min="0" class="score-input" value="${awayScore}" oninput="updateScore(${match.id}, 'away', this.value)">
                </div>
                <div class="flex items-center gap-2 flex-1 justify-end min-w-0">
                    <span class="truncate text-sm font-semibold text-slate-700 text-right">${TEAMS[match.away].name}</span>
                    <span class="text-2xl shadow-sm rounded-sm">${TEAMS[match.away].flag}</span>
                </div>
            </div>
        `;
        container.appendChild(matchEl);
    });
}

function updateScore(matchId, side, value) {
    if (!matchScores[matchId]) matchScores[matchId] = {};
    matchScores[matchId][side] = value === '' ? null : parseInt(value);
    localStorage.setItem('wc2026_scores', JSON.stringify(matchScores));
    calculateAll();
}

function calculateAll() {
    const groupStandings = calculateGroups();
    const bestThirds = calculateBestThirds(groupStandings);
    renderGroups(groupStandings);
    renderThirdPlace(bestThirds);
    calculateKnockout(groupStandings, bestThirds);
}

function calculateGroups() {
    const standings = {};

    // Initialize
    Object.keys(GROUPS).forEach(groupId => {
        standings[groupId] = GROUPS[groupId].map(teamId => ({
            id: teamId,
            pld: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0
        }));
    });

    // Process matches
    MATCHES.forEach(match => {
        const score = matchScores[match.id];
        if (score && score.home !== null && score.away !== null) {
            const group = standings[match.group];
            const homeTeam = group.find(t => t.id === match.home);
            const awayTeam = group.find(t => t.id === match.away);

            homeTeam.pld++;
            awayTeam.pld++;
            homeTeam.gf += score.home;
            homeTeam.ga += score.away;
            awayTeam.gf += score.away;
            awayTeam.ga += score.home;

            if (score.home > score.away) {
                homeTeam.w++;
                homeTeam.pts += 3;
                awayTeam.l++;
            } else if (score.home < score.away) {
                awayTeam.w++;
                awayTeam.pts += 3;
                homeTeam.l++;
            } else {
                homeTeam.d++;
                awayTeam.d++;
                homeTeam.pts += 1;
                awayTeam.pts += 1;
            }
        }
    });

    // Sort each group
    Object.keys(standings).forEach(groupId => {
        standings[groupId].forEach(t => t.gd = t.gf - t.ga);
        standings[groupId].sort((a, b) => {
            if (b.pts !== a.pts) return b.pts - a.pts;
            if (b.gd !== a.gd) return b.gd - a.gd;
            if (b.gf !== a.gf) return b.gf - a.gf;
            return 0; // H2H simplified for now
        });
    });

    return standings;
}

function renderGroups(standings) {
    const container = document.getElementById('groups-container');
    container.innerHTML = '';

    Object.keys(standings).forEach(groupId => {
        const groupWrapper = document.createElement('div');
        groupWrapper.className = 'bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden';

        let tableHtml = `
            <table class="group-table">
                <thead>
                    <tr>
                        <th colspan="2" class="text-left px-3 py-2 bg-slate-800 font-bold uppercase tracking-wider">สาย ${groupId}</th>
                        <th class="w-10">แข่ง</th>
                        <th class="w-10">ชนะ</th>
                        <th class="w-10 text-slate-400">เสมอ</th>
                        <th class="w-10 text-slate-400">แพ้</th>
                        <th class="w-16">ได้-เสีย</th>
                        <th class="w-12 bg-slate-900">คะแนน</th>
                    </tr>
                </thead>
                <tbody>
        `;

        standings[groupId].forEach((team, index) => {
            const isQualified = index < 2;
            const rowClass = isQualified ? 'bg-blue-50/50' : '';
            tableHtml += `
                <tr class="${rowClass} hover:bg-slate-50 transition-colors">
                    <td class="w-8 text-center font-bold text-slate-400 text-xs">${index + 1}</td>
                    <td class="flex items-center gap-2 px-3 py-2">
                        <span class="text-xl shadow-sm rounded-sm">${TEAMS[team.id].flag}</span>
                        <span class="truncate font-semibold text-slate-700">${TEAMS[team.id].name}</span>
                    </td>
                    <td class="text-center font-medium">${team.pld}</td>
                    <td class="text-center text-emerald-600 font-bold">${team.w}</td>
                    <td class="text-center text-slate-500">${team.d}</td>
                    <td class="text-center text-slate-500">${team.l}</td>
                    <td class="text-center text-slate-600 text-xs font-mono">${team.gf}-${team.ga}</td>
                    <td class="text-center font-black text-slate-900 ${isQualified ? 'text-blue-700' : ''}">${team.pts}</td>
                </tr>
            `;
        });

        tableHtml += `</tbody></table>`;
        groupWrapper.innerHTML = tableHtml;
        container.appendChild(groupWrapper);
    });
}

function calculateBestThirds(standings) {
    const thirds = [];
    Object.keys(standings).forEach(groupId => {
        const team = standings[groupId][2]; // 3rd place
        thirds.push({ ...team, groupId });
    });

    thirds.sort((a, b) => {
        if (b.pts !== a.pts) return b.pts - a.pts;
        if (b.gd !== a.gd) return b.gd - a.gd;
        if (b.gf !== a.gf) return b.gf - a.gf;
        return 0;
    });

    return thirds;
}

function renderThirdPlace(thirds) {
    const container = document.getElementById('third-place-container');
    let tableHtml = `
        <table class="group-table">
            <thead>
                <tr>
                    <th colspan="2" class="text-left px-3 py-2 bg-orange-600 font-bold uppercase tracking-wider">อันดับที่ 3</th>
                    <th class="w-10">สาย</th>
                    <th class="w-10">แข่ง</th>
                    <th class="w-12 bg-orange-700">คะแนน</th>
                    <th class="w-12">GD</th>
                </tr>
            </thead>
            <tbody>
    `;

    thirds.forEach((team, index) => {
        const isQualified = index < 8;
        const rowClass = isQualified ? 'bg-emerald-50/50' : '';
        tableHtml += `
            <tr class="${rowClass} hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0">
                <td class="w-8 text-center font-bold text-slate-400 text-xs">${index + 1}</td>
                <td class="flex items-center gap-2 px-3 py-2">
                    <span class="text-xl shadow-sm rounded-sm">${TEAMS[team.id].flag}</span>
                    <span class="truncate font-semibold text-slate-700">${TEAMS[team.id].name}</span>
                </td>
                <td class="text-center font-bold text-slate-500">${team.groupId}</td>
                <td class="text-center font-medium">${team.pld}</td>
                <td class="text-center font-black text-slate-900 ${isQualified ? 'text-emerald-700' : ''}">${team.pts}</td>
                <td class="text-center font-mono text-xs ${team.gd > 0 ? 'text-emerald-600' : team.gd < 0 ? 'text-rose-600' : 'text-slate-400'}">${team.gd > 0 ? '+' : ''}${team.gd}</td>
            </tr>
        `;
    });

    tableHtml += `</tbody></table>`;
    container.innerHTML = tableHtml;
}

function calculateKnockout(groupStandings, bestThirds) {
    const container = document.getElementById('knockout-container');
    container.innerHTML = '';

    const rounds = {
        'Round of 32': 'รอบ 32 ทีม',
        'Round of 16': 'รอบ 16 ทีม',
        'Quarter-final': 'รอบก่อนรองชนะเลิศ',
        'Semi-final': 'รอบรองชนะเลิศ',
        'Third place': 'นัดชิงอันดับ 3',
        'Final': 'รอบชิงชนะเลิศ'
    };

    const knockoutResults = {}; // Stores results of knockout matches

    Object.entries(rounds).forEach(([roundKey, roundName]) => {
        const roundMatches = KNOCKOUT_SLOTS.filter(m => m.name === roundKey);

        const roundWrapper = document.createElement('div');
        roundWrapper.className = (roundKey === 'Round of 32' || roundKey === 'Round of 16') ? 'md:col-span-1' : 'md:col-span-2';

        roundWrapper.innerHTML = `<h3 class="font-black text-slate-800 text-sm uppercase tracking-widest mb-3 mt-6 flex items-center gap-2">
            <span class="w-1.5 h-4 bg-slate-800 rounded-full"></span>
            ${roundName}
        </h3>`;

        roundMatches.forEach(slot => {
            const matchEl = document.createElement('div');
            matchEl.className = 'bg-white p-3 rounded-xl shadow-sm border border-slate-200 mb-3 hover:border-rose-300 transition-colors';

            const homeTeam = getKnockoutTeam(slot.home, groupStandings, bestThirds, knockoutResults);
            const awayTeam = getKnockoutTeam(slot.away, groupStandings, bestThirds, knockoutResults);

            const score = matchScores[slot.id] || { home: '', away: '' };

            if (score.home !== null && score.away !== null && score.home !== '' && score.away !== '') {
                if (parseInt(score.home) > parseInt(score.away)) {
                    knockoutResults[`W_${slot.id}`] = homeTeam;
                    knockoutResults[`L_${slot.id}`] = awayTeam;
                } else if (parseInt(score.away) > parseInt(score.home)) {
                    knockoutResults[`W_${slot.id}`] = awayTeam;
                    knockoutResults[`L_${slot.id}`] = homeTeam;
                } else {
                    knockoutResults[`W_${slot.id}`] = { name: 'Winner ' + slot.id, flag: '❓' };
                }
            }

            matchEl.innerHTML = `
                <div class="text-[9px] font-bold text-slate-400 uppercase flex justify-between mb-2">
                    <span>${new Date(slot.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })} • ${slot.time}</span>
                    <span class="bg-slate-100 px-1.5 rounded text-slate-500">M${slot.id}</span>
                </div>
                <div class="flex items-center justify-between gap-2">
                    <div class="flex items-center gap-2 flex-1 min-w-0">
                        <span class="text-xl">${homeTeam?.flag || '🏳️'}</span>
                        <span class="truncate text-xs font-bold ${!homeTeam ? 'text-slate-300 italic' : 'text-slate-700'}">${homeTeam?.name || slot.home}</span>
                    </div>
                    <div class="flex items-center gap-1 px-1 bg-slate-50 rounded-lg p-1">
                        <input type="number" min="0" class="score-input !w-8 !h-7 !text-xs" value="${score.home ?? ''}" oninput="updateScore(${slot.id}, 'home', this.value)">
                        <span class="text-slate-300 font-bold">:</span>
                        <input type="number" min="0" class="score-input !w-8 !h-7 !text-xs" value="${score.away ?? ''}" oninput="updateScore(${slot.id}, 'away', this.value)">
                    </div>
                    <div class="flex items-center gap-2 flex-1 min-w-0 justify-end">
                        <span class="truncate text-xs font-bold text-right ${!awayTeam ? 'text-slate-300 italic' : 'text-slate-700'}">${awayTeam?.name || slot.away}</span>
                        <span class="text-xl">${awayTeam?.flag || '🏳️'}</span>
                    </div>
                </div>
            `;
            roundWrapper.appendChild(matchEl);
        });
        container.appendChild(roundWrapper);
    });
}

function getKnockoutTeam(placeholder, groupStandings, bestThirds, knockoutResults) {
    if (!placeholder) return null;

    if (placeholder.startsWith('W_')) {
        const id = placeholder.substring(2);
        if (id.length <= 1) { // Group Winner
            const group = groupStandings[id];
            const team = group[0];
            if (team.pld === 0) return { name: `ที่ 1 กลุ่ม ${id}`, flag: '🏆' };
            return TEAMS[team.id];
        }
        return knockoutResults[placeholder] || { name: `ผู้ชนะ M${id}`, flag: '⚽' };
    }
    if (placeholder.startsWith('RU_')) {
        const id = placeholder.substring(3);
        const group = groupStandings[id];
        const team = group[1];
        if (team.pld === 0) return { name: `ที่ 2 กลุ่ม ${id}`, flag: '🥈' };
        return TEAMS[team.id];
    }
    if (placeholder.startsWith('3rd_')) {
        const code = placeholder.substring(4);
        const qualifiedThirds = bestThirds.filter(t => t.pld > 0).slice(0, 8);

        // Find a team from allowed groups that isn't already assigned
        // This is still a heuristic but better than index mapping
        const allowedGroups = code.split('');
        const team = qualifiedThirds.find(t => allowedGroups.includes(t.groupId) && !Object.values(knockoutResults).includes(TEAMS[t.id]));

        if (team) return TEAMS[team.id];
        return { name: `ที่ 3 (${code})`, flag: '🥉' };
    }
    if (placeholder.startsWith('L_')) {
        const id = placeholder.substring(2);
        return knockoutResults[placeholder] || { name: `ผู้แพ้ M${id}`, flag: '🏳️' };
    }
    return null;
}

function resetScores() {
    if (confirm('คุณต้องการล้างข้อมูลคะแนนทั้งหมดใช่หรือไม่?')) {
        matchScores = {};
        localStorage.removeItem('wc2026_scores');
        renderMatches();
        calculateAll();
    }
}

document.addEventListener('DOMContentLoaded', init);
