
/**
 * Entry point into graphics rendering
 */

function main() {

    console.debug("Starting RenderingEngine");

    var renderEngine = new RenderingEngine();
    var gl = renderEngine.glContext();

    var shaderTools = new ShaderTools(gl);

    const shaderProgram = shaderTools.initShaderProgram(vsSource, fsSource);

    // eventually abstract out
    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
        },
    };

    const square =
        [ // x, y           R, G, B
            -1.0,  1.0,   
             1.0,  1.0,
            -1.0, -1.0,
             1.0, -1.0,
        ];

    const colors = [
        1.0, 1.0, 1.0, 1.0, // white
        1.0, 0.0, 0.0, 1.0, // red
        0.0, 1.0, 0.0, 1.0, // green 
        0.0, 0.0, 1.0, 1.0, // blue
    ];

    const buffers = shaderTools.initBuffers(new Float32Array(square), new Float32Array(colors));


    // animation loop
    var prev = 0;

    this.render = function (now) {
        now *= 0.001; // convert to seconds
        const delta = now - prev;
        prev = now;

        //console.log(delta);

        renderEngine.drawScene(gl, programInfo, buffers, delta);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    
};
