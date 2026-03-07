const allDataContainer = document.getElementById("all-issues-container")
const loadingSpnnir = document.getElementById("loading-spinner")
const buttonContainer = document.getElementById("all-button")
const allButton = buttonContainer.querySelectorAll("button")
const issuesLength=document.getElementById("issues-length")
async function loadData() {
    showLoading()
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    hidLoading()
    displayData(data.data)
}

// function activButton(btn){
//     allButton.forEach(button => {
//         button.classList.remove("btn-primary")
//         button.classList.add("btn-outline")
//     })
//     btn.classList.add("btn-primary")
//     btn.classList.remove("btn-outline")
// }

function showLoading() {
    loadingSpnnir.classList.remove("hidden")
    allDataContainer.innerHTML = ""
}
function hidLoading() {
    loadingSpnnir.classList.add("hidden")
}

function displayData(allData) {
    allDataContainer.innerHTML = ""
    allData.forEach(data => {
        const card = document.createElement('div')
        card.innerHTML = `
    <div class="outline h-full space-y-3 card card-body shadow-sm border-t-6 ">
                    <h1 class="text-xl font-semibold">${data.title}</h1>
                    <p class="text-gray-600">${data.description}</p>
                    <div class="flex gap-4">
                        <div
                            class="flex items-center p-1 bg-[#FECACA] text-[#EF4444] rounded-lg">
                            <i class="fa-brands fa-empire"></i>
                            <span>${data.labels[0]}</span>
                        </div>
                        <div
                            class="flex items-center p-1 bg-[#FFF8DB] text-[#D97706] rounded-lg">
                            <i class="fa-brands fa-empire"></i>
                            <span>${data.labels[1] ? data.labels[1] : ""}</span>
                        </div>
                    </div>
                    <p>#1
                        ${data.author}</p>
                    <p>${data.createdAt}</p>
                </div>


    ` 
    const border = card.querySelector(".outline")
    if (data.status === "open") {
        border.style.borderTop = "4px solid green"
    } else {
        border.style.borderTop = "4px solid purple"
    }
    allDataContainer.append(card)
});
issuesLength.innerText=allData.length
}

function openData() {
    showLoading()
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            const openData = data.data.filter(open => open.status === "open")
            displayData(openData)
            hidLoading()
        })
    // console.log(openData.length)
}
function closedData() {
    showLoading()   
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            const closedData = data.data.filter(close => close.status === "closed")
            displayData(closedData)
            hidLoading()
        })
    // issuesLength.innerText=closedData.length
}

loadData()