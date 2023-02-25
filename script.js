const URL = "http://localhost:3000/styleBlock"
const btnPost = document.querySelector('.btnAdd')
const btnGet = document.querySelector('.btnGet')
const container = document.querySelector('.container')

class styleBlocks {
    constructor(width, height, bg) {
        
        this.width = width + 'px'
        this.height = height + 'px'
        this.bg = bg
        this.top = Math.floor(Math.random() * 800) + 'px'
        this.left = Math.floor(Math.random() * 800) + 'px'
    }
}

const getData = async (url) => {
    const res = await fetch(url)
    const data = res.json()
    return data
}
const postData = async (url, object) => {
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(object),
        headers: { 'Content-type': 'application/json; charset=UTF-8'},
    })
    return res.json()
}


btnPost.addEventListener('click', async () => {

    let backgroundInput = document.querySelector('input.background').value
    let widthInput = document.querySelector('input.width').value
    let heightInput = document.querySelector('input.height').value
    let blockConstructor = new styleBlocks(widthInput, heightInput, backgroundInput)

    postData(URL, blockConstructor)
})

btnGet.addEventListener('click', async () => {
    let blocks = await getData(URL)
    blocks.forEach(el => {
        container.insertAdjacentHTML(`beforeend`, `
            <div class ="block"
                style="
                    width: ${el.width}; 
                    height: ${el.height}; 
                    background: ${el.bg};
                    position: absolute;
                    top: ${el.top};
                    left: ${el.left};">
            </div>
        `)
    })
})