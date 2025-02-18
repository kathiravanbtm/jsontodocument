# Easy Template X DOCX Generator
[Live Demo](https://kathiravanbtm.github.io/jsontodocument/)
This project allows users to generate Word documents dynamically based on placeholders in a DOCX template. It runs entirely in the browser using **easy-template-x**, requiring no server-side processing.

## Features
- Upload a DOCX template with placeholders
- Upload or manually enter JSON data to fill placeholders
- Generate a processed DOCX file with replaced values
- Extract placeholders from the template for reference

## How It Works
1. **Upload a DOCX template** with placeholders (`{{placeholder}}`).
2. **Provide JSON data** via file upload or manual input.
3. **Click 'Generate DOCX'** to create a new document with values inserted.
4. **Click 'Extract DOCX'** to retrieve placeholders used in the template.

## Technologies Used
- **JavaScript** (Frontend processing)
- **easy-template-x** (DOCX template handling)
- **HTML & CSS** (User interface)

## Installation & Usage
Simply open `index.html` in a browser and start using it—no setup required!

## Files
- `index.html` – UI for uploading templates and generating DOCX
- `script.js` – Handles template processing and file generation
- `styles.css` – Basic styling for the interface

## Demo
Try uploading a DOCX template with placeholders and a JSON file with matching keys to see it in action!

[Live Demo](https://kathiravanbtm.github.io/jsontodocument/)

## Components
- **File Upload** – Upload DOCX template and JSON data
- **Text Area** – Manual JSON input
- **Buttons** – Generate and Extract DOCX files
- **Display Section** – Shows extracted placeholders

## License
This project is open-source. Feel free to use and modify it as needed.

