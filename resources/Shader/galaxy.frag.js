module.exports = 
`
#ifdef GL_ES
precision mediump float;
#endif
varying vec2 v_texCoord;
uniform float sys_time;
void main()
{
    vec4 src_color = texture2D(CC_Texture0, v_texCoord).rgba;
    float width = 0.2; // 流光的宽度范围(调整该值改变流光的宽度)
    float start = sys_time; // 流光的起始x坐标
    float strength = 0.02; // 流光增亮强度(调整该值改变流光的增亮强度)
    float offset = 0.2; // 偏移值(调整该值改变流光的倾斜程度)
    
    //if( start <= v_texCoord.x && v_texCoord.x <= (start + width))
    if( v_texCoord.x < (start - offset * v_texCoord.y) &&  v_texCoord.x > (start - offset * v_texCoord.y - width))
    {
        vec3 improve = strength * vec3(255, 255, 255);
        vec3 result = improve * vec3( src_color.r, src_color.g, src_color.b);
        gl_FragColor = vec4(result, src_color.a);

    } else {
        gl_FragColor = src_color;
    }
}
`