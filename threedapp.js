import './style.css'
import React from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import  TransformControls  from './TransformControls.js'
import fileGlb from './Bucket_new.gltf' // GLB FILE

  class App extends React.Component {
    constructor(props) {
      super(props);
      // STATE FOR UPDATING INPUTS VALUE AND SET MODEL POSITION
      this.state = {
        isObjectVisible: true,
        
                    position: { x: 0, y: 0, z: 0 },
                    rotation: { x: 0, y: 0, z: 0 },
                    scale: { x: 3, y: 3, z: 3 },
                  
      }
  this.onCheckBoxSubmit = this.onCheckBoxSubmit.bind(this);          
  this.dumpObject = this.dumpObject.bind(this)
  //this.rotateObject = this.rotateObject.bind(this);

    }
    // FUNCTION FOR SAVE VALUES FORM INPUTS
    // stateUpdate = (event, direction, axis, ajustFunc) => {
    //   // CHANGING EVENT TO MOUSE DATA IF...
    //   const targetValue = typeof event === "number" ? event : event.target.value;
    //   const isNum = targetValue === "" ? "" : Number(targetValue);
    //   this.setState(state => {
    //     return state[direction] = { ...state[direction], [axis]: isNum }
    //   }, () => ajustFunc(direction, axis));
    // };

    // FUNCTION TO DO STAFF BEFORE RENDERING ELEMENTS
  
getData = () => {

    const width = this.mount.clientWidth;
    const height = this.mount.clientHeight;
    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setClearColor('#dbdbdb');//gray
    this.renderer.setSize(width, height);
    this.renderer.gammaFactor = 1.5;
    this.renderer.gammaOutput = true;
    this.mount.appendChild(this.renderer.domElement);
    

    //ADD CAMERA
    this.camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 10000 );

    //ADD SCENE
    this.scene = new THREE.Scene();

    // LIGHT
    this.light = new THREE.AmbientLight(0xfffff, 2); //white
    this.scene.add(this.light);

    this.plight2 = new THREE.PointLight(0xffffff, 10)
    this.plight2.position.set(100,50,10);
    this.scene.add(this.plight2); //right side light

    this.plight3 = new THREE.PointLight(0xffffff, 10)
    this.plight3.position.set(100,10,-10); //green teeth
    this.scene.add(this.plight3);

    this.plight4 = new THREE.PointLight(0xffffff, 10)
    this.plight4.position.set(-700,-100,0); //below part 
    this.scene.add(this.plight4);


    // ADD GRID HELPER
    const size = 10;
    const divisions = 25;
    const gridHelper = new THREE.GridHelper( size, divisions );
   // this.scene.add( gridHelper );


    //ADD TRANSFORM CONTROL FROM INDEX.HTML
    this.control = new TransformControls( this.camera, this.renderer.domElement );
    this.control.setSize(1);

    // ADD EVENT LISTNER TO MOVE MODEL AND CHANGE REACT STATE TO CHANGE VALUSE IN INPUTS
    this.control.addEventListener( 'change', () => { this.renderer.render(this.scene, this.camera); });

    // EVENT LISTNER TO DISABLE ORBIT MOVE
    this.control.addEventListener( 'dragging-changed', ( event ) => {
    // this.updateSetState();
      this.orbit.enabled = ! event.value});

    // ORBIT CONTROL
    this.orbit = new OrbitControls( this.camera, this.renderer.domElement );  
    this.camera.position.set( 0, 2, 2 );
    this.orbit.update();

    //EVENT LISTNER TO VIEW MODEL IN DIFFERENT POSITIONS
    this.orbit.addEventListener("change", () => this.renderer.render(this.scene, this.camera));

    // ADD LOADER FROM NPM FOLDER
    this.loader = new GLTFLoader();

    // LODING GLB FILE FROM SRC FOLDER
      this.loader.load(fileGlb, gltf => {
      this.gltf = gltf.scene
      console.log("this.gltf ", this.gltf)

      
      // ADD MODEL TO THE SCENE
      this.scene.add(gltf.scene);
      this.Mesh_2  = gltf.scene.getObjectByName('Mesh_2');
      this.IBWP_FULLIBWP_FULL = gltf.scene.getObjectByName('IBWP_FULLIBWP_FULL');
      this.IBWS_FULLIBWS_FULL = gltf.scene.getObjectByName('IBWS_FULLIBWS_FULL');
      this.LUG_2 = gltf.scene.getObjectByName('LUG_2');
    //this.CAST_5N_3P_LQCAST_5N_3P  = gltf.scene.getObjectByName('CAST_5N_3P_LQCAST_5N_3P');
      //this["Mesh.004_0"]  = gltf.scene.getObjectByName('Mesh.004_0');
      this.Mesh_1 = gltf.scene.getObjectByName('Mesh_1');
      this.BUCKET = gltf.scene.getObjectByName('BUCKET');
      // this.BUCKET.rotation.y = 0.1;
     
      console.log("gjgjv", this.BUCKET)
      
      console.log("Object Tree is here",this.dumpObject(gltf.scene).join('\n'));

    //to view 3 dim angle comment this
    //   this.Mesh_2.visible=false;
    //   this.IBWP_FULLIBWP_FULL.visible=false;
    //   this.IBWS_FULLIBWS_FULL.visible=false;
    //   this.LUG_2.visible=false;
    // //  this.CAST_5N_3P_LQCAST_5N_3P.visible=false;
    //  // this["Mesh.004_0"].visible=false;
    //   this["Mesh_1"].visible=false;
    //  this.BUCKET.visible=false;

    // ATTACH MODEL TO TRANSFORM CONTROL
    this.control.attach( gltf.scene );
    this.scene.add( this.control );

      gltf.scene.scale.set(3, 3, 3)
      this.orbit.update();

      // let time =1;
      // time *= 0.001;

      //requestAnimationFrame(this.BUCKET)

       this.renderer.render(this.scene, this.camera);

       
      // this.rotateObject(this.BUCKET)


    }, undefined,

    error => {
      console.log(error);
    });
    
  };


componentDidMount(){

  this.getData();

  // setInterval(() => this.getData(), 1000)
}


    // rotateObject = (bucket) => {
    //   setInterval(
    //     () => {
    //       // for (const bucket of this.BUCKET.children) {
    //       //   //this.BUCKET.rotation.y = time;
    //       //   this.BUCKET.rotation.x = time;
    //       // }
    //       //requestAnimationFrame(this.BUCKET)
    //       bucket.rotation.x *= 0.01;
    //       bucket.rotation.y *= 0.01;
    //     },
    //     200
    //   )
    // }


    dumpObject = (obj, lines = [], isLast = true, prefix = '') => {
      const localPrefix = isLast ? '└─' : '├─';
      lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
      const newPrefix = prefix + (isLast ? '  ' : '│ ');
      const lastNdx = obj.children.length - 1;
      obj.children.forEach((child, ndx) => {
        const isLast = ndx === lastNdx;
        this.dumpObject(child, lines, isLast, newPrefix);
      });
      return lines;
    }

    // MODEL POSITION CHANGE VIA POSITION INPUT
    objPosition = (direction, axis) => {
      this.gltf[direction][axis] = this.state[direction][axis];
      this.renderer.render(this.scene, this.camera);

    };

    stateUpdate = (event, direction, axis, ajustFunc) => {
      // CHANGING EVENT TO MOUSE DATA IF...
      const targetValue = typeof event === "number" ? event : event.target.value;
      const isNum = targetValue === "" ? "" : Number(targetValue);
      this.setState(state => {
        return state[direction] = { ...state[direction], [axis]: isNum }
      }, () => ajustFunc(direction, axis));
    };

      // MODEL ROTATION CHANGE VIA ROTATION INPUT
    objRotation = (direction, axis) => {
            console.log('check dire rot', direction, axis);
      console.log('check gltf and state', this.gltf, this.state)
      this.gltf[direction][axis] = this.state[direction][axis];
      this.renderer.render(this.scene, this.camera);
    };
    // MODEL SCALE CHAGE VIA SCALE INPUT
    objScale = (direction, axis) => {
      this.gltf[direction][axis] = this.state[direction][axis];
      this.renderer.render(this.scene, this.camera);
    };


  onCheckBoxSubmit = (e) => {
    console.log("this.polySurface5", this.IBWP_FULL)
  
    if(e.target.value === "tube0") {
      this.Mesh_2.visible = e.target.checked;
    }

    if(e.target.value === "tube1"){
      this.IBWP_FULLIBWP_FULL.visible = e.target.checked;
    } 

    if(e.target.value === "tube2"){
      this.IBWS_FULLIBWS_FULL.visible = e.target.checked;
    }

    if(e.target.value === "tube3" ){
      this.LUG_2.visible = e.target.checked;
    }

    if(e.target.value === "tube4"){
      this.CAST_5N_3P_LQCAST_5N_3P.visible = e.target.checked;
    }
    
    if(e.target.value === "tube5"){
      this["Mesh.004_0"].visible = e.target.checked;
    }


    if(e.target.value === "tube6"){
      this["Mesh_1"].visible = e.target.checked;
    }
    
    if(e.target.value === "tube7"){
      this["BUCKET"].visible = e.target.checked;
    }

}

  render() {

    console.log("objefdfvghad", this.state.isObjectVisible)
    // this.stateUpdate(1, 'rotation', 'x', this.objRotation)
    return (
      <div className="cont">
      <div className="inputDiv">
          <div
            style={{width: "700px", height: "500px"}}
            ref={mount => this.mount = mount}>
          </div>

   
<div style={{ height: 20, "marginTop": 20}}>REMOVE EQUIPMENT HERE!</div>


      <div style={{ height: 30, "marginTop": 10  }}>
        <input type="checkbox" id="check2"  value="tube0" onChange={this.onCheckBoxSubmit} /> Left & Right Side Bar
      </div>

      <div style={{ height: 30}}>
        <input type="checkbox" id="check0"  value="tube1"   onClick={this.onCheckBoxSubmit} /> Plain Plate
      </div>

      <div style={{ height: 30 }}>
      <input type="checkbox" id="check2"  value="tube2" onChange={this.onCheckBoxSubmit} /> BarLines
      </div>

      <div style={{ height: 30 }}>
      <input type="checkbox" id="check2"  value="tube3" onChange={this.onCheckBoxSubmit} /> Top Rings
      </div>

      {/* <div style={{ height: 30 }}>
      <input type="checkbox" id="check2"  value="tube4" onChange={this.onCheckBoxSubmit} />WholeTeeth
      </div> */}

      <div style={{ height: 30 }}>
      <input type="checkbox" id="check1"  value="tube5" onChange={this.onCheckBoxSubmit} /> Teeth
      </div>

      <div style={{ height: 30 }}>
      <input type="checkbox" id="check1"  value="tube6" onChange={this.onCheckBoxSubmit} /> Logo
      </div>

      <div style={{ height: 30 }}>
      <input type="checkbox" id="check1"  value="tube7" onChange={this.onCheckBoxSubmit} /> Bucket
      </div>
     
      </div>
    </div>
    );
  }
}

export default App
