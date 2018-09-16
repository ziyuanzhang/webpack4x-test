let maps = function(num){
  return ++num
}
let bibao = (function(){
  let a=0;
  let b =0;
  let getA = function(){
      a++
  } 
  let init = function(){
      $(".getTXT").click(function(){
        let txt = $(this).text();
        console.log('txt:',txt);
        getA();       
       console.log('a:',a);
       console.log('b:',++b)
       
      })
  }
  return {
    init:init
  }
})()
export default maps;
export {bibao};