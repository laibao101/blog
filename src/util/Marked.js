import marked from "marked";
import Highlight from "highlight.js";

marked.setOptions({
    highlight: function (code) {
        return Highlight.highlightAuto(code).value;
    },
});

export default class Marked {
    static renderToHtml(content) {
        return marked(content);
    }
}
