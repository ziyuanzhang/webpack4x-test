import css from '../css/app.scss';
import '../jquery.changeStyle'

$(".zhu").text("jquery替换");
$(".zhu").changeStyle('pink');

$(".clickMe").click(function(){
    console.log("click me");
});
