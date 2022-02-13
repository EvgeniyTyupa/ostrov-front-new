import React, { useEffect, useState } from 'react'
import { cx } from '../../../Utils/classnames'
import classes from './DropZone.module.css'
import PreviewImage from './PreviewImage/PreviewImage'
import { AiOutlineCloudUpload } from 'react-icons/ai';

const DropZone = (props) => {
    const { 
        multiple = false,
        onChange,
        title = "Изображения",
        initialFiles = []
    } = props

    const [images, setImages] = useState([])
    const [isHightLight, setIsHighLight] = useState(false)

    const [currentItem, setCurrentItem] = useState(null)

    const handleFileChange = (e) => {
        let files = e.target.files
        handleFiles(files)
    }

    const handleFiles = (files) => {
        let imagesArr = []
        for(let file of files) {
            let reader = new FileReader()
            reader.readAsDataURL(file)
            reader.addEventListener('load', () => {
                let fileObj = {
                    id: file.name + new Date().getTime(),
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    src: reader.result
                }
                imagesArr.push(fileObj)
                setImages([...images, ...imagesArr])
            })
        }
    }

    const handleDelete = (dataImgIndex) => {
        const newImages = [...images]
        newImages.forEach((i, index) => {
            if(index === dataImgIndex) {
                newImages.splice(index, 1)
            }
        })
        setImages(newImages)
    }

    const handleHighLight = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsHighLight(true)
    }

    const handleUndoHighLight = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setIsHighLight(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()

        let dt = e.dataTransfer
        let files = dt.files
        handleFiles(files)
    }

    const dragStartHandler = (e, item, index) => {
        setCurrentItem({
            item: item,
            index: index
        })
    }

    const dragEndHandler = (e) => {
        e.target.style.opacity = 1
    }

    const dragOverHandler = (e) => {
        e.preventDefault()
        e.target.style.opacity = .5
    }

    const dropHandler = (e, item, index) => {
        e.preventDefault()
        let newImages = [...images]
        
        newImages[index] = currentItem.item
        newImages[currentItem.index] = item
        setImages(newImages)
        e.target.style.opacity = 1
    }

    function dataURLtoFile(dataurl, filename) {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

    useEffect(() => {
        let fileImages = []
        images.forEach(img => {
            fileImages.push(dataURLtoFile(img.src, img.name))
        })
        onChange(fileImages)
    }, [images])

    useEffect(() => {
        function urltoFile(url, filename, mimeType){
            return(fetch(url)
                .then(function(res){return res.arrayBuffer();})
                .then(function(buf){return new File([buf], filename,{type:mimeType});})
            );
        }

        async function imgToFiles() {
            let newFiles = []
            
            initialFiles.forEach((img, index) => {
                if(typeof img === "string"){
                    let splited = img.split(".")
                    let fileName = img.split('/')
                    urltoFile(img, fileName[fileName.length - 1], splited[splited.length - 1])
                    .then(function(file){
                        newFiles.push(file)
                        if(index === initialFiles.length - 1) {
                            handleFiles(newFiles)
                        }
                    })
                }

            })
        }
        
        if(initialFiles.length > 0) {
            imgToFiles()
        }
    }, [initialFiles])

    return (
        <div className={classes.main}>
            <p>{title}</p>
            <div 
                className={cx(classes.dropzone, isHightLight ? classes.highlight : undefined)}
                onDragEnter={handleHighLight}
                onDragOver={handleHighLight}
                onDragLeave={handleUndoHighLight}
                onDrop={handleDrop}
            >
                <input 
                    type="file" 
                    name="images" 
                    placeholder='Enter photos'
                    multiple={multiple}
                    id="filephotos"
                    accept="image/*"
                    onChange={handleFileChange}
                /> 
                <label htmlFor='filephotos'>
                    <AiOutlineCloudUpload/>
                    <span>Выберите или перетащите изображения</span>
                </label>
            </div>
            <div className={classes.preview}>
                {images.map((item, index) => (
                    <PreviewImage 
                        item={item} 
                        key={index} 
                        dataImgIndex={index} 
                        onRemove={handleDelete}
                        dragStartHandler={dragStartHandler}
                        dragEndHandler={dragEndHandler}
                        dragOverHandler={dragOverHandler}
                        dropHandler={dropHandler}
                    />
                ))}
            </div>
        </div>
    )
}

export default DropZone