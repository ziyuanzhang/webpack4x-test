import './app.scss';
import '../common/jquery.changeStyle';
import nav from '../template/nav.ejs'

$(".zhu").text("jquery替换");
$(".zhu").changeStyle('pink');

$(".clickMe").click(function(){
    console.log("click me");
});


$('body').prepend(nav);
