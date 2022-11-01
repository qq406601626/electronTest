window.onload = ()=>{
    console.log('window loaded')
    const changeTitleBtn = document.getElementById('changeTitleBtn')
    changeTitleBtn.addEventListener('click',()=>{
        window.myApi.changeTitle('你好')
    })
    const channel = new MessageChannel()
}
