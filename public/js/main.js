$(document).ready(function() {

  $('.description-mindmap').hide();
  $('.description-calendar').hide();

  $('#calendar').on("mouseenter", function(){
    $('.description-calendar').show('slow');
  });

  $('#calendar').on("mouseleave", function(){
    $('.description-calendar').hide('slow');
  });

   $('#mindmap').on("mouseenter", function(){
    $('.description-mindmap').show('slow');
  });

  $('#mindmap').on("mouseleave", function(){
    $('.description-mindmap').hide('slow');
  });

//bootbox.prompt("This is the default prompt!", function(result){
 //        console.log(result); 
         //target.json({data: {name: inp} });
//});
        
// Passing in options

  $('.mySlideshows').cycle();

  var cy = cytoscape({
    container: document.getElementById('cy'),

//Default Layout

    elements: [
            // nodes
            { data: {id: '1.1', type: 'q', name: 'Question'} },
            { data: {id: '2.1', type: 'a', name: 'Answer'} },
            { data: {id: '2.2', type: 'a', name: 'Right Click to Edit Node Content'} },
            { data: {id: '2.3', type: 'a', name: 'Right Click to Add New Node'} },
            { data: {id: '2.4', type: 'a', name: 'Get Started'} },

            // edges
            {
              data: {
                id: 'q1a1',
                source: '1.1',
                target: '2.1'
              }
            }, {

              data: {
                id: 'q1a2',
                source: '1.1',
                target: '2.2'
              }
            }, {

              data: {
                id: 'q1a3',
                source: '1.1',
                target: '2.3'
              }
            }, {

              data: {
                id: 'q1a4',
                source: '1.1',
                target: '2.4'
              }
            }],

            style: [
            {
              selector: 'node',
              style: {
                width: 'label',
                height: 'label',
                shape: 'roundrectangle',
                'background-color': '#2D4262',
                'background-opacity': '0.7',
                'border-width': '1',
                'border-style': 'lined',
                'border-opacity': '1',
                label: 'data(name)',
                'text-wrap': 'wrap',
                'text-max-width': '50px',
                'text-valign': 'center',
                'text-halign': 'center',
                'padding': '7px'
              }
            }, {
              selector: 'edge',
              style: {
                width: '2.3',
                'line-color': '#2D4262',
                'curve-style': 'bezier'

              }
            }, {
              selector: '.edgehandles-hover',
              css: {
                'background-color': 'red'
              }
            },
            {
              selector: '.edgehandles-source',
              css: {
                'border-width': '2',
                'border-color': 'red'
              }
            },
            {
              selector: '.edgehandles-target',
              css: {
                'border-width': '2',
                'border-color': 'red'
              }
            },
            {
              selector: '.edgehandles-preview, .edgehandles-ghost-edge',
              css: {
                'line-color': 'red',
                'target-arrow-color': 'red',
                'source-arrow-color': 'red'
              }
            }],

            layout: {
              name: 'concentric',
              fit: false,
              circle: true,
              nodeDimensionsIncludeLabels: true
            }
          });

//Context Menu

var numQ = 0.1;
var numA = 0.4;
var numE = 0.4;

  var selectAllOfTheSameType = function(ele) {
    cy.elements().unselect();
    if(ele.isNode()) {
      cy.nodes().select();
    }
    else if(ele.isEdge()) {
      cy.edges().select();
    }
  };

  var unselectAllOfTheSameType = function(ele) {
    if(ele.isNode()) {
      cy.nodes().unselect();
    }
    else if(ele.isEdge()) {
      cy.edges().unselect();
    }
  };  
  
  var removed;
  var removedSelected;

  // demo your core ext
  var contextMenu = cy.contextMenus({
    menuItems: [
    {
      id: 'edit',
      content: 'Edit Content',
      selector: 'node',
      onClickFunction: function(event) {
        var target = event.target || event.cyTarget;

        var inp = prompt("Edit Content", "No content");
         target.json({data: {name: inp} });
      }
    },
    {
      id: 'remove',
      content: 'Remove',
      selector: 'node, edge',
      onClickFunction: function (event) {
        var target = event.target || event.cyTarget;
        removed = target.remove();
        
        contextMenu.showMenuItem('undo-last-remove');
      },
      hasTrailingDivider: true
    },
    {
      id: 'undo-last-remove',
      content: 'Undo Last Remove',
      selector: 'node, edge',
      show: false,
      coreAsWell: true,
      onClickFunction: function (event) {
        if (removed) {
          removed.restore();
        }
        contextMenu.hideMenuItem('undo-last-remove');
      },
      hasTrailingDivider: true
    },                      
    /*{
      id: 'hide',
      content: 'Hide',
      selector: '*',
      onClickFunction: function (event) {
        var target = event.target || event.cyTarget;
        target.hide();
      },
      disabled: false
    },*/
    {
      id: 'add-new-question',
      content: 'Add New Question',
      selector: '*',
      onClickFunction: function (event) {
        var target = event.target || event.cyTarget;
        
        var pos = event.position || event.cyPosition;
        var inp = prompt("Enter question", "No question");
        numQ += 0.1;
        var newID = 1 + numQ;
        numE += 0.1;
        var newEdge = 10 + numE;

        console.log("TID:" + newID + " pID: " + target.id());
        cy.add([
        {
          group: 'nodes', 
          data: {id: newID, type: 'q', name: inp},
          style: {
            'background-color': '#2D4262',
            'background-opacity': '0.8'
          }
        }, {
          group: 'edges',
          data: {
            id: newEdge,
            source: target.id(),
            target: newID
          }}
          ]);

        var layout = cy.elements().layout({
          name: 'concentric'
        });

        layout.run();
    }
  },
    {
      id: 'add-new-question',
      content: 'Add New Question',
      coreAsWell: true,
      onClickFunction: function (event) {
        
        var pos = event.position || event.cyPosition;
        var inp = prompt("Enter question", "No question entered");

        numQ += 0.1;
        var newID = 1 + numQ;
        
        cy.add([
        {
          group: 'nodes', 
          data: {id: newID, type: 'q', name: inp},
          position: {
            x: pos.x,
            y: pos.y
          },
          style: {
            'background-color': '#2D4262',
            'background-opacity': '0.8'
          }
        }]);

        var layout = cy.elements().layout({
          name: 'concentric'
        });

        layout.run();
      }
    },
    {
      id: 'add-new-answer',
      content: 'Add New Answer',
      selector: '*',
      //coreAsWell: false,
      onClickFunction: function (event) {
        var target = event.target || event.cyTarget;
        
        var pos = event.position || event.cyPosition;

        var inp = prompt("Enter answer", "No answer");

        numA += 0.1;
        var newID = 2 + numA;
        numE += 0.1;
        var newEdge = 10 + numE;
        
        cy.add([
        {
          group: 'nodes', 
          data: {id: newID, type: 'a', name: inp},
          style: {
            'background-color': 'green',
            'background-opacity': '0.8'
          }
        }, {
          group: 'edges',
          data: {
            id: newEdge,
            source: target.id(),
            target: newID
          }}
          ]);

        var layout = cy.elements().layout({
          name: 'concentric'
        });

        layout.run();
    }
  },
        {
      id: 'add-new-answer',
      content: 'Add New Answer',
      coreAsWell: true,
      onClickFunction: function (event) {
        
        var pos = event.position || event.cyPosition;
        var inp = prompt("Enter answer", "No answer");

        numA += 0.1;
        var newID = 2 + numA;
        
        cy.add([
        {
          group: 'nodes', 
          data: {id: newID, type: 'a', name: inp},
          position: {
            x: pos.x,
            y: pos.y
          },
          style: {
            'background-color': 'green',
            'background-opacity': '0.8'
          }
        }]);

        var layout = cy.elements().layout({
          name: 'concentric'
        });

        layout.run();
      }
    },
    {
      id: 'remove-selected',
      content: 'Remove Selected',
      coreAsWell: true,
      show: false,
      onClickFunction: function (event) {
        removedSelected = cy.$(':selected').remove();
        
        contextMenu.hideMenuItem('remove-selected');
        contextMenu.showMenuItem('restore-selected');
      }
    },
    {
      id: 'restore-selected',
      content: 'Restore Selected',
      coreAsWell: true,
      show: false,
      onClickFunction: function (event) {
        if (removedSelected) {
          removedSelected.restore();
        }
        //contextMenu.showMenuItem('remove-selected');
        contextMenu.hideMenuItem('restore-selected');
      }
    },                      
    {
      id: 'select-all-nodes',
      content: 'Select All Nodes',
      selector: 'node',
      show: true,
      onClickFunction: function (event) {
        selectAllOfTheSameType(event.target || event.cyTarget);
        
        contextMenu.hideMenuItem('select-all-nodes');
        contextMenu.showMenuItem('remove-selected');
        contextMenu.showMenuItem('unselect-all-nodes');
      }
    },
    {
      id: 'unselect-all-nodes',
      content: 'Unselect All Nodes',
      selector: 'node',
      show: false,
      onClickFunction: function (event) {
        unselectAllOfTheSameType(event.target || event.cyTarget);
        
        contextMenu.showMenuItem('select-all-nodes');
        contextMenu.hideMenuItem('remove-selected');
        contextMenu.hideMenuItem('unselect-all-nodes');
      }
    }]
  });


//Qtip

    cy.elements().qtip({
      content: function(){ return 'Posted by User ' + this.id() },
      position: {
        my: 'top center',
        at: 'bottom center'
      },
      style: {
        classes: 'qtip-bootstrap',
        tip: {
          width: 16,
          height: 8
        }
      }
    });

//Edge Handles to connect Nodes

    cy.edgehandles('drawon');

    cy.edgehandles({
     toggleOffOnLeave: true,
     handleNodes: "node",
     handleSize: 10,
     edgeType: function(){ return 'flat'; }
   });
 });