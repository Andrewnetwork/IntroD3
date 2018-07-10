 // sampling.js
 // Andrew Ribeiro
 // July 10, 2018
 
 // Create formatting functions
 function formatPurchase(purchaseSample,minimumPurchase){
    var outValue = null;

    if(purchaseSample > minimumPurchase){
      outValue = purchaseSample;
    }else{
      outValue = minimumPurchase+Math.abs(purchaseSample);
    }

    const dollars = parseInt(outValue);
    var change = parseInt( (outValue%1)*100);

    if(change < 25){
      change = "00";
    }else if(change < 50){
      change = "25";
    }else if(change < 75){
      change = "50";
    }else if(change){
      change = "75";
    }

    return dollars+"."+change
  }

  // Create sampling function
  function sample(minimumPurchase,minimumAge){
    const genderSample = d3.randomUniform(0, 2)();
    var ageSample = parseInt(d3.randomNormal(30,10)());

    if(ageSample < minimumAge){
        ageSample = minimumAge+Math.abs(ageSample);
    }

    // The sampling of purchase total is conditioned on
    // the sampling of age because it looks weird when
    // little kids are rolling around with wads of cash. 
    var purchaseSample = 0;

    if(ageSample < minimumAge*1.25){
        purchaseSample = d3.randomNormal(minimumPurchase,10)();
    }else if(ageSample < minimumAge*1.7){
        purchaseSample = d3.randomNormal(minimumPurchase*4,10)();
    }else if(ageSample < minimumAge*2.5){
        purchaseSample = d3.randomNormal(minimumPurchase*8,5)();
    }else{
        purchaseSample = d3.randomNormal(minimumPurchase*12,10+(ageSample/10))();
    }

    return [ageSample, (genderSample > 1) ? "Male" :"Female", 
                formatPurchase(purchaseSample,minimumPurchase)];
  }