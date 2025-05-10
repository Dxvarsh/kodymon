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
let moduleNum = 0;
function addModuleRow() {
    moduleNum += 1;
    const container = document.getElementById('moduleFields');
    const row = document.createElement('div');
    row.className = 'space-y-1';
    row.innerHTML = `
    <label for="projectTitle" class="block text-sm font-medium text-gray-700 mb-1">Module: ${moduleNum}</label>
    <input type="text" class="px-2 py-1 block w-full outline-none bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black placeholder-gray-400" placeholder="Module Name">
    <textarea class="px-2 py-1 block w-full outline-none bg-gray-100 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-black placeholder-gray-400" rows="5" placeholder="Module Description"></textarea>
  `;
    container.appendChild(row);
}

function generatePDF() {
    // Collect data from the form fields
    const projectTitle = document.getElementById('projectTitle').value;
    const projectDefinition = document.getElementById('projectDefinition').value;
    const companyName = document.getElementById('companyName').value;
    const companyOverview = document.getElementById('companyOverview').value;
    const ownerName = document.getElementById('ownerName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    // Collect tools and technology data
    const css = document.querySelector('input[name="css"]:checked')?.value || '';
    const js = document.querySelector('input[name="js"]:checked')?.value || '';
    const backend = document.querySelector('input[name="backend"]:checked')?.value || '';
    const db = document.querySelector('input[name="database"]:checked')?.value || '';
    const server = document.querySelector('input[name="server"]:checked')?.value || '';
    const reporting = document.querySelector('input[name="reporting-tool"]:checked')?.value || '';
    const otherTools = document.getElementById('otherTools').value;

    // Collect existing and proposed system data
    const existingSystem = document.getElementById('existingSystem').value;
    const proposedSystem = document.getElementById('proposedSystem').value;

    // Collect group members data
    const groupRows = document.querySelectorAll('#groupFields > div');
    const groupMembers = [];
    groupRows.forEach(row => {
        const inputs = row.querySelectorAll('input');
        if (inputs.length === 3) {
            groupMembers.push({
                div: inputs[0].value,
                rollNo: inputs[1].value,
                fullName: inputs[2].value
            });
        }
    });

    // Collect modules data
    const modFields = document.querySelectorAll('#moduleFields > div');
    const modules = [];
    modFields.forEach(field => {
        const name = field.querySelector('input')?.value;
        const desc = field.querySelector('textarea')?.value;
        if (name) {
            modules.push({
                name: name,
                description: desc
            });
        }
    });

    // Define the document definition for pdfmake
    const docDefinition = {
        pageMargins: [40, 60, 40, 60], // Add margins to simulate border space
        background: function(currentPage, pageSize) {
            return {
                canvas: [
                    {
                        type: 'rect',
                        x: 20, y: 20,
                        w: pageSize.width - 40,
                        h: pageSize.height - 40,
                        lineWidth: 1,
                        lineColor: '#000000'
                    }
                ]
            };
        },
        content: [
            { text: "P.D. PANDYA INSTITUTE OF COMPUTER APPLICATION", fontSize: 16, bold: true, alignment: 'center' },
            { text: "Semester – V CC – 306 Software Development Project – 1", fontSize: 16, bold: true, alignment: 'center' },
            { text: "Restaurant Management System", fontSize: 16, bold: true, alignment: 'center', margin: [0, 0, 0, 20] },

            { text: `Project Title: ${projectTitle}`, fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
            {
                text: [
                    { text: "Project Definition Description: ", fontSize: 14, bold: true },
                    { text: projectDefinition, fontSize: 12 }
                ],
                margin: [0, 0, 0, 10]
            },

            { text: "Company Description:", fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
            {
                ul: [
                    `Company Name: ${companyName}`,
                    `Overview: ${companyOverview}`,
                    `Owner Name: ${ownerName}`,
                    `Phone Number: ${phoneNumber}`
                ],
                fontSize: 12,
                margin: [0, 0, 0, 10]
            },

            {
                text: "Tools and Technology:", fontSize: 14, bold: true, margin: [0, 10, 0, 5]
            },
            {
                ul: [
                    {
                        text: [
                            { text: "Front End: ", bold: true },
                            { text: "\n HTML-5" },
                            { text: `\n ${css}` },
                            { text: `\n ${js}` }
                        ],
                        margin: [0, 0, 0, 5]
                    },
                    {
                        text: [
                            { text: "Back End: ", bold: true },
                            { text: `\n ${backend}` },
                            { text: `\n ${db}` }
                        ],
                        margin: [0, 0, 0, 5]
                    },
                    {
                        text: [
                            { text: "Development Tools: ", bold: true },
                            { text: "\n Visual Studio Code 1.86 or higher" }
                        ],
                        margin: [0, 0, 0, 5]
                    },
                    {
                        text: [
                            { text: "Web Server: ", bold: true },
                            { text: `\n ${server}` }
                        ],
                        margin: [0, 0, 0, 5]
                    },
                    {
                        text: [
                            { text: "Reporting Tools: ", bold: true },
                            { text: `\n ${reporting}` }
                        ],
                        margin: [0, 0, 0, 5]
                    },
                    {
                        text: [
                            { text: "Other Tools: ", bold: true },
                            { text: `\n ${otherTools}` }
                        ],
                        margin: [0, 0, 0, 5]
                    }
                ],
                fontSize: 12,
                margin: [0, 0, 0, 10]
            },

            { text: "Existing System:", fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
            {
                ul: existingSystem.split('\n').filter(line => line.trim() !== ''),
                fontSize: 12,
                margin: [0, 0, 0, 10]
            },

            { text: "Proposed System:", fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
            {
                ul: proposedSystem.split('\n').filter(line => line.trim() !== ''),
                fontSize: 12,
                margin: [0, 0, 0, 10]
            },

            { text: "Group Size:", fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', 'auto', 'auto'],
                    body: [
                        ['Div', 'Roll No', 'Full Name'],
                        ...groupMembers.map(member => [member.div, member.rollNo, member.fullName])
                    ]
                },
                fontSize: 12,
                margin: [0, 0, 0, 10]
            },

            { text: "List of Modules:", fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
            {
                ol: modules.map(module => module.name),
                fontSize: 12,
                margin: [0, 0, 0, 10]
            },

            { text: "Description of Modules:", fontSize: 14, bold: true, margin: [0, 10, 0, 5] },
            {
                ul: modules.map(module => ({
                    text: [
                        { text: `${module.name}\n`, bold: true },
                        ...module.description.split('\n').map(line => ({ text: `→ ${line}\n` }))
                    ]
                })),
                fontSize: 12,
                margin: [0, 0, 0, 10]
            }
        ]
    };

    // Generate the PDF
    pdfMake.createPdf(docDefinition).download(`KODYMON_${projectTitle}_synopsis.pdf`);
}

