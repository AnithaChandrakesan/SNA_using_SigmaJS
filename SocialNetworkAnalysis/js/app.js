var App = angular.module("SNA",[  ]);
App.controller("SNACtrl",function  ($scope)
{        var countforid=0, loopcount=0;var countforcb=0;
                var g = { nodes: [],edges: []};
                var graph = {nodes: [], edges: []};
                var top10 ={nodes: [],edges: []};
                var dg=[];
	// function to call top10 adjacent nodes
        $scope.adj=function()
	{
            clear("ABC");
            var sigInst = sigma.init(document.getElementById('ABC'));
            sigInst.emptyGraph();
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
            
             for (i=0; i<10; i++){
                 if (graph.nodes[i]!=undefined) {
                                  dg.push(graph.nodes[0])
				  top10.nodes.push(graph.nodes[i]);}
		 }
	  //check if edge source and target node exits 
             for (i=0; i<9; i++)
             {
                  var srcswitch=false;
                  var tgtswitch=false;
                 if (graph.edges[i]!=undefined)
                 {
                        for(j=0;j<top10.nodes.length;j++)
                        {
                             if (graph.edges[i].source==top10.nodes[j].id) {
                                   srcswitch=true;
                              }
                              if (graph.edges[i].target==top10.nodes[j].id) {
                                   tgtswitch=true;
                              }
                        }
                       if (srcswitch && tgtswitch) {
                              top10.edges.push(graph.edges[i]);
                              }
                              
                 }
                
             }
	     //check for node repetetion
            for (i=0; i< top10.nodes.length; i++){
                 for (j=i+1; j< top10.nodes.length; j++){
                                  var iflag=false;
                                  if (top10.nodes[i].id==top10.nodes[j].id) {
                                                   iflag=true;
                                  }
                                  if (iflag) {
                                                  top10.nodes.splice(i,1);
                                                  
                                  }
                  }
             }
	     //check for edge repetetion
             for (i=0; i< top10.edges.length; i++){
                 for (j=i+1; j< top10.edges.length; j++){
                                 var iflag=false;
                                  if (top10.edges[i].id==top10.edges[j].id) {
                                                   iflag=true;
                                  }
                                  if (iflag) { top10.edges.splice(i,1);}
            }}
            var i,e,n,
            N=top10.nodes.length,
            E=top10.edges.length;
	    //add nodes into sigma
             for (i=0; i<N; i++)
		sigInst.addNode(top10.nodes[i].id, top10.nodes[i]);
             // Add edges into sigma
            for (i=0; i<E; i++)
              sigInst.addEdge(top10.edges[i].id, top10.edges[i].source, top10.edges[i].target,top10.edges[i]);
             
             var p = sigInst.position();
             
             sigInst.goTo(
               p.stageX + 10,
               p.stageY + 10
             );
	     //increase the size and color of node with more degree
                 for(i=0;i<dg.length;i++){
                 var nodeId = dg[i].id;
                 sigInst.iterNodes(function(n){
                      n.size = 6;
                      n.color = "#0DF2FF";
                    },[nodeId]);    
                }
                sigInst.graphProperties({
                  minNodeSize: 3,
                  maxNodeSize: 6
                });
             
             // on node click;
              sigInst.bind('downnodes', function (d) {
                                 top10adj(d.content[0]);
                                 $('#tabA').tab('show')
			});
                       
                 sigInst.startForceAtlas2();
                 setTimeout(function() {
                                  
                                sigInst.stopForceAtlas2();
                                   
                  }, 3000);         
        }
	//function to call for further exploration
        var top10adj=function(id)
	{
		//clear viewdata area
                 countforcb=0;
                  clear("id");clear("comments_replies");clear("post_published");clear("comments_all");
                  clear("type");clear("post_id");clear("type_post");clear("shares");
                  clear("likes");clear("post_link");clear("comments_base");clear("post_published_unix");
                  clear("comment_likes");clear("engagement");clear("likes_count_fb");
                  clear("idd"); clear("cmnts"); clear("pst"); clear("li");
                                 
                 graph.nodes=[];
		 graph.edges=[];
                 for(i=0;i<top10.nodes.length;i++)
		 {
			//Adding the selected node to an JSON
			if (id==top10.nodes[i].id) {
				graph.nodes.push(top10.nodes[i]);
			}
		}
                var from=0,size=5;
                  for (win=0;win<10;win++) {
                   getadjacent(callB,id,from,size);
                        from=from+size;           
            }     
        }
                
      //to call the adjacent nodes
	var adjacent=function(id)
	{        
                document.getElementById("tab").style.visibility="visible";
		document.getElementById("graph-container").innerHTML="";
		graph.nodes=[];
		graph.edges=[];
                for(i=0;i<g.nodes.length;i++)
		{//Adding the selected node to an JSON
			if (id==g.nodes[i].id) {
				graph.nodes.push(g.nodes[i]);
				
			}
		}
                getadjacent(callB,id,0,10);
                setTimeout(function() {
                                 get();
                                   
                  }, 100);
                var get=function()
                  {
			var from=0,size=10;
			for (win=0;win<10;win++) {
				getadjacent(callB,id,from,size);
				from=from+size;
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
            source=20,
            target=21;
           try
		{        // to parse the response obtained from server
                 
		json = $.parseJSON(url);
		loopcount++;
                var iswitch=true;
                        for(count=0;count<json.response.vertices.length;count++)
			{           var color ="#73FF36";
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
                                    
                                    if(countforcb>0)
                                    {
                                        for (a=0;a<graph.nodes.length;a++ ) {
                                              if (datas[id] == graph.nodes[a].id && iswitch )
                                                {
                                                        iswitch = false;
                                                        break;
                                                }
                                                
                                        }          
                                    }
				  //  push the nodes into grapj JSON
                                    if (countforcb==0 || iswitch) {
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
                                   
                        }
                        for(count=0;count<json.response.edges.length;count++)
			{	
                                    datas[eid]=json.response.edges[count]._id;
                                    datas[source]=json.response.edges[count]._inV;
                                    datas[target]=json.response.edges[count]._outV;
                                   
                                     if (countforcb!=0) {
                                             for (a=0;a<graph.edges.length;a++ ) {
                                               if (datas[eid] == graph.edges[a].id)
                                                {
                                                
                                                   iswitch = false;
                                                   break;
                                                }
                                     }}
				     //push the edges into graph JSON
                                    if (countforcb==0) {
                                      graph.edges.push({
                                                id :datas[eid],
                                                source: datas[source],
                                                target:datas[target],
                                                   type:'curve',
                                                   color:"#73FF36"
                                                });              
                                    }
				    //check if edge source and target node exists
                                    if (countforcb>0) {
                                                   if (iswitch) {
                                                
					 var sswitch=false;
					 var tswitch=false;
					 for(i=0;i<graph.nodes.length;i++)
                                                   {if (datas[source]==graph.nodes[i].id) {
                                                                   sswitch=true;
                                                      }
                                                      if (datas[target]==graph.nodes[i].id) {
                                                                   tswitch=true;
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
                                     
                                 }}
                                 
			}
                        //check for nodes with more degree
                        var degree=4,check=0;
                        for(n=0;n<graph.nodes.length;n++)
                        {
                                  var occurance=0;
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
                 
                       countforcb++;
                       clear("graph-container");
                                 
                     //render graph using sigma
			var sigInst = sigma.init(document.getElementById('graph-container'));
			
			sigInst.emptyGraph();
			
			
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
			
			//add nodes
			for (i=0; i<N; i++)
				sigInst.addNode(graph.nodes[i].id, graph.nodes[i]);
			
			// Add edges:
			for (i=0; i<E; i++){
					
			  sigInst.addEdge(graph.edges[i].id, graph.edges[i].source, graph.edges[i].target,graph.edges[i]);
			}
			  var p = sigInst.position();
			
			sigInst.goTo(
			  p.stageX + 10,
			  p.stageY + 10
			);
			
			 setTimeout(function() {
				 
				 if(degreeChange.length>0)
				 {                           
				 later();
				 }
					 }, 1000);
			 //increase the node size and color of nodes with higher degree
			var later=function()
			{
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

				 
			 }
			 //overnodes function
			sigInst.bind('overnodes', function(event) {
					 document.getElementById("Header").style.backgroundColor = "white";
				for(i=0;i<graph.nodes.length;i++)
				{
					if (event.content[0] ==graph.nodes[i].id )
					{
							var comments_replies = graph.nodes[i].comments_replies;
							 var likes_count_fb= graph.nodes[i].likes_count_fb;
							 var comments_all= graph.nodes[i].comments_all;
							 var post_published= graph.nodes[i].post_published;
							 var type= graph.nodes[i].type;
							 var post_id= graph.nodes[i].post_id;
							 var type_post= graph.nodes[i].type_post;
							 var shares= graph.nodes[i].shares;
							 var id= graph.nodes[i].id;
							 var comments_replies=graph.nodes[i].comments_replies;
							 var likes=graph.nodes[i].likes;
							 var post_link=graph.nodes[i].post_link;
							 var comments_base=graph.nodes[i].comments_base;
							 var post_published_unix=graph.nodes[i].post_published_unix;
							 var comment_likes=graph.nodes[i].comment_likes;
							 var engagement=graph.nodes[i].engagement;
							
							
						       $('#tooltip').show();
							  $("#tooltip").append(" <span id="+'hovertext'+"><ul><li>id :"+id+"</li><li>type :"+type+"</li><li>comments_replies :"+comments_replies+"</li><li>likes_count_fb :"+likes_count_fb+"</li><li>post_published :"+post_published+"</li><li>shares :"+shares+"</li><li>post_id :"+post_id+"</li></ul></span>");
						      
						      //clear viewdata area
							
							clear("id");clear("comments_replies");clear("post_published");clear("comments_all");
							clear("type");clear("post_id");clear("type_post");clear("shares");
							clear("likes");clear("post_link");clear("comments_base");clear("post_published_unix");
							clear("comment_likes");clear("engagement");clear("likes_count_fb");
						      clear("idd"); clear("cmnts"); clear("pst"); clear("li");
							
							//add information about an node on mouse over
							 
							  $("#idd").append(" <span> "+id+"</span>");
							
							$("#type").append(" <span><ul> Type :   "+type+"</ul></span>");
							
							if (comments_replies||comment_likes||comments_all||comments_base) {
							    $("#cmnts").append(" <span><ul> COMMENTS </ul></span>");
							     document.getElementById("cmnts").style.color = "#14AAC2";
							}
							
							
							  $("#comments_replies").append(" <span><ul> Replies :   "+comments_replies+"</ul></span>");
							   $("#comments_all").append(" <span><ul> Comments all :   "+comments_all+"</ul></span>");
							$("#comments_base").append(" <span><ul> Comments Base :   "+comments_base+"</ul></span>");
							 if (comment_likes) {
							 $("#comment_likes").append(" <span><ul> Likes :   "+comment_likes+"</ul></span>");
							 }
							 
							 if (post_id||post_link||type_post||post_published||post_published_unix) {
							    $("#pst").append(" <span><ul> POST   </ul></span>");
							     document.getElementById("pst").style.color = "#14AAC2";
							}
							 
							 if (post_id) {
							    $("#post_id").append(" <span><ul> Id :   "+post_id+"</ul></span>");
							 }
							  $("#type_post").append(" <span><ul> Type :   "+type_post+"</ul></span>");
							 
							 if (post_link) {
							 $("#post_link").append(" <span><ul> Link :"+post_link+"</ul></span>");
							 }
							 
							 if (post_published) {
							   $("#post_published").append(" <span><ul> Published :   "+post_published+"</ul></span>");
							 }
							if (post_published_unix) {
							 $("#post_published_unix").append(" <span><ul> Published unix :   "+post_published_unix+"</ul></span>");
							 }
							 
							   
							 
							
							if (shares) {
							 $("#shares").append(" <span><ul> Shares :   "+shares+"</ul></span>");
							}
							 $("#likes").append(" <span><ul> Likes :   "+likes+"</ul></span>");
							  if (likes_count_fb) {
							 $("#likes_count_fb").append(" <span><ul> Likes Count :   "+likes_count_fb+"</ul></span>");
							}
							 
							 $("#engagement").append(" <span><ul> Engagement :   "+engagement+"</ul></span>");
							
							 
							
							   
							 var tooltipSpan = document.getElementById('tooltip');
							 window.onmousemove=function(e){
									    var x=e.clientX,y=e.clientY;
									  tooltipSpan.style.top=(y+20)+'px';
									  tooltipSpan.style.left=(x+20)+'px';
									  }
					     
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
						$scope.stop=function()
						 {
						   sigInst.stopForceAtlas2();
						 }
							$scope.start=function()
						       {
							       sigInst.startForceAtlas2();
								 setTimeout(function() {
										sigInst.stopForceAtlas2();
										  
								 }, 2500);
								
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
		//filter function
		$scope.showfilter=function()
		{
			  $('#graph-container').css({display: "none"});
			 $('#viewdata').css({display: "none"});
			 $('#filter').show();
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
                                                           iswitch = false;
                                                             break;
                                                }
                                              }          
                                    }
                                    //push the node into JSON array
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
                         for(count=0;count<json.response.graph.edges.length;count++)
			{	
                                    datas[eid]=json.response.graph.edges[count]._id;
                                    datas[source]=json.response.graph.edges[count]._inV;
                                    datas[target]=json.response.graph.edges[count]._outV;
                                    if (countforid!=0) {
                                             for (a=0;a<g.edges.length;a++ ) {
                                                if (datas[eid] == g.edges[a].id)
                                                {
                                                  iswitch = false;
                                                   break;
                                                }
                                      }}
                                      if (countforid==0) {
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
				    //check if edge source and target node exists
                                    for(i=0;i<g.nodes.length;i++)
                                                   {
                                                      if (datas[source]==g.nodes[i].id) {
                                                                    
                                                                       sswitch=true;
                                                      }
                                                      if (datas[target]==g.nodes[i].id) {
                                                                    
                                                                       tswitch=true;
                                                      }
                                                   }
				//pushinh the edge into JSON array
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
                                }
                                    
			}
                        
                        var degree=4,check=0;
                        for(n=0;n<g.nodes.length;n++)
                        {
                                  var occurance=0;
                                  
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
                      
                 //create sigma instance
             var sigInst = sigma.init(document.getElementById('graph-container'));
             
             sigInst.emptyGraph();
             
             //set drawing properties 
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
             console.log(N,E);
             for (i=0; i<N; i++)
            //add nodes
               sigInst.addNode(g.nodes[i].id, g.nodes[i]);
              
             // Add edges:
             for (i=0; i<E; i++)
                sigInst.addEdge(g.edges[i].id, g.edges[i].source, g.edges[i].target,g.edges[i]);
             
               var p = sigInst.position();
             
             sigInst.goTo(
               p.stageX + 10,
               p.stageY + 10
             );

                 setTimeout(function() {   
                                                  
                         later();
                                 }, 2000);
                var later=function()
                { //increase node size of nodes with higher degree
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
                   
                 }

                 sigInst.bind('overnodes', function(event) {
                   document.getElementById("Header").style.backgroundColor = "white";
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
                                 
                                 //tooltip
                                $('#tooltip').show();
                                   $("#tooltip").append(" <span id="+'hovertext'+"><ul><li>id :"+id+"</li><li>type :"+type+"</li><li>comments_replies :"+comments_replies+"</li><li>likes_count_fb :"+likes_count_fb+"</li><li>post_published :"+post_published+"</li><li>shares :"+shares+"</li><li>post_id :"+post_id+"</li></ul></span>");
                             
                               document.getElementById("viewdata").style.backgroundColor = "white";
                               document.getElementById("idd").style.color = "#14AAC2";
                                 //clear the viewdata area
                                 clear("id");clear("comments_replies");clear("post_published");clear("comments_all");
                                 clear("type");clear("post_id");clear("type_post");clear("shares");
                                 clear("likes");clear("post_link");clear("comments_base");clear("post_published_unix");
                                 clear("comment_likes");clear("engagement");clear("likes_count_fb");
                               clear("idd"); clear("cmnts"); clear("pst"); clear("li");
                                 $("#idd").append(" <span> "+id+"</span>");
                                 
                                 $("#type").append(" <span><ul> Type :   "+type+"</ul></span>");
                                 
                                 if (comments_replies||comment_likes||comments_all||comments_base) {
                                     $("#cmnts").append(" <span> COMMENTS <br><br></span>");
                                      document.getElementById("cmnts").style.color = "#14AAC2";
                                 }
                                 $("#comments_replies").append(" <span><ul> Replies :   "+comments_replies+"</ul></span>");
                                    $("#comments_all").append(" <span><ul> Comments all :   "+comments_all+"</ul></span>");
                                 $("#comments_base").append(" <span><ul> Comments Base :   "+comments_base+"</ul></span>");
                                  if (comment_likes) {
                                  $("#comment_likes").append("<span><ul> Likes :   "+comment_likes+"</ul></span>");
                                  }
                                  
                                  if (post_id||post_link||type_post||post_published||post_published_unix) {
                                     $("#pst").append(" <span> POST  </span><br><br>");
                                      document.getElementById("pst").style.color = "#14AAC2";
                                 }
                                  
                                  if (post_id) {
                                     $("#post_id").append(" <span><ul> Id :   "+post_id+"</ul></span>");
                                  }
                                   $("#type_post").append("<span><ul> Type :   "+type_post+"</ul></span>");
                                  
                                  if (post_link) {
                                  $("#post_link").append("<span><ul> Link :"+post_link+"</ul></span>");
                                  }
                                  
                                  if (post_published) {
                                    $("#post_published").append("<span><ul> Published :   "+post_published+"</ul></span>");
                                  }
                                 if (post_published_unix) {
                                  $("#post_published_unix").append(" <span><ul> Published unix :   "+post_published_unix+"</ul></span>");
                                  }
                                   if (shares) {
                                  $("#shares").append("<span><ul> Shares :   "+shares+"</ul></span>");
                                 }
                                  $("#likes").append(" <span><ul> Likes :   "+likes+"</ul></span>");
                                   if (likes_count_fb) {
                                  $("#likes_count_fb").append(" <span><ul> Likes Count :   "+likes_count_fb+"</ul></span>");
                                 }
                                  
                                  $("#engagement").append(" <span><ul> Engagement :   "+engagement+"</ul></span>");
                                 
                                var tooltipSpan = document.getElementById('tooltip');
                                  window.onmousemove=function(e){
                                                     var x=e.clientX,y=e.clientY;
                                                   tooltipSpan.style.top=(y+20)+'px';
                                                   tooltipSpan.style.left=(x+20)+'px';
                                                   }
                     
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
                
                        $scope.fnfilter=function()
                        {
                                 //call the filter function
                                 sigInst.stopForceAtlas2();
                                 filter(g);
                        }
                                    
                        //stop force layout
                        $scope.stop=function()
                        {
                                 sigInst.stopForceAtlas2();
                        }
			$scope.start=function()
		       {//start force layout
				sigInst.startForceAtlas2();
			}
        	}
		catch (e)
		{
			  console.log("Error Has Occured",e);
                          
		}
           
		  $('#loader').hide();
            
	}
        $scope.call=function()
        {
                  $('#no_recs').hide();
		 $('#filter').hide();
                var from=0,size=50;
                 getGraph(callBack,from,size);
                 
        }
         var arr={
                 nodes:[],
                 edges:[]
                 };
       
        var filter=function(g)
        {
		//clear viewdata area
                 clear("id");clear("comments_replies");clear("post_published");clear("comments_all");
                                 clear("type");clear("post_id");clear("type_post");clear("shares");
                                 clear("likes");clear("post_link");clear("comments_base");clear("post_published_unix");
                                 clear("comment_likes");clear("engagement");clear("likes_count_fb");
                               clear("idd"); clear("cmnts"); clear("pst"); clear("li");
                 arr.nodes=[];arr.edges=[];
                 var filterattr=[];
                 $('#graph-container').show();
                 $('#viewdata').show();
                  $('#filter').css({display: "none"});
		  
                 c_likes=document.getElementById("c_likes").value;
                 c_all=document.getElementById("c_all").value;
                 c_base=document.getElementById("c_base").value;
                 c_replies=document.getElementById("c_replies").value;
                 engagement=document.getElementById("engagement").value;
                 likes=document.getElementById("likes").value;
                 countfb=document.getElementById("likes_count_fb").value;
                 post=document.getElementById("post_published").value;
                 shares=document.getElementById("shares").value;
               
                
                 if (c_likes) {
                                  filterattr.push({"comment_likes":"c_likes"});
                 }
                  if (c_all) {
                                  filterattr.push({"comments_all":"c_all"});
                 }
                  if (c_base) {
                                  filterattr.push({"comments_base":"c_base"});
                 }
                  if (c_replies) {
                                  filterattr.push({"comments_replies":"c_replies"});
                 }
                  if (engagement) {
                                  filterattr.push("engagement:engagement");
                 }
                  if (likes) {
                                  filterattr.push({"likes":"likes"});
                 }
                  if (countfb) {
                                  filterattr.push({"likes_count_fb":"countfb"});
                 }
                  if (post) {
                                  filterattr.push({"post_published_unix":"post"});
                 }
                  if (shares) {
                                  filterattr.push({"shares":"shares"});
                 }
				//switch case to filter 
                                  switch(filterattr.length)
                                  {
                                                   case 1:
                                                                   
                                                                    g.nodes=g.nodes.filter(function(g){
                                                                    var abc=[];
                                                                    abc.push(Object.keys(filterattr[0]))
                                                                   if(g[abc[0][0]]>document.getElementById(filterattr[0][abc[0][0]]).value)
                                                                
                                                                    arr.nodes.push(g);
                                                                 
                                                                     })
                                                                    break;//end of case 1
                                                   case 2:
                                                                    
                                                                     g.nodes=g.nodes.filter(function(g){
                                                                    var abc=[];
                                                                     for(i=0;i<filterattr.length;i++)
                                                                    {
                                                                                     abc.push(Object.keys(filterattr[i]));
                                                                      }
                                                                       if(g[abc[0][0]]>document.getElementById(filterattr[0][abc[0][0]]).value && g[abc[1][0]]>document.getElementById(filterattr[1][abc[1][0]]).value )
                                                                                 arr.nodes.push(g);
                                                                                
                                                                     })
                                                                     break;//end of case 2
                                                   case 3:
                                                                    
                                                                     g.nodes=g.nodes.filter(function(g){
                                                                    var abc=[];
                                                                     for(i=0;i<filterattr.length;i++)
                                                                    { abc.push(Object.keys(filterattr[i]));
                                                                      }
                                                                      if(g[abc[0][0]]>document.getElementById(filterattr[0][abc[0][0]]).value && g[abc[1][0]]>document.getElementById(filterattr[1][abc[1][0]]).value && g[abc[2][0]]>document.getElementById(filterattr[2][abc[2][0]]).value )
                                                                                arr.nodes.push(g);
                                                                               
                                                                     })
                                                                     break;//end of case 3
                                                    case 4:
                                                                    
                                                                     g.nodes=g.nodes.filter(function(g){
                                                                    var abc=[];
                                                                     for(i=0;i<filterattr.length;i++)
                                                                    {abc.push(Object.keys(filterattr[i]));
                                                                      }
                                                                      if(g[abc[0][0]]>document.getElementById(filterattr[0][abc[0][0]]).value && g[abc[1][0]]>document.getElementById(filterattr[1][abc[1][0]]).value && g[abc[2][0]]>document.getElementById(filterattr[2][abc[2][0]]).value && g[abc[3][0]]>document.getElementById(filterattr[3][abc[3][0]]).value)
                                                                                arr.nodes.push(g);
                                                                                
                                                                     })
                                                                     break;//end of case 4
                                                    
                                                    case 5:
                                                                    
                                                                     g.nodes=g.nodes.filter(function(g){
                                                                    var abc=[];
                                                                     for(i=0;i<filterattr.length;i++)
                                                                    {abc.push(Object.keys(filterattr[i]));
                                                                      }
                                                                       if(g[abc[0][0]]>document.getElementById(filterattr[0][abc[0][0]]).value && g[abc[1][0]]>document.getElementById(filterattr[1][abc[1][0]]).value && g[abc[2][0]]>document.getElementById(filterattr[2][abc[2][0]]).value && g[abc[3][0]]>document.getElementById(filterattr[3][abc[3][0]]).value && g[abc[4][0]]>document.getElementById(filterattr[4][abc[4][0]]).value)
                                                                                    arr.nodes.push(g);
                                                                                
                                                                     })
                                                                     break;//end of case 5
                                                                    
                                                   
                                                    case 6:
                                                                   
                                                                     g.nodes=g.nodes.filter(function(g){
                                                                    var abc=[];
                                                                     for(i=0;i<filterattr.length;i++)
                                                                    {
                                                                                     abc.push(Object.keys(filterattr[i]));
                                                                      }
                                                                      
                                                                                if(g[abc[0][0]]>document.getElementById(filterattr[0][abc[0][0]]).value && g[abc[1][0]]>document.getElementById(filterattr[1][abc[1][0]]).value && g[abc[2][0]]>document.getElementById(filterattr[2][abc[2][0]]).value && g[abc[3][0]]>document.getElementById(filterattr[3][abc[3][0]]).value &&  g[abc[4][0]]>document.getElementById(filterattr[4][abc[4][0]]).value && g[abc[5][0]]>document.getElementById(filterattr[5][abc[5][0]]).value)
                                                                                  arr.nodes.push(g);
                                                                                
                                                                     })
                                                                     break;//end of case 6
                                                                    
                                                   
                                                    case 7:
                                                                    
                                                                     g.nodes=g.nodes.filter(function(g){
                                                                    var abc=[];
                                                                     for(i=0;i<filterattr.length;i++)
                                                                    {abc.push(Object.keys(filterattr[i]));
                                                                      }
                                                                      if(g[abc[0][0]]>document.getElementById(filterattr[0][abc[0][0]]).value && g[abc[1][0]]>document.getElementById(filterattr[1][abc[1][0]]).value && g[abc[2][0]]>document.getElementById(filterattr[2][abc[2][0]]).value && g[abc[3][0]]>document.getElementById(filterattr[3][abc[3][0]]).value && g[abc[4][0]]>document.getElementById(filterattr[4][abc[4][0]]).value && g[abc[5][0]]>document.getElementById(filterattr[5][abc[5][0]]).value && g[abc[6][0]]>document.getElementById(filterattr[6][abc[0][0]]).value && abc[7][0]>document.getElementById(filterattr[7][abc[7][0]]).value)
											arr.nodes.push(g);
                                                                                 
                                                                     })
                                                                     break;//end of case 7
                                                                    
                                                                    
                                  }//end of switch
                                  if (arr.nodes==null) {
                                            $('#graph-container').hide();
                                            $('#no_recs').show();
                                  }
                   
                     for(i=0;i<g.edges.length;i++)
                     {                             arsswitch=false;
                                                   artswitch=false;
                                  for(j=0;j<arr.nodes.length;j++)
                                  {               
                                                   if (g.edges[i].source==arr.nodes[j].id) {
                                                   arsswitch=true;
                                                   }
                                                    if (g.edges[i].target==arr.nodes[j].id) {
                                                     artswitch=true; }
                                                   
                                  }
                              
                                  if (arsswitch && artswitch) {
                                   arr.edges.push(g.edges[i]);
                                   }
                                                                    
                     }
                    

                       clear("graph-container");
                      
		//render graph for filtereg data
	    var sigInst = sigma.init(document.getElementById('graph-container'));
	    sigInst.emptyGraph();
	    
	    
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
	    
	       N = arr.nodes.length;
		E =arr.edges.length;
	    
	    for (i=0; i<N; i++){
	   
	      sigInst.addNode(arr.nodes[i].id, arr.nodes[i],arr.nodes[i].x=Math.random(),
				     arr.nodes[i].y=Math.random(),
				     arr.nodes[i].size=2);
	      
	    }
	    
	    // Add edges:
	    for (i=0; i<E; i++){
			    
	      sigInst.addEdge(arr.edges[i].id, arr.edges[i].source, arr.edges[i].target,arr.edges[i]);
	    }
	    var p = sigInst.position();
	    
	    sigInst.goTo(
	      p.stageX + 10,
	      p.stageY + 10
	    );
	    
	    sigInst.startForceAtlas2();
	   setTimeout(function() {sigInst.stopForceAtlas2(); }, 2000); }
	});