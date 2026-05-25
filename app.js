let scores = JSON.parse(localStorage.getItem('wc2026_scores')) || {};

function init() {
    renderMatches();
    calculateAll();
}

function getFlagUrl(iso) {
    if (!iso) return '';
    return `https://flagcdn.com/w40/${iso.toLowerCase()}.png`;
}

function renderMatches() {
    const container = document.getElementById('matches-container');
    container.innerHTML = '';

    let currentGroup = '';
    MATCHES.forEach(match => {
        if (match.group !== currentGroup) {
            currentGroup = match.group;
            const header = document.createElement('div');
            header.className = 'bg-[#1E293B] text-white px-3 py-2 rounded-t-lg font-bold text-sm mb-2';
            header.innerText = `สาย ${currentGroup}`;
            container.appendChild(header);
        }

        const card = document.createElement('div');
        card.className = 'match-card';
        const hScore = scores[match.id]?.h ?? '';
        const aScore = scores[match.id]?.a ?? '';

        const homeTeam = TEAMS[match.home];
        const awayTeam = TEAMS[match.away];

        card.innerHTML = `
            <div class="text-[10px] text-slate-400 font-bold mb-1.5 flex justify-between">
                <span>${match.date} • ${match.time}</span>
                <span>#${match.id}</span>
            </div>
            <div class="flex items-center justify-between gap-2">
                <div class="flex-1 flex items-center gap-2 min-w-0">
                    <img src="${getFlagUrl(homeTeam.iso)}" class="w-6 h-4 object-cover shadow-sm rounded-sm" alt="">
                    <span class="truncate text-xs font-bold text-slate-800">${homeTeam.name}</span>
                </div>
                <div class="flex items-center gap-1">
                    <input type="number" id="m${match.id}-h" min="0" value="${hScore}" oninput="updateScore(${match.id}, 'h', this.value)" class="score-input">
                    <span class="font-bold text-slate-300 text-xs">:</span>
                    <input type="number" id="m${match.id}-a" min="0" value="${aScore}" oninput="updateScore(${match.id}, 'a', this.value)" class="score-input">
                </div>
                <div class="flex-1 flex items-center gap-2 justify-end min-w-0 text-right">
                    <span class="truncate text-xs font-bold text-slate-800">${awayTeam.name}</span>
                    <img src="${getFlagUrl(awayTeam.iso)}" class="w-6 h-4 object-cover shadow-sm rounded-sm" alt="">
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function updateScore(matchId, side, val) {
    if (!scores[matchId]) scores[matchId] = {};
    scores[matchId][side] = val === '' ? null : parseInt(val);
    localStorage.setItem('wc2026_scores', JSON.stringify(scores));
    calculateAll();
}

function calculateAll() {
    const groupStandings = calculateStandings();
    renderStandings(groupStandings);

    const bestThirds = calculateBestThirds(groupStandings);
    renderBestThirds(bestThirds);

    const thirdPlaceAssignments = assignThirdPlaces(bestThirds);

    renderKnockout(groupStandings, bestThirds, thirdPlaceAssignments);
}

function assignThirdPlaces(bestThirds) {
    const qualified = bestThirds.filter(t => t.p > 0).slice(0, 8);
    const assignments = {};
    const usedTid = new Set();
    const slots = Object.keys(THIRD_PLACE_MAP);

    function findMatching(slotIdx) {
        if (slotIdx === slots.length) return true;
        const slot = slots[slotIdx];
        const allowedGroups = THIRD_PLACE_MAP[slot];

        for (let i = 0; i < qualified.length; i++) {
            const team = qualified[i];
            if (!usedTid.has(team.id) && allowedGroups.includes(team.gid)) {
                assignments[slot] = TEAMS[team.id];
                usedTid.add(team.id);
                if (findMatching(slotIdx + 1)) return true;
                usedTid.delete(team.id);
            }
        }
        // If we can't find a match for this slot among qualified teams,
        // continue to next slot (it will remain a placeholder)
        if (findMatching(slotIdx + 1)) return true;
        return false;
    }

    findMatching(0);
    return assignments;
}

function calculateStandings() {
    const standings = {};
    Object.keys(GROUPS).forEach(gid => {
        standings[gid] = GROUPS[gid].map(tid => ({
            id: tid, p: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0
        }));
    });

    MATCHES.forEach(m => {
        const s = scores[m.id];
        if (s && s.h !== null && s.a !== null) {
            const group = standings[m.group];
            const home = group.find(t => t.id === m.home);
            const away = group.find(t => t.id === m.away);

            home.p++; away.p++;
            home.gf += s.h; home.ga += s.a;
            away.gf += s.a; away.ga += s.h;

            if (s.h > s.a) { home.w++; home.pts += 3; away.l++; }
            else if (s.h < s.a) { away.w++; away.pts += 3; home.l++; }
            else { home.d++; away.d++; home.pts += 1; away.pts += 1; }
        }
    });

    Object.keys(standings).forEach(gid => {
        standings[gid].forEach(t => t.gd = t.gf - t.ga);
        standings[gid].sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
    });

    return standings;
}

function renderStandings(standings) {
    const container = document.getElementById('standings-container');
    container.innerHTML = '';

    Object.keys(standings).forEach(gid => {
        const wrap = document.createElement('div');
        wrap.className = 'bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden';

        let html = `
            <table class="w-full group-table">
                <thead>
                    <tr>
                        <th class="text-left px-3 py-2" colspan="2">สาย ${gid}</th>
                        <th class="w-8">แข่ง</th>
                        <th class="w-8">ชนะ</th>
                        <th class="w-8 text-slate-400">เสมอ</th>
                        <th class="w-8 text-slate-400">แพ้</th>
                        <th class="w-12">ได้-เสีย</th>
                        <th class="w-10 bg-black font-bold">คะแนน</th>
                    </tr>
                </thead>
                <tbody>
        `;

        standings[gid].forEach((t, i) => {
            const team = TEAMS[t.id];
            html += `
                <tr class="hover:bg-slate-50 transition-colors">
                    <td class="w-6 text-slate-400 font-bold text-[10px]">${i+1}</td>
                    <td class="flex items-center gap-2 py-1.5 px-1 text-left">
                        <img src="${getFlagUrl(team.iso)}" class="w-5 h-3.5 object-cover shadow-sm rounded-sm" alt="">
                        <span class="font-bold text-slate-800 truncate text-[11px]">${team.name}</span>
                    </td>
                    <td class="font-medium text-slate-700">${t.p}</td>
                    <td class="font-bold text-emerald-600">${t.w}</td>
                    <td class="text-slate-400">${t.d}</td>
                    <td class="text-slate-400">${t.l}</td>
                    <td class="text-[10px] text-slate-500 font-mono">${t.gf}-${t.ga}</td>
                    <td class="font-black text-slate-900 text-[13px]">${t.pts}</td>
                </tr>
            `;
        });

        html += `</tbody></table>`;
        wrap.innerHTML = html;
        container.appendChild(wrap);
    });
}

function calculateBestThirds(standings) {
    const thirds = [];
    Object.keys(standings).forEach(gid => {
        const t = standings[gid][2];
        thirds.push({ ...t, gid });
    });
    thirds.sort((a, b) => b.pts - a.pts || b.gd - a.gd || b.gf - a.gf);
    return thirds;
}

function renderBestThirds(thirds) {
    const container = document.getElementById('best-third-container');
    let html = `
        <table class="w-full group-table">
            <thead>
                <tr>
                    <th class="text-left px-4 py-2 font-bold bg-orange-600" colspan="2">อันดับที่ 3</th>
                    <th class="w-8 bg-orange-600">สาย</th>
                    <th class="w-8 bg-orange-600">แข่ง</th>
                    <th class="w-12 bg-orange-600">GD</th>
                    <th class="w-10 bg-orange-700 font-bold">แต้ม</th>
                </tr>
            </thead>
            <tbody>
    `;
    thirds.forEach((t, i) => {
        const q = i < 8 ? 'bg-emerald-50/50' : '';
        const team = TEAMS[t.id];
        html += `
            <tr class="${q}">
                <td class="w-6 text-center text-slate-400 font-bold text-xs">${i+1}</td>
                <td class="flex items-center gap-2 py-2">
                    <img src="${getFlagUrl(team.iso)}" class="w-6 h-4 object-cover shadow-sm rounded-sm" alt="">
                    <span class="font-semibold text-slate-700 truncate">${team.name}</span>
                </td>
                <td class="text-center font-bold text-slate-500">${t.gid}</td>
                <td class="text-center">${t.p}</td>
                <td class="text-center font-mono text-xs">${t.gd > 0 ? '+' : ''}${t.gd}</td>
                <td class="text-center font-black text-slate-900 ${i<8 ? 'text-emerald-700' : ''}">${t.pts}</td>
            </tr>
        `;
    });
    html += `</tbody></table>`;
    container.innerHTML = html;
}

function renderKnockout(standings, bestThirds, thirdPlaceAssignments) {
    const container = document.getElementById('knockout-container');
    container.innerHTML = '';

    const rounds = ['Round of 32', 'Round of 16', 'Quarter-final', 'Semi-final', 'Final'];
    const roundLabels = {
        'Round of 32': 'รอบ 32 ทีม',
        'Round of 16': 'รอบ 16 ทีม',
        'Quarter-final': 'รอบ 8 ทีม',
        'Semi-final': 'รอบรองชนะเลิศ',
        'Final': 'นัดชิงชนะเลิศ / ชิงอันดับ 3'
    };

    const knockoutResults = {};

    rounds.forEach(round => {
        const roundWrap = document.createElement('div');
        roundWrap.className = 'mb-8';
        roundWrap.innerHTML = `<h3 class="font-bold text-slate-800 mb-3 text-xs uppercase tracking-widest flex items-center gap-2">
            <span class="w-1 h-4 bg-slate-800 rounded-full"></span>
            ${roundLabels[round]}
        </h3>`;

        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2';

        const roundMatches = KNOCKOUT_SLOTS.filter(s => s.name === round || (round === 'Final' && s.name === 'Third place'));

        roundMatches.forEach(slot => {
            const home = resolveTeam(slot.home, standings, bestThirds, knockoutResults, thirdPlaceAssignments);
            const away = resolveTeam(slot.away, standings, bestThirds, knockoutResults, thirdPlaceAssignments);

            const card = document.createElement('div');
            card.className = 'match-card hover:border-rose-300 transition-colors cursor-default';

            const s = scores[slot.id] || { h: '', a: '', winner: null };

            // Logic for winner
            if (s.h !== '' && s.a !== '' && s.h !== null && s.a !== null) {
                if (parseInt(s.h) > parseInt(s.a)) {
                    knockoutResults[`W_${slot.id}`] = home;
                    knockoutResults[`L_${slot.id}`] = away;
                } else if (parseInt(s.a) > parseInt(s.h)) {
                    knockoutResults[`W_${slot.id}`] = away;
                    knockoutResults[`L_${slot.id}`] = home;
                } else {
                    // Draw in knockout - need explicit winner
                    if (s.winner === 'h') {
                        knockoutResults[`W_${slot.id}`] = home;
                        knockoutResults[`L_${slot.id}`] = away;
                    } else if (s.winner === 'a') {
                        knockoutResults[`W_${slot.id}`] = away;
                        knockoutResults[`L_${slot.id}`] = home;
                    }
                }
            }

            const isDraw = (s.h !== '' && s.a !== '' && s.h === s.a);
            const winner = s.winner;

            card.innerHTML = `
                <div class="text-[9px] font-bold text-slate-400 uppercase mb-1 flex justify-between">
                    <span>M${slot.id}</span>
                    ${isDraw && !winner ? `<span class="text-rose-500 animate-pulse">เลือกผู้ชนะจุดโทษ</span>` : ''}
                </div>
                <div class="flex items-center justify-between gap-2">
                    <div class="flex-1 flex items-center gap-1.5 min-w-0 ${winner === 'h' ? 'ring-1 ring-emerald-400 rounded px-1 bg-emerald-50' : ''} ${isDraw && !winner ? 'cursor-pointer hover:bg-rose-50' : ''}"
                         onclick="${isDraw ? `setWinner(${slot.id}, 'h')` : ''}">
                        ${home?.iso ? `<img src="${getFlagUrl(home.iso)}" class="w-5 h-3.5 object-cover shadow-sm rounded-sm" alt="">` : `<span class="text-lg">${home?.flag || '⚽'}</span>`}
                        <span class="truncate text-[10px] font-bold ${!home ? 'text-slate-300' : 'text-slate-700'}">${home?.name || slot.home} ${winner === 'h' && isDraw ? '<span class="text-emerald-600">(PK)</span>' : ''}</span>
                    </div>
                    <div class="flex items-center gap-0.5">
                        <input type="number" id="m${slot.id}-h" min="0" value="${s.h}" oninput="updateScore(${slot.id}, 'h', this.value)" class="score-input !w-8 !h-7 !text-xs">
                        <span class="text-slate-300 text-[10px]">:</span>
                        <input type="number" id="m${slot.id}-a" min="0" value="${s.a}" oninput="updateScore(${slot.id}, 'a', this.value)" class="score-input !w-8 !h-7 !text-xs">
                    </div>
                    <div class="flex-1 flex items-center gap-1.5 justify-end min-w-0 text-right ${winner === 'a' ? 'ring-1 ring-emerald-400 rounded px-1 bg-emerald-50' : ''} ${isDraw && !winner ? 'cursor-pointer hover:bg-rose-50' : ''}"
                         onclick="${isDraw ? `setWinner(${slot.id}, 'a')` : ''}">
                        <span class="truncate text-[10px] font-bold ${!away ? 'text-slate-300' : 'text-slate-700'}">${away?.name || slot.away} ${winner === 'a' && isDraw ? '<span class="text-emerald-600">(PK)</span>' : ''}</span>
                        ${away?.iso ? `<img src="${getFlagUrl(away.iso)}" class="w-5 h-3.5 object-cover shadow-sm rounded-sm" alt="">` : `<span class="text-lg">${away?.flag || '⚽'}</span>`}
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });
        roundWrap.appendChild(grid);
        container.appendChild(roundWrap);
    });
}

function resolveTeam(placeholder, standings, bestThirds, results, thirdPlaceAssignments) {
    if (!placeholder) return null;
    if (placeholder.startsWith('W_')) {
        const id = placeholder.split('_')[1];
        if (id.length === 1) { // Group winner
            const t = standings[id][0];
            return t.p > 0 ? TEAMS[t.id] : { name: `ที่ 1 สาย ${id}`, flag: '🏆' };
        }
        return results[placeholder] || { name: `ผู้ชนะ M${id}`, flag: '⚽' };
    }
    if (placeholder.startsWith('RU_')) {
        const id = placeholder.split('_')[1];
        const t = standings[id][1];
        return t.p > 0 ? TEAMS[t.id] : { name: `ที่ 2 สาย ${id}`, flag: '🥈' };
    }
    if (placeholder.startsWith('T')) {
        return thirdPlaceAssignments[placeholder] || { name: `อันดับ 3 (Slot ${placeholder})`, flag: '🥉' };
    }
    if (placeholder.startsWith('L_')) {
        const id = placeholder.split('_')[1];
        return results[placeholder] || { name: `ผู้แพ้ M${id}`, flag: '🏳️' };
    }
    return null;
}

function setWinner(matchId, side) {
    if (!scores[matchId]) scores[matchId] = {};
    scores[matchId].winner = side;
    localStorage.setItem('wc2026_scores', JSON.stringify(scores));
    calculateAll();
}

function clearAllData() {
    if (confirm('ยืนยันที่จะล้างข้อมูลทั้งหมด?')) {
        scores = {};
        localStorage.removeItem('wc2026_scores');
        init();
    }
}

document.addEventListener('DOMContentLoaded', init);
