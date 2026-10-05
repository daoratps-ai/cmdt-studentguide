CMDT Student Guidebook 2026-2027 - flipbook site

index.html            page structure and content
css/style.css         styles and @font-face rules
js/flipbook.js        page-turn, navigation and search logic
js/search-data.js     searchable text of each page (edit if the PDF changes)
fonts/                Poppins (woff2, OFL license)
images/logo.png       PSUIC logo
images/pages/         guidebook pages as page-01.jpg ... page-40.jpg

To update the guidebook: replace the images in images/pages/ (keep the
page-NN.jpg naming), update js/search-data.js, and change the page count
in js/flipbook.js (variable N).
Upload the whole folder to the website. Open index.html from a web server
or hosting; it also works by double-clicking the file.
