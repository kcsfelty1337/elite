  var scene, camera, renderer, stationArray;

  function render() { 
   requestAnimationFrame( render ); 
   //animations
   renderer.render(scene, camera); 
  }; 

  // jQuery will call this function once the page is done loading
  $(function(){

   scene = new THREE.Scene(); 
   camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ); 
   renderer = new THREE.WebGLRenderer(); 
   controls = new THREE.OrbitControls( camera, renderer.domElement );
   


   renderer.setSize( window.innerWidth, window.innerHeight ); 
   document.body.appendChild( renderer.domElement );
   var systemSprite = THREE.ImageUtils.loadTexture( "systemSprite.png" );
   var stationArray = {};
   //var axes = buildAxes( 1000 );
   //scene.add(axes);
   var oldestUpdate = 1460;
   var universeScale = 50;
   camera.position.z = universeScale; 
   $.getJSON('systems.json', function(data){
    var now = Math.floor(Date.now() / 1000);
    for (var i = 0; i < data.length; i++) {
     var item = data[i];     
     if (((now - item.updated_at)/3600) < oldestUpdate){
       var c = new THREE.Color(1-(now - item.updated_at)/(oldestUpdate*3600), 0, ((now - item.updated_at)/(oldestUpdate*3600)) );
       var material = new THREE.SpriteMaterial( { map : systemSprite , color: c } ); //later, set color to r -> b based on how recent update was
       var newMesh = new THREE.Sprite( material );
       newMesh.position.x = item.x/universeScale;
       newMesh.position.y = item.y/universeScale;
       newMesh.position.z = item.z/universeScale;
       stationArray[item.id] = newMesh;
       scene.add( newMesh );
      } // if
    } // for
    var size = 50; var step = 100/universeScale; var gridHelper = new THREE.GridHelper( size, step ); scene.add( gridHelper );
    render(); 
   });
  });