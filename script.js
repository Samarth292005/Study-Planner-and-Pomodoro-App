let time = 1500
let timer = null
let music = document.getElementById("music")

function showTime() {
  let min = Math.floor(time / 60)
  let sec = time % 60
  document.getElementById("time").innerText = `${min}:${sec < 10 ? '0' : ''}${sec}`
}

function start() {
  if (!timer) {
    timer = setInterval(() => {
      if (time > 0) {
        time--
        showTime()
      }
    }, 1000)
  }
}

function pause() {
  clearInterval(timer)
  timer = null
}

function reset() {
  time = 1500
  showTime()
  clearInterval(timer)
  timer = null
}

function toggleMusic() {
  if (music.paused) music.play()
  else music.pause()
}

let taskinput = document.getElementById("taskinput")

function add() {
  let txt = taskinput.value.trim()
  if (!txt) return

  let box = makeTask(txt)
  document.getElementById("pending").appendChild(box)
  taskinput.value = ""
}

function makeTask(txt) {
  let div = document.createElement("div")
  div.className = "task"

  let span = document.createElement("span")
  span.innerText = txt

  let btns = document.createElement("div")
  btns.className = "btns"

  let next = document.createElement("button")
  next.innerText = "next"
  next.onclick = () => {
    let par = div.parentElement.id
    if (par === "pending") document.getElementById("progress").appendChild(div)
    else if (par === "progress") document.getElementById("done").appendChild(div)
  }

  let edit = document.createElement("button")
  edit.innerText = "edit"
  edit.onclick = () => {
    let newtxt = prompt("edit task", span.innerText)
    if (newtxt) span.innerText = newtxt
  }

  let del = document.createElement("button")
  del.innerText = "del"
  del.onclick = () => div.remove()

  btns.appendChild(next)
  btns.appendChild(edit)
  btns.appendChild(del)

  div.appendChild(span)
  div.appendChild(btns)

  return div
}

showTime()
