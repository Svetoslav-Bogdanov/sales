var orderTotal = 0;


function addProduct() {


    let template = "<tr><td class='productIdx'>#productIdx#</td><td class='text-left'>#productName#</td><td>#productPrice# лв</td><td>#productQty#</td><td class='productTotal'>#productTotal# лв</td></tr>";

    let priceAsNumber = parseFloat(document.getElementById("productPrice").value);
    let qtyAsNumber = parseFloat(document.getElementById("productQty").value);

    let productTotal = priceAsNumber * qtyAsNumber;

    let totalRows = document.querySelectorAll("tbody > tr").length + 1;

    let productRow = template.replace("#productName#", document.getElementById("productName").value)
        .replace("#productPrice#", priceAsNumber)
        .replace("#productQty#", qtyAsNumber)
        .replace("#productTotal#", productTotal)
        .replace("#productIdx#", totalRows)

    document.getElementsByTagName("tbody")[0].innerHTML += productRow;

    orderTotal += productTotal;

    setOrderTotal(orderTotal);

    document.forms[0].reset();

    document.getElementById("productName").focus();

    return false;
}

document.getElementsByTagName("table")[0].addEventListener("click", event => {
    if (event.target.tagName != "TD") {
        return;
    }
    if (!event.target.classList.contains("productIdx")) {
        return;

    }

    let productIdx = parseInt(event.target.innerHTML) - 1;

    orderTotal -= parseFloat(document.getElementsByClassName("productTotal").item(productIdx).innerHTML);

    setOrderTotal(orderTotal);

    document.getElementsByClassName("productIdx").item(productIdx).parentNode.remove();

})

function setOrderTotal(newValue) {
    document.getElementById("total").innerHTML = newValue + " лв";

    calcVat(newValue);

    wVat(newValue);

}

function calcVat(totalAmount, returnValue) {
    const rate = 20;
    const calcValue = ((totalAmount * rate) / (rate + 100)).toFixed(2);

    if(returnValue){
            return calcValue
    }

    document.getElementById("vat").innerHTML = calcValue + " лв";
}

function wVat(totalAmount) {
    const calcValue = calcVat(totalAmount, true);

    const totalWithoutVat = (totalAmount - calcValue).toFixed(2);

    document.getElementById("wVat").innerHTML = totalWithoutVat + " лв";

}

document.getElementById("productName").addEventListener("keydown", event =>{
    //debugger

    const keys = [48,49,50,51,52,53,54,55,56,57,96,97,98,99,100,101,102,103,104,105];

    const userKey = event.which || event.key;

    if (keys.includes(userKey)){
        event.preventDefault();
    }

})

document.getElementById("productPrice").addEventListener("input", replaceComma)

document.getElementById("productQty").addEventListener("input", replaceComma)

function replaceComma(event){
    event.target.value = event.target.value.replace(/,/g, ".");
}