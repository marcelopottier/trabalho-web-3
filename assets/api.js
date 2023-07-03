function getImage(){
    let input = document.getElementById("code-text").value;
    let s = fetchImage(input);
    let div = document.getElementById("img-input");
    //div.src = s;
    console.log(s);
}


async function fetchImage(input){
    const response = await fetch(`https://http.cat/${input}`, {
        method : "GET",
        mode: 'no-cors'
    })
    if(response.blob){
        return response.blob;
    }
}