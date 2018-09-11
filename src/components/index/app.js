import './app.scss';
import '../common/jquery.changeStyle';
import nav from '../template/nav.ejs'

$(".zhu").text("jquery替换");
$(".zhu").changeStyle('pink');

$(".clickMe").click(function(){
    console.log("click me");
    import(/* webpackChunkName: "print" */ './print').then(data => {
        console.log(data)
        data.clickMe();
    })
});

$('body').prepend(nav);

async function getComponent(){
    let element = document.createElement('div');
    const {default:maps} = await import(/* webpackPrefetch: true */ './map')
    element.innerHTML= maps(4);
    return element
}
getComponent().then(component=>{
    document.body.appendChild(component)
})