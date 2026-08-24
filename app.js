
// =================================================================
// Firebase Initialization (outside DOMContentLoaded)
// =================================================================
// This section handles the initial connection to your Firebase project.
// It should be at the very top of your main application script.
console.log("DEBUG: Initializing Firebase connection...");

const firebaseConfig = {
  apiKey: "AIzaSyAlNh7VeqECL0vYM-1eeHGsRtln2d8AqT8",
  authDomain: "dentalnotemaker.firebaseapp.com",
  projectId: "dentalnotemaker",
  storageBucket: "dentalnotemaker.firebasestorage.app",
  messagingSenderId: "402426997147",
  appId: "1:402426997147:web:35c60dbbfe96390f79593e"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
// =================================================================





	
    document.addEventListener('DOMContentLoaded', () => {

        // ========  STYLE INJECTION ========
        const injectHighlightingCSS = () => {
            const style = document.createElement('style');
            style.id = 'caries-highlight-styles';
            style.innerHTML = `
                .backdrop-container {
                    position: relative !important;
                    width: 100% !important;
                    flex-grow: 1 !important;
                    min-height: 220px !important;
                    margin-bottom: 10px !important;
                    display: block !important;
                }

                #backdrop-mirror, #textbox-editor-textarea {
                    position: absolute !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100% !important;
                    height: 100% !important;
                    margin: 0 !important;
                    padding: 12px !important;
                    box-sizing: border-box !important;
                    font-family: monospace !important;
                    font-size: 14px !important;
                    line-height: 1.8 !important; /* Spacing for floating badges */
                    white-space: pre-wrap !important;
                    word-wrap: break-word !important;
                    border: 1px solid #ccc !important;
                    border-radius: 4px !important;
                    overflow-y: auto !important;
                }

                #backdrop-mirror {
                    color: transparent !important; /* Hides duplicate text */
                    background-color: #ffffff !important;
                    z-index: 1 !important;
                    pointer-events: none !important;
                    border-color: #ccc !important;
                }

                #textbox-editor-textarea {
                    background-color: transparent !important;
                    color: #333333 !important;
                    z-index: 2 !important;
                    caret-color: #333333 !important;
                    resize: none !important;
                }

                /* --- CORE HIGHLIGHT SPANS --- */
                .match-class3, .match-class2, .match-class1 {
                    position: relative !important;
                    display: inline-block !important;
                }

                /* Class 3: Soft Red highlight */
                .match-class3 {
                    background-color: rgba(217, 48, 37, 0.2) !important;
                    border-bottom: 2px solid #d93025 !important;
                    border-radius: 2px !important;
                }

                /* Class 2: Soft Yellow highlight */
                .match-class2 {
                    background-color: rgba(255, 193, 7, 0.25) !important;
                    border-bottom: 2px solid #ffc107 !important;
                    border-radius: 2px !important;
                }

                /* Class 1: Soft Green highlight */
                .match-class1 {
                    background-color: rgba(40, 167, 69, 0.2) !important;
                    border-bottom: 2px solid #28a745 !important;
                    border-radius: 2px !important;
                }

                /* --- CLASS 3 BADGE --- */
                .match-class3::after {
                    content: 'Class 3' !important;
                    position: absolute !important;
                    bottom: 100% !important;
                    left: 50% !important;
                    transform: translateX(-50%) !important;
                    font-size: 8px !important;
                    font-weight: bold !important;
                    color: #d93025 !important;
                    background-color: #fce8e6 !important;
                    padding: 1px 4px !important;
                    border-radius: 3px !important;
                    border: 1px solid rgba(217, 48, 37, 0.3) !important;
                    white-space: nowrap !important;
                    line-height: 1 !important;
                    margin-bottom: 2px !important;
                    pointer-events: none !important;
                }

                /* --- CLASS 2 BADGE --- */
                .match-class2::after {
                    content: 'Class 2' !important;
                    position: absolute !important;
                    bottom: 100% !important;
                    left: 50% !important;
                    transform: translateX(-50%) !important;
                    font-size: 8px !important;
                    font-weight: bold !important;
                    color: #b28900 !important;
                    background-color: #fef7e0 !important;
                    padding: 1px 4px !important;
                    border-radius: 3px !important;
                    border: 1px solid rgba(255, 193, 7, 0.4) !important;
                    white-space: nowrap !important;
                    line-height: 1 !important;
                    margin-bottom: 2px !important;
                    pointer-events: none !important;
                }

                /* --- CLASS 1 BADGE --- */
                .match-class1::after {
                    content: 'Class 1' !important;
                    position: absolute !important;
                    bottom: 100% !important;
                    left: 50% !important;
                    transform: translateX(-50%) !important;
                    font-size: 8px !important;
                    font-weight: bold !important;
                    color: #28a745 !important;
                    background-color: #e8f5e9 !important; /* Light solid green background */
                    padding: 1px 4px !important;
                    border-radius: 3px !important;
                    border: 1px solid rgba(40, 167, 69, 0.3) !important;
                    white-space: nowrap !important;
                    line-height: 1 !important;
                    margin-bottom: 2px !important;
                    pointer-events: none !important;
                }
            `;
            document.head.appendChild(style);
        };
        
        injectHighlightingCSS();

        // ======================================================





        // --- State and Constants ---
		let stagedContentChange = null;
        let lastLoadedState = null, activeTemplateId = null, currentSectionToAdd = null, activeElementForEditor = null;
        const SECTIONS = ['header', 'subjective', 'objective', 'assessment', 'plan', 'footer'];
        const ALLERGY_LIST = ["None", "PREGNANCY", "Penicillin", "Amoxicillin", "Codeine", "Aspirin", "NSAIDs", "Sulfa Drugs", "Local Anesthetics", "Latex", "Iodine", "Erythromycin", "Tetracycline", "Metals (Nickel, etc.)", "IV Contrast Dye", "Eugenol", "Shellfish", "Cinnamon", "Peanuts", "Tree Nuts", "Soy"];
        const PSR_AUTOFOCUS_MAP = new Map([[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]);
        const liveOutput = document.getElementById('live-output');
        const textboxEditorModal = document.getElementById('textbox-editor-modal');
		const viewHiddenToggleLabel = document.getElementById('view-hidden-toggle').parentElement;
        const lockLayoutToggleLabel = document.getElementById('lock-layout-toggle').parentElement;
        // --- Helper Functions ---

	// --- History Management Logic ---






// =================================================================
// FIRBASE Changes
// =================================================================

// --- 1. Original Helper Functions (Unchanged) ---
// All of the application's helper functions are preserved here. They are the
// building blocks that the new Firebase logic will call.

const saveNoteToHistory = () => {     
const currentState = {};
    // Reuse your logic to gather the current state
    SECTIONS.forEach(id => {
        currentState[id] = [];
        document.querySelector(`.dropzone[data-section-id="${id}"]`)
            .querySelectorAll('.draggable-element').forEach(el => currentState[id].push(getElementState(el)));
    });

    const history = JSON.parse(localStorage.getItem('dentalNoteHistory') || "[]");
    const newEntry = {
        timestamp: new Date().toLocaleString(),
        data: currentState
    };

    // Add new entry to the start of the list
    history.unshift(newEntry);

    // Optional: Keep only the last 100 notes to stay very safe on storage
    if (history.length > 100) history.pop();

    localStorage.setItem('dentalNoteHistory', JSON.stringify(history));
    renderHistoryUI(); };
	
	
	
/**
 * Saves a copy of the current note to the 'history_notes' collection in Firestore.
 */
const saveHistoryToFirestore = async () => {
    // 1. Get the current technician's name from localStorage.
    const techName = localStorage.getItem('dentalNoteMakerTechName');
    if (!techName) {
        console.warn("No technician name found, cannot save to Firestore history.");
        return; // Exit if there's no tech name to associate the history with.
    }

    // 2. Gather the current state of the note from the UI.
    const currentState = {};
    SECTIONS.forEach(id => {
        currentState[id] = [];
        document.querySelector(`.dropzone[data-section-id="${id}"]`)
            .querySelectorAll('.draggable-element').forEach(el => {
                currentState[id].push(getElementState(el));
            });
    });

    // 3. Create the data payload, including a server-side timestamp.
    const historyPayload = {
        technicianName: techName,
        noteData: currentState,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // Use Firestore's timestamp
    };

    // 4. Create a unique document ID with the tech's name and the current date.
    const uniquePart = db.collection('history_notes').doc().id;
    const historyDocId = `${techName}-${uniquePart}`;

    // 5. Save the document to the 'history_notes' collection.
    try {
        await db.collection('history_notes').doc(historyDocId).set(historyPayload);
        console.log(`Successfully saved note to Firestore history: ${historyDocId}`);
    } catch (error) {
        console.error("Error saving to Firestore history:", error);
    }
};
	
	
	
	
const renderHistoryUI = () => { 

    const history = JSON.parse(localStorage.getItem('dentalNoteHistory') || "[]");
    const container = document.getElementById('history-list');
    container.innerHTML = history.length ? '' : '<i style="color: #999;">No history yet. Click "Reset Values" to archive a note.</i>';

    history.forEach((entry, index) => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.textContent = entry.timestamp;
        item.onclick = () => {
            if(confirm(`Load note from ${entry.timestamp}? Current unsaved changes will be lost.`)) {
                renderState(entry.data);
            }
        };
        container.appendChild(item);
    });

 };
 
// helper function.
const updateEnhancedTextboxUI = (element) => {
    const state = getElementState(element);
    element.querySelector('.enhanced-textbox-preview').textContent = state.content || state.defaultText || '';
};
const getBPStatus = (s, d) => {if (!s || !d) return 'normal'; if (s >= 180 || d >= 120) return 'crisis'; if (s >= 140 || d >= 90) return 'stage2'; if (s >= 130 || d >= 85) return 'stage1'; if (s >= 120 && d < 80) return 'elevated'; return 'normal';};
const updateBPElementUI = (element) => { const s = parseInt(element.querySelector('.bp-systolic').value, 10); const d = parseInt(element.querySelector('.bp-diastolic').value, 10); const status = getBPStatus(s, d); element.classList.remove('bp-normal', 'bp-elevated', 'bp-stage1', 'bp-stage2', 'bp-crisis'); element.classList.add(`bp-${status}`); const priorTxContainer = element.querySelector('.bp-prior-tx-container'); const triggerS = parseInt(element.dataset.checkboxSystolic, 10); const triggerD = parseInt(element.dataset.checkboxDiastolic, 10); if (s >= triggerS || d >= triggerD) { priorTxContainer.classList.add('visible'); } else { priorTxContainer.classList.remove('visible'); } };

		const updatePSRElementUI = (element) => { const hasAsterisk = Array.from(element.querySelectorAll('.psr-asterisk')).some(cb => cb.checked); const noteContainer = element.querySelector('.psr-asterisk-note'); if (hasAsterisk) { noteContainer.classList.add('visible'); } else { noteContainer.classList.remove('visible'); } };
        const handlePSRTabbing = (event) => { if (event.key !== 'Tab') return; event.preventDefault(); const allInputs = Array.from(event.target.closest('.psr-grid').querySelectorAll('.psr-input')); const currentIndex = parseInt(event.target.dataset.index, 10); let nextIndex; if (event.shiftKey) { const reverseMap = new Map(Array.from(PSR_AUTOFOCUS_MAP.entries()).map(([k,v]) => [v,k])); nextIndex = reverseMap.get(currentIndex); if(nextIndex === undefined) nextIndex = 5; } else { nextIndex = PSR_AUTOFOCUS_MAP.get(currentIndex); if(nextIndex === undefined) nextIndex = 0; } const nextInput = allInputs.find(input => parseInt(input.dataset.index, 10) === nextIndex); if (nextInput) { nextInput.focus(); nextInput.select(); } };
        const padBox = (score) => `[${(score || '').padEnd(2)}]`;
        const updateAlertElementUI = (element) => {
            const state = getElementState(element);
            const display = element.querySelector('.alert-display');

            // --- A FIX ---
            // If the inner display span doesn't exist, stop immediately to prevent a crash.
            if (!display) {
                console.warn("Could not find the '.alert-display' span inside an alert element. Skipping UI update.");
                return;
            }
            // --- END OF FIX ---

            element.classList.remove('alert-blank', 'alert-none', 'alert-active');
            if (state.alerts.length === 0) {
                display.textContent = "ALERT (Click to set)";
                element.classList.add('alert-blank');
            } else if (state.alerts.length === 1 && state.alerts[0] === 'None') {
                display.textContent = "No Known Allergies";
                element.classList.add('alert-none');
            } else {
                display.textContent = `ALERT: ${state.alerts.length} active`;
                element.classList.add('alert-active');
            }
        };

        const updateAnestheticSummary = (element) => { const state = getElementState(element); const summarySpan = element.querySelector('.anesthetic-summary'); const usedCount = Object.values(state.anestheticValues).filter(v => v > 0).length; summarySpan.textContent = usedCount > 0 ? `Anesthetic: ${usedCount} Type(s) Used` : 'Click to set anesthetic'; };
        const updateEndoTestingSummary = (element) => { const state = getElementState(element); const summarySpan = element.querySelector('.endo-summary'); const teethCount = state.endoData.teeth.filter(t => t && t.trim() !== '').length; summarySpan.textContent = teethCount > 0 ? `Endo Testing: ${teethCount} Teeth` : 'Click to set Endo Tests'; };

        // **** START OF NEW CODE for tx plan copy/paste ****
        const showFeedback = (message, isSuccess = true) => {
            const feedbackEl = document.getElementById('action-feedback');
            feedbackEl.textContent = message;
            feedbackEl.className = isSuccess ? 'success' : 'error';
            feedbackEl.style.display = 'block';
            feedbackEl.style.opacity = 1;
            setTimeout(() => {
                feedbackEl.style.opacity = 0;
                setTimeout(() => feedbackEl.style.display = 'none', 500);
            }, 2000);
        };
        // **** END OF NEW CODE ****

   
        const parseToothRange = (rangeStr) => { const teeth = new Set(); const parts = rangeStr.split(','); for (const part of parts) { if (part.includes('-')) { const [start, end] = part.split('-').map(Number); if (!isNaN(start) && !isNaN(end)) { for (let i = start; i <= end; i++) { teeth.add(String(i)); } } } else { const num = Number(part.trim()); if (!isNaN(num) && num > 0 && num < 33) { teeth.add(String(num)); } } } return Array.from(teeth).sort((a,b)=>a-b); };

        // --- Core: Element Creation & State ---






        
const updateLiveOutput = (forceImmediate = false) => {
    let outputParts = [];
    document.querySelectorAll('.draggable-element').forEach(el => {
        const state = getElementState(el); let content = '';
        if (state.type === 'enhanced-textbox') { if(state.content && state.content.trim() !== "") { const prefix = state.prefixLabel ? `${state.prefixLabel} ` : ''; content = prefix + state.content; } }
        else if (state.type === 'tx-plan') {
            const classOrder = ["CLASS 3", "CLASS 2", "CLASS 1"];
            let planParts = [];
            classOrder.forEach(className => {
                let classContent = [];
                for (let priority = 1; priority <= 5; priority++) {
                    let priorityItems = [];
                    state.txRows.forEach(rowName => {
                        const key = `${rowName}-${className}`;
                        if (state.txData[key] && state.txData[key].priority === priority && state.txData[key].text.trim() !== '') {
                            priorityItems.push(`${rowName}: ${state.txData[key].text}`);
                        }
                    });
                    if (priorityItems.length > 0) {
                        classContent.push(`${priority}) ${priorityItems.join(', ')}`);
                    }
                }
                if (classContent.length > 0) {
                    planParts.push(`${className}:\n     ${classContent.join('\n     ')}`);
                }
            });
            content = planParts.join('\n');
        }
        else if (state.type === 'anesthetic') { let an_parts = []; if (state.includeTopical) { an_parts.push('Topical Anesthetic.'); } for (const [name, carpules] of Object.entries(state.anestheticValues)) { if (carpules > 0) { const typeInfo = state.anestheticTypes.find(t => t.name === name); if (typeInfo) { const totalMg = parseFloat((typeInfo.mg * carpules).toPrecision(3)); const totalEpi = parseFloat((typeInfo.epi * carpules).toPrecision(3)); an_parts.push(`[${totalMg} MILLIGRAMS ${name} ${totalEpi} MICROGRAMS EPI.]`); } } } content = an_parts.join(' '); }
        else if (state.type === 'endo-testing') {
            const data = state.endoData; 
            const tests = state.endoTests;
            const activeTeethIndices = data.teeth
                .map((tooth, i) => (tooth && tooth.trim() !== '' && Object.values(data.results).some(testRow => testRow[i] && testRow[i].trim() !== '')) ? i : -1)
                .filter(i => i !== -1);
            if (activeTeethIndices.length > 0) {
                const activeTeeth = activeTeethIndices.map(i => data.teeth[i]);
                const activeTests = tests.filter(testName => data.results[testName] && activeTeethIndices.some(i => data.results[testName][i] && data.results[testName][i].trim() !== ''));
                if (activeTests.length > 0) {
                    const nbsp = '\u2002'; 
                    const colWidths = activeTeeth.map((tooth, i) => {
                        let maxWidth = tooth.length;
                        activeTests.forEach(testName => {
                            const result = data.results[testName]?.[activeTeethIndices[i]] || '';
                            if (result.length > maxWidth) maxWidth = result.length;
                        });
                        return maxWidth;
                    });
                    const header = 'Endo Tests'.padEnd(20, nbsp) + ' | ' + activeTeeth.map((tooth, i) => tooth.padEnd(colWidths[i], nbsp)).join(' | ');
                    const separator = '-'.repeat(20) + '-+-' + colWidths.map(w => '-'.repeat(w)).join('-+-');
                    const rows = activeTests.map(testName => {
                        const rowData = data.results[testName] || [];
                        const rowResults = activeTeethIndices.map((toothIndex, i) => (rowData[toothIndex] || '').padEnd(colWidths[i], nbsp));
                        return testName.padEnd(20, nbsp) + ' | ' + rowResults.join(' | ');
                    });
                    content = [header, separator, ...rows].join('\n');
                }
            }
        }
        else if (state.type === 'alert') { if (state.alerts.length > 0) { if (state.alerts[0] === 'None') { content = 'ALERT: No Known Allergies'; } else { content = 'ALERT: ' + state.alerts.map(a => a === 'PREGNANCY' ? 'PREGNANCY' : a.startsWith('Custom: ') ? a.substring(8) : `${a} ALLERGY`).join(', '); } } else if (state.required) { content = 'ALERT: [BLANK]'; } }
        else if (state.type === 'painscale') { if (!state.required || state.value > 0) content = `PAIN: ${state.value}/10`; }
        else if (state.type === 'bloodpressure') { if (state.systolic && state.diastolic) { content = `BP ${state.systolic}/${state.diastolic}`; if (parseInt(state.systolic) >= parseInt(state.discussSystolic) || parseInt(state.diastolic) >= parseInt(state.discussDiastolic)) content += " (BP discussed)"; if (state.isPriorTxChecked && (parseInt(state.systolic) >= parseInt(el.dataset.checkboxSystolic) || parseInt(state.diastolic) >= parseInt(el.dataset.checkboxDiastolic))) content += ` (BP prior to treatment: ${state.systolic}/${state.diastolic})`; } }
        else if (state.type === 'psr') { const scores = state.scores; const topRow = `     ${padBox(scores[0])} ${padBox(scores[1])} ${padBox(scores[2])}`; const botRow = `     ${padBox(scores[5])} ${padBox(scores[4])} ${padBox(scores[3])}`; content = `PSR:\n${topRow}\n${botRow}`; if (state.asterisks.some(a => a) && state.asteriskNote.trim()) { content += `\n     (*: ${state.asteriskNote.trim()})`; } }
        else if (state.type === 'dropdown') { if (el.querySelector('select').selectedIndex > 0 || !state.required) content = el.querySelector('select').value; }
        else if (state.type === 'checkbox') { if(el.querySelector('input').checked) content = el.querySelector('span').innerText; }
        else if (state.type === 'formatter') { if (state.formatType === 'newline') content = '\n'; else if (state.formatType === 'tab') content = '     '; else content = state.customChars; }
        if (content || state.type === 'formatter') { let prefix = (state.prefixNewline ? '\n' : '') + (state.prefixTab ? '     ' : ''); let suffix = state.suffixNewline ? '\n' : ''; outputParts.push(prefix + content + suffix); }
    });
    liveOutput.value = outputParts.join('');

    console.log("DEBUG: updateLiveOutput finished. Triggering cloud sync.");
    syncStateToFirestore(forceImmediate); // Pass the flag along

    generateChart();
};


// --- 2. Core Application Logic (createDraggableContainer, createElement, getElementState) ---
// These functions are the heart of the UI rendering and state gathering. They remain
// mostly unchanged, as they are called by the new rendering logic.
const createDraggableContainer = (type, data) => { 


            const draggable = document.createElement('div'); draggable.className = 'draggable-element';
            if (data.isHidden) draggable.classList.add('element-hidden');
            draggable.dataset.type = type;
            if (data.doNotReset) draggable.dataset.doNotReset = 'true';
            if (data.originalId) draggable.dataset.originalId = data.originalId;
            if (data.required) draggable.dataset.required = 'true'; 

           // **** START OF CODE for width****
            // Check for and apply the custom width
            if (data.width) {
                draggable.style.width = data.width;
                draggable.dataset.width = data.width;
            }
            // **** END OF width CODE ****


            // **** START OF color CODE ****
            // Check for and apply the custom fill color
            if (data.fillColor) {
                draggable.style.backgroundColor = data.fillColor;
                draggable.dataset.fillColor = data.fillColor;
            }
            // **** END OF color CODE ****




if (data.prefixTab) draggable.dataset.prefixTab = 'true'; if (data.prefixNewline) draggable.dataset.prefixNewline = 'true'; if (data.suffixNewline) draggable.dataset.suffixNewline = 'true';
            if (type === 'enhanced-textbox') { draggable.dataset.internalLabel = data.internalLabel || ''; draggable.dataset.prefixLabel = data.prefixLabel || ''; draggable.dataset.defaultText = data.defaultText || ""; draggable.dataset.dropdownOptions = JSON.stringify(data.dropdownOptions || []); draggable.dataset.content = data.content || data.defaultText; }
            else if (type === 'alert') { draggable.dataset.alerts = JSON.stringify(data.alerts || []); }
            else if (type === 'bloodpressure') { draggable.dataset.discussSystolic = data.discussSystolic || '130'; draggable.dataset.discussDiastolic = data.discussDiastolic || '80'; draggable.dataset.checkboxSystolic = data.checkboxSystolic || '140'; draggable.dataset.checkboxDiastolic = data.checkboxDiastolic || '90'; }   
   else if (type === 'anesthetic') { draggable.dataset.anestheticTypes = JSON.stringify(data.anestheticTypes || [ { name: '2% Lidocaine', mg: 34, epi: 17 }, { name: '4% Septocaine', mg: 68, epi: 17 }, { name: '0.5% Marcaine', mg: 9, epi: 9 } ]); draggable.dataset.anestheticValues = JSON.stringify(data.anestheticValues || {}); draggable.dataset.includeTopical = data.includeTopical === false ? 'false' : 'true';}
 
            else if (type === 'tx-plan') {
                draggable.dataset.txRows = JSON.stringify(data.txRows || ["Oral Hygiene", "Operative", "Perio", "Oral Surgery", "Endo", "Pros", "Other"]);
draggable.dataset.txSnippets = JSON.stringify(data.txSnippets || []);
                draggable.dataset.txData = JSON.stringify(data.txData || {});
            }    
   
   else if (type === 'endo-testing') { draggable.dataset.endoTests = JSON.stringify(data.endoTests || ["Percussion", "Palpation", "Endo Ice", "Tooth Slooth", "Periodontal", "Mobility", "Transillumination"]); draggable.dataset.endoData = JSON.stringify(data.endoData || { teeth: [''], results: {} }); }
            draggable.draggable = true; draggable.id = `element-${Date.now()}-${Math.random()}`;
            draggable.addEventListener('dragstart', e => e.target.classList.add('dragging'));
            draggable.addEventListener('dragend', e => e.target.classList.remove('dragging'));
            draggable.addEventListener('contextmenu', e => { e.preventDefault(); activeElementForEditor = e.target.closest('.draggable-element'); const contextMenu = document.getElementById('context-menu'); 




contextMenu.style.top = `${e.clientY + window.scrollY}px`; contextMenu.style.left = `${e.clientX}px`; contextMenu.style.display = 'block'; });

// **** START OF NEW CODE ****
    // Add a simple click listener to add the highlight class
    draggable.addEventListener('click', (e) => { draggable.classList.add('element-highlighted');});
    // **** END OF NEW CODE ****

            return draggable;

 };

        const createElement = (type, data = {}) => {
            const draggable = createDraggableContainer(type, data);
            if (!['enhanced-textbox', 'alert', 'anesthetic', 'endo-testing', 'label-red', 'label-black', 'formatter'].includes(type)) {
                 draggable.addEventListener('input', updateLiveOutput);
            }
            if (type === 'enhanced-textbox') { draggable.classList.add('enhanced-textbox'); const internalLabelHtml = data.internalLabel ? `<div class="internal-label">${data.internalLabel}</div>` : ''; draggable.innerHTML = `${internalLabelHtml}<div class="enhanced-textbox-preview">${data.content || data.defaultText || ''}</div>`; draggable.addEventListener('click', () => openTextboxEditor(draggable)); }
            else if (type === 'alert') { draggable.classList.add('alert-element'); draggable.innerHTML = `<span class="alert-display"></span>`; draggable.addEventListener('click', () => openAllergyModal(draggable)); updateAlertElementUI(draggable); }
            else if (type === 'anesthetic') { draggable.classList.add('anesthetic-element'); draggable.innerHTML = `<span class="anesthetic-summary"></span>`; updateAnestheticSummary(draggable); draggable.addEventListener('click', () => openAnestheticEditor(draggable)); }

    // **** START OF NEW CODE for tx plan ****
            else if (type === 'tx-plan') {
                draggable.classList.add('tx-plan-element');
                draggable.innerHTML = `<span class="tx-plan-summary"></span>`;
                updateTxPlanSummary(draggable);
                draggable.addEventListener('click', () => openTxPlanEditor(draggable));
	
            }
            // **** END OF NEW CODE ****
   
   
   
     else if (type === 'endo-testing') { draggable.classList.add('endo-testing-element'); draggable.innerHTML = `<span class="endo-summary"></span>`; updateEndoTestingSummary(draggable); draggable.addEventListener('click', () => openEndoTestingEditor(draggable)); }
            else if (type === 'painscale') { const val = data.value || 0; draggable.innerHTML = `<label>Pain Scale: <b class="pain-value">${val}/10</b></label><div class="pain-scale-container"><input type="range" min="0" max="10" value="${val}" class="pain-slider"></div>`; draggable.querySelector('.pain-slider').addEventListener('input', e => { draggable.querySelector('.pain-value').textContent = `${e.target.value}/10`; }); }
            else if (type === 'bloodpressure') { draggable.classList.add('bp-element'); draggable.innerHTML = `<div class="bp-inputs"><b>BP:</b> <input type="number" class="bp-systolic" placeholder="120" value="${data.systolic || ''}"> / <input type="number" class="bp-diastolic" placeholder="80" value="${data.diastolic || ''}"></div><div class="bp-prior-tx-container"><label><input type="checkbox" class="bp-prior-tx-check" ${data.isPriorTxChecked ? 'checked' : ''}> BP Prior to Tx</label></div>`; draggable.querySelectorAll('input[type="number"]').forEach(input => { input.addEventListener('input', () => updateBPElementUI(draggable)); }); updateBPElementUI(draggable); }
            else if (type === 'psr') { draggable.classList.add('psr-element'); const scores = data.scores || Array(6).fill(''); const asterisks = data.asterisks || Array(6).fill(false); const visualOrder = [[0, "[1]"], [1, "[2]"], [2, "[3]"], [5, "[6]"], [4, "[5]"], [3, "[4]"]]; let gridHtml = ''; [visualOrder.slice(0,3), visualOrder.slice(3,6)].forEach(row => { gridHtml += row.map(([index, label]) => `<div class="psr-sextant"><input type="checkbox" class="psr-asterisk" data-index="${index}" ${asterisks[index] ? 'checked' : ''}><label>${label}</label><input type="text" class="psr-input" value="${scores[index]}" data-index="${index}"></div>`).join(''); }); draggable.innerHTML = `<b>PSR:</b><div class="psr-grid">${gridHtml}</div><textarea class="psr-asterisk-note" placeholder="* Description...">${data.asteriskNote || ''}</textarea>`; 


draggable.querySelectorAll('.psr-input').forEach(input => {
        input.addEventListener('input', () => {
            const index = parseInt(input.dataset.index, 10);
            const checkbox = draggable.querySelector(`.psr-asterisk[data-index="${index}"]`);
            if (input.value.includes('*')) {
                if (!checkbox.checked) checkbox.checked = true;
            } else {
                if (checkbox.checked) checkbox.checked = false;
            }
            const scorePart = input.value.replace(/\*/g, '');
            if (scorePart.length > 1) input.value = scorePart.charAt(0) + (checkbox.checked ? '*' : '');
            if (!scorePart.match(/^[0-4]?$/)) input.value = '' + (checkbox.checked ? '*' : '');
            if (scorePart.length === 1 && scorePart.match(/[0-4]/)) {
                const nextIndex = PSR_AUTOFOCUS_MAP.get(index);
                if (nextIndex !== undefined) {
                    const nextInput = draggable.querySelector(`.psr-input[data-index="${nextIndex}"]`);
                    if (nextInput) {
                        nextInput.focus();
                        nextInput.select();
                    }
                }
            }
            updatePSRElementUI(draggable);

            // ======== NEW LOGIC TO UPDATE PERIO RISK ========
            // 1. Get all six current scores from the input fields.
            const allScores = Array.from(draggable.querySelectorAll('.psr-input')).map(inp => inp.value);

            // 2. Clean the scores for evaluation (remove '*' and convert to numbers).
            const numericScores = allScores.map(s => parseInt(s.replace('*', ''), 10)).filter(n => !isNaN(n));

            // 3. Determine the risk level based on the image provided.
            let risk = "Low"; // Default to Low
            const countOf3s = numericScores.filter(s => s === 3).length;
            const has4s = numericScores.some(s => s === 4);

            if (has4s || countOf3s >= 3) {
                risk = "High";
            } else if (countOf3s >= 1 && countOf3s <= 2) {
                risk = "Moderate";
            }

            // 4. Call our new helper function to update the dropdown.
            updatePerioRiskDropdown(risk);
        });
        input.addEventListener('keydown', handlePSRTabbing);
    });


draggable.querySelectorAll('.psr-asterisk').forEach(checkbox => { checkbox.addEventListener('change', () => { const index = parseInt(checkbox.dataset.index, 10); const input = draggable.querySelector(`.psr-input[data-index="${index}"]`); const scorePart = input.value.replace(/\*/g, ''); input.value = scorePart + (checkbox.checked ? '*' : ''); updatePSRElementUI(draggable); updateLiveOutput(); }); }); updatePSRElementUI(draggable); }
            else if (type === 'dropdown') { const select = document.createElement('select'); (data.options || ['Select...', 'Opt 1', 'Opt 2']).forEach(opt => select.add(new Option(opt, opt, false, opt === data.selected))); draggable.appendChild(select); draggable.addEventListener('change', updateLiveOutput); }
            else if (type === 'checkbox') { draggable.innerHTML = `<label><input type="checkbox" ${data.checked ? 'checked' : ''}> <span contenteditable="true">${data.content || 'Checkbox text'}</span></label>`; }
            else if (type.startsWith('label-')) { draggable.classList.add(type === 'label-red' ? 'element-label-red' : 'element-label-black'); draggable.innerHTML = `<div contenteditable="true">${data.content || 'Descriptive Label'}</div>`; }
            else if (type === 'formatter') { draggable.classList.add('formatter-element'); const formatType = data.formatType || 'newline'; let display = (formatType === 'newline') ? '↵ Newline' : (formatType === 'tab') ? '→ Tab' : (data.customChars || '...'); draggable.innerHTML = `<span>${display}</span>`; }
            return draggable;
        };
		
	


        const getElementState = (element) => {
            const type = element.dataset.type;             const state = { type, required: element.dataset.required === 'true', prefixTab: element.dataset.prefixTab === 'true', prefixNewline: element.dataset.prefixNewline === 'true', suffixNewline: element.dataset.suffixNewline === 'true', originalId: element.dataset.originalId, isHidden: element.classList.contains('element-hidden'), doNotReset: element.dataset.doNotReset === 'true', width: element.dataset.width || '', fillColor: element.dataset.fillColor || '' };
            if (type === 'enhanced-textbox') { state.content = element.dataset.content; state.internalLabel = element.dataset.internalLabel; state.prefixLabel = element.dataset.prefixLabel; state.defaultText = element.dataset.defaultText; state.dropdownOptions = JSON.parse(element.dataset.dropdownOptions); }

            // **** START OF NEW CODE for tx plan****
            else if (type === 'tx-plan') {
                state.txRows = JSON.parse(element.dataset.txRows);
state.txSnippets = JSON.parse(element.dataset.txSnippets);
                state.txData = JSON.parse(element.dataset.txData);
            }
            // **** END OF NEW CODE ****
   
            else if (type === 'alert') { state.alerts = JSON.parse(element.dataset.alerts || '[]'); }
            else if (type === 'painscale') { state.value = element.querySelector('.pain-slider').value; }
            else if (type === 'anesthetic') { state.anestheticTypes = JSON.parse(element.dataset.anestheticTypes); state.anestheticValues = JSON.parse(element.dataset.anestheticValues); state.includeTopical = element.dataset.includeTopical === 'true'; }
            else if (type === 'endo-testing') { state.endoTests = JSON.parse(element.dataset.endoTests); state.endoData = JSON.parse(element.dataset.endoData); }
            else if (type === 'bloodpressure') { state.systolic = element.querySelector('.bp-systolic').value; state.diastolic = element.querySelector('.bp-diastolic').value; state.isPriorTxChecked = element.querySelector('.bp-prior-tx-check').checked; state.discussSystolic = element.dataset.discussSystolic; state.discussDiastolic = element.dataset.discussDiastolic; state.checkboxSystolic = element.dataset.checkboxSystolic; state.checkboxDiastolic = element.dataset.checkboxDiastolic; }
            else if (type === 'psr') { state.scores = Array(6).fill(''); state.asterisks = Array(6).fill(false); element.querySelectorAll('.psr-input').forEach(i => { state.scores[i.dataset.index] = i.value; }); element.querySelectorAll('.psr-asterisk').forEach(cb => { state.asterisks[cb.dataset.index] = cb.checked; }); state.asteriskNote = element.querySelector('.psr-asterisk-note').value; }
            else if (type === 'dropdown') { const select = element.querySelector('select'); state.options = Array.from(select.options).map(o => o.value); state.selected = select.value; }
            else if (type === 'checkbox') { state.checked = element.querySelector('input').checked; state.content = element.querySelector('span').innerText; }
            else if (type.startsWith('label-')) { state.content = element.querySelector('[contenteditable]').innerText; }
            else if (type === 'formatter') { state.formatType = element.dataset.formatType || 'newline'; state.customChars = element.dataset.customChars || ''; }
            return state;
        };



// copy a bunch of Functions


        // **** START OF palette CODE ****

const COLOR_PALETTE = [
    // Default & Blues
    { name: 'Default Blue', value: '#e6f7ff' },
    { name: 'Light Blue', value: '#d6eefb' },

    // Greens
    { name: 'Light Green', value: '#f6ffed' },
    { name: 'Mint Green', value: '#d9f7be' },
    
    // Reds & Pinks
    { name: 'Light Red', value: '#fff1f0' },
    { name: 'Light Pink', value: '#ffefff' },
    
    // Yellows & Oranges
    { name: 'Light Yellow', value: '#fffbe6' },
    { name: 'Light Orange', value: '#fff7e6' },
    { name: 'Gold', value: '#fff1b8' },

    // Purples
    { name: 'Light Purple', value: '#f9f0ff' },
    { name: 'Lavender', value: '#efdbff' },

    // Cyans & Teals
    { name: 'Light Cyan', value: '#e6fffb' },
    { name: 'Sky Blue', value: '#dcf4ff' },

    // Grays & Neutrals
    { name: 'White', value: '#ffffff' },
    { name: 'Light Gray 1', value: '#fafafa' },
    { name: 'Light Gray 2', value: '#f5f5f5' },
    { name: 'Light Gray 3', value: '#f0f0f0' },
    { name: 'Medium Gray', value: '#e8e8e8' },
    
    // Other
    { name: 'Beige', value: '#fffaf0' },
    { name: 'Aqua', value: '#e0ffff' }
];


        // **** END OF palette CODE ****




// **** START OF CODE: Note Evaluation Logic ****

       /**
         * Analyzes PSR scores from text and returns a risk assessment.
         * @param {string} psrText - The text containing PSR scores (can be multi-line).
         * @returns {string|null} The risk assessment string or null if not enough scores are found.
         */
         function evaluatePsr(psrText) {
            const matches = psrText.match(/[0-4]/g);
            if (!matches || matches.length < 6) { return null; }

            const scores = matches.map(m => parseInt(m, 10));
            const countOf3s = scores.filter(s => s === 3).length;
            const has4s = scores.some(s => s >= 4);

            // This now returns only the risk level string
            if (has4s || countOf3s >= 3) {
                return "HIGH";
            } else if (countOf3s >= 1 && countOf3s <= 2) {
                return "MODERATE";
            } else {
                return "LOW";
            }
        }



		
        /**
         * Checks if a documented presenting complaint has a corresponding diagnosis.
         * @param {string[]} lines - An array of all lines in the note text.
         * @returns {string|null} The warning string or null if the check passes.
         */
        function checkComplaintDiagnosis(lines) {
            console.log("Evaluation: Checking Complaint/Diagnosis link...");
            
            const complaintLine = lines.find(line => line.trim().startsWith("PRESENTING COMPLAINT:"));
            const diagnosisLine = lines.find(line => line.trim().startsWith("DIAGNOSIS OF FINDINGS AND/OR PRESENTING COMPLAINT:"));

            if (!complaintLine || !diagnosisLine) {
                return null;
            }

            const complaintText = complaintLine.replace("PRESENTING COMPLAINT:", "").trim();
            const diagnosisText = diagnosisLine.replace("DIAGNOSIS OF FINDINGS AND/OR PRESENTING COMPLAINT:", "").trim();
            
            // --- THIS IS THE FIX ---
            // Find the element within this function's scope.
            const ccElement = document.querySelector('[data-original-id="3-1"]');

            if (!complaintText.toLowerCase().includes('none') && diagnosisText.toLowerCase().includes('none')) {
                console.log("Evaluation: Mismatch FOUND!");
                if (ccElement) { // Safely add the class if the element exists
                    ccElement.classList.add('bp-crisis');
                }
                return "No Diagnosis for Presenting Complaint given";
            } else {
                if (ccElement) { // Safely remove the class if the element exists
                    ccElement.classList.remove('bp-crisis');
                }
            }
            
            console.log("Evaluation: Complaint/Diagnosis check passed.");
            return null;
        }


       /**
         * Analyzes caries findings from the note to recommend a caries risk level.
         * @param {string[]} lines - An array of all lines in the note text.
         * @returns {string|null} The risk level string ("LOW", "MODERATE", "HIGH") or null.
         */
        function evaluateCariesRisk(lines) {
            console.log("Evaluation: Checking Caries Risk...");

            const defectiveLine = lines.find(line => line.trim().startsWith("CARIES/DEFECTIVE RESTORATIONS:"));
            const incipientLine = lines.find(line => line.trim().startsWith("INCIPIENT CARIES:"));

            // If we can't find the lines, we can't make a recommendation.
            if (!defectiveLine || !incipientLine) {
                console.log("Evaluation: Caries/Incipient lines not found.");
                return null;
            }

            // Use a regex to find all sequences of digits (\d+) globally (g).
            // The '|| []' ensures that if no numbers are found, we get an empty array instead of null.
            const defectiveMatches = defectiveLine.match(/\d+/g) || [];
            const incipientMatches = incipientLine.match(/\d+/g) || [];
            
            const defectiveCount = defectiveMatches.length;
            const incipientCount = incipientMatches.length;

            console.log(`Evaluation: Found ${defectiveCount} defective/carious teeth and ${incipientCount} incipient lesions.`);

            // Apply the risk logic you defined.
            if (defectiveCount > 2 || incipientCount > 4) {
                console.log("Evaluation: Result -> HIGH risk");
                return "HIGH";
            } else if (defectiveCount >= 1 || incipientCount >= 3) {
                console.log("Evaluation: Result -> MODERATE risk");
                return "MODERATE";
            } else {
                console.log("Evaluation: Result -> LOW risk");
                return "LOW";
            }
        }




        /**
         * Main evaluation router. It takes the full note text and runs all evaluation functions.
         * @param {string} noteText - The complete text from the live output.
         * @returns {string[]} An array of suggestion strings.
         */
        function evaluateNote(noteText) {
            console.log("--- Running Note Evaluation ---");
            const suggestions = [];
            
            const lines = noteText.split('\n');

            // --- Complaint/Diagnosis Check ---
            // The checkComplaintDiagnosis function now handles its own highlighting internally and safely.
            const complaintSuggestion = checkComplaintDiagnosis(lines);
            if (complaintSuggestion) {
                suggestions.push(complaintSuggestion);
            }

            // --- Caries Risk Evaluation and Cross-Check ---
            const recommendedCariesRisk = evaluateCariesRisk(lines);
            if (recommendedCariesRisk) {
                const userSelectedCariesLine = lines.find(line => line.trim().startsWith("CARIES RISK:"));
                let userSelectedCariesRisk = null;
                if (userSelectedCariesLine) {
                    const riskMatch = userSelectedCariesLine.match(/Low|Moderate|High/i);
                    if (riskMatch) {
                        userSelectedCariesRisk = riskMatch[0].toUpperCase();
                    }
                }

                let suggestionString = `Recommended Caries Risk: ${recommendedCariesRisk}`;
                if (userSelectedCariesRisk) {
                    if (recommendedCariesRisk === userSelectedCariesRisk) {
                        suggestionString += " (Matched with Recommendation)";
                    } else {
                        suggestionString += " (Does NOT match recommendation)";
                    }
                } else {
                    suggestionString += " (User selection not found)";
                }
                suggestions.push(suggestionString);
            }

            // --- Perio Risk Evaluation and Cross-Check ---
            const psrStartIndex = lines.findIndex(line => line.trim().startsWith("PSR:"));
            let recommendedPerioRisk = null;
            if (psrStartIndex !== -1) {
                const psrBlock = lines.slice(psrStartIndex, psrStartIndex + 3).join('\n');
                recommendedPerioRisk = evaluatePsr(psrBlock); 
            }
            const userSelectedRiskLine = lines.find(line => line.trim().startsWith("PERIO RISK:"));
            let userSelectedPerioRisk = null;
            if (userSelectedRiskLine) {
                const riskMatch = userSelectedRiskLine.match(/Low|Moderate|High/i);
                if (riskMatch) {
                    userSelectedPerioRisk = riskMatch[0].toUpperCase();
                }
            }
            if (recommendedPerioRisk) {
                let suggestionString = `Recommended Perio Risk: ${recommendedPerioRisk}`;
                if (userSelectedPerioRisk) {
                    if (recommendedPerioRisk === userSelectedPerioRisk) {
                        suggestionString += " (Matched with Recommendation)";
                    } else {
                        suggestionString += " (Does NOT match recommendation)";
                    }
                } else {
                    suggestionString += " (User selection not found)";
                }
                suggestions.push(suggestionString);
            }
            
            console.log("Evaluation complete. Suggestions:", suggestions);
            return suggestions;
        }

		
        // **** END OF CODE: Note Evaluation Logic ****






/**
 * Finds the Caries Risk dropdown and sets its value based on a calculated risk level.
 * @param {string} riskLevel - The calculated risk level ("Low", "Moderate", or "High").
 */
const updateCariesRiskDropdown = (riskLevel) => {
    // 1. Find the dropdown element by its unique originalId.
    const cariesRiskDropdown = document.querySelector('[data-original-id="3-5"]');
    if (!cariesRiskDropdown) {
        console.warn("Caries Risk dropdown element not found on the page.");
        return;
    }

    // 2. Construct the full option text that matches the dropdown's value.
    const optionValue = `CARIES RISK: ${riskLevel}`;

    // 3. Find the <select> element and update its value if it's different.
    const selectElement = cariesRiskDropdown.querySelector('select');
    if (selectElement && selectElement.value !== optionValue) {
        console.log(`Automatically setting Caries Risk to: ${riskLevel}`);
        selectElement.value = optionValue;

        // Trigger a save to persist the automated change.
        updateLiveOutput();
    }
};

/**
 * Reads the content of the caries text boxes and triggers the dropdown update.
 */
const checkAndSetCariesRisk = () => {
    // 1. Find the two relevant enhanced-textbox elements by their unique IDs.
    const defectiveElement = document.querySelector('[data-original-id="2-5"]');
    const incipientElement = document.querySelector('[data-original-id="2-6"]');

    // If either element isn't on the page, we can't proceed.
    if (!defectiveElement || !incipientElement) return;

    // 2. Get the text content from each element's dataset.
    const defectiveText = defectiveElement.dataset.content || "";
    const incipientText = incipientElement.dataset.content || "";

    // 3. Evaluate the risk using the same logic from your copy button.
    const defectiveCount = (defectiveText.match(/\d+/g) || []).length;
    const incipientCount = (incipientText.match(/\d+/g) || []).length;

    let risk = "Low"; // Default to Low risk
    if (defectiveCount > 2 || incipientCount > 4) {
        risk = "High";
    } else if (defectiveCount >= 1 || incipientCount >= 3) {
        risk = "Moderate";
    }

    // 4. Call our new helper function to update the dropdown UI.
    updateCariesRiskDropdown(risk);
};


/**
 * Finds the Perio Risk dropdown and sets its value based on a calculated risk level.
 * @param {string} riskLevel - The calculated risk level ("Low", "Moderate", or "High").
 */
const updatePerioRiskDropdown = (riskLevel) => {
    // 1. Find the dropdown element using its unique originalId.
    const perioRiskDropdown = document.querySelector('[data-original-id="3-6"]');
    if (!perioRiskDropdown) {
        console.warn("Perio Risk dropdown element not found on the page.");
        return;
    }

    // 2. Construct the full option text that matches the dropdown's <option> value.
    const optionValue = `PERIO RISK: ${riskLevel}`;

    // 3. Find the <select> element inside the dropdown and set its value.
    const selectElement = perioRiskDropdown.querySelector('select');
    if (selectElement && selectElement.value !== optionValue) {
        console.log(`Automatically setting Perio Risk to: ${riskLevel}`);
        selectElement.value = optionValue;

        // This is crucial for ensuring the change is saved to the cloud.
        updateLiveOutput();
    }
};





   const updateTxPlanSummary = (element) => { 
    const state = getElementState(element);
    const summarySpan = element.querySelector('.tx-plan-summary');
    const entryCount = Object.values(state.txData).filter(d => d.text && d.text.trim() !== '').length;
    summarySpan.textContent = entryCount > 0 ? `Treatment Plan: ${entryCount} Entries` : 'Click to set Treatment Plan'; 
};
   
  

// ==========================================================
//  LOGIC FOR REAL-TIME CARIES HIGHLIGHTING IN TEXTAREA
// ==========================================================
// Global memory store for both types of matches
let txPlanHighlightMap = {}; 
let txPlanPhrasesMap = { class3: [], class2: [], class1: [] };

const parseTreatmentPlanForHighlighting = () => {
    txPlanHighlightMap = {}; // Reset shorthand map
    txPlanPhrasesMap = { class3: [], class2: [], class1: [] }; // Reset exact phrases map

    const txPlanElement = document.querySelector('.draggable-element[data-type="tx-plan"]');
    if (!txPlanElement) return;

    try {
        const state = getElementState(txPlanElement);
        const txData = state.txData || {};

        for (const key in txData) {
            // Key format: "Department-CLASS X", e.g., "Operative-CLASS 3"
            const parts = key.split('-');
            const className = parts[1]; // "CLASS 3", "CLASS 2", or "CLASS 1"
            
            if (className === 'CLASS 3' || className === 'CLASS 2' || className === 'CLASS 1') {
                const text = txData[key].text || "";
                if (!text.trim()) continue;

                // 1. EXTRACT EXACT PHRASES: Split by commas (standard treatment plan notation)
                const items = text.split(',').map(item => item.trim()).filter(Boolean);
                items.forEach(item => {
                    if (className === 'CLASS 3') txPlanPhrasesMap.class3.push(item);
                    if (className === 'CLASS 2') txPlanPhrasesMap.class2.push(item);
                    if (className === 'CLASS 1') txPlanPhrasesMap.class1.push(item);
                });

                // 2. EXTRACT SHORTHAND MAP
                const regex = /(\d+)\s*\(([^)]+)\)/g;
                let match;
                while ((match = regex.exec(text)) !== null) {
                    const toothNum = match[1];
                    const surfaceStr = match[2].toUpperCase();
                    
                    const surfaces = new Set(surfaceStr.split(''));
                    if (surfaceStr.includes('MOD')) { surfaces.add('M'); surfaces.add('O'); surfaces.add('D'); }
                    if (surfaceStr.includes('MO')) { surfaces.add('M'); surfaces.add('O'); }
                    if (surfaceStr.includes('DO')) { surfaces.add('D'); surfaces.add('O'); }
                    if (surfaceStr.includes('MI')) { surfaces.add('M'); surfaces.add('I'); }
                    if (surfaceStr.includes('DI')) { surfaces.add('D'); surfaces.add('I'); }

                    if (!txPlanHighlightMap[toothNum]) {
                        txPlanHighlightMap[toothNum] = {};
                    }
                    
                    surfaces.forEach(s => {
                        if (className === 'CLASS 3') txPlanHighlightMap[toothNum][s] = 'class3';
                        if (className === 'CLASS 2') txPlanHighlightMap[toothNum][s] = 'class2';
                        if (className === 'CLASS 1') txPlanHighlightMap[toothNum][s] = 'class1';
                    });
                }
            }
        }
        console.log("Parsed Treatment Plan Phrases:", txPlanPhrasesMap);
    } catch (e) {
        console.error("Error parsing treatment plan for highlights:", e);
    }
};


/**
 * Syncs the textarea text to the backdrop mirror, applying HTML highlights if relevant.
 */
/**
 * Syncs the textarea text to the backdrop mirror, applying HTML highlights if relevant.
 * Implements a compiler placeholder tokenization system to prevent nesting HTML conflicts.
 */
const updateBackdropMirror = () => {
    const textarea = document.getElementById('textbox-editor-textarea');
    const mirror = document.getElementById('backdrop-mirror');
    if (!textarea || !mirror) return;

    let text = textarea.value;

    const editedElementId = activeElementForEditor ? activeElementForEditor.dataset.originalId : "";
    const isCariesField = (editedElementId === "2-5" || editedElementId === "2-6");

    let workingText = text;
    const placeholders = {};
    let placeholderCounter = 0;

    // Helper to safely escape exact phrases for RegExp matching
    const escapeRegExp = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    if (isCariesField) {
        // --- MATCH TYPE 1: EXACT TEXT PHRASES ---
        // Collect and sort all exact phrases by length descending to match longest first (e.g. "ext #3" before "ext")
        const allPhrases = [];
        ['class3', 'class2', 'class1'].forEach(cls => {
            if (txPlanPhrasesMap[cls]) {
                txPlanPhrasesMap[cls].forEach(phrase => {
                    if (phrase.trim()) {
                        allPhrases.push({ text: phrase, cls: cls });
                    }
                });
            }
        });

        
        allPhrases.sort((a, b) => b.text.length - a.text.length);

        allPhrases.forEach(item => {
            const escaped = escapeRegExp(item.text);
            const pattern = new RegExp(escaped, 'gi'); // Case-insensitive exact match
            
            workingText = workingText.replace(pattern, (matchedText) => {
                const token = `___PH_${placeholderCounter}___`;
                placeholders[token] = `<span class="match-${item.cls}">${matchedText}</span>`;
                placeholderCounter++;
                return token;
            });
        });

        // --- MATCH TYPE 2: TOOTH SHORTHANDS ---
        const shorthandRegex = /#?(\d+)\s*\(([^)]+)\)/gi;
        workingText = workingText.replace(shorthandRegex, (fullMatch, toothNum, surfaceStr) => {
            const surfaces = surfaceStr.toUpperCase();
            let matchedClass = null;

            if (txPlanHighlightMap[toothNum]) {
                const surfacesToCheck = new Set(surfaces.split(''));
                if (surfaces.includes('MOD')) { surfacesToCheck.add('M'); surfacesToCheck.add('O'); surfacesToCheck.add('D'); }
                if (surfaces.includes('MO')) { surfacesToCheck.add('M'); surfacesToCheck.add('O'); }
                if (surfaces.includes('DO')) { surfacesToCheck.add('D'); surfacesToCheck.add('O'); }
                if (surfaces.includes('MI')) { surfacesToCheck.add('M'); surfacesToCheck.add('I'); }
                if (surfaces.includes('DI')) { surfacesToCheck.add('D'); surfacesToCheck.add('I'); }

                // Determine the highest priority class match for this shorthand
                for (const s of surfacesToCheck) {
                    if (txPlanHighlightMap[toothNum][s]) {
                        matchedClass = txPlanHighlightMap[toothNum][s];
                        break; // Stop at first matched surface class
                    }
                }
            }

            if (matchedClass) {
                const token = `___PH_${placeholderCounter}___`;
                placeholders[token] = `<span class="match-${matchedClass}">${fullMatch}</span>`;
                placeholderCounter++;
                return token;
            }
            return fullMatch;
        });
    }

    // 1. Escape basic HTML characters in our compiled string to keep it safe from parsing errors
    let html = workingText
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // 2. Restore all placeholders (inserting clean matching HTML spans safely back)
    for (const token in placeholders) {
        html = html.replace(token, placeholders[token]);
    }

    // 3. Convert multi-spaces to non-breaking spaces for alignment
    html = html.replace(/ {2,}/g, match => '&nbsp;'.repeat(match.length));
    
    if (html.endsWith('\n')) {
        html += ' ';
    }
    html = html.replace(/\n/g, '<br>');

    // 4. Paint the mirror
    mirror.innerHTML = html;
};





  
   
   
   
   // =================================================================
// START: IMPORT CODE WITH HIGHLIGHTING
// P.
// =================================================================

/**
 * This is the central import logic, now with highlighting.
 * It takes raw text, processes it, and updates the application state.
 * @param {string} noteText The raw text to be imported.
 */


const runImportLogic = (noteText) => {
    console.log("DEBUG: runImportLogic started with final highlighting logic.");

    try {
        // --- All the parsing and data mapping logic from before (this part is correct) ---
        const parseNoteContent = (content) => {
            const sections = [
                "RADIOGRAPHIC FINDINGS:", "CARIES/DEFECTIVE RESTORATIONS:", "INCIPIENT CARIES:",
                "SOFT TISSUE / OCS:", "OCS/SOFT TISSUE:", "PERIO:", "ENDO:", "TMJ:", 
                "OCCLUSION:", "ORAL SURGERY:", "OTHER FINDINGS:", "PSR:"
            ];
            const parsed = {};
            for (const header of sections) {
                if (header === "PSR:") continue;
                const startIndex = content.indexOf(header);
                if (startIndex === -1) continue;
                const searchStart = startIndex + header.length;
                let nextHeaderPos = content.length;
                for (const nextH of sections) {
                    if (nextH === header) continue;
                    const pos = content.indexOf(nextH, searchStart);
                    if (pos > -1 && pos < nextHeaderPos) nextHeaderPos = pos;
                }
                const singleNewlinePos = content.indexOf('\n', searchStart);
                let endIndex = nextHeaderPos;
                if (singleNewlinePos > -1 && singleNewlinePos < endIndex) endIndex = singleNewlinePos;
                const value = content.substring(searchStart, endIndex).trim();
                if (value) {
                    const primaryHeader = header.includes("OCS") ? "SOFT TISSUE / OCS:" : header;
                    parsed[primaryHeader] = value;
                }
            }
            return parsed;
        };

        const parsePsrScores = (content) => {
            const psrHeader = "PSR:";
            const startIndex = content.indexOf(psrHeader);
            if (startIndex === -1) return null;
            const searchStart = startIndex + psrHeader.length;
            const blockEndIndex = content.indexOf('\n\n', searchStart);
            const psrBlock = content.substring(searchStart, blockEndIndex > -1 ? blockEndIndex : undefined).trim();
            if (!psrBlock) return null;
            const matches = [...psrBlock.matchAll(/\[(.*?)\]/g)];
            let rawScores = matches.map(match => match[1].trim());
            if (rawScores.length < 6) {
                while(rawScores.length < 6) rawScores.push("");
            } else if (rawScores.length > 6) {
                rawScores = rawScores.slice(0, 6);
            }
            const topLine = rawScores.slice(0, 3);
            const bottomLine = rawScores.slice(3, 6);
            bottomLine.reverse();
            return topLine.concat(bottomLine);
        };

        const standardData = parseNoteContent(noteText);
        const psrData = parsePsrScores(noteText);
        
        if (Object.keys(standardData).length === 0 && !psrData) {
            alert("Could not find any specific headers or a PSR block in the pasted text. Nothing was changed.");
            return;
        }

        const labelToOriginalIdMap = {
            "RADIOGRAPHIC FINDINGS:": "2-4", "CARIES/DEFECTIVE RESTORATIONS:": "2-5", "INCIPIENT CARIES:": "2-6",
            "SOFT TISSUE / OCS:": "2-7", "PERIO:": "2-8", "ENDO:": "2-9", "TMJ:": "2-11",
            "OCCLUSION:": "2-12", "ORAL SURGERY:": "2-13", "OTHER FINDINGS:": "2-14"
        };

        const liveState = {};
        SECTIONS.forEach(id => {
            liveState[id] = [];
            const dropzone = document.querySelector(`.dropzone[data-section-id="${id}"]`);
            if (dropzone) {
                dropzone.querySelectorAll('.draggable-element').forEach(el => liveState[id].push(getElementState(el)));
            }
        });

        // --- FINAL HIGHLIGHTING LOGIC ---

        // 1. Create a list to store the ORIGINAL IDs of elements that will be updated.
        const originalIdsToHighlight = [];

        for (const sectionId in liveState) {
            if (Array.isArray(liveState[sectionId])) {
                liveState[sectionId].forEach(element => {
                    const matchingLabel = Object.keys(labelToOriginalIdMap).find(label => labelToOriginalIdMap[label] === element.originalId);
                    if (matchingLabel && standardData[matchingLabel]) {
                        element.content = standardData[matchingLabel];
                        originalIdsToHighlight.push(element.originalId); // Store the originalId
                    }
                    if (element.type === 'psr' && element.originalId === '2-15' && psrData) {
                        element.scores = psrData;
                        originalIdsToHighlight.push(element.originalId); // Store the PSR originalId
                    }
                });
            }
        }
        
        console.log("DEBUG: The following original IDs will be highlighted:", originalIdsToHighlight);

        // 2. Render the state first.
        renderState(liveState, false);

        // 3. NOW, apply the highlight to the NEW elements on the page by finding them via their data attribute.
        console.log("DEBUG: Applying '.element-highlighted' class by finding new elements via data-original-id...");
        if (originalIdsToHighlight.length > 0) {
            originalIdsToHighlight.forEach(oId => {
                // Find the newly rendered element on the page that has the matching data-original-id attribute.
                const elementToHighlight = document.querySelector(`.draggable-element[data-original-id="${oId}"]`);
                if (elementToHighlight) {
                    console.log(`%cSUCCESS: Found new element with originalId "${oId}". Applying highlight.`, 'color: lightgreen; font-weight: bold;');
                    elementToHighlight.classList.add('element-highlighted2');
                } else {
                    console.error(`DEBUG: FAILED to find element with data-original-id: ${oId} on the page after rendering.`);
                }
            });
        }

        console.log("--- IMPORT PROCESS COMPLETE ---");

    } catch (error) {
        console.error("An error occurred during the import process:", error);
        alert("A critical error occurred. See console for details.");
    }
};


// =================================================================
// END:  CODE WITH CORRECTED PARSER AWARENESS
// =================================================================



// --- MODAL EVENT LISTENERS ---
// This block controls the new modal's behavior.

// Get all the modal elements from the page.
const modalBackdrop = document.getElementById('modal-backdrop');
const pasteTextarea = document.getElementById('paste-note-textarea');
const mainImportButton = document.getElementById('import-note-button');
const closeModalButton = document.getElementById('close-modal-button');
const cancelModalButton = document.getElementById('cancel-modal-button');
const pasteFromClipboardButton = document.getElementById('paste-from-clipboard-button');
const importFromModalButton = document.getElementById('import-from-modal-button');
const clearModalButton = document.getElementById('clear-modal-button');

// Function to open the modal
const openImportModal = () => {
    modalBackdrop.classList.add('modal-visible');
	    pasteTextarea.value = ''; // Set the textarea's value to an empty string when opening (clear)
};

// Function to close the modal
const closeImportModal = () => {
    modalBackdrop.classList.remove('modal-visible');
};


// Add a listener to the modal's background.
modalBackdrop.addEventListener('click', (event) => {
    // The 'target' of the event is the specific element that was clicked.
    // We check if the clicked element's ID is 'modal-backdrop'.
    // This ensures that clicks on the modal content (the white box) do NOT close the modal.
    if (event.target.id === 'modal-backdrop') {
        console.log("Clicked outside the modal. Closing.");
        closeImportModal();
    }
});



// --- Wire up the buttons ---

// The main "Import Previous Note..." button now opens the modal.
mainImportButton.addEventListener('click', openImportModal);

// The 'X' and 'Cancel' buttons close the modal.
closeModalButton.addEventListener('click', closeImportModal);
cancelModalButton.addEventListener('click', closeImportModal);

// The "Paste from Clipboard" button
pasteFromClipboardButton.addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        pasteTextarea.value = text;
        console.log("Pasted text from clipboard.");
    } catch (err) {
        console.error('Failed to read clipboard contents: ', err);
        alert('Could not paste from clipboard. This may be due to browser permissions. Please paste manually (Ctrl+V or Cmd+V).');
    }
});

// Clear button
clearModalButton.addEventListener('click', () => {
    pasteTextarea.value = ''; // Set the textarea's value to an empty string
    console.log("Cleared the import textarea.");
});


// The final "Import Text" button runs our logic.
importFromModalButton.addEventListener('click', () => {
    console.log("DEBUG: 'Import Text' button clicked.");
    const textToImport = pasteTextarea.value;
    if (textToImport && textToImport.trim() !== '') {
        runImportLogic(textToImport);
        closeImportModal(); // Close the modal on success
    } else {
        alert("The textbox is empty. Please paste your note first.");
    }
});



// =================================================================
// END: IMPORT CODE
// =================================================================
   
   
   
   
   
   
   
   
   
   
   
           // --- UI & Event Handlers ---


        /**
         * Automatically calculates and sets the priority for a newly activated treatment plan category.
         * Sets it to the next available lower priority level (max_existing_priority + 1), capped at 5.
         */
        const autoSetPriorityForCell = (textarea, prioritySelect) => {
            const key = textarea.dataset.key;
            const parts = key.split('-');
            const className = parts[1]; // "CLASS 3", "CLASS 2", or "CLASS 1"
            
            const table = textarea.closest('table');
            let maxPriority = 0;
            
            // Look at all other select dropdowns belonging to the same classification column
            table.querySelectorAll(`.priority-select[data-key$="-${className}"]`).forEach(sel => {
                if (sel === prioritySelect) return; // Skip our own cell
                
                const cell = sel.closest('.cell-content');
                const txt = cell.querySelector('textarea').value.trim();
                // Only count categories that currently have treatment text entered
                if (txt !== '') {
                    const pri = parseInt(sel.value, 10);
                    if (pri > maxPriority) {
                        maxPriority = pri;
                    }
                }
            });
            
            const nextPriority = Math.min(maxPriority + 1, 5);
            prioritySelect.value = String(nextPriority);
        };





        // --- Textbox Selection-to-Treatment-Plan Logic ---
        const textboxEditorTextarea = document.getElementById('textbox-editor-textarea');
        const selectionActionsDiv = document.getElementById('selection-actions');

        // This function runs when a user clicks one of the "Send To" buttons
        const copySelectedTextToTxPlan = (targetClass) => {
            const selectedText = textboxEditorTextarea.value.substring(textboxEditorTextarea.selectionStart, textboxEditorTextarea.selectionEnd).trim();
            if (!selectedText) return;

            const txPlanElement = document.querySelector('.draggable-element[data-type="tx-plan"]');
            if (!txPlanElement) {
                showFeedback("No Treatment Plan element available", false);
                return;
            }

            const state = getElementState(txPlanElement);
            const key = `${targetClass}`;

            const existingEntry = state.txData[key] || { text: '', priority: 0 };
            const newText = existingEntry.text ? `${existingEntry.text}, ${selectedText}` : selectedText;
            
            // --- AUTOMATIC PRIORITIZATION LOGIC ---
            let newPriority;
            if (existingEntry.priority > 0 && existingEntry.text.trim() !== '') {
                // If this category already has treatment content, keep its current priority.
                newPriority = existingEntry.priority;
            } else {
                // If it is a newly added category (was empty or didn't exist), set to the next available lower level.
                const parts = key.split('-');
                const className = parts[1]; // "CLASS 3", "CLASS 2", or "CLASS 1"
                
                let maxPriority = 0;
                for (const k in state.txData) {
                    if (k.endsWith(`-${className}`) && k !== key) {
                        const entry = state.txData[k];
                        if (entry && entry.text && entry.text.trim() !== '') {
                            const pri = parseInt(entry.priority, 10);
                            if (pri > maxPriority) {
                                maxPriority = pri;
                            }
                        }
                    }
                }
                newPriority = Math.min(maxPriority + 1, 5);
            }

            state.txData[key] = { text: newText, priority: newPriority };

            txPlanElement.dataset.txData = JSON.stringify(state.txData);
            updateTxPlanSummary(txPlanElement);
            updateLiveOutput();
            showFeedback("Copied to Treatment Plan!");
            parseTreatmentPlanForHighlighting(); // Re-parse the updated plan
            updateBackdropMirror();              // Repaint the highlights instantly
        };

        
        // Listen for clicks on any of our new action buttons
        selectionActionsDiv.addEventListener('click', (e) => {
            if (e.target.classList.contains('selection-action-btn')) {
                copySelectedTextToTxPlan(e.target.dataset.targetClass);
            }
        });

        // Listen for any change in text selection within the document
        document.addEventListener('selectionchange', () => {
            const selection = window.getSelection();
            const isTextareaFocused = document.activeElement === textboxEditorTextarea;
            
            // Show the action bar only if the textarea is focused and has selected text - 06NOV change the else from 'none' to 'block' to keep visible
            if (isTextareaFocused && selection.toString().trim().length > 0) {
                selectionActionsDiv.style.display = 'block';
            } else {
                selectionActionsDiv.style.display = 'block';
            }
        });
        
        // **** END OF REPLACEMENT JAVASCRIPT ****
   
   
   
// =================================================================
// The `openTextboxEditor` Function
// =================================================================
const openTextboxEditor = (element) => {
    activeElementForEditor = element;
    const state = getElementState(element);
    const textarea = document.getElementById('textbox-editor-textarea');
    const select = document.getElementById('textbox-editor-select');

    // 1. When the modal opens, "stage" the current content in our isolated variable.
    stagedContentChange = state.content;
    textarea.value = stagedContentChange;


    // ======== START HIGHLIGHT EVENT BINDING ========
    // A. Parse the current treatment plan
    parseTreatmentPlanForHighlighting();
    // B. Do the initial paint of the backdrop mirror
    updateBackdropMirror();

    // C. Update mirror on input
    textarea.oninput = () => {
        stagedContentChange = textarea.value;
        updateBackdropMirror(); // <-- ADD THIS
    };

    // D. Sync scrolling perfectly
    textarea.onscroll = () => {
        if (mirror) mirror.scrollTop = textarea.scrollTop;
    };
    // ============================================


    // 2. As the user types, ONLY update the staging variable. This is safe from background syncs.
    textarea.oninput = () => {
        stagedContentChange = textarea.value;
    };
    
    // 3. Populate the dropdown as before.
    select.innerHTML = '';
    if (state.dropdownOptions && Array.isArray(state.dropdownOptions)) {
        state.dropdownOptions.forEach(opt => select.add(new Option(opt, opt)));
    }
    
    textboxEditorModal.style.display = 'block';
    textarea.focus();
    if (textarea.value === activeElementForEditor.dataset.defaultText) {
        textarea.select();
    }
};
// =================================================================

																													  
document.getElementById('textbox-editor-add-btn').onclick = () => { if (!activeElementForEditor) return; const textarea = document.getElementById('textbox-editor-textarea'); const select = document.getElementById('textbox-editor-select'); const defaultText = activeElementForEditor.dataset.defaultText; const selectedValue = select.value.replace(/\\n/g, '\n'); if (!selectedValue) return; if (textarea.value === defaultText || textarea.value.trim() === '') { textarea.value = selectedValue; } else { textarea.value += `, ${selectedValue}`; }
    stagedContentChange = textarea.value;
 }; 



document.getElementById('textbox-editor-replace-btn').onclick = () => {
    if (!activeElementForEditor) return;
    const textarea = document.getElementById('textbox-editor-textarea');
    const select = document.getElementById('textbox-editor-select');

    // Get the selected value and replace the user-typed '\\n' with a real newline character.
    const selectedValue = select.value.replace(/\\n/g, '\n');

    // This is a standard textarea, so we can just assign the processed value directly.
    textarea.value = selectedValue;
	stagedContentChange = textarea.value;
};


// **** START OF NEW CODE for double click**** 
// Add double-click functionality to the dropdown list 
document.getElementById('textbox-editor-select').addEventListener('dblclick', (e) => { 
// Trigger the same logic as the 'Add' --> replace button 
document.getElementById('textbox-editor-replace-btn').click(); }); 
// **** END OF NEW CODE ****
   

// **** START OF NEW CODE for tx plan ****
        // --- Treatment Plan Modal Logic ---
        const txPlanModal = document.getElementById('tx-plan-modal');

        // **** START OF REPLACEMENT CODE with upgraded visibility ****

        const openTxPlanEditor = (element) => {
            activeElementForEditor = element;
            const state = getElementState(element);
            const table = txPlanModal.querySelector('#tx-plan-table');
            table.innerHTML = ''; // Clear old content

            // Header
            const thead = table.createTHead();
            const headerRow = thead.insertRow();
            headerRow.innerHTML = '<th>Department</th><th>CLASS 3</th><th>CLASS 2</th><th>CLASS 1</th>';

            // Snippet Options HTML
            const snippetOptionsHtml = state.txSnippets.map(opt => `<option value="${opt}">${opt}</option>`).join('');

            // Body
            const tbody = table.createTBody();
            state.txRows.forEach(rowName => {
                const row = tbody.insertRow();
                // Change 1: Add a class to the row header cell
                row.insertCell().outerHTML = `<td class="tx-row-header">${rowName}</td>`;

                ["CLASS 3", "CLASS 2", "CLASS 1"].forEach(className => {
                    const cell = row.insertCell();
                    const key = `${rowName}-${className}`;
                    const data = state.txData[key] || { text: '', priority: 1 };
                    
                    let priorityOptions = '<option value="0">--</option>';
                    for(let i = 1; i <= 5; i++) {
                        priorityOptions += `<option value="${i}" ${data.priority === i ? 'selected' : ''}>${i}</option>`;
                    }

                    // Change 2: Add the "Priority Level" label and the `has-content` class if needed
                    const hasContentClass = data.text ? 'has-content' : '';
                    cell.innerHTML = `
                        <div class="cell-content">
                            <div>
                                <label class="priority-label">Priority Level</label>
                                <select class="priority-select" data-key="${key}">${priorityOptions}</select>
                            </div>
                            <textarea class="${hasContentClass}" data-key="${key}">${data.text}</textarea>
                            <select class="snippet-select"><option value="">-- Add Snippet --</option>${snippetOptionsHtml}</select>
                        </div>
                    `;
                });
            });

            // Snippet adding, has-content logic, and auto-prioritization
            tbody.addEventListener('change', e => {
                if (e.target.classList.contains('snippet-select')) {
                    const select = e.target;
                    if (select.value) {
                        const cellContent = select.closest('.cell-content');
                        const textarea = cellContent.querySelector('textarea');
                        const prioritySelect = cellContent.querySelector('.priority-select');
                        
                        // Check if the cell was completely blank before this action
                        const isPreviouslyEmpty = (textarea.value.trim() === '');
                        
                        textarea.value += (textarea.value.trim() ? ', ' : '') + select.value;
                        textarea.classList.add('has-content'); // Add class when snippet is added
                        select.selectedIndex = 0;
                        
                        // Automatically set priority to next lower level if it was previously empty
                        if (isPreviouslyEmpty) {
                            autoSetPriorityForCell(textarea, prioritySelect);
                        }
                    }
                }
            });

            // Input event listener to toggle the green border and auto-prioritize on typing
            tbody.addEventListener('input', e => {
                if (e.target.tagName === 'TEXTAREA') {
                    const textarea = e.target;
                    const cellContent = textarea.closest('.cell-content');
                    const prioritySelect = cellContent.querySelector('.priority-select');
                    
                    // We check if it is a transition from empty to active
                    const isPreviouslyEmpty = !textarea.classList.contains('has-content') && (textarea.value.trim() !== '');
                    
                    if (textarea.value.trim() !== '') {
                        textarea.classList.add('has-content');
                        // Automatically set priority to next lower level if this is a newly typed category
                        if (isPreviouslyEmpty) {
                            autoSetPriorityForCell(textarea, prioritySelect);
                        }
                    } else {
                        textarea.classList.remove('has-content');
                    }
                }
            });

            txPlanModal.style.display = 'block';
	
        };

        // **** END OF REPLACEMENT CODE ****

        document.getElementById('tx-plan-save-btn').onclick = () => {
            if (!activeElementForEditor) return;
            const newData = {};
            txPlanModal.querySelectorAll('tbody .cell-content').forEach(cellContent => {
                const textarea = cellContent.querySelector('textarea');
                const prioritySelect = cellContent.querySelector('.priority-select');
                const key = textarea.dataset.key;
                const priority = parseInt(prioritySelect.value, 10);
                const text = textarea.value.trim();
                
                if (text && priority > 0) {
                    newData[key] = { text, priority };
                }
            });
            activeElementForEditor.dataset.txData = JSON.stringify(newData);
            updateTxPlanSummary(activeElementForEditor);
            updateLiveOutput();

            txPlanModal.style.display = 'none';
        };

        // --- Treatment Plan Properties ---
        const openTxPlanProperties = (state, body) => {
            return `
                <fieldset>
                    <legend>Treatment Plan Rows</legend>
                    <label>(one per line)</label>
                    <textarea id="prop-tx-rows" rows="8">${state.txRows.join('\n')}</textarea>
                </fieldset>
                <fieldset>
                    <legend>Quick-Add Snippets</legend>
                    <label>(one per line)</label>
                    <textarea id="prop-tx-snippets" rows="6">${state.txSnippets.join('\n')}</textarea>
                </fieldset>
            `;
        };
        
        const saveTxPlanProperties = (newState, element) => {
            newState.txRows = document.getElementById('prop-tx-rows').value.split('\n').filter(line => line.trim() !== '');
            newState.txSnippets = document.getElementById('prop-tx-snippets').value.split('\n').filter(line => line.trim() !== '');
            newState.txData = {}; // Reset data when properties change
        };
        // **** END OF NEW CODE ****


   

// =================================================================
// Textbox Save Button (No Transaction Needed)
// =================================================================
document.getElementById('textbox-editor-save-btn').onclick = () => {
    if (!activeElementForEditor) return;

    const editedElementId = activeElementForEditor.dataset.originalId;

    const newContent = stagedContentChange !== null ? stagedContentChange : document.getElementById('textbox-editor-textarea').value;
    activeElementForEditor.dataset.content = newContent;
    const preview = activeElementForEditor.querySelector('.enhanced-textbox-preview');
    if (preview) preview.textContent = newContent;
    stagedContentChange = null;
    document.getElementById('textbox-editor-textarea').oninput = null;
    document.getElementById('textbox-editor-modal').style.display = 'none';

    // 1. If caries fields were updated, re-evaluate Caries Risk
    if (editedElementId === "2-5" || editedElementId === "2-6") {
        console.log("Caries-related field was updated. Re-evaluating Caries Risk...");
        checkAndSetCariesRisk();
    }
    
    // 2. Pass 'true' to trigger an INSTANT save to Firestore!
    console.log("DEBUG: Modal saved. Triggering IMMEDIATE cloud sync.");
    updateLiveOutput(true); 

    const noteText = document.getElementById('live-output').value;
    evaluateNote(noteText);
};

// =================================================================







        const anestheticEditorModal = document.getElementById('anesthetic-editor-modal'); const openAnestheticEditor = (element) => { activeElementForEditor = element; const state = getElementState(element); const listDiv = document.getElementById('anesthetic-editor-list'); listDiv.innerHTML = ''; document.getElementById('anesthetic-topical-check').checked = state.includeTopical; state.anestheticTypes.forEach(type => { const currentValue = state.anestheticValues[type.name] || 0; const row = document.createElement('div'); row.className = 'anesthetic-row'; row.innerHTML = `<label>${type.name}</label><input type="number" value="${currentValue}" min="0" step="0.25" data-name="${type.name}">`; listDiv.appendChild(row); }); anestheticEditorModal.style.display = 'block'; }; document.getElementById('anesthetic-editor-save-btn').onclick = () => { if (!activeElementForEditor) return; const newValues = {}; document.querySelectorAll('#anesthetic-editor-list input').forEach(input => { newValues[input.dataset.name] = parseFloat(input.value) || 0; }); activeElementForEditor.dataset.anestheticValues = JSON.stringify(newValues); activeElementForEditor.dataset.includeTopical = document.getElementById('anesthetic-topical-check').checked; updateAnestheticSummary(activeElementForEditor); updateLiveOutput(); anestheticEditorModal.style.display = 'none'; }; const createAnestheticTypeRow = (type = {name: '', mg: '', epi: ''}) => { const row = document.createElement('div'); row.className = 'prop-anesthetic-row'; row.innerHTML = `<input type="text" class="prop-anesthetic-name" value="${type.name}" placeholder="Name"> <input type="number" class="prop-anesthetic-mg" value="${type.mg}" placeholder="mg/carp"> <input type="number" class="prop-anesthetic-epi" value="${type.epi}" placeholder="epi/carp"> <span class="remove-btn">✖</span>`; row.querySelector('.remove-btn').onclick = () => row.remove(); return row; };
        const endoModal = document.getElementById('endo-testing-modal'); const openEndoTestingEditor = (element) => { activeElementForEditor = element; const state = getElementState(element); const tableHead = endoModal.querySelector('thead'); const tableBody = endoModal.querySelector('tbody'); tableHead.innerHTML = ''; tableBody.innerHTML = ''; const headerRow = document.createElement('tr'); headerRow.innerHTML = '<th>Test</th>'; const teethToDisplay = [...state.endoData.teeth]; if (teethToDisplay.length === 0 || teethToDisplay[teethToDisplay.length - 1] !== '') { teethToDisplay.push(''); } teethToDisplay.forEach((tooth, index) => { headerRow.innerHTML += `<th><input type="text" value="${tooth}" class="endo-tooth-input" data-index="${index}" placeholder="#"></th>`; }); tableHead.appendChild(headerRow); state.endoTests.forEach(testName => { const testRow = document.createElement('tr'); testRow.innerHTML = `<td>${testName}</td>`; teethToDisplay.forEach((_, index) => { const result = state.endoData.results[testName]?.[index] || ''; testRow.innerHTML += `<td><input type="text" value="${result}" data-test="${testName}" data-index="${index}"></td>`; }); tableBody.appendChild(testRow); }); endoModal.style.display = 'block'; }; document.getElementById('endo-range-add-btn').onclick = () => { if (!activeElementForEditor) return; const rangeInput = document.getElementById('endo-range-input'); const newTeeth = parseToothRange(rangeInput.value); const state = getElementState(activeElementForEditor); const existingTeeth = new Set(state.endoData.teeth.filter(t => t && t.trim() !== '')); newTeeth.forEach(t => existingTeeth.add(t)); const sortedTeeth = Array.from(existingTeeth).sort((a,b)=>a-b); state.endoData.teeth = sortedTeeth; activeElementForEditor.dataset.endoData = JSON.stringify(state.endoData); openEndoTestingEditor(activeElementForEditor); rangeInput.value = ''; }; document.getElementById('endo-testing-save-btn').onclick = () => { if (!activeElementForEditor) return; const teeth = Array.from(endoModal.querySelectorAll('.endo-tooth-input')).map(input => input.value.trim()); const results = {}; endoModal.querySelectorAll('tbody input').forEach(input => { const test = input.dataset.test; const index = parseInt(input.dataset.index, 10); if (!results[test]) { results[test] = []; } results[test][index] = input.value; }); activeElementForEditor.dataset.endoData = JSON.stringify({ teeth, results }); updateEndoTestingSummary(activeElementForEditor); updateLiveOutput(); endoModal.style.display = 'none'; };
        const openPropertiesModal = (element) => {
            const state = getElementState(element); const body = document.getElementById('properties-body'); let mainPropsHtml = '', formattingHtml = '', generalPropsHtml = '';
            if (state.type === 'enhanced-textbox') { mainPropsHtml = `<fieldset><legend>Labels & Text</legend><label for="prop-internal-label">Internal Label (for maker only)</label><input type="text" id="prop-internal-label" value="${state.internalLabel}"><label for="prop-prefix-label">Prefix Label (for note output)</label><input type="text" id="prop-prefix-label" value="${state.prefixLabel}"><label for="prop-default-text">Default Text</label><input type="text" id="prop-default-text" value="${state.defaultText}"></fieldset><fieldset><legend>Dropdown Phrases</legend><label for="prop-dropdown-options">(one per line)</label><textarea id="prop-dropdown-options" rows="6">${state.dropdownOptions.join('\n')}</textarea></fieldset>`; }
            else if (state.type === 'anesthetic') { mainPropsHtml = `<fieldset><legend>Anesthetic Types</legend><div id="prop-anesthetic-types"></div><button id="prop-add-anesthetic-type" class="control-btn" style="margin-top:10px;">+ Add Type</button></fieldset>`; }

            // **** START OF NEW CODE for tx plan****
            else if (state.type === 'tx-plan') { mainPropsHtml = openTxPlanProperties(state, body); }
            // **** END OF NEW CODE ****



   
            else if (state.type === 'endo-testing') { mainPropsHtml = `<fieldset><legend>Test Rows</legend><label>(one per line)</label><textarea id="prop-endo-tests" rows="8">${state.endoTests.join('\n')}</textarea></fieldset>`; }
            else if (state.type === 'bloodpressure') { mainPropsHtml = `<fieldset><legend>Discussion Threshold</legend><label>Systolic &ge;:</label><input type="number" id="prop-discuss-s" value="${state.discussSystolic}"><label>Diastolic &ge;:</label><input type="number" id="prop-discuss-d" value="${state.discussDiastolic}"></fieldset><fieldset><legend>"Prior to Tx" Checkbox Trigger</legend><label>Systolic &ge;:</label><input type="number" id="prop-checkbox-s" value="${state.checkboxSystolic}"><label>Diastolic &ge;:</label><input type="number" id="prop-checkbox-d" value="${state.checkboxDiastolic}"></fieldset>`; }
            else if (state.type === 'dropdown') { mainPropsHtml = `<label><input type="checkbox" id="prop-required" ${state.required ? 'checked' : ''}> Required</label><hr><fieldset><legend>Dropdown Options</legend><label for="prop-options">(one per line)</label><textarea id="prop-options" rows="6">${state.options.join('\n')}</textarea></fieldset>`; }
            else if (state.type === 'alert' || state.type === 'painscale' || state.type === 'checkbox') { mainPropsHtml = `<label><input type="checkbox" id="prop-required" ${state.required ? 'checked' : ''}> Required</label>`; }

    // --- Formatting Properties  ---

    if (state.type !== 'formatter' && !state.type.startsWith('label-')) { 
        formattingHtml = `<fieldset><legend>Formatting</legend>
            <label><input type="checkbox" id="prop-prefix-newline" ${state.prefixNewline ? 'checked' : ''}> Add Newline Before</label>
            <label><input type="checkbox" id="prop-prefix-tab" ${state.prefixTab ? 'checked' : ''}> Add Tab Before</label>
            <label><input type="checkbox" id="prop-suffix-newline" ${state.suffixNewline ? 'checked' : ''}> Add Newline After</label>
        </fieldset>`; 
    }



            generalPropsHtml = `<fieldset><legend>General Options</legend><label><input type="checkbox" id="prop-hidden" ${state.isHidden ? 'checked' : ''}> Hidden by default</label><label><input type="checkbox" id="prop-no-reset" ${state.doNotReset ? 'checked' : ''}> Do not reset this element</label></fieldset>`;




            // **** START OF REPLACEMENT CODE for width and color ****
            if (state.type !== 'formatter') {
                // Build the color options for the dropdown
                let colorOptions = COLOR_PALETTE.map(color => 
                    `<option value="${color.value}" ${state.fillColor === color.value ? 'selected' : ''}>${color.name}</option>`
                ).join('');

                generalPropsHtml = `
                <fieldset><legend>Sizing & Display</legend>
                    <label>Fill Color: 
                        <select id="prop-fill-color">
                            ${colorOptions}
                        </select>
                    </label>
                    <label style="margin-top: 10px;">Custom Width: <input type="text" id="prop-width" placeholder="e.g., 250px or 48%" value="${state.width || ''}"></label>
                    <hr style="margin:10px 0;">
                    <label><input type="checkbox" id="prop-hidden" ${state.isHidden ? 'checked' : ''}> Hidden by default</label>
                    <label><input type="checkbox" id="prop-no-reset" ${state.doNotReset ? 'checked' : ''}> Do not reset this element's value</label>
                </fieldset>`;
            } else {
                generalPropsHtml = '';
            }
            // **** END OF REPLACEMENT CODE for width and color ****




            body.innerHTML = mainPropsHtml + formattingHtml + generalPropsHtml; if (state.type === 'anesthetic') { const container = document.getElementById('prop-anesthetic-types'); state.anestheticTypes.forEach(type => container.appendChild(createAnestheticTypeRow(type))); document.getElementById('prop-add-anesthetic-type').onclick = () => container.appendChild(createAnestheticTypeRow()); } document.getElementById('properties-modal').style.display = 'block'; document.getElementById('properties-save-btn').onclick = () => saveProperties(element);
        };
        const saveProperties = (element) => {
            const oldState = getElementState(element); const newState = { ...oldState };
            if (newState.type === 'enhanced-textbox') { newState.internalLabel = document.getElementById('prop-internal-label').value; newState.prefixLabel = document.getElementById('prop-prefix-label').value; newState.defaultText = document.getElementById('prop-default-text').value; newState.dropdownOptions = document.getElementById('prop-dropdown-options').value.split('\n').filter(Boolean); if (oldState.content === oldState.defaultText) { newState.content = newState.defaultText; } }
            else if (newState.type === 'anesthetic') { const newTypes = []; document.querySelectorAll('#prop-anesthetic-types .prop-anesthetic-row').forEach(row => { const name = row.querySelector('.prop-anesthetic-name').value.trim(); const mg = parseFloat(row.querySelector('.prop-anesthetic-mg').value); const epi = parseFloat(row.querySelector('.prop-anesthetic-epi').value); if (name && !isNaN(mg) && !isNaN(epi)) { newTypes.push({ name, mg, epi }); } }); newState.anestheticTypes = newTypes; newState.anestheticValues = {}; }

            // **** START OF NEW CODE for tx plan****
            else if (newState.type === 'tx-plan') { saveTxPlanProperties(newState, element); }
            // **** END OF NEW CODE ****
   
            else if (newState.type === 'endo-testing') { newState.endoTests = document.getElementById('prop-endo-tests').value.split('\n').filter(line => line.trim() !== ''); const currentData = JSON.parse(element.dataset.endoData); newState.endoData = { teeth: currentData.teeth, results: {} }; }
            else if (newState.type === 'bloodpressure') { newState.discussSystolic = document.getElementById('prop-discuss-s').value; newState.discussDiastolic = document.getElementById('prop-discuss-d').value; newState.checkboxSystolic = document.getElementById('prop-checkbox-s').value; newState.checkboxDiastolic = document.getElementById('prop-checkbox-d').value; }
            else if (newState.type === 'dropdown') { newState.required = document.getElementById('prop-required').checked; newState.options = document.getElementById('prop-options').value.split('\n').filter(Boolean); newState.selected = newState.options[0] || ''; }
            else if(newState.type === 'painscale' || newState.type === 'alert' || newState.type === 'checkbox') { newState.required = document.getElementById('prop-required').checked; }
            newState.isHidden = document.getElementById('prop-hidden').checked; newState.doNotReset = document.getElementById('prop-no-reset').checked;

            // **** START OF CODE for width****
            const widthInput = document.getElementById('prop-width');
            if (widthInput) {
                newState.width = widthInput.value.trim();
            }
            // **** END OF width CODE ****


            // **** START OF color CODE ****
            const colorSelect = document.getElementById('prop-fill-color');
            if (colorSelect) {
                // If the selected color is the default, save an empty string to keep the JSON clean.
                // Otherwise, save the selected color value.
                newState.fillColor = colorSelect.value === COLOR_PALETTE[0].value ? '' : colorSelect.value;
            }
            // **** END OF color CODE ****




            if (newState.type !== 'formatter' && !newState.type.startsWith('label-')) { const pnl = document.getElementById('prop-prefix-newline'); if (pnl) {newState.prefixNewline = pnl.checked; newState.prefixTab = document.getElementById('prop-prefix-tab').checked; newState.suffixNewline = document.getElementById('prop-suffix-newline').checked;} }
            const newElement = createElement(newState.type, newState); element.replaceWith(newElement); updateLiveOutput(); document.getElementById('properties-modal').style.display = 'none';
        };
        const allergyModal = document.getElementById('allergy-modal'); const allergyListDiv = document.getElementById('allergy-list'); ALLERGY_LIST.forEach(allergy => { allergyListDiv.innerHTML += `<label><input type="checkbox" class="allergy-checkbox" value="${allergy}"> ${allergy}</label>`; }); allergyListDiv.addEventListener('change', e => { if (!e.target.classList.contains('allergy-checkbox')) return; const checkboxes = Array.from(allergyListDiv.querySelectorAll('.allergy-checkbox')); const noneCheckbox = checkboxes.find(cb => cb.value === "None"); if (e.target.value === "None" && e.target.checked) { checkboxes.forEach(cb => { if (cb.value !== "None") cb.checked = false; }); } else if (e.target.value !== "None" && e.target.checked) { if (noneCheckbox.checked) noneCheckbox.checked = false; } }); const openAllergyModal = (element) => { activeElementForEditor = element; const state = getElementState(element); const checkboxes = allergyModal.querySelectorAll('.allergy-checkbox'); checkboxes.forEach(cb => cb.checked = false); const customInput = document.getElementById('custom-allergy-input'); customInput.value = ''; state.alerts.forEach(alert => { const cb = Array.from(checkboxes).find(c => c.value === alert); if (cb) { cb.checked = true; } else if (alert.startsWith('Custom: ')) { customInput.value = alert.substring(8); } }); allergyModal.style.display = 'block'; }; 

document.getElementById('allergy-save-btn').onclick = () => {
    if (!activeElementForEditor) return;

    // 1. Set the 'isRenderingFromCloud' flag to true. This immediately blocks
    //    the onSnapshot listener from overwriting any changes.
    isRenderingFromCloud = true;

    // 2. Gather the data from the modal.
    const selected = [];
    const checkboxes = allergyModal.querySelectorAll('.allergy-checkbox:checked');
    checkboxes.forEach(cb => selected.push(cb.value));
    const customValue = document.getElementById('custom-allergy-input').value.trim();
    if (customValue) {
        selected.push(`Custom: ${customValue}`);
    }

    // 3. Update the local element's dataset directly.
    if (selected.includes("None")) {
        activeElementForEditor.dataset.alerts = JSON.stringify(["None"]);
    } else {
        activeElementForEditor.dataset.alerts = JSON.stringify(selected.filter(a => a !== "None"));
    }

    // 4. Update the UI and close the modal.
    updateAlertElementUI(activeElementForEditor);
    allergyModal.style.display = 'none';

    // 5. Call updateLiveOutput(). This will now queue the correct data to be sent to Firestore.
    updateLiveOutput();
    
    // 6. IMPORTANT: Immediately after calling the save, release the lock so
    //    the app can receive real-time updates again.
    isRenderingFromCloud = false;

    showFeedback("Alerts saved.", true);
};

   
   
   
   
   
   
   
   
 
// end copy of a bunch of functions







// --- 3. The NEW Firebase-Aware Logic startup cascade ---

// --- 1. State Variables ---
console.log("DEBUG: Initializing Firebase state variables...");
let unsubscribeFromNote = null;
let currentNoteId = null;
let isRenderingFromCloud = false;


// --- 2. UI Element References ---
const userStatusEmail = document.getElementById('user-email');
const logoutButton = document.getElementById('logout-button');
const viewTechnicianStart = document.getElementById('view-technician-start');
const viewDoctorLogin = document.getElementById('view-doctor-login');
const viewDoctorDashboard = document.getElementById('view-doctor-dashboard');
const viewNoteEditor = document.getElementById('view-note-editor');
const techNameInput = document.getElementById('tech-name-input');
const startDayButton = document.getElementById('start-day-button');
const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const loginButton = document.getElementById('login-button');
const signupButton = document.getElementById('signup-button');
const noteList = document.getElementById('note-list');
const saveCopyButton = document.getElementById('save-copy-button');
const showDoctorLoginBtn = document.getElementById('show-doctor-login-btn');

// --- 3. Core Functions ---

const showView = (viewName) => {
    console.log(`%cDEBUG: showView() called. Attempting to show: '${viewName}'`, "color: cyan;");
    [viewTechnicianStart, viewDoctorLogin, viewDoctorDashboard, viewNoteEditor].forEach(v => v.classList.add('view-hidden'));
    const viewToShow = document.getElementById(viewName);
    if (viewToShow) viewToShow.classList.remove('view-hidden');
};

const listenForActiveNotes = () => {
    console.log("DEBUG: Listening for active notes for doctor dashboard...");
    db.collection('live_notes').orderBy('lastUpdated', 'desc').limit(10).onSnapshot(snapshot => {
        noteList.innerHTML = snapshot.empty ? '<li>No active notes found.</li>' : '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const date = data.lastUpdated?.toDate().toLocaleString() || 'No date';
            // 1. Find the technician name element within the document's data.
            const techNameElement = data.footer?.find(el => el.originalId === "5-0");
            
            // 2. Get the name from the element's content, or default to "Unknown Tech".
            const technicianName = techNameElement?.content.trim() || 'Unknown Tech';
            
            const li = document.createElement('li');
            
            // 3. Use the technician's NAME for display, but the unique ID for functionality.
            li.innerHTML = `<span>Note for: <b>${technicianName}</b></span><small>Last Update: ${date}</small>`;
            li.dataset.noteId = doc.id; // The unique ID is still stored here for the click event.
            
            li.addEventListener('click', () => startEditingSession(doc.id));
            noteList.appendChild(li);
        });
    });
};


/**
 * Listens for changes in the history_notes collection and populates the doctor's history dashboard.
 */
const listenForHistoryNotes = () => {
    console.log("DEBUG: Listening for archived history notes for doctor dashboard...");
    const historyNoteList = document.getElementById('history-note-list');

    db.collection('history_notes').orderBy('timestamp', 'desc').limit(20).onSnapshot(snapshot => {
        historyNoteList.innerHTML = snapshot.empty ? '<li>No archived notes found.</li>' : '';
        snapshot.forEach(doc => {
            const data = doc.data();
            const date = data.timestamp?.toDate().toLocaleString() || 'No date';
            
            const li = document.createElement('li');
            // Display the technician's name and the archive date
            li.innerHTML = `<span>Note for: <b>${data.technicianName}</b></span><small>Last Update: ${date}</small>`;
            li.dataset.historyDocId = doc.id; // Store the document ID

            // --- THIS IS THE KEY ---
            // The click handler takes a different path than live notes.
            li.onclick = async () => {
                console.log(`Loading history note: ${doc.id}`);
                
                // 1. Ensure any live session is disconnected.
                if (unsubscribeFromNote) {
                    unsubscribeFromNote();
                    unsubscribeFromNote = null;
                }
                currentNoteId = null; // IMPORTANT: Prevent any accidental writes.

                // 2. Fetch the single, specific historical document.
                const historyDoc = await db.collection('history_notes').doc(doc.id).get();
                if (historyDoc.exists) {
                    // 3. Render the state from the 'noteData' field within the history document.
                    renderState(historyDoc.data().noteData);
                    showView('view-note-editor');
                    showFeedback("Viewing historical note. Edits will not be saved.", true);
                } else {
                    alert("Could not find the selected historical note.");
                }
            };
            historyNoteList.appendChild(li);
        });
    });
};


        /**
         * Silently fetches the clinic template from Firestore or the local fallback
         * and populates the in-memory lastLoadedState blueprint.
         */
        const fetchAndSetTemplateState = async (templateId) => {
            console.log(`DEBUG: Silently fetching default template state for: "${templateId}"`);
            try {
                let templateState;
                if (templateId === 'BUILT_IN') {
                    templateState = JSON.parse(document.getElementById('default-json-data').textContent);
                } else {
                    const doc = await db.collection('clinic_templates').doc(templateId).get();
                    if (doc.exists) {
                        templateState = doc.data().templateData;
                    } else {
                        console.warn(`Template "${templateId}" not found in Firestore. Falling back to built-in template.`);
                        templateState = JSON.parse(document.getElementById('default-json-data').textContent);
                    }
                }
                lastLoadedState = JSON.parse(JSON.stringify(templateState));
                console.log("DEBUG: lastLoadedState successfully restored in background.");
            } catch (error) {
                console.error("Error restoring default template for reset operations:", error);
            }
        };






const startEditingSession = (noteId) => {
    console.log(`DEBUG: Starting editing session for note: "${noteId}"`);
    currentNoteId = noteId;
    if (unsubscribeFromNote) unsubscribeFromNote();
    
    showView('view-note-editor');
    const noteDocRef = db.collection('live_notes').doc(noteId);
    
        unsubscribeFromNote = noteDocRef.onSnapshot(async doc => {
        const isModalOpen = !!document.querySelector('.modal[style*="display: block"]');
    
        if (isModalOpen) {
            console.log("DEBUG: A modal is open. Deferring real-time update to prevent data loss.");
            return;
        }
	
        console.log(`DEBUG: Real-time update received for note "${noteId}".`);
        if (doc.exists) {
            const docData = doc.data();
            const docTemplateId = docData.templateId || 'BUILT_IN';

            // --- SELF-HEALING STATE RECOVERY ---
            // If the local variable is null (e.g. from page reload, or doctor editing),
            // silently restore the template in the background.
            if (!lastLoadedState || activeTemplateId !== docTemplateId) {
                activeTemplateId = docTemplateId;
                await fetchAndSetTemplateState(docTemplateId);
            }

            // Set the flag to true BEFORE rendering.
            isRenderingFromCloud = true;
            reconcileState(docData);
            // Set the flag back to false immediately after.
            isRenderingFromCloud = false;
			
        } else {
            console.log(`DEBUG: Note "${noteId}" does not exist. Creating it.`);
            loadDefaults(noteId);
        }
    });
};



// This REPLACES old `saveCurrentStateToLocalStorage` function.
const syncStateToFirestore = (forceImmediate = false) => {
    if (isRenderingFromCloud) {
        console.log("DEBUG: Suppressing Firestore sync because a cloud render is in progress.");
        return;
    }

    if (!currentNoteId) return;
    clearTimeout(window.firestoreSaveTimeout);

    const saveAction = () => {
        const stateToSave = {};
        SECTIONS.forEach(id => {
            stateToSave[id] = [];
            document.querySelector(`.dropzone[data-section-id="${id}"]`)
                .querySelectorAll('.draggable-element').forEach(el => stateToSave[id].push(getElementState(el)));
        });
        stateToSave.lastUpdated = firebase.firestore.FieldValue.serverTimestamp();
        
        // Preserve the session's active template ID metadata
        if (activeTemplateId) {
            stateToSave.templateId = activeTemplateId;
        }
        
        db.collection('live_notes').doc(currentNoteId).set(stateToSave, { merge: true });
    };

    // If forceImmediate is true, save right away. Otherwise, wait 3 seconds.
    if (forceImmediate) {
        console.log("DEBUG: Bypassing delay. Writing to Firestore instantly!");
        saveAction();
    } else {
        window.firestoreSaveTimeout = setTimeout(saveAction, 3000);
    }
};



// =================================================================
// Data Reconciliation Function
// This function surgically updates the DOM instead of re-rendering it.
// =================================================================


const reconcileState = (newState) => {
    console.log("DEBUG: Reconciling DOM with new cloud state...");
    let changed = false;

    // This is a helper function to update an element without replacing it.
    const surgicallyUpdateElement = (element, newStateItem) => {
        // Update all dataset properties. This is safe and preserves the element.
        for (const key in newStateItem) {
            const value = newStateItem[key];
            if (typeof value === 'object') {
                element.dataset[key] = JSON.stringify(value);
            } else {
                element.dataset[key] = value;
            }
        }
        // Now, call the specific UI refresh function for this element type.
        // This is the key to updating the view without destroying the element.
        if (newStateItem.type === 'enhanced-textbox') {
            updateEnhancedTextboxUI(element); // We'll create this small helper
        } 
		
		else if (newStateItem.type === 'painscale') {
        // For the pain scale, we need to update both the visible number
        // and the position of the range slider itself.
        console.log(`DEBUG: Surgically updating Pain Scale element (originalId: ${newStateItem.originalId})`);
        
        const valueDisplay = element.querySelector('.pain-value');
        const slider = element.querySelector('.pain-slider');

        // Update the values only if they have actually changed.
        if (valueDisplay && valueDisplay.textContent !== `${newStateItem.value}/10`) {
            valueDisplay.textContent = `${newStateItem.value}/10`;
        }
        if (slider && slider.value !== newStateItem.value) {
            slider.value = newStateItem.value;
        }
		}
		
		
		else if (newStateItem.type === 'bloodpressure') {
        // For a blood pressure element, we need to update the values
        // of the two input fields and the checkbox.
        console.log(`DEBUG: Surgically updating Blood Pressure element (originalId: ${newStateItem.originalId})`);
        
        const systolicInput = element.querySelector('.bp-systolic');
        const diastolicInput = element.querySelector('.bp-diastolic');
        const priorTxCheckbox = element.querySelector('.bp-prior-tx-check');

        // Update the values only if they are different to prevent losing focus unnecessarily.
        if (systolicInput.value !== newStateItem.systolic) {
            systolicInput.value = newStateItem.systolic || '';
        }
        if (diastolicInput.value !== newStateItem.diastolic) {
            diastolicInput.value = newStateItem.diastolic || '';
        }
        if (priorTxCheckbox.checked !== newStateItem.isPriorTxChecked) {
            priorTxCheckbox.checked = newStateItem.isPriorTxChecked;
        }

        // Finally, call your existing UI updater to refresh the border color and visibility.
        updateBPElementUI(element);
		}	

		else if (newStateItem.type === 'psr') {
            // It's too complex to surgically update the PSR grid, so we will
            // replace just this one element type as a compromise.
            element.replaceWith(createElement(newStateItem.type, newStateItem));
        } else if (newStateItem.type === 'alert') {
            updateAlertElementUI(element); // You already have this!
        }
        else if (newStateItem.type === 'anesthetic') {
            console.log(`DEBUG: Surgically updating Anesthetic summary (originalId: ${newStateItem.originalId})`);
            updateAnestheticSummary(element);
        }
		else if (newStateItem.type === 'dropdown') {
        // For a dropdown, just update the selected value.
        element.querySelector('select').value = newStateItem.selected;
		}

		else if (newStateItem.type === 'tx-plan') {
        // For the treatment plan, we just need to call the existing summary
        // update function. The dataset has already been updated above.
        console.log(`DEBUG: Surgically updating Treatment Plan summary (originalId: ${newStateItem.originalId})`);
        updateTxPlanSummary(element);
		}
		
        // ... add other UI update functions here as needed ...
    };


    SECTIONS.forEach((sectionId, secIndex) => {
        const elementsFromState = newState[sectionId] || [];

        elementsFromState.forEach((stateItem, itemIndex) => {
            stateItem.originalId = `${secIndex}-${itemIndex}`;
            let existingElement = document.querySelector(`.draggable-element[data-original-id="${stateItem.originalId}"]`);

            if (!existingElement) {
                // If element doesn't exist, create it.
                console.log(`DEBUG: Element ${stateItem.originalId} not found. CREATING.`);
                const dropzone = document.querySelector(`.dropzone[data-section-id="${sectionId}"]`);
                if (dropzone) {
                    dropzone.appendChild(createElement(stateItem.type, stateItem));
                    changed = true;
                }
            } else {
                // If element exists, compare its current state to the new state.
                const localState = getElementState(existingElement);
                
                // Use JSON.stringify for a simple but effective deep comparison.
                if (JSON.stringify(localState) !== JSON.stringify(stateItem)) {
                    if (document.activeElement && document.activeElement.closest('.draggable-element') === existingElement) {
                        console.log(`DEBUG: Skipping update for focused element ${stateItem.originalId}.`);
                        return;
                    }

                    console.log(`%cDEBUG: State for element ${stateItem.originalId} differs. Replacing element to ensure UI consistency.`, 'color: orange');
                    changed = true;
                    
// **THE FIX:** Call our new surgical update function.
                    surgicallyUpdateElement(existingElement, stateItem);
                }
            }
        });

        // This part for removing deleted elements remains the same.
        const elementsOnPage = document.querySelectorAll(`.dropzone[data-section-id="${sectionId}"] .draggable-element`);
        elementsOnPage.forEach(elOnPage => {
            if (!elementsFromState.some(item => item.originalId === elOnPage.dataset.originalId)) {
                elOnPage.remove();
                changed = true;
            }
        });
    });

    if (changed) {
        console.log("DEBUG: Reconciliation caused changes, updating live output.");
        isRenderingFromCloud = true;
        updateLiveOutput();
        isRenderingFromCloud = false;
    }
	
    // After any potential DOM changes from reconciliation, we must
    // re-assert the layout lock state to ensure new elements are also locked.
    const lockToggle = document.getElementById('lock-layout-toggle');
    if (lockToggle && lockToggle.checked) {
        console.log("DEBUG: Re-applying layout lock after reconciliation.");
        lockToggle.dispatchEvent(new Event('change'));
    }
    // --- END OF  CODE ---
	
	
};
// =================================================================



// --- 4. Modified Existing Functions ---
// These wrappers correctly link your original functions to the new cloud sync.



// =================================================================
// UPDATED `resetValues` Function
// This version correctly handles 'doNotReset' properties.
// =================================================================
const resetValues = () => {
    // 1. Keep the history saving feature, it's good practice.
    saveNoteToHistory();
	saveHistoryToFirestore();
	
    // 2. The single confirmation dialog.
    if (currentNoteId && confirm("Are you sure you want to reset this note for the next patient? This will not affect fields marked 'Do Not Reset'.")) {
        console.log(`DEBUG: Smart Reset initiated for note "${currentNoteId}"...`);
        
        if (!lastLoadedState) {
            alert("Error: Default template (lastLoadedState) is not available. Cannot perform reset.");
            return;
        }

        const noteDocRef = db.collection('live_notes').doc(currentNoteId);

        // 3. GET the most recent version of the document from the server first.
        noteDocRef.get().then(doc => {
            if (!doc.exists) {
                console.error("Cannot reset a document that doesn't exist.");
                alert("Error: The note could not be found in the cloud to reset.");
                return;
            }

            const currentState = doc.data();
            // 4. Create a fresh, clean copy of the original template.
            const newResetState = JSON.parse(JSON.stringify(lastLoadedState));

            console.log("DEBUG: Checking for 'doNotReset' elements to preserve...");

            // 5. LOOP through the clean state and PRESERVE data from the current state.
            for (const sectionId in newResetState) {
                if (Array.isArray(newResetState[sectionId])) {
                    newResetState[sectionId].forEach((templateElement, index) => {
                        // Find the corresponding element in the current state on the server.
                        const currentElement = currentState[sectionId]?.[index];
                        
                        // If the element in the TEMPLATE is marked as 'doNotReset'...
                        if (templateElement.doNotReset === true && currentElement) {
                            console.log(`%cPreserving data for element with originalId: ${templateElement.originalId}`, 'color: orange;');
                            // ...then replace the clean template element with the one from the current state.
                            newResetState[sectionId][index] = currentElement;
                        }
                    });
                }
            }
            
            // 6. Add the timestamp for real-time ordering.
            newResetState.lastUpdated = firebase.firestore.FieldValue.serverTimestamp();

            // 7. Now, SAVE this newly merged state back to Firestore.
            // The onSnapshot listener will automatically handle the UI update.
            noteDocRef.set(newResetState).then(() => {
                console.log("DEBUG: Smart Reset complete. The UI will now update via the real-time listener.");
            }).catch(err => {
                console.error("Reset failed during save:", err);
                alert("Error: Could not save the reset state to the cloud.");
            });

        }).catch(err => {
            console.error("Reset failed while fetching current state:", err);
            alert("Error: Could not read the current note state to perform a safe reset.");
        });
    }
};
// =================================================================







// =================================================================
//  The New Cloud-Aware `fullReset` Function
// =================================================================

const fullReset = () => {
    // Determine the current note ID (tech's name) from either the active session or localStorage.
    const noteIdToReset = currentNoteId || localStorage.getItem('dentalNoteMakerTechName');

    if (confirm("Are you sure you want to perform a FULL application reset? This will clear ALL local storage and delete the current live note from the cloud.")) {
        console.log("Performing a full reset...");

        if (noteIdToReset) {
            // **THE NEW LOGIC:** If there is a live note, delete it from Firestore.
            console.log(`DEBUG: Deleting live note "${noteIdToReset}" from Firestore...`);
            db.collection('live_notes').doc(noteIdToReset).delete()
                .then(() => {
                    console.log("DEBUG: Cloud document deleted successfully.");
                    // After successful deletion, proceed with the local cleanup.
                    performLocalReset();
                })
                .catch((error) => {
                    console.error("Failed to delete cloud document. Aborting local reset.", error);
                    alert("Error: Could not delete the live note from the cloud. Please check your connection and permissions.");
                });
        } else {
            // If there's no note ID, there's nothing in the cloud to delete,
            // so we can just proceed with the local cleanup.
            performLocalReset();
        }
    }
};

// We move the local cleanup into its own helper function.
const performLocalReset = () => {
    console.log("DEBUG: Clearing all local storage data...");
    localStorage.removeItem('dentalNoteMakerSession');
    localStorage.removeItem('dentalNoteHistory');
    localStorage.removeItem('dentalNoteMakerTechName');
	localStorage.removeItem('dentalNoteSessionID');
    
    // Reload the page to start from a completely blank slate.
    window.location.reload();
};
// =================================================================



// **** START OF CODE for copyAction with evaluation****

        const copyAction = () => {
            const noteText = liveOutput.value;
            
            // 1. Run the evaluation on the current note text.
            const suggestions = evaluateNote(noteText);

            // 2. Build the confirmation message.
            let alertMessage = "Note Copied!";
            if (suggestions.length > 0) {
                // If there are suggestions, add them to the message on new lines.
                alertMessage += "\n\n--- Suggestions ---\n" + suggestions.join('\n');
            }

            // 3. Copy the text to the clipboard and show the confirmation message.
            navigator.clipboard.writeText(noteText).then(() => {
                alert(alertMessage);
            });
        };

        // **** END OF  CODE for copyAction with evaluation ****



// Your original loadJsonData and renderState functions remain here, they are essential.

        const loadJsonData = (jsonString, isStartup = false, isFromFileImport = false) => {
            try {
                const state = JSON.parse(jsonString);
                
                // If this is a new file import, it becomes the new template AND we must clear the old session.
                if (isFromFileImport) {
                    console.log("New file imported. Clearing old localStorage session.");
                    localStorage.removeItem('dentalNoteMakerSession');
                    lastLoadedState = JSON.parse(JSON.stringify(state)); // This becomes the new "source of truth" for reset.
                }
                
                renderState(state, isFromFileImport);

                if (!isStartup) {
                    alert('Template loaded successfully!');
                }
                return true;
            } catch (err) {
                console.error("JSON Parse Error:", err);
                if (!isStartup) { alert('Error: Invalid JSON data.'); }
                return false;
            }
        };

        const renderState = (state, isNewTemplate = false) => {
            document.querySelectorAll('.dropzone').forEach(zone => zone.innerHTML = '');
            
            // If we are loading a NEW template, we must build the lastLoadedState memory.
            // If we are just restoring a session, lastLoadedState is already in memory from the initial load.
            if (isNewTemplate) {
                lastLoadedState = {}; 
                SECTIONS.forEach((sectionId) => {
                    const elements = state[sectionId] || [];
                    if (!lastLoadedState[sectionId]) lastLoadedState[sectionId] = [];
                    elements.forEach((item, itemIndex) => {
                        lastLoadedState[sectionId][itemIndex] = JSON.parse(JSON.stringify(item));
                    });
                });
            }

            SECTIONS.forEach((sectionId, secIndex) => {
                const zone = document.querySelector(`.dropzone[data-section-id="${sectionId}"]`);
                const elements = state[sectionId] || [];
                if (zone && Array.isArray(elements)) {
                    elements.forEach((item, itemIndex) => {
                        item.originalId = `${secIndex}-${itemIndex}`;
                        zone.appendChild(createElement(item.type, item));
                    });
                }
            });
            
            updateLiveOutput();
            const lockToggle = document.getElementById('lock-layout-toggle');
            if (lockToggle.checked) {
                lockToggle.dispatchEvent(new Event('change'));
            }
        };
		
		


		
		
		

/**
 * NEW "Config Cascade"
 * Fetches clinic templates from Firestore and populates the technician's dropdown selector.
 */
async function loadDefaults() {
    console.log("--- Running Clinic Template Loading Sequence ---");
    const clinicSelect = document.getElementById('clinic-select');
    clinicSelect.innerHTML = '<option value="--loading--">Loading Clinics...</option>'; // Reset

    try {
        const snapshot = await db.collection('clinic_templates').orderBy('clinicName').get();
        
        // Clear loading message
        clinicSelect.innerHTML = ''; 

        // Add the built-in template as the default first option
        const defaultOption = new Option("Default Built-in Template", "BUILT_IN");
        clinicSelect.add(defaultOption);

        if (!snapshot.empty) {
            console.log("Successfully fetched clinic templates from Firestore.");
            snapshot.forEach(doc => {
                const clinic = doc.data();
                // The value is the document ID, the text is the pretty display name
                const option = new Option(clinic.clinicName, doc.id);
                clinicSelect.add(option);
            });
        } else {
            console.log("No custom clinic templates found in Firestore. Only default is available.");
        }
    } catch (error) {
        console.error("Error fetching clinic templates:", error);
        // If Firestore fails, ensure the default option is still available
        clinicSelect.innerHTML = ''; 
        const defaultOption = new Option("Default Built-in Template", "BUILT_IN");
        clinicSelect.add(defaultOption);
        const errorOption = new Option("Could not load cloud templates", "", true, true);
        errorOption.disabled = true;
        clinicSelect.add(errorOption);
    }
}



// --- 6. The Main Controller and All Event Listeners (The New Startup Cascade) ---

console.log("DEBUG: Attaching main auth listener and all UI event handlers...");

// The "brain" of the app. It runs on page load and controls the entire UI flow.
auth.onAuthStateChanged(user => {
    if (unsubscribeFromNote) unsubscribeFromNote();

    if (user) { // DOCTOR
        userStatusEmail.textContent = `Dr. ${user.email}`;
        logoutButton.classList.remove('view-hidden');
        saveCopyButton.classList.remove('view-hidden');
		document.getElementById('set-template-btn').classList.remove('view-hidden');
		// Unhide the Export button for Doctors
                const exportBtn = document.getElementById('export-sf603a-btn');
                if (exportBtn) exportBtn.classList.remove('view-hidden');
		viewHiddenToggleLabel.classList.remove('view-hidden');
        lockLayoutToggleLabel.classList.remove('view-hidden');
		document.getElementById('import-btn').classList.remove('element-hidden');
        document.getElementById('export-btn').classList.remove('element-hidden');
        showView('view-doctor-dashboard');
        listenForActiveNotes();
		listenForHistoryNotes();
    } else { // TECHNICIAN
        userStatusEmail.textContent = "Technician Mode";
        logoutButton.classList.add('view-hidden');
        saveCopyButton.classList.add('view-hidden');
		viewHiddenToggleLabel.classList.add('view-hidden');
        lockLayoutToggleLabel.classList.add('view-hidden');
       		// Unhide the Export button for Techs
                const exportBtn = document.getElementById('export-sf603a-btn');
                if (exportBtn) exportBtn.classList.remove('view-hidden');
        console.log("DEBUG: Pre-loading default template into lastLoadedState...");
        loadDefaults(); 

        // ** THIS IS THE MODIFIED LOGIC **
	    const savedSessionID = localStorage.getItem('dentalNoteSessionID');
        const savedTechName = localStorage.getItem('dentalNoteMakerTechName');

        if (savedSessionID && savedTechName) {
            console.log(`Resuming session with ID: ${savedSessionID}`);
            startEditingSession(savedSessionID);
            userStatusEmail.textContent = `Tech: ${savedTechName}`;
            logoutButton.classList.remove('view-hidden');
        } else {
            showView('view-technician-start');
        }
    }

});


// ==========================================================
//  LOGIC FOR SAVING/UPDATING CLINIC TEMPLATES
// ==========================================================
const saveTemplateModal = document.getElementById('save-template-modal');
const setTemplateBtn = document.getElementById('set-template-btn');
const existingClinicsSelect = document.getElementById('existing-clinics-select');
const newClinicNameInput = document.getElementById('new-clinic-name-input');
const confirmSaveBtn = document.getElementById('confirm-template-save-btn');
const cancelSaveBtn = document.getElementById('cancel-template-save-btn');
const modalError = document.getElementById('template-modal-error');

// --- Open the modal and fetch existing clinics ---
setTemplateBtn.addEventListener('click', async () => {
    // Clear previous state
    existingClinicsSelect.innerHTML = '<option value="">-- Select a clinic to overwrite --</option>';
    newClinicNameInput.value = '';
    modalError.textContent = '';

    // Fetch all documents from the clinic_templates collection
    try {
        const snapshot = await db.collection('clinic_templates').get();
        if (!snapshot.empty) {
            snapshot.forEach(doc => {
                const clinic = doc.data();
                // Use the document ID (the unique name) as the value
                const option = new Option(clinic.clinicName, doc.id);
                existingClinicsSelect.add(option);
            });
        }
    } catch (error) {
        console.error("Error fetching clinics:", error);
        modalError.textContent = "Could not load existing clinics.";
    }

    saveTemplateModal.style.display = 'block';
});

// --- Handle the final "Save" click ---
confirmSaveBtn.addEventListener('click', async () => {
    const selectedClinicId = existingClinicsSelect.value;
    const newClinicName = newClinicNameInput.value.trim();
    modalError.textContent = '';

    // Validate input: user must choose one option or the other
    if (selectedClinicId && newClinicName) {
        modalError.textContent = "Please either select an existing clinic OR enter a new name, not both.";
        return;
    }
    if (!selectedClinicId && !newClinicName) {
        modalError.textContent = "You must either select a clinic to overwrite or provide a new clinic name.";
        return;
    }

    // Gather the current state of the note to be used as the template
    const templateState = {};
    SECTIONS.forEach(id => {
        templateState[id] = [];
        document.querySelector(`.dropzone[data-section-id="${id}"]`)
            .querySelectorAll('.draggable-element').forEach(el => templateState[id].push(getElementState(el)));
    });

    let clinicDocId = selectedClinicId;
    let clinicDisplayName = selectedClinicId ? existingClinicsSelect.options[existingClinicsSelect.selectedIndex].text : newClinicName;

    // If it's a new clinic, create a URL-friendly document ID
    if (newClinicName) {
        clinicDocId = newClinicName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        if (!clinicDocId) {
             modalError.textContent = "Invalid clinic name. Please use alphanumeric characters.";
             return;
        }
    }
    
    // Prepare the data payload for Firestore
    const payload = {
        clinicName: clinicDisplayName, // The "pretty" name for display
        templateData: templateState,
        lastModified: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    // Confirm overwrite
    if (selectedClinicId) {
        if (!confirm(`Are you sure you want to overwrite the template for "${clinicDisplayName}"? This cannot be undone.`)) {
            return;
        }
    }

    // Save to Firestore
    try {
        confirmSaveBtn.disabled = true;
        await db.collection('clinic_templates').doc(clinicDocId).set(payload);
        showFeedback(`Template for "${clinicDisplayName}" saved successfully!`, true);
        saveTemplateModal.style.display = 'none';
    } catch (error) {
        console.error("Error saving template:", error);
        modalError.textContent = "Failed to save template. See console for details.";
    } finally {
        confirmSaveBtn.disabled = false;
    }
});

// --- Handle Cancel button ---
cancelSaveBtn.addEventListener('click', () => {
    saveTemplateModal.style.display = 'none';
});




// --- Attach All Event Listeners ---
startDayButton.addEventListener('click', async () => {
    const techName = techNameInput.value.trim().toUpperCase();
    const selectedClinicId = document.getElementById('clinic-select').value;

    if (!techName) {
        return alert("Please enter your name.");
    }
    if (!selectedClinicId || selectedClinicId === '--loading--') {
        return alert("Please select a clinic template.");
    }

    console.log(`DEBUG: Technician "${techName}" is starting a session with template: "${selectedClinicId}"`);
    localStorage.setItem('dentalNoteMakerTechName', techName);

    let templateState;

    try {
        // --- THIS IS THE NEW TEMPLATE SELECTION LOGIC ---
        if (selectedClinicId === 'BUILT_IN') {
            console.log("Loading from the Default Built-in Template.");
            templateState = JSON.parse(document.getElementById('default-json-data').textContent);
        } else {
            console.log(`Fetching template "${selectedClinicId}" from Firestore...`);
            const doc = await db.collection('clinic_templates').doc(selectedClinicId).get();
            if (doc.exists) {
                templateState = doc.data().templateData;
            } else {
                throw new Error("Selected clinic template not found in Firestore.");
            }
        }
        
        // Now that we have the correct template, proceed with session creation
        // Update the tech name within the selected template
        let techElementFound = false;
        for (const sectionId in templateState) {
            if (Array.isArray(templateState[sectionId])) {
                const techElement = templateState[sectionId].find(el => el.originalId === "5-0");
                if (techElement) {
                    techElement.content = techName;
                    techElementFound = true;
                    break;
                }
            }
        }
        
		lastLoadedState = JSON.parse(JSON.stringify(templateState));
        activeTemplateId = selectedClinicId; // Keep track locally

        // Inject the template ID as a metadata field inside the note document state
        templateState.templateId = selectedClinicId;
        
        // Generate a custom unique ID for the live session document
        const uniquePart = db.collection('live_notes').doc().id;
        const newCustomSessionId = `${techName}-${uniquePart}`;
        
        // Create the live note document
        await db.collection('live_notes').doc(newCustomSessionId).set(templateState);
        localStorage.setItem('dentalNoteSessionID', newCustomSessionId);

        // Start the editing session
        startEditingSession(newCustomSessionId);
        
        userStatusEmail.textContent = `Tech: ${techName}`;
        logoutButton.classList.remove('view-hidden');

    } catch (error) {
        console.error("Error starting day:", error);
        alert(`Could not start session. ${error.message}`);
    }
});



showDoctorLoginBtn.addEventListener('click', () => {
    showView('view-doctor-login');
});

loginButton.addEventListener('click', () => auth.signInWithEmailAndPassword(emailInput.value, passwordInput.value).catch(err => loginErrorMessage.textContent = err.message));
signupButton.addEventListener('click', () => auth.createUserWithEmailAndPassword(emailInput.value, passwordInput.value).catch(err => loginErrorMessage.textContent = err.message));

// --- NEW: Prevent the form from reloading the page on submit ---
document.getElementById('doctor-login-form').addEventListener('submit', (event) => {
    event.preventDefault();
});

// --- Allow Enter key to trigger login ---
passwordInput.addEventListener('keydown', (event) => {
    // Check if the key pressed was "Enter"
    if (event.key === 'Enter') {
        // Prevent the default Enter key action (like adding a newline)
        event.preventDefault();
        // Programmatically click the login button
        loginButton.click();
    }
});


logoutButton.addEventListener('click', () => {
    if (confirm("Are you sure you want to log out or end the session?")) {
        localStorage.removeItem('dentalNoteMakerTechName');
		localStorage.removeItem('dentalNoteSessionID');
        auth.signOut().then(() => {
            // After successful sign out, reload the page to get a clean start.
            window.location.reload();
        });
    }
});

saveCopyButton.addEventListener('click', () => {
    // **THE FIX for Doctor's 'Back' button**
    // We simply need to stop the real-time listener and show the dashboard.
    if (unsubscribeFromNote) {
        unsubscribeFromNote();
        unsubscribeFromNote = null;
    }
    showView('view-doctor-dashboard');
});

// Event Listeners
// This section is critical. It re-connects all of your app's original buttons
// and interactive elements to their respective functions.


// A single, global shortcut handler for Shift+Enter that routes actions based on context.
document.addEventListener('keydown', (event) => {
   // Only proceed if the specific key combination is pressed.
   if (!event.shiftKey || event.key !== 'Enter') {
       return;
   }

   // --- CONTEXT-SENSITIVE ROUTING ---
   const anesModal = document.getElementById('anesthetic-editor-modal');
   const textModal = document.getElementById('textbox-editor-modal');
   const endoModal = document.getElementById('endo-testing-modal');
   const allergyModal = document.getElementById('allergy-modal');
   const txPlanModal = document.getElementById('tx-plan-modal');
   const propsModal = document.getElementById('properties-modal');

   // Check which modal is open
   const isAnesOpen = getComputedStyle(anesModal).display !== 'none';
   const isTextOpen = getComputedStyle(textModal).display !== 'none';
   const isEndoOpen = getComputedStyle(endoModal).display !== 'none';
   const isAllergyOpen = getComputedStyle(allergyModal).display !== 'none';
   const isTxPlanOpen = getComputedStyle(txPlanModal).display !== 'none';
   const isPropsOpen = getComputedStyle(propsModal).display !== 'none';

   const isModalOpen = isAnesOpen || isTextOpen || isEndoOpen || isAllergyOpen || isTxPlanOpen || isPropsOpen;

   // If any modal is open, we need to handle it.
   if (isModalOpen) {
       // Prevent the default browser action (like adding a newline or submitting a form)
       event.preventDefault();
       // Stop the event from propagating further, just in case.
       event.stopPropagation();

       // Now, click the correct save button.
       if (isTextOpen) {
           document.getElementById('textbox-editor-save-btn').click();
       } else if (isAnesOpen) {
           document.getElementById('anesthetic-editor-save-btn').click();
       } else if (isEndoOpen) {
           document.getElementById('endo-testing-save-btn').click();
       } else if (isAllergyOpen) {
           document.getElementById('allergy-save-btn').click();
       } else if (isTxPlanOpen) {
           document.getElementById('tx-plan-save-btn').click();
       } else if (isPropsOpen) {
           document.getElementById('properties-save-btn').click();
       }
   }
   // If NO modal is open, perform the global copy action.
   else {
       event.preventDefault();
       document.getElementById('copy-btn-top').click();

   }
});

   
// New, smarter logic for closing modals by clicking the backdrop
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('mousedown', (e) => {
        // Close the modal ONLY if the mousedown event is on the backdrop itself
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Separate listener for closing the context menu
        // **** START OF MODIFIED CODE to include tx plan copy/paste****
        window.addEventListener('mousedown', (e) => {
            const contextMenu = document.getElementById('context-menu');
            const selectionMenu = document.getElementById('text-selection-menu');
            
            if (!e.target.closest('#context-menu') && !e.target.closest('.draggable-element')) {
                contextMenu.style.display = 'none';
            }

        // ****this code is erroring with style in console            if (!e.target.closest('#text-selection-menu')) {
         // ****               selectionMenu.style.display = 'none';
          // ****          }

        });
        // **** END OF MODIFIED CODE ****






        document.getElementById('ctx-delete').onclick = () => { if (activeElementForEditor) { activeElementForEditor.remove(); updateLiveOutput(); } };
        document.getElementById('ctx-properties').onclick = () => { if (activeElementForEditor) openPropertiesModal(activeElementForEditor); };
        document.querySelectorAll('.add-element-btn').forEach(btn => btn.onclick = e => { currentSectionToAdd = e.target.dataset.section; document.getElementById('add-element-modal').style.display = 'block'; });
        document.querySelectorAll('.close-btn').forEach(btn => btn.onclick = e => document.getElementById(e.target.dataset.modalId).style.display = 'none');
        document.querySelectorAll('.element-type').forEach(el => el.onclick = e => { const type = e.currentTarget.dataset.type; const dropzone = document.querySelector(`#${currentSectionToAdd} .dropzone`); if(dropzone) { dropzone.appendChild(createElement(type)); } updateLiveOutput(); document.getElementById('add-element-modal').style.display = 'none'; });
        document.querySelectorAll('.dropzone').forEach(zone => zone.addEventListener('dragover', e => { e.preventDefault(); const draggingEl = document.querySelector('.draggable-element.dragging'); if (!draggingEl) return; const afterElement = [...zone.querySelectorAll('.draggable-element:not(.dragging)')].reduce((closest, child) => { const box = child.getBoundingClientRect(); const offset = e.clientY - box.top - box.height / 2; return (offset < 0 && offset > closest.offset) ? { offset: offset, element: child } : closest; }, { offset: Number.NEGATIVE_INFINITY }).element; if (afterElement == null) zone.appendChild(draggingEl); else zone.insertBefore(draggingEl, afterElement); }));

document.getElementById('copy-btn-top').addEventListener('click', copyAction);
document.getElementById('copy-btn-bottom').addEventListener('click', copyAction);
        const fileInput = document.createElement('input'); fileInput.type = 'file'; fileInput.accept = '.json'; fileInput.style.display = 'none'; document.body.appendChild(fileInput);
        document.getElementById('import-btn').addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => { const file = e.target.files[0]; if (!file) return; const reader = new FileReader(); reader.onload = (re) => { loadJsonData(re.target.result); }; reader.readAsText(file); e.target.value = ''; });
        document.getElementById('export-btn').onclick = () => { const state = {}; SECTIONS.forEach(id => { state[id] = []; document.querySelector(`.dropzone[data-section-id="${id}"]`).querySelectorAll('.draggable-element').forEach(el => state[id].push(getElementState(el))); }); const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' }); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'dental-note-template.json'; a.click(); URL.revokeObjectURL(a.href); };

// Connect to the NEW cloud-aware reset functions
document.getElementById('reset-btn').onclick = resetValues;
document.getElementById('full-reset-btn').onclick = fullReset; 

document.getElementById('view-hidden-toggle').addEventListener('change', (e) => { document.body.classList.toggle('show-hidden-elements', e.target.checked); });
document.getElementById('lock-layout-toggle').addEventListener('change', (e) => { document.body.classList.toggle('layout-locked', e.target.checked); document.querySelectorAll('.draggable-element').forEach(el => el.setAttribute('draggable', !e.target.checked)); });

// And all your modal save button listeners, etc.
// e.g., document.getElementById('textbox-editor-save-btn').onclick = () => { ... }

// Finally, call the initial history render
renderHistoryUI();

// =================================================================
// END: 
// =================================================================






// ==========================================================
//  LOGIC FOR LANDING PAGE FEATURE ROTATOR
// ==========================================================
const features = [
    "Real-time Doctor-Tech collaboration",
	"MHS Genesis-ready formatting",
    "Seamlessly import past notes",
	"Cloud-synced note history",
    "Detailed Endo-Testing tables",
    "Built-in dental term autocorrect",
    "Quick-Copy with Shift + Enter",
    "Double-click to replace text snippets",
    "Offline mode for doctors",
	"Fully customizable note templates",
];
const featureTextElement = document.getElementById('feature-text');
let featureIndex = 0;

if (featureTextElement) { // Only run if the element exists
    setInterval(() => {
        // 1. Fade out the current text
        featureTextElement.style.opacity = 0;

        // 2. After the fade-out completes, change the text and fade it back in
        setTimeout(() => {
            // Move to the next feature, looping back to the start if necessary
            featureIndex = (featureIndex + 1) % features.length;
            featureTextElement.textContent = features[featureIndex];
            
            // 3. Fade in the new text
            featureTextElement.style.opacity = 1;
        }, 500); // This duration should match the CSS transition duration

    }, 4000); // Change feature every 4 seconds
}

techNameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission
        startDayButton.click(); // Programmatically click the button
    }
});




        // =================================================================
        // SF 603A PDF GENERATION (PRODUCTION EXPORT - CONTINUATION LOGIC)
        // =================================================================
        const exportToSF603A = async () => {
            try {
                showFeedback("Generating SF 603A...", true);
                
                // 1. Get the text from the live output box
                const outputElement = document.getElementById('live-output');
                const clinicalText = outputElement.value;
                
                if (!clinicalText.trim()) {
                    showFeedback("No clinical note to export!", false);
                    return;
                }

                // 2. Fetch the blank template
                const url = 'SF603a.pdf'; 
                const existingPdfBytes = await fetch(url).then(res => {
                    if (!res.ok) throw new Error("Could not find SF603a.pdf.");
                    return res.arrayBuffer();
                });

                const pdfDoc = await PDFLib.PDFDocument.load(existingPdfBytes, { ignoreEncryption: true });
                const blueprintDoc = await PDFLib.PDFDocument.load(existingPdfBytes, { ignoreEncryption: true });
                
                const font = await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica);
                const rgb = PDFLib.rgb;

                // ==========================================
                // 🎯 FINAL TUNING VARIABLES 🎯
                // ==========================================
                const dateX = 40;
                const treatmentX = 125; 
                const fontSize = 7;
                
                const maxTextWidth = 400; 
                
                // X coordinate for "Cont'd..." at bottom right (treatmentX + maxTextWidth + small gap)
                const continuedBottomX = 540; 

                // --- PAGE 1 ---
                const page1FirstRowY = 436;      
                const page1RowCount = 24;
                const rowSpacing = 12; 
                
                // --- PAGE 2 (And all subsequent pages) ---
                const page2FirstRowY = 472;      
                const page2RowCount = 35;       
                // ==========================================

                // 3. Helper Function: Word-Wrap the text dynamically
                const splitTextIntoLines = (text, maxWidth) => {
                    const paragraphs = text.split('\n'); 
                    let lines = [];
                    for (const p of paragraphs) {
                        if (p.trim() === '') {
                            lines.push(''); 
                            continue;
                        }
                        const words = p.split(' ');
                        let currentLine = words[0] || '';
                        
                        for (let i = 1; i < words.length; i++) {
                            const word = words[i];
                            const width = font.widthOfTextAtSize(currentLine + " " + word, fontSize);
                            if (width < maxWidth) {
                                currentLine += " " + word;
                            } else {
                                lines.push(currentLine);
                                currentLine = word;
                            }
                        }
                        if (currentLine) lines.push(currentLine);
                    }
                    return lines;
                };

                const textLines = splitTextIntoLines(clinicalText.trim(), maxTextWidth);
                const today = new Date().toLocaleDateString('en-US');

                // 4. Pagination Engine
                let currentLineIndex = 0;
                let pageNumber = 1;

                while (currentLineIndex < textLines.length) {
                    let currentPage;
                    let startingY;
                    let maxLinesOnThisPage;

                    if (pageNumber === 1) {
                        currentPage = pdfDoc.getPages()[0];
                        startingY = page1FirstRowY;
                        maxLinesOnThisPage = page1RowCount;
                    } else if (pageNumber === 2) {
                        if (pdfDoc.getPages().length > 1) {
                            currentPage = pdfDoc.getPages()[1];
                        } else {
                            const [copiedPage] = await pdfDoc.copyPages(blueprintDoc, [0]);
                            currentPage = pdfDoc.addPage(copiedPage);
                        }
                        startingY = page2FirstRowY;
                        maxLinesOnThisPage = page2RowCount;
                    } else {
                        const blueprintIndex = blueprintDoc.getPages().length > 1 ? 1 : 0;
                        const [copiedPage] = await pdfDoc.copyPages(blueprintDoc, [blueprintIndex]);
                        currentPage = pdfDoc.addPage(copiedPage);
                        
                        startingY = page2FirstRowY;
                        maxLinesOnThisPage = page2RowCount;
                    }

                    // 5. Draw the lines for the current page
                    let linesDrawn = 0;
                    while (linesDrawn < maxLinesOnThisPage && currentLineIndex < textLines.length) {
                        const currentY = startingY - (linesDrawn * rowSpacing);

                        // --- DATE & CONTINUED LOGIC (LEFT COLUMN) ---
                        if (pageNumber === 1 && currentLineIndex === 0) {
                            // Print Date only on the very first entry of Page 1
                            currentPage.drawText(today, { x: dateX, y: currentY, size: fontSize, font: font, color: rgb(0, 0, 0) });
                        } else if (pageNumber > 1) {
                            // On Page 2+, print Date on row 1, and "Continued" on row 2
                            if (linesDrawn === 0) {
                                currentPage.drawText(today, { x: dateX, y: currentY, size: fontSize, font: font, color: rgb(0, 0, 0) });
                            } else if (linesDrawn === 1) {
                                currentPage.drawText("Continued", { x: dateX, y: currentY, size: fontSize - 1, font: font, color: rgb(0, 0, 0) });
                            }
                        }

                        // Print the clinical text line
                        currentPage.drawText(textLines[currentLineIndex], { 
                            x: treatmentX, 
                            y: currentY, 
                            size: fontSize, 
                            font: font, 
                            color: rgb(0, 0, 0) 
                        });

                        linesDrawn++;
                        currentLineIndex++;
                    }
                    
                    // --- BOTTOM RIGHT "CONTINUED..." LOGIC ---
                    // If we finished drawing this page, but there are still lines left in our array...
                    if (currentLineIndex < textLines.length) {
                        // Calculate the Y coordinate of the very last line we just drew on this page
                        const lastLineY = startingY - ((maxLinesOnThisPage - 1) * rowSpacing);
                        
                        // Print "Continued..." far to the right
                        currentPage.drawText("Continued...", { 
                            x: continuedBottomX, 
                            y: lastLineY, 
                            size: fontSize, 
                            font: font, 
                            color: rgb(0, 0, 0) 
                        });
                    }
                    
                    pageNumber++;
                }

                // 6. Save and Trigger Download
                const pdfBytes = await pdfDoc.save();
                const blob = new Blob([pdfBytes], { type: 'application/pdf' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `SF603A_Note_${today.replace(/\//g, '-')}.pdf`;
                link.click();
                
                showFeedback("SF 603A Successfully Generated!");

            } catch (error) {
                console.error("PDF Generation Error:", error);
                alert("Error generating PDF: " + error.message);
            }
        };


        // Bind the new function to the export button
        document.getElementById('export-sf603a-btn').addEventListener('click', exportToSF603A);



   
    });
	
	
	

	
