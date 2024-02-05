// URL of the data
var url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);

    // Create a dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    data.names.forEach((name) => {
        dropdownMenu.append("option").text(name).property("value");
    });

    // Initial plots and metadata
    var initialSample = data.names[0];
    updatePlots(initialSample);
    updateMetadata(initialSample);

    // Update plots and metadata when a new sample is selected
    dropdownMenu.on("change", function() {
        var newSample = dropdownMenu.property("value");
        updatePlots(newSample);
        updateMetadata(newSample);
    });
});

function updatePlots(newSample) {
    d3.json(url).then(function(data) {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == newSample);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual
        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var barData = [
            {
                y: yticks,
                x: sample_values.slice(0, 10).reverse(),
                text: otu_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];

        var barLayout = {
            title: "Top 10 OTUs",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barData, barLayout);

        // Create a bubble chart that displays each sample
        var bubbleData = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: 'markers',
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: 'Earth'
                }
            }
        ];

        var bubbleLayout = {
            title: 'Bacteria Cultures Per Sample',
            showlegend: false,
            height: 600,
            width: 1200
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });
}

function updateMetadata(newSample) {
    d3.json(url).then(function(data) {
        var metadata = data.metadata;
        var resultArray = metadata.filter(metaObj => metaObj.id == newSample);
        var result = resultArray[0];

        // Select the panel with id of `#sample-metadata`
        var PANEL = d3.select("#sample-metadata");

        // Clear any existing metadata
        PANEL.html("");

        // Add each key and value pair to the panel
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}
