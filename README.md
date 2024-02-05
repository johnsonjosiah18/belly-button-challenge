# belly-button-challenge
Interactive Web Visualizations
This project involves creating an interactive web application using D3.js and Plotly.js to visualize data from a study on bacterial species (Operational Taxonomic Units, or OTUs) found in the human belly button.

Data
The data for this project is stored in a JSON file, which includes:

samples: An array of objects, each representing an individual participant in the study. Each object includes:

id: The participant’s ID.
otu_ids: An array of OTU IDs found in the participant’s navel.
sample_values: An array of the number of times each OTU was found.
otu_labels: An array of taxonomic names for the OTUs.
metadata: An array of objects, each representing an individual participant in the study. Each object includes demographic information about the participant, such as:

id: The participant’s ID.
ethnicity: The participant’s ethnicity.
gender: The participant’s gender.
age: The participant’s age.
location: The participant’s location.
bbtype: The participant’s belly button type (Innie or Outie).
wfreq: The frequency that the participant washes their belly button (weekly).
Visualizations
The web application includes the following visualizations:

A horizontal bar chart displaying the top 10 OTUs found in a selected individual.
A bubble chart displaying each sample from the selected individual.
A panel displaying the selected individual’s demographic information.
All visualizations update when a new individual is selected from the dropdown menu.

Libraries Used
D3.js: Used to read in the JSON data and manipulate the DOM.
Plotly.js: Used to create the bar and bubble charts.