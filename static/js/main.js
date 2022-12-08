
/*
let randomNumber = () => Math.round(Math.random() * (100))
*/
const childKiller = (tag) => {
  while (tag.firstChild) {
    tag.removeChild(tag.firstChild)
  }
}
function showNumber(classname, number) {
  const result = document.getElementById('result')
  childKiller(result)
  const p = document.createElement("p")
  p.setAttribute("class", classname)
  p.setAttribute("id", "registred-result")
  p.innerHTML = number
  result.appendChild(p)
  document.getElementById("h3-hidden").removeAttribute("hidden")
}
const color = (number) => {
  if (number <= 50) {
    return "green"
  }
  else if (number >= 51 && number <= 70) {
    return "yellow"
  }
  else {
    return "red"
  }
}
document.getElementById('generate').addEventListener("click", function () {
  $.ajax({
    type: 'GET',
    url: "./request.php",
    data: { 'generateNumber': true },
    success: function (response) {
      const randomnumber = response

      showNumber(color(randomnumber), randomnumber)

    }
  })
})

document.getElementById('save').addEventListener("click", function () {
  let number = null
  try {
    number = document.getElementById('registred-result').innerHTML
  } catch {
    $.ajax({
      type: 'GET',
      url: "./request.php",
      data: { 'generateNumber': true },
      success: function (response) {
        number = response

        showNumber(color(number), number)
      }
    })

    window.alert("Como um número não foi gerado previamente, um novo está sendo gerado, clique novamente em salvar")
  }
  $.ajax({
    type: 'POST',
    url: "./request.php",
    data: {
      number: number
    },
    success: function () {
      window.alert("Número Salvo")
    }
  })

})

document.getElementById('request').addEventListener("click", function () {
  $.ajax({
    type: 'GET',
    url: "./request.php",
    data: { 'request': true },
    success: function (response) {
      const bottom = document.getElementById('bottom')
      if (!response) {
        childKiller(bottom)
        const h2 = document.createElement("h2")
        h2.setAttribute("class", "h1")
        h2.innerHTML = "Não existem números salvos no servidor"
        bottom.appendChild(h2)
        return
      }
      numbers = JSON.parse(response)
      const table = document.createElement("table")
      table.setAttribute("class", "m-auto text-center h3")
      childKiller(bottom)

      const pGreen = document.createElement("p")
      pGreen.setAttribute("class", "green h1")
      pGreen.innerHTML = "Verde:"
      table.appendChild(pGreen)

      const pYellow = document.createElement("p")
      pYellow.setAttribute("class", "yellow h1")
      pYellow.innerHTML = "Amarelo:"
      table.appendChild(pYellow)

      const pRed = document.createElement("p")
      pRed.setAttribute("class", "red h1")
      pRed.innerHTML = "Vermelho: "
      table.appendChild(pRed)


      const pAll = document.createElement("p")
      pAll.setAttribute("class", "h1")
      pAll.innerHTML = "Todos os Números: "
      for (const key in numbers) {
        switch (color(numbers[key])) {
          case "yellow":
            pYellow.innerHTML = pYellow.innerHTML + " " + numbers[key]
            break
          case "red":
            pRed.innerHTML = pRed.innerHTML + " " + numbers[key]
            break
          case "green":
            //     trGreen.appendChild(tdValue)
            pGreen.innerHTML += " " + numbers[key]
            break
        }

        pAll.innerHTML += " " + numbers[key]
        //console.log(numbers[key]);
      }
      table.appendChild(pAll)
      bottom.append(table)
    }
  })
})
