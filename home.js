const allDataContainer = document.getElementById("all-issues-container")
const loadingSpnnir = document.getElementById("loading-spinner")
const issuesLength = document.getElementById("issues-length")
const modalContainer=document.getElementById("modal-containt")
async function loadData(event) {
    showLoading()
    if(event){
        activeButton(event.target)
    }
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json()
    displayData(data.data)
    hidLoading()
}


const showDetail =async (id)=> {
    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
    const res=await fetch(url)
    const detail=await res.json()
    shoDisplay(detail.data)
}

const shoDisplay=(dataD)=>{
   modalContainer.innerHTML=`
    <h3 class="text-lg font-bold">${dataD.title}</h3>
            <div class="flex justify-between items-center">
                <div class="flex items-center p-1 bg-[#FECACA] text-[#EF4444] rounded-full w-[80px] justify-center">
                    <p class="text-[13px] font-semibold text-center">${dataD.status}</p>
                </div>
                <p>Opened by ${dataD.assignee ?dataD.assignee:"Not Found" }</p>
                <p>${dataD.updatedAt}</p>
            </div>
            <div class="flex gap-4">
                <div class="flex items-center p-1 bg-[#FECACA] text-[#EF4444] rounded-lg">
                    <i class="fa-brands fa-empire"></i>
                    <span>${dataD.labels[0]}</span>
                </div>
                <div class="flex items-center p-1 bg-[#FFF8DB] text-[#D97706] rounded-lg">
                    <i class="fa-brands fa-empire"></i>
                    <span>${dataD.labels[1] ? dataD.labels[1] : "Not Found"}</span>
                </div>
            </div>
            <p class="text-[#64748B]">${dataD.description}</p>
            <div class="card shadow-sm bg-gray-300">
                <div class="flex justify-between items-center w-[90%] mx-auto p-5">
                    <div class="">
                        <p>Assignee:</p>
                        <h2 class="font-bold text-[16px]">${dataD.assignee ?dataD.assignee:"Not Found" }</h2>
                    </div>
                    <div class="space-y-2">
                        <p>Priority:</p>
                        <div
                            class="flex items-center p-1 bg-red-400 text-white rounded-full w-[80px] justify-center">
                            <p class="text-[13px] font-semibold text-center">${dataD.priority}</p>
                        </div>
                    </div>
                </div>
            </div>
   
   `


   document.getElementById("my_modal").showModal()
}
const buttonContainer = document.getElementById("all-button")
const allButtons = buttonContainer.querySelectorAll("button")

function activeButton(btn){
    allButtons.forEach(button=>{
        button.classList.remove("btn-primary")
        button.classList.add("btn-outline")
    })

    btn.classList.add("btn-primary")
    btn.classList.remove("btn-outline")
}

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
            <div onclick="showDetail(${data.id})" class="outline h-full space-y-3 card card-body shadow-sm border-t-6 ">

                <div class="flex justify-between items-center">
                    <img src="./images/Open-Status.png" alt="">
                    <div class="labels-bg flex items-center p-1 rounded-full w-[80px] justify-center">
                    <p class="text-[13px] font-semibold text-center">${data.priority}</p>
                     </div>
             </div>

                    <h1 class="text-xl font-semibold">${data.title}</h1>
                    <p class="text-gray-600">${data.description}</p>
                    <div class="flex gap-4">
                        <div
                            class="labels-bg flex items-center p-1 bg-[#FECACA] text-[#EF4444] rounded-lg">
                            <i class="fa-brands fa-empire"></i>
                            <span>${data.labels[0]}</span>
                        </div>
                        <div
                            class="flex items-center p-1 bg-[#FFF8DB] text-[#D97706] rounded-lg">
                            <i class="fa-brands fa-empire"></i>
                            <span>${data.labels[1] ? data.labels[1] : "Not Found"}</span>
                        </div>
                </div>
                    <p>#${data.id}
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

        const labelsBg=card.querySelector(".labels-bg")
        if(data.priority==="high"){
            labelsBg.style.backgroundColor="#FECACA"
        }
        else if(data.priority==="medium"){
            labelsBg.style.backgroundColor="#FFF6D1"
            labelsBg.style.color="#F59E0B"
        }else{
            labelsBg.style.backgroundColor="#EEEFF2"
            labelsBg.style.color="#9CA3AF"
        }
    });
    issuesLength.innerText = allData.length + " Issues"
}

function openData(event) {
    activeButton(event.target)
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
function closedData(event) {
    activeButton(event.target)
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


document.getElementById("search-btn").addEventListener('click',()=>{
    const input=document.getElementById("search-input")
    const searchValue=input.value.trim().toLowerCase()
   fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
   .then(res=>res.json())
   .then(data=>{
    const allData=data.data
    const filterData= allData.filter(data=>data.title.toLowerCase().includes(searchValue))
    displayData(filterData)
   })
})