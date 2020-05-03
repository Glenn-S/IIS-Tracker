
function ShaderTools(gl) {

    // member variables
    this.gl = gl;

    /**
     * Initialize the shader program with vs and fs shader files
     * @param {any} gl
     * @param {any} vsSource
     * @param {any} fsSource
     */
    this.initShaderProgram = function (vsSource, fsSource) {
        const vertexShader = this.loadShader(this.gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.loadShader(this.gl.FRAGMENT_SHADER, fsSource);

        // create shader program
        const shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, vertexShader);
        this.gl.attachShader(shaderProgram, fragmentShader);
        this.gl.linkProgram(shaderProgram);

        if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
            console.error("ERROR linking program", this.gl.getProgramInfoLog(shaderProgram));
            return null;
        }

        return shaderProgram;
    }

    /**
     * Load the shader program
     * @param {any} gl
     * @param {any} type
     * @param {any} source
     */
    this.loadShader = function (type, source) {
        const shader = this.gl.createShader(type);

        // send the source to the shader object
        this.gl.shaderSource(shader, source);

        // compile the shader program
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            console.error(`ERROR compiling ${type} shader`, this.gl.getShaderInfoLog(shader));
            this.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    this.initBuffers = function (verts, colors) {

        const positionBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            verts,
            this.gl.STATIC_DRAW,
        );

        const colorBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, colorBuffer);
        this.gl.bufferData(
            gl.ARRAY_BUFFER, 
            colors,
            gl.STATIC_DRAW
        );

        return {
            position: positionBuffer,
            color: colorBuffer,
        }
    }

}
