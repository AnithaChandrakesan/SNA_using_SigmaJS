var App = angular.module("SNA",[  ]);
App.controller("SNACtrl",function  ($scope)
{        var countforid=0;
        
        var g = {
                         nodes: [],
                         edges: []
                };
                var graph = {
                         nodes: [],
                         edges: []
                };
      
      //to call the adjacent nodes
	var adjacent=function(id)
	{
		console.log("inside adjacent")
		document.getElementById("graph-container").innerHTML="";
		graph.nodes=[];
		graph.edges=[];
		for(i=0;i<g.nodes.length;i++)
		{
			//Adding the selected node to an JSON
			if (id==g.nodes[i].id) {
				//console.log("g.nodes[i].id",g.nodes[i].id)
				graph.nodes.push(g.nodes[i]);
				console.log("graph nodes",graph.nodes);
				
				//console.log("g nodes after clear",g.nodes);
			}
		}
                getadjacent(callB,id,0,5);
                setTimeout(function() {
                                  
                                // get();
                                   
                  }, 100);
                var get=function()
                  {
                  console.log("Inside get");
               var from=0,size=5;
            
            
            for (win=0;win<3;win++) {
                 
                       getadjacent(callB,id,from,size);
                        from=from+size;
                        
                       console.log("from value is.........  ",from,"in loop...........",win);
            }} 
            
	}
	
	//callback for adjacent vertices and edges
	  var callB = function(url)
        {
           var datas=[];  var degreeChange=[];
            var comments_replies = 0,
            post_published=1,
            likes_count_fb=2,
            comments_all=3,
            type=4,
            post_id=5,
            type_post=6,
            shares=7,
            _type=8,
            id=9,
            likes=10,
            post_link=11,
            comments_base=12,
            post_published_unix=13,
            comment_likes=14,
            engagement=15,
	    eid=16,
            //elabel=17,
            //etype=18,
            //eweight=19,
            source=20,
            target=21;
           try
		{        // to parse the response obtained from server
		 json = $.parseJSON(url);
		 console.log("inside call b",json.response);
                  console.log("inside call b",json.response.edges.length);
		 	   var iswitch=true;
                        for(count=0;count<json.response.vertices.length;count++)
			{         var color ="#73FF36";
                                    datas[id]=json.response.vertices[count]._id;
                                    datas[comments_replies]=json.response.vertices[count].comments_replies;
                                    datas[post_published]=json.response.vertices[count].post_published;
                                    datas[likes_count_fb]=json.response.vertices[count].likes_count_fb;
                                    datas[comments_all]=json.response.vertices[count].comments_all;
                                    datas[type]=json.response.vertices[count].type;
                                    datas[post_id]=json.response.vertices[count].post_id;
                                    datas[type_post]=json.response.vertices[count].type_post;
                                    datas[shares]=json.response.vertices[count].shares;
                                    datas[_type]=json.response.vertices[count]._type;
                           
                                    datas[likes]=json.response.vertices[count].likes;
                                    datas[post_link]=json.response.vertices[count].post_link;
                                    datas[comments_base]=json.response.vertices[count].comments_base;
                                    datas[post_published_unix]=json.response.vertices[count].post_published_unix;
                                    datas[comment_likes]=json.response.vertices[count].comment_likes;
                                    datas[engagement]=json.response.vertices[count].engagement;
                                    
                                    if(countforid>0)
                                    {
                                                   
                                         for (a=0;a<graph.nodes.length;a++ ) {
                                                   
                                               if (datas[id] == graph.nodes[a].id && iswitch )
                                                {
                                                           //  console.log("inside if clash  at position   ",a,"   datas[id]     ",datas[id],"   g.nodes[a].id    ",g.nodes[a].id);
                                                             iswitch = false;
                                                             break;
                                                }
                                                else
                                                {
                                                  // console.log("  inside else datas[id]     ",datas[id],"   g.nodes[a].id    ",g.nodes[a].id);
                                                }
                                                   }          
                                    }
                                    if (countforid==0 || iswitch) {
				    graph.nodes.push({
                                                   id:datas[id],
                                                comments_replies :datas[comments_replies],
                                                post_published: datas[post_published],
                                                likes_count_fb:datas[likes_count_fb],
                                                comments_all:datas[comments_all],
                                                type:datas[type],
                                                post_id:datas[post_id],
                                                type_post :datas[type_post],
                                                shares:datas[shares],
                                                _type:datas[_type],
                                                label:datas[id],
                                                likes: datas[likes],
                                                post_link:datas[post_link],
                                                comments_base:datas[comments_base],
                                                post_published_unix :datas[post_published_unix],
                                                comment_likes:datas[comment_likes],
                                                engagement:datas[engagement],
                                                x:Math.random(),
                                                y:Math.random(),
                                                color:color,
                                                size:3
                                                });
                                    }
                                    countforid++;
                        }
                        
                        
                        
                        
                        
                       
                       // console.log("countforid",countforid)
                        for(count=0;count<json.response.edges.length;count++)
			{	
                                    datas[eid]=json.response.edges[count]._id;
                                    datas[source]=json.response.edges[count]._inV;
                                    datas[target]=json.response.edges[count]._outV;
                                    
                                   // console.log("countforid",countforid);
                                   
                                     if (countforid!=0) {
                                                //    console.log("inside checking for edges in callback event");
                                             for (a=0;a<graph.edges.length;a++ ) {
                                                  
                                               if (datas[eid] == graph.edges[a].id)
                                                {
                                                    //console.log("g.edges[a].id",g.edges[a].id);
                                                    //console.log("datas[eid]",datas[eid]);
                                                 //  console.log("clash for edges at",a);
                                                   iswitch = false;
                                                   break;
                                                }
                                                else{
                                                    
                                                }
                                     
                                     }}
                                      if (countforid==0) {
                                                   // console.log("pusing edges");
                                     graph.edges.push({
                                                id :datas[eid],
                                                source: datas[source],
                                                target:datas[target],
                                                   type:'curve',
                                                   color:"#73FF36"
                                                });              
                                    }
                                    if (countforid>0) {
                                                   if (iswitch) {
                                                
                                    var sswitch=false;
                          var tswitch=false;
                                    for(i=0;i<graph.nodes.length;i++)
                                                   {
                                                      if (datas[source]==graph.nodes[i].id) {
                                                                    console.log("inside edge source",datas[source]);
                                                                       sswitch=true;
                                                      }
                                                      else{
                                                                      console.log("existing source",datas[source]);
                                                      }
                                                      if (datas[target]==graph.nodes[i].id) {
                                                                    console.log("inside edge target",datas[target]);
                                                                       tswitch=true;
                                                      }
                                                      else{
                                                                      console.log("existing target",datas[target]);
                                                      }
                                                   }
                                     if(sswitch && tswitch)
                                     {
                                  graph.edges.push({
                                                id :datas[eid],
                                                source: datas[source],
                                                target:datas[target],
                                                   type:'curve',
                                                   color:"#73FF36"
                                                });              
                                    }
                                                   }
                                    console.log("g",graph);
                                   }
                                    else{
                                                   console.log("cant push edge");
                                    }
			}
                        
                        var degree=4,check=0;
                        for(n=0;n<graph.nodes.length;n++)
                        {
                                  var occurance=0;
                                  //source=g.edges[e].source;
                                  //target=g.edges[e].target;
                                  for(e=0;e<graph.edges.length;e++)
                                  {
                                                   if (graph.nodes[n].id==graph.edges[e].source ||graph.nodes[n].id==graph.edges[e].target) {
                                                        occurance+=1;          
                                                   }datas[check]=occurance;
                                  }
                                  degree=datas[check];
                                  if (degree>11) {
                                                   degreeChange.push({id:graph.nodes[n].id,degree:degree});
                                  }
                        }
                 
                      
                       clear("graph-container");
                      
    
var sigInst = sigma.init(document.getElementById('graph-container'));

sigInst.emptyGraph();
sigInst.kill();

sigInst.drawingProperties({
  defaultLabelColor: '#000',
  defaultLabelSize: 14,
  labelThreshold: 10,
  edgeColor:"source",
  defaultHoverLabelBGColor: "#002147",
  defaultLabelHoverColor: "#fff",
  hoverFontStyle: "bold",
  defaultNodeBorderColor:"#000",
  defaultEdgeType: 'curve'
}).graphProperties({
  minNodeSize: 2,
  maxNodeSize: 3
});
var i, n=0, e=0,
   N = graph.nodes.length,
    E = graph.edges.length;

for (i=0; i<N; i++){
//console.log("graph.nodes[i].id",g);
  sigInst.addNode(graph.nodes[i].id, graph.nodes[i]);
  
}
// Add edges:
for (i=0; i<E; i++){
                 console.log("graph.edges[i].id",graph.edges[i]);
  sigInst.addEdge(graph.edges[i].id, graph.edges[i].source, graph.edges[i].target,graph.edges[i]);
}
  var p = sigInst.position();

sigInst.goTo(
  p.stageX + 10,
  p.stageY + 10
);

 setTimeout(function() {   
                                  
         later();
                 }, 2000);
var later=function()
{
                 console.log("later",degreeChange.id);
                 
for(i=0;i<degreeChange.length;i++){
 var nodeId = degreeChange[i].id;
 var degre =degreeChange[i].degree;
    sigInst.iterNodes(function(n){
      n.size = degre;
      n.color = "#0DF2FF";
    },[nodeId]);    
}
    sigInst.graphProperties({
  minNodeSize: 3,
  maxNodeSize: 6
});
    //sigmajs.draw();

 }
 
 
//
//sigInst.iterEdges(function(edge) {
//  edge.color = '#333';
//});

sigInst.bind('overnodes', function(event) {
  console.log('Over nodes:', event.content[0]);
  for(i=0;i<g.nodes.length;i++)
  {
                 
                 if (event.content[0] ==g.nodes[i].id )
                 {
                                                   
                    var comments_replies = g.nodes[i].comments_replies;
                                  var likes_count_fb= g.nodes[i].likes_count_fb;
                                  var comments_all= g.nodes[i].comments_all;
                                  var post_published= g.nodes[i].post_published;
                                  var type= g.nodes[i].type;
                                  var post_id= g.nodes[i].post_id;
                                  var type_post= g.nodes[i].type_post;
                                  var shares= g.nodes[i].shares;
                                  var id= g.nodes[i].id;
                                  
                                  var comments_replies=g.nodes[i].comments_replies;
                                  var likes=g.nodes[i].likes;
                                  var post_link=g.nodes[i].post_link;
                                  var comments_base=g.nodes[i].comments_base;
                                  var post_published_unix=g.nodes[i].post_published_unix;
                                  var comment_likes=g.nodes[i].comment_likes;
                                  var engagement=g.nodes[i].engagement;
                                 
                                 //clear("viewdata");
                                $('#tooltip').show();
                                   $("#tooltip").append(" <span id="+'hovertext'+"><ul><li>id :"+id+"</li><li>type :"+type+"</li><li>comments_replies :"+comments_replies+"</li><li>likes_count_fb :"+likes_count_fb+"</li><li>post_published :"+post_published+"</li><li>shares :"+shares+"</li><li>post_id :"+post_id+"</li></ul></span>");
                               
                                 
                                 clear("id");clear("comments_replies");clear("post_published");clear("comments_all");
                                 clear("type");clear("post_id");clear("type_post");clear("shares");
                                 clear("likes");clear("post_link");clear("comments_base");clear("post_published_unix");
                                 clear("comment_likes");clear("engagement");clear("likes_count_fb");
                               clear("idd");
                                 
                                 if (likes_count_fb) {
                                  $("#likes_count_fb").append(" <span><ul><li> likes_count_fb :   "+likes_count_fb+"</li></ul></span>");
                                 }
                                  
                                   $("#idd").append(" <span> "+id+"</span>");
                                  $("#id").append(" <span><ul><li> id :   "+id+"</li></ul></span>");
                                   $("#comments_replies").append(" <span><ul><li> comments_replies :   "+comments_replies+"</li></ul></span>");
                                  if (post_published) {
                                    $("#post_published").append(" <span><ul><li> post_published :   "+post_published+"</li></ul></span>");
                                  }
                                   $("#comments_all").append(" <span><ul><li> comments_all :   "+comments_all+"</li></ul></span>");
                                    $("#type").append(" <span><ul><li> type :   "+type+"</li></ul></span>");
                                  if (post_published) {
                                     $("#post_id").append(" <span><ul><li> post_id :   "+post_id+"</li></ul></span>");
                                  }
                                  $("#type_post").append(" <span><ul><li> type_post :   "+type_post+"</li></ul></span>");
                                 if (shares) {
                                  $("#shares").append(" <span><ul><li> shares :   "+shares+"</li></ul></span>");
                                 }
                                  $("#likes").append(" <span><ul><li> likes :   "+likes+"</li></ul></span>");
                                  if (post_link) {
                                  $("#post_link").append(" <span><ul><li> post_link :"+post_link+"</li></ul></span>");
                                  }
                                  $("#comments_base").append(" <span><ul><li> comments_base :   "+comments_base+"</li></ul></span>");
                                  if (post_published_unix) {
                                  $("#post_published_unix").append(" <span><ul><li> post_published_unix :   "+post_published_unix+"</li></ul></span>");
                                  }
                                  if (comment_likes) {
                                  $("#comment_likes").append(" <span><ul><li> comment_likes :   "+comment_likes+"</li></ul></span>");
                                  }
                                  $("#engagement").append(" <span><ul><li> post_link :   "+engagement+"</li></ul></span>");
                                 
                                  
                                  var tooltipSpan = document.getElementById('tooltip');
                                  window.onmousemove=function(e){
                                                     var x=e.clientX,y=e.clientY;
                                                   tooltipSpan.style.top=(y+20)+'px';
                                                   tooltipSpan.style.left=(x+20)+'px';
                                                   }
                      //alert(" id "+id +"\n comments replies : "+comments_replies+"\n likes_count_fb : "+likes_count_fb+"\n post_published: "+post_published+"\n type: "+type);
                     break;
                 }
  }
 
})

 
 
                           sigInst.bind('outnodes', function(e) {
  $('#hovertext').remove();
  $('#tooltip').hide();
  
 })
                           
                           sigInst.bind('downnodes', function (d) {
                                  $('#hovertext').remove();
  $('#tooltip').hide();
				console.log("id",d.content[0]);
                                  adjacent(d.content[0]);
			});
                       

 sigInst.refresh();
  sigInst.startForceAtlas2();
                         //sigma.plugins.dragNodes(s,s.renderers[0]);
                       // console.log("nodes JSON",g);
                       // console.log("nodes JSON",edge);
                        $scope.stop=function()
        {
                 console.log("stop");
                // var sigInst = sigma.init(document.getElementById('graph-container'));
                 sigInst.stopForceAtlas2();
                 setTimeout(function()
                            {
                // shake(500);
                 },1000);
        }
         $scope.start=function()
        {
                 console.log("stop");
                // var sigInst = sigma.init(document.getElementById('graph-container'));
                 sigInst.startForceAtlas2();
                 
        }
		 
		}
		catch(e)
		{
			console.log("error",e);
		}
		 setTimeout(function () {
                $('#graph-container').show();
            }, 2000);
		  $('#loader').hide();
	   
	   
	}
        obj=document.getElementById("graph-container");
        function shake(interval) {
                 obj.style.right='10px';
                  setTimeout(function () {
                obj.style.right='0px';
            }, interval);
                 
        }
      
        //function to callback after getting the data from server
        var callBack = function(url)
        {   
            var degreeChange=[];
            var datas=[];
            var comments_replies = 0,
            post_published=1,
            likes_count_fb=2,
            comments_all=3,
            type=4,
            post_id=5,
            type_post=6,
            shares=7,
            _type=8,
            id=9,
            likes=10,
            post_link=11,
            comments_base=12,
            post_published_unix=13,
            comment_likes=14,
            engagement=15
            eid=16,
            source=20,
            target=21;
            
            
            
            
	    try
		{      
			json = $.parseJSON(url);
                        console.log("json.response.graph.edges------- ",json.response.graph.edges.length);
                        console.log("json.response.graph.vertices---------",json.response.graph.vertices.length);
                         var iswitch=true;
                        for(count=0;count<json.response.graph.vertices.length;count++)
			{         var color ="#73FF36";
                                    datas[id]=json.response.graph.vertices[count]._id;
                                    datas[comments_replies]=json.response.graph.vertices[count].comments_replies;
                                    datas[post_published]=json.response.graph.vertices[count].post_published;
                                    datas[likes_count_fb]=json.response.graph.vertices[count].likes_count_fb;
                                    datas[comments_all]=json.response.graph.vertices[count].comments_all;
                                    datas[type]=json.response.graph.vertices[count].type;
                                    datas[post_id]=json.response.graph.vertices[count].post_id;
                                    datas[type_post]=json.response.graph.vertices[count].type_post;
                                    datas[shares]=json.response.graph.vertices[count].shares;
                                    datas[_type]=json.response.graph.vertices[count]._type;
                           
                                    datas[likes]=json.response.graph.vertices[count].likes;
                                    datas[post_link]=json.response.graph.vertices[count].post_link;
                                    datas[comments_base]=json.response.graph.vertices[count].comments_base;
                                    datas[post_published_unix]=json.response.graph.vertices[count].post_published_unix;
                                    datas[comment_likes]=json.response.graph.vertices[count].comment_likes;
                                    datas[engagement]=json.response.graph.vertices[count].engagement;
                                    
                                    if(countforid>0)
                                    {
                                                   
                                         for (a=0;a<g.nodes.length;a++ ) {
                                                   
                                               if (datas[id] == g.nodes[a].id && iswitch )
                                                {
                                                           //  console.log("inside if clash  at position   ",a,"   datas[id]     ",datas[id],"   g.nodes[a].id    ",g.nodes[a].id);
                                                             iswitch = false;
                                                             break;
                                                }
                                                else
                                                {
                                                  // console.log("  inside else datas[id]     ",datas[id],"   g.nodes[a].id    ",g.nodes[a].id);
                                                }
                                                   }          
                                    }
                                    if (countforid==0 || iswitch) {
				    g.nodes.push({
                                                   id:datas[id],
                                                comments_replies :datas[comments_replies],
                                                post_published: datas[post_published],
                                                likes_count_fb:datas[likes_count_fb],
                                                comments_all:datas[comments_all],
                                                type:datas[type],
                                                post_id:datas[post_id],
                                                type_post :datas[type_post],
                                                shares:datas[shares],
                                                _type:datas[_type],
                                                label:datas[id],
                                                likes: datas[likes],
                                                post_link:datas[post_link],
                                                comments_base:datas[comments_base],
                                                post_published_unix :datas[post_published_unix],
                                                comment_likes:datas[comment_likes],
                                                engagement:datas[engagement],
                                                x:Math.random(),
                                                y:Math.random(),
                                                color:color,
                                                size:3
                                                });
                                    }
                                    countforid++;
                        }
                        
                        
                        
                        
                        
                       
                       // console.log("countforid",countforid)
                        for(count=0;count<json.response.graph.edges.length;count++)
			{	
                                    datas[eid]=json.response.graph.edges[count]._id;
                                    datas[source]=json.response.graph.edges[count]._inV;
                                    datas[target]=json.response.graph.edges[count]._outV;
                                    
                                   // console.log("countforid",countforid);
                                   
                                     if (countforid!=0) {
                                                //    console.log("inside checking for edges in callback event");
                                             for (a=0;a<g.edges.length;a++ ) {
                                                  
                                               if (datas[eid] == g.edges[a].id)
                                                {
                                                    //console.log("g.edges[a].id",g.edges[a].id);
                                                    //console.log("datas[eid]",datas[eid]);
                                                 //  console.log("clash for edges at",a);
                                                   iswitch = false;
                                                   break;
                                                }
                                                else{
                                                    
                                                }
                                     
                                     }}
                                      if (countforid==0) {
                                                   // console.log("pusing edges");
                                     g.edges.push({
                                                id :datas[eid],
                                                source: datas[source],
                                                target:datas[target],
                                                   type:'curve',
                                                   color:"#73FF36"
                                                });              
                                    }
                                    if (countforid>0) {
                                                   if (iswitch) {
                                                
                                    var sswitch=false;
                          var tswitch=false;
                                    for(i=0;i<g.nodes.length;i++)
                                                   {
                                                      if (datas[source]==g.nodes[i].id) {
                                                                    console.log("inside edge source");
                                                                       sswitch=true;
                                                      }
                                                      if (datas[target]==g.nodes[i].id) {
                                                                    console.log("inside edge target");
                                                                       tswitch=true;
                                                      }
                                                   }
                                     if(sswitch && tswitch)
                                     {
                                  g.edges.push({
                                                id :datas[eid],
                                                source: datas[source],
                                                target:datas[target],
                                                   type:'curve',
                                                   color:"#73FF36"
                                                });              
                                    }
                                                   }
                                    console.log("g",g);
                                   }
                                    else{
                                                   console.log("cant push edge");
                                    }
			}
                        
                        var degree=4,check=0;
                        for(n=0;n<g.nodes.length;n++)
                        {
                                  var occurance=0;
                                  //source=g.edges[e].source;
                                  //target=g.edges[e].target;
                                  for(e=0;e<g.edges.length;e++)
                                  {
                                                   if (g.nodes[n].id==g.edges[e].source ||g.nodes[n].id==g.edges[e].target) {
                                                        occurance+=1;          
                                                   }datas[check]=occurance;
                                  }
                                  degree=datas[check];
                                  if (degree>11) {
                                                   degreeChange.push({id:g.nodes[n].id,degree:degree});
                                  }
                        }
                 
                      
                       clear("graph-container");
                      
    
var sigInst = sigma.init(document.getElementById('graph-container'));

sigInst.emptyGraph();
sigInst.kill();

sigInst.drawingProperties({
  defaultLabelColor: '#000',
  defaultLabelSize: 14,
  labelThreshold: 10,
  edgeColor:"source",
  defaultHoverLabelBGColor: "#002147",
  defaultLabelHoverColor: "#fff",
  hoverFontStyle: "bold",
  defaultNodeBorderColor:"#000",
  defaultEdgeType: 'curve'
}).graphProperties({
  minNodeSize: 2,
  maxNodeSize: 3
});
var i, n=0, e=0,
   N = g.nodes.length,
    E = g.edges.length;

for (i=0; i<N; i++){
//console.log("graph.nodes[i].id",g);
  sigInst.addNode(g.nodes[i].id, g.nodes[i]);
  
}
// Add edges:
for (i=0; i<E; i++){
                 //console.log("graph.edges[i].id",g.edges[i]);
  sigInst.addEdge(g.edges[i].id, g.edges[i].source, g.edges[i].target,g.edges[i]);
}
  var p = sigInst.position();

sigInst.goTo(
  p.stageX + 10,
  p.stageY + 10
);

 setTimeout(function() {   
                                  
         later();
                 }, 2000);
var later=function()
{
                 console.log("later",degreeChange.id);
                 
for(i=0;i<degreeChange.length;i++){
 var nodeId = degreeChange[i].id;
 var degre =degreeChange[i].degree;
    sigInst.iterNodes(function(n){
      n.size = degre;
      n.color = "#0DF2FF";
    },[nodeId]);    
}
    sigInst.graphProperties({
  minNodeSize: 3,
  maxNodeSize: 6
});
    //sigmajs.draw();

 }
 
 
//
//sigInst.iterEdges(function(edge) {
//  edge.color = '#333';
//});

sigInst.bind('overnodes', function(event) {
  console.log('Over nodes:', event.content[0]);
  for(i=0;i<g.nodes.length;i++)
  {
                 
                 if (event.content[0] ==g.nodes[i].id )
                 {
                                                   
                    var comments_replies = g.nodes[i].comments_replies;
                                  var likes_count_fb= g.nodes[i].likes_count_fb;
                                  var comments_all= g.nodes[i].comments_all;
                                  var post_published= g.nodes[i].post_published;
                                  var type= g.nodes[i].type;
                                  var post_id= g.nodes[i].post_id;
                                  var type_post= g.nodes[i].type_post;
                                  var shares= g.nodes[i].shares;
                                  var id= g.nodes[i].id;
                                  
                                  var comments_replies=g.nodes[i].comments_replies;
                                  var likes=g.nodes[i].likes;
                                  var post_link=g.nodes[i].post_link;
                                  var comments_base=g.nodes[i].comments_base;
                                  var post_published_unix=g.nodes[i].post_published_unix;
                                  var comment_likes=g.nodes[i].comment_likes;
                                  var engagement=g.nodes[i].engagement;
                                 
                                 //clear("viewdata");
                                $('#tooltip').show();
                                   $("#tooltip").append(" <span id="+'hovertext'+"><ul><li>id :"+id+"</li><li>type :"+type+"</li><li>comments_replies :"+comments_replies+"</li><li>likes_count_fb :"+likes_count_fb+"</li><li>post_published :"+post_published+"</li><li>shares :"+shares+"</li><li>post_id :"+post_id+"</li></ul></span>");
                               
                                 
                                 clear("id");clear("comments_replies");clear("post_published");clear("comments_all");
                                 clear("type");clear("post_id");clear("type_post");clear("shares");
                                 clear("likes");clear("post_link");clear("comments_base");clear("post_published_unix");
                                 clear("comment_likes");clear("engagement");clear("likes_count_fb");
                               clear("idd");
                                 
                                 if (likes_count_fb) {
                                  $("#likes_count_fb").append(" <span><ul><li> likes_count_fb :   "+likes_count_fb+"</li></ul></span>");
                                 }
                                  
                                   $("#idd").append(" <span> "+id+"</span>");
                                  $("#id").append(" <span><ul><li> id :   "+id+"</li></ul></span>");
                                   $("#comments_replies").append(" <span><ul><li> comments_replies :   "+comments_replies+"</li></ul></span>");
                                  if (post_published) {
                                    $("#post_published").append(" <span><ul><li> post_published :   "+post_published+"</li></ul></span>");
                                  }
                                   $("#comments_all").append(" <span><ul><li> comments_all :   "+comments_all+"</li></ul></span>");
                                    $("#type").append(" <span><ul><li> type :   "+type+"</li></ul></span>");
                                  if (post_published) {
                                     $("#post_id").append(" <span><ul><li> post_id :   "+post_id+"</li></ul></span>");
                                  }
                                  $("#type_post").append(" <span><ul><li> type_post :   "+type_post+"</li></ul></span>");
                                 if (shares) {
                                  $("#shares").append(" <span><ul><li> shares :   "+shares+"</li></ul></span>");
                                 }
                                  $("#likes").append(" <span><ul><li> likes :   "+likes+"</li></ul></span>");
                                  if (post_link) {
                                  $("#post_link").append(" <span><ul><li> post_link :"+post_link+"</li></ul></span>");
                                  }
                                  $("#comments_base").append(" <span><ul><li> comments_base :   "+comments_base+"</li></ul></span>");
                                  if (post_published_unix) {
                                  $("#post_published_unix").append(" <span><ul><li> post_published_unix :   "+post_published_unix+"</li></ul></span>");
                                  }
                                  if (comment_likes) {
                                  $("#comment_likes").append(" <span><ul><li> comment_likes :   "+comment_likes+"</li></ul></span>");
                                  }
                                  $("#engagement").append(" <span><ul><li> post_link :   "+engagement+"</li></ul></span>");
                                 
                                  
                                  var tooltipSpan = document.getElementById('tooltip');
                                  window.onmousemove=function(e){
                                                     var x=e.clientX,y=e.clientY;
                                                   tooltipSpan.style.top=(y+20)+'px';
                                                   tooltipSpan.style.left=(x+20)+'px';
                                                   }
                      //alert(" id "+id +"\n comments replies : "+comments_replies+"\n likes_count_fb : "+likes_count_fb+"\n post_published: "+post_published+"\n type: "+type);
                     break;
                 }
  }
 
})

 
 
                           sigInst.bind('outnodes', function(e) {
  $('#hovertext').remove();
  $('#tooltip').hide();
  
 })
                           
                           sigInst.bind('downnodes', function (d) {
                                  $('#hovertext').remove();
  $('#tooltip').hide();
				console.log("id",d.content[0]);
			adjacent(d.content[0]);
			});
                       

 sigInst.refresh();
  sigInst.startForceAtlas2();
                         //sigma.plugins.dragNodes(s,s.renderers[0]);
                       // console.log("nodes JSON",g);
                       // console.log("nodes JSON",edge);
                        $scope.stop=function()
        {
                 console.log("stop");
                // var sigInst = sigma.init(document.getElementById('graph-container'));
                 sigInst.stopForceAtlas2();
                 setTimeout(function()
                            {
                // shake(500);
                 },1000);
        }
         $scope.start=function()
        {
                 console.log("stop");
                // var sigInst = sigma.init(document.getElementById('graph-container'));
                 sigInst.startForceAtlas2();
                 
        }
        	}
		catch (e)
		{
			  console.log("Error Has Occured",e);
                          
		}
            //    setTimeout(function () {
            //    $('#graph-container').show();
            //}, 400);
		  $('#loader').hide();
            //     setInterval(function(){
            //            calll();
            //}, 5000);
           
          
	}
        $scope.call=function()
        {
                var from=0,size=150;
                 getGraph(callBack,from,size);
                 
                 //setTimeout(function() {   
                 //                  calll();
                 //                  
                 //}, 5000);
                 
                 
        }
        //to call the API to get data
        var calll=function()
        {
                  console.log("Inside call");
            var from=0,size=10;
            
            
            for (win=0;win<2;win++) {
                // from=from+size;
                       getGraph(callBack,from,size);
                        from=from+size;
                        //size=10;
                       console.log("from value is.........  ",from,"in loop...........",win);
            }
             
            //           window.setInterval(function(){
            //            getGraph(callBack,from=from+10,size);
            //}, 5000);
            // 
            
        }
 
       
});