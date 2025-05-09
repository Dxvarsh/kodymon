function nextStep(step) {
    document.querySelectorAll('[id^="step-"]').forEach(div => div.classList.add('hidden'));
    document.getElementById(`step-${step}`).classList.remove('hidden');
}

function prevStep(step) {
    nextStep(step);
}
let grp_member = 0;

function checkGrp() {
    if (grp_member < 2) {
        alert('add atleast 2 grp members..!');
    }
    else {
        nextStep(4);
    }
}

function addGroupRow() {
    grp_member++;
    if (grp_member > 3) {
        alert('More than 3 group member not allowed..!')
        console.error('more than 3 members not allow in a grp');
    }
    else {
        const container = document.getElementById('groupFields');
        const row = document.createElement('div');
        row.className = 'flex gap-4 flex-col';
        row.innerHTML = `
            <fieldset class="border border-gray-300 rounded px-4 py-3 mb-4">
            <legend class="text-sm font-semibold text-gray-700 px-1">Member ${grp_member} </legend>
                <div class="w-full flex md:flex-row flex-col">
                    <input type="text" class="block bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black placeholder-gray-400 px-2 py-1 w-full mr-2 mb-2 md:w-[15%]" placeholder="Div">
                    <input type="text" class="block bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black placeholder-gray-400 px-2 py-1 w-full mr-2 mb-2 md:w-[15%]" placeholder="Roll No">
                    <input type="text" class="block bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black placeholder-gray-400 px-2 py-1 w-full mr-2 mb-2 md:w-[65%]" placeholder="Full Name">
                </div>
            </fieldset>
        `;
        container.appendChild(row);
    }
}

function addModuleRow() {
    const container = document.getElementById('moduleFields');
    const row = document.createElement('div');
    row.className = 'space-y-1';
    row.innerHTML = `
    <input type="text" class="px-2 py-1 block w-full outline-none bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black placeholder-gray-400" placeholder="Module Name">
    <textarea class="px-2 py-1 block w-full outline-none bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black placeholder-gray-400" rows="5" placeholder="Module Description"></textarea>
  `;
    container.appendChild(row);
}

function generateSynopsis() {
    document.getElementById('form-section').classList.add('hidden');
    document.getElementById('output').classList.remove('hidden');

    document.getElementById('outTitle').innerText = document.getElementById('projectTitle').value;
    document.getElementById('outProjectTitle').innerText = document.getElementById('projectTitle').value;
    document.getElementById('outProjectDefinition').innerText = document.getElementById('projectDefinition').value;
    document.getElementById('outCompanyName').innerText = document.getElementById('companyName').value;
    document.getElementById('outCompanyOverview').innerText = document.getElementById('companyOverview').value;
    document.getElementById('outOwnerName').innerText = document.getElementById('ownerName').value;
    document.getElementById('outPhoneNumber').innerText = document.getElementById('phoneNumber').value;

    // Tools
    const outToolsList = document.getElementById("outToolsList");
    outToolsList.innerHTML = "";
    const css = document.querySelector('input[name="css"]:checked');
    const js = document.querySelector('input[name="js"]:checked');
    const backend = document.querySelector('input[name="backend"]:checked');
    const db = document.querySelector('input[name="database"]:checked');
    const server = document.querySelector('input[name="server"]:checked');
    const reporting = document.querySelector('input[name="reporting-tool"]:checked');
    const other = document.getElementById('otherTools').value;

    if (css || js || backend) {
        outToolsList.innerHTML += `<li><strong>Front End:</strong>
            <ul class='list-none ml-[-0.25rem]'>
                <li>→ HTML 5</li>
                <li>→ ${css.value}</li>
                <li>→ ${js.value}</li>
                </ul>
            </li>
        `;
    }

    if (backend || db) {
        outToolsList.innerHTML += `<li class="mt-1"><strong>Back End:</strong>
            <ul class='list-none ml-[-0.25rem]'>
                <li>→ ${backend.value}</li>
                <li>→ ${db.value}</li>
                </ul>
            </li>
        `;
    }

    outToolsList.innerHTML += `
      <li class="mt-1"><strong>Development Tools:</strong>
        <ul class='list-none ml-[-0.25rem]'>
          <li>→ Visual Studio Code 1.86 or higher</li>
        </ul>
      </li>`;

    if (server) {
        outToolsList.innerHTML += `<li class="mt-1"><strong>Web Server:</strong>
        <ul class='list-none ml-[-0.25rem]'><li>→ ${server.value}</li></ul>
      </li>`;
    }

    if (reporting && reporting.value.trim()) {
        outToolsList.innerHTML += `<li class="mt-1"><strong>Reporting Tools:</strong>
        <ul class='list-none ml-[-0.25rem]'><li>→ ${reporting.value}</li></ul>
      </li>`;
    }

    if (other.trim()) {
        const tools = other.split(',');
        outToolsList.innerHTML += `<li class="mt-1"><strong>Other Tools:</strong><ul class='innerUL list-none ml-[-0.25rem]'>`;
        tools.forEach(tool => document.querySelector('.innerUL').innerHTML += `<li>→ ${tool.trim()}</li>`);
        outToolsList.innerHTML += `</ul></li>`;
    }

    // Group Table
    const groupRows = document.querySelectorAll('#groupFields > div');
    const groupTable = document.getElementById('outGroupTable');
    groupTable.innerHTML = "";
    groupRows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        if (inputs.length === 3) {
            groupTable.innerHTML += `<tr>
          <td class="border border-black px-2 py-1">${inputs[0].value}</td>
          <td class="border border-black px-2 py-1">${inputs[1].value}</td>
          <td class="border border-black px-2 py-1">${inputs[2].value}</td>
        </tr>`;
        }
    });

    // Existing & Proposed
    // Existing and Proposed Systems
    const existing = document.getElementById("existingSystem").value.trim().split("\n");
    const existingList = document.getElementById("outExistingSystem");
    existingList.innerHTML = "";
    existing.forEach(point => {
        if (point.trim()) existingList.innerHTML += `<li>${point}</li>`;
    });

    const proposed = document.getElementById("proposedSystem").value.trim().split("\n");
    const proposedList = document.getElementById("outProposedSystem");
    proposedList.innerHTML = "";
    proposed.forEach(point => {
        if (point.trim()) proposedList.innerHTML += `<li>${point}</li>`;
    });

    // Modules and Descriptions
    /* const modules = document.querySelectorAll("#modulesContainer .module");
    const modList = document.getElementById("outModuleList");
    const modDesc = document.getElementById("outModuleDescriptions");
    modList.innerHTML = "";
    modDesc.innerHTML = "";
    modules.forEach((mod, i) => {
      const inputs = mod.querySelectorAll("input, textarea");
      if (inputs.length === 2 && inputs[0].value.trim()) {
        modList.innerHTML += `<li>${inputs[0].value.trim()}</li>`;
        modDesc.innerHTML += `<li><strong>${inputs[0].value.trim().split("\n")}:</strong> ${inputs[1].value.trim()}</li>`;
      }
    }); */


    const modFields = document.querySelectorAll('#moduleFields > div');
    const modList = document.getElementById("outModuleList");
    const modDesc = document.getElementById("outModuleDescriptions");
    modList.innerHTML = "";
    modDesc.innerHTML = "";
    modFields.forEach(field => {
        const name = field.querySelector('input')?.value;
        const desc = field.querySelector('textarea')?.value;
        if (name) {
            modList.innerHTML += `<li>${name}</li>`;
            modDesc.innerHTML += `<li><strong>${name}:</strong>
                <div>
                    <ul>${desc.split('\n').map(line => `<li>${line}</li>`).join('')}</ul>
                </div>
            </li>`;
        }
    });
}