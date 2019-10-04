const app = new Vue({
  el: "#app",
  data: {
    gain: 100,
    Vcc: '',
    Ib: '', currentIb: '',
    Ic: '', currentIc: '',
    VCE: '', VCB: '', VBE: 0.7,
    Rc: '', selectRc: '', newRc: '',
    Rb: '', selectRb: '', newRb: '',
    Re: '',   selectRe: '', newRe: ''
  },methods: {
    calculate: function() {
      const VBE = this.VBE

      if(this.Vcc && this.Rb && this.gain && this.Re && this.Rc){
        const meassureRb = this.meassure(this.selectRb, this.Rb)
        const meassureRe = this.meassure(this.selectRe, this.Re)
        const meassureRc = this.meassure(this.selectRc, this.Rc)

        const pureIc =(this.Vcc - VBE) / ((meassureRb.value / this.gain) + meassureRe.value)
        const newIc =  this.cientfic(pureIc)

        const pureIb = (pureIc / this.gain)
        const newIb = this.cientfic(pureIb)

        const voltIc = (meassureRc.value * pureIc).toFixed(2)  
        const voltIe = (meassureRe.value * pureIc).toFixed(2)
        
        const vceValor = (this.Vcc - voltIc - voltIe).toFixed(2)

        this.VBE = this.VBE
        this.VCB = `${vceValor - VBE}`
        this.VCE = `${vceValor}V` 
        this.currentIc = `${newIc.newValue}${newIc.letter}A`
        this.currentIb = `${newIb.newValue}${newIb.letter}A`
        this.newRc = `${meassureRc.value}Ω`
        this.newRb = `${meassureRb.value}Ω`
        this.newRe = `${meassureRe.value}Ω`

      }else{
        alert(`not ok`)
      }

    },cientfic(value){
      let testValue = value * 1000
      if(testValue > 1){
        return {letter: 'm', newValue: testValue.toFixed(2)}
      }else{
        let newValue = value * 1000000
        return {letter: 'μ', newValue: newValue.toFixed(2)}

      }
    },meassure: function(elevate, val){
      //function to give according a selected html tag, a letter and the value elevate to its measurement unit
        switch(elevate){
          case '-6':
            return { letter: 'μ', value: parseFloat(this.potencializate(val, -6))}
            case '-3':
              return { letter: 'm', value: parseFloat(this.potencializate(val, -3))}
            case '1':
              return { letter: '', value: parseFloat(val)}  
            case '3':
              if(this.potencializate(val, 3) < 1000){
                return { letter: '', value: parseFloat(this.potencializate(val, 3))}
              }else{
                return { letter: 'k', value: parseFloat(this.potencializate(val, 3))}
              }
      }
    },potencializate: function(base, pot){
      //function to transform the value in elevate way according of its measurement unit
        return base * Math.pow(10 , pot)

    },parseToMeasurementUnit: function(letter){
      switch(letter){
        case 'μ':
            return 'n'
        case 'm':
            return 'μ'
        case '':
            return 'm'  
        case 'k':
            return ''
      } 
        
    }

  }
})