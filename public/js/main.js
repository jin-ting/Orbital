$(document).ready(function() {


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
            { data: {id: 'q1', name: 'Question'} },
            { data: {id: 'a1', name: 'Answer'} },
            { data: {id: 'a2', name: 'Right Click to Edit Node Content'} },
            { data: {id: 'a3', name: 'Right Click to Add New Node'} },
            { data: {id: 'a4', name: 'Get Started'} },

            // edges
            {
              data: {
                id: 'q1a1',
                source: 'q1',
                target: 'a1'
              }
            }, {

              data: {
                id: 'q1a2',
                source: 'q1',
                target: 'a2'
              }
            }, {

              data: {
                id: 'q1a3',
                source: 'q1',
                target: 'a3'
              }
            }, {

              data: {
                id: 'q1a4',
                source: 'q1',
                target: 'a4'
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
                'text-max-width': '20',
                'text-valign': 'center',
                'text-halign': 'center'
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
              name: 'circle',
              fit: false,
              circle: true,
              animate: true,
              boundingBox: undefined,
              nodeDimensionsIncludeLabels: true
            }
          });

//Context Menu

var numQ = 1;
var numA = 4;

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
        
        cy.add([
        {
          group: 'nodes', 
          data: {id: 'q3', name: inp},
          style: {
            'background-color': '#2D4262',
            'background-opacity': '0.8'
          }
        }, {
          group: 'edges',
          data: {
            id: 'new',
            source: target.id(),
            target: 'q3'
          }}
          ]);
    }
  },
    {
      id: 'add-new-question',
      content: 'Add New Question',
      coreAsWell: true,
      onClickFunction: function (event) {
        
        var pos = event.position || event.cyPosition;
        var inp = prompt("Enter question", "No question entered");
        
        cy.add([
        {
          group: 'nodes', 
          data: {id: 'q2', name: inp},
          position: {
            x: pos.x,
            y: pos.y
          },
          style: {
            'background-color': '#2D4262',
            'background-opacity': '0.8'
          }
        }]);
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
        
        cy.add([
        {
          group: 'nodes', 
          data: {id: 'a5', name: inp},
          style: {
            'background-color': 'red',
            'background-opacity': '0.8'
          }
        }, {
          group: 'edges',
          data: {
            id: 'new',
            source: target.id(),
            target: 'a5'
          }}
          ]);
    }
  },
        {
      id: 'add-new-answer',
      content: 'Add New Answer',
      coreAsWell: true,
      onClickFunction: function (event) {
        
        var pos = event.position || event.cyPosition;
        var inp = prompt("Enter answer", "No answer");
        
        cy.add([
        {
          group: 'nodes', 
          data: {id: 'a6', name: inp},
          position: {
            x: pos.x,
            y: pos.y
          },
          style: {
            'background-color': '#73605B',
            'background-opacity': '0.8'
          }
        }]);
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