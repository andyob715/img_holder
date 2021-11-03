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
{ from: "Mobile App Visit", to: "Item to Cart" , value: 175},
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

// Update table button based on user click
function confirm() {
  var change = document.getElementById("table-button");
  if (change.innerHTML == "Hide Table")
  {
      change.innerHTML = "Show Table";
  }
  else {
      change.innerHTML = "Hide Table";
  }
}

// Update table button based on user click
function confirm_f() {
  var change2 = document.getElementById("filter-button");
  if (change2.innerHTML == "Hide Filters")
  {
      change2.innerHTML = "Show Filters";
  }
  else {
      change2.innerHTML = "Hide Filters";
  }
}


// Create chart instance
var chart = am4core.create("suedecrocs", am4charts.RadarChart);

// Add data
chart.data = [{
  "category": "MVPs",
  "value": 80,
  "full": 100
}, {
  "category": "Active Customers",
  "value": 35,
  "full": 100
}, {
  "category": "Recent Purchasers",
  "value": 92,
  "full": 100,
}, {
  "category": "App-Fanatics",
  "value": 68,
  "full": 100
}];

// Make chart not full circle
chart.startAngle = -90;
chart.endAngle = 180;
chart.innerRadius = am4core.percent(20);

// Set number format
chart.numberFormatter.numberFormat = "#.#'%'";

// Create axes
var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "category";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.grid.template.strokeOpacity = 0;
categoryAxis.renderer.labels.template.horizontalCenter = "right";
categoryAxis.renderer.labels.template.fontWeight = 500;
categoryAxis.renderer.labels.template.adapter.add("fill", function(fill, target) {
  return (target.dataItem.index >= 0) ? chart.colors.getIndex(target.dataItem.index) : fill;
});
categoryAxis.renderer.minGridDistance = 10;

var valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
valueAxis.renderer.grid.template.strokeOpacity = 0;
valueAxis.min = 0;
valueAxis.max = 100;
valueAxis.strictMinMax = true;

// Create series
var series1 = chart.series.push(new am4charts.RadarColumnSeries());
series1.dataFields.valueX = "full";
series1.dataFields.categoryY = "category";
series1.clustered = false;
series1.columns.template.fill = new am4core.InterfaceColorSet().getFor("alternativeBackground");
series1.columns.template.fillOpacity = 0.08;
series1.columns.template.cornerRadiusTopLeft = 20;
series1.columns.template.strokeWidth = 0;
series1.columns.template.radarColumn.cornerRadius = 20;

var series2 = chart.series.push(new am4charts.RadarColumnSeries());
series2.dataFields.valueX = "value";
series2.dataFields.categoryY = "category";
series2.clustered = false;
series2.columns.template.strokeWidth = 0;
series2.columns.template.tooltipText = "{category}: [bold]{value}[/]";
series2.columns.template.radarColumn.cornerRadius = 20;

series2.columns.template.adapter.add("fill", function(fill, target) {
  return chart.colors.getIndex(target.dataItem.index);
});

// Add cursor
chart.cursor = new am4charts.RadarCursor(); 

var chart = am4core.create("suedecrocsfunnel", am4charts.SlicedChart);
chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect

chart.data = [
  {
    "name": "Product Purchased",
    "value": 50
},{
  "name": "Product Added to Cart",
  "value": 180
},{
  "name": "Customer Action",
  "value": 200
},{
  "name": "Activated via Connector",
  "value": 300
},{
    "name": "Total Audience Size",
    "value": 600
}];

var series = chart.series.push(new am4charts.PyramidSeries());
series.dataFields.value = "value";
series.dataFields.category = "name";
series.alignLabels = true;
series.valueIs = "height";


function confirm_premium(){
  var change3 = document.getElementById("premium-button");
  if (change3.innerHTML == "Hide Premium")
  {
      change3.innerHTML = "Show Premium";
  }
  else {
      change3.innerHTML = "Hide Premium";
  }
}

// creating the bullet chart heat map for Customer Journey Analytics
var chart = am4core.create("chartdiv-bubble", am4charts.XYChart);
chart.maskBullets = false;

// Setting the axes
var xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
var yAxis = chart.yAxes.push(new am4charts.CategoryAxis());

// Binding the category of data to teh axes
yAxis.dataFields.category = "Cohort";
xAxis.renderer.minGridDistance = 40;
xAxis.dataFields.category = "Funnel Stage";
// This puts tuts the Funnel Stage on top of the graph
xAxis.renderer.opposite = true;

// Setting the series data
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.categoryY = "Cohort";
series.dataFields.categoryX = "Funnel Stage";
series.dataFields.value = "Funnel Size";
// Setting up some placeholders to use in my tooltip later
series.dataFields.touchpointvalue = "Touchpoints";
series.dataFields.funnelretained = "Funnel Stage Retained"
series.dataFields.totalretained = "Total Audience Retained" 
series.columns.template.disabled = true;
series.sequencedInterpolation = true;
// Breaks inheritance of Tooltip and sets customer color
series.tooltip.getFillFromObject = false;
series.tooltip.background.fill = am4core.color("white");
series.tooltip.label.fill = am4core.color("black");
series.tooltip.interactionsEnabled = true;
series.tooltip.keepTargetHover = true;

var tooltipHTML = `<center><h6>{categoryY} : {categoryX}</h6></center>
<hr />
<table>
<tr>
  <th align="left">Size in Funnel</th>
  <td>{value}</td>
</tr>
<tr>
  <th align="left">% Retained (Last Stage)</th>
  <td>{funnelretained}</td>
</tr>
<tr>
  <th align="left">% Retained (Total)</th>
  <td>{totalretained}</td>
</tr>
<tr>
<th align="left">Average Touchpoints</th>
<td>{touchpointvalue}</td>
</tr>
</table>
<hr />
<p><strong>Touchpoint Breakdown</strong></p>  
<button type="button" class="btn btn-sm btn-light btn-outline-dark">
  Touchpoint #1 <span class="badge badge-success">4</span>
</button>
<button type="button" class="btn btn-sm btn-light btn-outline-dark">
Touchpoint #2 <span class="badge badge-warning">4</span>
</button>
<button type="button" class="btn btn-sm btn-light btn-outline-dark">
Touchpoint #3 <span class="badge badge-danger">4</span>
</button>`;

var bullet = series.bullets.push(new am4core.Circle());
bullet.tooltipHTML = tooltipHTML;
bullet.strokeWidth = 3;
bullet.stroke = am4core.color("#ffffff");
bullet.strokeOpacity = 0;



bullet.adapter.add("fill", function(fill,target){
  if(target.dataItem){
    if(target.dataItem.value >=622)
      {
        return am4core.color("green")
      }
    else if (target.dataItem.value >=393)
    {
      return am4core.color("yellow")
    }
    else {
      return am4core.color("red")
    }
  }
});

series.heatRules.push({
  property: "radius",
  target: bullet,
  min: 2,
  max: 25
});

bullet.hiddenState.properties.scale = 0.01;
bullet.hiddenState.properties.opacity = 1;

chart.scrollbarX = new am4core.Scrollbar();
chart.scrollbarY = new am4core.Scrollbar();

chart.dataSource.url = "Resources/bubbledata.csv";
chart.dataSource.parser = new am4core.CSVParser();
chart.dataSource.parser.options.useColumnNames = true;