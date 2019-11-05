import React,{Component} from 'react';
import { 
   StyleSheet,
   Text, 
   View ,
  TouchableOpacity} from 'react-native';

export default class App extends Component{
  constructor() {
    super()
    this.state ={
      resultText:"",
      calculationText:"",
    }
    this.operations=["DEL","CLR",'/',"x","-","+"]
  }
  operate (operation){
    switch(operation){
      case "CLR":
        this.setState({
          resultText:""
        })
        break
      case "DEL":
        let text=this.state.resultText.split("")
        text.pop()
        this.setState({
          resultText:text.join("")
        })
         break
      case "/":
      case "x":
      case "-":
      case "+":
        const lastChar=this.state.resultText.split("").pop()
        if(this.operations.indexOf(lastChar)>0) return
        if(this.state.resultText=="") return
        this.setState({
          resultText:this.state.resultText+operation
        })
    }
  }
  calculateResult(){
    const text= this.state.resultText
    const calculate=text.replace(/x/g,"*")
    this.setState({
      calculationText:eval(calculate)
    })
  }
  validate(){
    const text=this.state.resultText
    switch(text.slice(-1)){
      case "/":
      case "x":
      case "-":
      case "+":
        return false
    }
    return true
  }
  buttonPressed(text) {
    if(text=="="){
      return this.validate() && this.calculateResult()
    }
    const lastChar=this.state.resultText.split("").pop()
    if(lastChar==".") return false
    this.setState({
      resultText:this.state.resultText+text
    })
  }
render(){
  let rows=[]
  for(let i=0;i<4;i++){
     let row=[]
     let nums=[[7,8,9],[4,5,6],[1,2,3],[".",0,"="]]
     for(let j=0;j<3;j++){
       row.push(
         <TouchableOpacity key={nums[i][j]} onPress={()=>this.buttonPressed(nums[i][j])}style={styles.btn}>
           <Text style={styles.btnText}>{nums[i][j]}</Text>
         </TouchableOpacity>
       )
     }
    rows.push(
      <View key={[i]} style={styles.row}>{row}</View>
    ) 
  }

  let ops=[]
  for(let i=0;i<6;i++){
    ops.push(
      <TouchableOpacity key={this.operations[i]} onPress={()=>this.operate(this.operations[i])} style={styles.btn}>
        <Text style={styles.btnText}>{this.operations[i]}</Text>
      </TouchableOpacity>
    )  
  }
  return (
    <View style={styles.container}>
    <View style={styles.result}>
      <Text style={styles.resultText}>
        {this.state.resultText}
      </Text>
    </View>
    <View style={styles.calculation}>
      <Text style={styles.claculationText}>
      {this.state.calculationText}
      </Text>
    </View>
    <View style={styles.buttons}>
        <View style={styles.numbers}>
              {rows}
        </View>
        <View style={styles.operations}>
          {ops}
        </View>
    </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row:{
    flexDirection:"row",
    flex:1,
    justifyContent:"space-around",
    alignItems:"center"
  },
  result:{
    flex:2,
    backgroundColor:"#f0f8ff",
    justifyContent:"center",
    alignItems:"flex-end"
  },
  resultText:{
    fontSize:30,
    color:"black",
  },
  calculation:{
    flex:1,
    backgroundColor:"#f0f8ff",
    justifyContent:"center",
    alignItems:"flex-end"
  },
  claculationText:{
    fontSize:24,
    color:"black"    
  },
  buttons:{
    flex:7,
    flexDirection:"row"
  },
  btn:{
    alignItems:"center",
    flex:1,
    justifyContent:"center",
    alignSelf:"stretch"
  },
  btnText:{
    fontSize:30,
    color:"white"
  },
  numbers:{
    flex:3,
    backgroundColor:"#434343"
  },
  operations:{
    flex:1,
    backgroundColor:"#636363",
    justifyContent:"space-around",
    alignItems:"stretch"
  }
});
