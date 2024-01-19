const text = document.querySelector("#txtmsg")
const password = document.querySelector('#password')
const result = document.querySelector("#result")
var clutter = "";
var parinam = "";

function encryption() {

    document.querySelector("#encrypt-btn").addEventListener("click", function () {


        // get the password

        var pass = document.getElementById("password").value;        


        // get the input

        var input = document.getElementById("txtmsg").value;        

        //converting it into a set of emojis

        var str = input.split("")
        str.forEach(element => {
            clutter += `&#128${(element.charCodeAt())} `
        });


        document.querySelector("#result").innerHTML = clutter

        var dataarr = [];
        if (JSON.parse(localStorage.getItem('data1'))) {
            dataarr = JSON.parse(localStorage.getItem('data1'));
            console.log(dataarr)
            dataarr.push({ "pass": pass, "input": input, "clutter": clutter })
        } else {
            dataarr = [{ "pass": pass, "input": input, "clutter": clutter }]
        }
        localStorage.setItem(`data1`, JSON.stringify(dataarr))
    })

}

function decryption() {
    document.querySelector("#deccrypt-btn").addEventListener("click", function () {
        var clutter2 = '';
        var input2 = document.querySelector("#emojimsg").value
        var finalPass = document.querySelector("#finalpassword").value
        var user = JSON.parse(localStorage.getItem('data1'))       
        var str2 = input2.split(" ")
        str2.forEach(element => {
            clutter2 += `&#${(element.codePointAt(0))} `
        });
        console.log(clutter2)
        var found;
        for (let i of user) {
            if (i.clutter === clutter2) {
                found = i;

            }
        }
        if (found && found.clutter === clutter2 && found.pass === finalPass) {
            document.querySelector("#result").style.display = `block`
            document.querySelector("#result").style.color = `#eee`

            document.querySelector("#result").innerHTML = found.input
        } else {
            document.querySelector("#result").style.display = `block`
            document.querySelector("#result").style.color = `red`
            document.querySelector("#result").innerHTML = "Wrong password!"
        }
    })

}


function btnClicking() {

    document.querySelector("button").addEventListener("click", function () {
        document.querySelector("#result").style.display = "block"
    })
    document.querySelector("#dec-btn").addEventListener("click", function () {
        document.querySelector("#result").style.display = "none"
        document.querySelector("#decryption").style.display = "block"
        document.querySelector("#encryption").style.display = "none"
        document.querySelector("#dec-btn").style.backgroundColor = "#333"
        document.querySelector("#enc-btn").style.backgroundColor = "#222"
        document.querySelector("#main>h1 span i").style.rotate = '180deg'
    })
    document.querySelector("#enc-btn").addEventListener("click", function () {
        document.querySelector("#decryption").style.display = "none"
        document.querySelector("#result").style.display = "none"
        document.querySelector("#encryption").style.display = "block"
        document.querySelector("#dec-btn").style.backgroundColor = "#222"
        document.querySelector("#enc-btn").style.backgroundColor = "#333"
        document.querySelector("#main>h1 span i").style.rotate = '0deg'

    })
}

encryption();

decryption()

btnClicking();
