import colorChanger from './color_changer_directive.js'
import hoveringColor from './hovering_color_change_directive.js'
export default {
  
    props:['color','hoveringColor'],
    directives:{
        color:colorChanger,
        'hovering-color':hoveringColor
    },
    methods:{
       emitClickEvent(){
           this.$emit('iconClicked');
        }
    }
}