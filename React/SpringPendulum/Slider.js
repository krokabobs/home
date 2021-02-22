function TM(){}
TM.prototype.addSlider = function(htmlSliderElement, htmlValueElement, minVal, maxVal, stepVal, startVal, setFunc){
    $(function() {
        $( htmlSliderElement ).slider({                               // слайдер на div - элемент "slider_m"
            value:startVal, min: minVal, max: maxVal, step: stepVal,
            slide: function( event, ui ) {                      // работает во время движения слайдера
                $( htmlValueElement ).text( ui.value.toFixed(2) );    // присваивает значение текстовому полю "value_m"
                setFunc(ui.value);
            }
        });
    });
};
TM.prototype.addInputSlider = function(htmlSliderElement, htmlValueElement, minVal, maxVal, stepVal, startVal, setFunc, pressFunc){
    window[pressFunc] = function(event){
        var regExpPattern = /[0-9]+[.]?[0-9]+/;
        var inputVal = document.getElementById(htmlValueElement.substr(1)).value;
        if (regExpPattern.test(inputVal.toString()) && inputVal != 0){setFunc(inputVal);}
    };

    $(function() {
        $( htmlSliderElement ).slider({
            value:startVal, min: minVal, max: maxVal, step: stepVal,
            slide: function( event, ui ) {
                $( htmlValueElement ).val( ui.value.toFixed(2) );
                setFunc(ui.value);
            }
        });
        $( htmlValueElement ).val($( htmlSliderElement ).slider( "value" ).toFixed(2) );
    });
};






