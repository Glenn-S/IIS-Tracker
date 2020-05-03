
/**
 * Class RenderingEngine
 */
function RenderingEngine() {

    // member variables
    this.gl;
    var rotation = 0.0;

    /**
     * Init method for setting up the webGL context
     */
    this.glContext = function () {
        var canvas = document.getElementById('webgl-canvas');
        var gl = canvas.getContext('webgl');

        if (!gl) {
            gl.canvas.getContext('experimental-webgl');
        }

        if (!gl) {
            alert("Your browser does not support WebGL");
        }

        return gl;
    }

    this.drawScene = function (gl, programInfo, buffers, texture, deltaTime) {
        gl.clearColor(0.75, 0.85, 0.8, 1.0); // background to set
        gl.clearDepth(1.0); // clear everything
        gl.enable(gl.DEPTH_TEST); // enable depth testing
        gl.depthFunc(gl.LEQUAL); // near things obscure far things

        // clear the canvas
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // create perspective matrix
        const fov = 45 * Math.PI / 180; // in radians
        const aspectRatio = gl.canvas.clientWidth / gl.canvas.clientHeight;
        const zNear = 0.1;
        const zFar = 100.0;
        const projectionMatrix = glMatrix.mat4.create();

        glMatrix.mat4.perspective(
            projectionMatrix,
            fov,
            aspectRatio,
            zNear,
            zFar,
        );

        const modelViewMatrix = glMatrix.mat4.create();

        // *** Order of transforms matters
        glMatrix.mat4.translate(
            modelViewMatrix,        // destination matrix
            modelViewMatrix,        // matrix to translate
            [-0.0, 0.0, -6.0]       // amount to translate
        );

        glMatrix.mat4.rotate(
            modelViewMatrix,        // destination matrix
            modelViewMatrix,        // matrix to rotate
            rotation,               // amount to rotate in radians
            [0, 0, 1]               // axis to rotate about
        );

        // second rotation around y axis
        glMatrix.mat4.rotate(
            modelViewMatrix,        // destination matrix
            modelViewMatrix,        // matrix to rotate
            rotation * 0.7,               // amount to rotate in radians
            [0, 1, 0]               // axis to rotate about
        );

        // update the animation
        rotation += deltaTime; 

        // setup position VBO
        {
            const numComponents = 3;
            const type = gl.FLOAT;
            const normalize = gl.FALSE;
            const stride = 0;
            const offset = 0;

            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
            gl.vertexAttribPointer(
                programInfo.attribLocations.vertexPosition,
                numComponents,
                type,
                normalize,
                stride,
                offset
            );
            gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
        }
        //// setup color VBO
        //{
        //    const numComponents = 4;
        //    const type = gl.FLOAT;
        //    const normalize = gl.FALSE;
        //    const stride = 0;
        //    const offset = 0;

        //    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
        //    gl.vertexAttribPointer(
        //        programInfo.attribLocations.vertexColor,
        //        numComponents,
        //        type,
        //        normalize,
        //        stride,
        //        offset
        //    );
        //    gl.enableVertexAttribArray(programInfo.attribLocations.vertexColor);
        //}
        // setup uv VBO
        {
            const num = 2;
            const type = gl.FLOAT;
            const normalize = gl.FALSE;
            const stride = 0;
            const offset = 0;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffers.uvs);
            gl.vertexAttribPointer(
                programInfo.attribLocations.uvCoord,
                num,
                type,
                normalize,
                stride,
                offset
            );
            gl.enableVertexAttribArray(programInfo.attribLocations.uvCoord);
        }

        // set up indices VBO
        {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
        }

        // bind the program
        gl.useProgram(programInfo.program);

        // set the shader uniforms
        gl.uniformMatrix4fv(
            programInfo.uniformLocations.projectionMatrix,
            false,
            projectionMatrix
        );

        gl.uniformMatrix4fv(
            programInfo.uniformLocations.modelViewMatrix,
            false,
            modelViewMatrix
        );

        // setup the texture
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

        {
            const vertexCount = 36;
            const type = gl.UNSIGNED_SHORT;
            const offset = 0;
            gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
        }

        //{
        //    const vertexCount = 4;
        //    const offset = 0;
        //    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
        //}
    }
}
