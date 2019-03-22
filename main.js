const button = document.querySelector('#check');
const output = document.querySelector('#output');

let register = [["PENNY", 50000.01], ["NICKEL", 50000.05], ["DIME", 50000.1], ["QUARTER", 50000.25], ["ONE", 50000], ["FIVE", 50000], ["TEN", 50000], ["TWENTY", 50000], ["ONE HUNDRED", 50000]]

// cid.map()
// function showRegister(){
//
// }
function checkCashRegister(price, cash, cid) {
  console.log('start', cid, register);
  var change = {
    status: '',
    change: [],
  };

  let currency = [
    'PENNY','NICKEL', 'DIME', 'QUARTER', 'ONE', 'FIVE', 'TEN', 'TWENTY', 'ONE-HUNDRED'
    ];
  let value = [
    0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100
  ];

  let cidTotal = 0;
  let gap = (cash - price);
  // gap = Math.round(gap*100)/100;

  cid.map(item => {cidTotal += item[1]});
  cidTotal = Math.floor(cidTotal*100)/100;

  // console.log('before', cidTotal, gap)

  if(cidTotal === gap) {
    change.status = "CLOSED";
    change.change = [...cid];
    // console.log(2, cid);

    output.innerText = `${change.change.toString()} Register is empty. Will reset`
    console.log('end', cid);
    return change;
  }
  else if(cidTotal > gap){
    cid.reverse();
    for(let item of cid){
      let position = currency.indexOf(item[0]);
      if(value[position] <= gap){
        let newItemVal = 0;
        // console.log('loop',item[0], item[1], value[position], gap);
        while(value[position] <= gap && item[1] > 0){
          item[1] -= value[position];
          newItemVal += value[position];
          gap = Math.round( (gap - value[position]) * 100 ) /100
        }
        // console.log('after',item[1], newItemVal, 'gap:',gap);
        item[1] = newItemVal;
        change['change'].push(item);
        console.log('loop', cid);
      }
    }
    change.status = "OPEN";
    // console.log('ham', change, gap)
  }

  if(gap > 0){
      console.log('not enough', change)
      change.status = "INSUFFICIENT_FUNDS";
      change.change = [];

      output.innerText = `${change.status}. Tansaction not complete, $${gap} owed to customer.`
      console.log('end', cid);
      return
    }

  output.innerText = `${change.change.toString()}`
  console.log('end', cid);
  return change;

}

// checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])



button.addEventListener('click', function(e){
  e.preventDefault();
  let input = document.querySelector('#user-input').value;
  let price = document.querySelector('#user-price').value;
  checkCashRegister(price, input, register);
});
