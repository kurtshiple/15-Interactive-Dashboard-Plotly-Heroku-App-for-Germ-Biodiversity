function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel
  var metaurl =`/metadata/${sample}`
  var paneldiv=d3.select('#sample-metadata')
  paneldiv.html("")
  var tbody=paneldiv.append('tbody')
  d3.json(metaurl).then(function(data){
    Object.entries(data).forEach(([key,value])=>{
      var row=tbody.append('tr')
      row.append('td').text(`${key}: ${value}`)
    })
  })

}
 
 function buildCharts(sample) {
 
    // @TODO: Use `d3.json` to fetch the sample data for the plots
  buildchartsurl=`/samples/${sample}`
    // @TODO: Build a Bubble Chart using the sample data
 
      d3.json(buildchartsurl).then(function(response) {
        var returnedobject = response[0]
        console.log(returnedobject);
 
        var ids = returnedobject.otu_ids
        var values = returnedobject.sample_values
        var labels = returnedobject.otu_labels
 
        var traceone = {
 
          x: ids,
          y: values,
          mode: 'markers',
          text:labels,
          marker:{
            size: values,
            color: ids
          }
        };
        var bubblechart = [traceone]
 
 
 
        Plotly.newPlot("bubble", bubblechart);

        var toptenvalues = values.slice(0,10)
        var toptenids = ids.slice(0,10)
        var toptenlabels=labels.slice(0,10)
        var tracetwo={
          values: toptenvalues,
          labels: toptenids,
          hovertext: toptenlabels,
          hoverinfo: "label+text+value+percent",
          type: "pie"
        } 
        var piechartdata=[tracetwo]

        Plotly.newPlot('pie',piechartdata)
    })

 
  
  }
 
    buildCharts();
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
 
 
 function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select('#selDataset');
 
  // Use the list of sample names to populate the select options
  d3.json('/names').then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append('option')
        .text(sample)
        .property('value', sample);
    });
 
    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
 }
 
 function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
 }
 
 // Initialize the dashboard
 init();