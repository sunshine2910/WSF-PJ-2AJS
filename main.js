//Partie Environnement 

        //1ere Dataviz 
        am4core.ready(function() {

          // Themes begin
          am4core.useTheme(am4themes_animated);
          // Themes end
          
          // Create chart instance
          var chart = am4core.create("objectif", am4charts.XYChart);
          
          // Add data
          chart.data = [{
            "year": 2010,
            "income": 40,
            "expenses": 0,
            "name":"BAISSE DE LA CONSOMMATION D’ÉNERGIE PAR M2 DANS LES IMMEUBLES FRANCILIENS DE NATIXIS"
          },{
            "year": 2020,
            "income": 30,
            "expenses": 0,
            "name":"BAISSE DE LA CONSOMMATION D’ÉNERGIE DANS LA TOTALITÉ DES IMMEUBLES FRANCILIENS"
          }];
          
          // Create axes
          var categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
          categoryAxis.dataFields.category = "year";
          categoryAxis.numberFormatter.numberFormat = "#";
          categoryAxis.renderer.inversed = true;
          categoryAxis.renderer.grid.template.location = 0;
          categoryAxis.renderer.cellStartLocation = 0.1;
          categoryAxis.renderer.cellEndLocation = 0.9;
          
          var  valueAxis = chart.xAxes.push(new am4charts.ValueAxis()); 
          valueAxis.renderer.opposite = true;
          
          // Create series
          function createSeries(field, name) {
            var series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.valueX = field;
            series.dataFields.categoryY = "year";
            series.name = name;
            series.columns.template.tooltipText = "{name}: [bold]{valueX}[/]";
            series.columns.template.height = am4core.percent(100);
            series.sequencedInterpolation = true;
          
            var valueLabel = series.bullets.push(new am4charts.LabelBullet());
            valueLabel.label.text = "{valueX}";
            valueLabel.label.horizontalCenter = "left";
            valueLabel.label.dx = 10;
            valueLabel.label.hideOversized = false;
            valueLabel.label.truncate = false;
          
            var categoryLabel = series.bullets.push(new am4charts.LabelBullet());
            categoryLabel.label.text = "{name}";
            categoryLabel.label.horizontalCenter = "right";
            categoryLabel.label.dx = -10;
            categoryLabel.label.fill = am4core.color("#fff");
            categoryLabel.label.hideOversized = false;
            categoryLabel.label.truncate = false;
          }
          
          createSeries("income", "Income");
          
          }); // end am4core.ready()
          
          
          
        // 2eme dataviz


          am4core.ready(function() {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end
            
            var chart = am4core.create("diagramme2", am4plugins_forceDirected.ForceDirectedTree);
            
            var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
            networkSeries.dataFields.linkWith = "linkWith";
            networkSeries.dataFields.name = "name";
            networkSeries.dataFields.id = "name";
            networkSeries.dataFields.value = "value";
            networkSeries.dataFields.children = "children";
            
            networkSeries.nodes.template.label.text = "{name}"
            networkSeries.fontSize = 8;
            networkSeries.linkWithStrength = 0;
            
            var nodeTemplate = networkSeries.nodes.template;
            nodeTemplate.tooltipText = "{name}";
            nodeTemplate.fillOpacity = 1;
            nodeTemplate.label.hideOversized = true;
            nodeTemplate.label.truncate = true;
            
            var linkTemplate = networkSeries.links.template;
            linkTemplate.strokeWidth = 1;
            var linkHoverState = linkTemplate.states.create("hover");
            linkHoverState.properties.strokeOpacity = 1;
            linkHoverState.properties.strokeWidth = 2;
            
            nodeTemplate.events.on("over", function (event) {
                var dataItem = event.target.dataItem;
                dataItem.childLinks.each(function (link) {
                    link.isHover = true;
                })
            })
            
            nodeTemplate.events.on("out", function (event) {
                var dataItem = event.target.dataItem;
                dataItem.childLinks.each(function (link) {
                    link.isHover = false;
                })
            })
            
            networkSeries.data = [  
              {  
                  "name":"Recyclage",
                  "value":150,
                  "linkWith":[  
                    "Réduction de la production de déchets",
                    "Préservation des ressources"
                  ],
                  "children":[  
                    {  
                        "name":" 30% d’emballages en matières recyclées pour 2025",
                        "value":150
                    }
                    ]
              },{
                "name":"Réduction de la production de déchets",
                "value":150,
                "linkWith":[  
                  "Recyclage"
                ],
                "children":[  
                  {  
                      "name":" 352 Tonnes de papier trié",
                      "value":125,
                  "children":[  
                    {  
                        "name":" -25% de papier consommé",
                        "value":100
                    }
                    ]
                  },{
                    "name":"1,2 Tonnes de cartouche d'encres trié",
                    "value":125,
                "children":[  
                  {  
                      "name":" -33% de cartouche d'encres consommées",
                      "value":100
                  }
                  ]
                  },{
                    "name":"0,12 Tonnes de batterie triées",
                    "value":100
                  },{
                    "name":"3,5 Tonnes de gobelets en platique utilisés",
                    "value":125,
                    "children":[{
                      "name":"attribution d'un mug par personnes pour remplacer les gobelets en plastique"
                    }]
                  },{
                    "name":"0 Tonnes de dechets au quotidien avec Zero Waste",
                    "value":100
                  }
                  ]
              },{
                "name":"Préservation des ressources",
                "value":"150",
                "linkWith":[  
                  "Recyclage",
                  "Réduction de la production de déchets"
              ],
                "children":[{
                  "name":"En 2019, l'utilisation de l'energie verte en Allemange et en France est de 100%",
                  "value":150
                }]
              }
              ];


              }); // end am4core.ready()
              



          // 3 eme dataviz

          am4core.ready(function() {

            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end
            
            var chart = am4core.create("diagramme3", am4charts.XYChart);
            chart.hiddenState.properties.opacity = 0; // this makes initial fade in effect
            
            // using math in the data instead of final values just to illustrate the idea of Waterfall chart
            // a separate data field for step series is added because we don't need last step (notice, the last data item doesn't have stepValue)
            chart.data = [ {
              category: "imprimantes",
              value: -33,
              open: -5,
              stepValue: -5,
              color: '#998855' ,
              displayValue: -33
            }, {
              category: "utilisation de papier",
              value: -25 - -10,
              open: -5,
              stepValue: -5,
              color: '#998855' ,
              displayValue: -25
            },{
              category: "voitures éléctriques de fonction",
              value: 52,
              open: 10,
              stepValue: 10,
              color: '#5D527C',
              displayValue: 52
            },{
              category: "vehicules hybrides",
              value: 14,
              open: 10,
              stepValue: 10,
              color:  '#5D527C' ,
              displayValue: 14
            },{
              category: "consommation d'énérgie",
              value: -15,
              open: -5,
              stepValue: -5,
              color: '#4B8875',
              displayValue: -15
            },{
              category: "d’équipements en data center",
              value: 5,
              open: 0,
              stepValue: 0,
              color: '#A02A79' ,
              displayValue: 5
            },{
              category: "de services applicatifs",
              value: 63,
              open: 0,
              stepValue: 0,
              color: '#A02A79' ,
              displayValue: 63
            },];
            
            var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
            categoryAxis.dataFields.category = "category";
            categoryAxis.renderer.minGridDistance = 40;
            
            var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            
            var columnSeries = chart.series.push(new am4charts.ColumnSeries());
            columnSeries.dataFields.categoryX = "category";
            columnSeries.dataFields.valueY = "value";
            columnSeries.dataFields.openValueY = "open";
            columnSeries.fillOpacity = 0.8;
            columnSeries.sequencedInterpolation = true;
            columnSeries.interpolationDuration = 1500;
            
            var columnTemplate = columnSeries.columns.template;
            columnTemplate.strokeOpacity = 0;
            columnTemplate.propertyFields.fill = "color";
            
            var label = columnTemplate.createChild(am4core.Label);
            label.text = "{displayValue.formatNumber('#,#% ')}";
            label.align = "center";
            label.valign = "middle";
            
            
            var stepSeries = chart.series.push(new am4charts.StepLineSeries());
            stepSeries.dataFields.categoryX = "category";
            stepSeries.dataFields.valueY = "stepValue";
            stepSeries.noRisers = true;
            stepSeries.stroke = new am4core.InterfaceColorSet().getFor("alternativeBackground");
            stepSeries.strokeDasharray = "3,3";
            stepSeries.interpolationDuration = 2000;
            stepSeries.sequencedInterpolation = true;
            
            // because column width is 80%, we modify start/end locations so that step would start with column and end with next column
            stepSeries.startLocation = 0.1;
            stepSeries.endLocation = 1.1;
            
            chart.cursor = new am4charts.XYCursor();
            chart.cursor.behavior = "none";
            
            }); // end am4core.ready()



          



            // 4 eme dataviz

            am4core.ready(function() {

              // Themes begin
              am4core.useTheme(am4themes_kelly);
              am4core.useTheme(am4themes_animated);
              // Themes end
              
              // Create chart instance
              var chart = am4core.create("diagramme4", am4charts.XYChart);
              
              
              // Add data
              chart.data = [{
                "year": "2017",
                "europe": 12351,
                "namerica": 287218,
                "asia": 87.9,
                "lamerica": 18.2,
              }, {
                "year": "2018",
                "europe": 13403,
                "namerica": 225375,
                "asia": 94.4,
                "lamerica": 21.4,             
              }, {
                "year": "2019",
                "europe": 10543,
                "namerica": 219096,
                "asia": 91.4,
                "lamerica": 20.8,           
              }];
              
              // Create axes
              var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
              categoryAxis.dataFields.category = "year";
              categoryAxis.renderer.grid.template.location = 0;
              
              
              var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
              valueAxis.renderer.inside = true;
              valueAxis.renderer.labels.template.disabled = true;
              valueAxis.min = 0;
              
              
              // Create series
              function createSeries(field, name) {
                
                // Set up series
                var series = chart.series.push(new am4charts.ColumnSeries());
                series.name = name;
                series.dataFields.valueY = field;
                series.dataFields.categoryX = "year";
                series.sequencedInterpolation = true;
                
                // Make it stacked
                series.stacked = true;
                
                // Configure columns
                series.columns.template.width = am4core.percent(60);
                series.columns.template.tooltipText = "[bold]{name}[/]\n[font-size:14px]{categoryX}: {valueY}";
                
                // Add label
                var labelBullet = series.bullets.push(new am4charts.LabelBullet());
                labelBullet.label.text = "{valueY}";
                labelBullet.locationY = 0.5;
                labelBullet.label.hideOversized = true;
                
                return series;
              }
              
              createSeries("europe", "Nb de collaborateusr formés");
              createSeries("namerica", "Nb d’H de formation");
              createSeries("asia", "Part des collaborateurs formés");
              createSeries("lamerica", "Nb d’H de formation/formation");
              
              // Legend
              chart.legend = new am4charts.Legend();
              
              }); // end am4core.ready()










              //dataviz5
              am4core.ready(function() {

                // Themes begin
                am4core.useTheme(am4themes_animated);
                // Themes end
                
                var mainContainer = am4core.create("dataviz5", am4core.Container);
                mainContainer.width = am4core.percent(100);
                mainContainer.height = am4core.percent(100);
                mainContainer.layout = "horizontal";
                
                var usData = [
                  {
                    "age": "2016",
                    "male": 49,
                    "female": 51
                  },
                  {
                    "age": "2020",
                    "male": 51,
                    "female": 49
                  },
                  
                ];
                
                var maleChart = mainContainer.createChild(am4charts.XYChart);
                maleChart.paddingRight = 0;
                maleChart.data = JSON.parse(JSON.stringify(usData));
                
                // Create axes
                var maleCategoryAxis = maleChart.yAxes.push(new am4charts.CategoryAxis());
                maleCategoryAxis.dataFields.category = "age";
                maleCategoryAxis.renderer.grid.template.location = 0;
                //maleCategoryAxis.renderer.inversed = true;
                maleCategoryAxis.renderer.minGridDistance = 15;
                
                var maleValueAxis = maleChart.xAxes.push(new am4charts.ValueAxis());
                maleValueAxis.renderer.inversed = true;
                maleValueAxis.min = 0;
                maleValueAxis.max = 100;
                maleValueAxis.strictMinMax = true;
                
                maleValueAxis.numberFormatter = new am4core.NumberFormatter();
                maleValueAxis.numberFormatter.numberFormat = "#.#'%'";
                
                // Create series
                var maleSeries = maleChart.series.push(new am4charts.ColumnSeries());
                maleSeries.dataFields.valueX = "male";
                maleSeries.dataFields.valueXShow = "percent";
                maleSeries.calculatePercent = true;
                maleSeries.dataFields.categoryY = "age";
                maleSeries.interpolationDuration = 1000;
                maleSeries.columns.template.tooltipText = "Males, age{categoryY}: {valueX} ({valueX.percent.formatNumber('#.0')}%)";
                //maleSeries.sequencedInterpolation = true;
                
                
                var femaleChart = mainContainer.createChild(am4charts.XYChart);
                femaleChart.paddingLeft = 0;
                femaleChart.data = JSON.parse(JSON.stringify(usData));
                
                // Create axes
                var femaleCategoryAxis = femaleChart.yAxes.push(new am4charts.CategoryAxis());
                femaleCategoryAxis.renderer.opposite = true;
                femaleCategoryAxis.dataFields.category = "age";
                femaleCategoryAxis.renderer.grid.template.location = 0;
                femaleCategoryAxis.renderer.minGridDistance = 15;
                
                var femaleValueAxis = femaleChart.xAxes.push(new am4charts.ValueAxis());
                femaleValueAxis.min = 0;
                femaleValueAxis.max = 100;
                femaleValueAxis.strictMinMax = true;
                femaleValueAxis.numberFormatter = new am4core.NumberFormatter();
                femaleValueAxis.numberFormatter.numberFormat = "#.#'%'";
                femaleValueAxis.renderer.minLabelPosition = 0.01;
                
                // Create series
                var femaleSeries = femaleChart.series.push(new am4charts.ColumnSeries());
                femaleSeries.dataFields.valueX = "female";
                femaleSeries.dataFields.valueXShow = "percent";
                femaleSeries.calculatePercent = true;
                femaleSeries.fill = femaleChart.colors.getIndex(4);
                femaleSeries.stroke = femaleSeries.fill;
                //femaleSeries.sequencedInterpolation = true;
                femaleSeries.columns.template.tooltipText = "Females, age{categoryY}: {valueX} ({valueX.percent.formatNumber('#,0')}%)";
                femaleSeries.dataFields.categoryY = "age";
                femaleSeries.interpolationDuration = 1000;
                
                
                var mapChart = mainContainer.createChild(am4maps.MapChart);
                mapChart.projection = new am4maps.projections.Mercator();
                mapChart.geodata = am4geodata_usaAlbersLow;
                mapChart.zoomControl = new am4maps.ZoomControl();
                mapChart.zIndex = -1;
                
                var polygonSeries = mapChart.series.push(new am4maps.MapPolygonSeries())
                polygonSeries.useGeodata = true;
                
                var selectedStateId = "US";
                var selectedPolygon;
                var selectedStateName;
                
                var polygonTemplate = polygonSeries.mapPolygons.template;
                polygonTemplate.togglable = true;
                
                var hoverState = polygonTemplate.states.create("hover");
                hoverState.properties.fill = mapChart.colors.getIndex(2);
                
                var activeState = polygonTemplate.states.create("active");
                activeState.properties.fill = mapChart.colors.getIndex(6);
                
                polygonTemplate.events.on("hit", function(event) {
                  var id = event.target.dataItem.dataContext.id;
                  var stateId = id.split("-")[1];
                  showState(stateId, event.target.dataItem.dataContext.name, event.target);
                })
                
                
                mapChart.seriesContainer.background.events.on("over", function(event) {
                  showState(selectedStateId, selectedStateName, selectedPolygon);
                });
                
                
                function showState(id, stateName, polygon) {
                  if(selectedStateId != id){
                
                    var newData = stateData[id];
                
                    if (selectedPolygon) {
                      selectedPolygon.isActive = false;
                    }
                
                    for (var i = 0; i < femaleChart.data.length; i++) {
                      femaleChart.data[i].female = newData[i].female;
                      maleChart.data[i].male = newData[i].male;
                    }
                
                    femaleChart.invalidateRawData();
                    maleChart.invalidateRawData();
                
                    selectedStateName = stateName;
                    selectedStateId = id;
                    selectedPolygon = polygon;
                
                    label.text = stateName + " population pyramid";
                    label.hide(0);
                    label.show();
                   }
                }
                
                });



           
