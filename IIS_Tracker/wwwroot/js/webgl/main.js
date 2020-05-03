
/**
 * Entry point into graphics rendering
 */

function main() {

    console.debug("Starting RenderingEngine");

    var renderEngine = new RenderingEngine();
    var gl = renderEngine.glContext();
    var shaderTools = new ShaderTools(gl);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // SETUP
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const shaderProgram = shaderTools.initShaderProgram(vsTextureSource, fsTextureSource);

    // eventually abstract out
    //const programInfo = {
    //    program: shaderProgram,
    //    attribLocations: {
    //        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    //        vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    //    },
    //    uniformLocations: {
    //        projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
    //        modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    //    },
    //};

    const programInfo = {
        program: shaderProgram,
        attribLocations: {
            vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
            uvCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
        },
        uniformLocations: {
            projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
            modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
            uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
        },
    };

    let cube = new Cube();

    // create buffers
    const buffers = shaderTools.initBuffers(
        new Float32Array(cube.positions),
        new Uint16Array(cube.indices),
        new Float32Array(cube.uvCoordinates)
    );

    // load the texture
    const texture = shaderTools.loadTexture('./resources/wicker/wicker-albedo.png');

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // RENDER
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var prev = 0;

    this.render = function (now) {
        now *= 0.001; // convert to seconds
        const delta = now - prev;
        prev = now;

        renderEngine.drawScene(gl, programInfo, buffers, texture, delta);

        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
    
};
