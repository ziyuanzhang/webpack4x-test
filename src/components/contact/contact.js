import './contact.scss';
import nav from '../template/nav.ejs'
console.log('hi from contact js');

$('body').prepend(nav);

async function getComponent(){
    //  return import(/* webpackChunkName:"lodash" */ 'lodash').then(({ default: _ })=>{
    //     let element = document.createElement('div');
    //     element.innerHTML=_.join(['hello','webpack']);
    //     return element;
    // }).catch(error=>'An error occurred while loading the component') 
    let element = document.createElement('div');
    const {default:_} = await import(/* webpackChunkName:"lodash" */ 'lodash')
    element.innerHTML=_.join(['hello','webpack']);
    return element;
}
getComponent().then(component=>{
    document.body.appendChild(component)
})