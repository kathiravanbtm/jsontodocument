import { TemplateHandler } from "https://cdn.jsdelivr.net/npm/easy-template-x/+esm";

let currentTags = [];
let currentTemplateFile = null;

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("extractTags").addEventListener("click", extractTags);
    document.getElementById("generateFromForm").addEventListener("click", handleFormSubmission);
});

async function extractTags() {
    const docxInput = document.getElementById("docxTemplate").files[0];
    if (!docxInput) {
        alert("Please upload a DOCX template.");
        return;
    }

    currentTemplateFile = docxInput; // Save for later use

    const reader = new FileReader();
    reader.onload = async function (event) {
        try {
            const templateData = event.target.result;
            const handler = new TemplateHandler();
            const tags = await handler.parseTags(templateData);

            currentTags = tags.map(tag => tag.rawText);

            console.log("Extracted tags:", currentTags);

            generateDynamicForm(currentTags);
        } catch (error) {
            console.error("Error extracting tags:", error);
            alert("Failed to extract placeholders.");
        }
    };
    reader.readAsArrayBuffer(docxInput);
}

function generateDynamicForm(tags) {
    const formContainer = document.getElementById("dynamicForm");
    formContainer.innerHTML = ""; // Clear previous form

    tags.forEach(tag => {
        const label = document.createElement("label");
        label.textContent = `Enter value for "${tag}":`;
        label.htmlFor = tag;

        const input = document.createElement("input");
        input.type = "text";
        input.id = tag;
        input.name = tag;
        input.required = true;

        formContainer.appendChild(label);
        formContainer.appendChild(document.createElement("br"));
        formContainer.appendChild(input);
        formContainer.appendChild(document.createElement("br"));
        formContainer.appendChild(document.createElement("br"));
    });
}

async function handleFormSubmission(event) {
    event.preventDefault();

    if (!currentTemplateFile) {
        alert("Please upload and extract tags from a DOCX template first.");
        return;
    }

    const formData = new FormData(document.getElementById("dynamicForm"));
    const dataObject = {};

    currentTags.forEach(tag => {
        dataObject[tag] = formData.get(tag) || "";
    });

    processTemplate(currentTemplateFile, dataObject);
}

async function processTemplate(docxFile, dataObject) {
    const reader = new FileReader();
    reader.onload = async function (event) {
        try {
            const templateData = event.target.result;
            const handler = new TemplateHandler();
            const outputDoc = await handler.process(templateData, dataObject);

            const blob = new Blob([outputDoc], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
            saveFile("ProcessedDocument.docx", blob);
        } catch (error) {
            console.error("Error processing document:", error);
            alert("Failed to process document.");
        }
    };
    reader.readAsArrayBuffer(docxFile);
}

function saveFile(filename, blob) {
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = filename;
    link.href = blobUrl;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
        link.remove();
        window.URL.revokeObjectURL(blobUrl);
    }, 0);
}
