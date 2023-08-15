
const uploadBox = document.querySelector(".upload-box"),
previewImg = uploadBox.querySelector("img"),
fileInput = uploadBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratioInput = document.querySelector(".ratio input"),
qualityInput = document.querySelector(".quality input"),
downloadBtn = document.querySelector(".download-btn");

let ogImageRatio

fileInput.addEventListener('change', ()=>{
    const file = fileInput.files[0];
    if (!file) return
    previewImg.src = URL.createObjectURL(file)
    previewImg.addEventListener('load', ()=>{
        document.querySelector('.wrapper').classList.add('active')
        widthInput.value = previewImg.naturalWidth
        heightInput.value = previewImg.naturalHeight
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight
    })
})

widthInput.addEventListener('keyup', ()=>{
    let height = ratioInput.checked ? widthInput.value /ogImageRatio : heightInput.value
    heightInput.value = Math.floor(height);
})

heightInput.addEventListener('keyup', ()=>{
    let width = ratioInput.checked ? widthInput.value * ogImageRatio : widthInput.value
    widthInput.value = Math.floor(width);
})

downloadBtn.addEventListener('click', ()=>{

    
    const canvas = document.createElement('canvas')
    const link = document.createElement('a')
    const ctx = canvas.getContext('2d')
    const imgQuality = qualityInput.checked ? 0.6 : 1.0;
    
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;


    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
    link.href = canvas.toDataURL("image/jpeg", imgQuality);
    link.download = new Date().getTime();
    link.click();
})

uploadBox.addEventListener('click', ()=>fileInput.click())