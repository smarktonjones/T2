// ===================================================================================
//
//   --- DENTAL SUGGESTER SCRIPT (PORTABLE VERSION) ---
//
//
// ===================================================================================

(function() {
    // ============================= CONFIGURATION ===================================
    //  !!! IMPORTANT !!! 
    //  Change 'myNotesTextbox' to the actual ID of your textbox element.

	const targetTextboxId = 'textbox-editor-textarea';
	const targetTextboxId2 = 'tx-plan-table'; 
    // ===============================================================================






    // ===================================================================================
    //   --- LIBRARY OF TERMS --- (Dictionary is collapsed for brevity) (add or subtract terms as necessary - MG Horning initial list vJULY 2025
    // ===================================================================================
const dictionary = ["Abrasion", "Abscess", "Abscess (Periapical)", "Abscess (Periodontal)", "Abutment", "Acanthosis", "Access Cavity", "Acid Etch", "Acrylic Resin", "Actinic Cheilitis", "Acute Apical Abscess", "Acute Pulpitis", "Adenoid Cystic Carcinoma", "Adenomatoid Odontogenic Tumor", "Adenopathy", "Airway Obstruction", "Albright Syndrome", "Alginate", "Allergic Reaction", "Allograft", "Alloplast", "Alveolar Bone", "Alveolar Crest", "Alveolar Osteitis (Dry Socket)", "Alveolar Ridge", "Alveoloplasty", "Amalgam", "Amalgam Carrier", "Amalgam Well", "Ameloblastic Carcinoma", "Ameloblastic Fibro-odontoma", "Ameloblastic Fibroma", "Ameloblastoma", "Amelogenesis Imperfecta", "Anaphylaxis", "Aneurysmal Bone Cyst", "Angular Cheilitis", "Angular Defect", "Ankyloglossia", "Ankylosis", "Anodontia", "Apex Locator", "Apexification", "Apexogenesis", "Aphthous Ulcer", "Aphthous Ulcer (Canker Sore)", "Apical Foramen", "Apical Periodontitis", "Apical Scar", "Apicoectomy", "Articaine", "Articulating Paper", "Aspirator Tip", "Asymptomatic", "Attrition", "Atypical Odontalgia", "Autograft", "BOP (Bleeding on Probing)", "Barbed Broach", "Barrier Membrane", "Basal Cell Carcinoma", "Base", "Benign", "Benign Migratory Glossitis", "Bifid Condyle", "Bifid Tongue", "Bilateral", "Biopsy", "Biopsy (Excisional)", "Biopsy (Incisional)", "Bite Registration", "Black Hairy Tongue", "Blade Elevator", "Bleaching (Internal)", "Bleb", "Block Graft", "Bone Density", "Bone File", "Bone Graft", "Bone Loss", "Bone Marrow Space", "Bone Scraper", "Bone Screw", "Bonding Agent", "Bruxism", "Buccal Exostosis", "Buccinator Muscle", "Bulla", "Burnisher", "C/P (Complete/Partial Denture)", "CAL (Clinical Attachment Loss)", "CBCT (Cone Beam Computed Tomography)", "CEJ (Cementoenamel Junction)", "Calcifying Epithelial Odontogenic Tumor", "Calcifying Odontogenic Cyst", "Calcium Hydroxide", "Calculus", "Calculus Bridge", "Candidiasis", "Candidiasis (Thrush)", "Canine Impaction", "Canine Substitution", "Canthotomy", "Caries", "Caries (Incipient)", "Caries (Occlusal)", "Caries (Proximal)", "Caries (Rampant)", "Caries (Root)", "Carver", "Cast Post", "Cavernous Hemangioma", "Cellulitis", "Cement", "Cemental Dysplasia", "Cemental Tear", "Cementoblastoma", "Cemento-ossifying Fibroma", "Central Giant Cell Granuloma", "Ceramic Fracture", "Cervical Burnout", "Chelating Agent", "Cherubism", "Chronic Apical Abscess", "Chronic Hyperplastic Pulpitis", "Chronic Periodontitis", "Chronic Pulpitis", "Circumferential Bone Loss", "Circumscribed", "Cleft Lip", "Cleft Lip Repair", "Cleft Palate", "Cleft Palate Repair", "Cleidocranial Dysplasia", "Closed Reduction", "Cold Test", "Complex Odontoma", "Composite Resin", "Compound Odontoma", "Concrescence", "Condenser", "Condensing Osteitis", "Condylar Aplasia", "Condylar Hyperplasia", "Condylar Hypoplasia", "Congenital", "Connective Tissue Graft", "Contact Point", "Coping", "Core Buildup", "Coronectomy", "Coronoid Hyperplasia", "Corrugated", "Corticated Border", "Cotton Wool Appearance", "Cowhorn Forceps (#23)", "Cracked Tooth Syndrome", "Cratered", "Crepitus", "Crestal Lamina Dura", "Crossbite", "Crown Fracture", "Crown-down Technique", "Crown-to-Root Ratio", "Cryer Elevator", "Curettage", "Curing Light", "Cyst", "Cystic", "Debridement", "Decortication", "Dehiscence", "Dense Bone Island", "Dens Evaginatus", "Dens Invaginatus (Dens in Dente)", "Dental Dam", "Dental Fluorosis", "Dental Lamina", "Dental Stone", "Dentin Dysplasia", "Dentinogenesis Imperfecta", "Dentigerous Cyst", "Denture Adhesive", "Denture Base", "Denture Stomatitis", "Denture Teeth", "Denture-induced Fibrous Hyperplasia", "Depressor Anguli Oris Muscle", "Depressor Labii Inferioris Muscle", "Desensitizer", "Desquamative Gingivitis", "Developmental Anomaly", "Deviation", "Deviation (Mandibular)", "Diastema", "Deviation (Nasal Septum)", "Diastema", "Die Stone", "Diffuse", "Diffuse Border", "Diffuse Sclerosing Osteomyelitis", "Digastric Muscle (Anterior Belly)", "Digastric Muscle (Posterior Belly)", "Dilaceration", "Disc Displacement", "Dislocation", "Distoangular Impaction", "Drain Placement", "Drifting", "Drill", "Dycal", "Dysphagia (Difficulty Swallowing)", "Dysphonia (Hoarseness)", "Dysplasia", "E-max (Lithium Disilicate)", "E/O (Extraoral)", "EPT (Electric Pulp Test)", "Eagle Syndrome", "Ectodermal Dysplasia", "Ectopic Eruption", "Edematous", "Edentulous", "Elastomeric Impression Material", "Elevation", "Elevator", "Enamel Hypoplasia", "Enamel Pearl", "Endodontic Explorer", "Endodontic File", "Endodontic Sealer", "Endophytic", "Enostosis", "Enucleation", "Epinephrine", "Epulis Fissuratum", "Erosion", "Eruption Cyst", "Erythema Multiforme", "Erythematous", "Erythroplakia", "Etchant", "Excisional Biopsy", "Excision", "Exophytic", "Exostosis", "External Resorption", "Extraction", "Extrusion", "FGC (Full Gold Crown)", "FGG (Free Gingival Graft)", "FMX (Full Mouth X-rays)", "Fenestration", "Fiber Post", "Fibroma", "Fibrous", "Fibrous Dysplasia", "Fine Needle Aspiration (FNA)", "Finishing Strip", "Fissured", "Fissured Tongue", "Fistula", "Fistula / Sinus Tract", "Flap Advancement", "Flap Design", "Flap Reflection", "Flap Retraction", "Florid Cemento-osseous Dysplasia", "Flowable Composite", "Fluctuant", "Fluoride", "Fluorosis", "Focal Cemento-osseous Dysplasia", "Focal Sclerosing Osteomyelitis", "Follicular Cyst", "Forceps", "Forceps (#150)", "Forceps (#151)", "Fordyce Granules", "Foreign Body Reaction", "Fremitus", "Frenectomy", "Frenectomy (Lingual/Labial)", "Friable", "Frictional Keratosis", "Full Bony Impaction", "Full Thickness Flap", "Furcation Arrow", "Furcation Involvement", "Furcation Involvement (Class I)", "Furcation Involvement (Class II)", "Furcation Involvement (Class III)", "Furcation Involvement (Class IV)", "Fusion", "GBR (Guided Bone Regeneration)", "GTR (Guided Tissue Regeneration)", "Gardner Syndrome", "Garre's Osteomyelitis", "Gates-Glidden Drill", "Gemination", "Genioglossus Muscle", "Geniohyoid Muscle", "Geographic Tongue", "Geographic Tongue (Benign Migratory Glossitis)", "Ghost Teeth", "Giant Cell Fibroma", "Gingival Abscess", "Gingival Cleft", "Gingival Enlargement", "Gingival Hyperplasia", "Gingival Recession", "Gingivectomy", "Gingivitis", "Gingivoplasty", "Glandular Odontogenic Cyst", "Glass Ionomer Cement", "Glossectomy", "Goiter", "Gold Alloy", "Gorlin Cyst", "Gorlin-Goltz Syndrome", "Gow-Gates Block", "Graft", "Granular Cell Tumor", "Granulation Tissue", "Ground-glass Appearance", "Guided Bone Regeneration", "Guided Tissue Regeneration", "Gutta-percha", "Hairy Leukoplakia", "Hairy Tongue", "Hamular Notch", "Hand-Schuller-Christian Disease", "Hard Tissue", "Healing Abutment", "Heat Test", "Hemangioma", "Hemisection", "Hemodent", "Hemostasis", "Hemostat", "Hereditary", "Herpangina", "Herpes Simplex Virus", "Herpetic Gingivostomatitis", "High-speed Handpiece", "Histoplasmosis", "Homogeneous", "Horizontal Bone Loss", "Horizontal Impaction", "Hyoglossus Muscle", "Hypercementosis", "Hyperdontia", "Hyperdontia (Supernumerary Teeth)", "Hyperkeratosis", "Hyperkeratotic", "Hyperplasia", "Hypodontia", "I/O (Intraoral)", "IANB (Inferior Alveolar Nerve Block)", "IRM (Intermediate Restorative Material)", "Idiopathic Osteosclerosis", "Impacted Tooth", "Implant Fixture", "Implant Placement", "Impression Compound", "Impression Tray", "Incipient Caries", "Incisional Biopsy", "Incision", "Incision and Drainage", "Incisive Canal Cyst", "Indurated", "Indirect Pulp Cap", "Infiltration Anesthesia", "Inflammation", "Inlay", "Instrumentation", "Internal Resorption", "Intermaxillary Fixation", "Interproximal Caries", "Intrabony Defect", "Intracanal Medicament", "Intrusion", "Irrigation", "Irreversible Pulpitis", "Irritation Fibroma", "Kaposi's Sarcoma", "Keratinized Gingiva", "Keratocystic Odontogenic Tumor (KCOT)", "Keratosis", "Langerhans Cell Histiocytosis", "Laryngectomy", "Laryngoscopy", "Lateral Cephalogram", "Lateral Periodontal Cyst", "Lateral Pterygoid Muscle", "Le Fort I Fracture", "Le Fort I/II/III Osteotomy", "Le Fort II Fracture", "Le Fort III Fracture", "Leukoplakia", "Leukoplakic", "Levator Anguli Oris Muscle", "Lichen Planus", "Lichen Planus (Oral)", "Lichenoid Mucositis", "Lidocaine", "Liner", "Lingual Nerve", "Lingual Thyroid", "Lingual Varicosities", "Lipoma", "Local Anesthesia", "Localized", "Loss of Lamina Dura", "Low-speed Handpiece", "Ludwig's Angina", "Lupus Erythematosus", "Luxation", "Lymphadenopathy", "Lymphangioma", "Lymphoepithelial Cyst", "MOD (Mesio-Occluso-Distal)", "MTA (Mineral Trioxide Aggregate)", "Macrodontia", "Macule", "Malignant", "Mallet", "Malocclusion", "Mandibular Canal", "Mandibular Fracture", "Mandibular Tori", "Marsupialization", "Masseter Muscle", "Matrix Band", "Maxillary Sinus Lift", "Maxillectomy", "Medial Pterygoid Muscle", "Median Palatal Cyst", "Median Rhomboid Glossitis", "Melanoma", "Melanotic Neuroectodermal Tumor of Infancy", "Membrane", "Mental Foramen", "Mentalis Muscle", "Mepivacaine", "Mesioangular Impaction", "Metal-ceramic Crown", "Metastatic Disease", "Micro-hybrid Composite", "Microdontia", "Mobility (Class I)", "Mobility (Class II)", "Mobility (Class III)", "Morsicatio buccarum", "Moth-eaten Appearance", "Mottled", "Mucocele", "Mucoepidermoid Carcinoma", "Mucogingival Defect", "Multifocal", "Multilocular", "Multilocular Radiolucency", "Multiple Myeloma", "Mylohyoid Muscle", "Mylohyoid Ridge", "Myxoma", "NICO (Neuralgia-Inducing Cavitational Osteonecrosis)", "NUG (Necrotizing Ulcerative Gingivitis)", "NUP (Necrotizing Ulcerative Periodontitis)", "Nanofill Composite", "Nasolabial Cyst", "Nasopalatine Duct Cyst", "Neck Dissection (Radical/Modified)", "Necrosis", "Necrotizing Sialometaplasia", "Needle Holder", "Neoplasm", "Nerve Block", "Nerve Repositioning", "Neuralgia", "Neurilemmoma", "Neurofibroma", "Nevoid Basal Cell Carcinoma Syndrome", "Nicotine Keratosis", "Nodule", "Non-vital Tooth", "OCS (Oral Cancer Screening)", "Obturation", "Occlusal Caries", "Occlusal Splint", "Occlusal Trauma", "Odontogenic Keratocyst", "Odontogenic Myxoma", "Odontoma", "Odontotomy", "Odynophagia (Painful Swallowing)", "Oligodontia", "Onlay", "Onion-skin Appearance", "Open Apex", "Open Bite", "Open Contact", "Open Reduction", "Operculum", "Oral Hairy Leukoplakia", "Oral Submucous Fibrosis", "Orbicularis Oris Muscle", "Orthokeratinized Odontogenic Cyst", "Osseointegration", "Osseous Recontouring", "Osseous Surgery", "Ossifying Fibroma", "Osteitis Deformans", "Osteoblastoma", "Osteochondroma", "Osteogenesis Imperfecta", "Osteoma", "Osteomyelitis", "Osteonecrosis of the Jaw (ONJ)", "Osteopetrosis", "Osteoporosis", "Osteoradionecrosis", "Osteosarcoma", "Osteotomy", "Overbite", "Overhanging Restoration", "Overjet", "PA (Periapical Radiograph)", "PD (Probing Depth)", "PDL (Periodontal Ligament)", "PFM (Porcelain Fused to Metal)", "PVS (Polyvinyl Siloxane)", "Packable Composite", "Paget's Disease", "Palatal Expansion", "Palatal Torus", "Palatoglossus Muscle", "Palpation Test", "Panoramic Radiograph", "Paper Point", "Papillary", "Papilloma", "Papule", "Parotidectomy", "Parulis", "Partially Erupted", "Partial Bony Impaction", "Patch", "Pathologic Fracture", "Pedunculated", "Pell & Gregory Classification", "Pemphigoid", "Pemphigus Vulgaris", "Percussion Test", "Perforation Repair", "Peri-implantitis", "Periapical Cemental Dysplasia", "Periapical Cyst", "Periapical Granuloma", "Periapical Rarefying Osteitis", "Periapical Sclerosing Osteitis", "Pericoronitis", "Periodontal Abscess", "Periodontal Pocket", "Periodontitis", "Periodontitis (Aggressive)", "Periodontitis (Chronic)", "Periosteal Elevator", "Periosteum", "Peripheral Giant Cell Granuloma", "Peripheral Ossifying Fibroma", "Periotome", "Pesso Reamer", "Pharyngitis", "Phoenix Abscess", "Pindborg Tumor", "Plaque", "Plate and Screw Fixation", "Platysma Muscle", "Pleomorphic Adenoma", "Plunger Cusp", "Pneumatization", "Polycarbonate Crown", "Polyether", "Polypoid", "Polysulfide", "Polyvinyl Siloxane (PVS)", "Porcelain", "Porcelain-fused-to-metal (PFM)", "Post-and-Core", "Posterior Crossbite", "Potts Elevator", "Pre-prosthetic Surgery", "Prefabricated Post", "Pregnancy Granuloma", "Premalignant", "Primary Closure", "Primordial Cyst", "Proliferative Periostitis", "Provisional Restoration", "Pseudocyst", "Pulp Attrition", "Pulp Calcification", "Pulp Cap", "Pulp Chamber", "Pulp Exposure", "Pulp Necrosis", "Pulp Polyp", "Pulp Polyp (Chronic Hyperplastic Pulpitis)", "Pulp Stone", "Pulp Test", "Pulpitis", "Punched-out Radiolucencies", "Pustule", "Pyogenic Granuloma", "RCT (Root Canal Therapy)", "RMGI (Resin-Modified Glass Ionomer)", "Radiation Caries", "Radicular Cyst", "Radio-dense", "Radiograph", "Radiographic Calculus", "Radiolucent", "Radiopaque", "Ranula", "Recurrent Aphthous Stomatitis", "Recurrent Caries", "Regional Odontodysplasia", "Reline", "Resin Cement", "Residual Cyst", "Residual Ridge", "Resorption", "Retraction Cord", "Retreatment", "Reversible Pulpitis", "Rhabdomyosarcoma", "Rhinoplasty", "Ridge Augmentation", "Ridge Preservation", "Ridge Split", "Risorius Muscle", "Rongeur", "Root Amputation", "Root Canal", "Root Caries", "Root Concavity", "Root Fracture", "Root Planing", "Root Proximity", "Root Resection", "Root Submergence", "Root Trunk", "Rubber Dam", "Runner's Caries", "SRP (Scaling and Root Planing)", "Saddle", "Schwannoma", "Scleroderma", "Sclerotic Bone", "Secondary Caries", "Self-etch Primer", "Sequestrum", "Sessile", "Sialadenitis", "Sialendoscopy", "Sialolith", "Sialolithiasis", "Sialolithiasis (Salivary Stone)", "Silver Diamine Fluoride", "Sinus Tract", "Sjogren Syndrome", "Sleep Apnea (Obstructive)", "Slow-speed Handpiece", "Socket Sclerosis", "Soft Tissue", "Soft Tissue Impaction", "Spatula", "Speckled", "Spongy", "Squamous Cell Carcinoma", "Stafne Bone Defect", "Stainless Steel Crown", "Step-back Technique", "Sternocleidomastoid Muscle", "Stevens-Johnson Syndrome", "Stomatitis", "Styloglossus Muscle", "Stylohyoid Muscle", "Subluxation", "Subpontic Osseous Hyperplasia", "Sunburst Appearance", "Supernumerary Root", "Supernumerary Tooth", "Suprabony Pocket", "Surveyor", "Symptomatic", "Syphilis", "TMJ (Temporomandibular Joint)", "Taurodontism", "Temporalis Muscle", "Temporary Cement", "Temporary Crown", "Tetracycline Staining", "Tetracycline Staining", "Thalassemia", "Thyroidectomy", "Tipping", "Tobacco Keratosis", "Tongue Thrust", "Tonsillectomy", "Tonsillitis", "Torus Mandibularis", "Torus Palatinus", "Total-etch", "Tracheostomy", "Transillumination", "Trapezius Muscle", "Traumatic Bone Cyst", "Traumatic Neuroma", "Trigeminal Neuralgia", "Trismus", "Trituration", "Tuberculosis", "Turner's Hypoplasia", "Ulcer", "Ulcerated", "Unicystic Ameloblastoma", "Unifocal", "Unilateral", "Unilocular Radiolucency", "Unerupted Tooth", "Uvulopalatopharyngoplasty (UPPP)", "Varnish", "Veneer", "Verrucous", "Verrucous Carcinoma", "Vertical Bone Loss", "Vertical Dimension", "Vertical Fracture", "Vertical Impaction", "Vertigo", "Vesicle", "WNL (Within Normal Limits)", "Wedge", "Weeping Canal", "White Sponge Nevus", "Widened PDL Space", "Xerostomia (Dry Mouth)", "ZOE (Zinc Oxide Eugenol)", "Zinc Oxide Eugenol (ZOE)", "Zinc Phosphate Cement", "Zirconia", "Zygomaticus Major Muscle", "Zygomaticus Minor Muscle"];

    // ===================================================================================
    //   --- APPLICATION LOGIC (v2.0) mgh ---
    // ===================================================================================




    // **** START OF  CODE: Auto-Correct Function with handleinput and attacheventlisteners****
   

// This is the new, combined function that handles BOTH suggestions and auto-correct.
// **** START OF REPLACEMENT for handleCombinedInput ****

const handleCombinedInput = (event) => {
    const textarea = event.target;
    const fullText = textarea.value;
    const cursorPos = textarea.selectionStart;
    const textBeforeCursor = fullText.substring(0, cursorPos);
    const lastChar = textBeforeCursor.slice(-1);

    // --- 1. Auto-Correct Logic ---
    if (lastChar === ' ' || lastChar === '.' || lastChar === ',') {
        const lastSpaceIndex = textBeforeCursor.lastIndexOf(' ', cursorPos - 2);
        const lastWord = textBeforeCursor.substring(lastSpaceIndex + 1).trim();

		 // --- auto corrects if starts with # or number then dash or number then letter but not mm for millimeter ---
        const match = lastWord.match(/^#?(?!.*\)$)(\d+)-?\(?(?![mM]{2}\)?$)([a-zA-Z]+)\)?$/);
        
        if (match) {
            const toothNumber = match[1];
            const surfaceLetters = match[2];

            console.log(`Auto-Correct: Detected tooth shorthand "${lastWord}"`);

            const correctedShorthand = `(${surfaceLetters.toUpperCase()})`;
            const replacement = `#${toothNumber}${correctedShorthand},`;

            console.log(`Auto-Correct: Formatting to "${replacement}"`);
            
            const textAfterCursor = fullText.substring(cursorPos);
            const newText = textBeforeCursor.substring(0, lastSpaceIndex + 1) + replacement + fullText.substring(cursorPos - 1);

            textarea.value = newText;
            
            const newCursorPos = lastSpaceIndex + 1 + replacement.length + 1;
            textarea.setSelectionRange(newCursorPos, newCursorPos);
            
            hideSuggestions();
            return; 
        }
    }

    // --- 2. Auto-Suggester Logic (runs if auto-correct did not) ---
    const lastSpaceIndexForSuggest = textBeforeCursor.lastIndexOf(' ');
    const currentWordForSuggest = textBeforeCursor.substring(lastSpaceIndexForSuggest + 1).toLowerCase();

    if (!currentWordForSuggest) {
        hideSuggestions();
        return;
    }
    
    // **** THIS IS THE FIX ****
    // The 'dictionary' constant is already available in this script's scope.
    // We don't need to look for it on the window object.
    const filteredTerms = dictionary.filter(term => term.toLowerCase().startsWith(currentWordForSuggest));
    displaySuggestions(filteredTerms, currentWordForSuggest);
};

// **** END OF REPLACEMENT for handleCombinedInput ****

function attachEventListeners() {
    // We now attach ONLY our single, combined handler to the input event.
    textInput.addEventListener('input', handleCombinedInput); 
    
    // The other listeners remain the same.
    textInput.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleGlobalClick);
    window.addEventListener('scroll', hideSuggestions, true);
    window.addEventListener('resize', hideSuggestions);
}

// (The handleAutoCorrect function is no longer needed as a separate function)
// const handleInput = () => { ... }; // The old handleInput is also no longer needed





    // **** END OF AUTOCORRECT CODE ****






    let textInput = null;
    let suggestionsContainer = null;
    const suggestionsId = 'dental-suggester-list-999';

    function init() {
        textInput = document.getElementById(targetTextboxId);
        if (!textInput) {
            console.error(`Dental Suggester Error: Textbox with ID "${targetTextboxId}" not found.`);
            return;
        }

        injectStyles();
        createSuggestionsContainer();
        attachEventListeners();
        console.log(`Dental Suggester initialized successfully on #${targetTextboxId}.`);
		init2();
    }
	//this then gets the autocorrect in the tx-plan module
	function init2() {
        textInput = document.getElementById(targetTextboxId2);
        if (!textInput) {
            console.error(`Dental Suggester Error: Textbox with ID "${targetTextboxId2}" not found.`);
            return;
        }

        injectStyles();
        createSuggestionsContainer();
        attachEventListeners();
        console.log(`Dental Suggester initialized successfully on #${targetTextboxId2}.`);
		textInput = document.getElementById(targetTextboxId);
    }

    function injectStyles() {
        const style = document.createElement('style');
        // --- KEY CHANGE ---
        // We set position: fixed to position relative to the viewport.
        // We remove the 'width' property because JS will now set it dynamically.
        style.innerHTML = `
            #${suggestionsId} {
                list-style-type: none; padding: 0; margin: 0;
                border: 1px solid #ddd;
                border-radius: 5px;
                max-height: 300px; overflow-y: auto;
                position: fixed; /* Position relative to the window, not a parent */
                background-color: white;
                z-index: 10000;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                display: none;
            }
            #${suggestionsId} li {
                padding: 10px 12px; cursor: pointer;
                background-color: #fff; border-bottom: 1px solid #f0f0f0;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                font-size: 14px;
            }
            #${suggestionsId} li:last-child { border-bottom: none; }
            #${suggestionsId} li:hover, #${suggestionsId} li.active { background-color: #e9e9e9; }
            #${suggestionsId} li strong { font-weight: bold; }
        `;
        document.head.appendChild(style);
    }

    function createSuggestionsContainer() {
        const container = document.createElement('ul');
        container.id = suggestionsId;
        // Append to the body to ensure it's not trapped inside a misbehaving container
        document.body.appendChild(container);
        suggestionsContainer = container;
    }



    function displaySuggestions(suggestions, query) {
        if (suggestions.length === 0) {
            hideSuggestions();
            return;
        }
        
        // --- KEY CHANGE: JAVASCRIPT POSITIONING ---
        // Get the exact position and size of the textbox
        const rect = textInput.getBoundingClientRect();
        
        // Position the suggestions box right below the textbox
        suggestionsContainer.style.left = `${rect.left}px`;
        suggestionsContainer.style.top = `${rect.bottom}px`;
        suggestionsContainer.style.width = `${rect.width}px`; // Match the width

        suggestionsContainer.innerHTML = '';
        suggestionsContainer.style.display = 'block';

        suggestions.slice(0, 50).forEach(term => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-term', term);
            const boldPart = term.substring(0, query.length);
            const restPart = term.substring(query.length);
            listItem.innerHTML = `<strong>${boldPart}</strong>${restPart}`;
            listItem.addEventListener('mousedown', (e) => {
                e.preventDefault();
                selectTerm(term);
            });
            suggestionsContainer.appendChild(listItem);
        });
    }

    // Unchanged functions (handleInput, handleKeyDown, etc.) are below

    const handleKeyDown = (e) => { /* ... same as before ... */ if (suggestionsContainer.style.display === 'none') return; const suggestions = suggestionsContainer.querySelectorAll('li'); if (suggestions.length === 0) return; let activeIndex = -1; suggestions.forEach((s, index) => { if (s.classList.contains('active')) activeIndex = index; }); if (e.key === 'ArrowDown') { e.preventDefault(); if (activeIndex < suggestions.length - 1) { if (activeIndex > -1) suggestions[activeIndex].classList.remove('active'); suggestions[activeIndex + 1].classList.add('active'); } } else if (e.key === 'ArrowUp') { e.preventDefault(); if (activeIndex > 0) { suggestions[activeIndex].classList.remove('active'); suggestions[activeIndex - 1].classList.add('active'); } } else if (e.key === 'Enter' && activeIndex > -1) { e.preventDefault(); selectTerm(suggestions[activeIndex].getAttribute('data-term')); } else if (e.key === 'Escape' || e.key === 'Tab') { hideSuggestions(); } };
    const handleGlobalClick = (event) => { /* ... same as before ... */ if (!textInput.contains(event.target) && !suggestionsContainer.contains(event.target)) { hideSuggestions(); } };
    function selectTerm(term) { /* ... same as before ... */ const fullText = textInput.value; const cursorPos = textInput.selectionStart; const textBeforeCursor = fullText.substring(0, cursorPos); const textAfterCursor = fullText.substring(cursorPos); const lastSpaceIndex = textBeforeCursor.lastIndexOf(' '); const baseText = textBeforeCursor.substring(0, lastSpaceIndex + 1); textInput.value = baseText + term + ' ' + textAfterCursor; hideSuggestions(); textInput.focus(); const newCursorPos = (baseText + term + ' ').length; textInput.setSelectionRange(newCursorPos, newCursorPos); }
    function hideSuggestions() { if (suggestionsContainer) { suggestionsContainer.style.display = 'none'; } }
    
    document.addEventListener('DOMContentLoaded', init);
})();




    // **** CHARTING CODE ****



        const dentalChartSVG = document.getElementById('dentalChart');
        const teethData = {}; // Stores references to SVG path elements for each tooth's surfaces

        // Tooth positions (Universal Numbering System)
        const toothPositions = {
            // Upper Right (1-8)
            1: { x: 50, y: 100, isUpper: true, quadrant: 1 },
            2: { x: 100, y: 100, isUpper: true, quadrant: 1 },
            3: { x: 150, y: 100, isUpper: true, quadrant: 1 },
            4: { x: 200, y: 100, isUpper: true, quadrant: 1 },
            5: { x: 250, y: 100, isUpper: true, quadrant: 1 },
            6: { x: 300, y: 100, isUpper: true, quadrant: 1 },
            7: { x: 350, y: 100, isUpper: true, quadrant: 1 },
            8: { x: 400, y: 100, isUpper: true, quadrant: 1 }, // Midline between 8 and 9

            // Upper Left (9-16)
            9: { x: 450, y: 100, isUpper: true, quadrant: 2 },
            10: { x: 500, y: 100, isUpper: true, quadrant: 2 },
            11: { x: 550, y: 100, isUpper: true, quadrant: 2 },
            12: { x: 600, y: 100, isUpper: true, quadrant: 2 },
            13: { x: 650, y: 100, isUpper: true, quadrant: 2 },
            14: { x: 700, y: 100, isUpper: true, quadrant: 2 },
            15: { x: 750, y: 100, isUpper: true, quadrant: 2 },
            16: { x: 800, y: 100, isUpper: true, quadrant: 2 },

            // Lower Right (25-32)
            32: { x: 50, y: 300, isUpper: false, quadrant: 4 },
            31: { x: 100, y: 300, isUpper: false, quadrant: 4 },
            30: { x: 150, y: 300, isUpper: false, quadrant: 4 },
            29: { x: 200, y: 300, isUpper: false, quadrant: 4 },
            28: { x: 250, y: 300, isUpper: false, quadrant: 4 },
            27: { x: 300, y: 300, isUpper: false, quadrant: 4 },
            26: { x: 350, y: 300, isUpper: false, quadrant: 4 },
            25: { x: 400, y: 300, isUpper: false, quadrant: 4 }, // Midline between 25 and 24

            // Lower Left (17-24)
            24: { x: 450, y: 300, isUpper: false, quadrant: 3 },
            23: { x: 500, y: 300, isUpper: false, quadrant: 3 },
            22: { x: 550, y: 300, isUpper: false, quadrant: 3 },
            21: { x: 600, y: 300, isUpper: false, quadrant: 3 },
            20: { x: 650, y: 300, isUpper: false, quadrant: 3 },
            19: { x: 700, y: 300, isUpper: false, quadrant: 3 },
            18: { x: 750, y: 300, isUpper: false, quadrant: 3 },
            17: { x: 800, y: 300, isUpper: false, quadrant: 3 },
        };

        // --- Drawing the initial blank chart ---
        function createTooth(toothNum, x, y, size = 18, isUpper = true, quadrant) {
            const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
            group.setAttribute("id", `tooth-group-${toothNum}`);

            // Outer circle (overall tooth shape)
            const outerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            outerCircle.setAttribute("cx", x);
            outerCircle.setAttribute("cy", y);
            outerCircle.setAttribute("r", size);
            outerCircle.setAttribute("class", "tooth-outline");
            group.appendChild(outerCircle);

            teethData[toothNum] = {}; // Initialize store for this tooth's surfaces

            const smallSize = size * 0.7; // Size of individual surface rects
            const offset = size * 0.6;    // Offset from center for surface rects

            // Determine if on right side (1 or 4) or left side (2 or 3) for M/D orientation
            const isRightQuadrant = (quadrant === 1 || quadrant === 4);

            // FLIPPED SIGNS FOR VISUAL 180 DEGREE ROTATION (relative to previous version)
            const mesialXOffset = isRightQuadrant ? offset : -offset;
            const distalXOffset = isRightQuadrant ? -offset : offset;

            const buccalFacialYOffset = isUpper ? -offset : offset;
            const lingualYOffset = isUpper ? offset : -offset;



            // M (Mesial)
            const M_path = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            M_path.setAttribute("x", x + mesialXOffset - smallSize / 2);
            M_path.setAttribute("y", y - smallSize / 2);
            M_path.setAttribute("width", smallSize);
            M_path.setAttribute("height", smallSize);
            M_path.setAttribute("class", "tooth-surface");
            M_path.setAttribute("id", `tooth-${toothNum}-M`);
            M_path.setAttribute("data-surface", "M");
            group.appendChild(M_path);
            teethData[toothNum]['M'] = M_path;

            // D (Distal)
            const D_path = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            D_path.setAttribute("x", x + distalXOffset - smallSize / 2);
            D_path.setAttribute("y", y - smallSize / 2);
            D_path.setAttribute("width", smallSize);
            D_path.setAttribute("height", smallSize);
            D_path.setAttribute("class", "tooth-surface");
            D_path.setAttribute("id", `tooth-${toothNum}-D`);
            D_path.setAttribute("data-surface", "D");
            group.appendChild(D_path);
            teethData[toothNum]['D'] = D_path;

            // B/F (Buccal/Facial - outer side, towards cheek/lip)
            const BF_path = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            BF_path.setAttribute("x", x - smallSize / 2);
            BF_path.setAttribute("y", y + buccalFacialYOffset - smallSize / 2);
            BF_path.setAttribute("width", smallSize);
            BF_path.setAttribute("height", smallSize);
            BF_path.setAttribute("class", "tooth-surface");
            BF_path.setAttribute("id", `tooth-${toothNum}-BF`);
            BF_path.setAttribute("data-surface", "B"); // Store as B, also acts as F
            group.appendChild(BF_path);
            teethData[toothNum]['B'] = BF_path;
            teethData[toothNum]['F'] = BF_path;

            // L (Lingual - inner side, towards tongue)
            const L_path = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            L_path.setAttribute("x", x - smallSize / 2);
            L_path.setAttribute("y", y + lingualYOffset - smallSize / 2);
            L_path.setAttribute("width", smallSize);
            L_path.setAttribute("height", smallSize);
            L_path.setAttribute("class", "tooth-surface");
            L_path.setAttribute("id", `tooth-${toothNum}-L`);
            L_path.setAttribute("data-surface", "L");
            group.appendChild(L_path);
            teethData[toothNum]['L'] = L_path;


			// O/I (Occlusal/Incisal - center)
            const OI_path = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            OI_path.setAttribute("x", x - smallSize / 2);
            OI_path.setAttribute("y", y - smallSize / 2);
            OI_path.setAttribute("width", smallSize);
            OI_path.setAttribute("height", smallSize);
            OI_path.setAttribute("class", "tooth-surface");
            OI_path.setAttribute("id", `tooth-${toothNum}-O`);
            OI_path.setAttribute("data-surface", "O");
            group.appendChild(OI_path);
            teethData[toothNum]['O'] = OI_path;
            teethData[toothNum]['I'] = OI_path; // Incisal for anterior teeth shares this path
			

            // Tooth number label
            const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            label.setAttribute("x", x);
            label.setAttribute("y", isUpper ? y + size + 8 : y - size - 4);
            label.setAttribute("class", "tooth-label");
            label.textContent = toothNum;
            group.appendChild(label);

            return group;
        }

        function initializeChart() {
            dentalChartSVG.innerHTML = ''; // Clear previous chart

            // --- Mouth Labels and Lines ---
            // Facial Label (Upper)
            dentalChartSVG.appendChild(createLabel("Facial", 425, 30, "mouth-label"));
            dentalChartSVG.appendChild(createLine(20, 40, 780, 40, "label-line"));

            // Lingual Label (Upper)
            dentalChartSVG.appendChild(createLabel("Lingual", 425, 170, "mouth-label"));
            dentalChartSVG.appendChild(createLine(20, 180, 780, 180, "label-line"));


            // Lingual Label (Lower)
            dentalChartSVG.appendChild(createLabel("Lingual", 425, 230, "mouth-label"));
            dentalChartSVG.appendChild(createLine(20, 240, 780, 240, "label-line"));

            // Facial Label (Lower)
            dentalChartSVG.appendChild(createLabel("Facial", 425, 370, "mouth-label"));
            dentalChartSVG.appendChild(createLine(20, 380, 780, 380, "label-line"));


            // --- Arch Lines (simplified path) ---
            const upperArchLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
            upperArchLine.setAttribute("d", "M 20 120 C 200 60, 600 60, 830 120");
            upperArchLine.setAttribute("class", "arch-line");
            dentalChartSVG.appendChild(upperArchLine);

            const lowerArchLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
            lowerArchLine.setAttribute("d", "M 20 280 C 200 340, 600 340, 830 280");
            lowerArchLine.setAttribute("class", "arch-line");
            dentalChartSVG.appendChild(lowerArchLine);

            // --- Tooth Elements ---
            // Upper teeth (1-16)
            for (let i = 1; i <= 16; i++) {
                const pos = toothPositions[i];
                if (pos) {
                    dentalChartSVG.appendChild(createTooth(i, pos.x, pos.y, 18, pos.isUpper, pos.quadrant));
                }
            }

            // Lower teeth (17-32) - drawing 32 down to 17 for left-to-right display
            for (let i = 32; i >= 17; i--) {
                const pos = toothPositions[i];
                if (pos) {
                    dentalChartSVG.appendChild(createTooth(i, pos.x, pos.y, 18, pos.isUpper, pos.quadrant));
                }
            }

            // Reset all surfaces to default color before marking
            document.querySelectorAll('.tooth-surface').forEach(path => {
                path.classList.remove('caries');
            });
        }

        function createLabel(text, x, y, className) {
            const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
            label.setAttribute("x", x);
            label.setAttribute("y", y);
            label.setAttribute("class", className);
            label.textContent = text;
            return label;
        }

        function createLine(x1, y1, x2, y2, className) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", x1);
            line.setAttribute("y1", y1);
            line.setAttribute("x2", x2);
            line.setAttribute("y2", y2);
            line.setAttribute("class", className);
            return line;
        }


        // --- Parsing and Charting Logic ---
        const OPERATIVE_KEYWORD = "CHARTING OF TREATMENT PLAN IN DENTRIX";

        function parsePrompt(fullPrompt) {
            let relevantPrompt = fullPrompt.trim();
            const keywordIndex = relevantPrompt.toUpperCase().indexOf(OPERATIVE_KEYWORD);

            if (keywordIndex !== -1) {
                // Take text after the keyword
                relevantPrompt = relevantPrompt.substring(keywordIndex + OPERATIVE_KEYWORD.length).trim();
            }
            // If keyword not found, the fullPrompt (trimmed) is used.

            const cariesData = [];
            const regex = /(\d+)\s*\(([^)]+)\)/g;
            let match;
            while ((match = regex.exec(relevantPrompt)) !== null) { // Use relevantPrompt here
                const toothNum = parseInt(match[1]);
                const surfaceStr = match[2].toUpperCase();

                const surfaces = new Set();

                // First, check for common compound abbreviations
                if (surfaceStr.includes('MOD')) {
                    surfaces.add('M'); surfaces.add('O'); surfaces.add('D');
                } else if (surfaceStr.includes('MO')) {
                    surfaces.add('M'); surfaces.add('O');
                } else if (surfaceStr.includes('DO')) {
                    surfaces.add('D'); surfaces.add('O');
                } else if (surfaceStr.includes('MI')) {
                    surfaces.add('M'); surfaces.add('I');
                } else if (surfaceStr.includes('DI')) {
                    surfaces.add('D'); surfaces.add('I');
                }

                // Then, iterate through the string to catch individual surfaces,
                // including those that might be part of or combined with compounds (e.g., MODFL)
                for (let i = 0; i < surfaceStr.length; i++) {
                    const s = surfaceStr[i];
                    if (['M', 'O', 'D', 'I', 'B', 'F', 'L'].includes(s)) {
                        surfaces.add(s);
                    }
                }
                cariesData.push({ toothNum, surfaces: Array.from(surfaces) });
            }
            return cariesData;
        }

        function markCaries(cariesInfo) {
            cariesInfo.forEach(item => {
                const toothNum = item.toothNum;
                item.surfaces.forEach(surface => {
                    const surfacePath = teethData[toothNum] && teethData[toothNum][surface];
                    if (surfacePath) {
                        surfacePath.classList.add('caries');
                    } else {
                        console.warn(`Could not find SVG element for tooth ${toothNum}, surface ${surface}. This might be an invalid surface or a drawing error.`);
                        const centralSurface = teethData[toothNum] && (teethData[toothNum]['O'] || teethData[toothNum]['I']);
                        if (centralSurface) {
                            centralSurface.classList.add('caries');
                        }
                    }
                });
            });
        }

        function generateChart() {
            initializeChart();
            const prompt = document.getElementById('live-output').value;
            const cariesToMark = parsePrompt(prompt);
            markCaries(cariesToMark);
        }

