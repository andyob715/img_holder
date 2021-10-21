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
  { from: "Coupon Sent", width: 30, offset: -30 },
  { from: "Item Added to Web Cart", width: 50, offset: 15 },
  { from: "Live-Event", width: 40, offset: 40 },
  { from: "Live-Event", to: "Coupon Sent", value: 4 },
  { from: "Mobile", to: "Coupon Sent", value: 10 },
  { from: "Web", to: "Coupon Sent", value: 8 },
  { from: "Web", to: "Targeted Ad", value: 4 },
  { from: "Store Checkout", to: "Targeted Ad", value: 3 },
  { from: "Coupon Sent", to: "Item Viewed", value: 10 },
  { from: "Coupon Sent", to: "Inactive(>30d)", value: 5 },
  { from: "Coupon Sent", to: "Item Added to Web Cart", value: 7 },
  { from: "Targeted Ad", to: "Item Added to Web Cart", value: 6 },    
  { from: "Item Viewed", to: "No Action Taken", value: 5 },
  { from: "Item Added to Web Cart", to: "Purchase", value: 1 },
  { from: "Item Added to Web Cart", to: "Purchase", value: 9 }, 
  { from: "Item Viewed", to: "Inactive(>30d)", value: 5 },  
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