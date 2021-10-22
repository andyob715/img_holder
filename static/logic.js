$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
  });

  $('#myModal').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })

  

// SANKEY
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

var chart = am4core.create("chartdiv-sankey", am4charts.SankeyDiagram);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.data = [
  { from: "In-Store Checkout", width: 10, offset: 15 },
  { from: "In-Store Checkout", to: "Discount Coupon Emailed", value: 20 },
  { from: "In-Store Checkout", to: "Mobile Ad Sent", value: 35 },
  { from: "In-Store Checkout", to: "Facebook Ad", value: 30 },
  { from: "In-Store Checkout", to: "Reward Email Sent", value: 10 },
  { from: "In-Store Checkout", to: "VIP Sent", value: 5},
  { from: "Web Checkout", width: 30, offset: 15 },
  { from: "Web Checkout", to: "Discount Coupon Emailed", value: 100 },
  { from: "Web Checkout", to: "Mobile Ad Sent", value: 100 },
  { from: "Web Checkout", to: "Reward Email Sent", value: 75 },
  { from: "Web Checkout", to: "VIP Sent", value: 25},
  { from: "App Checkout", width: 50, offset: 40 },
  { from: "App Checkout", to: "Discount Coupon Emailed", value: 200 },
  { from: "App Checkout", to: "Mobile Ad Sent", value: 140 },
  { from: "App Checkout", to: "Facebook Ad", value: 125 },
  { from: "App Checkout", to: "VIP Sent", value: 35},
  { from: "Discount Coupon Emailed", to: "Website Visit" , value:57},
{ from: "Discount Coupon Emailed", to: "Mobile App Visit" , value:114},
{ from: "Discount Coupon Emailed", to: "Ghosted" , value:34},
{ from: "Mobile Ad Sent", to: "Website Visit" , value:57},
{ from: "Mobile Ad Sent", to: "Mobile App Visit" , value:114},
{ from: "Mobile Ad Sent", to: "Ghosted" , value:36},
{ from: "Facebook Ad", to: "Website Visit" , value:54},
{ from: "Facebook Ad", to: "Mobile App Visit" , value:95},
{ from: "Facebook Ad", to: "Ghosted" , value:37},
{ from: "Reward Email Sent", to: "Website Visit" , value:59},
{ from: "Reward Email Sent", to: "Mobile App Visit" , value:109},
{ from: "Reward Email Sent", to: "Ghosted" , value:34},
{ from: "VIP Sent", to: "Website Visit" , value:33},
{ from: "VIP Sent", to: "Mobile App Visit" , value:43},
{ from: "VIP Sent", to: "Ghosted" , value:24},
{ from: "Website Visit", to: "Item to Cart" , value: 50},
{ from: "Mobile App Visit", to: "Item to Cart" , value: 75},
{ from: "Item to Cart", to: "Cart Purchase" , value: 60},
{ from: "Item to Cart", to: "Cart Abandon" , value: 65},
{ from: "Website Visit", to: "Ghosted" , value: 100},
{ from: "Mobile App Visit", to: "Ghosted" , value: 60},

];

let hoverState = chart.links.template.states.create("hover");
hoverState.properties.fillOpacity = 0.6;

chart.dataFields.fromName = "from";
chart.dataFields.toName = "to";
chart.dataFields.value = "value";

// for right-most label to fit
chart.paddingRight = 120;

// make nodes draggable
var nodeTemplate = chart.nodes.template;
nodeTemplate.width = 20;

nodeTemplate.propertyFields.width = "width";

nodeTemplate.adapter.add("dx", function(dx, target) {
  return target.dataItem ? target.dataItem.dataContext.offset || dx : dx;
})

var tabulate = function (data,columns) {
  var table = d3.select('#table-sankey').append('table').attr("class","table table-sm table-hover")
	var thead = table.append('thead')
	var tbody = table.append('tbody')

	thead.append('tr')
	  .selectAll('th')
	    .data(columns)
	    .enter()
	  .append('th')
	    .text(function (d) { return d })

	var rows = tbody.selectAll('tr')
	    .data(data)
	    .enter()
	  .append('tr')

	var cells = rows.selectAll('td')
	    .data(function(row) {
	    	return columns.map(function (column) {
	    		return { column: column, value: row[column] }
	      })
      })
      .enter()
    .append('td')
      .text(function (d) { return d.value })

  return table;
}

d3.csv('Resources/tabledata.csv',function (data) {
	var columns = ["Flow","Intake","Target Action","Customer Response","Customer Action","Customer Terminating Action"]
  tabulate(data,columns)
})